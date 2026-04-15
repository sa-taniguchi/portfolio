export const usePageMetadata = () => {
	const config = useRuntimeConfig();
	const route = useRoute();

	const currentUrl = computed(() => {
		return `${config.public.domain}${route.path}`;
	});

	const titleStr = computed(() => (route.meta.title as string) || '谷口聡のポートフォリオ');
	const descStr = computed(() => (route.meta.description as string) || 'フロントエンドエンジニア 谷口聡のポートフォリオサイトです。自己紹介や作品一覧を記載しております。');
	const fullTitle = computed(() => `${titleStr.value} | 谷口聡のポートフォリオ`);
	const ogImage = computed(() => (route.meta.ogImage as string) || `${config.public.domain}/ogp.jpg`);
	const ogTitle = computed(() => (route.meta.ogTitle as string) || fullTitle.value);
	const ogDescription = computed(() => (route.meta.ogDescription as string) || descStr.value);

	return {
		titleStr,
		descStr,
		domain: config.public.domain,
		currentUrl,
		fullTitle,
		ogImage,
		ogTitle,
		ogDescription,
	};
};
