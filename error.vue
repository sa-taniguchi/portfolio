<template>
    <Header />
    <main class="p-error">
        <article>
            <section>
                <div class="l-lgContainer">
                    <div class="c-subpageFv">
                        <h2>
                            404 NOT FOUND
                        </h2>
                    </div>
                    <div class="p-error__wrapper">
                        <h3 class="p-error__ttl">お探しのページは見つかりませんでした。</h3>
                        <p class="mb3">
                            申し訳ございません。お探しのページは移動または削除された可能性がございます。
                        </p>
                        <div class="c-btnWrapper"><nuxtLink to="/" role="button" class="c-btn c-btn--anime">トップへ戻る</nuxtLink></div>
                    </div>
                </div>
            </section>
        </article>
    </main>
</template>


<script setup>

useHead({

script: [
    {
        src: 'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15/dist/smooth-scroll.polyfills.min.js',
        body: true
    },
    {
        src: 'common.js',
        body: true
    },
],
})

onMounted(()=>{

        //ハンバーガーメニュー全般

        const mediaQueryList = window.matchMedia('(min-width: 996px)');

        const html = document.documentElement;
        const hmbg = document.getElementById('js-header-hmbg');
        const headerNav = document.getElementById('js-header-nav');
        const headerNavLinks = document.querySelectorAll('.header_nav_list li a');


        const listener = (event) => {
            // リサイズ時に行う処理
            if (event.matches) {
            headerNav.classList.remove('is-show');
            headerNav.setAttribute('aria-hidden', false);
            hmbg.classList.remove('is-show');
            hmbg.setAttribute('aria-hidden', true);
            // hmbg.setAttribute('aria-expanded', false);
            html.classList.remove('is-menuOpen');
            } else {
            headerNav.setAttribute('aria-hidden', true);
            hmbg.setAttribute('aria-hidden', false);
            // hmbg.setAttribute('aria-expanded', true);
            }
        };
        mediaQueryList.addEventListener("change", listener);

        // 初期化処理
        listener(mediaQueryList);


        // ハンバーガーメニューの開閉
        let scrollpos;//スクロールの位置を入れる場所 
        hmbg.addEventListener('click',function(){
            this.classList.toggle('is-show');
            headerNav.classList.toggle('is-show');
            // if(hmbg.getAttribute('aria-expanded') === 'false' && (this.classList.contains('is-show')) ){
            if(headerNav.getAttribute('aria-hidden') === 'true'){
            // hmbg.setAttribute('aria-expanded', false);
            headerNav.setAttribute('aria-hidden', false);
            scrollpos = window.scrollY;
            document.body.style.top = scrollpos * -1 + 'px';
            html.classList.add('is-menuOpen');
            } 
            else {
            // hmbg.setAttribute('aria-expanded', true);
            headerNav.setAttribute('aria-hidden', true);
            html.classList.remove('is-menuOpen');
            window.scrollTo(0, scrollpos);
            }
        });


        for(let i=0; i<headerNavLinks.length;i++){
            headerNavLinks[i].addEventListener('click',()=>{
            headerNav.classList.remove('is-show');
            headerNav.setAttribute('aria-hidden', true);
            hmbg.classList.remove('is-show');
            html.classList.remove('is-menuOpen');
            })
        }
})

</script>