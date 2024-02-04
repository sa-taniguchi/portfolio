

<template>
    <Header />
        <main id="top">
            <article>
                <section class="p-topFv">
                    <div class="l-lgContainer">
                        <ul class="p-topFv__list">
                            <li>
                                <NuxtPicture 
                                    src="/img/top/top01.jpg" 
                                    alt=""
                                    width="340" 
                                    height="340"
                                    format="webp"
                                    legacy-format="jpeg"
                                />
                            </li>
                            <li>
                                <NuxtPicture 
                                    src="/img/top/top02.jpg" 
                                    alt="" 
                                    width="340" 
                                    height="340"
                                    format="webp"
                                    legacy-format="jpeg"
                                />
                            </li>
                        </ul>
                    </div>
                </section>
                <section id="top-about" class="p-topAbout">
                    <div class="l-lgContainer">
                        <div class="p-topAbout__wrapper">
                            <div class="p-topAbout__img">
                                <NuxtPicture 
                                    format="webp"
                                    src="/img/top/about.jpg"
                                    alt=""
                                    decoding="async"
                                />
                            </div>
                            <div class="p-topAbout__info">
                                <div class="u-mb3">
                                    <h2 class="p-topCommon-ttl js-io js-span-wrap-text" ref="isTarget">About
                                    </h2>
                                    <span class="p-topCommon-ttl__sm js-io">自己紹介</span>
                                </div>
                                <div class="p-topAbout__txt js-io">
                                    <p>はじめまして。谷口と申します。</p>
                                    <p class="mb1">HP制作を中心にHTMLコーダーとしてキャリアをスタートして3年程になります。</p>
                                    <p class="mb1">職業訓練校でWEB制作について半年間学習後、ホームページなどWEB制作携わる会社に就職。主にコーディング業務に従事し、ホームページ制作やLP制作、またデザイン制作の案件に携わってきました。</p>
                                    <p>現在では更なるスキルアップを求めて、これまで学んだ知識やスキルを活かして転職活動中です。</p>
                                    <p class="is-small">（2023年10月更新）</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>


                <section id="top-work" class="p-topWork">
                    <div class="l-lgContainer">
                        <div class="u-mb3">
                            <h2 class="p-topCommon-ttl js-span-wrap-text js-io">WORKS</h2>
                            <span class="p-topCommon-ttl__sm js-io">制作実績</span>
                        </div>
                            <div class="p-topWork__wrapper">
                                <ul class="p-topWork__list">
                                    <li class="p-topWork__item" v-for="work in data.contents" :key="work.id">
                                        <NuxtLink :to="`${work.id}`">
                                            <div class="p-topWork__img">
                                                <NuxtPicture
                                                    provider="imgix" 
                                                    :src="work.img.url"
                                                    alt=""
                                                    decoding="async"
                                                    format="webp"
                                                />
                                            </div>
                                            <h3 class="p-topWork__ttl">{{ work.title }}</h3>
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>
                    </div>
                </section>

                <section id="top-skill" class="p-topSkill">
                    <div class="l-xlContainer">
                        <div class="u-mb3">
                            <h2 class="p-topCommon-ttl js-span-wrap-text js-io">SKILL</h2>
                            <span class="p-topCommon-ttl__sm js-io">扱うスキル</span>
                        </div>
                        <div class="p-topSkill__wrapper">
                            <nav class="p-topSkill__nav">
                                <h3 class="p-topSkill__navTtl">SKILL</h3>
                                <ol id="indexList" class="p-topSkill__navList">
                                    <li><a href="#skill_info_cording">コーディング</a></li> 
                                    <li><a href="#skill_info_design">デザイン</a></li>
                                    <li><a href="#skill_info_develop">開発環境</a></li>
                                    <li><a href="#skill_info_others">その他スキル</a></li>
                                </ol>
                            </nav>
                            <div class="p-topSkill__info">
                                <div id="skill_info_cording" class="js-topSkill__info">
                                    <h3 class="p-topSkill__ttl"><span class="is-large">コーディング</span><span>SKILL</span></h3>
                                    <ul class="p-topSkill__infoList">
                                        <li class="js-io">
                                            <span></span>
                                            <p class="p-topSkill__img"><NuxtImg src="/img/top/skill-html5.svg" alt="html5" decoding="async"></NuxtImg></p>
                                            <h4 class="p-topSkill__subTtl">HTML5</h4>
                                            <p class="p-topSkill__txt">
                                                セマンティックな記述を意識し、WAI-ARIAの記述にも取り組むなどアクセシビリティやユーザビリティを含めたマークアップを心掛けています。
                                            </p>
                                        </li>
                                        <li class="js-io">
                                            <span></span>
                                            <p class="p-topSkill__img"><NuxtImg src="/img/top/skill-css3.svg" alt="css3" decoding="async"></NuxtImg></p>
                                            <h4 class="p-topSkill__subTtl">CSS3</h4>
                                            <p class="p-topSkill__txt">DartSassを使用。コードの再利用を意識して記述を行っています。
                                                <br>クラス設計の知見もあり、ファイルの構成規則や命名規則も学習しています。
                                            </p>
                                        </li>
                                        <li class="js-io">
                                            <span></span>
                                            <p class="p-topSkill__img"><NuxtImg src="/img/top/skill-js.svg" alt="JavaScript" decoding="async"></NuxtImg></p>
                                            <h4 class="p-topSkill__subTtl">JavaScript</h4>
                                            <p class="p-topSkill__txt">ES6に基づいて、基礎的な実装（クリックイベントやループなどDOM操作で使用する関数）が可能です。
                                                <br>jQueryの記法やライブラリの実装も対応できます。
                                            </p>
                                        </li>
                                        <li class="js-io">
                                            <span></span>
                                            <p class="p-topSkill__img"><NuxtImg src="/img/top/skill-php.svg" alt="PHP" decoding="async"></NuxtImg></p>
                                            <h4 class="p-topSkill__subTtl">PHP(WordPress)</h4>
                                            <p class="p-topSkill__txt">WordPressを使った制作が可能で、オリジナルテーマの作成やカスタマイズを経験しました。<br>
                                                ローカルで作業する場合は、MAMPを使用して検証しています。
                                            </p>
                                        </li>
                                        <li class="js-io">
                                            <span></span>
                                            <p class="p-topSkill__img"><NuxtImg src="/img/top/skill-vue.svg" alt="vue/Nuxt" decoding="async"></NuxtImg></p>
                                            <h4 class="p-topSkill__subTtl">Vue.js</h4>
                                            <p class="p-topSkill__txt">Vue3のバージョンで日々学習中です。現時点では素のJavaScriptやjQueryで記述していたコードをVueで置き換える程度で使用可能です。<br>
                                            またNuxt3も併せて学習中です。（このポートフォリオで使用）</p>
                                        </li>
                                    </ul>
                                </div>                                
                                <div id="skill_info_design" class="js-topSkill__info">
                                    <h3 class="p-topSkill__ttl"><span class="is-large">デザイン</span><span>SKILL</span></h3>
                                    <ul class="p-topSkill__infoList">
                                        <li class="js-io">
                                            <span></span>
                                            <p class="p-topSkill__img"><NuxtImg src="/img/top/skill-ai.svg" alt="Illustrator" decoding="async"></NuxtImg></p>
                                            <h4 class="p-topSkill__subTtl">Illustrator</h4>
                                            <p class="p-topSkill__txt">
                                                ソフトの基本操作の知識を有しています。<br>
                                                これまで、バナーの作成・デザインカンプ作成・SVGなど画像書き出し・地図イラスト作成などに使用してきました。
                                            </p>
                                        </li>
                                        <li class="js-io">
                                            <span></span>
                                            <p class="p-topSkill__img"><NuxtImg src="/img/top/skill-mockup.svg" alt="デザインカンプ作成ツール" decoding="async"></NuxtImg></p>
                                            <h4 class="p-topSkill__subTtl">デザインカンプ作成ツール</h4>
                                            <p class="p-topSkill__txt">これまでは主にAdobe XDを使用してデザインカンプの作成やデザイン確認（数値の確認、画像書き出しなど）を行ってきました。<br>
                                                その他、Figmaは学習中で、基礎的な操作を把握しています。
                                            </p>
                                        </li>

                                        <li class="js-io">
                                            <span></span>
                                            <p class="p-topSkill__img"><NuxtImg src="/img/top/skill-ps.svg" alt="Photoshop" decoding="async"></NuxtImg></p>
                                            <h4 class="p-topSkill__subTtl">Photoshop</h4>
                                            <p class="p-topSkill__txt">
                                                ソフトの基本操作の知識を有しています。<br>
                                                これまで、写真のレタッチ（色調調整や消しゴムツールの使用）・白抜き作業などに対応可能です。
                                            </p>
                                        </li>
                                    </ul>
                                </div>                                
                                <div id="skill_info_develop" class="js-topSkill__info">
                                    <h3 class="p-topSkill__ttl"><span class="is-large">開発環境</span><span>SKILL</span></h3>
                                    <ul class="p-topSkill__infoList">
                                        <li class="js-io">
                                            <span></span>
                                            <p class="p-topSkill__img"><NuxtImg src="/img/top/skill-editor.svg" alt="テキストエディタ" decoding="async"></NuxtImg></p>
                                            <h4 class="p-topSkill__subTtl">テキストエディタ</h4>
                                            <p class="p-topSkill__txt">
                                                現在は主にVSCodeを使用してコードを記述しています。<br>
                                                その他、Adobe Dreamweaberも使用したことがあります。
                                            </p>
                                        </li>
                                        <li class="js-io">
                                            <span></span>
                                            <p class="p-topSkill__img"><NuxtImg src="/img/top/skill-build.svg" alt="ビルドツール" decoding="async"></NuxtImg></p>
                                            <h4 class="p-topSkill__subTtl">ビルドツール</h4>
                                            <p class="p-topSkill__txt">
                                                これまでは主にGulp4を使用して、Sass・画像・Javascriptのコンパイル環境を導入していました。<br>
                                                その他に、WebPackも使用可能。Viteも現在学習中です。
                                            </p>
                                        </li>
                                        <li class="js-io">
                                            <span></span>
                                            <p class="p-topSkill__img"><NuxtImg src="/img/top/skill-git.svg" alt="Git" decoding="async"></NuxtImg></p>
                                            <h4 class="p-topSkill__subTtl">Git</h4>
                                            <p class="p-topSkill__txt">
                                                Gitを使用したソースコードの管理の基礎的な知見があります。<br>
                                                ステージングエリア・コミット文・リモートリポジトリへの追加作業が可能です。<br>
                                                ブランチ作業やその他についてUdemyを使用し、現在習得中です。
                                            </p>
                                        </li>
                                    </ul>
                                </div>         

                                <div id="skill_info_others" class="js-topSkill__info">
                                    <h3 class="p-topSkill__ttl"><span class="is-large">その他スキル</span><span>SKILL</span></h3>
                                    <ul class="p-topSkill__infoList">
                                        <li class="js-io">
                                            <span></span>
                                            <p class="p-topSkill__img"><NuxtImg src="/img/top/skill-otf.svg" alt="色彩検定2級" decoding="async"></NuxtImg></p>
                                            <h4 class="p-topSkill__subTtl">色彩検定2級</h4>
                                        </li>
                                        <li class="js-io">
                                            <span></span>
                                            <p class="p-topSkill__img"><NuxtImg src="/img/top/skill-car.svg" alt="普通自動車第一種" decoding="async"></NuxtImg></p>
                                            <h4 class="p-topSkill__subTtl">普通自動車第一種</h4>
                                        </li>
                                    </ul>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </section>

                <section class="p-topContact">
                    <Swiper
                        :modules="[SwiperAutoplay]"
                        :slides-per-view="5"
                        loop
                        :speed="6000"
                        :loopAdditionalSlides="5"
                        :breakpoints="breakpoints"
                        :autoplay="{
                            delay: 0,
                            disableOnInteraction: false
                        }"
                    >
                        <SwiperSlide><NuxtPicture src="/img/top/top-slider01.jpg" alt="" decoding="async" format="webp"/></SwiperSlide>
                        <SwiperSlide><NuxtPicture src="/img/top/top-slider02.jpg" alt="" decoding="async" format="webp"/></SwiperSlide>
                        <SwiperSlide><NuxtPicture src="/img/top/top-slider03.jpg" alt="" decoding="async" format="webp"/></SwiperSlide>
                        <SwiperSlide><NuxtPicture src="/img/top/top-slider04.jpg" alt="" decoding="async" format="webp"/></SwiperSlide>
                        <SwiperSlide><NuxtPicture src="/img/top/top-slider05.jpg" alt="" decoding="async" format="webp"/></SwiperSlide>
                        <SwiperSlide><NuxtPicture src="/img/top/top-slider06.jpg" alt="" decoding="async" format="webp"/></SwiperSlide>
                        <SwiperSlide><NuxtPicture src="/img/top/top-slider01.jpg" alt="" decoding="async" format="webp"/></SwiperSlide>
                        <SwiperSlide><NuxtPicture src="/img/top/top-slider02.jpg" alt="" decoding="async" format="webp"/></SwiperSlide>
                        <SwiperSlide><NuxtPicture src="/img/top/top-slider03.jpg" alt="" decoding="async" format="webp"/></SwiperSlide>
                        <SwiperSlide><NuxtPicture src="/img/top/top-slider04.jpg" alt="" decoding="async" format="webp"/></SwiperSlide>
                        <SwiperSlide><NuxtPicture src="/img/top/top-slider05.jpg" alt="" decoding="async" format="webp"/></SwiperSlide>
                        <SwiperSlide><NuxtPicture src="/img/top/top-slider06.jpg" alt="" decoding="async" format="webp"/></SwiperSlide>
                    </Swiper>
                    <div class="p-topContact__box">
                        <p>お気軽にお問い合わせください</p>
                        <div><NuxtLink to="/contact" class="c-btn c-btn__wh">お問い合わせはコチラ</NuxtLink></div>
                    </div>
                </section>
            </article>
        </main>
