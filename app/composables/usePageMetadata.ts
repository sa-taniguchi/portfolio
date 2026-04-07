export const usePageMetadata = () => {
	const config = useRuntimeConfig();
	const route = useRoute();

	const currentUrl = computed(() => {
		const domain = (config.public.domain || 'https://xxxx.com').replace(/\/$/, '');
		return `${domain}${route.path}`;
	});

	const titleStr = computed(() => (route.meta.title as string) || 'デフォルトタイトル');
	const descStr = computed(() => (route.meta.description as string) || 'デフォルトのサイト説明文です。');
	const fullTitle = computed(() => `${titleStr.value} | xxx`);

	const shareText = computed(() => {
		return `${descStr.value} \n`;
	});

	return {
		titleStr,
		descStr,
		domain: config.public.domain,
		currentUrl,
		shareText,
		fullTitle,
	};
};
