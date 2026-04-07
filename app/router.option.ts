import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
	scrollBehavior(to, from, savedPosition) {
		// 1. 同じページ内でクエリパラメータ（?q=...など）だけが変わった場合
		if (to.path === from.path) {
			// スクロール位置を動かさない（現在の位置を維持）
			return false;
		}

		// 2. ブラウザの「戻る/進む」ボタンを押した時
		if (savedPosition) {
			return savedPosition;
		}

		// 3. 全く別のページへ移動した時はトップへ戻る
		return { top: 0 };
	},
};
