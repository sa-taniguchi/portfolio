/**
 * @file htmlFormatter.js
 * @description HTMLファイルを整形するための関数と、Astroビルド後にHTMLファイルを自動で整形するプラグインを提供するモジュールです。
 *              Astroビルドプロセスでの使用を想定しています。
 */

import path from "path";
import fs from "fs";
import chalk from "chalk";
import beautify from "js-beautify";

/**
 * デフォルトの整形設定オプション
 * @constant
 * @type {Object}
 * @property {number} indent_size - インデントのサイズ（スペース数）
 * @property {string} indent_char - インデントに使用する文字（"\t" または " "）
 * @property {boolean} preserve_newlines - 改行を維持するかどうか
 * 他のプロパティはjs-beautifyの設定に準拠します。
 */
export const defaultConfig = {
    indent_size: 2,
    indent_char: "\t",
    max_preserve_newlines: -1,
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: "keep",
    brace_style: "collapse",
    space_before_conditional: false,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: 0,
    indent_inner_html: false,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false,
    unformatted: ['b', 'em']
};

/**
 * 指定されたディレクトリ内の全てのファイルパスを再帰的に取得します。
 * @function
 * @param {string} dirPath - 検索するディレクトリのパス
 * @param {string[]} [arrayOfFiles=[]] - 既に取得されたファイルパスの配列（再帰呼び出し時に使用）
 * @returns {string[]} 取得されたファイルパスの配列
 */
export const getAllFiles = function (dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
};

/**
 * 指定されたHTMLファイルを整形し、上書き保存します。
 * @function
 * @param {string} filePath - 整形するHTMLファイルのパス
 * @param {Object} options - 整形に使用するオプション（`defaultConfig`を継承）
 */
export const htmlFormatter = (filePath, options) => {
    try {
        let data = fs.readFileSync(filePath, { encoding: "utf8" });

        // コメントを改行するための正規表現
        data = data.replace(/<!--/g, (match) => {
            return match.replace(/<!--/g, '\n<!--');
        });

        const result = beautify.html(data, options);
        fs.writeFileSync(filePath, result);
    } catch (err) {
        if (err.code === "ENOENT") {
            console.log(chalk.red.bold(filePath));
            console.log(chalk.grey.dim("File not found!"));
        } else {
            throw err;
        }
    }
};

/**
 * Astroビルド後に自動でHTMLファイルを整形するプラグインを提供します。
 * @function
 * @param {Object} [options={}] - 整形に使用するオプション（`defaultConfig`をデフォルトとして使用）
 * @returns {Object} Astroプラグインオブジェクト
 */
export default function htmlBeautifier(
    options = { ...defaultConfig }
) {
    return {
        name: "htmlFormatter",
        hooks: {
            "astro:build:done": async ({ dir }) => {
                const allFiles = getAllFiles(dir.pathname);
                allFiles.forEach((filePath) => {
                    const ext = path.extname(filePath);
                    if (ext === ".html") {
                        htmlFormatter(filePath, options);
                    }
                });
                console.log("");
            },
        },
    };
}
