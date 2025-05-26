/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IArchive, IArchiveBuffer } from "./Archive";
import { AE_IFMT, AE_IFREG, AE_IFDIR, EntryInfo } from "./Archive";

export namespace ArchiveOperations {

export interface IDataWriter {
  writeData(buffer: ArrayBuffer, byteOffset: number, byteLength: number): number | Promise<number>;
};

export interface IDecompressCallbacks {
  dirEntry(entry: EntryInfo): void | Promise<void>;
  fileEntry(entry: EntryInfo): IDataWriter | Promise<IDataWriter>;
};

export async function decompress(context: IArchive, input: string | Buffer, callbacks: IDecompressCallbacks): Promise<void> {
  if (typeof input === "string") {
    const response = await fetch(input);
    input = Buffer.from(await response.arrayBuffer());
  }

  const archive = context.newRead();

  archive.supportFilterAll();
  archive.supportFormatAll();

  const chunks: Buffer[] = [ input ];
  archive.onread = () => chunks.shift();
  archive.open();

  const buffer = context.newBuffer(4092);

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

    const info: EntryInfo = {
      pathname,
      size: entry.size,
      mode: entry.mode,
    };

    let size = 0;
    const filetype = entry.mode & AE_IFMT;
    if (filetype === AE_IFDIR) {
      const r = callbacks.dirEntry(info);
      if (r instanceof Promise)
        await r;
    }
    else if (filetype === AE_IFREG) {
      const f = callbacks.fileEntry(info);
      let writer = (f instanceof Promise) ? (await f) : f;
      size = entry.size || 0;
      while (size > 0) {
        let n = archive.dataRead(buffer);
        while (n) {
          const w = writer.writeData(buffer.buffer, buffer.byteOffset, n);
          const sz = (w instanceof Promise) ? (await w) : w;
          n -= sz;
          size -= sz;
        }
      }
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
}

export interface IEntryReader {
  pathname: string;
  mode: number;
  size?: number;

  readData(buffer: ArrayBuffer, byteOffset?: number, byteLength?: number): number | Promise<number>;
};

export interface ICompressCallbacks {
  nextEntry(): IEntryReader | undefined | Promise<IEntryReader | undefined>;
  writeData(buffer: ArrayBuffer, byteOffset: number, byteLength: number): number | Promise<number>;
};

export async function compress(context: IArchive, callbacks: ICompressCallbacks, output: string) {
  const archive = context.newWrite();

  archive.setFormatFilterByExt(output);

  const buffer = context.newBuffer(8192);

  const chunks = new Array<ArrayBuffer>;
  archive.onwrite = (buffer: IArchiveBuffer) => {
    chunks.push(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
  }

  const flushChunks = async () => {
    for (;;) {
      const bytes = chunks.shift();
      if (!bytes)
        return;
      let offset = 0;
      let length = bytes.byteLength;
      while (length) {
        const w = callbacks.writeData(bytes, offset, length);
        const n = (w instanceof Promise) ? (await w) : w;
        offset += n;
        length -= n;
      }
    }
  }

  archive.open();
  for (;;) {
    const x = callbacks.nextEntry();
    const iter = (x instanceof Promise) ? (await x) : x;
    if (!iter)
      break;

    const entry = context.newEntry();
    entry.pathname = iter.pathname;
    entry.mode = iter.mode;

    if (iter.size !== undefined) {
      entry.size = iter.size;
    }

    archive.writeHeader(entry);

    if (iter.size) {
      let size = iter.size;
      while (size) {
        const r = iter.readData(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        const sz = (r instanceof Promise) ? (await r) : r;
        archive.writeData(buffer, 0, sz);
        size -= sz;
      }
    }

    entry.release();

    await flushChunks();
  }
  archive.close();

  await flushChunks();

  buffer.release();
  archive.release();
}

} // namespace ArchiveOperations
