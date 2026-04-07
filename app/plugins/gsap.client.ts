import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { Draggable } from 'gsap/all'; // allではなく直接指定が安定します
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // よく使うなら追加

export default defineNuxtPlugin(() => {
	if (import.meta.client) {
		gsap.registerPlugin(TextPlugin, Draggable, ScrollToPlugin, ScrollTrigger);
	}

	return {
		provide: {
			gsap,
		},
	};
});
