import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


export default defineNuxtPlugin(() => {
  if (import.meta.server) return;

  window.history.scrollRestoration = 'manual';
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
 		duration: 1.0,
		easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		orientation: 'vertical',
		gestureOrientation: 'vertical',
		smoothWheel: true,
		syncTouch: true, 
		syncTouchLerp: 0.1,
  	lerp: 0.5,
		touchMultiplier: 1,
		wheelMultiplier: 1,
		infinite: false,
  });

  // ScrollTriggerとの同期
  lenis.on('scroll', ScrollTrigger.update);

  // 【最重要】gsap.ticker の設定
  // 以前の time * 1000 は環境によって異常な遅延を生むため、
  // gsap.ticker.add に任せるのが最もスムーズです。
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return {
    provide: {
      lenis: lenis,
    },
  };
});
