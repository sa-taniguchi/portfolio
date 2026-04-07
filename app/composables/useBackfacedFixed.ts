export const useBackfaceFixed = () => {
	// SSRエラー防止のため、プロセスがクライアントかどうかをチェック
	if (import.meta.server) return { backfaceFixed: () => {} };

	// 書字方向の判定
	const isVerticalWritingMode = (): boolean => {
		const writingMode = window.getComputedStyle(document.documentElement).writingMode;
		return writingMode.includes('vertical');
	};

	// スクロールバーの幅を計算
	const getScrollBarSize = (): number => {
		return isVerticalWritingMode()
			? window.innerHeight - document.body.clientHeight
			: window.innerWidth - document.body.clientWidth;
	};

	// スクロール位置の取得
	const getScrollPosition = (fixed: boolean): number => {
		if (fixed) {
			return isVerticalWritingMode()
				? document.scrollingElement?.scrollLeft ?? 0
				: document.scrollingElement?.scrollTop ?? 0;
		}
		const val = document.body.style.insetBlockStart || '0';
		return parseInt(val.replace('px', ''), 10);
	};

	// スタイルの適用
	const applyStyles = (scrollPosition: number, fixed: boolean): void => {
		const styles = {
			blockSize: '100dvb',
			insetInlineStart: '0',
			position: 'fixed',
			insetBlockStart: isVerticalWritingMode() ? `${scrollPosition}px` : `${scrollPosition * -1}px`,
			inlineSize: '100dvi',
		};

		Object.entries(styles).forEach(([key, value]) => {
			// @ts-expect-error: 動的なスタイル割り当てのため
			document.body.style[key] = fixed ? value : '';
		});
	};

	// メイン関数
	const backfaceFixed = (fixed: boolean): void => {
		const scrollBarWidth = getScrollBarSize();
		const scrollPosition = getScrollPosition(fixed);

		document.body.style.paddingInlineEnd = fixed ? `${scrollBarWidth}px` : '';
		applyStyles(scrollPosition, fixed);

		if (!fixed) {
			window.scrollTo({
				behavior: 'instant',
				[isVerticalWritingMode() ? 'left' : 'top']: isVerticalWritingMode() ? scrollPosition : scrollPosition * -1,
			});
		}
	};

	return {
		backfaceFixed,
	};
};
