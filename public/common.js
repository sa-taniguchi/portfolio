

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
