/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export const ARCHIVE_OK = 0;
export const ARCHIVE_RETRY = -10;
export const ARCHIVE_WARN = -20;
export const ARCHIVE_FAILED = -25;
export const ARCHIVE_FATAL = -30;

export const AE_IFMT   = 0xf000;
export const AE_IFREG  = 0x8000;
export const AE_IFLNK  = 0xa000;
export const AE_IFSOCK = 0xc000;
export const AE_IFCHR  = 0x2000;
export const AE_IFBLK  = 0x6000;
export const AE_IFDIR  = 0x4000;
export const AE_IFIFO  = 0x1000;

export type ArchiveOpenCallback = () => number;
export type ArchiveReadCallback = () => Buffer | undefined;
export type ArchiveWriteCallback = (buffer: IArchiveBuffer) => void;
export type ArchiveCloseCallback = () => number;

export interface IArchiveBuffer {
  release(): void;

  get buffer(): ArrayBuffer;
  get byteOffset(): number;
  get byteLength(): number;
};

export interface IArchiveEntry {
  release(): void;

  get pathname(): string | undefined;
  set pathname(value: string);

  get size(): number | undefined;
  set size(value: number);

  get mode(): number;
  set mode(mode: number);
};

export interface IArchiveRead {
  release(): void;

  get errno(): number;
  get errorString(): string;

  supportFilterAll(): void;
  supportFormatAll(): void;

  addPassphrase(passphrase: string): void;

  set onopen(callback: ArchiveOpenCallback);
  set onread(callback: ArchiveReadCallback);
  set onclose(callback: ArchiveCloseCallback);

  open(): void;
  close(): void;
  nextHeader(): IArchiveEntry | undefined;
  dataRead(buffer: IArchiveBuffer, offset?: number, length?: number): number;
  dataSkip(): number;
};

export interface IArchiveWrite {
  release(): void;

  get errno(): number;
  get errorString(): string;

  set format(value: string);
  set options(options: string);
  set passphrase(passphrase: string);
  addFilter(filter: string): void;
  setFormatFilterByExt(filename: string): void;

  set onopen(callback: ArchiveOpenCallback);
  set onwrite(callback: ArchiveWriteCallback);
  set onclose(callback: ArchiveCloseCallback);

  open(): void;
  close(): void;
  writeHeader(entry: IArchiveEntry): number;
  writeData(buffer: IArchiveBuffer, offset?: number, length?: number): number;
};

export interface IArchive {
  newRead(): IArchiveRead;
  newWrite(): IArchiveWrite;
  newEntry(): IArchiveEntry;
  newBuffer(length: number): IArchiveBuffer;
};

export type DecompressOptions = {
  verbose?: boolean;
  moduleUrl?: string;
};

export type CompressOptions = {
  verbose?: boolean;
  moduleUrl?: string;
  directory?: string;
};

export interface EntryInfo {
  pathname: string;
  mode: number;
  size?: number;
};

export interface IArchiveExport {
  (params?: string | Buffer): Promise<IArchive>;

  readonly ARCHIVE_OK: number;
  readonly ARCHIVE_RETRY: number;
  readonly ARCHIVE_WARN: number;
  readonly ARCHIVE_FAILED: number;
  readonly ARCHIVE_FATAL: number;

  readonly AE_IFMT: number;
  readonly AE_IFREG: number;
  readonly AE_IFLNK: number;
  readonly AE_IFSOCK: number;
  readonly AE_IFCHR: number;
  readonly AE_IFBLK: number;
  readonly AE_IFDIR: number;
  readonly AE_IFIFO: number;

  decompress(input: string | Buffer, output?: string, options?: DecompressOptions): Promise<void>;
  compress(input: string | string[], output: string, options?: CompressOptions): Promise<void>;
};
