/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ArchiveContext } from "./ArchiveContext";
import { StringExtras } from "./Utils";

export abstract class ArchiveBase {
  protected _context: ArchiveContext;
  protected _archive: number;

  protected constructor(context: ArchiveContext, archive: number) {
    this._context = context;
    this._archive = archive;
  }

  public abstract release(): void;

  public get memoryOffset() {
    return this._archive;
  }

  public get errno(): number {
    return this._context.archive_errno(this._archive);
  }

  public get errorString(): string {
    const offset = this._context.archive_error_string(this._archive);
    return StringExtras.fromBuffer(this._context.memoryBuffer, offset);
  }

  // handleEvent
  // addEventListner
  // removeEventListener
};
