<template>
	<div class="work-card-skeleton">
		<div class="skeleton-image" />
		<div class="skeleton-info">
			<div class="skeleton-title" />
			<div class="skeleton-text" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.work-card-skeleton {
  width: 100%;
  aspect-ratio: 9/16;
  background: #f0f0f0;
  overflow: hidden;
  position: relative;
  @include mq("pc"){
    margin-top: math.div(32vw,$designBasePc);
  }
}

/* 読み込み中を伝えるアニメーション（シマーエフェクト） */
.work-card-skeleton::after {
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

.skeleton-image { aspect-ratio: 1/1; background: #e0e0e0; }
.skeleton-info { padding: 1rem 0; }
.skeleton-title { width: 60%; height: 1.2rem; background: #e0e0e0; margin-bottom: 0.5rem; }
.skeleton-text { width: 40%; height: 0.8rem; background: #e0e0e0; }
</style>
