export const useViewport = (breakpoint = 767) => {
	const isMobile = ref(false);

	// クライアントサイドでのみ実行するための判定関数
	const updateBreakpoint = () => {
		isMobile.value = window.innerWidth <= breakpoint;
	};

	onMounted(() => {
		updateBreakpoint();
		window.addEventListener('resize', updateBreakpoint);
	});

	onUnmounted(() => {
		window.removeEventListener('resize', updateBreakpoint);
	});

	return {
		isMobile,
	};
};
