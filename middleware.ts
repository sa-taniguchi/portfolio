// vercelBasic認証
import { next } from '@vercel/functions';

export const config = {
	matcher: ['/((?!api|_next|_nuxt|favicon.ico|.*\\..*).*)'],
};

export default function middleware(request: Request) {
	const user = process.env.BASIC_AUTH_USER || process.env.NUXT_BASIC_AUTH_USER;
	const pass = process.env.BASIC_AUTH_PASSWORD || process.env.NUXT_BASIC_AUTH_PASSWORD;

	if (!user || !pass) return next();

	const authHeader = request.headers.get('authorization');
	const expectedAuth = `Basic ${btoa(`${user}:${pass}`)}`;

	if (authHeader === expectedAuth) {
		return next();
	}

	// 401レスポンスを「変数」に一度格納し、確実にヘッダーを固める
	const response = new Response('Authentication Required', {
		status: 401,
		headers: {
			'WWW-Authenticate': 'Basic realm="Secure Area"',
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
			'Expires': '0',
			'Pragma': 'no-cache',
		},
	});

	return response;
}
