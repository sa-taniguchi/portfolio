<script setup lang="ts">
const { currentUrl, titleStr, descStr, fullTitle, domain } = usePageMetadata();

// SEOメタ情報の設定（OGP / Twitter / 基本Meta）
useSeoMeta({
	title: () => titleStr.value,
	description: () => descStr.value,

	// Facebook / OGP
	ogType: 'website',
	ogSiteName: 'xxxx',
	ogTitle: () => fullTitle.value,
	ogDescription: () => descStr.value,
	ogUrl: () => currentUrl.value,
	ogImage: `${domain}/ogp.jpg`,
	ogLocale: 'ja_JP',

	// Twitter
	twitterCard: 'summary_large_image',
	twitterTitle: () => fullTitle.value,
	twitterDescription: () => descStr.value,
	twitterImage: `${domain}/ogp.jpg`,
});

// その他の Head 情報の設定
useHead({
	titleTemplate: '%s | xxx',
	htmlAttrs: {
		lang: 'ja',
	},
	link: [
		{ rel: 'canonical', href: () => currentUrl.value },
		{ rel: 'index', href: domain },
	],
});
// const config = useRuntimeConfig();
// const route = useRoute();

// // ドメインの末尾スラッシュを削除し、現在のパスを結合
// const currentUrl = computed(() => {
// 	const domain = (config.public.domain || 'https://xxxx.com').replace(/\/$/, '');
// 	return `${domain}${route.path}`;
// });

// // route.meta からタイトルとディスクリプションを取得
// const titleStr = computed(() => (route.meta.title as string) || 'デフォルトタイトル');
// const descStr = computed(() => (route.meta.description as string) || 'デフォルトのサイト説明文です。');
// const fullTitle = computed(() => `${titleStr.value} | xxx`);

// // SEOメタ情報の設定（OGP / Twitter / 基本Meta）
// useSeoMeta({
// 	title: titleStr,
// 	description: descStr,
// 	// Facebook / OGP
// 	ogType: 'website',
// 	ogSiteName: 'xxxx',
// 	ogTitle: fullTitle,
// 	ogDescription: descStr,
// 	ogUrl: currentUrl,
// 	ogImage: `${config.public.domain}/ogp.jpg`,
// 	ogLocale: 'ja_JP',

// 	// Twitter
// 	twitterCard: 'summary_large_image',
// 	twitterTitle: fullTitle,
// 	twitterDescription: descStr,
// 	twitterImage: `${config.public.domain}/ogp.jpg`,
// });

// // その他の Head 情報の設定
// useHead({
// 	titleTemplate: '%s | xxx',
// 	link: [
// 		{ rel: 'canonical', href: currentUrl },
// 		{ rel: 'index', href: config.public.domain },
// 	],
// });
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
