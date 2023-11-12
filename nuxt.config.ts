

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
        { property: 'robots', content:  'noindex' }
      ],
      // script: [ 
      //   { 
      //     src: 'common.js', 
      //     body: 'true',
      //   },
      // ],
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
