<script setup lang="ts">
// import { onMounted } from 'vue';

const { currentUrl, titleStr, descStr, domain, ogImage, ogTitle, ogDescription } = usePageMetadata();

// SEOメタ情報の設定（OGP / Twitter / 基本Meta）
useSeoMeta({
	title: () => titleStr.value,
	description: () => descStr.value,

	// Facebook / OGP
	ogType: 'website',
	ogSiteName: '谷口聡のポートフォリオ',
	ogTitle: () => ogTitle.value,
	ogDescription: () => ogDescription.value,
	ogUrl: () => currentUrl.value,
	ogImage: () => ogImage.value,
	ogLocale: 'ja_JP',

	// Twitter
	twitterCard: 'summary_large_image',
	twitterTitle: () => ogTitle.value,
	twitterDescription: () => ogDescription.value,
	twitterImage: () => ogImage.value,
});

// その他の Head 情報の設定
useHead({
	titleTemplate: '%s | 谷口聡のポートフォリオ',
	htmlAttrs: {
		lang: 'ja',
	},
	link: [
		{ rel: 'canonical', href: () => currentUrl.value },
		{ rel: 'index', href: domain },
	],
});

</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
