// composables/useWorkFilter.ts
import { useWorkStore } from '~~/stores/work';
import type { WorkItem } from '~/types/microcms';
import type { Category, WorkType } from '~/types/work';
import Fuse from 'fuse.js';

// ソート順の型定義
type SortOrder = 'asc' | 'desc';

const parseEndDate = (dateStr: string | undefined | null): number => {
	const target = String(dateStr || '');
	if (target === '現在' || target === '' || target === 'null' || target === 'undefined') {
		return 999999;
	}
	const match = target?.match(/(\d+)年(\d+)月/);
	if (match && match[1] && match[2]) {
		return parseInt(match[1], 10) * 100 + parseInt(match[2], 10);
	}
	return 0;
};

export const useWorkFilter = (workList: Ref<WorkItem[]>) => {
	const store = useWorkStore();
	const { isMobile } = useViewport();
	const { backfaceFixed } = useBackfaceFixed();

	const { searchQuery, sortOrder, selectedCategories, selectedWorkTypes } = storeToRefs(store);

	// UI状態
	const isFilterOpen = ref(false);
	const showSuggestions = ref(false);
	const activeIndex = ref(-1);

	// モバイル用一時状態
	const tempSearchQuery = ref('');
	const tempSelectedCategories = ref<string[]>([]);
	const tempSelectedWorkTypes = ref<string[]>([]);

	// マスタデータの抽出
	const categories = computed<Category[]>(() => {
		if (!workList.value) return [];
		const all = workList.value.map(item => item.category);
		return Array.from(new Map(all.map(c => [c.categoryId, c])).values());
	});

	const workTypes = computed<WorkType[]>(() => {
		if (!workList.value) return [];
		const all = workList.value.flatMap(item => item.workType);
		return Array.from(new Map(all.map(t => [t.workTypeId, t])).values());
	});

	// フィルタリング
	const filteredWorks = computed(() => {
		if (!workList.value) return [];
		const useTemp = isMobile.value && isFilterOpen.value;
		const activeQuery = (useTemp ? tempSearchQuery.value : searchQuery.value).trim();
		const activeCats = useTemp ? tempSelectedCategories.value : selectedCategories.value;
		const activeTypes = useTemp ? tempSelectedWorkTypes.value : selectedWorkTypes.value;

		const baseList = workList.value.filter((item) => {
			const isCategoryMatch = activeCats.length === 0 || activeCats.includes(item.category.categoryId);
			const isWorkTypeMatch = activeTypes.length === 0 || item.workType.some(wt => activeTypes.includes(wt.workTypeId));
			return isCategoryMatch && isWorkTypeMatch;
		});

		if (!activeQuery) return baseList;

		const fuse = new Fuse(baseList, {
			keys: ['title', 'skill', 'category.label', 'workType.label'],
			threshold: 0.3,
		});
		return fuse.search(activeQuery).map(r => r.item);
	});

	// ソート (型安全な順序入れ替え)
	const sortedWorks = computed(() => {
		return [...filteredWorks.value].sort((a, b) => {
			const dateA = parseEndDate(a.endDate);
			const dateB = parseEndDate(b.endDate);
			return sortOrder.value === 'asc' ? dateB - dateA : dateA - dateB;
		});
	});

	// サジェスト
	const suggestions = computed(() => {
		const query = (isMobile.value ? tempSearchQuery.value : searchQuery.value).trim();
		if (query.length < 2) return [];

		const fuse = new Fuse(filteredWorks.value, {
			keys: ['title', 'skill'],
			threshold: 0.3,
		});
		return fuse.search(query).slice(0, 5);
	});

	// フィルター適用アクション
	const applyFilters = () => {
		searchQuery.value = tempSearchQuery.value;
		selectedCategories.value = [...tempSelectedCategories.value];
		selectedWorkTypes.value = [...tempSelectedWorkTypes.value];
		isFilterOpen.value = false;
		backfaceFixed(false);
	};

	const setSortOrder = (order: SortOrder) => {
		sortOrder.value = order;
	};

	return {
		isFilterOpen, searchQuery, sortOrder, selectedCategories, selectedWorkTypes,
		tempSearchQuery, tempSelectedCategories, tempSelectedWorkTypes,
		categories, workTypes, sortedWorks, suggestions, isMobile, showSuggestions, activeIndex,
		applyFilters, setSortOrder,
	};
};
