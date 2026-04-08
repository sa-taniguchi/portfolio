import { Buffer } from 'node:buffer';

export default defineEventHandler((event) => {
	const config = useRuntimeConfig(event);
	const path = event.path;

	// 1. 除外ルール：ビルド時(Prerender)、内部API、静的ファイル、Nuxtのデータファイルを許可
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

	// 環境変数が設定されていない場合は認証をスキップ（開発環境など）
	if (!user || !pass) {
		return;
	}

	const authHeader = getRequestHeader(event, 'authorization');
	const expected = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;

	if (authHeader !== expected) {
		// ブラウザに認証ダイアログを表示させるためのヘッダー
		setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Protected Area"');

		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
			message: '認証が必要です',
		});
	}
});
