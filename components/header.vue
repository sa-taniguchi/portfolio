<template>
    <header id="header" class="l-header" :class="{'is-top': $route.path === '/'}" ref="headerRef">
        <div class="l-xlContainer l-header__content">
            <h1 class="p-headerLogo">
                <nuxtLink to="/">
                    <NuxtImg src="/img/common/logo.svg" alt="" />
                    <span>ポートフォリオ</span>
                </nuxtLink>
            </h1>
            <button type="button" id="js-header-hmbg" class="p-hmbgBtn" aria-controls="js-header-nav" aria-label="メニューを開く">
                <span class="p-hmbgBtn__bar"></span>
            </button>

            <nav id="js-header-nav" class="l-headerNav" aria-hidden="true">
                <ul class="l-headerNav__list">
                    <li class="p-headerNav__item"><NuxtLink to="/"><span data-text="TOP" class="p-headerNav-item__txt">TOP</span></NuxtLink></li>
                    <li class="p-headerNav__item"><a href="/#top-about"><span data-text="ABOUT" class="p-headerNav-item__txt">ABOUT</span></a></li>
                    <li class="p-headerNav__item"><a href="/#top-work"><span data-text="WORK" class="p-headerNav-item__txt">WORK</span></a></li>
                    <li class="p-headerNav__item"><a href="/#top-skill"><span data-text="SKILL" class="p-headerNav-item__txt">SKILL</span></a></li>
                    <li class="p-headerNav__item"><NuxtLink to="/contact"><span data-text="CONTACT" class="p-headerNav-item__txt">CONTACT</span></NuxtLink></li>
                </ul>
            </nav>
        </div>
    </header>
</template>


<script setup lang="ts">

    import {ref} from "vue"; 
    const headerRef = ref();
    onMounted(()=>{
        // computed(()=>{
        headerRef.value.classList.add('is-load');
        // })
    })
</script>






