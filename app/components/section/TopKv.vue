<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';

const { scrollToAnchor } = useSmoothScroll();
const { backfaceFixed } = useBackfaceFixed();
const { animateText } = useTextAnimation();

const textSpans = ref<HTMLSpanElement[]>([]);
const openingRef = useTemplateRef<HTMLDivElement>('opening');
const textTop = useTemplateRef<HTMLSpanElement[]>('textTop');
const textBottom = useTemplateRef<HTMLSpanElement[]>('textBottom');
// const textTopSpans = useTemplateRef<HTMLSpanElement[]>('textTopSpans');
// const textBottomSpans = useTemplateRef<HTMLSpanElement[]>('textBottomSpans');
const kvNameInput = useTemplateRef<HTMLDivElement>('textNameInput');
const kvName = useTemplateRef<HTMLElement>('textName');
const kvNameButton = useTemplateRef<HTMLDivElement>('textNameButton');
const kvNameCursor = useTemplateRef<HTMLDivElement>('textNameCursor');

const myName: string = '#FE 谷口聡について';

// const setItemRef = (el: Element | null) => {
//  if (el instanceof HTMLSpanElement) {
//     textSpans.value.push(el);
//   }
// };

function openingAnime(): void {
	if (sessionStorage.getItem('opened')) {
		// 2回目以降
		if (openingRef.value) {
			document.body.classList.add('is-done');
			openingRef.value.style.display = 'none';
		}
		backfaceFixed(false);
		return;
	}

	// 初回のみ実行
	backfaceFixed(true);
	if (!openingRef.value) return;

	const tl = gsap.timeline({
		defaults: { ease: 'power4.inOut' },
	});

	tl.set(kvName.value, { text: '' });
	// 後半のアニメーション（幕を引く）を関数化
	const playOutro = () => {
		const outroTl = gsap.timeline();
		outroTl.to(openingRef.value, {
			y: '-100%',
			duration: 0.3,
			onComplete: () => {
				backfaceFixed(false);
				sessionStorage.setItem('opened', 'true');
			},
		}, '>1');
		outroTl.to(kvNameCursor.value, {
			duration: 0.3,
			opacity: 0,
			ease: 'none',
			startAt: { opacity: 1 },
		}, '<')
			.to(kvNameButton.value, {
				opacity: 1,
				ease: 'none',
				startAt: { opacity: 0.7 },
			}, '<')
			.set(kvNameButton.value, { pointerEvents: 'auto' })
			.set(openingRef.value, { display: 'none' })
			.call(() => {
				document.body.classList.add('is-done');
			});
	};

	// 前半のアニメーションを実行
	tl.to(openingRef.value, {
		y: '0%',
		duration: 0.5,
		startAt: { y: '100%', backgroundColor: '#4f7fde' },
	})
		.to([textTop.value, textBottom.value], {
			opacity: 1,
			duration: 0.5,
			// もし時間差（パラパラ感）を出したいなら stagger を入れる
			// stagger: 0.1,
			startAt: {
				opacity: 0,
			},
		}, '>0.3')
		.to(kvNameInput.value, {
			duration: 0.3,
			opacity: 1,
			ease: 'power3.out',
			startAt: { opacity: 0 },
		}, '>0.3')
		.to(kvNameButton.value, {
			duration: 0.3,
			opacity: 0.6,
			ease: 'none',
			startAt: { opacity: 0 },
		}, '>')
		.call(() => {
			nextTick(() => {
				animateText(kvName, myName, 2, 0.5);
			});
		}, undefined, '>')
		.to(kvNameButton.value, {
			duration: 0,
			opacity: 1,
			ease: 'none',
		}, '>.5')
		.to(kvNameCursor.value, {
			duration: 0.5,
			x: 0,
			y: 0,
			opacity: 1,
			ease: 'none',
			startAt: { opacity: 1 },
		}, '>2')
		.to(kvNameButton.value, {
			duration: 0.1,
			opacity: 0.7,
			ease: 'none',
			startAt: { opacity: 1 },
		}, '<0.5')
		.call(() => {
			console.log('--- Intro Finished ---');
			// 前半が終わった瞬間に「ロード状況」を確認
			nextTick(() => {
				// nuxtApp.hook('page:finish', () => {
				playOutro();
				// });
			});
		});

	// // ロード状況を確認して後半を呼ぶ関数
	// function checkLoadAndPlay() {
	//   if (document.readyState === 'complete' || document.readyState === 'interactive') {
	//     playOutro();
	//   } else {
	//     window.addEventListener('load', playOutro, { once: true });
	//     // 保険のタイマー（重い画像があっても5秒後には開ける）
	//     setTimeout(playOutro, 5000);
	//   }
	// }
}

