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

import { IArchive, IArchiveBuffer } from "./Archive";
import { Archive } from "./ArchiveImpl";
import { ARCHIVE_OK, ARCHIVE_RETRY, ARCHIVE_WARN, ARCHIVE_FAILED, ARCHIVE_FATAL } from "./Archive";
import { AE_IFMT, AE_IFREG, AE_IFLNK, AE_IFSOCK, AE_IFCHR, AE_IFBLK, AE_IFDIR, AE_IFIFO } from "./Archive";
import { PathSep, MkdirCache, getScriptDirectory, getFileStats } from "./FileSystem";

let g_archive: Archive;
async function newArchiveContext(params?: string | Buffer): Promise<IArchive> {
  if (params === undefined) {
    if (!g_archive) {
      const filename = path.join(getScriptDirectory(), "libarchive.wasm");
      const buffer = await fs.promises.readFile(filename);
      g_archive = await Archive.instantiate(buffer);
    }
    return g_archive;
  }

  let context: Archive;
  if (typeof params === "string") {
    const buffer = await fs.promises.readFile(params);
    context = await Archive.instantiate(buffer);
  }
  else if (params instanceof Buffer) {
    context = await Archive.instantiate(params);
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
  directory?: string;
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

  async decompress(input: string, output?: string, options?: DecompressOptions): Promise<void> {
    const verbose = options && options.verbose;
    const context = await newArchiveContext();
    const archive = context.newRead();

    archive.supportFilterAll();
    archive.supportFormatAll();

    const chunks = [ await fs.promises.readFile(input) ];
    archive.onread = () => chunks.shift();
    archive.open();

    const buffer = context.newBuffer(4092);

    const outputDir = path.resolve(output ? PathSep.representPathAsNative(output) : "");
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

      const filepath = path.join(outputDir, PathSep.representPathAsNative(pathname));

      let size = 0;
      const filetype = entry.filetype;
      if (filetype === AE_IFDIR) {
        await mkdirCache.mkdir(filepath);
      }
      else if (filetype === AE_IFREG) {
        const fileDir = path.dirname(filepath);
        await mkdirCache.mkdir(fileDir);
        const fileHandle = await fs.promises.open(filepath, "w");
        size = entry.size;
        while (size > 0) {
          let n = archive.dataRead(buffer);
          while (n) {
            const bytes = new Uint8Array(buffer.buffer, buffer.byteOffset, n);
            const { bytesWritten } = await fileHandle.write(bytes);
            n -= bytesWritten;
            size -= bytesWritten;
          }
        }
        await fileHandle.close();
        if (archive.dataRead(buffer) != 0) {
          console.warn(`${pathname} file has wrong data size (${size})`);
        }
        continue;
      }

      if (size == 0)
        archive.dataSkip();
    }

    buffer.release();
    archive.close();
    archive.release();
  },


  async compress(input: string | string[], output: string, options?: CompressOptions) {
    const currentDirectory = options && options.directory || process.cwd();
    const fileEntries = await getFileStats([ input ].flat(), currentDirectory);

    const verbose = options && options.verbose;
    const context = await newArchiveContext();

    const archive = context.newWrite();

    archive.setFormatFilterByExt(output);

    const chunks = new Array<Buffer>;
    archive.onwrite = (buffer: IArchiveBuffer) => {
      chunks.push(Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength));
    }
    archive.open();

    const buffer = context.newBuffer(8192);
    const fd = await fs.promises.open(output, "w");
    const flushChunks = async () => {
      let bytes = chunks.shift();
      while (bytes) {
        await fd.write(bytes);
        bytes = chunks.shift();
      }
    }

    for (const iter of fileEntries) {
      let filetype: number;
      if (iter.stat.isFile())
        filetype = AE_IFREG;
      else if (iter.stat.isDirectory())
        filetype = AE_IFDIR;
      else {
        verbose && console.warn("!Skip", iter.name);
        continue;
      }

      verbose && console.log(iter.name);

      const entry = context.newEntry();
      entry.pathname = iter.name;
      entry.filetype = filetype;

      if (filetype == AE_IFREG) {
        entry.size = iter.stat.size;
      }

      archive.writeHeader(entry);

      if (filetype == AE_IFREG) {
        const fileHandle = await fs.promises.open(iter.filepath, "r");
        let size = iter.stat.size;
        while (size) {
          const bytes = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
          const { bytesRead } = await fileHandle.read(bytes);
          archive.writeData(buffer, 0, bytesRead);
          size -= bytesRead;
        }
        await fileHandle.close();
      }

      entry.release();

      await flushChunks();
    }

    buffer.release();
    archive.close();

    await flushChunks();
    await fd.close();

    archive.release();
  },
});

export default libarchive;
