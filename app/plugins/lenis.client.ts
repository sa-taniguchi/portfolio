import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export default defineNuxtPlugin(() => {
	if (import.meta.server) return;

	if (import.meta.client) {
		window.history.scrollRestoration = 'manual';
	}

	gsap.registerPlugin(ScrollTrigger);

	const lenis = new Lenis({
		duration: 1.2,
		easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		orientation: 'vertical',
		gestureOrientation: 'vertical',
		smoothWheel: true,
		wheelMultiplier: 1,
		touchMultiplier: 2,
		infinite: false,
	});

	lenis.on('scroll', ScrollTrigger.update);

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);

	// 毎フレームのリフレッシュ処理
	// function raf(time: number) {
	//   lenis.raf(time)
	//   requestAnimationFrame(raf)
	// }

	// requestAnimationFrame(raf)

	// 他のコンポーネントから lenis インスタンスを操作したい場合
	return {
		provide: {
			lenis: lenis,
		},
	};
});
