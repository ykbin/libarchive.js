/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ArchiveRead, ArchiveContext } from "./Archive";
import { ArchiveNative } from "./ArchiveNative";
import { ArchiveReadClient, ArchiveReadImpl } from "./ArchiveRead";
import { utf8DataToString } from "./Utils";

class ArchiveReadClientCollection {
  private _map = new Map<number, ArchiveReadClient>;

  public get(handle: number) {
    const archive = this._map.get(handle);
    if (!archive)
      throw Error(`Handle ${handle} does not exists`);
    return archive;
  }

  public set(handle: number, archive: ArchiveReadClient) {
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

export class ArchiveContextImpl implements ArchiveContext {
  private _native: ArchiveNative;
  private _memory: WebAssembly.Memory;
  private _clients: ArchiveReadClientCollection;
  private _version = "";
  private _versionDetails = "";

  constructor(native: ArchiveNative, memory: WebAssembly.Memory, clients: ArchiveReadClientCollection) {
    this._native = native;
    this._memory = memory;
    this._clients = clients;
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

  public newRead(): ArchiveRead {
    const handle = this._native.archive_read_new();
    const client = {
      buffers: [],
      opener: null,
      reader: null,
      closer: null,
    };
    this._clients.set(handle, client);
    return new ArchiveReadImpl(this._native, this._memory, client, handle);
  }

  public static async instantiate(buffer: Buffer): Promise<ArchiveContextImpl> {
    let memory: WebAssembly.Memory;
    const clients = new ArchiveReadClientCollection;

    const archive_open_handler = (handle: number): number => {
      const client = clients.get(handle);
      return client.opener ? client.opener() : 0;
    }

    let readBuffer = new Uint8Array;
    const archive_read_handler = (handle: number, offset: number, size: number): number => {
      if (!readBuffer.length) {
        const client = clients.get(handle);
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

    const archive_close_handler = (handle: number): number => {
      const client = clients.get(handle);
      return client.closer ? client.closer() : 0;
    }

    const importObject = {
      env: {
        archive_open_handler,
        archive_read_handler,
        archive_close_handler,
      },
    };

    const instSource = await WebAssembly.instantiate(buffer, importObject);
    const native = instSource.instance.exports as ArchiveNative;
    memory = native.memory;
    return new ArchiveContextImpl(native, memory, clients);
  }
};
