/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IArchiveEntry } from "./Archive";
import { ArchiveContext } from "./ArchiveContext";
import { ArchiveEntryPtr } from "./ArchiveNative";
import { NO_MEMORY, StringExtras } from "./Utils";

export class ArchiveEntry implements IArchiveEntry {
  private _context: ArchiveContext;
  private _entry: ArchiveEntryPtr;

  public constructor(context: ArchiveContext, entry: ArchiveEntryPtr) {
    this._context = context;
    this._entry = entry;
  }

  public release(): void {
    this._context.archive_entry_free(this._entry);
  }

  public get memoryOffset() {
    return this._entry;
  }

  public get pathname(): string | undefined {
    const pathnameUTF8Ptr = this._context.archive_entry_pathname_utf8(this._entry);
    if (pathnameUTF8Ptr) {
      return StringExtras.fromBuffer(this._context.memoryBuffer, pathnameUTF8Ptr);
    }
    const pathnamePtr = this._context.archive_entry_pathname(this._entry);
    if (pathnamePtr) {
      return StringExtras.fromBuffer(this._context.memoryBuffer, pathnamePtr);
    }
  }

  public set pathname(pathname: string) {
    const pathnamePtr = this._context.archive_buffer_from(pathname);
    if (!pathnamePtr) throw new Error(NO_MEMORY);
    this._context.archive_entry_set_pathname_utf8(this._entry, pathnamePtr);
  }

  public get size(): number | undefined {
    if (this._context.archive_entry_size_is_set(this._entry))
      return this._context.archive_entry_size(this._entry);
  }

  public set size(value: number) {
    this._context.archive_entry_set_size(this._entry, value);
  }

  public get mode(): number {
    return this._context.archive_entry_mode(this._entry);
  }

  public set mode(mode: number) {
    this._context.archive_entry_set_mode(this._entry, mode);
  }
};
