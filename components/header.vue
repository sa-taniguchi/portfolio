<template>
    <header id="header">
        <div class="xl-container">
            <h1><nuxtLink to="/"><NuxtImg src="/img/common/logo.svg" alt="ポートフォリオ"></NuxtImg></nuxtLink></h1>
            <button type="button" id="js-header-hmbg" class="hmbg_btn" aria-controls="js-header-nav">
                <span class="hmbg_bar"></span>
            </button>
            <navbar />
        </div>
    </header>
</template>

<script setup>
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
            // hmbg.setAttribute('aria-hidden', false);
            // hmbg.setAttribute('aria-expanded', true);
            html.classList.remove('is-menuOpen');
            })
        }
        // /*ハンバーガーメニュー


        const header = document.getElementById('header');
        header.classList.add('is-load');


        const topFvList = document.querySelectorAll('.top-fv_list li');

        topFvList.forEach(element =>{
            element.classList.add('is-load');
        });
    })
</script>