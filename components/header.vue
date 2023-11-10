<template>
    <header id="header" :class="{'is-top': $route.path === '/'}">
        <div class="xl-container">
            <h1><nuxtLink to="/"><NuxtImg src="/img/common/logo.svg" alt="ポートフォリオ"></NuxtImg></nuxtLink></h1>
            <button type="button" id="js-header-hmbg" class="hmbg_btn" aria-controls="js-header-nav">
                <span class="hmbg_bar"></span>
            </button>
            <navbar />
        </div>
    </header>
</template>




