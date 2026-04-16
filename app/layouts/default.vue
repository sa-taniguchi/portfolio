<!-- <script setup lang="ts">
import { onUnmounted, watch, nextTick } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const route = useRoute();
const { $lenis } = useNuxtApp();

watch(() => route.fullPath, async () => {
	await nextTick();
	$lenis.resize();
	ScrollTrigger.refresh();
});

watch(() => route.path, () => {
	$lenis.scrollTo(0, { immediate: true });
});

// import Lenis from 'lenis';

// const router = useRouter();
// const route = useRoute();
// const savedPosition = useState<number>('works-scroll-pos', () => 0);

// 遷移が終わった直後に、少しだけ待ってから画面の再描画を促す
// router.afterEach(() => {
//   if (import.meta.client) {
//     setTimeout(() => {
//       window.scrollTo(window.scrollX, window.scrollY);
//     }, 100);
//   }
// });

// let lenis: Lenis | null = null;

// // --- Lenis 制御ロジック ---
// const updateLenis = (time: number) => {
//   lenis?.raf(time * 1000);
// };

// const initLenis = () => {
//   if (lenis || !import.meta.client) return;
//   lenis = new Lenis({
//     duration: 1.2,
//     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     smoothWheel: true,
//   });

//   // ★ここを追加！子コンポーネントから inject できるようにする
//   provide('lenis', lenis);

//   lenis.on('scroll', ScrollTrigger.update);
//   gsap.ticker.add(updateLenis);
// };

const destroyLenis = () => {
	if (!$lenis) return;
	$lenis.destroy();
};

// // トップページのみLenisを有効化、それ以外は破棄
// // watch(() => route.path, (newPath) => {
// //   if (newPath === '/') {
// //     initLenis();
// //   } else {
// //     destroyLenis();
// //   }
// // }, { immediate: true });

// onMounted(() => {
//   initLenis();
//   if (import.meta.client) {
//     // ブラウザ標準の勝手な復元を「手動」に固定
//     window.history.scrollRestoration = 'manual';
//   }
// });

onUnmounted(() => {
	destroyLenis();
}); -->

// --- 遷移ロジック ---
// router.beforeEach((to, from) => {
//   const fromPath = from.path.replace(/\/$/, '');
//   const toPath = to.path.replace(/\/$/, '');

//   // 1. 一覧ページから離れる直前に位置を保存
//   if (fromPath === '/works' && toPath.startsWith('/works/')) {
//     savedPosition.value = window.scrollY || 0;
//   }

// });

// router.afterEach((to, from) => {
//   const toPath = to.path.replace(/\/$/, '');
//   const fromPath = from.path.replace(/\/$/, '');

//   // ★ 追加：パスが同じ（クエリだけが変わった）なら、何もしないで終了
//   if (toPath === fromPath) return;

//   const isBackToWorks = fromPath.startsWith('/works/') && toPath === '/works';

//   nextTick(() => {
//     const targetY = isBackToWorks ? savedPosition.value : 0;

//     setTimeout(() => {
//       if (lenis && route.path === '/') {
//         lenis.scrollTo(targetY, { immediate: true });
//       } else {
//         window.scrollTo({
//           top: targetY,
//           behavior: 'instant' as any
//         });
//       }
//       ScrollTrigger.refresh();
//     }, isBackToWorks ? 0 : 50);
//   });
// });
<!-- </script> -->
<!-- <script setup lang="ts">
import AppFooter from '~/components/AppFooter.vue';
import AppHeader from '~/components/AppHeader.vue';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (import.meta.client) {
	gsap.registerPlugin(ScrollTrigger);
}

let lenis: Lenis | null = null;
const updateLenis = (time: number) => {
  lenis?.raf(time * 1000);
};

const router = useRouter();
const route = useRoute();
const savedPosition = useState<number>('works-scroll-pos', () => 0);

// const route = useRoute();

// // ページ遷移を監視して、トップへ強制スクロール
// watch(() => route.fullPath, () => {
//   lenis?.scrollTo(0, { immediate: true });