// onBeforeUpdate(() => {
//   textSpans.value = [];
// });

onMounted(async () => {
	await nextTick();
	openingAnime();
	Draggable.create(textSpans.value, {
		type: 'x,y',
		edgeResistance: 0.65,
		inertia: true,
		onPress: function () {
			// 触った瞬間に少し大きくするなどの演出
			gsap.to(this.target, { scale: 1.2, duration: 0.2 });
		},
		onRelease: function () {
			// 離したときに元の位置に戻る
			gsap.to(this.target, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
		},
	});
});
</script>

<template>
	<div class="top">
		<div class="top-bg" />
		<div ref="kv" class="kv">
			<div ref="opening" class="kv-openingAnime" />
			<div ref="kv-text-wrapper" class="kv-text-wrapper">
				<div class="kv-text-bg" />
				<p ref="textTop" class="kv-text font-audio">
					<span
						v-for="(char, i) in ['P', 'O', 'R', 'T']"
						:key="i"
						ref="textSpans"
						class="draggable-char"
						:class="i % 2 !== 0 ? 'is-top' : 'is-bottom'"
					>
						{{ char }}
					</span>
				</p>
				<p ref="textBottom" class="kv-text font-audio">
					<span
						v-for="(char, i) in ['F', 'O', 'L', 'I', 'O']"
						:key="i"
						ref="textSpans"
						class="draggable-char"
						:class="i % 2 !== 0 ? 'is-top' : 'is-bottom'"
					>
						{{ char }}
					</span>
				</p>
				<div ref="textNameInput" class="kv-name">
					<span ref="textName">{{ myName }}</span>
					<div ref="textNameButton" class="kv-name-button-wrapper">
						<NuxtLink
							to="#top-about"
							class="kv-name-button"
							@click.prevent="scrollToAnchor($event, '#top-about')"
						>
							<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
								<path fill="currentColor" d="M469.7 213.7H145.3l130.4-129c16.6-16.4 16.8-43.3.3-59.9-16.4-16.6-43.2-16.8-59.9-.3L12.6 225.9c-8 8-12.6 18.8-12.6 30.1s4.5 22.1 12.6 30.1l203.6 201.4c16.6 16.4 43.4 16.3 59.9-.3 16.4-16.6 16.3-43.4-.3-59.9L145.3 298.3h324.4c23.4 0 42.3-18.9 42.3-42.3s-19-42.3-42.3-42.3z" />
							</svg>
						</NuxtLink>
					</div>
					<span ref="textNameCursor" class="kv-name-cursor"><img src="/images/icon/i-hand.svg" alt=""></span>
				</div>
			</div>
			<div class="kv-scrollDown">
				<UiScrollDown />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.top{
  width: 100%;
  background-color: rgb(var(--black01));
}

.top-bg{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 15;
  pointer-events: none;
  &::after{
    content: '';
    background: radial-gradient(#8ac0ff, #8ac0ff00 50%);
    z-index: 10;
    position: fixed;
    opacity: .3;
    width: 200vw;
    height: 50vw;
    position: absolute;
    filter: blur(0.266667rem);
    bottom: -40%;
    left: 50%;
    translate: -50% 0;
    animation: atmosphericFloat 20s ease-in-out infinite;
  }
}

@keyframes atmosphericFloat {
  0% {
    translate: -50% 0%;
    scale: 1;
    opacity: 0.25;
  }
  25% {
    translate: -60% -5%;
    scale: 1.05;
    opacity: 0.2;
  }
  50% {
    translate: -30% 5%;
    scale: 0.95;
    opacity: 0.15;
  }
  75% {
    translate: -45% 3%;
    scale: 1.02;
    opacity: 0.19;
  }
  100% {
    translate: -50% 0%;
    scale: 1;
    opacity: 0.25;
  }
}

.top-bg-noise{
  display: block;
  width: 100%;
  height: 100%;
}

.kv{
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
}

.kv-text-wrapper{
  position: relative;
  z-index: 160;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  will-change: transform;
  transform-origin: center center;
}

.draggable-char{
  display: inline-block;
  user-select: none;
  touch-action: none;
}

.kv-text{
  color: rgb(var(--blue01));
  line-height: 100%;
  transform: skew(-15deg);
  font-size: math.div(80vw, $designBaseSp);
  opacity: 0;
  @include mq('pc'){
    font-size: math.div(180vw, $designBasePc);
  }
  >span{
    cursor: "default",
  }

  .is-done &{
    transition: opacity .3s;
    opacity: 1;
    >span{
      cursor: grabbing;
    }
  }
}

.kv-name{
  line-height: 150%;
  font-size: math.div(16vw, $designBaseSp);
  text-align: left;
  width: 20em;
  padding: 0 1em;
  line-height: 220%;
  position: relative;
  margin-top: math.div(50vw, $designBaseSp);
  opacity: 0;
  @include mq('pc'){
    line-height: 210%;
    font-size: math.div(24vw, $designBasePc);
    margin-top: math.div(50vw, $designBasePc);
  }
  span:not(.kv-name-cursor){
    &::before {
      border-radius: 1em;
      border: 1px solid rgb(var(--gray02));
      content: "";
      background-color: rgb(var(--white01));
      position: absolute;
      inset: 0;
      z-index: -1;
    }
    color: rgb(var(--gray02));
    display: inline-block;
    line-height: 100%;
    border-right: 1px solid rgb(var(--black01));
    padding-right: 4px;
    font-weight: 400;
    transition: opacity .3s;
    .is-done &{
      border-right: none;
      padding-right: 0;
    }
  }
  .is-done &{
  transition: opacity .3s;
  opacity: 1;
  }
}

.kv-name-button-wrapper{
  opacity: 0;
  pointer-events: none;
  @include mq("hover"){
    &:hover{
      opacity: .7!important;
    }
  }
  .is-done &{
    opacity: 1;
    pointer-events: auto;
  }
}

.kv-name-button{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.4em;
  background: rgb(var(--black01));
  aspect-ratio: 1/1;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: .5em;
  translate: 0 -50%;
  z-index: 10;
  color: rgb(var(--white01));
  svg{
    display: block;
    width: 30%;
    height: 30%;
    rotate: 90deg;
  }
}

.kv-name-cursor{
  position: absolute;
  right: math.div(4.5vw, $designBaseSp);
  bottom: math.div(3vw, $designBaseSp);
  opacity: 0;
  width: math.div(20vw, $designBaseSp);
  aspect-ratio: 1/1;
  pointer-events: none;
  z-index: 50;
  @include mq('pc'){
    width: math.div(20vw, $designBasePc);
    right: math.div(13vw, $designBasePc);
    bottom: math.div(10vw, $designBasePc);
    translate: 1em 1em;
  }
  img{
    display: block;
    width: 100%;
  }
}

.kv-openingAnime{
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 150;
  height: 100vh;
  &::before{
    content: "";
    display: block;
    position: absolute;
    inset: 0;
    height: 100vh;
  }
  .is-done &{
    &::before{
      background-color: transparent;
    }
  }
}

  @keyframes loadingShow {
    0% {
      translate: 0% 100%;
      opacity: 1;
    }
    100% {
      translate: 0% 0%;
      opacity: 1;
    }
  }

  @keyframes loadingHide {
    0% {
      translate: 0 0;
      opacity: 1;
    }
    100% {
      translate: 0 -100%;
      opacity: 1;
    }
  }

  .kv-scrollDown{
    opacity: 0;
    translate: 0 2em;
    transition: opacity .3 , translate .3s;
    .is-done &, .is-done &{
      opacity: 1;
      translate: 0 0;
    }
  }
</style>
