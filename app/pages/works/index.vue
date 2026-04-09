<script setup lang="ts">
import { useIntersectionObserver } from '~/composables/useIntersectionObserver';
import { useWorkStore } from '~~/stores/work';
import Fuse from 'fuse.js';

const { backfaceFixed } = useBackfaceFixed();
const store = useWorkStore();
const filterRef = ref();
const { isMobile } = useViewport();
const { animateText } = useTextAnimation();

definePageMeta({
	title: '作品一覧',
	description: 'アバウトページの詳しい説明文です。',
});

const {
	workList,
	searchQuery,
	sortOrder,
	selectedCategories,
	selectedWorkTypes,
} = storeToRefs(store);

if (!store.works) {
	store.fetchWorks();
}

const router = useRouter();
const route = useRoute();

const workTitle: string = 'WORKS';
const titleAnime = useTemplateRef<HTMLElement>('titleAnime');
// --- 1. 基本状態 ---
const isFilterOpen = ref(false);
const isSpFilterButton = ref(false);
// const spFilterButton = ref<HTMLButtonElement | null>(null);
const spFixedButton = ref<HTMLButtonElement | null>(null);
const showSuggestions = ref(false);

// --- 2. SP用の一時的な状態 (反映ボタンを押すまで保持) ---
const tempSearchQuery = ref('');
const tempSelectedCategories = ref<string[]>([]);
const tempSelectedWorkTypes = ref<string[]>([]);

// --- 4. 算出プロパティ (Master Data) ---
const categories = computed(() => {
	if (!workList.value) return [];
	const all = workList.value.map(item => item.category);
	return Array.from(new Map(all.map(c => [c.categoryId, c])).values());
});

const workTypes = computed(() => {
	if (!workList.value) return [];
	const all = workList.value.flatMap(item => item.workType);
	return Array.from(new Map(all.map(t => [t.workTypeId, t])).values());
});

// --- 5. フィルタリング & ソートロジック ---
const filteredWorks = computed(() => {
	if (!workList.value) return [];

	const useTemp = isMobile.value && isFilterOpen.value;
	const activeQuery = (useTemp ? tempSearchQuery.value : searchQuery.value).trim();
	const activeCats = useTemp ? [...tempSelectedCategories.value] : [...selectedCategories.value];
	const activeTypes = useTemp ? [...tempSelectedWorkTypes.value] : [...selectedWorkTypes.value];

	// 1. カテゴリ・種別で「絶対的な母体」を作る
	const baseList = workList.value.filter((item) => {
		const isCategoryMatch = activeCats.length === 0 || activeCats.includes(item.category.categoryId);
		const isWorkTypeMatch = activeTypes.length === 0 || item.workType.some(wt => activeTypes.includes(wt.workTypeId));
		return isCategoryMatch && isWorkTypeMatch;
	});

	// 2. 検索語がないなら、ここで終了（絶対条件の中身だけ返す）
	if (!activeQuery) {
		return baseList;
	}

	// 3. 検索語があるなら、baseList「だけ」を対象に Fuse を実行
	const fuse = new Fuse(baseList, {
		keys: ['title', 'skill', 'category.label', 'workType.label'],
		threshold: 0.3,
		ignoreLocation: true,
	});

	return fuse.search(activeQuery).map(r => r.item);
});

const parseEndDate = (dateStr: string | undefined | null): number => {
	// 1. 強制的に「文字列」として扱う（String()関数は null/undefined を "null"/"undefined" という文字列に変える）
	const target = String(dateStr || '');

	// 2. 「現在」または「空」の場合は即リターン
	if (target === '現在' || target === '' || target === 'null' || target === 'undefined') {
		return 999999;
	}

	// 3. ここで .match を呼ぶ。まだエラーが出るなら、Optional Chaining (?.) を使う
	const match = target?.match(/(\d+)年(\d+)月/);

	if (match && match[1] && match[2]) {
		return parseInt(match[1], 10) * 100 + parseInt(match[2], 10);
	}

	return 0;
};

