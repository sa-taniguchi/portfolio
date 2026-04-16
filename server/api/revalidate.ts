// export default defineEventHandler(async (event) => {
//   const query = getQuery(event);

//   // ① まずは microCMS からのアクセスを「自分」でチェック
//   // ここで REVALIDATE_SECRET を使います
//   if (query.secret !== process.env.REVALIDATE_SECRET) {
//     throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
//   }

//   try {
//     const bypassToken = process.env.VERCEL_AUTOMATION_BYPASS_SECRET; // ② Vercelの設定画面で取ったトークン
//     const siteUrl = 'https://st-portfolio2026.vercel.app';

//     // 自分自身のAPIに対して、Vercelのキャッシュを無視するようにリクエストを送る
//     await $fetch(`${siteUrl}/api/works`, {
//       headers: {
//         // Vercelはこのヘッダーを見て「キャッシュを無視してNitroまで通す」と判断します
//         'x-vercel-protection-bypass': bypassToken,
//         'x-prerender-revalidate': bypassToken,
//       }
//     });

//     return { revalidated: true };
//   } catch (error) {
//     throw createError({ statusCode: 500, statusMessage: 'Revalidation failed' });
//   }
// });

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const query = getQuery(event);

	// ① まずは microCMS からのアクセスを「自分」でチェック
	// ここで REVALIDATE_SECRET を使います
	if (query.secret !== config.REVALIDATE_SECRET) {
		throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
	}

	try {
		const bypassToken = config.VERCEL_AUTOMATION_BYPASS_SECRET; // ② Vercelの設定画面で取ったトークン

		// 自分自身のAPIに対して、Vercelのキャッシュを無視するようにリクエストを送る
		await $fetch(`${config.public.domain}/api/works`, {
			headers: {
				// Vercelはこのヘッダーを見て「キャッシュを無視してNitroまで通す」と判断します
				'x-vercel-protection-bypass': bypassToken,
				'x-prerender-revalidate': bypassToken,
			},
		});

		return { revalidated: true };
	}
	catch (error) {
		console.error('ISR Revalidation Error:', error);

		throw createError({
			statusCode: 500,
			statusMessage: `Revalidation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
		});
	}
});
