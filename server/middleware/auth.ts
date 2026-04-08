import { Buffer } from 'node:buffer';

export default defineEventHandler((event) => {
	const config = useRuntimeConfig(event);
	const path = event.path;

	// 1. 除外ルール（変更なし）
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

	console.log(`Checking Auth for: ${path} | UserConfig: ${!!user}`);

	// 環境変数が設定されていない場合はスキップ
	if (!user || !pass) {
		return;
	}

	const authHeader = getRequestHeader(event, 'authorization');
	const expected = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;

	if (authHeader !== expected) {
		// 【重要修正 1】 header を確実に固定する
		setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Protected Area", charset="UTF-8"');

		// 【重要修正 2】 throw createError ではなく、sendError または
		// H3のエラーオブジェクトを直接返すことでヘッダー喪失を防ぐ
		const error = createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
			message: '認証が必要です',
		});

		return sendError(event, error);
	}
});
