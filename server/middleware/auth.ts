// server/middleware/basic-auth.ts
import {
  getHeader,
  setResponseHeader,
  createError,
  type H3Event,
} from 'h3'

export default defineEventHandler((event: H3Event) => {
  const authHeader = getHeader(event, 'authorization')

  // ① ヘッダー存在チェック
  if (!authHeader) {
    return unauthorized(event)
  }

  // ② "Basic xxx" 形式チェック
  const [scheme, credentials] = authHeader.split(' ')

  if (scheme !== 'Basic' || !credentials) {
    return unauthorized(event)
  }

  // ③ base64 デコード（安全）
  let decoded: string
  try {
    decoded = Buffer.from(credentials, 'base64').toString('utf-8')
  } catch {
    return unauthorized(event)
  }

  // ④ "user:pass" 分解チェック
  const separatorIndex = decoded.indexOf(':')
  if (separatorIndex === -1) {
    return unauthorized(event)
  }

  const user = decoded.slice(0, separatorIndex)
  const pass = decoded.slice(separatorIndex + 1)

  // ⑤ runtimeConfig 取得（Nuxt方式）
  const config = useRuntimeConfig(event)

  const BASIC_USER = config.basicAuthUser
  const BASIC_PASS = config.basicAuthPassword

  if (!BASIC_USER || !BASIC_PASS) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Basic auth env not set',
    })
  }

  // ⑥ 認証チェック
  if (user !== BASIC_USER || pass !== BASIC_PASS) {
    return unauthorized(event)
  }
})

/**
 * 共通 Unauthorized レスポンス
 */
function unauthorized(event: H3Event): never {
  setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Secure Area"')

  throw createError({
    statusCode: 401,
    statusMessage: 'Unauthorized',
  })
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
