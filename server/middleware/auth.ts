export default defineEventHandler((event) => {
	const config = useRuntimeConfig(event);

	// 1. プリレンダリング時はスキップ
	if (getRequestHeader(event, 'x-nitro-prerender')) return;

	// 2. event.path を使って判定（非推奨の getRequestPath を回避）
	// /api/ へのリクエストはBasic認証の対象外にする
	if (event.path.startsWith('/api/')) return;

	const user = config.basicAuthUser;
	const pass = config.basicAuthPassword;

	// 環境変数がセットされていない場合はスルー
	if (!user || !pass) return;

	const authHeader = getRequestHeader(event, 'authorization');

	// 3. Bufferの代わりに標準の btoa を使用（Node.js 16+ / Edge環境で動作）
	const expected = `Basic ${btoa(`${user}:${pass}`)}`;

	if (authHeader !== expected) {
		setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Protected Area"');
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		});
	}
});
