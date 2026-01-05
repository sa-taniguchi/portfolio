// uno.config.ts
// 公式 → https://unocss.dev/
// 参考 → https://zenn.dev/comm_vue_nuxt/articles/what_is_unocss_config#%E2%9C%A8-unocss-%E3%81%AE%E7%89%B9%E5%BE%B4(configuration)
import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    // 複数のユーティリティのショートカット
    "test-btn": "py-2 px-4 font-semibold rounded-lg shadow-md",
    "test-btn-green": "text-white bg-green-500 hover:bg-green-700",
    // ひとつのユーティリティに対するエイリアスショートカット
    "test-red": "text-red-100",
  },
  theme: {
    colors: {
      "very-cool": "#0000FF",
      brand: {
        primary: "hsl(var(--hue, 217) 78% 51%)",
      },
    },
  },
  rules: [
    [/^m-([.\d]+)$/, ([, num]) => ({ margin: `${num}px` })],  //class="m-7.5" →→→ .m-7.5 { margin: 7.5px; }
    [/^p-([.\d]+)$/, ([, num]) => ({ padding: `${num}px` })], //class="p-7.5" →→→ .p-7.5 { padding: 7.5px; }
    [/^text-(.*)$/, ([, c], { theme }) => {if (theme.colors[c]) return { color: theme.colors[c] }}],
  ],
})