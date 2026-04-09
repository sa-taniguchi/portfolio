<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIntersectionObserver } from '~/composables/useIntersectionObserver';
import { useTextAnimation } from '~/composables/useTextAnimation';
import { useWorkStore } from '~~/stores/work';
import type { WorkItem } from '~/types/microcms';

const { isMobile } = useViewport();
const store = useWorkStore();
const { works, workList } = storeToRefs(store);
const { animateText } = useTextAnimation();
const workText = ref<HTMLElement | null>(null);
const workListRef = ref<HTMLElement | null>(null);
const titleAnime = useTemplateRef<HTMLElement>('titleAnime');
const shuffleAnimeGuard = ref<boolean>(true);

// const { data: works, error: worksError } = await useFetch<MicroCMSListResponse<WorkItem>>('/api/works');

const workTitle: string = 'WORKS';
watch(works, (newVal) => {
	if (newVal) {
		console.log('データが確定しました:', newVal.contents);
	}
});

// watch(worksError, (err) => {
// 	if (err) {
// 		console.error('Fetchエラー:', err);
// 	}
// });

const displayWorks = ref<WorkItem[]>([]);
const isAnimationDone = ref(false);
let shuffleIntervalId: ReturnType<typeof setInterval> | null = null;

// WORKSカードをシャッフルを実行する関数
function startWorkCardShuffle(): void {
	console.log('Shuffle Start!');
	if (shuffleIntervalId || isAnimationDone.value) return;

	const all: WorkItem[] = store.workList || [];
	console.log('Works count:', all.length);
	if (all.length < 3) return;

	shuffleIntervalId = setInterval(() => {
		const shuffled = [...all].sort(() => Math.random() - 0.5);
		if (isMobile.value) {
			displayWorks.value = shuffled.slice(0, 4);
		}
		else {
			displayWorks.value = shuffled.slice(0, 3);
		}
	}, 100);

	setTimeout(() => {
		if (shuffleIntervalId) {
			clearInterval(shuffleIntervalId);
			shuffleIntervalId = null;
			isAnimationDone.value = true;
			gsap.fromTo('.work-item',
				{ scale: 0.8, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' },
			);
			shuffleAnimeGuard.value = false;
		}
	}, 800);
};

/**
* @param {HTMLElement | null} el 拡大させるHTML要素
*/
function workTitleAnimation(el: HTMLElement | null): void {
	if (!el || !import.meta.client) return;
	gsap.fromTo(el,
		{
			scale: 1,
		},
		{
			scale: 80,
			force3D: false,
			ease: 'power2.in',
			scrollTrigger: {
				trigger: '.work-text',
				start: 'bottom bottom',
				end: isMobile ? '+=2000' : '+=1400',
				scrub: true,
				pin: true,
				// markers: true,
			},
		},
	);
};

useIntersectionObserver(
	titleAnime,
	{ threshold: 0.6, once: true },
	(el, isIntersecting) => {
		if (isIntersecting) {
			animateText(titleAnime, workTitle, 1, 0.5);
		}
	},
);

onMounted(() => {
	// useIntersectionObserver(titleAnime, { threshold: 0.3 }, (el, isIntersecting) => {
	//   if (isIntersecting) {
	//     el.classList.add('is-inview');
	//   }
	// });
	// ★ ブラウザバック（キャッシュ復元）対策の決定打
	// スクロール位置がブラウザによって戻される時間を少し待ってから再計算させる

	setTimeout(() => {
		ScrollTrigger.refresh();
	}, 200);

	// pageshowイベント（ブラウザバック検知）でもリフレッシュをかける
	window.addEventListener('pageshow', (e) => {
		if (e.persisted) {
			ScrollTrigger.refresh();
		}
	});
});

watch(workList, async (newVal) => {
	// データが入っており、クライアントサイドであることを確認
	if (newVal?.length && import.meta.client) {
		// 1. DOMのレンダリング完了を待つ
		await nextTick();

		await new Promise(resolve => setTimeout(resolve, 200));
		// 2. 既存の ScrollTrigger があれば一旦リセット（二重登録防止）
		ScrollTrigger.getAll().forEach((t) => {
			// このコンポーネントに関連するトリガーだけ消す場合は ID 指定が安全です
			if (t.vars.trigger === '.work-text') t.kill();
		});

		workTitleAnimation(workText.value);

		ScrollTrigger.sort();
		ScrollTrigger.refresh();
		// 3. アニメーション初期化

		// 4. シャッフル用の Observer 登録
		if (workListRef.value) {
			useIntersectionObserver(
				workListRef,
				{ threshold: 0.6, once: true },
				(el, isIntersecting) => {
					if (isIntersecting) {
						startWorkCardShuffle();
					}
				},
			);
		}

		// 5. 最後に計算を同
	}
}, { immediate: true });

onUnmounted(() => {
	if (shuffleIntervalId) clearInterval(shuffleIntervalId);
	ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
	<section class="section-pt work">
		<div class="work-topBg">
			<p class="work-text">
				<span ref="workText" class="work-text-inner">
					<span>A selection of</span>
					<span>制作・実績</span>
					<span>I have worked</span>
				</span>
			</p>
		</div>
		<div class="work-btmBg">
			<div class="l-container">
				<h2 class="work-title animation-text">
					<span ref="titleAnime">{{ workTitle }}</span>
				</h2>
				<ul ref="workListRef" class="work-list">
					<li
						v-for="(item, index) in displayWorks"
						:key="item.id || index"
						class="work-item"
						:class="{ 'is-selected': isAnimationDone }"
					>
						<UiWorkCard
							:item="item"
							:is-disabled="shuffleAnimeGuard"
						/>
					</li>
				</ul>

				<div class="work-button">
					<UiBaseButton
						to="/works"
						label="制作実績一覧"
						color="blue"
					/>
				</div>
			</div>

			<p class="work-bottom-text font-audio">
				<span>THANKS TO VIEW</span>
				<span>MY PORTFOLIO</span>
			</p>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.work-topBg{
  background-color: rgb(var(--black01));
}

.work-btmBg{
  background-color: rgb(var(--gray01));
  @include mq("pc"){
    margin: math.div(-300vw, $designBasePc) 0 0;
    transform: translateZ(0);
  }
}

.work-text{
	display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
	height: 100dvh;
	@include mq("pc"){
		height: 100vh;
	}
}

.work-text-inner{
  text-align: center;
  translate: 0 math.div(-10vw, $designBaseSp);
  @include mq("pc"){
    translate: 0 math.div(-10vw, $designBasePc);
  }
  span{
    font-weight: 700;
    line-height: 120%;
    font-size: math.div(45vw, $designBaseSp);
    display: block;
    color: rgb(var(--blue01));
    @include mq("pc"){
      font-size: math.div(150vw, $designBasePc);
    }
    &:nth-of-type(2){
      display: inline-block;
      text-align: center;
      color: rgb(var(--gray01));
      perspective: 1000px;
      font-size: math.div(50vw, $designBaseSp);
      @include mq("pc"){
        font-size: math.div(200vw, $designBasePc);
      }
    }
  }
}

.work-title{
  font-size: math.div(80vw, $designBaseSp);
  margin-bottom: math.div(20vw, $designBaseSp);
  scale: .8;
  transform-origin: left;
  @include text-border(rgb(var(--black01)));
  @include mq("pc"){
    font-size: math.div(170vw, $designBasePc);
    margin-bottom: math.div(20vw, $designBasePc);
  }
}

.work-list{
  display: flex;
  flex-wrap: wrap;
  min-height: math.div(532vw, $designBaseSp);
  gap: math.div(40vw, $designBaseSp) math.div(15vw, $designBaseSp);
  @include mq("pc"){
    min-height: math.div(388vw, $designBasePc);
    gap: math.div(20vw, $designBasePc);
  }
}

.work-item{
  // overflow: hidden;
  width: calc(50% - math.div(calc(15vw/2), $designBaseSp));
  @include mq("pc"){
    width: calc(33.33% - math.div(calc(40vw/3), $designBasePc));
  }
}

.work-button{
  width: math.div(310vw, $designBaseSp);
  height: math.div(60vw, $designBaseSp);
  margin: math.div(60vw, $designBaseSp) auto math.div(300vw, $designBaseSp);
  @include mq("pc"){
    width: math.div(270vw, $designBasePc);
    height: math.div(60vw, $designBasePc);
    margin: math.div(60vw, $designBasePc) auto math.div(400vw, $designBasePc);
  }
}

.work-bottom-text{
  color: rgb(var(--blue03));
  line-height: 130%;
  font-size: math.div(30vw, $designBaseSp);
  padding-bottom: math.div(100vw, $designBaseSp);
  @include mq("pc"){
    font-size: math.div(130vw, $designBasePc);
    padding-bottom: math.div(0vw, $designBasePc);
  }
  span{
    display: block;
    &:last-of-type{
      text-align: right;
    }
  }
}
</style>
