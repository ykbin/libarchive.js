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
import { NO_MEMORY, StringExtras } from "./Utils";

export class Archive implements IArchive {
  private _context: ArchiveContext;
  private _version = "";
  private _versionDetails = "";

  public constructor(context: ArchiveContext) {
    this._context = context;
  }

  public get version(): string {
    if (!this._version) {
      const versionPtr = this._context.archive_version();
      this._version = StringExtras.fromBuffer(this._context.memoryBuffer, versionPtr);
    }
    return this._version;
  }

  public get versionDetails(): string {
    if (!this._versionDetails) {
      const versionDetailsPtr = this._context.archive_version_details();
      this._versionDetails = StringExtras.fromBuffer(this._context.memoryBuffer, versionDetailsPtr);
    }
    return this._versionDetails;
  }

  public setlocale(name: string): string | undefined {
    const namePtr = this._context.archive_buffer_from(name);
    if (!namePtr) throw new Error(NO_MEMORY);
    const resultPtr = this._context.archive_setlocale(namePtr);
    if (resultPtr)
      return StringExtras.fromBuffer(this._context.memoryBuffer, resultPtr);
  }

  public newRead(): ArchiveRead {
    const archive_read = this._context.archive_read_new();
    if (!archive_read)
      throw new Error(NO_MEMORY);
    return new ArchiveRead(this._context, archive_read);
  }

  public newWrite(): ArchiveWrite {
    const archive_write = this._context.archive_write_new();
    if (!archive_write)
      throw new Error(NO_MEMORY);
    return new ArchiveWrite(this._context, archive_write);
  }

  public newEntry(): ArchiveEntry {
    const entry = this._context.archive_entry_new();
    if (!entry)
      throw new Error(NO_MEMORY);
    return new ArchiveEntry(this._context, entry);
  }

  public newBuffer(length: number): ArchiveBuffer {
    const offset = this._context.archive_buffer_new(length);
    if (!offset)
      throw new Error(NO_MEMORY);
    return new ArchiveBuffer(this._context, offset, length);
  }

  public static async instantiate(buffer: Buffer | ArrayBuffer): Promise<Archive> {
    let context: ArchiveContext;

    const importObject = {
      env: {
        archive_open_handler: (archive: number) => context.archive_open_handler(archive),
        archive_read_handler: (archive: number, offset: number, size: number) => context.archive_read_handler(archive, offset, size),
        archive_write_handler: (archive: number, offset: number, size: number) => context.archive_write_handler(archive, offset, size),
        archive_close_handler: (archive: number) => context.archive_close_handler(archive),
      },
    };

    const instSource = await WebAssembly.instantiate(buffer, importObject);
    const native = instSource.instance.exports as ArchiveNative;
    context = new ArchiveContext(native, native.memory);

    return new Archive(context);
  }
};
