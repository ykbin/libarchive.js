/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

/// <reference path="global.d.ts" />

// @ts-ignore
import libarchive from "libarchive";

const _O = (sopt: string, lopt: string, arg: string | null, desc: string) => ({sopt, lopt, arg, desc});

const opts = [
  _O( "c",   "create",    null,       "create a new archive"           ),
  _O( "x",   "extract",   null,       "extract files from an archive"  ),
  _O( "C",   "directory", "DIR",      "change to directory DIR"        ),
  _O( "f",   "file",      "ARCHIVE",  "extract files from an archive"  ),
  _O( "",    "version",   null,       "print program version"          ),
  _O( "v",   "verbose",   null,       "verbosely list files processed" ),
  _O( "?",   "help",      null,       "give this help list"            ),
];

const TRY_MESSAGE = `Try '${PROJECT_NAME} --help' for more information.`;

function usage() {
  console.log(`Usage: ${PROJECT_NAME} [OPTION...] [FILE]...`);
  console.log("");
  console.log("Examples:");
  console.log(`  ${PROJECT_NAME} -cf archive.tar dir file # Create archive.tar from dir and file`);
  console.log(`  ${PROJECT_NAME} -xf archive.zip          # Extract all files from archive.zip`);
  console.log("");
  console.log("Options:");

  const lines = [];
  let maxLength = 0;
  for (const iter of opts) {
    const sopt = iter.sopt ? `-${iter.sopt},` : "   ";
    const text = `  ${sopt}  --${iter.lopt}` + (iter.arg ? "=" + iter.arg : "");
    maxLength = Math.max(maxLength, text.length);
    lines.push({ text, desc: iter.desc });
  }

  maxLength += 2;
  for (const iter of lines)
    console.log(iter.text.padEnd(maxLength, " ") + iter.desc);
  console.log("");
}

async function runScript() {
  const [ ,, ...args ] = process.argv;

  const files = [];
  const options: any = {};
  let lastOpt = "";

  for (const iter of args) {
    if (!iter) {
      console.log(`${PROJECT_NAME}: option is empty`);
      process.exit(1);
    }

    if (files.length) {
      files.push(iter);
      continue;
    }

    if (lastOpt) {
      options[lastOpt] = iter;
      lastOpt = "";
      continue;
    }

    if (iter.startsWith("--")) {
      let name = iter.slice(2);
      let val: string | boolean = true;
      const n = name.indexOf("=");
      if (n !== -1) {
        val = name.slice(n + 1);
        if (!val) {
          console.log(`${PROJECT_NAME}: option '${iter}' is empty`);
          console.log(TRY_MESSAGE);
          process.exit(1);
        }
        name = name.slice(0, n);
      }
      const opt = opts.find(i => i.lopt === name);
      if (!opt) {
        console.log(`${PROJECT_NAME}: unrecognized option '${iter}'`);
        console.log(TRY_MESSAGE);
        process.exit(1);
      }
      options[name] = val;
      continue;
    }

    if (iter[0] == "-") {
      for (const ch of iter.slice(1)) {
        const opt = opts.find(i => i.sopt === ch);
        if (!opt) {
          console.log(`${PROJECT_NAME}: invalid option -- '${ch}'`);
          console.log(TRY_MESSAGE);
          process.exit(1);
        }
        if (lastOpt) {
          console.log(`${PROJECT_NAME}: option '${lastOpt}' not last in '${iter}'`);
          console.log(TRY_MESSAGE);
          process.exit(1);
        }
        if (opt.arg) {
          lastOpt = opt.lopt;
        }
        else {
          options[opt.lopt] = true;
        }
      }
      continue;
    }

    files.push(iter);
  }

  if (options.help) {
    usage();
    return;
  }

  const context = await libarchive();

  if (options.extract) {
    if (!options.file) {
        console.log(`${PROJECT_NAME}: Archive file not specified (missing -f option)`);
        process.exit(1);
    }
    await libarchive.decompress(options.file, options.directory, { verbose: options.verbose });
    return;
  }

  if (options.create) {
    if (!options.file) {
        console.log(`${PROJECT_NAME}: Archive file not specified (missing -f option)`);
        process.exit(1);
    }
    await libarchive.compress(files, options.file, { verbose: options.verbose });
    return;
  }

  if (options.version) {
    console.log(`${PROJECT_NAME}.js ${PROJECT_VERSION}`);
    console.log(context.versionDetails);
    return;
  }

  console.log(`${PROJECT_NAME}: determine the required command`);
  console.log(TRY_MESSAGE);
  process.exit(1);
}

runScript().then(() => process.exit(0)).catch((e) => {
  if (e instanceof Error) {
    if (e.cause)
      console.error("Cause:", e.cause);
    console.error(e.stack);
  }
  else
    console.error(e);
  process.exit(2);
});
