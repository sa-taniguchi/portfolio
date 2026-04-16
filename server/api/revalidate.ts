export default defineEventHandler(async (event) => {
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
		// ISRキャッシュの再検証（APIを呼び出してキャッシュ更新）
		await $fetch('/api/works');
		await $fetch('/api/skills');

		return { revalidated: true, timestamp: new Date().toISOString() };
	}
	catch (error) {
		console.error('ISR revalidation failed:', error);
		throw createError({ statusCode: 500, statusMessage: 'Revalidation failed' });
	}
});
