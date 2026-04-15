<script setup lang="ts">
import type { Category, WorkType, Suggestion } from '~/types/work';
import type WorkFilterSearch from './WorkFilterSearch.vue';

defineProps<{
	isFilterOpen: boolean;
	isSpFilterButton: boolean;
	isMobile: boolean;
	totalCount: number;
	categories: Category[];
	workTypes: WorkType[];
	selectedCategories: string[];
	selectedWorkTypes: string[];
	suggestions: Suggestion[];
	activeIndex: number;
	showSuggestions: boolean;
}>();

const searchQuery = defineModel<string>('searchQuery');
const emit = defineEmits<{
	(e: 'toggle'): void;
	(e: 'close'): void;
	(e: 'apply'): void;
	(e: 'reset'): void;
	(e: 'clearInput'): void;
	(e: 'toggleCategory', id: string): void;
	(e: 'toggleWorkType', id: string): void;
	(e: 'selectSuggestion', title: string): void;
	(e: 'updateActiveIndex', index: number): void;
	(e: 'keydownDown'): void;
	(e: 'keydownUp'): void;
	(e: 'keydownEnter', event: KeyboardEvent): void;
	(e: 'onFocus'): void;
	(e: 'onBlur', event: FocusEvent): void;
}>();

// 子コンポーネントへのRef
// const searchRef = ref(null);
const spFilterButton = ref<HTMLButtonElement | null>(null);
const spFixedButton = ref<HTMLButtonElement | null>(null);
const searchRef = ref<InstanceType<typeof WorkFilterSearch> | null>(null);

// 親（WorkList）へ公開
defineExpose({
	spFilterButton,
	spFixedButton,
	inputRef: computed(() => searchRef.value?.input),
	focusInput: () => searchRef.value?.focus(),
});
</script>

<template>
	<aside id="work-filter-aside" class="work-filter">
		<ul class="u-sp">
			<li>
				<button
					ref="spFilterButton"
					class="work-filter-spButton"
					@click="emit('toggle')"
				>
					絞り込み検索
				</button>
			</li>
		</ul>
		<button
			ref="spFixedButton"
			class="work-filter-spOpen-button"
			:class="{ 'is-inview': isSpFilterButton }"
			@click="emit('toggle')"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 128 128"
				fill="none"
				stroke="currentColor"
				stroke-width="4"
				stroke-linecap="round"
				stroke-miterlimit="1.3"
			>
				<line
					x1="23.6"
					y1="37.5"
					x2="40.1"
					y2="37.5"
				/>
				<line
					x1="69.3"
					y1="37.5"
					x2="104.4"
					y2="37.5"
				/>
				<circle cx="54.7" cy="37.5" r="9" />
				<line
					x1="104.4"
					y1="63.9"
					x2="87.9"
					y2="63.9"
				/>
				<line
					x1="58.7"
					y1="63.9"
					x2="23.6"
					y2="63.9"
				/>
				<circle cx="73.3" cy="63.9" r="9" />
				<line
					x1="104.4"
					y1="90.5"
					x2="76.4"
					y2="90.5"
				/>
				<line
					x1="47.1"
					y1="90.5"
					x2="23.6"
					y2="90.5"
				/>
				<circle cx="61.8" cy="90.5" r="9" />
			</svg>
		</button>

		<div class="work-filter-inner" :class="{ 'is-open': isFilterOpen }">
			<button class="work-filter-closeSp-button u-sp" @click="emit('close')">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><polygon points="512 52.535 459.467 0.002 256.002 203.462 52.538 0.002 0 52.535 203.47 256.005 0 459.465 52.533 511.998 256.002 308.527 459.467 511.998 512 459.475 308.536 256.005" fill="currentColor" /></svg>
			</button>
			<div class="work-filter-number-wrapper">
				<p class="work-filter-number">
					<span>{{ totalCount }}</span>件の作品
				</p>
			</div>
			<UiWorkFilterSearch
				ref="searchRef"
				v-model="searchQuery"
				:suggestions="suggestions"
				:active-index="activeIndex"
				:show-suggestions="showSuggestions"
				@clear="emit('clearInput')"
				@select="(t: string) => emit('selectSuggestion', t)"
				@update-index="(i: number) => emit('updateActiveIndex', i)"
				@on-focus="emit('onFocus')"
				@on-blur="(e: FocusEvent) => emit('onBlur', e)"
				@keydown-down="emit('keydownDown')"
				@keydown-up="emit('keydownUp')"
				@keydown-enter="(e: KeyboardEvent) => emit('keydownEnter', e)"
			/>

			<div class="work-filter-outer">
				<UiWorkFilterGroup
					title="制作ジャンル"
					:items="categories.map(c => ({ id: c.categoryId, label: c.label }))"
					:selected-ids="selectedCategories"
					@toggle="(id:string) => emit('toggleCategory', id)"
				/>
				<UiWorkFilterGroup
					title="制作区分"
					is-type
					:items="workTypes.map(t => ({ id: t.workTypeId, label: t.label }))"
					:selected-ids="selectedWorkTypes"
					@toggle="(id:string) => emit('toggleWorkType', id)"
				/>
			</div>
			<div class="work-filter-footer-buttons">
				<button class="work-filter-footer-button --reset" @click="emit('reset')">
					リセット
				</button>
				<button v-if="isMobile" class="work-filter-footer-button --search u-sp" @click="emit('apply')">
					検索する
				</button>
			</div>
		</div>
	</aside>
