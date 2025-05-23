/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ArchiveOpenCallback, ArchiveReadCallback, ArchiveCloseCallback, IArchiveRead, ARCHIVE_OK } from "./Archive";
import { ArchiveContext } from "./ArchiveContext";
import { ArchiveEntry } from "./ArchiveEntry";
import { ArchiveBuffer } from "./ArchiveBuffer";
import { errorCodeToString } from "./Utils";

export class ArchiveRead implements IArchiveRead {
  private _context: ArchiveContext;
  private _handle: number;

  public constructor(context: ArchiveContext, handle: number) {
    this._context = context;
    this._handle = handle;
  }

  public release() {
    this._context.archive_read_free(this._handle);
  }

  public get handle() {
    return this._handle;
  }

  public supportFilterAll(): void {
    return this._context.archive_read_support_filter_all(this._handle);
  }

  public supportFormatAll(): void {
    return this._context.archive_read_support_format_all(this._handle);
  }

  public open(): void {
    this._context.archive_read_open(this._handle);
  }

  public close(): void {
    this._context.archive_read_close(this._handle);
  }

  public nextHeader(): ArchiveEntry | undefined {
    const entry = this._context.archive_read_next_header(this._handle);
    if (entry)
      return new ArchiveEntry(this._context, entry);

    const code = this._context.archive_read_last_error(this._handle);
    if (code === ARCHIVE_OK)
      return;

    const message = this._context.archive_error_string(this._handle);
    const cause = errorCodeToString(code);
    throw new Error(message, { cause });
  }

  public dataRead(buffer: ArchiveBuffer, offset?: number, length?: number): number {
    offset = buffer.byteOffset + (offset || 0);
    length = length || buffer.byteLength;

    const n = this._context.archive_read_data(this._handle, offset, length);
    if (n >= 0)
      return n;

    const message = this._context.archive_error_string(this._handle);
    const cause = errorCodeToString(n);
    throw new Error(message, { cause });
  }

  public dataSkip(): number {
    return this._context.archive_read_data_skip(this._handle);
  }

  public set onopen(callback: ArchiveOpenCallback) {
    this._context.archive_read_set_open_callback(this._handle, callback);
  }

  public set onread(callback: ArchiveReadCallback) {
    this._context.archive_read_set_read_callback(this._handle, callback);
  }

  public set onclose(callback: ArchiveCloseCallback) {
    this._context.archive_read_set_close_callback(this._handle, callback);
  }

  // handleEvent
  // addEventListner
  // removeEventListener
};
