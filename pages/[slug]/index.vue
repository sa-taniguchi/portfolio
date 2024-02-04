
<template>
    <Header />
    <main class="p-work">
        <section>
            <div class="l-lgContainer">
                <div class="c-subpageFv">
                    <h2 class="p-subpageFV-title js-io">WORKS</h2>
                    <span class="p-subpageFV-title__sm js-io">制作実績</span>
                </div>
            </div>
            <div class="l-lgContainer">
                <p class="p-work__img">
                    <NuxtPicture 
                        provider="imgix" 
                        :src="work.img.url"
                        alt=""
                        format="webp"
                    />
                </p>
            </div>
            <div class="l-mdContainer">
                <h3 class="p-work__headline"><span ref="workTTl">{{ work.title }}</span></h3>
                <p class="p-work__date">{{ work.time }}</p>
                <div class="u-mb2">
                    <h4 class="p-work__ttl">担当</h4>
                    <div>
                        <span
                            class="p-work__skill"
                            v-for="(part, p_index) in work.parts"
                            :key="p_index"
                        >
                        {{ part.parts }}
                        </span>
                    </div>
                </div>
                <div class="u-mb2">
                    <h4 class="p-work__ttl">使用スキル</h4>
                    <div>
                        <span
                            class="p-work__skill"
                            v-for="(skill,s_index) in work.skills"
                            :key="s_index"
                        >
                            {{ skill.skills }}
                        </span>
                    </div>
                </div>
                <div class="u-mb2">
                    <h4 class="p-work__ttl">制作について</h4>
                    <div v-html="work.body" class="p-work__body"></div>
                </div>
                <p v-if="work.url" class="p-work__url u-mb5"><span>website:</span><NuxtLink :to="work.url" target="_blank">{{ work.url }}<img src="/img/common/link.svg" alt="" class="p-work__link"></NuxtLink></p>
                <div class="c-btnWrapper c-btnWrapper--work"><NuxtLink to="/#top-work" class="c-btn c-btn--work">戻る</NuxtLink></div>
            </div>
        </section>
    </main>
</template>


<script setup>
import { ref } from "vue";

const route = useRoute();
const slug = route.params.slug;
const ctx = useRuntimeConfig();

const { data : work } = await useFetch(`/work/${slug}`, {
baseURL: ctx.public.baseUrl,
    headers: {
        "X-MICROCMS-API-KEY": ctx.public.apiKey,
    },
});

const workTTl = ref ();

onMounted(()=>{
    
    useHead({
        script: [
            {
                src: 'common.js',
                body: true
            },
        ],
        title: `${workTTl.value.textContent} |`,
    })


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
    html.classList.remove('is-menuOpen');
    })
}

});
</script>

