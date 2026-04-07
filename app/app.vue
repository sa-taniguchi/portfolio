<script setup lang="ts">
// import { onMounted } from 'vue';

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

// onMounted(() => {
// 	const setLoadClass = () => {
// 		setTimeout(() => {
// 			document.body.classList.add('is-load');
// 		}, 500);
// 	};

// 	// すでにリソース読み込みが完了（complete）していれば即実行
// 	if (document.readyState === 'complete') {
// 		setLoadClass();
// 	}
// 	else {
// 		// まだなら、完了した瞬間に一度だけ実行
// 		window.addEventListener('load', setLoadClass, { once: true });
// 	}
// });
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
