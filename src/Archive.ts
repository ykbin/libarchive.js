/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export const ARCHIVE_EOF = 1;
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
export type ArchiveCloseCallback = () => number;

export interface ArchiveRead {
  release(): void;
  supportFilterAll(): void;
  supportFormatAll(): void;

  set onopen(callback: ArchiveOpenCallback);
  set onread(callback: ArchiveReadCallback);
  set onclose(callback: ArchiveCloseCallback);

  open(): void;
  close(): number;
  nextHeader(): boolean;
  dataRead(): Uint8Array;
  dataSkip(): number;

  entryPathname(): string | null;
  entryFiletype(): number;
  entrySize(): number;
};

export interface ArchiveContext {
  newRead(): ArchiveRead;
};
