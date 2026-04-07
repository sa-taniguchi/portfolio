import { gsap } from 'gsap';

export function useTextAnimation() {
	const animateText = (
		targetRef: Ref<HTMLElement | null>,
		text: string,
		duration = 2,
		delay = 0,
		timeline?: gsap.core.Timeline, // timeline がある場合は呼び出し元で同期
	) => {
		if (!targetRef.value) return;
		targetRef.value.textContent = '';
		const anim = () => {
			gsap.to(targetRef.value!, {
				duration,
				text,
				ease: 'none',
				startAt: { opacity: 1 },
				onComplete: () => {
					setTimeout(() => {
						if (targetRef.value) {
							targetRef.value.style.borderRight = 'none';
						}
					}, 300);
				},
			});
		};

		if (timeline) {
			// timeline がある場合は call() で登録して同期
			timeline.call(anim, [], timeline.duration() + delay);
		}
		else {
			// 単発で使う場合は setTimeout で遅延処理
			setTimeout(anim, delay * 500);
		}
	};

	return { animateText };
}