const sortedWorks = computed(() => {
	const list = [...filteredWorks.value];
	return list.sort((a, b) => {
		const dateA = parseEndDate(a.endDate);
		const dateB = parseEndDate(b.endDate);
		return sortOrder.value === 'asc' ? dateB - dateA : dateA - dateB;
	});
});

const randomWorks = computed(() => {
	if (!workList.value || workList.value.length === 0) return [];
	return [...workList.value].sort(() => Math.random() - 0.5).slice(0, 2);
});

// --- 6. アクション関数 ---
const toggleFilter = () => {
	if (!isFilterOpen.value && isMobile.value) {
		// 開く瞬間に現在の確定状態を一時状態にコピー
		tempSearchQuery.value = searchQuery.value;
		tempSelectedCategories.value = [...selectedCategories.value];
		tempSelectedWorkTypes.value = [...selectedWorkTypes.value];
	}
	isFilterOpen.value = !isFilterOpen.value;
	isSpFilterButton.value = !isSpFilterButton.value;

	if (isMobile.value) {
		backfaceFixed(true);
	}
};

const closeFilter = () => {
	isFilterOpen.value = false;
	isSpFilterButton.value = true;
	if (isMobile.value) {
		backfaceFixed(false);
	}
	setTimeout(() => {
		spFixedButton.value?.classList.add('is-inview');
	}, 100);
};

const applyFilters = () => {
	// 一時状態を本番状態へ反映
	searchQuery.value = tempSearchQuery.value;
	selectedCategories.value = [...tempSelectedCategories.value];
	selectedWorkTypes.value = [...tempSelectedWorkTypes.value];
	if (isMobile.value) {
		closeFilter();
	}
};

const toggleCategory = (id: string) => {
	const target = isMobile.value ? tempSelectedCategories.value : selectedCategories.value;
	const idx = target.indexOf(id);
	if (idx > -1) {
		target.splice(idx, 1);
	}
	else {
		target.push(id);
	}
};

const toggleWorkType = (id: string) => {
	const target = isMobile.value ? tempSelectedWorkTypes.value : selectedWorkTypes.value;
	const idx = target.indexOf(id);
	if (idx > -1) {
		target.splice(idx, 1);
	}
	else {
		target.push(id);
	}
};

const resetFilters = (reset: boolean) => {
	if (isMobile.value && !reset) {
		tempSearchQuery.value = '';
		tempSelectedCategories.value = [];
		tempSelectedWorkTypes.value = [];
	}
	else {
		searchQuery.value = '';
		selectedCategories.value = [];
		selectedWorkTypes.value = [];
	}
};

const clearInput = () => {
	if (isMobile.value) {
		tempSearchQuery.value = '';
	}
	else {
		searchQuery.value = '';
	}
	nextTick(() => {
		filterRef.value?.focusInput();
	});
};

onMounted(() => {
// IntersectionObserver の対象を子から取得して実行
	if (filterRef.value) {
		useIntersectionObserver(
			computed(() => filterRef.value.spFilterButton),
			{ threshold: 0 },
			(el, isIntersecting) => {
				if (!isMobile.value) return;
				const fixedBtn = filterRef.value.spFixedButton;
				if (isIntersecting) {
					fixedBtn?.classList.remove('is-inview');
				}
				else {
					fixedBtn?.classList.add('is-inview');
				}
			},
		);
	}

	const hasFilter
		= selectedCategories.value.length > 0
			|| selectedWorkTypes.value.length > 0
			|| searchQuery.value.trim() !== ''
			|| sortOrder.value !== 'asc';

	if (Object.keys(route.query).length === 0 && hasFilter) {
		router.replace({
			query: {
				categoryId: selectedCategories.value.length ? selectedCategories.value.join(',') : undefined,
				workTypeId: selectedWorkTypes.value.length ? selectedWorkTypes.value.join(',') : undefined,
				q: searchQuery.value.trim() || undefined,
				sort: sortOrder.value !== 'asc' ? sortOrder.value : undefined,
			},
		});
	}

	animateText(titleAnime, workTitle, 1, 0.5);
});

