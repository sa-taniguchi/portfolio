
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

                <section id="top-work">
                    <div class="lg-container">

                    </div>
                </section>

                <section id="top-skill">
                    <div class="lg-container">

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
