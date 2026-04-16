export default defineCachedEventHandler(async (event) => {
	const config = useRuntimeConfig();

	// ISRキャッシュ設定（24時間）
	setHeader(event, 'Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');

	// skill APIのエンドポイント+APIキー
	return await $fetch(`${config.public.apiBase}/works`, {
		headers: {
			'X-MICROCMS-API-KEY': config.microCmsApiKey,
		},
		method: 'GET',
	});
}, {
	maxAge: 86400, // 24時間キャッシュ
	swr: true, // Stale While Revalidate有効
});
