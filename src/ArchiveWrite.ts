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
import { ArchiveBase } from "./ArchiveBase";
import { ArchiveEntry } from "./ArchiveEntry";
import { ArchiveBuffer } from "./ArchiveBuffer";
import { NO_MEMORY, errorCodeToString } from "./Utils";

export class ArchiveWrite extends ArchiveBase implements IArchiveWrite {
  public constructor(context: ArchiveContext, archive: number) {
    super(context, archive);
  }

  public release() {
    this._context.archive_write_free(this._archive);
  }

  public set format(value: string) {
    const name = this._context.archive_buffer_from(value);
    if (!name) throw new Error(NO_MEMORY);
    const code = this._context.archive_write_set_format_by_name(this._archive, name);
    this._context.archive_buffer_free(name);
    if (code != ARCHIVE_OK) {
      throw new Error(this.errorString, { cause: errorCodeToString(code) });
    }
  }

  public set options(options: string) {
    const optionsPtr = this._context.archive_buffer_from(options);
    if (!optionsPtr) throw new Error(NO_MEMORY);
    const code = this._context.archive_write_set_options(this._archive, optionsPtr);
    this._context.archive_buffer_free(optionsPtr);
    if (code != ARCHIVE_OK) {
      throw new Error(this.errorString, { cause: errorCodeToString(code) });
    }
  }

  public set passphrase(passphrase: string) {
    const passphrasePtr = this._context.archive_buffer_from(passphrase);
    if (!passphrasePtr) throw new Error(NO_MEMORY);
    const code = this._context.archive_write_set_passphrase(this._archive, passphrasePtr);
    this._context.archive_buffer_free(passphrasePtr);
    if (code != ARCHIVE_OK) {
      throw new Error(this.errorString, { cause: errorCodeToString(code) });
    }
  }

  public addFilter(filter: string): void {
    const name = this._context.archive_buffer_from(filter);
    if (!name) throw new Error(NO_MEMORY);
    const code = this._context.archive_write_add_filter_by_name(this._archive, name);
    this._context.archive_buffer_free(name);
    if (code != ARCHIVE_OK) {
      throw new Error(this.errorString, { cause: errorCodeToString(code) });
    }
  }

  public setFormatFilterByExt(filename: string): void {
    const fname = this._context.archive_buffer_from(filename);
    if (!fname) throw new Error(NO_MEMORY);
    const code = this._context.archive_write_set_format_filter_by_ext(this._archive, fname);
    this._context.archive_buffer_free(fname);
    if (code != ARCHIVE_OK) {
      throw new Error(this.errorString, { cause: errorCodeToString(code) });
    }
  }

  public set onopen(callback: ArchiveOpenCallback) {
    this._context.archive_write_set_open_callback(this._archive, callback);
  }

  public set onwrite(callback: ArchiveWriteCallback) {
    this._context.archive_write_set_write_callback(this._archive, callback);
  }

  public set onclose(callback: ArchiveCloseCallback) {
    this._context.archive_write_set_open_callback(this._archive, callback);
  }

  public open(): void {
    const code = this._context.archive_write_open(this._archive);
    if (code !== ARCHIVE_OK) {
      throw new Error(this.errorString, { cause: errorCodeToString(code) });
    }
  }

  public close(): void {
    this._context.archive_write_close(this._archive);
  }

  public writeHeader(entry: ArchiveEntry): number {
    return this._context.archive_write_header(this._archive, entry.memoryOffset);
  }

  public writeData(buffer: ArchiveBuffer, offset?: number, length?: number): number {
    offset = buffer.byteOffset + (offset || 0);
    length = length || buffer.byteLength - offset;

    const n = this._context.archive_write_data(this._archive, offset, length);
    if (n < 0) {
      throw new Error(this.errorString, { cause: errorCodeToString(n) });
    }

    return n;
  }
};
