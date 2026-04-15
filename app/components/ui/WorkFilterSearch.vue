<script setup lang="ts">
import type { Suggestion } from '~/types/work';

defineProps<{
	suggestions: Suggestion[];
	activeIndex: number;
	showSuggestions: boolean;
}>();

const searchQuery = defineModel<string>();
const inputRef = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
	(e: 'clear' | 'onFocus' | 'keydownDown' | 'keydownUp'): void;
	(e: 'select', title: string): void;
	(e: 'updateIndex', index: number): void;
	(e: 'onBlur', event: FocusEvent): void;
	(e: 'keydownEnter', event: KeyboardEvent): void;
}>();

defineExpose({
	input: inputRef,
	focus: () => inputRef.value?.focus(),
	blur: () => inputRef.value?.blur(),
});
</script>

<template>
	<div class="work-filter-input-wrapper" @focusout="emit('onBlur', $event)">
		<input
			ref="inputRef"
			v-model="searchQuery"
			type="text"
			placeholder="キーワードで検索"
			class="work-filter-input"
			@focus="emit('onFocus')"
			@keydown.down.prevent="emit('keydownDown')"
			@keydown.up.prevent="emit('keydownUp')"
			@keydown.enter.prevent="emit('keydownEnter', $event)"
		>
		<button v-if="searchQuery" type="button" class="work-filter-input-delete-button" @click="emit('clear')">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><polygon points="512 52.535 459.467 0.002 256.002 203.462 52.538 0.002 0 52.535 203.47 256.005 0 459.465 52.533 511.998 256.002 308.527 459.467 511.998 512 459.475 308.536 256.005" fill="currentColor" /></svg>
		</button>

		<ul v-if="showSuggestions && suggestions.length > 0" class="work-filter-suggestions">
			<li
				v-for="(suggestion, index) in suggestions"
				:key="suggestion.item.id"
				class="work-filter-suggestions-item"
				:class="{ 'is-active': index === activeIndex }"
			>
				<button
					type="button"
					class="work-filter-suggestions-button"
					@focus="emit('updateIndex', index)"
					@mouseenter="emit('updateIndex', index)"
					@mousedown.prevent="emit('select', suggestion.item.title)"
				>
					{{ suggestion.item.title }}
				</button>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.work-filter-input-wrapper{
  width: 100%;
  margin-bottom: math.div(30vw, $designBaseSp);
  position: relative;
  @include mq("pc"){
    margin-bottom: math.div(30vw, $designBasePc);
  }
}

.work-filter-input{
  display: block;
  width: 100%;
  border: 1px solid rgb(var(--gray02));
  padding: math.div(10vw, $designBaseSp) math.div(30vw, $designBaseSp) math.div(10vw, $designBaseSp) math.div(15vw, $designBaseSp);
  font-size: math.div(16vw, $designBaseSp);
  position: relative;
  @include mq("pc"){
    padding: math.div(10vw, $designBasePc) math.div(30vw, $designBasePc) math.div(10vw, $designBasePc) math.div(12vw, $designBasePc);
    font-size: math.div(14vw, $designBasePc);
  }
  &::placeholder::-webkit-input-placeholder{
    color: rgb(var(--gray02));
    position: absolute;
    top: 50%;
    left: math.div(10vw, $designBaseSp);
    translate: 0 -50%;
    line-height: normal;
    @include mq("pc"){
      font-size: math.div(12vw, $designBasePc);
      left: math.div(10vw, $designBasePc);
    }
  }
}

.work-filter-input-delete-button{
  position: absolute;
  top: 50%;
  right: .7em;
  translate: 0 -50%;
  display: inline-block;
  line-height: 100%;
  background: rgb(var(--gray01));
  border-radius: 50%;
  svg{
    display: inline-block;
    visibility: visible;
    width: math.div(20vw, $designBaseSp);
    height: math.div(20vw, $designBaseSp);
    scale: .4;
    @include mq("pc"){
      width: math.div(20vw, $designBasePc);
      height: math.div(20vw, $designBasePc);
    }
  }
}

.work-filter-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgb(var(--white01));
  border: 1px solid rgb(var(--gray01));
  z-index: 100;
  padding: 0;
  overflow: hidden;
  border-bottom: 1px solid rgb(var(--gray02));
  border-left: 1px solid rgb(var(--gray02));
  border-right: 1px solid rgb(var(--gray02));
}

.work-filter-suggestions-item {
  text-align: left;
  font-size: math.div(14vw, $designBaseSp);
  @include mq("pc"){
    font-size: math.div(14vw, $designBasePc);
  }
  &:not(:last-of-type){
    border-bottom: 1px solid rgb(var(--gray02));
  }
}

.work-filter-suggestions-button {
  display: block;
  width: 100%;
  text-align: left;
  padding: math.div(15vw, $designBaseSp) math.div(10vw, $designBaseSp);
  line-height: 140%;
  @include mq("pc"){
    padding: math.div(10vw, $designBasePc) math.div(10vw, $designBasePc);
  }
  .is-active &{
    background-color: rgb(var(--blue04));
    color: rgb(var(--blue03));
  }
  &:focus-visible {
    background-color: rgb(var(--blue04));
    color: rgb(var(--blue03));
  }
}
</style>
