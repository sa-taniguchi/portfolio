<template>
    <footer>
        <div class="md-container">
            <div class="footer_logo">
                <nuxtLink to="/">
                    <NuxtImg src="/img/common/logo.svg" alt="" />
                    <p>ポートフォリオ</p>
                </nuxtLink>
            </div>
            <p class="footer_cp">&copy;<span>{{ current }}</span>s.taniguchi-portfolio</p>
        </div>
    </footer>
</template>


<script setup lang="ts">
    const date = new Date();
    const current = date.getFullYear();
</script>