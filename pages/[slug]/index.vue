
<template>
    <Header />
    <main id="work">
        <section>
            <div class="lg-container">
                <div class="subpage_fv">
                    <h2 class="js-span-wrap-text js-io">WORKS</h2>
                    <span class="js-io">制作実績</span>
                </div>
            </div>
            <div class="lg-container">
                <p class="work_detail_img">
                    <NuxtPicture 
                        provider="imgix" 
                        :src="work.img.url"
                        alt=""
                        format="webp"
                    />
                </p>
            </div>
            <div class="md-container">
                <h3 class="work_headline"><span>{{ work.title }}</span></h3>
                <p class="work_date">{{ work.time }}</p>
                <div class="mb2">
                    <h4 class="work_detail_ttl">担当</h4>
                    <div>
                        <span
                            class="work_detail_skill"
                            v-for="(part, p_index) in work.parts"
                            :key="p_index"
                        >
                        {{ part.parts }}
                        </span>
                    </div>
                </div>
                <div class="mb2">
                    <h4 class="work_detail_ttl">使用スキル</h4>
                    <div>
                        <span
                            class="work_detail_skill"
                            v-for="(skill,s_index) in work.skills"
                            :key="s_index"
                        >
                            {{ skill.skills }}
                        </span>
                    </div>
                </div>
                <div class="mb2">
                    <h4 class="work_detail_ttl">制作について</h4>
                    <div v-html="work.body" class="work_body"></div>
                </div>
                <p v-if="work.url" class="work_detail_url"><span>website:</span><NuxtLink :to="work.url" target="_blank">{{ work.url }}<img src="/img/common/link.svg" alt="" class="work_url_link"></NuxtLink></p>
                <div class="btn_wrapper"><NuxtLink to="/#top-work" class="btn work_btn">戻る</NuxtLink></div>
            </div>
        </section>
    </main>
</template>


<script setup>

const route = useRoute();
const slug = route.params.slug;
const ctx = useRuntimeConfig();

const { data : work } = await useFetch(`/work/${slug}`, {
baseURL: ctx.public.baseUrl,
    headers: {
        "X-MICROCMS-API-KEY": ctx.public.apiKey,
    },
});

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
    const wrapCharSpan = function(str){
        return [...str].map(char => `<span>${char}</span>`).join('');
        }
        const targets = document.querySelectorAll('.js-span-wrap-text');
        targets.forEach((target) => {
        target.innerHTML = wrapCharSpan(target.textContent);
    });

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
        // hmbg.setAttribute('aria-hidden', false);
        // hmbg.setAttribute('aria-expanded', true);
        html.classList.remove('is-menuOpen');
        })
    }
    // /*ハンバーガーメニュー

});
</script>

