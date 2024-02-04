<template>
    <footer class="l-footer">
        <div class="l-mdContainer">
            <div class="p-footerLogo">
                <nuxtLink to="/">
                    <NuxtImg src="/img/common/logo.svg" alt="" />
                    <p>ポートフォリオ</p>
                </nuxtLink>
            </div>
            <p class="p-footerCp">&copy;<span>{{ current }}</span>s.taniguchi-portfolio</p>
        </div>
    </footer>
</template>


<script setup lang="ts">
    const date = new Date();
    const current = date.getFullYear();
</script>