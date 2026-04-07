<script setup lang="ts">
const { navigateWithSmoothScroll } = useSmoothScroll();
const isOpen = ref(false);
const { isMobile } = useViewport();
const { $lenis } = useNuxtApp();
const route = useRoute();

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

const onLinkClick = async (e: MouseEvent, hash: string) => {
	isOpen.value = false;

	// 重要：まずはスクロールを「許可」状態に戻す
	$lenis.start();

	// ブラウザが「スクロール可能」になったことを認識してから実行
	await nextTick();
	await new Promise(resolve => setTimeout(resolve, 200));
	navigateWithSmoothScroll(e, hash);
};

const getLinkPath = (hash: string) => `/${hash}`;

// ルート変更（ページ遷移）を検知して確実に閉じる
watch(() => route.path, () => {
	isOpen.value = false;
	$lenis.start();
	// backfaceFixed(false);
});

// const isHeaderVisible = ref(false)

// const handleScroll = () => {
//   const scrollTop = window.scrollY
//   const windowHeight = window.innerHeight
//   const docHeight = document.documentElement.scrollHeight

//   if (docHeight <= windowHeight) {
//     isHeaderVisible.value = true
//     return
//   }
//   isHeaderVisible.value = scrollTop > windowHeight / 2
// }

// 100msに1回だけ実行するように制限（秒間10回程度）
// const throttledScroll = throttle(handleScroll, 100)

// onMounted(() => {
//   handleScroll() // 初回は即時実行
//   window.addEventListener('scroll', throttledScroll)
// })

onUnmounted(() => {
	// window.removeEventListener('scroll', throttledScroll)
	$lenis.start();
});
</script>

<template>
	<header class="header">
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
			<ul
				id="header-menu"
				class="header-nav-list"
				:class="{ 'is-active': isOpen }"
				:aria-hidden="!isOpen"
			>
				<li class="header-nav-item">
					<NuxtLink to="/">トップ</NuxtLink>
				</li>
				<li class="header-nav-item">
					<NuxtLink
						:to="getLinkPath('#top-about')"
						@click="onLinkClick($event, '#top-about')"
					>
						-自己紹介
					</NuxtLink>
				</li>
				<li class="header-nav-item">
					<NuxtLink
						:to="getLinkPath('#top-skill')"
						@click="onLinkClick($event, '#top-skill')"
					>
						-スキル
					</NuxtLink>
				</li>
				<li class="header-nav-item">
					<NuxtLink to="/works/">作品一覧</NuxtLink>
				</li>
			</ul>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
.header{
  padding: 10px;
  position: fixed;
  z-index: 600;
}

.header-nav{
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgb(var(--white01));
  border-radius: 50%;
  z-index: 600;
  width: 60px;
  height: 60px;
  border: 1px solid rgb(var(--black01));
  @include mq("pc"){
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
  // @include mq("hover"){
  //   &:hover{
  //     box-shadow: 0 0 50px rgb(var(--blue03));
  //   }
  // }
  // a{
  //   display: block;
  //   color: rgb(var(--black01));
  //   padding: 5px 10px;
  //   font-size: 21px;
  //   letter-spacing: .06em;
  //   transition: color .3s;
  //   font-weight: 500;
  //   font-size: math.div(14vw, $designBaseSp);
  //   @include mq("pc"){
  //     font-size: math.div(14vw, $designBasePc);
  //   }
  //   @include mq("hover"){
  //     &:hover{
  //       color: rgb(var(--blue03));
  //     }
  //   }
  // }
}

.header-nav-list{
  background: rgb(var(--white01));
  @include mq("tab"){
    position: fixed;
    inset: 0;
    z-index: -1;
    opacity: 0;
    visibility: hidden;
    transition: opacity .3s, visibility .3s, z-index .3s;
    padding: math.div(80vw, $designBaseSp) math.div(20vw, $designBaseSp) math.div(40vw, $designBaseSp);
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

.header-nav-item{
  @include mq("tab"){
    text-align: center;
  }

  a{
    color: rgb(var(--black01));
    font-weight: 500;
    display: block;
    letter-spacing: .06em;
    @include mq("tab"){
      padding: math.div(20vw, $designBaseSp) 0;
      font-size: math.div(21vw, $designBaseSp);
    }
    @include mq("pc"){
      padding: 10px;
      font-size: 20px;
    }
  }
}

.header-nav-button{
  width: 60px;
  height: 60px;
  display: block;
  line-height: 100%;
  padding: 17px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 100;
  svg{
    display: inline-block;
    width: 40px;
    height: 40px;
    *{
      fill: rgb(var(--black01));
    }
  }
}
</style>
