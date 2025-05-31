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

function objectValuesStringify(o) {
  const result = {};
  for (const [key, val] of Object.entries(o))
    result[key] = JSON.stringify(val);
  return result;
}

export default async (env, argv) => {
  const isDevelopment = (argv.mode === "development");
  const tsconfig = isDevelopment ? "tsconfig.dev.json" : "tsconfig.json";

  const pkg = await readJSON(path.join(__dirname, "package.json"));

  const PROJECT_NAME = pkg.name || "";
  const PROJECT_VERSION = pkg.version || "";
  const PROJECT_DESCRIPTION = pkg.description || "";
  const PROJECT_HOMEPAGE_URL = pkg.homepage || "";
  const LIBARCHIVE_MAIN_FILENAME = path.basename(pkg.exports["."]);
  const LIBARCHIVE_NODE_FILENAME = path.basename(pkg.exports["./node"]);
  const LIBARCHIVE_CLI_FILENAME = path.basename(pkg.exports["./cli"]);
  const LIBARCHIVE_WASM_FILENAME = path.basename(pkg.exports["./wasm"]);

  const globalVariables = objectValuesStringify({
    PROJECT_NAME,
    PROJECT_VERSION,
    PROJECT_DESCRIPTION,
    PROJECT_HOMEPAGE_URL,
    LIBARCHIVE_MAIN_FILENAME,
    LIBARCHIVE_NODE_FILENAME,
    LIBARCHIVE_CLI_FILENAME,
    LIBARCHIVE_WASM_FILENAME,
  });

  const outputPath = path.resolve(__dirname, "dist");

  const config = {
    mode: isDevelopment ? "development" : "production",
    devtool: isDevelopment ? "inline-source-map" : undefined,
    entry: {},
    resolve: {
      extensions: [ ".ts", ".tsx", ".mjs", ".js" ],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
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
    },
    externals: {},
    plugins: [
      new webpack.DefinePlugin(globalVariables),
    ],
  };

  if (process.env.npm_config_build_target === "main") {
    config.entry = "./src/MainLibrary.ts";
    config.output.filename = LIBARCHIVE_MAIN_FILENAME;
    config.output.library = {
      name: "libarchive",
      type: "commonjs2",
    };
    config.output.libraryTarget = "umd";
    config.output.libraryExport = "default";
  }

  if (process.env.npm_config_build_target === "node") {
    config.target = "node";
    config.entry = "./src/NodeLibrary.ts";
    config.output.filename = LIBARCHIVE_NODE_FILENAME;
    config.output.library = {
      name: "libarchive",
      type: "commonjs2",
    };
    config.output.libraryTarget = "umd";
    config.output.libraryExport = "default";
    config.externals["libarchive"] = "commonjs2 ./libarchive.js";
  }

  if (process.env.npm_config_build_target === "cli") {
    config.target = "node";
    config.entry = "./src/NodeProgram.ts";
    config.output.filename = LIBARCHIVE_CLI_FILENAME;
    config.externals["libarchive/node"] = "commonjs2 ./libarchive-node.js";
    config.plugins.push(new webpack.BannerPlugin({
      banner: "#!/usr/bin/env node",
      raw: true,
    }));
  };

  return config;
}
