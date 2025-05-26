/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IArchive, IArchiveExport, DecompressOptions, CompressOptions } from "./Archive";
import { Archive } from "./ArchiveImpl";
import { ARCHIVE_OK, ARCHIVE_RETRY, ARCHIVE_WARN, ARCHIVE_FAILED, ARCHIVE_FATAL } from "./Archive";
import { AE_IFMT, AE_IFREG, AE_IFLNK, AE_IFSOCK, AE_IFCHR, AE_IFBLK, AE_IFDIR, AE_IFIFO } from "./Archive";

async function getArchiveContext(params?: string | Buffer): Promise<IArchive> {
  if (!params)
    throw new Error("Not supported params as undefined");

  if (typeof params === "string") {
      const response = await fetch(params);
      params = Buffer.from(await response.arrayBuffer());
  }

  return Archive.instantiate(params);
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
    console.log("IArchiveExport.decompress");
    //return ArchiveOperations.decompress(webFs, await newArchiveContext(), input, output, options);
  },

  async compress(input: string | string[], output: string, options?: CompressOptions): Promise<void> {
    console.log("IArchiveExport.compress");
    //return ArchiveOperations.compress(webFs, await newArchiveContext(), input, output, options);
  },
});

export default libarchive;
