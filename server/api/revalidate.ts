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
		await $fetch('/api/works');
		await $fetch('/api/skills');

		// Vercelに「このリクエストはキャッシュ更新用だよ」と教える魔法のヘッダー
		setResponseHeader(event, 'x-prerender-revalidate', process.env.REVALIDATE_SECRET);

		return { revalidated: true };
	}
	catch (error) {
		console.error('ISR revalidation failed:', error);
		throw createError({ statusCode: 500, statusMessage: 'Revalidation failed' });
	}
});
