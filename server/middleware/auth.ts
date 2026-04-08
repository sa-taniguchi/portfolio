// server/middleware/auth.ts
export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);
	const path = event.path; // event.path を直接参照

	// 1. 静的ファイル（画像やJS）と API は絶対にスルーさせる
	// これが API の 401 を直す鍵です
	if (
		path.startsWith('/_nuxt')
		|| path.startsWith('/api/')
		|| path.match(/\.(png|jpg|jpeg|gif|svg|webp|js|css)$/)
	) {
		return;
	}

	const user = config.basicAuthUser;
	const pass = config.basicAuthPassword;

	// ここでログを出して、VercelのLogsで「値が来ているか」絶対確認してください
	console.log('Basic Auth Check:', { user: !!user, pass: !!pass, path });

	if (!user || !pass) return;

	const authHeader = getRequestHeader(event, 'authorization');
	// 確実な Buffer 指定（node:buffer を使わない標準の書き方）
	const expected = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;

	if (authHeader !== expected) {
		setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Protected Area"');
		throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
	}
});
