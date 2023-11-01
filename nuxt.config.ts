export default defineNuxtConfig({
  devtools: { enabled: true },
  app:{
    head:{
      htmlAttrs: {
        lang: 'ja', prefix: 'og: https://ogp.me/ns#'
      },
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '<サイト名>' },
        { property: 'og:image', content: '<ogpに使われる画像の絶対パス>', },
      ],
      script: [ 
        { 
          src: 'common.js', 
          body: true,
        },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=M+PLUS+2:wght@800;900&family=Montserrat:wght@700;800&family=Permanent+Marker&display=swap",
          crossorigin: "",
        },
      ],
    },
  },


  // 使用するscssファイルを指定
  css: ["@/public/scss/style.scss"],
  build: {
    postcss: {
      plugins: {
        autoprefixer: {},
        'postcss-sort-media-queries': {},
      },
    },
  },
  modules: [
    '@nuxt/image',
    'nuxt-swiper',
  ],
  swiper: {},
  image: {
    quality: 80,
    provider: 'netlify',
    netlify: {
      baseURl: process.env.IMAGES_URL
    },
  },
  // Viteのビルドの際に、SCSSのパーシャルファイルを読み込むよう指定する
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/public/scss/module/_variables.scss"; @import "@/public/scss/module/_base.scss"; @import "@/public/scss/module/_header.scss"; @import "@/public/scss/module/_base.scss"; @import "@/public/scss/module/_margin.scss"; @import "@/public/scss/module/_footer.scss"; @import "@/public/scss/module/_nav.scss"; '
        },
      },
      devSourcemap: true,
    },
  },
  routeRules: {
    '/contact': { prerender: true },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => /^(swiper|swiper-slide|swiper-container)$/.test(tag),
    },
  },
  
})
