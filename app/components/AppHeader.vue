<script setup lang="ts">
const isOpen = ref(false);
const { isMobile } = useViewport();
const { $lenis } = useNuxtApp();
const route = useRoute();
const isHeaderVisible = ref(false);

const toggleMenu = () => {
	isOpen.value = !isOpen.value;

	// 背景固定ライブラリを使わず、Lenisの機能だけで止める
	if (isMobile.value) {
		if (isOpen.value) {
			$lenis.stop();
		}
		else {
			$lenis.start();
		}
	}
};

// ルート変更（ページ遷移）を検知して確実に閉じる
watch(() => route.path, (newPath) => {
	// メニューを閉じてスクロールを再開
	isOpen.value = false;
	$lenis?.start();
	if (newPath !== '/') {
		isHeaderVisible.value = true;
	}
	else {
		isHeaderVisible.value = false;
	}
}, { immediate: true });

onUnmounted(() => {
	$lenis.start();
});
</script>

<template>
	<header
		class="header"
		:class="{ 'is-visible': isHeaderVisible }"
	>
		<nav
			class="header-nav"
			aria-label="メインナビゲーション"
		>
			<button
				class="header-nav-button"
				type="button"
				:aria-expanded="isOpen"
				aria-controls="header-menu"
				aria-label="サイトメニューを開閉する"
				@click="toggleMenu"
			>
				<svg
					:class="{ 'u-hidden': isOpen }"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<g fill="#4B4B4B">
						<rect width="96" height="96" y="16" />
						<rect
							width="352"
							height="96"
							x="160"
							y="16"
						/>
						<rect width="96" height="96" y="208" />
						<rect
							width="352"
							height="96"
							x="160"
							y="208"
						/>
						<rect width="96" height="96" y="400" />
						<rect
							width="352"
							height="96"
							x="160"
							y="400"
						/>
					</g>
				</svg>
				<svg :class="{ 'u-hidden': !isOpen }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><polygon points="512 52.535 459.467 0.002 256.002 203.462 52.538 0.002 0 52.535 203.47 256.005 0 459.465 52.533 511.998 256.002 308.527 459.467 511.998 512 459.475 308.536 256.005" fill="currentColor" /></svg>
			</button>
			<div
				id="header-menu"
				:aria-hidden="!isOpen"
				class="header-nav-inner"
				:class="{ 'is-active': isOpen }"
			>
				<ul
					class="header-nav-list"
				>
					<li class="header-nav-item">
						<NuxtLink to="/">トップ</NuxtLink>
					</li>
					<li class="header-nav-item">
						<NuxtLink to="/works/">作品一覧</NuxtLink>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
.header{
  padding: 10px;
  position: fixed;
  z-index: 600;
  opacity: 0;
  visibility: hidden;
  transition: opacity .3s, visibility .3s;
  .is-done &{
    opacity: 1;
    visibility: visible;
  }
  &.is-visible{
    opacity: 1;
    visibility: visible;
  }
}

.header-nav{
  position: fixed;
  top: 10px;
  right: 20px;
  background: rgb(var(--white01));
  border-radius: 50%;
  z-index: 600;
  width: 50px;
  height: 50px;
  border: 1px solid rgb(var(--black01));
  @include mq("pc"){
    width: 60px;
    height: 60px;
    top: auto;
    bottom: 30px;
    border-radius: 30px;
    display: flex;
    transition: box-shadow .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:has(.is-active){
    @include mq("pc"){
      padding: 0 20px;
      width: auto;
    }
  }

  &.is-visible {
    @include mq("pc"){
      opacity: 1;
      visibility: visible;
    }
  }

  &.is-open{
    opacity: 1;
    visibility: visible;
    z-index: 500;
  }
}

.header-nav-inner{
  @include mq("tab"){
    background: rgb(var(--black01));
    position: fixed;
    inset: 0;
    z-index: -1;
    opacity: 0;
    visibility: hidden;
    transition: opacity .3s, visibility .3s, z-index .3s;
    padding: math.div(80vw, $designBaseSp) math.div(20vw, $designBaseSp);
    display: flex;
  }
  @include mq("pc"){
    display: none;
  }
  &.is-active{
    @include mq("tab"){
      z-index: 10;
      opacity: 1;
      visibility: visible;
    }
    @include mq("pc"){
      display: flex;
    }
  }
}

.header-nav-list{
  background: rgb(var(--white01));
  display: flex;
  width: 100%;
  @include mq("tab"){
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.header-nav-item{
  @include mq("tab"){
    text-align: center;
    width: 100%;
  }
  a{
    color: rgb(var(--black01));
    font-weight: 500;
    display: block;
    letter-spacing: .06em;
    transition: color .3s;
    @include mq("tab"){
      padding: math.div(20vw, $designBaseSp) 0;
      font-size: math.div(21vw, $designBaseSp);
    }
    @include mq("pc"){
      padding: 10px;
      font-size: 20px;
    }
    @include mq("hover"){
      &:hover{
        color: rgb(var(--blue03));
      }
    }
    &.router-link-exact-active{
      color: rgb(var(--blue03));
      text-decoration: line-through;
      text-decoration-color: rgb(var(--blue03));
      text-decoration-thickness: 3px;
    }
  }
}

.header-nav-button{
  width: 50px;
  height: 50px;
  display: block;
  line-height: 100%;
  padding: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 100;
  @include mq("pc"){
    width: 60px;
    height: 60px;
    padding: 17px;
  }
  svg{
    display: inline-block;
    width: 30px;
    height: 30px;
    @include mq("pc"){
      width: 40px;
      height: 40px;
    }
    *{
      // @include mq("pc"){
        fill: rgb(var(--black01));
      // }
    }
  }
  &:has(+.header-nav-inner.is-active){
    svg{
      *{
        @include mq("tab"){
          fill: rgb(var(--white01));
        }
      }
    }
  }

}
</style>
