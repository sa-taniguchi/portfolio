
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
          body: 'true',
        },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Raleway:wght@800&display=swap",
          crossorigin: "",
        },
      ],
    },
  },


  // 使用するscssファイルを指定
  css: ["@/assets/scss/style.scss"],
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
    'nuxt-microcms-module'
  ],

  microCMS: {
    serviceDomain: process.env.SERVICE_DOMAIN,
    apiKey: process.env.API_KEY,
  },

  // srcDir: 'src/',
  // runtimeConfig: {
  //   apiKey: API_KEY,
  //   serviceDomain: SERVICE_DOMAIN
  // },

  // microcms: {
  //   options: {
  //     serviceDomain: process.env.SERVICE_DOMAIN,
  //     apiKey: process.env.API_KEY,
  //   },
  //   mode: process.env.NODE_ENV === 'production' ? 'server' : 'all',
  // },

  // runtimeConfig: {
  //   apiKEY: process.env.API_KEY,
  //   public: {
  //     baseURL: process.env.BASE_URL,
  //   },
  // },

  // microcms: {
  //   options: {
  //     serviceDomain: process.env.SERVICE_DOMAIN,
  //     apiKey: process.env.GET_API_KEY,
  //   },
  //   mode: process.env.NODE_ENV === 'production' ? 'server' : 'all',
  // },
  


  swiper: {},
  image: {
    quality: 80,
    provider: 'netlify',
    netlify: {
      baseURl: process.env.IMAGES_URL
    },
    imgix: {
      baseURL: ''
    },
  },
  // Viteのビルドの際に、SCSSのパーシャルファイルを読み込むよう指定する
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/module/_variables.scss"; @import "@/assets/scss/module/_base.scss"; @import "@/assets/scss/module/_header.scss"; @import "@/assets/scss/module/_base.scss"; @import "@/assets/scss/module/_margin.scss"; @import "@/assets/scss/module/_footer.scss"; @import "@/assets/scss/module/_nav.scss"; '
        },
      },
      devSourcemap: true,
    },
  },


  vue: {
    compilerOptions: {
      isCustomElement: (tag) => /^(swiper|swiper-slide|swiper-container)$/.test(tag),
    },
  },


})
