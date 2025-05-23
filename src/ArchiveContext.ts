/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ArchiveOpenCallback, ArchiveReadCallback, ArchiveWriteCallback, ArchiveCloseCallback, ARCHIVE_OK } from "./Archive";
import { ArchiveNative, ArchiveReadPtr, ArchiveWritePtr, ArchiveEntryPtr } from "./ArchiveNative";
import { ArchiveEntry } from "./ArchiveEntry";
import { utf8DataToString, errorCodeToString } from "./Utils";

type ArchiveReadCalbacks = {
  opener?: ArchiveOpenCallback,
  reader?: ArchiveReadCallback,
  closer?: ArchiveCloseCallback,
};

type ArchiveWriteCalbacks = {
  opener?: ArchiveOpenCallback,
  writer?: ArchiveWriteCallback,
  closer?: ArchiveCloseCallback,
};

class ArchiveCallbacks {
  private _map = new Map<number, ArchiveReadCalbacks | ArchiveWriteCalbacks>;

  public get(handle: number): ArchiveReadCalbacks | ArchiveWriteCalbacks {
    const archive = this._map.get(handle);
    if (!archive)
      throw Error(`Handle ${handle} does not exists`);
    return archive;
  }

  public set(handle: number, archive: ArchiveReadCalbacks | ArchiveWriteCalbacks) {
    if (!handle)
      throw Error(`Handle is null`);
    if (this._map.has(handle))
      throw Error(`Handle ${handle} is registred`);
    this._map.set(handle, archive);
  }

  public delete(handle: number) {
    this._map.delete(handle);
  }
};

export class ArchiveContext {
  private _native: ArchiveNative;
  private _memory: WebAssembly.Memory;
  private _callbacks = new ArchiveCallbacks;
  private _readBuffer = new Uint8Array;

  constructor(native: ArchiveNative, memory: WebAssembly.Memory) {
    this._native = native;
    this._memory = memory;
  }

  public get memory(): WebAssembly.Memory {
    return this._memory;
  }

  public archive_version(): string {
    const offset = this._native.archive_version();
    return utf8DataToString(this._memory.buffer, offset);
  }

  public archive_version_details(): string {
    const offset = this._native.archive_version_details();
    return utf8DataToString(this._memory.buffer, offset);
  }

  public archive_errno(handle: number): number {
    return this._native.archive_errno(handle);
  }

  public archive_error_string(handle: number) {
    const offset = this._native.archive_error_string(handle);
    return utf8DataToString(this._memory.buffer, offset);
  }

  public archive_open_handler(handle: number): number {
    const client = this._callbacks.get(handle);
    return client.opener ? client.opener() : 0;
  }

  public archive_read_handler(handle: number, offset: number, size: number) {
    if (!this._readBuffer.length) {
      const client = this._callbacks.get(handle) as ArchiveReadCalbacks;
      if (!client.reader)
        return 0;
      const buf = client.reader();
      if (!buf)
        return 0;
      this._readBuffer = new Uint8Array(buf);
    }

    const n = Math.min(size, this._readBuffer.length);
    const dst = new Uint8Array(this._memory.buffer, offset, n);
    for (let i = 0; i < n; i++)
      dst[i] = this._readBuffer[i];

    this._readBuffer = this._readBuffer.slice(n);
    return n;
  }

  public archive_write_handler(handle: number, offset: number, size: number): number {
    const callbacks = this._callbacks.get(handle) as ArchiveWriteCalbacks;
    if (callbacks.writer)
      callbacks.writer(new Uint8Array(this._memory.buffer, offset, size))
    return size;
  };

  public archive_close_handler(handle: number): number {
    const client = this._callbacks.get(handle);
    return client.closer ? client.closer() : 0;
  }

  public archive_error_throw(handle: number, code: number): never {
    const message = this.archive_error_string(handle);
    const cause = errorCodeToString(code);
    throw new Error(message, { cause });
  }

  public archive_read_new(): ArchiveReadPtr {
    const handle = this._native.archive_read_new();
    if (handle) {
      const impl: ArchiveReadCalbacks = {};
      this._callbacks.set(handle, impl);
    }
    return handle;
  }

  public archive_read_free(handle: number) {
    this._callbacks.delete(handle);
    this._native.archive_read_free(handle);
  }

  public archive_read_support_filter_all(handle: number): void {
    return this._native.archive_read_support_filter_all(handle);
  }

  public archive_read_support_format_all(handle: number): void {
    return this._native.archive_read_support_format_all(handle);
  }

  public archive_read_open(handle: number): void {
    const code = this._native.archive_read_open(handle);
    if (code !== ARCHIVE_OK) {
      this.archive_error_throw(handle, code);
    }
  }

  public archive_read_close(handle: number): number {
    return this._native.archive_read_close(handle);
  }
  
