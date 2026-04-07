<template>
	<div class="workDetail-skeleton">
		<div class="skeleton-image" />
		<div class="skeleton-info">
			<div class="skeleton-text" />
			<div class="skeleton-title" />
			<div class="skeleton-url" />
			<div class="skeleton-block" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.workDetail-skeleton {
  width: 100%;
  background: #f0f0f0;
  overflow: hidden;
  position: relative;
}

/* 読み込み中を伝えるアニメーション（シマーエフェクト） */
.workDetail-skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% { left: 100%; }
}

.skeleton-image {
  width: 100%;
  height: math.div(300vw, $designBaseSp);
  max-height: math.div(300vw, $designBaseSp);
  padding-bottom: math.div(60vw, $designBaseSp);
  @include mq("pc"){
    padding-bottom: math.div(60vw, $designBasePc);
    width: 100%;
    height: math.div(500vw, $designBasePc);
    max-height: math.div(500vw, $designBasePc);
  }
  background: #e0e0e0;
}
.skeleton-info { padding: 1rem 0; }
.skeleton-text { width: 40%; height: 1rem; background: #e0e0e0; margin-bottom: 0.8rem;}
.skeleton-title { width: 100%; height: 2rem; background: #e0e0e0; margin-bottom: 0.8rem;}
.skeleton-url{ width: 20%; height: 2rem; background: #e0e0e0; margin-bottom: 2rem;}
.skeleton-block{ width: 100%; aspect-ratio: 2/1; background: #e0e0e0; }
</style>
