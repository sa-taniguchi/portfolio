import { next } from '@vercel/functions';

export const config = {
	// 静的ファイル、内部パス、favicon等を除外して全てのページに適用
	matcher: ['/((?!api|_next|_nuxt|favicon.ico|.*\\..*).*)'],
};

export default function middleware(request: Request) {
	// 1. 環境変数の取得（Vercel管理画面で設定したもの）
	const user = process.env.BASIC_AUTH_USER || process.env.NUXT_BASIC_AUTH_USER;
	const pass = process.env.BASIC_AUTH_PASSWORD || process.env.NUXT_BASIC_AUTH_PASSWORD;

	// 環境変数が設定されていない場合は、セキュリティロックを防ぐためにスルー
	if (!user || !pass) {
		return next();
	}

	// 2. Authorizationヘッダーの解析
	const authHeader = request.headers.get('authorization');

	// 比較用のBase64文字列を作成
	const expectedAuth = `Basic ${btoa(`${user}:${pass}`)}`;

	// 3. 認証判定
	if (authHeader === expectedAuth) {
		// 【成功】ページを表示
		const response = next();
		// 認証情報をブラウザにキャッシュさせすぎない設定（セキュリティ向上）
		response.headers.set('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
		return response;
	}

	// 4. 【失敗】認証ダイアログを強制表示
	// モバイルSafari/Chromeでダイアログを出すための3つの必須設定
	return new Response('Authentication Required', {
		status: 401,
		headers: {
			// ① 大文字の 'WWW-Authenticate'
			// ② realmをダブルクォーテーションで囲む
			'WWW-Authenticate': 'Basic realm="Secure Area"',
			// ③ モバイルブラウザ向けにContent-Typeを明示
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
		},
	});
}
