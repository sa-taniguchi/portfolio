// useIntersectionObserver.ts
import { ref, watch, onUnmounted, type Ref } from 'vue';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
	once?: boolean;
}

export function useIntersectionObserver(
	targets: Ref<HTMLElement | null> | Ref<HTMLElement | null>[] | Ref<HTMLElement[]>,
	options: UseIntersectionObserverOptions = { threshold: 0.1 },
	callback?: (el: HTMLElement, isIntersecting: boolean) => void,
) {
	const isIntersectingMap = ref(new Map<HTMLElement, boolean>());
	let observer: IntersectionObserver | null = null;

	// Observerの初期化（ブラウザ環境のみ）
	if (import.meta.client) {
		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const el = entry.target as HTMLElement;
				isIntersectingMap.value.set(el, entry.isIntersecting);

				if (callback) {
					callback(el, entry.isIntersecting);
				}

				// once の判定だけ中に入れる
				if (options.once && entry.isIntersecting) {
					observer?.unobserve(el);
				}
			});
		}, options);
	}

	// ターゲットの変更（データの読み込み完了など）を監視して observe する
	watch(() => (Array.isArray(targets) ? targets.map(t => t.value) : targets.value),
		(newVal) => {
			if (!observer) return;

			const elements = Array.isArray(newVal) ? newVal.flat() : [newVal];

			elements.forEach((el) => {
				if (el instanceof HTMLElement) {
					observer?.observe(el);
				}
			});
		},
		{ immediate: true, deep: true },
	);

	onUnmounted(() => observer?.disconnect());

	return { isIntersectingMap };
}