watch([selectedCategories, selectedWorkTypes, searchQuery, sortOrder], ([newCats, newTypes, newQuery, newSort]) => {
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
}, { deep: true });

// watch(() => route.query, (newQuery) => {
//   selectedCategories.value = (newQuery.categoryId as string)?.split(',') || [];
//   selectedWorkTypes.value = (newQuery.workTypeId as string)?.split(',') || [];
//   searchQuery.value = (newQuery.q as string) || '';
//   if (newQuery.sort) sortOrder.value = newQuery.sort as any;
// }, { deep: true, immediate: true });
watch(() => route.query, (newQuery) => {
	// 1. カテゴリ：URLにあれば上書き、なければ今のストアの値を維持
	if (newQuery.categoryId) {
		selectedCategories.value = (newQuery.categoryId as string).split(',');
	}

	// 2. 制作種別
	if (newQuery.workTypeId) {
		selectedWorkTypes.value = (newQuery.workTypeId as string).split(',');
	}

	// 3. 検索クエリ
	if (newQuery.q !== undefined) {
		searchQuery.value = (newQuery.q as string);
	}

	// 4. ソート順
	if (newQuery.sort) {
		sortOrder.value = newQuery.sort as 'asc' | 'desc';
	}
}, { deep: true, immediate: true });

const currentSearchQuery = computed({
	get() {
		return isMobile.value ? tempSearchQuery.value : searchQuery.value;
	},
	set(newValue) {
		if (isMobile.value) {
			tempSearchQuery.value = newValue;
		}
		else {
			searchQuery.value = newValue;
		}
	},
});

const suggestions = computed(() => {
	const query = currentSearchQuery.value.trim();
	if (query.length < 2) return [];

	const useTemp = isMobile.value && isFilterOpen.value;
	const activeCats = useTemp ? tempSelectedCategories.value : selectedCategories.value;
	const activeTypes = useTemp ? tempSelectedWorkTypes.value : selectedWorkTypes.value;

	// ★ サジェストの母体を「カテゴリ絞り込み済み」のリストに限定する
	const baseListForSuggest = workList.value.filter((item) => {
		const isCategoryMatch = activeCats.length === 0 || activeCats.includes(item.category.categoryId);
		const isWorkTypeMatch = activeTypes.length === 0 || item.workType.some(wt => activeTypes.includes(wt.workTypeId));
		return isCategoryMatch && isWorkTypeMatch;
	});

	const fuse = new Fuse(baseListForSuggest, { // 絞り込み済みの母体から探す
		keys: ['title', 'skill', 'category.label'],
		threshold: 0.3,
	});

	return fuse.search(query).slice(0, 5);
});

// フォーカスが当たった時
const onInputBlur = (event: FocusEvent) => {
	const nextTarget = event.relatedTarget as Node;
	const currentWrapper = event.currentTarget as HTMLElement;

	// 次のフォーカス先が、ラッパー（検索窓やサジェスト）の外側なら閉じる
	if (!nextTarget || !currentWrapper?.contains(nextTarget)) {
		showSuggestions.value = false;
		activeIndex.value = -1;
	}
};

const onInputFocus = () => {
	if (currentSearchQuery.value.length >= 2) {
		showSuggestions.value = true;
	}
};

// 入力中
watch(currentSearchQuery, (newVal) => {
	showSuggestions.value = newVal.length >= 2;
});

/**
 * サジェストから項目を選択した時の処理
 * @param title 選択された実績のタイトル
 */
const selectSuggestion = (title: string) => {
	// 1. 入力値を書き換える（モバイルなら一時変数、PCなら本番変数）
	if (isMobile.value) {
		tempSearchQuery.value = title;
	}
	else {
		searchQuery.value = title;
	}

	// 2. 選択状態をリセットしてサジェストを閉じる
	showSuggestions.value = false;
	activeIndex.value = -1;

	// 3. (オプション) そのまま検索を確定させて画面を更新したい場合
	// applyFilters();
	// 2. アクティブインデックスをリセット（これだけだと文字数条件でまた出る可能性がある

	// 3. 【重要】入力欄からフォーカスを外すことで、サジェストを物理的に消す
	// filterRef.value は SectionWorkFilter に付けている ref

	// 4. そのまま検索を確定させる
	// applyFilters();
	nextTick(() => {
    filterRef.value?.inputRef?.blur();
		showSuggestions.value = false;
  });
};

