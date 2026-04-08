import { next } from '@vercel/edge';

export const config = {
	// 認証をかけたいパスを指定（静的ファイルやAPIを除外）
	matcher: ['/((?!api|_next|_nuxt|favicon.ico|.*\\..*).*)'],
};

export default function middleware(req: Request) {
	const authHeader = req.headers.get('authorization');

	// Vercelの環境変数から取得（NUXT_ プレフィックスなしで登録されている場合を想定）
	// Vercel管理画面で BASIC_AUTH_USER / BASIC_AUTH_PASSWORD として登録してください
	const user = process.env.BASIC_AUTH_USER || process.env.NUXT_BASIC_AUTH_USER;
	const pass = process.env.BASIC_AUTH_PASSWORD || process.env.NUXT_BASIC_AUTH_PASSWORD;

	if (user && pass) {
		const basicAuth = `Basic ${btoa(`${user}:${pass}`)}`;

		if (authHeader === basicAuth) {
      const response = next();
      response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
			return next();
		}
	}

	// 認証失敗時：Edgeから直接 401 を返す（Nuxtまで到達させない）
	return new Response('Authentication Required', {
		status: 401,
		headers: {
			'WWW-Authenticate': 'Basic realm="Secure Area"',
		},
	});
}
