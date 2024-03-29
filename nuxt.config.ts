import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  app:{
    head:{
      htmlAttrs: {
        lang: 'ja', prefix: 'og: https://ogp.me/ns#'
      }, 
      titleTemplate: '%s 谷口聡ポートフォリオサイト',
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { name: 'description', content: '谷口聡のポートフォリオ'},

        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '谷口聡のポートフォリオ' },
        { property: 'og:image', content: '/public/img/common/logo.svg' },
        { property: 'robots', content:  'noindex' }
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
        {
          rel: "icon" ,
          type: "image/svg+xml",
          href: "/img/common/logo.svg",
        },
        {
          rel: "apple-touch-icon",
          type: "image/png",
          href: "/apple-touch-icon-180x180.png",
        },
        {
          rel: "icon" ,
          type: "image/png",
          href: "/icon-192x192.png",
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
    '@hypernym/nuxt-gsap',
  ],

  gsap: {
    extraPlugins: {
      scrollTrigger: true,
    },
  },

  

  runtimeConfig: {
    public: {
      baseUrl: process.env.apiURL,
      apiKey: process.env.apiKEY,
    }
  },

  // microCMS: {
  //   serviceDomain: process.env.apiURL,
  //   apiKey: process.env.apiKEY,
  // },


  swiper: {},
  image: {
    quality: 70,
    // provider: 'netlify',
    // netlify: {
    //   baseURl: process.env.IMAGES_URL
    // },
    presets: {
      common: {
        'legacy-format': 'jpeg',
      }
    },
    imgix: {
      baseURL: ''
    },
  },
  vite: {
    css: {
      devSourcemap: true,
    },
  },


  vue: {
    compilerOptions: {
      isCustomElement: (tag) => /^(swiper|swiper-slide|swiper-container)$/.test(tag),
    },
  },


  


  
})
