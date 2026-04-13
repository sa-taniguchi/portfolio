// nuxt.config.ts

// 本番環境（nuxi build実行時）かどうかの判定
const isProd = process.env.NODE_ENV === 'production';

/**
 * Terserのオプション設定
 * 本番環境ではconsole/debugger/コメントを削除
 */
const terserOptions = {
  compress: isProd
    ? {
        drop_console: true,
        drop_debugger: true,
      }
    : {},
  format: {
    comments: false, // コメントを削除
  },
};

export default defineNuxtConfig({
  // --- モジュール設定 ---
  modules: ['@nuxtjs/google-fonts', '@pinia/nuxt'],
  ssr: true,

  // --- アプリケーションヘッダー設定 ---
  app: {
    baseURL: process.env.NUXT_PUBLIC_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'ja' },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,minimum-scale=1,shrink-to-fit=no,viewport-fit=cover',
        },
        { name: 'format-detection', content: 'telephone=no,address=no,email=no' },
        { name: 'robots', content: 'index,follow' },
      ],
      link: [
        { rel: 'apple-touch-icon-precomposed', href: '/apple-touch-icon.png' },
        { rel: 'shortcut icon', href: '/favicon.svg', type: 'image/x-icon' },
        { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
      ],
    },
  },

  // --- グローバルCSS ---
  css: ['@/assets/scss/main.scss'],

  // --- 環境変数・実行時設定 ---
  runtimeConfig: {
    microCmsApiKey: '',
    basicAuthUser: '',
    basicAuthPassword: '',
    public: {
      domain: process.env.NUXT_PUBLIC_DOMAIN || '',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
      env: process.env.NUXT_PUBLIC_ENV || 'dev',
    },
  },

  // --- ルーティング・レンダリングルール ---
  routeRules: {
    '/**': isProd ? { isr: 60 } : {}, // 本番のみISRを有効化
  },

  // --- 実験的機能 ---
  experimental: {
    viewTransition: false,
    payloadExtraction: true,
    defaults: {
      nuxtLink: { trailingSlash: 'append' },
    },
  },

  // --- Nitro (サーバーサイド) 設定 ---
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [],
    },
  },

  // --- Vite ビルド設定 ---
  vite: {
    build: {
      // 本番環境のみソースマップを無効化
      sourcemap: !isProd,
      // 本番環境のみTerserで圧縮
      minify: isProd ? 'terser' : false,
      terserOptions: terserOptions,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router'],
          },
        },
      },
    },
    // GSAPやLenisなどの依存関係の最適化
    optimizeDeps: {
      include: [
        'gsap',
        'gsap/ScrollTrigger',
        'lenis',
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
    // SCSSの共通変数などの読み込み
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:math";
            @use "@/assets/scss/_variables.scss" as *;
            @use "@/assets/scss/_mq.scss" as *;
            @use "@/assets/scss/_utility.scss" as *;
            @use "@/assets/scss/_layout.scss" as *;
            @use "@/assets/scss/_animation.scss" as *;
          `,
        },
      },
    },
  },

  // --- Google Fonts 設定 ---
  googleFonts: {
    families: {
      'Noto Sans JP': { wght: '400..700' },
      'Audiowide': true,
    },
    display: 'swap',
    prefetch: false,
    preconnect: false,
    preload: true,
    download: false,
    base64: false,
    useStylesheet: true,
    overwriting: true,
  },
});