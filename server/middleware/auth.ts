export default defineEventHandler((event) => {
	const config = useRuntimeConfig(event);
	const path = event.path;

	// 1. 【最優先】プリレンダリング（ビルド時）は絶対にスルー
	// 以下の3つの判定をすべて入れることで、ビルドエラーを確実に防ぎます
	if (
		process.env.NODE_ENV === 'prerender'
		|| import.meta.prerender
		|| getRequestHeader(event, 'x-nitro-prerender')
	) {
		return;
	}

	// 2. APIや静的ファイルを除外
	if (path.startsWith('/api/') || path.startsWith('/_nuxt')) {
		return;
	}

	const user = config.basicAuthUser;
	const pass = config.basicAuthPassword;

	// 環境変数が空のとき（ビルド時など）はスルーしてエラーを防ぐ
	if (!user || !pass) return;

	const authHeader = getRequestHeader(event, 'authorization');
	const expected = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;

	if (authHeader !== expected) {
		setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Protected Area"');
		throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
	}
});
