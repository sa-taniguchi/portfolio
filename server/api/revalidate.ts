export default defineEventHandler(async (event) => {
	// POSTのみ許可
	if (event.node.req.method !== 'POST') {
		throw createError({ statusCode: 405, statusMessage: 'Method not allowed' });
	}

	const query = getQuery(event);
	const secret = query.secret;

	// シークレットトークンの検証
	if (secret !== process.env.REVALIDATE_SECRET) {
		throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
	}

	// MicroCMSからのWebhookデータを取得
	const body = await readBody(event);
	console.log('Revalidate webhook received:', body);

	try {
		// キャッシュをクリア
		const storage = useStorage('cache');
		await storage.clear();

		// Vercel ISR revalidate（本番環境のみ）
		if (process.env.VERCEL_ENV === 'production') {
			await $fetch('/api/revalidate', {
				method: 'POST',
				body: { paths: ['/'] },
				headers: {
					'x-prerender-revalidate': process.env.REVALIDATE_SECRET,
				},
			});
		}

		return { revalidated: true, cacheCleared: true };
	}
	catch (error) {
		console.error('ISR revalidation failed:', error);
		throw createError({ statusCode: 500, statusMessage: 'Revalidation failed' });
	}
});
