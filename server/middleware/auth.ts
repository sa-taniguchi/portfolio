// server/middleware/basic-auth.ts
import {
	getHeader,
	setResponseHeader,
	createError,
	getRequestURL,
	type H3Event,
} from 'h3';

export default defineEventHandler((event: H3Event) => {
	const url = getRequestURL(event);

	// 🔥 除外対象
	if (
		url.pathname.startsWith('/api') // API
		|| url.pathname.startsWith('/_nuxt') // JS/CSS
		|| url.pathname.startsWith('/favicon') // favicon
	) {
		return;
	}

	const authHeader = getHeader(event, 'authorization');
	if (!authHeader) return unauthorized(event);

	const [scheme, credentials] = authHeader.split(' ');
	if (scheme !== 'Basic' || !credentials) {
		return unauthorized(event);
	}

	const decoded = Buffer.from(credentials, 'base64').toString('utf-8');
	const [user, pass] = decoded.split(':');

	const config = useRuntimeConfig(event);

	if (user !== config.basicAuthUser || pass !== config.basicAuthPassword) {
		return unauthorized(event);
	}
});

function unauthorized(event: H3Event): never {
	setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Secure Area"');
	throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
}

// export default defineEventHandler((event) => {
// 	const config = useRuntimeConfig(event);
// 	const path = event.path;

// 	// 1. 除外ルール（変更なし：ビルド、API、静的ファイル、payloadを許可）
// 	if (
// 		import.meta.prerender
// 			|| path.startsWith('/api/')
// 			|| path.startsWith('/_nuxt')
// 			|| path.includes('_payload.json')
// 			|| path.match(/\.(png|jpg|jpeg|gif|svg|webp|js|css)$/)
// 	) {
// 		return;
// 	}

// 	const user = config.basicAuthUser;
// 	const pass = config.basicAuthPassword;

// 	console.log(`Auth request: ${path} | User: ${user ? 'SET' : 'MISSING'}`);
// 	// 環境変数が設定されていない場合はスキップ
// 	if (!user || !pass) return;

// 	const authHeader = getRequestHeader(event, 'authorization');

// 	// 2. 【重要】Buffer を使わず btoa に変更してクラッシュを防止
// 	const expected = `Basic ${btoa(`${user}:${pass}`)}`;

// 	if (authHeader !== expected) {
// 		// 3. ヘッダーを確実にセット
// 		setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Protected Area"');

// 		// 4. 401エラーを投げる
// 		throw createError({
// 			statusCode: 401,
// 			statusMessage: 'Unauthorized',
// 			fatal: true,
// 		});
// 	}
// });
