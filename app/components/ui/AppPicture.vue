<script setup lang="ts">
import { computed } from 'vue';
import type { StyleValue } from 'vue';

interface PictureSource {
	srcset: string;
	type: string;
	media?: string;
	sizes?: string;
	width?: number | string;
}

interface Props {
	src: string;
	alt: string;
	sources?: PictureSource[];
	loading?: 'lazy' | 'eager';
	decoding?: 'async' | 'sync' | 'auto';
	width?: number | string;
	height?: number | string;
	imgClass?: string;
	imgStyle?: StyleValue;
	fetch?: 'high' | 'low' | 'auto';
}

const props = withDefaults(defineProps<Props>(), {
	sources: () => [],
	loading: 'eager',
	decoding: 'auto',
	fetch: 'auto',
});

/**
 * picture は上から評価されるため、
 * media 指定あり → なし の順に並べ替える
 */
const normalizedSources = computed(() => {
	return [...props.sources].sort((a, b) => {
		if (a.media && !b.media) return -1;
		if (!a.media && b.media) return 1;
		return 0;
	});
});
</script>

<template>
	<picture class="c-appPicture">
		<source
			v-for="(source, index) in normalizedSources"
			:key="index"
			:srcset="source.srcset"
			:type="source.type"
			:media="source.media"
			:sizes="source.sizes"
		>

		<img
			:src="src"
			:alt="alt"
			:loading="loading"
			:decoding="decoding"
			:width="width"
			:height="height"
			:class="imgClass"
			:fetchpriority="fetch"
			:style="imgStyle"
		>
	</picture>
</template>

<style lang="scss" scoped>
.c-appPicture {
  img{
    width: 100%;
    display: block;
    height: auto;
  }
}
</style>
