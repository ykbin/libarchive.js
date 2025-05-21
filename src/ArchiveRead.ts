/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ArchiveOpenCallback, ArchiveReadCallback, ArchiveCloseCallback, ArchiveRead, ARCHIVE_OK, ARCHIVE_EOF } from "./Archive";
import { ArchiveNative } from "./ArchiveNative";
import { utf8DataToString, errorCodeToString } from "./Utils";

export interface ArchiveReadClient {
  opener: ArchiveOpenCallback | null,
  reader: ArchiveReadCallback | null,
  closer: ArchiveCloseCallback | null,
};

export class ArchiveReadImpl implements ArchiveRead {
  private _native: ArchiveNative;
  private _memory: WebAssembly.Memory;
  private _client: ArchiveReadClient;
  private _handle: number;

  public constructor(native: ArchiveNative, memory: WebAssembly.Memory, client: ArchiveReadClient, handle: number) {
    this._native = native;
    this._memory = memory;
    this._client = client;
    this._handle = handle;
  }

  public release() {
    this._native.archive_read_free(this._handle);
    this._client.opener = null;
    this._client.reader = null;
    this._client.closer = null;
  }

  public get errno(): number {
    return this._native.archive_errno(this._handle);
  }

  public get errorString() {
    const offset = this._native.archive_error_string(this._handle);
    return utf8DataToString(this._memory.buffer, offset);
  }

  public supportFilterAll(): void {
    return this._native.archive_read_support_filter_all(this._handle);
  }

  public supportFormatAll(): void {
    return this._native.archive_read_support_format_all(this._handle);
  }

  public open(): void {
    const code = this._native.archive_read_open(this._handle);
    if (code !== ARCHIVE_OK)
      throw new Error(this.errorString, { cause: errorCodeToString(code) });
  }

  public close(): number {
    return this._native.archive_read_close(this._handle);
  }

  public nextHeader(): boolean {
    const code = this._native.archive_read_next_header(this._handle);
    if (code === ARCHIVE_OK)
      return true;
    if (code === ARCHIVE_EOF)
      return false;

    throw new Error(this.errorString, { cause: errorCodeToString(code) });
  }

  public dataRead(): Uint8Array {
    const length = this._native.archive_read_data(this._handle);
    if (length > 0) {
      const offset = this._native.archive_read_data_offset(this._handle);
      return new Uint8Array(this._memory.buffer, offset, length);
    }

    if (length == 0) {
      return new Uint8Array;
    }

    throw new Error(this.errorString, { cause: errorCodeToString(length) });
  }

  public dataSkip(): number {
    return this._native.archive_read_data_skip(this._handle);
  }

  public entryPathname(): string | null {
    const offset = this._native.archive_entry_pathname_w(this._handle);
    if (!offset)
      return null;

    const data = new Uint32Array(this._memory.buffer, offset);

    let pathname = "";
    for (let i = 0; data[i]; i++)
      pathname += String.fromCharCode(data[i]);

    return pathname;
  }

  public entryFiletype(): number {
    return this._native.archive_entry_filetype(this._handle);
  }

  public entrySize(): number {
    const lo = this._native.archive_entry_size_lo(this._handle);
    const hi = this._native.archive_entry_size_hi(this._handle);
    return hi * 4294967296 + lo;
  }

  public set onopen(callback: ArchiveOpenCallback) {
    this._client.opener = callback;
    this._native.archive_read_allow_open_callback(this._handle);
  }

  public set onread(callback: ArchiveReadCallback) {
    this._client.reader = callback;
    this._native.archive_read_allow_read_callback(this._handle);
  }

  public set onclose(callback: ArchiveCloseCallback) {
    this._client.closer = callback;
    this._native.archive_read_allow_close_callback(this._handle);
  }

  // handleEvent
  // addEventListner
  // removeEventListener
};
