/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IArchiveWrite, ArchiveOpenCallback, ArchiveWriteCallback, ArchiveCloseCallback, ARCHIVE_OK } from "./Archive";
import { ArchiveContext } from "./ArchiveContext";
import { ArchiveEntry } from "./ArchiveEntry";
import { ArchiveBuffer } from "./ArchiveBuffer";
import { errorCodeToString } from "./Utils";

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

  public addFilter(filter: string): void {
    const name = this._context.archive_buffer_from(filter);
    if (!name) throw new Error("No Memory");
    const code = this._context.archive_write_add_filter_by_name(this._handle, name);
    this._context.archive_buffer_free(name);
    if (code != ARCHIVE_OK) {
      const message = this._context.archive_error_string(this._handle);
      const cause = errorCodeToString(code);
      throw new Error(message, { cause });
    }
  }

  public set format(value: string) {
    const name = this._context.archive_buffer_from(value);
    if (!name) throw new Error("No Memory");
    const code = this._context.archive_write_set_format_by_name(this._handle, name);
    this._context.archive_buffer_free(name);
    if (code != ARCHIVE_OK) {
      const message = this._context.archive_error_string(this._handle);
      const cause = errorCodeToString(code);
      throw new Error(message, { cause });
    }
  }

  public setFormatFilterByExt(filename: string): void {
    const fname = this._context.archive_buffer_from(filename);
    if (!fname) throw new Error("No Memory");
    const code = this._context.archive_write_set_format_filter_by_ext(this._handle, fname);
    this._context.archive_buffer_free(fname);
    if (code != ARCHIVE_OK) {
      const message = this._context.archive_error_string(this._handle);
      const cause = errorCodeToString(code);
      throw new Error(message, { cause });
    }
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

  public close(): void {
    this._context.archive_write_close(this._handle);
  }

  public writeHeader(entry: ArchiveEntry): number {
    return this._context.archive_write_header(this._handle, entry.pointer);
  }

  public writeData(buffer: ArchiveBuffer, offset?: number, length?: number): number {
    offset = buffer.byteOffset + (offset || 0);
    length = length || buffer.byteLength - offset;

    const n = this._context.archive_write_data(this._handle, offset, length);
    if (n >= 0)
      return n;

    const message = this._context.archive_error_string(this._handle);
    const cause = errorCodeToString(n);
    throw new Error(message, { cause });
  }
};
