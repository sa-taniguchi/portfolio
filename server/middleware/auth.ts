export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  
  // 1. プリレンダリング時はスキップ
  if (getRequestHeader(event, 'x-nitro-prerender')) return;

  // 2. 【重要】APIリクエスト（/api/ で始まるもの）は認証をスキップする
  // これを入れないと、自分自身のAPIを叩くときに401で落ちます
  const path = getRequestPath(event);
  if (path.startsWith('/api/')) return;

  const user = config.basicAuthUser;
  const pass = config.basicAuthPassword;

  // 環境変数がセットされていない場合はスルー（開発環境など）
  if (!user || !pass) return;

  const authHeader = getRequestHeader(event, 'authorization');
  const expected = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;

  if (authHeader !== expected) {
    setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Protected Area"');
    throw createError({ 
      statusCode: 401, 
      statusMessage: 'Unauthorized' 
    });
  }
});