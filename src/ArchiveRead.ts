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
import { ArchiveBase } from "./ArchiveBase";
import { ArchiveEntry } from "./ArchiveEntry";
import { ArchiveBuffer } from "./ArchiveBuffer";
import { errorCodeToString, NO_MEMORY } from "./Utils";

export class ArchiveRead extends ArchiveBase implements IArchiveRead {
  public constructor(context: ArchiveContext, archive: number) {
    super(context, archive);
  }

  public release() {
    this._context.archive_read_free(this._archive);
  }

  public supportFilterAll(): void {
    return this._context.archive_read_support_filter_all(this._archive);
  }

  public supportFormatAll(): void {
    return this._context.archive_read_support_format_all(this._archive);
  }

  public addPassphrase(passphrase: string): void {
    const passphrasePtr = this._context.archive_buffer_from(passphrase);
    if (!passphrasePtr) throw new Error(NO_MEMORY);
    const code = this._context.archive_read_add_passphrase(this._archive, passphrasePtr);
    this._context.archive_buffer_free(passphrasePtr);
    if (code != ARCHIVE_OK) {
      throw new Error(this.errorString, { cause: errorCodeToString(code) });
    }
  }

  public open(): void {
    const code = this._context.archive_read_open(this._archive);
    if (code !== ARCHIVE_OK) {
      throw new Error(this.errorString, { cause: errorCodeToString(code) });
    }
  }

  public close(): void {
    this._context.archive_read_close(this._archive);
  }

  public nextHeader(): ArchiveEntry | undefined {
    const entry = this._context.archive_read_next_header(this._archive);
    if (entry)
      return new ArchiveEntry(this._context, entry);

    const code = this._context.archive_read_last_error(this._archive);
    if (code !== ARCHIVE_OK) {
      throw new Error(this.errorString, { cause: errorCodeToString(code) });
    }
  }

  public dataRead(buffer: ArchiveBuffer, offset?: number, length?: number): number {
    offset = buffer.byteOffset + (offset || 0);
    length = length || buffer.byteLength;

    const n = this._context.archive_read_data(this._archive, offset, length);
    if (n < 0) {
      throw new Error(this.errorString, { cause: errorCodeToString(n) });
    }
    
    return n;
  }

  public dataSkip(): number {
    return this._context.archive_read_data_skip(this._archive);
  }

  public set onopen(callback: ArchiveOpenCallback) {
    this._context.archive_read_set_open_callback(this._archive, callback);
  }

  public set onread(callback: ArchiveReadCallback) {
    this._context.archive_read_set_read_callback(this._archive, callback);
  }

  public set onclose(callback: ArchiveCloseCallback) {
    this._context.archive_read_set_close_callback(this._archive, callback);
  }
};
