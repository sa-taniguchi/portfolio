
<!-- <script setup lang="ts"> -->
<script setup>


import { ref } from "vue";
import { register } from 'swiper/element/bundle';
// import type { Work } from "~/types/blog"

// const { data } = await useMicroCMSGetList<Work>({
//     endpoint : "work",
// })
register();



const ctx = useRuntimeConfig();
const { data } = await useFetch("/work", {
    baseURL: ctx.public.baseUrl,
    headers: {
    "X-MICROCMS-API-KEY": ctx.public.apiKey,
    },
});


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
useHead({
    script: [ 
        { 
            src: 'top.js', 
            body: true,
        },
    ],
})

</script>

<template>
    <Header class="is-top" />
        <main id="top">
            <article>
                <section id="top-fv" class="top-fv">
                    <div class="lg-container">
                        <ul class="top-fv_list">
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
                <section id="top-about" class="top-about">
                    <div class="lg-container">
                        <div class="about_wrapper">
                            <div class="about_img">
                                <NuxtPicture 
                                    format="webp"
                                    src="/img/top/about.jpg"
                                    alt=""
                                    decoding="async"
                                />
                            </div>
                            <div class="about_info">
                                <h2 class="common-ttl">About
                                    <span>自己紹介</span>
                                </h2>
                                <p>はじめまして。谷口と申します。</p>
                                <p class="mb1">HP制作を中心にHTMLコーダーとしてキャリアをスタートして3年程になります。</p>
                                <p class="mb1">職業訓練校でWEB制作について半年間学習後、ホームページなどWEB制作携わる会社に就職。主にコーディング業務に従事し、ホームページ制作やLP制作、またデザイン制作の案件に携わってきました。</p>
                                <p>現在では更なるスキルアップを求めて、これまで学んだ知識やスキルを活かして転職活動中です。</p>
                                <p class="is-small">（2023年10月更新）</p>
                            </div>
                        </div>

                    </div>
                </section>


                <section id="top-work" class="top-work">
                    <div class="lg-container">
                        <h2 class="common-ttl">WORKS
                            <span>制作実績</span>
                        </h2>
                        <ul class="top-work_list">
                            <li class="top-work_item" v-for="work in data.contents" :key="work.id">
                                <NuxtLink :to="`${work.id}`">
                                    <div class="work_item_img">
                                        <NuxtPicture
                                            provider="imgix" 
                                            :src="work.img.url"
                                            alt=""
                                            decoding="async"
                                        />
                                    </div>
                                    <h3 class="work_item_ttl">{{ work.title }}</h3>
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </section>

                <section id="top-skill" class="top-skill">
                    <div class="xl-container">
                        <h2 class="common-ttl">SKILL
                            <span>扱うスキル</span>
                        </h2>
                        <div class="skill_wrapper">
                            <nav class="skill_nav">
                                <h3 class="skill_nav_ttl">SKILL</h3>
                                <ol id="indexList" class="skill_nav_list">
                                    <li><NuxtLink to="#skill_info_cording">コーディング</NuxtLink></li> 
                                    <li><NuxtLink to="#skill_info_design">デザイン</NuxtLink></li>
                                    <li><NuxtLink to="#skill_info_develop">開発環境</NuxtLink></li>
                                    <li><NuxtLink to="#skill_info_others">その他スキル</NuxtLink></li>
                                </ol>
                            </nav>
                            <div class="skill_info">
                                <div id="skill_info_cording" class="skill_info_box">
                                    <h3 class="skill_info_ttl"><span class="is-large">コーディング</span><span>SKILL</span></h3>
                                    <ul class="skill_info_list">
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-html5.png" alt="html5" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">HTML5</h4>
                                            <p class="info_list_txt">
                                                セマンティックな記述を意識し、WAI-ARIAの記述にも取り組むなどアクセシビリティやユーザビリティを含めたマークアップを心掛けています。
                                            </p>

                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-css3.png" alt="html5" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">CSS3</h4>
                                            <p class="info_list_txt">DartSassを使用。コードの再利用を意識して記述を行っています。
                                                <br>クラス設計の知見もあり、ファイルの構成規則や命名規則も学習しています。
                                            </p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-js.png" alt="html5" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">JavaScript</h4>
                                            <p class="info_list_txt">ES6に基づいて、基礎的な実装（クリックイベントやループなどDOM操作で使用する関数）が可能です。
                                                <br>jQueryの記法やライブラリの実装も対応できます。
                                            </p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-php.png" alt="PHP" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">PHP(WordPress)</h4>
                                            <p class="info_list_txt">WordPressを使った制作が可能で、オリジナルテーマの作成やカスタマイズを経験しました。<br>
                                                ローカルで作業する場合は、MAMPを使用して検証しています。
                                            </p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-vue.png" alt="vue/Nuxt" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">Vue.js</h4>
                                            <p class="info_list_txt">Vue3のバージョンで日々学習中です。現時点では素のJavaScripやjQueryで記述していたコードをVueで置き換える程度で使用可能です。<br>
                                                またNuxt3も併せて学習中です。（このポートフォリオで使用）</p>
                                        </li>
                                    </ul>
                                </div>                                
                                <div id="skill_info_design" class="skill_info_box">
                                    <h3 class="skill_info_ttl"><span class="is-large">デザイン</span><span>SKILL</span></h3>
                                    <ul class="skill_info_list">
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-ai.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">イラストレーター</h4>
                                            <p class="info_list_txt">
                                                ソフトの基本操作の知識を有しています。<br>
                                                これまで、バナーの作成・デザインカンプ作成・SVGなど画像書き出し・地図イラスト作成などに使用してきました。
                                            </p>

                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-mockup.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">デザインカンプ作成ツール</h4>
                                            <p class="info_list_txt">これまでは主にAdobe XDを使用してデザインカンプの作成やデザイン確認（数値の確認、画像書き出しなど）を行ってきました。<br>
                                                その他、Figmaは学習中で、基礎的な操作を把握しています。
                                            </p>
                                        </li>

                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-ps.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">フォトショップ</h4>
                                            <p class="info_list_txt">
                                                ソフトの基本操作の知識を有しています。<br>
                                                これまで、写真のレタッチ（色調調整や消しゴムツールの使用）・白抜き作業などに対応可能です。
                                            </p>
                                        </li>
                                    </ul>
                                </div>                                
                                <div id="skill_info_develop" class="skill_info_box">
                                    <h3 class="skill_info_ttl"><span class="is-large">開発環境</span><span>SKILL</span></h3>
                                    <ul class="skill_info_list">
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-editor.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">テキストエディタ</h4>
                                            <p class="info_list_txt">
                                                現在は主にVSCodeを使用してコードを記述しています。<br>
                                                その他、Adobe Dreamweaberも使用したことがあります。
                                            </p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-build.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">ビルドツール</h4>
                                            <p class="info_list_txt">
                                                これまでは主にGulp4を使用して、Sass・画像・Javascriptのコンパイル環境を導入していました。<br>
                                                その他に、WebPackも使用可能。Viteも現在学習中です。
                                            </p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-git.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">Git</h4>
                                            <p class="info_list_txt">
                                                Gitを使用したソースコードの管理の基礎的な知見があります。<br>
                                                ステージングエリア・コミット文・リモートリポジトリへの追加作業が可能です。<br>
                                                ブランチ作業やその他についてUdemyを使用し、現在習得中です。
                                            </p>
                                        </li>
                                    </ul>
                                </div>         

                                <div id="skill_info_others" class="skill_info_box">
                                    <h3 class="skill_info_ttl"><span class="is-large">その他スキル</span><span>SKILL</span></h3>
                                    <ul class="skill_info_list">
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-otf.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">色彩検定</h4>
                                            <!-- <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p> -->
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-car.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">普通車免許</h4>
                                            <!-- <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p> -->
                                        </li>
                                    </ul>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </section>

                <section class="top-contact">
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
                        <SwiperSlide><NuxtImg src="/img/top/top-slider01.jpg" alt="" decoding="async"></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider02.jpg" alt="" decoding="async"></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider03.jpg" alt="" decoding="async"></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider04.jpg" alt="" decoding="async"></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider05.jpg" alt="" decoding="async"></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider06.jpg" alt="" decoding="async"></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider01.jpg" alt="" decoding="async"></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider02.jpg" alt="" decoding="async"></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider03.jpg" alt="" decoding="async"></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider04.jpg" alt="" decoding="async"></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider05.jpg" alt="" decoding="async"></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider06.jpg" alt="" decoding="async"></NuxtImg></SwiperSlide>
                    </Swiper>
                    <div class="top-contact_box">
                        <p>お気軽にお問い合わせください</p>
                        <div><NuxtLink to="/contact" class="btn">お問い合わせはコチラ</NuxtLink></div>
                    </div>
                </section>
            </article>
        </main>
</template>
