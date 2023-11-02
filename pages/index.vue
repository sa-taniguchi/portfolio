
<script setup>
import { ref } from "vue";
import { register } from 'swiper/element/bundle';
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
                            <li><NuxtPicture src="/img/top/top01.jpg" alt=""></NuxtPicture></li>
                            <li><NuxtPicture src="/img/top/top02.jpg" alt=""></NuxtPicture></li>
                        </ul>
                    </div>
                </section>
                <section id="top-about" class="top-about">
                    <div class="lg-container">
                        <div class="about_wrapper">
                            <div class="about_img"><NuxtPicture src="/img/top/about.jpg" alt=""></NuxtPicture></div>
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
                            <li class="top-work_item">
                                <NuxtLink to="/" class="top-work_link">
                                    <div class="work_item_img"><NuxtImg src="/img/top/top-slider01.jpg" alt=""></NuxtImg></div>
                                    <span class="work_item_cat">カテゴリカテゴリ</span>
                                    <h3 class="work_item_ttl"><span>テストテストテストテストテストテスト</span></h3>
                                </NuxtLink>
                            </li>
                            <li class="top-work_item">
                                <NuxtLink to="/">
                                    <div class="work_item_img"><NuxtImg src="/img/top/top-slider01.jpg" alt=""></NuxtImg></div>
                                    <span class="work_item_cat">カテゴリカテゴリ</span>
                                    <h3 class="work_item_ttl">テストテスト</h3>
                                </NuxtLink>
                            </li>
                            <li class="top-work_item">
                                <NuxtLink to="/">
                                    <div class="work_item_img"><NuxtImg src="/img/top/top-slider01.jpg" alt=""></NuxtImg></div>
                                    <span class="work_item_cat">カテゴリカテゴリ</span>
                                    <h3 class="work_item_ttl">テストテスト</h3>
                                </NuxtLink>
                            </li>
                            <li class="top-work_item">
                                <NuxtLink to="/">
                                    <div class="work_item_img"><NuxtImg src="/img/top/top-slider01.jpg" alt=""></NuxtImg></div>
                                    <span class="work_item_cat">カテゴリカテゴリ</span>
                                    <h3 class="work_item_ttl">テストテスト</h3>
                                </NuxtLink>
                            </li>
                            <li class="top-work_item">
                                <NuxtLink to="/">
                                    <div class="work_item_img"><NuxtImg src="/img/top/top-slider01.jpg" alt=""></NuxtImg></div>
                                    <span class="work_item_cat">カテゴリカテゴリ</span>
                                    <h3 class="work_item_ttl">テストテスト</h3>
                                </NuxtLink>
                            </li>
                            <li class="top-work_item">
                                <NuxtLink to="/">
                                    <div class="work_item_img"><NuxtImg src="/img/top/top-slider01.jpg" alt=""></NuxtImg></div>
                                    <span class="work_item_cat">カテゴリカテゴリ</span>
                                    <h3 class="work_item_ttl">テストテスト</h3>
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </section>

                <section id="top-skill" class="top-skill">
                    <div class="xl-container">
                        <h2 class="common-ttl">SKILL
                            <span>エンジニアスキル</span>
                        </h2>
                        <div class="skill_wrapper">
                            <nav class="skill_nav">
                                <h3 class="skill_nav_ttl">SKILL</h3>
                                <ul id="indexList" class="skill_nav_list">
                                    <li><NuxtLink to="#skill_info_cording">コーディング</NuxtLink></li> 
                                    <li><NuxtLink to="#skill_info_design">デザイン</NuxtLink></li>
                                    <li><NuxtLink to="#skill_info_develop">開発環境</NuxtLink></li>
                                    <li><NuxtLink to="#skill_info_others">その他スキル</NuxtLink></li>
                                </ul>
                            </nav>
                            <div class="skill_info">
                                <div id="skill_info_cording" class="skill_info_box">
                                    <h3 class="skill_info_ttl">コーディング</h3>
                                    <ul class="skill_info_list">
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-html5.png" alt="html5" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">HTML5</h4>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-css3.png" alt="html5" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">CSS3</h4>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-js.png" alt="html5" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">JavaScript</h4>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-php.png" alt="PHP" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">PHP(WordPress)</h4>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-vue.png" alt="vue/Nuxt" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">skill-vue</h4>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                        </li>

                                    </ul>
                                </div>                                
                                <div id="skill_info_design" class="skill_info_box">
                                    <h3 class="skill_info_ttl">デザイン</h3>
                                    <ul class="skill_info_list">
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-ai.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">イラストレーター</h4>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-ps.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">フォトショップ</h4>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-mockup.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">デザインカンプ作成ツール</h4>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                        </li>
                                    </ul>
                                </div>                                
                                <div id="skill_info_develop" class="skill_info_box">
                                    <h3 class="skill_info_ttl">開発環境</h3>
                                    <ul class="skill_info_list">
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-editor.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">テキストエディタ</h4>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-build.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">ビルドツール</h4>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-git.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">ギット</h4>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-build.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">ビルドツール</h4>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                        </li>
                                    </ul>
                                </div>         

                                <div id="skill_info_others" class="skill_info_box">
                                    <h3 class="skill_info_ttl">その他スキル</h3>
                                    <ul class="skill_info_list">
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-otf.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">色彩検定</h4>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                        </li>
                                        <li>
                                            <span></span>
                                            <p class="skill_info_img"><NuxtImg src="/img/top/skill-car.png" alt="" decoding="async"></NuxtImg></p>
                                            <h4 class="info_list_ttl">普通車免許</h4>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
                                            <p>テキストテキストテキスト</p>
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
                        <SwiperSlide><NuxtImg src="/img/top/top-slider01.jpg" alt=""></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider02.jpg" alt=""></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider03.jpg" alt=""></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider04.jpg" alt=""></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider05.jpg" alt=""></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider06.jpg" alt=""></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider01.jpg" alt=""></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider02.jpg" alt=""></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider03.jpg" alt=""></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider04.jpg" alt=""></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider05.jpg" alt=""></NuxtImg></SwiperSlide>
                        <SwiperSlide><NuxtImg src="/img/top/top-slider06.jpg" alt=""></NuxtImg></SwiperSlide>
                    </Swiper>
                    <div class="top-contact_box">
                        <p>お気軽にお問い合わせください</p>
                        <div><NuxtLink to="/contact" class="btn">お問い合わせはコチラ</NuxtLink></div>
                    </div>
                </section>
            </article>
        </main>
</template>
