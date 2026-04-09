export const useSmoothScroll = () => {
	const { $lenis } = useNuxtApp();

	const scrollToAnchor = (e: MouseEvent,target: string | number) => {
		if (!$lenis) return;
		e.preventDefault();

		// 前の命令を上書きして、今の位置から目的地へスムーズに飛ばす
		$lenis.scrollTo(target, {
			duration: 1.2, // 少し速めに設定
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			lock: true, // スクロール中の割り込み防止
			force: true, // 進行中のアニメーションを強制上書き
		});

		$lenis.start();
	};
	return { scrollToAnchor };
};
