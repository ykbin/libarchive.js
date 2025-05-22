/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IArchiveWrite, ArchiveOpenCallback, ArchiveWriteCallback, ArchiveCloseCallback } from "./Archive";
import { ArchiveContext } from "./ArchiveContext";
import { ArchiveEntry } from "./ArchiveEntry";

export class ArchiveWrite implements IArchiveWrite {
  private _context: ArchiveContext;
  private _handle: number;

  public constructor(context: ArchiveContext, handle: number) {
    this._context = context;
    this._handle = handle;
  }

  public release() {
    this._context.archive_write_free(this._handle);
  }

  public get handle() {
    return this._handle;
  }

  public get errno(): number {
    return this._context.archive_errno(this._handle);
  }

  public get errorString() {
    return this._context.archive_error_string(this._handle);
  }

  public setFormatZip(): number {
    return this._context.archive_write_set_format_zip(this._handle);
  }

  public set onopen(callback: ArchiveOpenCallback) {
    this._context.archive_write_set_open_callback(this._handle, callback);
  }

  public set onwrite(callback: ArchiveWriteCallback) {
    this._context.archive_write_set_write_callback(this._handle, callback);
  }

  public set onclose(callback: ArchiveCloseCallback) {
    this._context.archive_write_set_open_callback(this._handle, callback);
  }

  public open(): void {
    this._context.archive_write_open(this._handle);
  }

  public writeHeader(entry: ArchiveEntry): number {
    return this._context.archive_write_header(this._handle, entry.handle);
  }
};
