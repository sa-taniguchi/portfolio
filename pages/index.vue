
<script setup>
import { register } from 'swiper/element/bundle';
register();

</script>

<template>
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
                <section id="about" class="top-about">
                    <div class="lg-container">
                        <div class="about_wrapper">
                            <div class="about_img"><NuxtPicture src="/img/top/about.jpg" alt=""></NuxtPicture></div>
                            <div class="about_info">
                                <h3>About</h3>
                                <p>はじめまして。谷口と申します。</p>
                                <p class="mb1">HP制作を中心にHTMLコーダーとしてキャリアをスタートして3年程になります。</p>
                                <p class="mb1">職業訓練校でWEB制作について半年間学習後、ホームページなどWEB制作携わる会社に就職。主にコーディング業務に従事し、ホームページ制作やLP制作、またデザイン制作の案件に携わってきました。</p>
                                <p>現在では更なるスキルアップを求めて、これまで学んだ知識やスキルを活かして転職活動中です。</p>
                                <p class="is-small">（2023年10月更新）</p>
                            </div>
                        </div>

                    </div>
                </section>
                <section>
                    <swiper-container
                        slides-per-view="5"
                        speed="7000" 
                        loop="true"
                        loopAdditionalSlides="1"
                        css-mode="true"
                        autoplay-delay="0"
                        autoplay-disableOnInteraction="false"
                        style="transition-timing-function: linear;"
                    >
                        <swiper-slide><NuxtImg src="/img/top/top-slider01.jpg" alt=""></NuxtImg></swiper-slide>
                        <swiper-slide><NuxtImg src="/img/top/top-slider02.jpg" alt=""></NuxtImg></swiper-slide>
                        <swiper-slide><NuxtImg src="/img/top/top-slider03.jpg" alt=""></NuxtImg></swiper-slide>
                        <swiper-slide><NuxtImg src="/img/top/top-slider04.jpg" alt=""></NuxtImg></swiper-slide>
                        <swiper-slide><NuxtImg src="/img/top/top-slider05.jpg" alt=""></NuxtImg></swiper-slide>
                        <swiper-slide><NuxtImg src="/img/top/top-slider06.jpg" alt=""></NuxtImg></swiper-slide>
                    </swiper-container>
                </section>
            </article>
        </main>
</template>