//   // ScrollTrigger を再計算
//   nextTick(() => {
//     ScrollTrigger.refresh();
//   });
// });

onMounted(() => {
	// Lenisの初期化
	lenis = new Lenis({
		duration: 2,
		easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		touchMultiplier: 2,
	});

	// ScrollTriggerとLenisを同期
	lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add(updateLenis);

	// タイムラグによるガタつきを防止
	gsap.ticker.lagSmoothing(0);

  if (import.meta.client) {
    window.history.scrollRestoration = 'manual';
  }
});

onUnmounted(() => {
	// メモリリークを防ぐため
	lenis?.destroy();
	gsap.ticker.remove(updateLenis);
});

router.beforeEach((to, from) => {
  // 一覧から詳細へ行く「直前」に、現在の位置を記録する
  const isLeavingList = from.path.replace(/\/$/, '') === '/works' && to.path.startsWith('/works/');

  if (isLeavingList) {
    savedPosition.value = window.scrollY || lenis?.scroll || 0;
    console.log('一覧の位置を保存:', savedPosition.value);
  }
});

router.afterEach((to, from) => {
  const toPath = to.path.replace(/\/$/, '');
  const fromPath = from.path.replace(/\/$/, '');

  // A: 詳細から一覧に戻る時
  const isBackToWorks = fromPath.startsWith('/works/') && toPath === '/works';

  nextTick(() => {
    if (isBackToWorks && savedPosition.value > 0) {
      console.log('復元開始:', savedPosition.value);

      // データ読み込みによる「高さ不足」を防ぐため、少し待ってからスクロール
      setTimeout(() => {
        // 復元実行
        if (lenis) {
          lenis.scrollTo(savedPosition.value, { immediate: true });
        } else {
          window.scrollTo(0, savedPosition.value);
        }

        // GSAPの検知位置を再計算（これが無いとアニメーションがズレる）
        ScrollTrigger.refresh();
      }, 200); // 100~200ms程度が安定します

    } else {
      // B: それ以外の遷移（詳細へ行く時や、トップへ行く時）
      // 必ず最上部(0)から開始させる
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }

      nextTick(() => {
        ScrollTrigger.refresh();
      });
    }
  });
});
</script> -->
<!-- <template>
	<div>
		<app-header />
		<main>
			<slot />
		</main>
		<app-footer />
	</div>
</template>

<style> -->
/* lenis向けスタイル */
/* html.lenis, html.lenis body {
  height: auto;
} */

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}

/* 1. デフォルトのクロスフェードを完全に無効化 */
/* ::view-transition-group(root) {
  animation: none;
  background-color: rgb(var(--gray01));
} */

/* ::view-transition-image-pair(root) {
  isolation: isolate;
  background-color: rgb(var(--gray01)); /* ペア自体にも背景を敷く */

/* 2. アニメーション定義の微調整 */
/* @keyframes fade-in {
  from {
    opacity: 0.01; /* 0だとSafariでレンダリングがスキップされる場合があるため */
    /* transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
} */

/* @keyframes fade-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
} */

/* 3. 新しいページ (New) */
/* ::view-transition-new(root) { */
  /* Chromeと同じ滑らかさを出すため、時間を少し調整 */
  /* animation: 0.4s cubic-bezier(0.4, 0, 0.2, 1) both fade-in;
  mix-blend-mode: normal;
} */

/* 4. 前のページ (Old) */
/* ::view-transition-old(root) { */
  /* 去る方は速めに終わらせるのがSPA風のコツ */
  /* animation: 0.1s cubic-bezier(0.4, 0, 1, 1) both fade-out; */
  /* display: none;
  mix-blend-mode: normal;
} */

/* --- アセットCSS または app.css --- */

