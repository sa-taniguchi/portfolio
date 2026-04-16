<script setup lang="ts">
import { watch, onUnmounted, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIntersectionObserver } from '~/composables/useIntersectionObserver';
import { useSkillStore } from '~~/stores/skill';
import { storeToRefs } from 'pinia';

const { animateText } = useTextAnimation();

const store = useSkillStore();
const { skill, skillList } = storeToRefs(store);

const titleAnime = useTemplateRef<HTMLElement>('titleAnime');

const skillTitle: string = 'SKILL';

let handlePageshow: (e: PageTransitionEvent) => void;
let handleResetSkillAnimation: () => void;

// const { data: skill, error: skillsError } = await useFetch<SkillResponse>('/api/skill');

// データが変わった（nullから中身が入った）瞬間に実行される
watch(skill, (newVal) => {
	if (newVal) {
		console.log('データが確定しました:', newVal);
	}
}, { immediate: true });

// スキルカードをスクロールに応じて表示させる関数
function initSkillAnimation(): void {
	const items = gsap.utils.toArray<HTMLElement>('.skill-item');
	// 初期状態
	gsap.set(items, { opacity: 0, y: 100 });

	const tl = gsap.timeline({
		scrollTrigger: {
			id: 'skill-trigger',
			trigger: '#js-skill',
			start: 'top top',
			end: () => `+=${items.length * 1000}`,
			scrub: true,
			pin: true,
			invalidateOnRefresh: true,
		},
	});

	items.forEach((item) => {
		tl.to(item, {
			opacity: 1,
			y: 0,
			duration: 1,
		}, '+=1');
	});
};

// タイトルスクロール表示アニメーション
// useIntersectionObserver(titleAnime, { threshold: 0.3 }, (el) => {
//   console.log('発火');

//   el.classList.add('is-inview');
// });

useIntersectionObserver(
	titleAnime,
	{ threshold: 0.6, once: true },
	(el, isIntersecting) => {
		if (isIntersecting) {
			animateText(titleAnime, skillTitle, 1, 0.5);
		}
	},
);

watch(skillList, async (newVal) => {
// データが入っており、かつクライアントサイドであることを確認
	if (newVal && newVal.length > 0) {
		// DOMが更新される（v-forが回る）のを一瞬待つ
		await nextTick();

		// すでに古いScrollTriggerがあれば一度消す（二重発火防止）
		ScrollTrigger.getById('skill-trigger')?.kill();

		// DOMが確実に存在する状態で初期化
		ScrollTrigger.sort();
		ScrollTrigger.refresh();

		initSkillAnimation();
	}
}, { immediate: true });

onMounted(() => {
	handlePageshow = (e: PageTransitionEvent) => {
		if (e.persisted) {
			ScrollTrigger.refresh();
			// アニメーションを再初期化
			setTimeout(() => {
				ScrollTrigger.getById('skill-trigger')?.kill();
				initSkillAnimation();
			}, 100);
		}
	};

	handleResetSkillAnimation = () => {
		ScrollTrigger.getById('skill-trigger')?.kill();
		initSkillAnimation();
	};

	// pageshowイベント（ブラウザバック検知）でアニメーションを再初期化
	window.addEventListener('pageshow', handlePageshow);

	// 遷移時のアニメーションリセット
	window.addEventListener('reset-skill-animation', handleResetSkillAnimation);
});

onUnmounted(() => {
	ScrollTrigger.getAll().forEach(t => t.kill());
	window.removeEventListener('pageshow', handlePageshow);
	window.removeEventListener('reset-skill-animation', handleResetSkillAnimation);
});
</script>

<template>
	<section id="top-skill" class="l-section-pb skill">
		<div id="js-skill" class="skill-inner">
			<div class="l-lg-container">
				<h2 class="skill-title anime-textBorder-wh">
					<span ref="titleAnime">{{ skillTitle }}</span>
				</h2>
				<ul class="skill-list">
					<li
						v-for="item in skill?.contents"
						:key="item.id"
						class="skill-item"
					>
						<h3 class="skill-item-title">
							{{ item['skill-title'] }}
						</h3>
						<p class="skill-item-text">
							{{ item['skill-text'] }}
						</p>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.skill{
  position: relative;
  background-color: rgb(var(--black01));
}

.skill-inner{
  padding: math.div(40vw, $designBaseSp) 0;
  @include mq("pc"){
    padding: math.div(40vw, $designBasePc) 0;
  }
}

.skill-title{
  color: rgb(var(--white01));
  line-height: 100%;
  font-size: math.div(80vw, $designBaseSp);
  width: 2.8em;
  @include mq("sp"){
    margin-bottom: math.div(50vw, $designBaseSp);
  }
  @include mq("pc"){
    position: absolute;
    top: math.div(40vw, $designBasePc);
    right: math.div(40vw, $designBasePc);
    font-size: math.div(200vw, $designBasePc);
  }
}

.skill-list{
  height: 100dvh;
  position: relative;
}

.skill-item{
  border: 1px solid rgb(var(--white01));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  backface-visibility: hidden;
  will-change: transform;
  isolation: isolate;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 1/1.2;
  padding: math.div(24vw, $designBaseSp);
  @include mq("sp"){
    gap: math.div(40vw, $designBaseSp);
  }
  @include mq("pc"){
    width: math.div(450vw, $designBasePc);
    aspect-ratio: 1/1;
    padding: math.div(24vw, $designBasePc);
  }

  $base-width: math.div(450vw, $designBasePc);
  $gap: calc((100% - #{$base-width}) / 8);

  @for $i from 1 through 2 {
    &:nth-child(#{$i}) {
      z-index: $i;
      @include mq("pc"){
        top: ($i - 1) * math.div(25vw, $designBasePc);
        left: calc((#{$i} - 1) * #{$gap});
      }
    }
  }
  @for $i from 3 through 9 {
    &:nth-child(#{$i}) {
      z-index: $i;
      @include mq("pc"){
        top: ($i - 1) * math.div(25vw, $designBasePc);
        left: calc((#{$i} - 1) * #{$gap});
      }
    }
  }
}

.skill-item-title{
  font-weight: 700;
  color: rgb(var(--blue01));
  font-size: math.div(24vw, $designBaseSp);
  @include mq("pc"){
    font-size: math.div(32vw, $designBasePc);
  }
}

.skill-item-text{
  color: rgb(var(--white01));
  white-space: pre-wrap;
  font-size: math.div(14vw, $designBaseSp);
  @include mq("pc"){
    line-height: 180%;
    font-size: math.div(16vw, $designBasePc);
  }
}
</style>
