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
  const tsconfig = isDevelopment ? "tsconfig.dev.json" : "tsconfig.json";

  const pkg = await readJSON(path.join(__dirname, "package.json"));
  const globalVariables = {
    PROJECT_NAME: JSON.stringify(pkg.name || ""),
    PROJECT_VERSION: JSON.stringify(pkg.version || ""),
    PROJECT_DESCRIPTION: JSON.stringify(pkg.description || ""),
    PROJECT_HOMEPAGE_URL: JSON.stringify(pkg.homepage || ""),
  };

  const outputPath = path.resolve(__dirname, "dist");

  const config = {
    mode: isDevelopment ? "development" : "production",
    devtool: isDevelopment ? "inline-source-map" : undefined,
    resolve: {
      extensions: [ ".ts", ".tsx", ".mjs", ".js" ],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    entry: {},
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
    module: {
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
    },
    output: {
      path: outputPath,
      filename: "[name].js",
    },
    externals: {},
    plugins: [
      new webpack.DefinePlugin(globalVariables),
    ],
  };

  if (process.env.npm_config_build_target === "main") {
    config.entry = {
      "libarchive": "./src/MainLibrary.ts",
    };
  }

  if (process.env.npm_config_build_target === "node") {
    config.target = "node";
    config.entry["libarchive-node"] = "./src/NodeLibrary.ts";
    config.externals["libarchive"] = "commonjs2 ./libarchive.js";
    config.output.library = {
      name: "libarchive",
      type: "commonjs2",
    };
    config.output.libraryTarget = "umd";
    config.output.libraryExport = "default";
  }

  if (process.env.npm_config_build_target === "cli") {
    config.target = "node";
    config.entry["libarchive-cli"] = "./src/NodeProgram.ts";
    config.externals["libarchive/node"] = "commonjs2 ./libarchive-node.js";
    config.output.library = {
      name: "libarchive",
      type: "commonjs2",
    };
    config.output.libraryTarget = "umd";
    config.output.libraryExport = "default";
    config.plugins.push(new webpack.BannerPlugin({
      banner: "#!/usr/bin/env node",
      raw: true,
    }));
  };

  return config;
}
