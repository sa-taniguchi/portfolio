import { next } from '@vercel/edge';

export const config = {
  // 静的ファイル、API、Next/Nuxtの内部パスを除外
  matcher: ['/((?!api|_next|_nuxt|favicon.ico|.*\\..*).*)'],
};

export default function middleware(req: Request) {
  const user = process.env.BASIC_AUTH_USER || process.env.NUXT_BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASSWORD || process.env.NUXT_BASIC_AUTH_PASSWORD;

  // 環境変数が設定されていない場合は認証をスキップ（デプロイエラー防止）
  if (!user || !pass) {
    return next();
  }

  const authHeader = req.headers.get('authorization');
  const expectedAuth = `Basic ${btoa(`${user}:${pass}`)}`;

  if (authHeader === expectedAuth) {
    // 成功時：必ず response オブジェクトを生成してそれを返す
    const response = next();
    // 認証済みページはキャッシュさせない（セキュリティ上推奨）
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  }

  // 失敗時：401レスポンスを直接生成
  // 重要: headersをオブジェクトリテラルで定義し、確実にダイアログをトリガーする
  return new Response('Authentication Required', {
    status: 401,
    headers: {
      // Chrome/Safari対策: ヘッダー名は標準的な 'WWW-Authenticate' にしつつ、
      // realmをダブルクォーテーションで囲む
      'WWW-Authenticate': 'Basic realm="Secure Area"',
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
    },
  });
}