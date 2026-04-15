<script setup lang="ts">
import type { Suggestion } from '~/types/work';
import type { SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '~/types/speech';
import '~/types/speech'; // グローバル型の読み込み

defineProps<{
	suggestions: Suggestion[];
	activeIndex: number;
	showSuggestions: boolean;
}>();

const searchQuery = defineModel<string>();
const inputRef = ref<HTMLInputElement | null>(null);
const isListening = ref(false);

const emit = defineEmits<{
	(e: 'clear' | 'onFocus' | 'keydownDown' | 'keydownUp'): void;
	(e: 'select', title: string): void;
	(e: 'updateIndex', index: number): void;
	(e: 'onBlur', event: FocusEvent): void;
	(e: 'keydownEnter', event: KeyboardEvent): void;
}>();

// Web Speech API 初期化
const initSpeechRecognition = () => {
	const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
	if (!SpeechRecognition) {
		alert('お使いのブラウザは音声入力に対応していません');
		return null;
	}

	const recognition = new SpeechRecognition();
	recognition.lang = 'ja-JP';
	recognition.interimResults = true;
	recognition.continuous = false;

	recognition.onstart = () => {
		isListening.value = true;
	};

	recognition.onresult = (event: SpeechRecognitionEvent) => {
		let interimTranscript = '';
		for (let i = event.resultIndex; i < event.results.length; i++) {
			const result = event.results[i];
			if (!result || !result[0]) continue;
			const transcript = result[0].transcript;
			if (result.isFinal) {
				searchQuery.value += transcript;
				// 音声入力完了後に入力欄に focus を戻す
				nextTick(() => {
					inputRef.value?.focus();
					emit('onFocus');
				});
			} else {
				interimTranscript += transcript;
			}
		}
	};

	recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
		console.error('音声認識エラー:', event.error);
		isListening.value = false;
	};

	recognition.onend = () => {
		isListening.value = false;
	};

	return recognition;
};

let recognition: SpeechRecognition | null = null;

const toggleVoiceInput = () => {
	if (!recognition) {
		recognition = initSpeechRecognition();
	}

	if (isListening.value) {
		recognition?.stop();
		isListening.value = false;
	} else {
		recognition?.start();
	}
};

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
		<button v-else type="button" class="work-filter-voice-button" :class="{ 'is-listening': isListening }" @click="toggleVoiceInput">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
				<path d="M17 16.91c-1.48 1.46-3.51 2.36-5.77 2.36-2.26 0-4.29-.9-5.77-2.36l-1.1 1.1c1.71 1.71 4.06 2.75 6.87 2.75s5.16-1.04 6.87-2.75l-1.1-1.1zM19 12h2c0 .04-.06 2.16-1.58 3.64l1.41 1.41C23.02 15.26 24 13.06 24 12h-5z" />
			</svg>
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

.work-filter-input-delete-button,
.work-filter-voice-button {
  position: absolute;
  top: 50%;
  right: .7em;
  translate: 0 -50%;
  display: inline-block;
  line-height: 100%;
  background-color: rgb(var(--gray01));
  border-radius: 50%;
  padding: 0;
  border: none;
  cursor: pointer;
  color: rgb(var(--black01));
  transition: background-color 0.3s, color .3s;
  
  svg{
    display: inline-block;
    visibility: visible;
    width: math.div(25vw, $designBaseSp);
    height: math.div(25vw, $designBaseSp);
    @include mq("pc"){
      width: math.div(25vw, $designBasePc);
      height: math.div(25vw, $designBasePc);
    }
  }

  &.is-listening {
    background: rgb(var(--blue03));
    color: rgb(var(--white01));
  }
}

.work-filter-input-delete-button{
  svg{
    scale: .4;
  }
}

.work-filter-voice-button {
  svg{
    scale: .7;
  }
  &.is-listening {
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% {
      scale: 1;
      opacity: 1;
    }
    50% {
      scale: 1.1;
    }
    100% {
      scale: 1;
      opacity: 0.7;
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
