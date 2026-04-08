// nuxt.config.ts
const isProd = process.env.NUXT_PUBLIC_ENV === 'prod';

function getTerserOptions() {
	return isProd
		? {
				compress: { drop_console: true, drop_debugger: true },
				format: { comments: false },
			}
		: {};
}

export default defineNuxtConfig({
	modules: ['@nuxtjs/google-fonts', '@pinia/nuxt'],
	ssr: true,
	app: {
		baseURL: process.env.NUXT_PUBLIC_BASE_URL || '/',
		head: {
			htmlAttrs: { lang: 'ja' },
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content:
            'width=device-width,initial-scale=1,minimum-scale=1,shrink-to-fit=no,viewport-fit=cover',
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

	css: ['@/assets/scss/main.scss'],
	runtimeConfig: {
		microCmsApiKey: '',
		basicAuthUser: '',
		basicAuthPassword: '',
		public: {
			domain: '',
			apiBase: '',
			env: '',
		},
	},
	// もしくは、明示的に全てのルートをプリレンダリング対象にします
	routeRules: {
		'/**': { isr: 60 },
	},

	// runtimeConfig: {
	// 	public: {
	// 		domain: process.env.NUXT_PUBLIC_DOMAIN ?? '',
	// 		apiBase: process.env.NUXT_PUBLIC_API_BASE ?? '',
	// 		env: process.env.NUXT_PUBLIC_ENV ?? 'dev',
	// 	},
	// },

	experimental: {
		viewTransition: false,
		payloadExtraction: true,
		defaults: {
			// nuxtLink: { trailingSlash: 'remove' },
			nuxtLink: { trailingSlash: 'append' },
		},
	},
	nitro: {
		prerender: {
			crawlLinks: true, // リンクを辿る設定だけ残すのが Nuxt 3 の推奨
			routes: [],
		},
		// output: {
		// 	publicDir: 'dist',
		// },
	},

	vite: {
		build: {
			sourcemap: !isProd,
			minify: 'terser',
			terserOptions: getTerserOptions(),
			rollupOptions: {
				output: {
					manualChunks: {
						vue: ['vue', 'vue-router'],
						// ui: [
						//   '@/components/ui/UiButton.vue',
						//   '@/components/ui/UiCard.vue',
						// ],
					},
				},
			},
		},
		optimizeDeps: {
			include: [
				'gsap',
				'gsap/ScrollTrigger',
				'lenis',
				'@vue/devtools-core',
				'@vue/devtools-kit',
			],
		},
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
	googleFonts: {
		families: {
			'Noto Sans JP': { wght: '400..700' },
			'Audiowide': true,
		},
		display: 'swap',
		prefetch: false,
		preconnect: false,
		preload: true,
		download: true, // CDNから読み込む
		base64: false,
		useStylesheet: true,
		overwriting: true,
	},
});
