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

import { ArchiveContextImpl } from "./ArchiveContext";
import { ArchiveContext } from "./Archive";
import { ARCHIVE_EOF, ARCHIVE_OK, ARCHIVE_RETRY, ARCHIVE_WARN, ARCHIVE_FAILED, ARCHIVE_FATAL } from "./Archive";
import { AE_IFMT, AE_IFREG, AE_IFLNK, AE_IFSOCK, AE_IFCHR, AE_IFBLK, AE_IFDIR, AE_IFIFO } from "./Archive";
import { PathSep, MkdirCache, getScriptDirectory } from "./FileSystem";

let g_context: ArchiveContext;
async function newArchiveContext(params?: string | Buffer): Promise<ArchiveContext> {
  if (params === undefined) {
    if (!g_context) {
      const filename = path.join(getScriptDirectory(), "libarchive.wasm");
      const buffer = await fs.promises.readFile(filename);
      g_context = await ArchiveContextImpl.instantiate(buffer);
    }
    return g_context;
  }

  let context: ArchiveContext;
  if (typeof params === "string") {
    const buffer = await fs.promises.readFile(params);
    context = await ArchiveContextImpl.instantiate(buffer);
  }
  else if (params instanceof Buffer) {
    context = await ArchiveContextImpl.instantiate(params);
  }
  else {
    throw Error(`Not supported parameter ${params}`);
  }

  return context;
}

const libarchive = Object.assign(newArchiveContext, {
  ARCHIVE_EOF,
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

  async decompress(input: string, output?: string, options?: any): Promise<void> {
    const context = await newArchiveContext();
    const archive = context.newRead();

    archive.supportFilterAll();
    archive.supportFormatAll();

    const chunks = [ await fs.promises.readFile(input) ];
    archive.onread = () => chunks.shift();

    archive.open();

    const outputDir = path.resolve(output || "");
    const pathSep = PathSep.fromPath(outputDir);
    const mkdirCache = new MkdirCache;

    while (archive.nextHeader()) {
      const pathname = archive.entryPathname();
      if (pathname === null) {
        archive.dataSkip();
        continue;
      }
      
      console.log("x", pathname);

      const filepath = pathSep.representPath(pathname);
      const fullpath = path.join(outputDir, filepath);

      let size = 0;
      const filetype = archive.entryFiletype();
      if (filetype === libarchive.AE_IFDIR) {
        await mkdirCache.mkdir(fullpath);
      }
      else if (filetype === libarchive.AE_IFREG) {
        const fileDir = path.dirname(fullpath);
        await mkdirCache.mkdir(fileDir);
        const fileHandle = await fs.promises.open(fullpath, "w");
        size = archive.entrySize();
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
});

export default libarchive;
