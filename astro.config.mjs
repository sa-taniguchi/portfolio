import { defineConfig } from 'astro/config';
import htmlBeautifier from './src/lib/htmlFormatter.js';
import UnoCSS from '@unocss/astro'
import config from './src/config.json';
import { SITE_URL, ASSETS_URL, BASE_URL } from './config.js';
import fs from 'fs/promises';
import { glob } from 'glob';
import path from 'path';

/**
 * @type {import('astro').AstroUserConfig}
 * @example
 * https://docs.astro.build/ja/reference/configuration-reference/
 * https://docs.astro.build/ja/guides/configuring-astro/
 */

export default defineConfig({
  site: SITE_URL, // 最終的にデプロイされるURL
  base: BASE_URL,
  outDir: './dist',
  compressHTML: config.HTML_COMPRESS && process.env.NODE_ENV === 'production', // htmlを圧縮するか否か デフォルトでは開発モードのみ圧縮を解除しています。
  trailingSlash: 'always',// 開発時に末尾のスラッシュを必須にする
  // prefetch: true, // プリフェッチ(リンクホバー時の事前ロード)
  integrations: [
    UnoCSS(),
    config.HTML_FORMATTER && process.env.NODE_ENV === 'production' && htmlBeautifier(), // htmlを整形
    {
      name: 'vite-build-hooks',
      hooks: {
        'astro:build:setup': ({ vite, target }) => {
          if(target === 'client') {
            vite.build.rollupOptions.output.chunkFileNames = `assets/js/[name].[hash].js`;
          }
        }
      }
    },
    { // 不要ファイル削除
      name: 'clean-dist-folder',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          try {
            // ファイルを検索して削除
            const junkFiles = await glob(`${dir.pathname}/**/{.DS_Store,Thumbs.db,Desktop.ini}`);
            console.log(`Found ${junkFiles.length} junk files to delete`);
            
            for (const file of junkFiles) {
              await fs.unlink(file);
              // console.log(`Deleted file: ${file}`); // 削除するファイル名
            }
            
            // __MACOSXディレクトリを検索して削除
            const macosxDirs = await glob(`${dir.pathname}/**/__MACOSX`);
            console.log(`Found ${macosxDirs.length} __MACOSX directories to delete`);
            
            for (const dirPath of macosxDirs) {
              const stats = await fs.stat(dirPath);
              if (stats.isDirectory()) {
                await fs.rm(dirPath, { recursive: true, force: true });
                console.log(`Deleted directory: ${dirPath}`);
              }
            }
            
            console.log('Clean-up completed successfully');
          } catch (error) {
            console.error(`Error cleaning up dist folder: ${error.message}`);
          }
        }
      }
    }
  ],
  devToolbar: { // 開発ツールバー
    enabled: true // 不要なら撤去してください。
  },
  build: {
    assetsPrefix: ASSETS_URL,
    inlineStylesheets: 'never' // スタイルシートをインライン化するかどうか
  },
  server: (e) => ({
    port: e.command === 'dev' ? 3000 : 4321,
    host: true, // ローカルネットワーク上の他のデバイスからもアクセス可能にしています。
    open: true  // サーバー起動時に自動的にブラウザを開くかどうかの設定
  }),
  vite: {
    // https://ja.vitejs.dev/config/build-options.html
    build: {
      minify: config.ASSETS_COMPRESS, // コードを圧縮するかどうか
      // cssCodeSplit: true, // CSS をページ毎に分割するかどうか
      assetsInlineLimit: 0, // 4KB以下の時に自動的にインラインで埋め込まれてしまうのを防ぐ
      rollupOptions: {
        output: {
          entryFileNames: (entryInfo) => {
            return `assets/js/[name].[hash].js`;
          },
          // こちらで指定すると上記の問題があるのでコメントアウト
          // chunkFileNames: (chunkInfo) => {
          //   console.log(chunkInfo)
          //   return `assets/js/[name].[hash].js`;
          // },
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.').pop();
            let fileName = `assets/[ext]/[hash][extname]`;
            if (extType === 'css') {
              fileName = `assets/css/style.[hash][extname]`;
            } else if(/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              fileName = `assets/images/[name][extname]`;
            } else if(/ttf|otf|eot|woff|woff2/i.test(extType)) {
              fileName = `assets/fonts/[name][extname]`;
            }
            return fileName;
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: { // Deprecation [legacy-js-api]が出るので対処
          api: "modern-compiler",
          // additionalData: `@use '@/assets/stylesheets/app.scss' as app;`
        },
      },
    },
    esbuild: process.env.NODE_ENV === 'development' ? {} : { drop: ['console', 'debugger'] } // 開発環境でのみconsole、debuggerを表示する設定
  }
});
