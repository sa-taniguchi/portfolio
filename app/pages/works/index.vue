<script setup lang="ts">
import { useWorkStore } from '~~/stores/work';
import { useWorkFilter } from '~/composables/useWorkFilter';
import { useTextAnimation } from '~/composables/useTextAnimation';
import { useIntersectionObserver } from '~/composables/useIntersectionObserver';
import { storeToRefs } from 'pinia';

const store = useWorkStore();
const { animateText } = useTextAnimation();

definePageMeta({
	title: '作品一覧',
	description: 'フロントエンドエンジニア 谷口聡のこれまで携わってきた作品一覧を記載しております。',
});

// ========== ストア & コンポーザブル ==========
const { workList } = storeToRefs(store);
const {
	isFilterOpen,
	isSpFilterButton,
	showSuggestions,
	activeIndex,
	currentSearchQuery,
	currentSelectedCategories,
	currentSelectedWorkTypes,
	sortOrder,
	categories,
	workTypes,
	filteredWorks,
	sortedWorks,
	randomWorks,
	suggestions,
	isMobile,
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
} = useWorkFilter(computed(() => workList.value || []));

// ========== テンプレートリファレンス ==========
const titleAnime = useTemplateRef<HTMLElement>('titleAnime');
const filterRef = ref<any>(null);
const workTitle = 'WORKS';

// ========== 初期化 ==========
if (!store.works) {
	store.fetchWorks();
}

onMounted(() => {
	// タイトルアニメーション
	animateText(titleAnime, workTitle, 1, 0.5);

	// IntersectionObserver: フィルターボタンの表示/非表示
	if (filterRef.value?.spFilterButton) {
		useIntersectionObserver(
			computed(() => filterRef.value.spFilterButton),
			{ threshold: 0 },
			(el, isIntersecting) => {
				isSpFilterButton.value = !isIntersecting;
			},
		);
	}
});
</script>

<template>
	<div class="l-lg-container">
		<h2 class="work-title font-audio anime-textBorder-bk">
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
				:selected-categories="currentSelectedCategories"
				:selected-work-types="currentSelectedWorkTypes"
				:is-mobile="isMobile"
				:active-index="activeIndex"
				:show-suggestions="showSuggestions"
				:suggestions="suggestions"
				@toggle="toggleFilter"
				@close="closeFilter"
				@apply="applyFilters"
				@reset="resetFilters(false)"
				@clearInput="clearInput"
				@toggleCategory="toggleCategory"
				@toggleWorkType="toggleWorkType"
				@selectSuggestion="selectSuggestion"
				@updateActiveIndex="(i: number) => activeIndex = i"
				@keydownDown="onArrowDown"
				@keydownUp="onArrowUp"
				@keydownEnter="onEnter"
				@onFocus="onInputFocus"
				@onBlur="onInputBlur"
			/>

			<div class="work-content">
				<div v-if="!store.pending && sortedWorks.length > 0" class="work-sort-wrapper">
					<div class="u-sp">
						<button type="button" class="work-sort-reset-button" @click="resetFilters(true)">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1920" fill="currentColor">
								<path d="M960 0v112.941c467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059-467.125 0-847.059-379.934-847.059-847.059 0-267.106 126.607-515.915 338.824-675.727v393.374h112.94V112.941H0v112.941h342.89C127.058 407.38 0 674.711 0 960c0 529.355 430.645 960 960 960s960-430.645 960-960S1489.355 0 960 0" fill-rule="evenodd" />
							</svg>
							条件をリセット
						</button>
					</div>
					<ul class="work-sort-list">
						<li class="work-sort-item">
							<button type="button" class="work-sort-item-button" :class="{ 'is-active': sortOrder === 'asc' }" @click="sortOrder = 'asc'">
								新しい順
							</button>
						</li>
						<li class="work-sort-item"><span>/</span></li>
						<li class="work-sort-item">
							<button type="button" class="work-sort-item-button" :class="{ 'is-active': sortOrder === 'desc' }" @click="sortOrder = 'desc'">
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
.work-inner {
	@include mq("pc") {
		display: flex;
		align-items: flex-start;
		gap: math.div(100vw, $designBasePc);
	}
}

.work-title {
	font-size: math.div(70vw, $designBaseSp);
	margin: math.div(50vw, $designBaseSp) 0;
	@include mq("pc") {
		font-size: math.div(200vw, $designBasePc);
		margin: math.div(60vw, $designBasePc) 0;
	}
}

.work-content {
	@include mq("pc") {
		width: 80%;
	}
}

.work-sort-wrapper {
	@include mq("tab") {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: math.div(5vw, $designBaseSp);
	}
}

.work-sort-reset-button {
	@include mq("tab") {
		font-size: math.div(12vw, $designBaseSp);
		display: flex;
		align-items: center;
		svg {
			width: 1em;
			height: 1em;
			margin-right: .5em;
		}
	}
}

.work-sort-list {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	line-height: 100%;
}

.work-sort-item {
	line-height: 100%;
	display: flex;
	align-items: center;
	> span {
		line-height: 100%;
		font-size: math.div(10vw, $designBaseSp);
		@include mq("pc") {
			font-size: math.div(10vw, $designBasePc);
		}
	}
}

.work-sort-item-button {
	line-height: 100%;
	font-size: math.div(12vw, $designBaseSp);
	padding: math.div(10vw, $designBaseSp);
	@include mq("pc") {
		font-size: math.div(12vw, $designBasePc);
		padding: math.div(10vw, $designBasePc);
	}
	&.is-active {
		font-weight: 700;
		color: rgb(var(--blue03));
	}
}

.work-list {
	display: flex;
	flex-wrap: wrap;
	gap: math.div(50vw, $designBaseSp) math.div(15vw, $designBaseSp);
	@include mq("pc") {
		gap: math.div(60vw, $designBasePc) math.div(20vw, $designBasePc);
		min-height: math.div(457vw, $designBasePc);
	}
}

.work-item {
	width: calc(50% - math.div(calc(15vw/2), $designBaseSp));
	@include mq("pc") {
		width: calc(33.33% - math.div(calc(40vw/3), $designBasePc));
	}
}

.work-text-none {
	line-height: 150%;
	font-size: math.div(14vw, $designBaseSp);
	margin: math.div(40vw, $designBaseSp) 0 math.div(60vw, $designBaseSp);
	@include mq("pc") {
		line-height: 100%;
		font-size: math.div(16vw, $designBasePc);
		margin: math.div(80vw, $designBasePc) 0;
	}
}
</style>
