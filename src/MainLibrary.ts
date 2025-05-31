/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

/// <reference path="global.d.ts" />

import { IArchive, IArchiveExport, DecompressOptions, CompressOptions } from "./Archive";
import { Archive } from "./ArchiveImpl";
import { ARCHIVE_OK, ARCHIVE_RETRY, ARCHIVE_WARN, ARCHIVE_FAILED, ARCHIVE_FATAL } from "./Archive";
import { AE_IFMT, AE_IFREG, AE_IFLNK, AE_IFSOCK, AE_IFCHR, AE_IFBLK, AE_IFDIR, AE_IFIFO } from "./Archive";

async function fetchBuffer(str: string): Promise<ArrayBuffer> {
  const response = await fetch(str);
  return response.arrayBuffer();
}

async function newArchiveContext(params: string | ArrayBuffer): Promise<IArchive> {
  if (typeof params === "string")
    params = await fetchBuffer(params);
  return Archive.instantiate(params);
}

let g_archive: IArchive;
async function getArchiveContext(params?: string | ArrayBuffer): Promise<IArchive> {
  if (params !== undefined) {
    return newArchiveContext(params);
  }

  if (!g_archive) {
    g_archive = await newArchiveContext(LIBARCHIVE_WASM_FILENAME);
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

  async decompress(input: string | ArrayBuffer, output?: string, options?: DecompressOptions): Promise<void> {
    console.log("IArchiveExport.decompress");
    const context = await getArchiveContext(options?.moduleUrl);
    //return ArchiveOperations.decompress(webFs, await newArchiveContext(), input, output, options);
  },

  async compress(input: string | string[], output: string, options?: CompressOptions): Promise<void> {
    console.log("IArchiveExport.compress");
    const context = await getArchiveContext(options?.moduleUrl);
    //return ArchiveOperations.compress(webFs, await newArchiveContext(), input, output, options);
  },
});

export default libarchive;
