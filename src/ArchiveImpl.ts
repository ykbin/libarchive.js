/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IArchive } from "./Archive";
import { ArchiveNative } from "./ArchiveNative";
import { ArchiveContext } from "./ArchiveContext";
import { ArchiveBuffer } from "./ArchiveBuffer";
import { ArchiveEntry } from "./ArchiveEntry";
import { ArchiveRead } from "./ArchiveRead";
import { ArchiveWrite } from "./ArchiveWrite";

export class Archive implements IArchive {
  private _context: ArchiveContext;
  private _version = "";
  private _versionDetails = "";

  public constructor(context: ArchiveContext) {
    this._context = context;
  }

  public get version(): string {
    if (!this._version)
      this._version = this._context.archive_version();
    return this._version;
  }

  public get versionDetails(): string {
    if (!this._versionDetails)
      this._versionDetails = this._context.archive_version_details();
    return this._versionDetails;
  }

  public newRead(): ArchiveRead {
    const archive_read = this._context.archive_read_new();
    if (!archive_read)
      throw new Error("No Memory");
    return new ArchiveRead(this._context, archive_read);
  }

  public newWrite(): ArchiveWrite {
    const archive_write = this._context.archive_write_new();
    if (!archive_write)
      throw new Error("No Memory");
    return new ArchiveWrite(this._context, archive_write);
  }

  public newEntry(): ArchiveEntry {
    const entry = this._context.archive_entry_new();
    if (!entry)
      throw new Error("No Memory");
    return new ArchiveEntry(this._context, entry);
  }

  public newBuffer(length: number): ArchiveBuffer {
    const offset = this._context.archive_buffer_new(length);
    if (!offset)
      throw new Error("No Memory");
    return new ArchiveBuffer(this._context, offset, length);
  }

  public static async instantiate(buffer: Buffer | ArrayBuffer): Promise<Archive> {
    let context: ArchiveContext;

    const importObject = {
      env: {
        archive_open_handler: (handle: number) => context.archive_open_handler(handle),
        archive_read_handler: (handle: number, offset: number, size: number) => context.archive_read_handler(handle, offset, size),
        archive_write_handler: (handle: number, offset: number, size: number) => context.archive_write_handler(handle, offset, size),
        archive_close_handler: (handle: number) => context.archive_close_handler(handle),
      },
    };

    const instSource = await WebAssembly.instantiate(buffer, importObject);
    const native = instSource.instance.exports as ArchiveNative;
    context = new ArchiveContext(native, native.memory);

    return new Archive(context);
  }
};
