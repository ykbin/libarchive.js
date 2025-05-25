/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ArchiveOpenCallback, ArchiveReadCallback, ArchiveWriteCallback, ArchiveCloseCallback, ARCHIVE_OK } from "./Archive";
import { ArchiveNative, ArchivePtr, ArchiveEntryPtr } from "./ArchiveNative";
import { ArchiveBuffer } from "./ArchiveBuffer";

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

  public get(archive: number): ArchiveReadCalbacks | ArchiveWriteCalbacks {
    const callbacks = this._map.get(archive);
    if (!callbacks)
      throw Error(`Handle ${archive} does not exists`);
    return callbacks;
  }

  public set(archive: number, callbacks: ArchiveReadCalbacks | ArchiveWriteCalbacks) {
    if (!archive)
      throw Error(`Handle is null`);
    if (this._map.has(archive))
      throw Error(`Handle ${archive} is registred`);
    this._map.set(archive, callbacks);
  }

  public delete(archive: number) {
    this._map.delete(archive);
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

  public get memoryBuffer(): ArrayBuffer {
    return this._memory.buffer;
  }

  public archive_version(): number {
    return this._native.archive_version();
  }

  public archive_version_details(): number {
    return this._native.archive_version_details();
  }

  public archive_errno(archive: number): number {
    return this._native.archive_errno(archive);
  }

  public archive_error_string(archive: number): number {
    return this._native.archive_error_string(archive);
  }

  public archive_open_handler(archive: number): number {
    const client = this._callbacks.get(archive);
    return client.opener ? client.opener() : 0;
  }

  public archive_read_handler(archive: number, offset: number, size: number) {
    if (!this._readBuffer.length) {
      const client = this._callbacks.get(archive) as ArchiveReadCalbacks;
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

  public archive_read_last_error(archive: number): number {
    return this._native.archive_read_last_error(archive);
  }

  public archive_write_handler(archive: number, offset: number, size: number): number {
    const callbacks = this._callbacks.get(archive) as ArchiveWriteCalbacks;
    if (callbacks.writer)
      callbacks.writer(new ArchiveBuffer(this, offset, size))
    return size;
  };

  public archive_close_handler(archive: number): number {
    const client = this._callbacks.get(archive);
    return client.closer ? client.closer() : 0;
  }

  public archive_read_new(): ArchivePtr {
    const archive = this._native.archive_read_new();
    if (archive) {
      const impl: ArchiveReadCalbacks = {};
      this._callbacks.set(archive, impl);
    }
    return archive;
  }

  public archive_read_free(archive: number) {
    this._callbacks.delete(archive);
    this._native.archive_read_free(archive);
  }

  public archive_read_add_passphrase(archive: ArchivePtr, passphrase: number): number {
    return this._native.archive_read_add_passphrase(archive, passphrase);
  }

  public archive_read_support_filter_all(archive: number): void {
    return this._native.archive_read_support_filter_all(archive);
  }

  public archive_read_support_format_all(archive: number): void {
    return this._native.archive_read_support_format_all(archive);
  }

  public archive_read_open(archive: number): number {
    return this._native.archive_read_open(archive);
  }

  public archive_read_close(archive: number): number {
    return this._native.archive_read_close(archive);
  }
  
  public archive_read_next_header(archive: number): number {
    return this._native.archive_read_next_header(archive);
  }

  public archive_read_data(archive: number, offset: number, size: number): number {
    return this._native.archive_read_data(archive, offset, size);
  }

  public archive_read_data_skip(archive: number): number {
    return this._native.archive_read_data_skip(archive);
  }

  public archive_read_set_open_callback(archive: number, callback: ArchiveOpenCallback): void {
    const callbacks = this._callbacks.get(archive) as ArchiveReadCalbacks;
    callbacks.opener = callback;
  }

  public archive_read_set_read_callback(archive: number, callback: ArchiveReadCallback): void {
    const callbacks = this._callbacks.get(archive) as ArchiveReadCalbacks;
    callbacks.reader = callback;
  }

  public archive_read_set_close_callback(archive: number, callback: ArchiveCloseCallback): void {
    const callbacks = this._callbacks.get(archive) as ArchiveReadCalbacks;
    callbacks.closer = callback;
  }

  public archive_write_new(): ArchivePtr {
    const archive = this._native.archive_write_new();
    if (archive) {
      const impl: ArchiveWriteCalbacks = {};
      this._callbacks.set(archive, impl);
    }
    return archive;
  }

  public archive_write_free(archive: number) {
    this._callbacks.delete(archive);
    this._native.archive_write_free(archive);
  }

  public archive_write_set_options(archive: number, options: number): number {
    return this._native.archive_write_set_options(archive, options);
  }

  public archive_write_set_passphrase(archive: number, passphrase: number): number {
    return this._native.archive_write_set_passphrase(archive, passphrase);
  }

  public archive_write_set_format_by_name(archive: number, name: number): number {
    return this._native.archive_write_set_format_by_name(archive, name);
  }

  public archive_write_add_filter_by_name(archive: number, name: number): number {
    return this._native.archive_write_add_filter_by_name(archive, name);
  }

  public archive_write_set_format_filter_by_ext(archive: number, filename: number): number {
    return this._native.archive_write_set_format_filter_by_ext(archive, filename);
  }

  public archive_write_set_open_callback(archive: number, callback: ArchiveOpenCallback): void {
    const callbacks = this._callbacks.get(archive) as ArchiveWriteCalbacks;
    callbacks.opener = callback;
  }

  public archive_write_set_write_callback(archive: number, callback: ArchiveWriteCallback): void {
    const callbacks = this._callbacks.get(archive) as ArchiveWriteCalbacks;
    callbacks.writer = callback;
  }

  public archive_write_set_close_callback(archive: number, callback: ArchiveCloseCallback): void {
    const callbacks = this._callbacks.get(archive) as ArchiveWriteCalbacks;
    callbacks.closer = callback;
  }
  
  public archive_write_open(archive: number): number {
    return this._native.archive_write_open(archive);
  }

  public archive_write_close(archive: number): number {
    return this._native.archive_write_close(archive);
  }

  public archive_write_header(archive: number, entry: ArchiveEntryPtr): number {
    return this._native.archive_write_header(archive, entry);
  }

  public archive_write_data(archive: ArchivePtr, offset: number, size: number): number {
    return this._native.archive_write_data(archive, offset, size);
  }

  public archive_entry_new(): ArchiveEntryPtr {
    return this._native.archive_entry_new();
  }

  public archive_entry_free(entry: ArchiveEntryPtr) {
    this._native.archive_entry_free(entry);
  }

  public archive_entry_pathname_utf8(entry: ArchiveEntryPtr): number {
    return this._native.archive_entry_pathname_utf8(entry);
  }

  public archive_entry_set_pathname_utf8(entry: ArchiveEntryPtr, pathname: number): void {
    this._native.archive_entry_set_pathname_utf8(entry, pathname);
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

  public archive_entry_set_size(entry: ArchiveEntryPtr, size: number): void {
    this._native.archive_entry_set_size(entry, 0, size);
  }

  public archive_entry_set_perm(entry: ArchiveEntryPtr, mode: number): void {
    this._native.archive_entry_set_perm(entry, mode);
  }

  public archive_buffer_new(size: number): number {
    return this._native.archive_buffer_new(size);
  }

  public archive_buffer_free(buffer: number): void {
    this._native.archive_buffer_free(buffer);
  }

  public archive_buffer_from(str: string): number {
    const encoder = new TextEncoder;
    const bytes = encoder.encode(str + "\x00");
    const offset = this._native.archive_buffer_new(bytes.length);
    if (offset)
      (new Uint8Array(this._memory.buffer, offset, bytes.length)).set(bytes);
    return offset;
  }
};
