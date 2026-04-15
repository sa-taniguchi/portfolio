// composables/useWorkFilter.ts
import { useWorkStore } from '~~/stores/work';
import type { WorkItem } from '~/types/microcms';
import type { Category, WorkType } from '~/types/work';
import { storeToRefs } from 'pinia';
import Fuse from 'fuse.js';

type SortOrder = 'asc' | 'desc';

/**
 * 終了日を数値に変換し、ソートに使用
 * @param dateStr - 日付文字列 (例: "2025年3月", "現在")
 * @returns ソート用数値
 */
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

/**
 * 作品フィルター機能の統合composable
 * - フィルター条件管理 (カテゴリ、種別、検索)
 * - UI状態管理 (モーダル開閉、サジェスト表示)
 * - URL同期
 * - 検索・ソート処理
 */
export const useWorkFilter = (workList: Ref<WorkItem[]>) => {
	const store = useWorkStore();
	const router = useRouter();
	const route = useRoute();
	const { isMobile } = useViewport();
	const { $lenis } = useNuxtApp();

	const { searchQuery, sortOrder, selectedCategories, selectedWorkTypes } = storeToRefs(store);

	// ============ UI状態 ============
	const isFilterOpen = ref(false);
	const isSpFilterButton = ref(false);
	const showSuggestions = ref(false);
	const activeIndex = ref(-1);
	const skipWatchUpdate = ref(false); // watch をスキップするフラグ

	// ============ モバイル用一時状態 ============
	const tempSearchQuery = ref('');
	const tempSelectedCategories = ref<string[]>([]);
	const tempSelectedWorkTypes = ref<string[]>([]);

	// ============ マスタデータ ============
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

	// ============ 検索条件 ============
	const currentSearchQuery = computed({
		get() {
			return isMobile.value && isFilterOpen.value ? tempSearchQuery.value : searchQuery.value;
		},
		set(newValue) {
			if (isMobile.value && isFilterOpen.value) {
				tempSearchQuery.value = newValue;
			} else {
				searchQuery.value = newValue;
			}
		},
	});

	const currentSelectedCategories = computed(() =>
		isMobile.value && isFilterOpen.value ? tempSelectedCategories.value : selectedCategories.value
	);

	const currentSelectedWorkTypes = computed(() =>
		isMobile.value && isFilterOpen.value ? tempSelectedWorkTypes.value : selectedWorkTypes.value
	);

	// ============ フィルタリング & ソート ============
	const filteredWorks = computed(() => {
		if (!workList.value) return [];

		const baseList = workList.value.filter((item) => {
			const isCategoryMatch = currentSelectedCategories.value.length === 0
				|| currentSelectedCategories.value.includes(item.category.categoryId);
			const isWorkTypeMatch = currentSelectedWorkTypes.value.length === 0
				|| item.workType.some(wt => currentSelectedWorkTypes.value.includes(wt.workTypeId));
			return isCategoryMatch && isWorkTypeMatch;
		});

		const query = currentSearchQuery.value.trim();
		if (!query) return baseList;

		const fuse = new Fuse(baseList, {
			keys: ['title', 'skill', 'category.label', 'workType.label'],
			threshold: 0.3,
			ignoreLocation: true,
		});
		return fuse.search(query).map(r => r.item);
	});

	const sortedWorks = computed(() => {
		return [...filteredWorks.value].sort((a, b) => {
			const dateA = parseEndDate(a.endDate);
			const dateB = parseEndDate(b.endDate);
			return sortOrder.value === 'asc' ? dateB - dateA : dateA - dateB;
		});
	});

	const randomWorks = computed(() => {
		if (!workList.value || workList.value.length === 0) return [];
		return [...workList.value].sort(() => Math.random() - 0.5).slice(0, 2);
	});

	// ============ サジェスト ============
	const suggestions = computed(() => {
		const query = currentSearchQuery.value.trim();
		if (query.length < 2) return [];

		const fuse = new Fuse(filteredWorks.value, {
			keys: ['title', 'skill', 'category.label'],
			threshold: 0.3,
		});
		return fuse.search(query).slice(0, 5);
	});

	// ============ アクション ============
	const toggleFilter = () => {
		if (!isFilterOpen.value && isMobile.value) {
			tempSearchQuery.value = searchQuery.value;
			tempSelectedCategories.value = [...selectedCategories.value];
			tempSelectedWorkTypes.value = [...selectedWorkTypes.value];
		}
		isFilterOpen.value = !isFilterOpen.value;
		if (isMobile.value) {
			isFilterOpen.value ? $lenis.stop() : $lenis.start();
		}
	};

	const closeFilter = () => {
		if (isMobile.value) {
			$lenis.start();
			isFilterOpen.value = false;
		}
	};

	const applyFilters = () => {
		searchQuery.value = tempSearchQuery.value;
		selectedCategories.value = [...tempSelectedCategories.value];
		selectedWorkTypes.value = [...tempSelectedWorkTypes.value];
		if (isMobile.value) {
			closeFilter();
		}
	};

	const toggleCategory = (id: string) => {
		const target = isMobile.value && isFilterOpen.value ? tempSelectedCategories.value : selectedCategories.value;
		const idx = target.indexOf(id);
		idx > -1 ? target.splice(idx, 1) : target.push(id);
	};

	const toggleWorkType = (id: string) => {
		const target = isMobile.value && isFilterOpen.value ? tempSelectedWorkTypes.value : selectedWorkTypes.value;
		const idx = target.indexOf(id);
		idx > -1 ? target.splice(idx, 1) : target.push(id);
	};

	const resetFilters = (isConfirmed: boolean) => {
		if (isMobile.value && !isConfirmed) {
			tempSearchQuery.value = '';
			tempSelectedCategories.value = [];
			tempSelectedWorkTypes.value = [];
		} else {
			searchQuery.value = '';
			selectedCategories.value = [];
			selectedWorkTypes.value = [];
		}
	};

	const clearInput = () => {
		if (isMobile.value && isFilterOpen.value) {
			tempSearchQuery.value = '';
		} else {
			searchQuery.value = '';
		}
	};

	const selectSuggestion = (title: string) => {
		currentSearchQuery.value = title;
		showSuggestions.value = false;
		activeIndex.value = -1;
		skipWatchUpdate.value = true; // 次の watch 実行をスキップ
	};

	const onArrowDown = () => {
		if (activeIndex.value < suggestions.value.length - 1) {
			activeIndex.value++;
		}
	};

	const onArrowUp = () => {
		if (activeIndex.value > 0) {
			activeIndex.value--;
		}
	};

	const onEnter = (event: KeyboardEvent) => {
		if (event.isComposing) return;
		const target = suggestions.value[activeIndex.value];
		if (showSuggestions.value && activeIndex.value >= 0 && target) {
			selectSuggestion(target.item.title);
		}
		showSuggestions.value = false;
		activeIndex.value = -1;
	};

	const onInputFocus = () => {
		if (currentSearchQuery.value.length >= 2) {
			showSuggestions.value = true;
		}
	};

	const onInputBlur = (event: FocusEvent) => {
		const nextTarget = event.relatedTarget as Node;
		const currentWrapper = event.currentTarget as HTMLElement;
		if (!nextTarget || !currentWrapper?.contains(nextTarget)) {
			showSuggestions.value = false;
			activeIndex.value = -1;
		}
	};

	// ============ ウォッチャー ============
	
	// サジェスト表示制御
	watch(currentSearchQuery, (newVal) => {
		// suggestion 選択後の watch スキップ
		if (skipWatchUpdate.value) {
			skipWatchUpdate.value = false;
			return;
		}
		// 2文字以上でサジェスト表示
		if (newVal.length >= 2) {
			showSuggestions.value = true;
		} else {
			showSuggestions.value = false;
		}
	});

	// URL同期
	watch([selectedCategories, selectedWorkTypes, searchQuery, sortOrder],
		([newCats, newTypes, newQuery, newSort]) => {
			router.push({
				path: '/works/',
				query: {
					sort: newSort !== 'asc' ? newSort : undefined,
					categoryId: newCats.length > 0 ? newCats.join(',') : undefined,
					workTypeId: newTypes.length > 0 ? newTypes.join(',') : undefined,
					q: newQuery.trim() !== '' ? newQuery.trim() : undefined,
				},
				replace: true,
			});
		},
		{ deep: true }
	);

	// URLから状態復元
	watch(() => route.query, (newQuery) => {
		if (newQuery.categoryId) {
			selectedCategories.value = (newQuery.categoryId as string).split(',');
		}
		if (newQuery.workTypeId) {
			selectedWorkTypes.value = (newQuery.workTypeId as string).split(',');
		}
		if (newQuery.q !== undefined) {
			searchQuery.value = (newQuery.q as string);
		}
		if (newQuery.sort) {
			sortOrder.value = newQuery.sort as SortOrder;
		}
	}, { deep: true, immediate: true });

	return {
		// ========== UI状態 ==========
		isFilterOpen,
		isSpFilterButton,
		showSuggestions,
		activeIndex,

		// ========== 検索条件 ==========
		currentSearchQuery,
		currentSelectedCategories,
		currentSelectedWorkTypes,
		sortOrder,

		// ========== マスタデータ ==========
		categories,
		workTypes,

		// ========== 計算結果 ==========
		filteredWorks,
		sortedWorks,
		randomWorks,
		suggestions,
		isMobile,

		// ========== アクション ==========
		toggleFilter,
		closeFilter,
		applyFilters,
		toggleCategory,
		toggleWorkType,
		resetFilters,
		clearInput,
		selectSuggestion,
		onArrowDown,
		onArrowUp,
		onEnter,
		onInputFocus,
		onInputBlur,
	};
};
