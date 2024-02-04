


<template>
    <Header />
    <main class="p-complete">
        <article>
            <section>
                <div class="l-lgContainer">
                    <div class="c-subpageFv">
                        <h2 class="p-subpageFV-title js-io">Contact</h2>
                        <span class="p-subpageFV-title__sm js-io">お問い合わせ</span>
                    </div>
                    <div class="p-complete__wrapper">
                        <h3 class="p-complete__ttl">お問い合わせが完了しました</h3>
                        <p>お問い合わせいただきありがとうございました。</p>
                        <p class="u-mb3">
                        折り返し、ご連絡いたしますので、
                        恐れ入りますが、しばらくお待ちください。
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
            src: 'common.js',
            body: true
        },
    ],
    title: 'お問い合わせ完了｜'
}) 

onMounted(()=>{
    
    const wrapCharSpan = function(str){
        return [...str].map(char => `<span>${char}</span>`).join('');
        }
        const targets = document.querySelectorAll('.js-span-wrap-text');
        targets.forEach( (target) => {
        target.innerHTML = wrapCharSpan(target.textContent);
    })

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

});
</script>