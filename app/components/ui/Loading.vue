<script setup lang="ts">
// import { ref } from 'vue';

// const target = ref<HTMLElement | null>(null);
</script>

<template>
	<div class="c-openingAnime" />
</template>

<style lang="scss" scoped>
  .c-openingAnime{
    position: fixed;
    inset: 0;
    z-index: 150;
    height: 100dvh;
    @include mq("pc"){
      height: 100vh;
    }
    &::before{
      content: "";
      display: block;
      position: absolute;
      inset: 0;
      background: #8ac0ff;
      height: 100dvh;
      animation: loadingShow .5s cubic-bezier(1, 0, 0, 1) both;
      @include mq("pc"){
        height: 100vh;
      }
    }
    body.is-load &{
      &::before{
        animation: loadingHide .3s cubic-bezier(1, 0, 0, 1) forwards;
      }
    }
  }

  @keyframes loadingShow {
    0% {
      translate: 0% 100%;
      opacity: 1;
    }
    100% {
      translate: 0% 0%;
      opacity: 1;
    }
  }

  @keyframes loadingHide {
    0% {
      translate: 0 0;
      opacity: 1;
    }
    100% {
      translate: 0 -100%;
      opacity: 1;
    }
  }
</style>
