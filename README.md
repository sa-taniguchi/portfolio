# Astro スターターキット: 基本

```sh
npm create astro@latest -- --template basics
```

[![StackBlitzで開く](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![CodeSandboxで開く](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![GitHub Codespacesで開く](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **経験豊富な宇宙飛行士へ** このファイルを削除して楽しんでください！

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 プロジェクト構成

あなたのAstroプロジェクト内には、次のフォルダとファイルが表示されます:

```text
/
├── README.md
├── astro.config.mjs
├── config.js
├── package.json
├── public
│   ├── assets
│   │   ├── common
│   │   │   ├── images
│   │   │   │   ├── Astro.svg
│   │   │   │   ├── favicon.ico
│   │   │   │   ├── favicon.png
│   │   │   │   ├── favicon.svg
│   │   │   │   ├── image.png
│   │   │   │   ├── ogp_image.png
│   │   │   │   └── tile_image.png
│   │   │   └── scripts
│   │   │       └── lib
│   │   │           ├── html5shiv.min.js
│   │   │           ├── jquery-1.12.4.min.js
│   │   │           ├── jquery-3.7.1.min.js
│   │   │           ├── polyfill.js
│   │   │           └── selectivizr.min.js
│   │   └── images
│   │       ├── hoge
│   │       │   ├── fuga
│   │       │   │   └── image.png
│   │       │   └── image.png
│   │       ├── image.png
│   │       └── index
│   │           └── image.png
│   └── sw.js
├── src
│   ├── _modules
│   │   ├── api
│   │   │   └── data.json
│   │   ├── data
│   │   │   ├── example.json
│   │   │   ├── exampleFour.json
│   │   │   ├── exampleThree.yml
│   │   │   └── exampleTwo
│   │   │       └── exampleTwo.json
│   │   └── import
│   │       └── data.jsonc
│   ├── assets
│   │   ├── common
│   │   │   ├── scripts
│   │   │   │   └── javascript
│   │   │   │       ├── common.js
│   │   │   │       ├── index.js
│   │   │   │       └── modules
│   │   │   │           └── Selector.js
│   │   │   └── stylesheets
│   │   │       ├── _config.scss
│   │   │       ├── _global.scss
│   │   │       ├── _reset.scss
│   │   │       ├── functions
│   │   │       │   └── _viewport.scss
│   │   │       ├── mixins
│   │   │       │   ├── _clearfix.scss
│   │   │       │   ├── _css3fix.scss
│   │   │       │   ├── _elementSize.scss
│   │   │       │   ├── _fontDecoration.scss
│   │   │       │   ├── _fontSize.scss
│   │   │       │   ├── _fontWeight.scss
│   │   │       │   ├── _hideaway.scss
│   │   │       │   ├── _inlineBlock.scss
│   │   │       │   ├── _inlinefix.scss
│   │   │       │   ├── _mediaqueries.scss
│   │   │       │   └── _opacity.scss
│   │   │       ├── utils
│   │   │       │   ├── _align.scss
│   │   │       │   ├── _display.scss
│   │   │       │   ├── _float.scss
│   │   │       │   ├── _font.scss
│   │   │       │   ├── _margin.scss
│   │   │       │   ├── _padding.scss
│   │   │       │   ├── _tooltips.scss
│   │   │       │   ├── _visibility.scss
│   │   │       │   └── _width.scss
│   │   │       └── vars
│   │   │           ├── _color.scss
│   │   │           ├── _easing.scss
│   │   │           └── _variable.scss
│   │   ├── javascripts
│   │   │   └── hoge.js
│   │   ├── scss
│   │   │   ├── base
│   │   │   │   ├── _breakpoint.scss
│   │   │   │   ├── _button.scss
│   │   │   │   ├── _color.scss
│   │   │   │   ├── _container.scss
│   │   │   │   ├── _font.scss
│   │   │   │   ├── _list.scss
│   │   │   │   ├── _outline.scss
│   │   │   │   ├── _reset.scss
│   │   │   │   ├── _root.scss
│   │   │   │   └── _space-content.scss
│   │   │   └── globals.scss
│   │   ├── stylesheets
│   │   │   ├── app.scss
│   │   │   └── layouts
│   │   │       ├── _content.scss
│   │   │       └── _default.scss
│   │   └── svg
│   │       └── icons
│   ├── components
│   │   ├── ExampleComponent.astro
│   │   ├── Footer.astro
│   │   ├── HeadContent.astro
│   │   ├── Header.astro
│   │   └── ImagesComponent.astro
│   ├── config.json
│   ├── env.d.ts
│   ├── layouts
│   │   └── Layout.astro
│   ├── lib
│   │   ├── defaultProps.ts
│   │   ├── htmlFormatter.js
│   │   ├── htmlFormatterCLI.js
│   │   └── render.ts
│   └── pages
│       ├── hoge
│       │   ├── fuga
│       │   │   └── index.astro
│       │   └── index.astro
│       ├── index.astro
│       └── piyo
│           └── index.astro
├── tsconfig.json
└── uno.config.ts
```

Astroは、`src/pages/`ディレクトリ内の`.astro`または`.md`ファイルを探します。   
各ページはファイル名に基づいてルートとして公開されます。

`src/components/`には特別なものはありませんが、   
私たちはここにAstro/React/Vue/Svelte/Preactコンポーネントを配置するのが好きです。

画像などの静的アセットは`public/`ディレクトリに配置できます。

## 🧞 コマンド

すべてのコマンドは、プロジェクトのルートからターミナルで実行します:

| コマンド                   | アクション                                      |
| :------------------------ | :-------------------------------------------  |
| `npm install`             | 依存関係をインストール                            |
| `npm run dev`             | ローカル開発サーバーを`localhost:3000`で起動       |
| `npm run build`           | 本番サイトを`./dist/`にビルド                     |
| `npm run preview`         | デプロイ前にローカルでビルドをプレビュー             |
| `npm run stg`             | ステージング環境用にビルド                         |
| `npm run prod`            | プロダクション環境用にビルド                       |
| `npm run format-html`     | TMLファイルを整形                                |
| `npm run astro ...`       | `astro add`、`astro check`などのCLIコマンドを実行 |
| `npm run astro -- --help` | Astro CLIの使用方法を取得                        |

## 👀 詳細を知りたいですか？

[ドキュメント](https://docs.astro.build/ja/getting-started/)をご覧いただくか、[Discordサーバー](https://astro.build/chat)に参加してください。


# astro.config.mjs の中身を解説

## Integrationオブジェクト

  Astro の chunkFileNames で変更すると server で使われるスクリプトも書き換えられてしまうので、   
  ターゲットが`client`のビルド時のみ指定したディレクトリに書き換える用のフックしています。

  >```javascript
  >{
  >  name: 'vite-build-hooks',
  >  hooks: {
  >    'astro:build:setup': ({ vite, target }) => {
  >      if(target === 'client') {
  >        vite.build.rollupOptions.output.chunkFileNames = `assets/js/[name].[hash].js`;
  >      }
  >    }
  >  }
  >}
  >```
  - これはAstroのビルドプロセスにフックを追加するためのオブジェクトです。   
  ここでは、`astro:build:setup`というビルドのセットアップ段階でフックをかけています。
  - フック名
    - `astro:build:setup`：これはAstroのビルドセットアップ段階で呼び出されるフックだ。この段階でViteの設定をカスタマイズしています。
    - `{ vite, target }`：このオブジェクトには、Viteの設定とビルドターゲット（`client`か`server`）が含まれています。
  - クライアントサイドビルド時の設定変更
    - `if(target === 'client')`：ビルドターゲットが`client`（クライアントサイド）の場合にのみ設定を適用するようにしています。
    - `vite.build.rollupOptions.output.chunkFileNames`：Rollupの出力オプションの`chunkFileNames`を変更しています。   
    これにより、クライアントサイドのビルドで生成されるチャンクファイルの名前が`assets/js/[name].[hash].js`という形式になります。


### UnoCSS
UnoCSSは、必要なスタイルだけを生成する次世代のユーティリティファーストなCSSフレームワークです。   
このプロジェクトでは、ビルド時に不要なCSSが含まれないようにするためにUnoCSSを採用しています。   
UnoCSSの公式ドキュメントは[こちら](https://unocss.dev/)を参照してください。

```javascript
integrations: [
  UnoCSS(),
]
```

**主要な機能と利点**:
- **ゼロ未使用CSS**: 使用されていないスタイルが生成されないため、最小限のCSSファイルを提供します。
- **即座に反映**: クラス名を変更するだけで、スタイルがすぐに反映されます。
- **柔軟な設定**: `uno.config.ts`ファイルで独自のテーマやショートカット、ルールを定義して、開発効率を向上させています。

#### `uno.config.ts`の設定内容

- **ショートカット**: 複数のユーティリティクラスをまとめたショートカットを定義することで、コードの簡略化を実現しています。
  - 例: `"test-btn": "py-2 px-4 font-semibold rounded-lg shadow-md"` → クラス`test-btn`を使用すると、複数のスタイルが適用されます。
- **テーマ**: カスタムカラーを設定しており、`"very-cool": "#0000FF"`や`brand.primary`など、特定のブランドカラーやカラーバリアントが簡単に利用できるようになっています。
- **ルール**: カスタムCSSルールを定義し、特定のクラス名に対して動的にスタイルを適用します。
  - 例: `[/^m-([.\d]+)$/, ([, num]) => ({ margin: `${num}px` })]` → `m-7.5`といったクラスを使用することで、7.5pxのマージンを適用します。

### htmlBeautifier
プロダクション環境においてHTMLを整形するために、`js-beautify`を使用しています。   
デフォルトでは本番ビルド時に作動するようになってますが、`./src/config.json` ファイルの`HTML_FORMATTER`を`false`にすることで停止できます。   
`config.HTML_FORMATTER`が`true`であり、かつ環境変数`NODE_ENV`が`production`のときにのみ動作します。   
`HTML_COMPRESS`でAstroの圧縮がかかってしまうので、format自体させたくない場合はどちらも`false`にしてください。   
また、生成されるhtmlファイルに都度整形が走ってしまうと不都合が起きる場合があると思うのでCLIでも叩けるようにしました。   
`npm run format-html`等で実行してください。

```javascript
integrations: [
  config.HTML_FORMATTER && process.env.NODE_ENV === 'production' && htmlBeautifier(),
]
```

### `vite.build.rollupOptions.output.chunkFileNames`の設定について

  デフォルトではクライアントサイドビルド時にのみ特定の設定を適用しているため、   
  サーバーサイドのスクリプトに影響を与えないようなっています。

  > ### `Integrationオブジェクト`
  > ```javascript
  > integrations: [
  >   {
  >     name: 'vite-build-hooks',
  >     hooks: {
  >       'astro:build:setup': ({ vite, target }) => {
  >         if(target === 'client') {
  >           vite.build.rollupOptions.output.chunkFileNames = `assets/js/[name].[hash].js`;
  >         }
  >       }
  >     }
  >   }
  > ],
  > ```
  > ### `vite`オプションでの設定
  > ```javascript
  > vite: {
  >   build: {
  >     rollupOptions: {
  >       output: {
  >         chunkFileNames: (chunkInfo) => {
  >           console.log(chunkInfo);
  >           return `assets/js/[name].[hash].js`;
  >         }
  >       }
  >     }
  >   }
  > }
  > ```

  #### 使い分け

  1. **`Integrationオブジェクト`での設定**：   
  - **対象限定**：クライアントサイドのビルド時にのみ設定が適用されるようにしています。   
  - **フックの利用**：Astroのビルドプロセスの特定の段階（`astro:build:setup`）でのみ適用されます。

  2. **`Vite`⚡オプションでの設定**：   
  - **全体適用**：ビルド全体に対して設定が適用されます。   
  - **グローバル設定**：特定のフックを利用せず、Viteのビルド設定全体に対して適用されます。   
  特にビルドターゲットごとに異なる設定を行う必要がなく、全体に同じ設定を適用しても問題ない場合に有効にしてください。

## Vite⚡の設定
  [Vite⚡の公式ドキュメントのビルドオプション](https://ja.vitejs.dev/config/build-options.html)

  > ```javascript
  >   vite: {
  >     build: {
  >       // minify: false, // コードを圧縮するかどうか
  >       // cssCodeSplit: true, // CSS をページ毎に分割するかどうか
  >       assetsInlineLimit: 0, // 4KB以下の時に自動的にインラインで埋め込まれてしまうのを防ぐ
  >       rollupOptions: {
  >         output: {
  >           entryFileNames: (entryInfo) => {
  >             return `assets/js/[name].[hash].js`;
  >           },
  >           // こちらで指定すると上記の問題があるのでコメントアウト
  >           // chunkFileNames: (chunkInfo) => {
  >           //   console.log(chunkInfo)
  >           //   return `assets/js/[name].[hash].js`;
  >           // },
  >           assetFileNames: (assetInfo) => {
  >             let extType = assetInfo.name.split('.').pop();
  >             let fileName = `assets/[ext]/[hash][extname]`;
  >             if (extType === 'css') {
  >               fileName = `assets/css/style.[hash][extname]`;
  >             } else if(/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
  >               fileName = `assets/images/[name][extname]`;
  >             } else if(/ttf|otf|eot|woff|woff2/i.test(extType)) {
  >               fileName = `assets/fonts/[name][extname]`;
  >             }
  >             return fileName;
  >           }
  >         }
  >       }
  >     }
  >   }
  > ```

1. **コードの圧縮（minify）**：
  > ```javascript
  > minify: config.ASSETS_COMPRESS,
  > ```
  `minify: false`を設定すると、ビルドされたコードが圧縮されなくなります。   
  `src/config.json`の`ASSETS_COMPRESS`で制御してください。

2. **consoleログの削除**：
  > ```javascript
  > esbuild: process.env.NODE_ENV === 'development' ? {} : { drop: ['console', 'debugger'] }
  > ```
  - プロダクション環境では`console`や`debugger`を削除し、開発環境でのみ表示します。   
  これは`esbuild`の設定で制御されます。

3. **ポート番号の設定**：
  > ```javascript
  > server: (e) => ({
  >   port: e.command === 'dev' ? 3000 : 4321,
  >   host: true,
  >   open: true
  > })
  > ```
  - 開発時と本番時で異なるポート番号を設定しています。   
  開発環境では`3000`、本番環境では`4321`が使用されます。

4. **アセットのインライン制限（assetsInlineLimit）**：
  > ```javascript
  > assetsInlineLimit: 0,
  > ```
  これは4KB以下のアセットが自動的にインラインで埋め込まれるのを防いでいます。   
  すべてのアセットがファイルとして出力するために値を`0`に設定しています。

5. **Rollupのオプション（rollupOptions）**：
  > ```javascript
  > rollupOptions: {
  >   output: {
  >     entryFileNames: (entryInfo) => {
  >       return `assets/js/[name].[hash].js`;
  >     },
  >     assetFileNames: (assetInfo) => {
  >       let extType = assetInfo.name.split('.').pop();
  >       let fileName = `assets/[ext]/[hash][extname]`;
  >       if (extType === 'css') {
  >         fileName = `assets/css/style.[hash][extname]`;
  >       } else if(/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
  >         fileName = `assets/images/[name][extname]`;
  >       } else if(/ttf|otf|eot|woff|woff2/i.test(extType)) {
  >         fileName = `assets/fonts/[name][extname]`;
  >       }
  >       return fileName;
  >     }
  >   }
  > }
  > ```
  - **entryFileNames**: エントリーポイントのJavaScriptファイルの名前を設定しています。   
  `assets/js/[name].[hash].js`という形式で出力されます。
  - **assetFileNames**: 各種アセットファイル（CSS、画像、フォントなど）の名前と配置場所をカスタマイズしています。   
  ファイルの種類に応じて各フォルダに配置されます。
  
  プロジェクトのビルド時に生成されるファイルが一元管理し、整理されたディレクトリ構造が得られます。   
  ハッシュを付加することでキャッシュの問題も解決しています。

## 🌐 サブディレクトリデプロイのためのBASE_URL機能

Astroプロジェクトをドメインのルート（例：`http://example.com/`）ではなく、サブディレクトリ（例：`http://example.com/my-app/`）にデプロイする場合、設定が必要です。このスターターキットはBASE_URL機能を提供し、この設定を簡単に行えるようにしています。

### 使い方

1. **`src/config.json`でBASE_URLを設定する**

  > ```json
  > "BASE_URL": {
  >   "STATUS": true, // この機能を有効にするにはtrueに設定
  >   "DEV": "/my-app/", // 開発環境のサブパス
  >   "STG": "/my-app/", // ステージング環境のサブパス
  >   "PROD": "/my-app/"  // 本番環境のサブパス
  > }
  > ```

2. **機能が適用される場所**

BASE_URL設定は以下の要素に影響します：

- Astroの`base`設定（`astro.config.mjs`）
- 相対パスの生成（`render.ts`）
- アセットの参照パス

### 技術的な詳細

#### astro.config.mjs
  > ```javascript
  > import { SITE_URL, ASSETS_URL, BASE_URL } from './config.js';
  > 
  > export default defineConfig({
  >   site: SITE_URL,
  >   base: BASE_URL, // サブディレクトリのパスを設定
  >   // ...
  > });
  > ```

#### config.js
  > ```javascript
  > export const BASE_URL = config.BASE_URL.STATUS ? getUrl('BASE_URL') : "";
  > ```

#### render.ts
  > ```javascript
  > // BASE_URLを考慮してFILE_PATHを適切に抽出
  > const fullPath = new URL(Astro.url.toString(), Astro.url.origin).pathname;
  > 
  > // BASE_URLが設定されている場合、それを除外したパスを取得
  > let FILE_PATH = '';
  > if (BASE_URL && fullPath.startsWith(BASE_URL)) {
  >   FILE_PATH = fullPath.substring(BASE_URL.length);
  >   if (FILE_PATH.startsWith('/')) {
  >     FILE_PATH = FILE_PATH.substring(1);
  >   }
  > } else {
  >   FILE_PATH = fullPath.replace(/^\//, '');
  > }
  > 
  > // 相対パスの計算も適切に調整
  > const RELATIVE_PATH = FILE_PATH ? '../'.repeat(FILE_PATH.split('/').length - 1) : '';
  > ```

### 使用例

例えば、以下のように設定した場合：
  > ```json
  > "BASE_URL": {
  >   "STATUS": true,
  >   "DEV": "/my-project/",
  >   "PROD": "/app/"
  > }
  > ```

- 開発環境では `http://localhost:3000/my-project/` でアクセス
- 本番環境では `http://example.com/app/` にデプロイ

静的アセットやリンクのパスは自動的に調整され、どちらの環境でも正しく機能します。

### 注意点

- `BASE_URL`の値は必ず先頭にスラッシュ（`/`）を含め、末尾にもスラッシュ（`/`）を含めてください
- この機能を使用しない場合は、`STATUS`を`false`に設定してください


## 💁 How to use

共通の規定値は ```/src/config.json``` に定義してください。  
規定値の参照方法などは以下をご覧ください。


#### ```/src/pages/*.astro```の場合

| 記述 | 説明 |
|----|---|
| { render.RELATIVE_PATH } | ディレクトリ相対パス |
| { config.CURRENT_DIR } | カレントディレクトリ |
| { config.ASSETS_DIR.COMMON } | アセットディレクトリ（ Common ） |
| { config.ASSETS_DIR.PC } | アセットディレクトリ（ PC ） |
| { config.ASSETS_DIR.SP } | アセットディレクトリ（ SP ） |
| { render.FILE_PATH } | ファイルパス |
| { Astro.site } | サイトURL |
| { config.WEB_SITE_NAME } | サイト名 |

> ```/src/pages/*.astro``` 内の先頭に各ページの個別設定が出来ます。  
※ astro の仕様に乗っ取り ```{}``` 等で変数として参照が可能です。  
上記以外にも、各ページに設定された内容はどこでも呼び出せます。  
以下は一部例なので詳細はファイルを閲覧ください。  
※項目はユーザーの任意で追加することも可能です。

| 記述 | 説明 |
|----|---|
| { META_TITLE } | ページ名 |
| { META_KEYWORDS } | ページキーワード |
| { META_DESCRIPTION } | ページデスクリプション |
| { META_AUTHOR } | ページ製作者 |
| { META_APPLE_ICON } | iPhone用アイコン |
| { META_ICON } | モダン用アイコン |
| { META_XHTML_ICON } | 旧IE用アイコン |
| { META_FACEBOOK } | facebookのmetaタグ |
| { META_TWITTER } | twitterのmetaタグ |
| { META_WINDOWS } | windowsのmetaタグ |

>
> 出力先に関しては `stg` または `prod` のコマンドを使用した際に ```/src/templates/pages/``` に任意で配置された  
ディレクトリ構成のまま ```/dist/``` へ書き出されるようにしているので  
ユーザーが任意で構成を考え、設置してください。

#### Javascriptの場合

| 記述 | 説明 |
|----|---|
| SITE_URL | サイトURL |
| ASSETS_URL | assets用URL(デフォルトはSITE_URLと同じ) |
| WEB_SITE_NAME | サイト名 |
| WEB_AUTHOR | サイト制作者 |
| WEB_MODIFIER | サイト編集者 |

> ```/config.js``` に config.json から渡しているので  
```/config.js``` をimportしたら ```SITE_URL``` 等で参照できます。

### 環境変数について
環境変数を参照できるようにしています。
[デフォルトの設定についてはこちら](https://docs.astro.build/ja/guides/environment-variables/#%E3%83%87%E3%83%95%E3%82%A9%E3%83%AB%E3%83%88%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0) を参照してください。

各コマンドを叩いてビルドする際にmode変数をそれぞれのステータスになるように渡しています。   
なので、下記のような形でそれぞれのステータスの変数を取得することが可能です。
```
const isDev = import.meta.env.DEV;
const isStg = import.meta.env.STG;
const isProd = import.meta.env.PROD;
```
`.env.development`、`.env.staging`、`.env.production` のようなファイルを作成して使用してください。   
[.envファイルで環境変数を設定する](https://docs.astro.build/ja/guides/environment-variables/#%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B)

### Importエイリアスについて
インポートのためのショートカットを作成しています。   
[Importエイリアス](https://docs.astro.build/ja/guides/imports/#import%E3%82%A8%E3%82%A4%E3%83%AA%E3%82%A2%E3%82%B9)

| エイリアス | パス |
| ---- | ---- |
| @configJs | ./config.js |
| @configJson | ./src/config.json |
| @data/* | ./src/_modules/data/* |
| @assets/* | ./src/assets/* |
| @styles/* | ./src/assets/scss/* |
| @stylesheets/* |./src/assets/stylesheets/* |
| @javascripts/* |./src/assets/javascripts/* |
| @commonJs | ./src/assets/common/scripts/javascript/common.js |
| @svg/* | ./src/assets/svg/* |
| @layouts/* | ./src/layouts/* |
| @components/* | ./src/components/* |
| @lib/* | ./src/lib/* |
| @pages/* | ./src/pages/* |


## 🤔 What you can do with templates ?

本テンプレートでブラックボックス化している機能の詳細を   
以下に随時記述していきますのでご参考ください。

#### SCSS でフォントサイズや余白のレスポンシブ対応

mixin の内容は ```/src/common/stylesheets/mixins/``` を見れば分かりますが   
SP サイトなどを作成する際は、以下のように include する事で   
デザインの ```px``` や ```weight``` を上手いことレスポンシブ対応してくれます。

```scss
$size: 26;
@include config.fontSize_vw($size);
@include config.fontWeight('Medium');
@include config.lineHeight(44, $size);
@include config.letterSpacing(80);
```

また、 ```margin``` や ```padding``` も同様で以下のように指定が可能です。   
上記と同じくデザインの ```px``` の数値を入力するだけで大丈夫です。

```scss
// 一括の場合
@include config.margin_vw(10, 20, 30, 40);
// それぞれの場合
@include config.margin_top_vw(10);
@include config.margin_right_vw(20);
@include config.margin_bottom_vw(30);
@include config.margin_left_vw(40);

// 一括の場合
@include config.padding_vw(10, 20, 30, 40);
// それぞれの場合
@include config.padding_top_vw(10);
@include config.padding_right_vw(20);
@include config.padding_bottom_vw(30);
@include config.padding_left_vw(40);
```