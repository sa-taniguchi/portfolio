export default defineEventHandler((event) => {
	const config = useRuntimeConfig(event);
	const path = event.path;

	// 1. 除外ルール（変更なし：ビルド、API、静的ファイル、payloadを許可）
	if (
		import.meta.prerender
			|| path.startsWith('/api/')
			|| path.startsWith('/_nuxt')
			|| path.includes('_payload.json')
			|| path.match(/\.(png|jpg|jpeg|gif|svg|webp|js|css)$/)
	) {
		return;
	}

	const user = config.basicAuthUser;
	const pass = config.basicAuthPassword;

	// 環境変数が設定されていない場合はスキップ
	if (!user || !pass) return;

	const authHeader = getRequestHeader(event, 'authorization');

	// 2. 【重要】Buffer を使わず btoa に変更してクラッシュを防止
	const expected = `Basic ${btoa(`${user}:${pass}`)}`;

	if (authHeader !== expected) {
		// 3. ヘッダーを確実にセット
		setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Protected Area"');

		// 4. 401エラーを投げる
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
			fatal: true,
		});
	}
});
