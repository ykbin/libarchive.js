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

import { IArchive, IArchiveExport, DecompressOptions, CompressOptions, EntryInfo } from "./Archive";
import { Archive } from "./ArchiveImpl";
import { ARCHIVE_OK, ARCHIVE_RETRY, ARCHIVE_WARN, ARCHIVE_FAILED, ARCHIVE_FATAL } from "./Archive";
import { AE_IFMT, AE_IFREG, AE_IFLNK, AE_IFSOCK, AE_IFCHR, AE_IFBLK, AE_IFDIR, AE_IFIFO } from "./Archive";
import { getScriptDirectory, PathSep, getFileStats, MkdirCache } from "./FileSystem";
import { ArchiveOperations } from "./ArchiveOperations";
import url from "node:url";

async function newArchiveContext(params: string | Buffer): Promise<IArchive> {
  if (typeof params === "string") {
    params = await fs.promises.readFile(params);
    return Archive.instantiate(params);
  }
  else if (!(params instanceof Buffer)) {
    throw Error(`Not supported parameter ${params}`);
  }

  return Archive.instantiate(params);
}

let g_archive: IArchive;
async function getArchiveContext(params?: string | Buffer): Promise<IArchive> {
  if (params !== undefined) {
    return newArchiveContext(params);
  }

  if (!g_archive) {
    const filename = path.join(getScriptDirectory(), "libarchive.wasm");
    g_archive = await newArchiveContext(filename);
  }

  return g_archive;
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

    if (typeof input === "string" && !input.startsWith("http://") && !input.startsWith("https://")) {
      if (input.startsWith("file://"))
        input = url.fileURLToPath(input);
      input = await fs.promises.readFile(input);
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

    return ArchiveOperations.decompress(await getArchiveContext(), input, callbacks);
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
    const result = await ArchiveOperations.compress(await getArchiveContext(), callbacks, output);
    await outputHandle.close();
    return result;
  },
});

export default libarchive;
