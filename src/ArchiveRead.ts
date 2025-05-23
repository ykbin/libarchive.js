/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ArchiveOpenCallback, ArchiveReadCallback, ArchiveCloseCallback, IArchiveRead } from "./Archive";
import { ArchiveContext } from "./ArchiveContext";
import { ArchiveEntry } from "./ArchiveEntry";

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
    return this._context.archive_read_next_header(this._handle);
  }

  public dataRead(): Uint8Array {
    return this._context.archive_read_data(this._handle);
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
