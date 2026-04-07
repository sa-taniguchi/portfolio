export const useSmoothScroll = () => {
	const { $lenis } = useNuxtApp();
	const route = useRoute();

	const scrollToAnchor = (target: string | number) => {
		if (!$lenis) return;

		// 前の命令を上書きして、今の位置から目的地へスムーズに飛ばす
		$lenis.scrollTo(target, {
			duration: 1.2, // 少し速めに設定
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			lock: true, // スクロール中の割り込み防止
			force: true, // 進行中のアニメーションを強制上書き
		});

		$lenis.start();
	};

	const navigateWithSmoothScroll = async (e: MouseEvent, hash: string) => {
		if (route.path === '/') {
			e.preventDefault();

			// 毎回最新の DOM 位置を計算することでズレを防止
			const el = document.querySelector(hash) as HTMLElement;
			if (!el) return;

			let targetPos = el.offsetTop;
			if (hash === '#top-skill') {
				targetPos += 9000; // 目的地を調整
			}

			scrollToAnchor(targetPos);
		}
	};

	return { scrollToAnchor, navigateWithSmoothScroll };
};
