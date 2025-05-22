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

import { IArchiveContext } from "./Archive";
import { ArchiveContext } from "./ArchiveContext";
import { ARCHIVE_OK, ARCHIVE_RETRY, ARCHIVE_WARN, ARCHIVE_FAILED, ARCHIVE_FATAL } from "./Archive";
import { AE_IFMT, AE_IFREG, AE_IFLNK, AE_IFSOCK, AE_IFCHR, AE_IFBLK, AE_IFDIR, AE_IFIFO } from "./Archive";
import { PathSep, MkdirCache, getScriptDirectory } from "./FileSystem";

let g_context: ArchiveContext;
async function newArchiveContext(params?: string | Buffer): Promise<IArchiveContext> {
  if (params === undefined) {
    if (!g_context) {
      const filename = path.join(getScriptDirectory(), "libarchive.wasm");
      const buffer = await fs.promises.readFile(filename);
      g_context = await ArchiveContext.instantiate(buffer);
    }
    return g_context;
  }

  let context: ArchiveContext;
  if (typeof params === "string") {
    const buffer = await fs.promises.readFile(params);
    context = await ArchiveContext.instantiate(buffer);
  }
  else if (params instanceof Buffer) {
    context = await ArchiveContext.instantiate(params);
  }
  else {
    throw Error(`Not supported parameter ${params}`);
  }

  return context;
}

type DecompressOptions = {
  verbose?: boolean;
};

type CompressOptions = {
  verbose?: boolean;
};

const libarchive = Object.assign(newArchiveContext, {
  ARCHIVE_OK,
  ARCHIVE_RETRY,
  ARCHIVE_WARN,
  ARCHIVE_FAILED,
  ARCHIVE_FATAL,

  AE_IFMT,
  AE_IFREG,
  AE_IFLNK,
  AE_IFSOCK,
  AE_IFCHR,
  AE_IFBLK,
  AE_IFDIR,
  AE_IFIFO,

  async newRead() {
    return (await newArchiveContext()).newRead();
  },

  async newWrite() {
    return (await newArchiveContext()).newWrite();
  },

  async decompress(input: string, output?: string, options?: DecompressOptions): Promise<void> {
    const verbose = options && options.verbose;
    const archive = await libarchive.newRead();

    archive.supportFilterAll();
    archive.supportFormatAll();

    const chunks = [ await fs.promises.readFile(input) ];
    archive.onread = () => chunks.shift();

    archive.open();

    const outputDir = path.resolve(output || "");
    const pathSep = PathSep.fromPath(outputDir);
    const mkdirCache = new MkdirCache;

    for (;;) {
      const entry = archive.nextHeader();
      if(!entry) {
        break;
      }

      const pathname = entry.pathname;
      if (!pathname) {
        archive.dataSkip();
        continue;
      }

      if (verbose) {
        console.log("x", pathname);
      }

      const filepath = pathSep.representPath(pathname);
      const fullpath = path.join(outputDir, filepath);

      let size = 0;
      const filetype = entry.filetype;
      if (filetype === libarchive.AE_IFDIR) {
        await mkdirCache.mkdir(fullpath);
      }
      else if (filetype === libarchive.AE_IFREG) {
        const fileDir = path.dirname(fullpath);
        await mkdirCache.mkdir(fileDir);
        const fileHandle = await fs.promises.open(fullpath, "w");
        size = entry.size;
        while (size > 0) {
          const bytes = archive.dataRead();
          await fileHandle.write(bytes);
          size -= bytes.length;
        }
        await fileHandle.close();
        if (archive.dataRead().length != 0) {
          console.warn(`${pathname} file has wrong data size (${size})`);
        }
        continue;
      }

      if (size == 0)
        archive.dataSkip();
    }

    archive.close();
    archive.release();
  },


  async compress(input: string | string[], output: string, options?: CompressOptions) {
    // type: "zip" | "gzip" | "tar" | "tgz",
    const files = [ input ].flat();
    const verbose = options && options.verbose;
    const context = await newArchiveContext();
    const archive = context.newWrite();

    archive.setFormatZip();

    archive.open();
    for (const file of files) {
      const entry = context.newEntry();

      entry.release();
    }

    archive.release();
  },
});

export default libarchive;
