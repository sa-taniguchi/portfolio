/**
 * スロットル関数
 * @param fn 実行したい関数
 * @param wait 待機時間(ms)
 */
export const throttle = <T extends (...args: never[]) => unknown>(
	fn: T,
	wait: number,
) => {
	let time = Date.now();

	return (...args: Parameters<T>): void => {
		if (time + wait - Date.now() < 0) {
			fn(...args);
			time = Date.now();
		}
	};
};
