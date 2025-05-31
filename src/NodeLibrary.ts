/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

/// <reference path="global.d.ts" />

import path from "node:path";
import fs from "node:fs";
import url from "node:url";

import { IArchive, IArchiveExport, DecompressOptions, CompressOptions, EntryInfo } from "./Archive";
import { Archive } from "./ArchiveImpl";
import { ARCHIVE_OK, ARCHIVE_RETRY, ARCHIVE_WARN, ARCHIVE_FAILED, ARCHIVE_FATAL } from "./Archive";
import { AE_IFMT, AE_IFREG, AE_IFLNK, AE_IFSOCK, AE_IFCHR, AE_IFBLK, AE_IFDIR, AE_IFIFO } from "./Archive";
import { getScriptDirectory, PathSep, getFileStats, MkdirCache } from "./FileSystem";
import { ArchiveOperations } from "./ArchiveOperations";

async function fetchBuffer(str: string): Promise<Buffer> {
  if (!(str.startsWith("http://") || str.startsWith("https://"))) {
    const filepath = str.startsWith("file://") ? url.fileURLToPath(str) : str;
    return await fs.promises.readFile(filepath);
  }
  const response = await fetch(str);
  return Buffer.from(await response.arrayBuffer());
}

async function newArchiveContext(params: string | Buffer): Promise<IArchive> {
  if (typeof params === "string")
    params = await fetchBuffer(params);
  return Archive.instantiate(params);
}

let g_archive: IArchive;
async function getArchiveContext(params?: string | Buffer): Promise<IArchive> {
  if (params !== undefined) {
    return newArchiveContext(params);
  }

  if (!g_archive) {
    const filename = path.join(getScriptDirectory(), LIBARCHIVE_WASM_FILENAME);
    g_archive = await newArchiveContext(filename);
  }

  return g_archive;
}

function setlocale(context: IArchive, name?: string, verbose?: boolean) {
  if (name === undefined)
    name = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES;

  if (name !== undefined) {
    const result = context.setlocale(name);
    if (verbose && result === undefined) {
      console.warn(`Unable to set locale ${name}`);
    }
  }
}

const libarchive: IArchiveExport = Object.assign(getArchiveContext, {
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

  async decompress(input: string | Buffer, output?: string, options?: DecompressOptions): Promise<void> {
    const verbose = options && options.verbose;

    if (typeof input === "string") {
      input = await fetchBuffer(input);
    }

    const outputDir = path.resolve(output ? PathSep.representPathAsNative(output) : "");
    const mkdirCache = new MkdirCache;

    const callbacks = {
      async dirEntry(entry: EntryInfo): Promise<void> {
        verbose && console.log("x", entry.pathname);
        const filepath = path.join(outputDir, PathSep.representPathAsNative(entry.pathname));
        await mkdirCache.mkdir(filepath, { recursive: true });
      },
      async fileEntry(entry: EntryInfo) {
        verbose && console.log("x", entry.pathname);
        const filepath = path.join(outputDir, PathSep.representPathAsNative(entry.pathname));
        const dirpath = path.dirname(filepath);
        await mkdirCache.mkdir(dirpath, { recursive: true });

        let fileHandle: fs.promises.FileHandle;
        let size = entry.size || 0;

        return {
          async writeData(buffer: ArrayBuffer, byteOffset: number, byteLength: number): Promise<number> {
            if (!size || size < byteLength)
              throw new Error(`Invalid size ${byteLength} used`)
            if (!fileHandle)
              fileHandle = await fs.promises.open(filepath, "w");
            const bytes = new Uint8Array(buffer, byteOffset, byteLength);
            const { bytesWritten } = (await fileHandle.write(bytes));
            size -= bytesWritten;
            if (!size)
              await fileHandle.close();
            return bytesWritten;
          },
        }
      },
    };

    const context = await getArchiveContext(options?.moduleUrl);
    setlocale(context, options?.locale, options?.verbose);
    return ArchiveOperations.decompress(context, input, callbacks);
  },

  async compress(input: string | string[], output: string, options?: CompressOptions): Promise<void> {
    const verbose = options && options.verbose;
    const currentDirectory = options && options.directory || process.cwd();
    const outputHandle = await fs.promises.open(output, "w");
    const fileEntries = await getFileStats([ input ].flat(), currentDirectory);
    const callbacks = {
      async nextEntry() {
        let size: number | undefined;
        let fentry = fileEntries.shift();
        for (;;) {
          if (!fentry)
            return undefined;
          if (fentry.stat.isFile()) {
            size = fentry.stat.size;
          }
          else if (!fentry.stat.isDirectory()) {
            verbose && console.warn(fentry.name, "skipped");
            continue;
          }
          verbose && console.log(fentry.name);
          break;
        }

        let fileHandle: fs.promises.FileHandle;

        return {
          pathname: fentry.name,
          mode: fentry.stat.mode,
          size,

          async readData(buffer: ArrayBuffer, byteOffset: number, byteLength: number): Promise<number> {
            if (!size)
              throw new Error(`No Data`);

            if (!fileHandle) {
              fileHandle = await fs.promises.open(fentry.filepath, "r");
            }

            const bytes = new Uint8Array(buffer, byteOffset, Math.min(byteLength, size));
            const { bytesRead } = await fileHandle.read(bytes);
            size -= bytesRead;

            if (!size) {
              await fileHandle.close();
            }

            return bytesRead;
          }
        };
      },
      async writeData(buffer: ArrayBuffer, byteOffset: number, byteLength: number): Promise<number> {
        const { bytesWritten } = await outputHandle.write(new Uint8Array(buffer, byteOffset, byteLength));
        return bytesWritten;
      },
    };

    const context = await getArchiveContext(options?.moduleUrl);
    setlocale(context, options?.locale, options?.verbose);
    const result = await ArchiveOperations.compress(context, callbacks, output);
    await outputHandle.close();
    return result;
  },
});

export default libarchive;
