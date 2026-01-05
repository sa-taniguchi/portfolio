#!/usr/bin/env node

/**
 * @file htmlFormatterCLI.js
 * @description コマンドラインからHTMLファイルを整形するスクリプトです。`--path` オプションで指定されたディレクトリやファイルを整形します。
 */

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import { getAllFiles, htmlFormatter, defaultConfig } from "./htmlFormatter.js";

/**
 * コマンドライン引数の設定を定義します。
 * `--path` 引数で整形するファイルまたはディレクトリを指定できます。
 * `--config` 引数でカスタム設定ファイルのパスを指定できます。
 */
const argv = yargs(hideBin(process.argv))
    .option('path', {
        alias: 'p',
        type: 'string',
        description: 'The directory or file to format',// 整形対象のディレクトリまたはファイル
        demandOption: true,
    })
    .option('config', {
        alias: 'c',
        type: 'string',
        description: 'Path to a custom config file',// カスタム設定ファイルのパス
    })
    .help()
    .argv;

// 指定されたパスを解決
const targetPath = path.resolve(argv.path);
let options = { ...defaultConfig };

// カスタム設定が指定されている場合、設定を読み込む
if (argv.config) {
    const configPath = path.resolve(argv.config);
    if (fs.existsSync(configPath)) {
        const customConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        options = { ...options, ...customConfig };
    }
}

// 対象のパスが存在するか確認し、整形処理を実行
if (fs.existsSync(targetPath)) {
    const stats = fs.statSync(targetPath);
    if (stats.isDirectory()) {
        const allFiles = getAllFiles(targetPath);
        allFiles.forEach((filePath) => {
            const ext = path.extname(filePath);
            if (ext === ".html") {
                htmlFormatter(filePath, options);
            }
        });
        console.log(chalk.green.bold("All HTML files in the directory have been formatted.\nディレクトリ内のすべてのHTMLファイルが整形されました。"));
    } else if (stats.isFile() && path.extname(targetPath) === ".html") {
        htmlFormatter(targetPath, options);
        console.log(chalk.green.bold("The HTML file has been formatted.\nHTMLファイルが整形されました。"));
    } else {
        console.log(chalk.red.bold(`Invalid file type. Only HTML files are supported.\n無効なファイル形式です。HTMLファイルのみサポートしています。`));
    }
} else {
    console.log(chalk.red.bold("Target path not found!\n指定されたパスが見つかりません！"));
}
