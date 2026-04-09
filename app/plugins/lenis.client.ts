import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin(() => {
	if (import.meta.server) return;

	// ブラウザのスクロール復元を無効化
	window.history.scrollRestoration = 'manual';

	gsap.registerPlugin(ScrollTrigger);

	const lenis = new Lenis({
		duration: 1.2,
		easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		orientation: 'vertical',
		gestureOrientation: 'vertical',
		smoothWheel: true,
		// iOS Safariでの挙動を安定させるための調整
		syncTouch: false, // タッチスクロールをLenisに完全に同期させず、ネイティブの滑らかさを活かす
		touchMultiplier: 2,
		wheelMultiplier: 1,
		infinite: false,
	});

	// ScrollTriggerと連携
	lenis.on('scroll', () => {
		ScrollTrigger.update();
	});

	// 【重要修正】更新処理を gsap.ticker 一方に集約する
	// requestAnimationFrame(raf) を別途回すと、二重更新でガタつきます
	gsap.ticker.add((time: number) => {
		lenis.raf(time * 1000);
	});

	// ラグ平滑化の無効化（LenisとGSAPの同期を保つため）
	gsap.ticker.lagSmoothing(0);

	// コンポーネント破棄時にtickerを止めるためのクリーンアップ
	// （プラグインレベルでは通常不要ですが、意識として）

	return {
		provide: {
			lenis: lenis as Lenis,
		},
	};
});