const activeIndex = ref(-1);

// 矢印キー（下）
const onArrowDown = () => {
	if (activeIndex.value < suggestions.value.length - 1) {
		activeIndex.value++;
	}
};

// 矢印キー（上）
const onArrowUp = () => {
	if (activeIndex.value > 0) {
		activeIndex.value--;
	}
};

// Enterキー
const onEnter = (event: KeyboardEvent) => {
	// IME（日本語入力）の確定時のEnterなら何もしない
	if (event.isComposing) return;

	const target = suggestions.value[activeIndex.value];

	if (showSuggestions.value && activeIndex.value >= 0 && target) {
		// 1. サジェストが選ばれている場合は、そのタイトルを確定
		selectSuggestion(target.item.title);
		// } else {
		//   // 2. 選ばれていない、またはサジェストが閉じていれば、現在の入力値で検索実行
		//   // applyFilters();
		//   // 検索実行後はサジェストを閉じる
		//   showSuggestions.value = false;
	}
	showSuggestions.value = false;
	activeIndex.value = -1;

	// 3. (オプション) そのまま検索を確定させて画面を更新したい場合
	// applyFilters();
	// 2. アクティブインデックスをリセット（これだけだと文字数条件でまた出る可能性がある

	// 3. 【重要】入力欄からフォーカスを外すことで、サジェストを物理的に消す
	// filterRef.value は SectionWorkFilter に付けている ref
	filterRef.value?.inputRef?.blur();
};
</script>

<template>
	<div class="l-lg-container">
		<h2 class="work-title font-audio animation-text">
			<span ref="titleAnime">{{ workTitle }}</span>
		</h2>
		<div class="work-inner">
			<UiWorkFilter
				ref="filterRef"
				v-model:search-query="currentSearchQuery"
				:is-filter-open="isFilterOpen"
				:is-sp-filter-button="isSpFilterButton"
				:total-count="filteredWorks.length"
				:categories="categories"
				:work-types="workTypes"
				:selected-categories="isMobile ? tempSelectedCategories : selectedCategories"
				:selected-work-types="isMobile ? tempSelectedWorkTypes : selectedWorkTypes"
				:is-mobile="isMobile"
				:active-index="activeIndex"
				:show-suggestions="showSuggestions"
				:suggestions="suggestions"
				@toggle="toggleFilter"
				@close="closeFilter"
				@apply="applyFilters"
				@reset="resetFilters(false)"
				@clear-input="clearInput"
				@toggle-category="toggleCategory"
				@toggle-work-type="toggleWorkType"
				@keydown-down="onArrowDown"
				@keydown-up="onArrowUp"
				@keydown-enter="onEnter"
				@select-suggestion="selectSuggestion"
				@update-active-index="(index) => activeIndex = index"
				@on-focus="onInputFocus"
				@on-blur="onInputBlur"
			/>

			<div class="work-content">
				<div v-if="!store.pending &&sortedWorks.length > 0" class="work-sort-wrapper">
					<div class="u-sp">
						<button
							type="button"
							class="work-sort-reset-button"
							@click="resetFilters(true);"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1920" fill="currentColor">
								<path d="M960 0v112.941c467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059-467.125 0-847.059-379.934-847.059-847.059 0-267.106 126.607-515.915 338.824-675.727v393.374h112.94V112.941H0v112.941h342.89C127.058 407.38 0 674.711 0 960c0 529.355 430.645 960 960 960s960-430.645 960-960S1489.355 0 960 0" fill-rule="evenodd" />
							</svg>
							条件をリセット
						</button>
					</div>
					<ul class="work-sort-list">
						<li class="work-sort-item">
							<button
								type="button"
								class="work-sort-item-button"
								:class="{ 'is-active': sortOrder === 'asc' }"
								@click="sortOrder = 'asc'"
							>
								新しい順
							</button>
						</li>
						<li class="work-sort-item">
							<span>/</span>
						</li>
						<li class="work-sort-item">
							<button
								type="button"
								class="work-sort-item-button"
								:class="{ 'is-active': sortOrder === 'desc' }"
								@click="sortOrder = 'desc'"
							>
								古い順
							</button>
						</li>
					</ul>
				</div>

				<ul v-if="!store.pending && sortedWorks.length > 0" class="work-list">
					<li v-for="item in sortedWorks" :key="item.id" class="work-item">
						<UiWorkCard :item="item" />
					</li>
				</ul>

				<div v-else-if="store.pending || workList.length === 0" class="work-list-container">
					<ul class="work-list">
						<li v-for="n in 8" :key="'skeleton-' + n" class="work-item">
							<UiWorkCardSkeleton />
						</li>
					</ul>
				</div>
				<div v-else class="work-none-container">
					<p class="work-text-none">
						条件に合う作品がありません。<br class="u-sp">こちらの作品はいかがでしょうか？
					</p>
					<ul class="work-list is-suggested">
						<li v-for="item in randomWorks" :key="'random-' + item.id" class="work-item">
							<UiWorkCard :item="item" />
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.work-inner{
  @include mq("pc"){
    display: flex;
    align-items: flex-start;
    gap: math.div(100vw, $designBasePc);
  }
}

