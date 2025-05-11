/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import path from "node:path";
import fs from "node:fs";
import url from "node:url";

import webpack from "webpack";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readJSON(filename) {
  const content = await fs.promises.readFile(filename, "utf8");
  return JSON.parse(content);
}

export default async (env, argv) => {
  const isDevelopment = (argv.mode === "development");
  const mode = isDevelopment ? "development" : "production";
  const devtool = isDevelopment ? "inline-source-map" : undefined;
  const tsconfig = isDevelopment ? "tsconfig.dev.json" : "tsconfig.json";

  const pkg = await readJSON(path.join(__dirname, "package.json"));
  const globalVariables = {
    PROJECT_NAME: JSON.stringify(pkg.name || ""),
    PROJECT_VERSION: JSON.stringify(pkg.version || ""),
    PROJECT_DESCRIPTION: JSON.stringify(pkg.description || ""),
    PROJECT_HOMEPAGE_URL: JSON.stringify(pkg.homepage || ""),
  };

  const outputPath = path.resolve(__dirname, "dist");
  const resolve = {
    extensions: [ ".ts", ".tsx", ".mjs", ".js" ],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  };

  const module = {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.join(__dirname, tsconfig),
            }
          }
        ],
      },
    ],
  };

  const libConfig = {
    mode,
    devtool,
    resolve,
    target: 'node',
    entry: {
      "libarchive": "./src/index.ts",
    },
    output: {
      path: outputPath,
      filename: '[name].js',
      library: {
        name: "libarchive",
        type: "commonjs2",
      },
      libraryTarget: "umd",
      libraryExport: "default",
    },
    module,
    plugins: [
      new webpack.DefinePlugin(globalVariables),
    ],
  };

  const cliConfig = {
    mode,
    devtool,
    resolve,
    target: 'node',
    entry: {
      "libarchive-cli": "./src/main.ts",
    },
    output: {
      path: outputPath,
      filename: "[name].js",
    },
    module,
    plugins: [
      new webpack.DefinePlugin(globalVariables),
      new webpack.BannerPlugin({
        banner: "#!/usr/bin/env node",
        raw: true,
      }),
    ],
    externals: {
      "libarchive": "commonjs2 ./libarchive.js",
    },
  };

  return [ libConfig, cliConfig ];
}
