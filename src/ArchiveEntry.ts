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
    const pathnamePtr = this._context.archive_entry_pathname_utf8(this._entry);
    if (pathnamePtr) {
      return StringExtras.fromBuffer(this._context.memoryBuffer, pathnamePtr);
    }
  }

  public set pathname(pathname: string) {
    const pathnamePtr = this._context.archive_buffer_from(pathname);
    if (!pathnamePtr) throw new Error(NO_MEMORY);
    this._context.archive_entry_set_pathname_utf8(this._entry, pathnamePtr);
  }

  public get filetype(): number {
    return this._context.archive_entry_filetype(this._entry);
  }

  public set filetype(value: number) {
    this._context.archive_entry_set_filetype(this._entry, value);
  }

  public get size(): number {
    return this._context.archive_entry_size(this._entry);
  }

  public set size(value: number) {
    this._context.archive_entry_set_size(this._entry, value);
  }

  public set perm(value: number) {
    this._context.archive_entry_set_perm(this._entry, value);
  }
};
