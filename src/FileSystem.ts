/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import path from "node:path";
import fs from "node:fs";

export function getScriptDirectory() {
  if (typeof __dirname !== 'undefined')
    return eval("__dirname");
  return null;
}

export class PathSep {
  private _nativeSep: string;
  private _otherSep: string;

  public constructor(nativeSep: string, otherSep: string) {
    this._nativeSep = nativeSep;
    this._otherSep = otherSep;
  }

  public get sep() {
    return this._nativeSep;
  }

  public representPath(inputPath: string) {
    return inputPath.replaceAll(this._otherSep, this._nativeSep);
  }

  public static fromPath(nativePath: string) {
    if (nativePath.includes(path.win32.sep))
      return new PathSep(path.win32.sep, path.posix.sep);
    return new PathSep(path.posix.sep, path.win32.sep);
  }
};

export class MkdirCache {
  private _dirSet = new Set<string>;
  
  public async mkdir(dirPath: string) {
    if (!this._dirSet.has(dirPath)) {
      await fs.promises.mkdir(dirPath, { recursive: true });
      this._dirSet.add(dirPath);
    }
  }
};
