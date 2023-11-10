{

// 固定ヘッダーの高さ（＋余白の追加）
const headerHeight = document.querySelector('header').offsetHeight;

// イージング関数（easeOutExpo）
function scrollToPos(position) {
  const startPos = window.scrollY;
  // スクロールの最大距離を制限
  const distance = Math.min(position - startPos, document.documentElement.scrollHeight - window.innerHeight - startPos);
  const duration = 800; // スクロールにかかる時間（ミリ秒）

  let startTime;

  function easeOutExpo(t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
  }

  function animation(currentTime) {
    if (startTime === undefined) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    const scrollPos = easeOutExpo(timeElapsed, startPos, distance, duration);
    window.scrollTo(0, scrollPos);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, position); // スクロール位置がずれないように修正
    }
  }

  requestAnimationFrame(animation);
}

// LazyLoad対策（遅延読み込み解除）
function removeLazyLoad() {
  // data-srcを変数に格納
  const targets = document.querySelectorAll('[data-src]');
  // 全てのdata-srcを取得
  for (const target of targets) {
    // ページを読み込んで処理
    target.addEventListener('load', () => {
      // data-srcを削除
      target.removeAttribute('data-src');
    });
    // srcにdata-srcの値をコピー
    target.setAttribute('src', target.getAttribute('data-src'));
  }
}

// ページ内リンクのスムーススクロール
for (const link of document.querySelectorAll('a[href*="#"]')) {
  // ハッシュを含むaタグをクリックした時の処理
  link.addEventListener('click', (e) => {
    const hash = e.currentTarget.hash;
    
    // "#"と"#top"の時（ページトップへスクロール）
    if (!hash || hash === '#top') {
      // デフォルトの動作をキャンセル
      e.preventDefault();
      // スクロール開始
      scrollToPos(1); // iOSのChromeでfixedされた固定ヘッダーなどが動くバグがあるため0ではなく1に
      
    // それ以外の時（アンカーへスクロール）
    } else {
      const target = document.getElementById(hash.slice(1));
      // スクロール先がある場合
      if (target) {
        // デフォルトの動作をキャンセル
        e.preventDefault();
        // 遅延読み込み解除
        removeLazyLoad();
        // スクロール先の距離を取得
        const position = target.getBoundingClientRect().top + window.scrollY;
        // スクロール開始
        scrollToPos(position);

        // URLをアンカーで更新する
        history.pushState(null, null, hash);
      }
    }
  });
};

// 別ページ遷移後にスムーススクロール
const hash = window.location.hash;
// URLにアンカーがある場合
if (hash) {
  const target = document.getElementById(hash.slice(1));
  // スクロール先がある場合
  if (target) {
    // 遅延読み込み解除
    removeLazyLoad();
    // ページを読み込んで処理
    window.addEventListener("load", () => {
      // スクロール先の距離を取得
      const position = target.getBoundingClientRect().top + window.scrollY;
      // スクロールのスタート地点(x, y)
      window.scrollTo(0, 0);
      // スクロール開始
      scrollToPos(position);
    });
  }
}
}




   // 375px以下ビューポート固定
  !(function () {
    const viewport = document.querySelector('meta[name="viewport"]');
    function switchViewport() {
      const value =
        window.outerWidth > 375
          ? 'width=device-width,initial-scale=1'
          : 'width=375';
      if (viewport.getAttribute('content') !== value) {
        viewport.setAttribute('content', value);
      }
    }
    addEventListener('resize', switchViewport, false);
    switchViewport();
  })();


// コピーライト年更新
{
  let date = new Date();
  let current = date.getFullYear();
  let year = document.getElementById('js-is-year');
  year.textContent = current;
}














//# sourceMappingURL=common.js.map

//# sourceMappingURL=common.js.map