.work-title{
  font-size: math.div(70vw, $designBaseSp);
  margin: math.div(50vw, $designBaseSp) 0;
 @include text-border(rgb(var(--black01)));
  @include mq("pc"){
    font-size: math.div(200vw, $designBasePc);
    margin: math.div(60vw, $designBasePc) 0;
  }
}

.work-content{
  @include mq("pc"){
    width: 80%;
  }
}

.work-sort-wrapper{
  @include mq("tab"){
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: math.div(5vw, $designBaseSp);
  }
}

.work-sort-reset-button{
  @include mq("tab"){
    font-size: math.div(12vw, $designBaseSp);
    display: flex;
    align-items: center;
    svg{
      width: 1em;
      height: 1em;
      margin-right: .5em;
    }
  }
}

.work-sort-list{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  line-height: 100%;
}

.work-sort-item{
  line-height: 100%;
  display: flex;
  align-items: center;
  >span{
    line-height: 100%;
    font-size: math.div(10vw, $designBaseSp);
    @include mq("pc"){
      font-size: math.div(10vw, $designBasePc);
    }
  }
}

.work-sort-item-button{
  line-height: 100%;
  font-size: math.div(12vw, $designBaseSp);
  padding: math.div(10vw, $designBaseSp);
  @include mq("pc"){
    font-size: math.div(12vw, $designBasePc);
    padding: math.div(10vw, $designBasePc);
  }
  &.is-active{
    font-weight: 700;
    color: rgb(var(--blue03));
  }
}

.work-list{
  display: flex;
  flex-wrap: wrap;
  gap: math.div(50vw, $designBaseSp) math.div(15vw, $designBaseSp);
  @include mq("pc"){
    gap: math.div(60vw, $designBasePc) math.div(20vw, $designBasePc);
    min-height: math.div(457vw, $designBasePc);
  }
}

.work-item{
  width: calc(50% - math.div(calc(15vw/2), $designBaseSp));
  @include mq("pc"){
    width: calc(33.33% - math.div(calc(40vw/3), $designBasePc));
  }
}

.work-text-none{
  line-height: 150%;
  font-size: math.div(14vw, $designBaseSp);
  margin: math.div(40vw, $designBaseSp) 0 math.div(60vw, $designBaseSp);
  @include mq("pc"){
    line-height: 100%;
    font-size: math.div(16vw, $designBasePc);
    margin: math.div(80vw, $designBasePc) 0;
  }
}
</style>