</template>



<!-- <script setup lang="ts"> -->
<script setup>


import { ref } from "vue";
import { register } from 'swiper/element/bundle';


const ctx = useRuntimeConfig();
const { data } = await useFetch("/work", {
    baseURL: ctx.public.baseUrl,
    headers: {
        "X-MICROCMS-API-KEY": ctx.public.apiKey,
    },
});



register();
let breakpoints = ref(null);

breakpoints.value = {
    375: {
        slidesPerView: 1.5
    },
    568: {
        slidesPerView: 2
    },
    768: {
        slidesPerView: 2.5
    },
    1280: {
        slidesPerView: 3.5
    },
    1920: {
        slidesPerView: 4.5
    },
}


const { $gsap } = useNuxtApp()


useHead({
    script: [
        {
            src: 'common.js',
            tagPosition: 'bodyClose'
        },
    ],
    title: '',
})

onMounted(()=>{
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



    
    const wrapCharSpan = function(str){
        return [...str].map(char => `<span>${char}</span>`).join('');
        }
        const targets = document.querySelectorAll('.js-span-wrap-text');
        targets.forEach( (target) => {
        target.innerHTML = wrapCharSpan(target.textContent);
    })



    const list_wrap  = document.querySelector(".p-topWork__list");
    const container = document.querySelector(".p-topWork__wrapper");

    $gsap.to(list_wrap, {
        x: () => -(list_wrap.clientWidth -  container.clientWidth),
        ease: 'none',
        scrollTrigger: {
            trigger: '.p-topWork',
            start: 'top top',
            end: () => `+=${list_wrap.clientWidth -  container.clientWidth}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });



    const boxes = document.querySelectorAll(".js-topSkill__info");

    const sKillBoxOptions = {
        root: null,
        rootMargin: "-50% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver(doWhenIntersect, sKillBoxOptions);
    boxes.forEach(box => {
        observer.observe(box);
    });


    function doWhenIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateIndex(entry.target);
            }
        });
    }

    function activateIndex(element) {
        const currentActiveIndex = document.querySelector("#indexList .is-active");
        if (currentActiveIndex !== null) {
            currentActiveIndex.classList.remove("is-active");
        }   
            const newActiveIndex = document.querySelector(`#indexList a[href*='#${element.id}']`);
            newActiveIndex.classList.add("is-active");
    }




    
    const topFvLists = document.querySelectorAll('.p-topFv__list > li');

    topFvLists.forEach(element =>{
        element.classList.add('is-load');
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



// ページ内リンクのスムーススクロール
for (const link of document.querySelectorAll('a[href*="#"]')) {
  link.addEventListener('click', (e) => {
    const hash = e.currentTarget.hash;
    
    // "#"と"#top"の時（ページトップへスクロール）
    if (!hash || hash === '#top') {
      e.preventDefault();
      window.scrollTo({
        top: 1, // iOSのChromeでfixedされた固定ヘッダーなどが動くバグがあるため0ではなく1に
        behavior: 'smooth',
      });
      
    // それ以外の時（アンカーへスクロール）
    } else {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        e.preventDefault();
        const position = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: position,
          behavior: "smooth",
        });

      }
    }
  });
};




});




</script>