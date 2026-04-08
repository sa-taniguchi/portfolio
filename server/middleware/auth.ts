import { Buffer } from 'node:buffer';

export default defineEventHandler((event) => {
	const config = useRuntimeConfig(event);
	const path = event.path;

	// 1. 除外ルール（プリレンダリング、API、静的ファイル）
	if (
		import.meta.prerender
			|| path.startsWith('/api/')
			|| path.startsWith('/_nuxt')
			|| path.includes('_payload.json')
			|| path.match(/\.(png|jpg|jpeg|gif|svg|webp|js|css|ico)$/)
	) {
		return;
	}

	const user = config.basicAuthUser;
	const pass = config.basicAuthPassword;

	// 環境変数が設定されていない場合はスキップ（開発環境など）
	if (!user || !pass) {
		return;
	}

	// 2. Authorizationヘッダーを取得（string | undefined）
	const authHeader = getRequestHeader(event, 'authorization');

	if (authHeader) {
		// "Basic abc123..." の形式から Base64部分のみ抽出
		const base64Credentials = authHeader.split(' ')[1];

		// base64Credentials が存在する場合のみ Buffer 処理を行う
		if (base64Credentials) {
			const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
			const [username, password] = credentials.split(':');

			if (username === user && password === pass) {
				return; // 認証成功、次の処理へ
			}
		}
	}

	// 3. 認証失敗時：ヘッダーをセットして 401 エラーを投げる
	// Vercelでのクラッシュを防ぐため、setResponseHeader を先に呼ぶ
	setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Secure Area", charset="UTF-8"');

	throw createError({
		statusCode: 401,
		statusMessage: 'Unauthorized',
		message: 'Authentication Required',
	});
});
