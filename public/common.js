






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


const wrapCharSpan = function(str){
  return [...str].map(char => `<span>${char}</span>`).join('');
}

//対象の要素を取得する
const targets = document.querySelectorAll('.js-span-wrap-text');
//要素の内容を関数の実行結果で置き換える
targets.forEach( (target) => {
  target.innerHTML = wrapCharSpan(target.textContent);
})




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
  threshold: .2
}

 const io = new IntersectionObserver(cb,options);

 scrollCheck.forEach(v => {
  io.observe(v);
 });









//# sourceMappingURL=common.js.map

//# sourceMappingURL=common.js.map
