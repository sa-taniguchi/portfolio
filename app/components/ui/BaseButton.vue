<script setup lang="ts">
import { NuxtLink } from '#components';

interface Props {
	label: string;
	to?: string;
	color?: 'transparent' | 'blue';
	target?: string;
	isDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	color: 'blue',
	isDisabled: false,
});

// 1. どのコンポーネント/タグを使うか判定
const tag = computed(() => {
	if (!props.to) return 'button';

	// 外部リンク判定
	const isExternal = /^https?:\/\/|^\/\//i.test(props.to);

	// 外部リンクなら 'a'、内部リンクならコンポーネントそのものを返す
	return isExternal ? 'a' : NuxtLink;
});

// 2. 属性（Props）を整理
const linkProps = computed(() => {
	if (tag.value === 'button') return {};

	if (tag.value === 'a') {
		return {
			href: props.to,
			target: props.target || '_blank',
			rel: 'noopener noreferrer',
		};
	}

	// NuxtLink の場合は 'to' 属性を渡す
	return {
		to: props.to,
		target: props.target,
	};
});
</script>

<template>
	<component
		:is="tag"
		v-bind="linkProps"
		:type="tag === 'button' ? 'button' : undefined"
		class="c-button"
		:class="[`is-${color}`, { 'is-disabled': isDisabled }]"
	>
		<span class="c-button-text">{{ label }}</span>
	</component>
</template>

<style lang="scss" scoped>
  .c-button{
    width: 100%;
    line-height: 100%;
    height: math.div(60vw, $designBaseSp);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: math.div(30vw, $designBaseSp);
    @include mq("pc"){
      height: math.div(60vw, $designBasePc);
      border-radius: math.div(30vw, $designBasePc);
    }
    &.is-disabled{
      pointer-events: none;
      opacity: .5;
    }
    &.is-blue{
      background: rgb(var(--blue03));
      border: 2px solid rgb(var(--blue03));
    }
    &.is-transparent{
      background: transparent;
      border: 2px solid rgb(var(--blue03));
    }
  }
  .c-button-text{
    font-size: math.div(18vw, $designBaseSp);
    line-height: 100%;
    font-weight: 700;
    letter-spacing: .1em;
    color: transparent;
    overflow: hidden;
    @include mq("pc"){
      font-size: math.div(18vw, $designBasePc);
    }
    .is-blue &{
      text-shadow: 0 1.5em 0 rgb(var(--white01)), 0 0 0 rgb(var(--white01));
      transition: text-shadow 0.3s;
    }

    .is-blue:hover &{
      @include mq("hover"){
        text-shadow: 0 0 0 rgb(var(--white01)), 0 -1.5em 0 rgb(var(--white01));
      }
    }
    .is-transparent &{
      text-shadow: 0 1.5em 0 rgb(var(--blue03)), 0 0 0 rgb(var(--blue03));
      transition: text-shadow 0.3s;
    }

    .is-transparent:hover &{
      @include mq("hover"){
        text-shadow: 0 0 0 rgb(var(--blue03)), 0 -1.5em 0 rgb(var(--blue03));
      }
    }
  }
</style>
