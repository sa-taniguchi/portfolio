export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  
  // 1. プリレンダリング（ビルド時）は認証をスキップする
  // Nitroが静的ファイルを書き出している時はこのヘッダーが 'true' になります
  const isPrerendering = getRequestHeader(event, 'x-nitro-prerender');
  if (isPrerendering) return;

  const user = config.basicAuthUser;
  const pass = config.basicAuthPassword;

  // 環境変数がセットされていない場合は認証をスキップ
  if (!user || !pass) return;

  const authHeader = getRequestHeader(event, 'authorization');
  const expected = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;

  if (authHeader !== expected) {
    setHeader(event, 'WWW-Authenticate', 'Basic realm="Protected Area"');
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
});