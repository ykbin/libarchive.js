/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IArchiveContext, ArchiveOpenCallback, ArchiveReadCallback, ArchiveWriteCallback, ArchiveCloseCallback, ARCHIVE_OK } from "./Archive";
import { ArchiveNative, ArchiveEntryHandle } from "./ArchiveNative";
import { ArchiveEntry } from "./ArchiveEntry";
import { ArchiveRead } from "./ArchiveRead";
import { ArchiveWrite } from "./ArchiveWrite";
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

class ArchiveClallbacks {
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

export class ArchiveContext implements IArchiveContext {
  private _native: ArchiveNative;
  private _memory: WebAssembly.Memory;
  private _callbacks: ArchiveClallbacks;
  private _version = "";
  private _versionDetails = "";

  constructor(native: ArchiveNative, memory: WebAssembly.Memory, clients: ArchiveClallbacks) {
    this._native = native;
    this._memory = memory;
    this._callbacks = clients;
  }

  public get version(): string {
    if (!this._version) {
      const offset = this._native.archive_version();
      this._version = utf8DataToString(this._memory.buffer, offset);
    }
    return this._version;
  }

  public get versionDetails(): string {
    if (!this._versionDetails) {
      const offset = this._native.archive_version_details();
      this._versionDetails = utf8DataToString(this._memory.buffer, offset);
    }
    return this._versionDetails;
  }

  public archive_errno(handle: number): number {
    return this._native.archive_errno(handle);
  }

  public archive_error_string(handle: number) {
    const offset = this._native.archive_error_string(handle);
    return utf8DataToString(this._memory.buffer, offset);
  }

  public archive_error_throw(handle: number, code: number): never {
    const message = this.archive_error_string(handle);
    const cause = errorCodeToString(code);
    throw new Error(message, { cause });
  }

  public newRead(): ArchiveRead {
    const handle = this._native.archive_read_new();
    const impl: ArchiveReadCalbacks = {};
    this._callbacks.set(handle, impl);
    return new ArchiveRead(this, handle);
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

  public newWrite(): ArchiveWrite {
    const handle = this._native.archive_write_new();
    const impl: ArchiveWriteCalbacks = {};
    this._callbacks.set(handle, impl);
    return new ArchiveWrite(this, handle);
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

  public archive_write_header(handle: number, entry: ArchiveEntryHandle): number {
    return this._native.archive_write_header(handle, entry);
  }

  public newEntry(): ArchiveEntry {
    const handle = this._native.archive_entry_new();
    if (!handle) {
      // TODO: throw no memory
    }
    return new ArchiveEntry(this, handle);
  }

  public archive_entry_free(handle: ArchiveEntryHandle) {
    this._native.archive_entry_free(handle);
  }

  public archive_entry_pathname(handle: number): string | undefined {
    const offset = this._native.archive_entry_pathname_w(handle);
    if (!offset)
      return;

    const data = new Uint32Array(this._memory.buffer, offset);

    let pathname = "";
    for (let i = 0; data[i]; i++)
      pathname += String.fromCharCode(data[i]);

    return pathname;
  }

  public archive_entry_filetype(handle: number): number {
    return this._native.archive_entry_filetype(handle);
  }

  public archive_entry_size(handle: number): number {
    const lo = this._native.archive_entry_size_lo(handle);
    const hi = this._native.archive_entry_size_hi(handle);
    return hi * 4294967296 + lo;
  }

  public static async instantiate(buffer: Buffer): Promise<ArchiveContext> {
    let memory: WebAssembly.Memory;
    const clients = new ArchiveClallbacks;

    const archive_open_handler = (handle: number): number => {
      const client = clients.get(handle);
      return client.opener ? client.opener() : 0;
    }

    let readBuffer = new Uint8Array;
    const archive_read_handler = (handle: number, offset: number, size: number): number => {
      if (!readBuffer.length) {
        const client = clients.get(handle) as ArchiveReadCalbacks;
        if (!client.reader)
          return 0;
        const buf = client.reader();
        if (!buf)
          return 0;
        readBuffer = new Uint8Array(buf);
      }

      const n = Math.min(size, readBuffer.length);
      const dst = new Uint8Array(memory.buffer, offset, n);
      for (let i = 0; i < n; i++)
        dst[i] = readBuffer[i];

      readBuffer = readBuffer.slice(n);
      return n;
    }

    const archive_write_handler = (handle: number, offset: number, size: number): number => {
      return size;
    };

    const archive_close_handler = (handle: number): number => {
      const client = clients.get(handle);
      return client.closer ? client.closer() : 0;
    }

    const importObject = {
      env: {
        archive_open_handler,
        archive_read_handler,
        archive_write_handler,
        archive_close_handler,
      },
    };

    const instSource = await WebAssembly.instantiate(buffer, importObject);
    const native = instSource.instance.exports as ArchiveNative;
    memory = native.memory;
    return new ArchiveContext(native, memory, clients);
  }
};
