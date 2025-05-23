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

export class ArchiveEntry implements IArchiveEntry {
  private _context: ArchiveContext;
  private _pointer: ArchiveEntryPtr;

  public constructor(context: ArchiveContext, pointer: ArchiveEntryPtr) {
    this._context = context;
    this._pointer = pointer;
  }

  public release(): void {
    this._context.archive_entry_free(this._pointer);
  }

  public get pointer() {
    return this._pointer;
  }

  public get pathname(): string | undefined {
    return this._context.archive_entry_pathname(this._pointer);
  }

  public set pathname(value: string) {
    if (!this._context.archive_entry_set_pathname(this._pointer, value))
      throw new Error("No Memory");
  }

  public get filetype(): number {
    return this._context.archive_entry_filetype(this._pointer);
  }

  public set filetype(filetype: number) {
    this._context.archive_entry_set_filetype(this._pointer, filetype);
  }

  public get size(): number {
    return this._context.archive_entry_size(this._pointer);
  }
};
