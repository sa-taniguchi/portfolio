


//ハンバーガーメニュー全般

  const mediaQueryList = window.matchMedia('(min-width: 1280px)');
  
  const html = document.documentElement;
  const hmbg = document.getElementById('js-header-hmbg');
  const headerNav = document.getElementById('js-header-nav');
  const headerNavBg = document.querySelector('.header_nav_bg');


  const listener = (event) => {
    // リサイズ時に行う処理
    if (event.matches) {
      headerNav.classList.remove('is-show');
      headerNav.setAttribute('aria-hidden', false);
      hmbg.classList.remove('is-show');
      hmbg.setAttribute('aria-hidden', true);
      hmbg.setAttribute('aria-expanded', false);
      html.classList.remove('is-menuOpen');
      headerNavBg.classList.remove('is-show');
    } else {
      headerNav.setAttribute('aria-hidden', true);
      hmbg.setAttribute('aria-hidden', false);
      hmbg.setAttribute('aria-expanded', false);
    }
  };
  mediaQueryList.addEventListener("change", listener);
  
  // 初期化処理
  listener(mediaQueryList);


  headerNavBg.addEventListener('click',function(){
    headerNavBg.classList.remove('is-show');
    headerNav.classList.remove('is-show');
    headerNav.setAttribute('aria-hidden', false);
    hmbg.classList.remove('is-show');
    hmbg.setAttribute('aria-hidden', true);
    hmbg.setAttribute('aria-expanded', false);
    html.classList.remove('is-menuOpen');
  });


  // ハンバーガーメニューの開閉
  let scrollpos;//スクロールの位置を入れる場所 
  hmbg.addEventListener('click',function(){
    this.classList.toggle('is-show');
    headerNav.classList.toggle('is-show');
    headerNavBg.classList.toggle('is-show');
    // if(hmbg.getAttribute('aria-expanded') === 'false' && (this.classList.contains('is-show')) ){
    if(hmbg.getAttribute('aria-expanded') === 'false'){
      hmbg.setAttribute('aria-expanded', true);
      headerNav.setAttribute('aria-hidden', false);
      scrollpos = window.scrollY;
      document.body.style.top = scrollpos * -1 + 'px';
      html.classList.add('is-menuOpen');
    } 
    else {
      hmbg.setAttribute('aria-expanded', false);
      headerNav.setAttribute('aria-hidden', true);
      html.classList.remove('is-menuOpen');
      window.scrollTo(0, scrollpos);
    }
  });
  // /*ハンバーガーメニュー




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
// {
//   let date = new Date();
//   let current = date.getFullYear();
//   let year = document.getElementById('js-current-year');
//   year.textContent = current;
// }





// スクロール検知(画面に入ったらクラス付与 && 外す)
let scrollCheck = document.querySelectorAll('.js-io');

const cb = function(entries){
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('is-inview');
    } 
  });
}

const options = {
  threshold: .17
}

 const io = new IntersectionObserver(cb,options);

 scrollCheck.forEach(v => {
  io.observe(v);
 });










//# sourceMappingURL=common.js.map

//# sourceMappingURL=common.js.map
