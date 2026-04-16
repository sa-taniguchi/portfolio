export default defineEventHandler(async () => {
	const config = useRuntimeConfig();

	// skill APIのエンドポイント+APIキー
	return await $fetch(`${config.public.apiBase}/works`, {
		headers: {
			'X-MICROCMS-API-KEY': config.microCmsApiKey,
		},
		method: 'GET',
	});
});