</template>

<style lang="scss" scoped>
.work-filter{
  @include mq("pc"){
    width: 20%;
    position: sticky;
    margin-top: math.div(32vw, $designBasePc);
    top: math.div(100vw, $designBasePc);
    padding: math.div(40vw, $designBasePc) math.div(20vw, $designBasePc);
    background-color: rgb(var(--gray03));
  }
}

.work-filter-inner{
  @include mq("tab"){
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow-y: auto;
    height: 100dvh;
    background: rgb(var(--white01));
    opacity: 0;
    visibility: hidden;
    z-index: -1;
    transition: opacity .3s, visibility .3s, z-index .3s;
    padding: math.div(80vw, $designBaseSp) math.div(20vw, $designBaseSp);
    &.is-open{
      opacity: 1;
      visibility: visible;
      z-index: 1000;
    }
  }
}

.work-filter-spButton{
  @include mq("tab"){
    display: block;
    font-weight: 700;
    letter-spacing: .06em;
    font-size: math.div(16vw, $designBaseSp);
    background-color: rgb(var(--blue03));
    color: rgb(var(--white01));
    width: 50%;
    margin: 0 auto math.div(30vw, $designBaseSp);
    height: math.div(50vw, $designBaseSp);
  }
}

.work-filter-spOpen-button{
  @include mq("tab"){
    position: fixed;
    bottom: math.div(20vw, $designBaseSp);
    right: math.div(20vw, $designBaseSp);
    display: inline-block;
    width: math.div(50vw, $designBaseSp);
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: rgb(var(--blue03));
    padding: math.div(8vw, $designBaseSp);
    color: rgb(var(--white01));
    line-height: 100%;
    opacity: 0;
    visibility: hidden;
    z-index: -1;
    transition: opacity .3s, visibility .3s, z-index .3s;
    &.is-inview{
      opacity: 1;
      visibility: visible;
      z-index: 100;
    }
  }
}

.work-filter-closeSp-button{
  @include mq("tab"){
    position: fixed;
    top: 0;
    right: 0;
    width: math.div(60vw, $designBaseSp);
    aspect-ratio: 1/1;
    padding: math.div(22vw, $designBaseSp);
    svg{
      width: 100%;
    }
  }
}

.work-filter-number-wrapper{
  padding:0 0 math.div(30vw, $designBaseSp);
  @include mq("pc"){
    padding:0 0 math.div(30vw, $designBasePc);
  }
}

.work-filter-number{
  font-weight: 500;
  line-height: 100%;
  @include mq("pc"){
    font-size: math.div(14vw, $designBasePc);
  }
  >span{
    font-weight: 500;
    @include mq("pc"){
      font-size: math.div(21vw, $designBasePc);
    }
  }
}

.work-filter-outer{
  border-top: 1px solid rgb(var(--gray02));
  border-bottom: 1px solid rgb(var(--gray02));
  display: flex;
  flex-direction: column;
  gap: math.div(30vw, $designBaseSp);
  padding-top: math.div(20vw, $designBaseSp);
  padding-bottom: math.div(20vw, $designBaseSp);
  margin-bottom: math.div(30vw, $designBaseSp);
  @include mq("pc"){
    gap: math.div(30vw, $designBasePc);
    padding-top: math.div(20vw, $designBasePc);
    padding-bottom: math.div(20vw, $designBasePc);
    margin-bottom: math.div(20vw, $designBasePc);
  }
}

.work-reset-button-wrapper{
  line-height: 100%;
  margin: 0;
  @include mq("tab"){
    margin-top: math.div(30vw, $designBaseSp);
  }
}

.work-filter-footer-buttons{
  @include mq("tab"){
    display: flex;
    gap: math.div(20vw, $designBaseSp);
  }
}

.work-filter-footer-button{
  line-height: 100%;
  padding: math.div(15vw, $designBaseSp) math.div(16vw, $designBaseSp);
  font-size: math.div(12vw, $designBaseSp);
  font-weight: 700;
  letter-spacing: .06em;
  width: 50%;
  @include mq("pc"){
    padding: math.div(8vw, $designBasePc) math.div(16vw, $designBasePc);
    font-size: math.div(12vw, $designBasePc);
  }
  &.--reset{
    color: rgb(var(--black01));
    background-color: rgb(var(--gray01));
  }
  &.--search{
    color: rgb(var(--white01));
    background-color: rgb(var(--black01));
  }
}
</style>
