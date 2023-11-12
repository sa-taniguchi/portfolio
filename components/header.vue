<template>
    <header id="header" :class="{'is-top': $route.path === '/'}" ref="headerRef">
        <div class="xl-container">
            <h1><nuxtLink to="/"><NuxtImg src="/img/common/logo.svg" alt="ポートフォリオ"></NuxtImg></nuxtLink></h1>
            <button type="button" id="js-header-hmbg" class="hmbg_btn" aria-controls="js-header-nav">
                <span class="hmbg_bar"></span>
            </button>

            <nav id="js-header-nav" class="header_nav" aria-hidden="true">
                <ul class="header_nav_list">
                    <li><NuxtLink to="/"><span data-text="TOP" class="nav_item_txt">TOP</span></NuxtLink></li>
                    <li><NuxtLink to="/#top-about"><span data-text="ABOUT" class="nav_item_txt">ABOUT</span></NuxtLink></li>
                    <li><NuxtLink to="/#top-work"><span data-text="WORK" class="nav_item_txt">WORK</span></NuxtLink></li>
                    <li><NuxtLink to="/#top-skill"><span data-text="SKILL" class="nav_item_txt">SKILL</span></NuxtLink></li>
                    <li><NuxtLink to="/contact"><span data-text="CONTACT" class="nav_item_txt">CONTACT</span></NuxtLink></li>
                </ul>
            </nav>
        </div>
    </header>
</template>


<script setup lang="ts">

    import {ref} from "vue"; 
    const headerRef = ref();
    onMounted(()=>{
        headerRef.value.classList.add('is-load');
    })
</script>






