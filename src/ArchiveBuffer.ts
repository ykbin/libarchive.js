/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IArchiveBuffer } from "./Archive";
import { ArchiveContext } from "./ArchiveContext";

export class ArchiveBuffer implements IArchiveBuffer {
  private _context: ArchiveContext;
  private _offset: number;
  private _length: number;

  public constructor(context: ArchiveContext, offset: number, length: number) {
    this._context = context;
    this._offset = offset;
    this._length = length;
  }

  public release() {
    this._context.archive_buffer_free(this._offset);
  }

  dataView() {
    return new DataView(this._context.memory.buffer, this._offset, this._length);
  }

  get offset() {
    return this._offset;
  }

  get length(): number {
    return this._length;
  }
};