/* 1. 遷移グループ全体（コンテナ）へのスタイル
  [view-transition-name^="work-image-"] は
  "work-image-" で始まる全ての transition-name にマッチします。
*/
/* ::view-transition-group([view-transition-name^="work-image-"]) { */
  /* Chromeと同じ滑らかさを Safari 18 でも出すための設定
    cubic-bezier(0.4, 0, 0.2, 1) は標準的な「あとから加速」です。
  */
  /* animation-duration: 0.3s; /* 全体の時間 */
  /* animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); */

  /* Safari対策:
    mix-blend-mode を normal にしないと、背景が白くなったりガタついたりします。
  */
  /* mix-blend-mode: normal !important;
} */

/* 2. 「古いページ (Old)」の画像のアニメーション */
/* ::view-transition-old([view-transition-name^="work-image-"]) { */
  /* デフォルトのフェードアウトに加え、少しスケールダウンさせる（SPA風）
    stagger（時間差）はCSSでは難しいため、全体の時間を少し長めに取るのがコツです。
  */
  /* display: none; */
  /* Safariで画像が引き伸ばされるのを防ぐ */
  /* object-fit: cover;  */
/* } */

/* 3. 「新しいページ (New)」の画像のアニメーション */
/* ::view-transition-new([view-transition-name^="work-image-"]) { */
  /* フェードイン ＋ スケールアップ */
  /* animation-name: works-image-fade-in;
  animation-duration: 0.5s; */

  /* Safari対策: clip（トリミング）をかけると描画が安定します */
  /* overflow: clip;
  object-fit: cover;
} */

/* --- アニメーション定義 (Keyframes) --- */

/* @keyframes works-image-fade-in {
  from {
    opacity: 0.01; /* 0だとSafariで描画がサボられる場合がある */
  /* } */
  /* to {
    opacity: 1;
  }
} */

/* @keyframes works-image-fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
<!-- </style> -->

<!-- <script setup lang="ts">
import { onUnmounted, watch, nextTick } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const route = useRoute();
const { $lenis } = useNuxtApp();

watch(() => route.fullPath, async () => {
	await nextTick();
	$lenis.resize();
	ScrollTrigger.refresh();
});

watch(() => route.path, () => {
	$lenis.scrollTo(0, { immediate: true });
});

const destroyLenis = () => {
	if (!$lenis) return;
	$lenis.destroy();
};

onUnmounted(() => {
	destroyLenis();
});

</script>

<template>
	<div>
		<app-header />
		<main>
			<slot />
		</main>
		<app-footer />
	</div>
</template>

<style>
/* lenis向けスタイル */
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
</style> -->

<script setup lang="ts">
import { watch, nextTick } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const route = useRoute();
const { $lenis } = useNuxtApp();

// ページ遷移ごとのリフレッシュ処理
watch(() => route.fullPath, async () => {
	await nextTick();

	// iOS Safari向けに少しだけ待機してからリサイズをかけると安定する
	setTimeout(() => {
		if ($lenis) {
			$lenis.resize();
		}
		ScrollTrigger.clearScrollMemory();
		ScrollTrigger.refresh(true);
		// TopSkillアニメーションをリセット
		window.dispatchEvent(new CustomEvent('reset-skill-animation'));
		// TopWorksアニメーションをリセット
		window.dispatchEvent(new CustomEvent('reset-work-animation'));
	}, 200);
});

// ページ遷移時にトップへ戻す処理（必要な場合のみ）
watch(() => route.path, () => {
	// 遷移の瞬間に top 0 へ。
	$lenis?.scrollTo(0, { immediate: true });
});
</script>

<template>
	<div id="app-container">
		<app-header />
		<main>
			<slot />
		</main>
		<app-footer />
	</div>
</template>

<style>
/* html に .lenis クラスが付与されることを前提とする
  iOS Safariでは以下の設定が「生命線」です
*/
html.lenis {
  height: auto;
}

body {
  /* iOSでのバウンスによるカクつきを抑制 */
  overscroll-behavior-y: none;
}

/* htmlタグに対して直接指定する。
  lenis-smooth が効いている間は CSS のスムーズスクロールを絶対に OFF にする
*/
html.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-stopped {
  overflow: hidden;
}
</style>
