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
  private _byteOffset: number;
  private _byteLength: number;

  public constructor(context: ArchiveContext, byteOffset: number, byteLength: number) {
    this._context = context;
    this._byteOffset = byteOffset;
    this._byteLength = byteLength;
  }

  public release() {
    this._context.archive_buffer_free(this._byteOffset);
  }

  get buffer(): ArrayBuffer {
    return this._context.memoryBuffer;
  }

  get byteOffset(): number {
    return this._byteOffset;
  }

  get byteLength(): number {
    return this._byteLength;
  }
};
