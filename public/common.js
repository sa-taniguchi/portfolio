

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
  });

      
  // window.addEventListener('load',()=>{
  //   let scroll = new SmoothScroll('a[href*="#"]');
  // })
    









//# sourceMappingURL=common.js.map

//# sourceMappingURL=common.js.map