  public archive_read_next_header(handle: number): ArchiveEntry | undefined {
    const entryHandle = this._native.archive_read_next_header(handle);
    if (entryHandle)
      return new ArchiveEntry(this, entryHandle);
    const code = this._native.archive_read_last_error(handle);
    if (code !== ARCHIVE_OK)
      this.archive_error_throw(handle, code);
  }

  public archive_read_data(handle: number): Uint8Array {
    const length = this._native.archive_read_data(handle);
    if (length > 0) {
      const offset = this._native.archive_read_data_offset(handle);
      return new Uint8Array(this._memory.buffer, offset, length);
    }

    if (length == 0) {
      return new Uint8Array;
    }

    this.archive_error_throw(handle, length);
  }

  public archive_read_data_skip(handle: number): number {
    return this._native.archive_read_data_skip(handle);
  }

  public archive_read_set_open_callback(handle: number, callback: ArchiveOpenCallback): void {
    const callbacks = this._callbacks.get(handle) as ArchiveReadCalbacks;
    callbacks.opener = callback;
  }

  public archive_read_set_read_callback(handle: number, callback: ArchiveReadCallback): void {
    const callbacks = this._callbacks.get(handle) as ArchiveReadCalbacks;
    callbacks.reader = callback;
  }

  public archive_read_set_close_callback(handle: number, callback: ArchiveCloseCallback): void {
    const callbacks = this._callbacks.get(handle) as ArchiveReadCalbacks;
    callbacks.closer = callback;
  }

  public archive_write_new(): ArchiveWritePtr {
    const handle = this._native.archive_write_new();
    if (handle) {
      const impl: ArchiveWriteCalbacks = {};
      this._callbacks.set(handle, impl);
    }
    return handle;
  }

  public archive_write_free(handle: number) {
    this._callbacks.delete(handle);
    this._native.archive_write_free(handle);
  }

  public archive_write_set_format_zip(handle: number): number {
    return this._native.archive_write_set_format_zip(handle);
  }

  public archive_write_set_open_callback(handle: number, callback: ArchiveOpenCallback): void {
    const callbacks = this._callbacks.get(handle) as ArchiveWriteCalbacks;
    callbacks.opener = callback;
  }

  public archive_write_set_write_callback(handle: number, callback: ArchiveWriteCallback): void {
    const callbacks = this._callbacks.get(handle) as ArchiveWriteCalbacks;
    callbacks.writer = callback;
  }

  public archive_write_set_close_callback(handle: number, callback: ArchiveCloseCallback): void {
    const callbacks = this._callbacks.get(handle) as ArchiveWriteCalbacks;
    callbacks.closer = callback;
  }
  
  public archive_write_open(handle: number): void {
    const code = this._native.archive_write_open(handle);
    if (code !== ARCHIVE_OK) {
      this.archive_error_throw(handle, code);
    }
  }

  public archive_write_close(handle: number): number {
    return this._native.archive_write_close(handle);
  }

  public archive_write_header(handle: number, entry: ArchiveEntryPtr): number {
    return this._native.archive_write_header(handle, entry);
  }

  public archive_write_data(handle: ArchiveWritePtr, offset: number, size: number): number {
    return this._native.archive_write_data(handle, offset, size);
  }

  public archive_entry_new(): ArchiveEntryPtr {
    return this._native.archive_entry_new();
  }

  public archive_entry_free(entry: ArchiveEntryPtr) {
    this._native.archive_entry_free(entry);
  }

  public archive_entry_pathname(entry: ArchiveEntryPtr): string | undefined {
    const offset = this._native.archive_entry_pathname_w(entry);
    if (!offset)
      return;

    const bytes = new Uint32Array(this._memory.buffer, offset);

    let pathname = "";
    for (let i = 0; bytes[i]; i++)
      pathname += String.fromCharCode(bytes[i]);

    return pathname;
  }

  public archive_entry_set_pathname(entry: ArchiveEntryPtr, name: string): boolean {
    const encoder = new TextEncoder;
    const bytes = encoder.encode(name + "\x00");
    const offset = this._native.archive_buffer_new(bytes.length);
    if (!offset)
      return false;

    (new Uint8Array(this._memory.buffer, offset, bytes.length)).set(bytes);

    this._native.archive_entry_set_pathname_utf8(entry, offset);
    this._native.archive_buffer_free(offset);
    return true;
  }

  public archive_entry_filetype(entry: ArchiveEntryPtr): number {
    return this._native.archive_entry_filetype(entry);
  }

  public archive_entry_set_filetype(entry: ArchiveEntryPtr, filetype: number): void {
    this._native.archive_entry_set_filetype(entry, filetype);
  }

  public archive_entry_size(entry: ArchiveEntryPtr): number {
    const lo = this._native.archive_entry_size_lo(entry);
    const hi = this._native.archive_entry_size_hi(entry);
    return hi * 4294967296 + lo;
  }

  public archive_buffer_new(size: number): number {
    return this._native.archive_buffer_new(size);
  }

  public archive_buffer_free(buffer: number): void {
    this._native.archive_buffer_free(buffer);
  }
};
