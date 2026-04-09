export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	const config = useRuntimeConfig();
	console.log('Key Check:', config.microCmsApiKey);
	// microCMSの個別取得エンドポイント
	return await $fetch(`${config.public.apiBase}/works/${id}`, {
		headers: {
			'X-MICROCMS-API-KEY': config.microCmsApiKey,
		},
		method: 'GET',
	});
});
