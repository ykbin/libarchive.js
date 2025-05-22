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
import { ArchiveEntryHandle } from "./ArchiveNative";

export class ArchiveEntry implements IArchiveEntry {
  private _context: ArchiveContext;
  private _handle: ArchiveEntryHandle;

  public constructor(context: ArchiveContext, handle: ArchiveEntryHandle) {
    this._context = context;
    this._handle = handle;
  }

  public release(): void {
    this._context.archive_entry_free(this._handle);
  }

  public get handle() {
    return this._handle;
  }

  public get pathname(): string | undefined {
    return this._context.archive_entry_pathname(this._handle);
  }

  public get filetype(): number {
    return this._context.archive_entry_filetype(this._handle);
  }

  public get size(): number {
    return this._context.archive_entry_size(this._handle);
  }
};
