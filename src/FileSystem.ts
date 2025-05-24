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
import os from "node:os";

export function getScriptDirectory() {
  if (typeof __dirname !== 'undefined')
    return eval("__dirname");
  return null;
}

export namespace PathSep {

type SepPair =  [ first: string, second: string ];

let s_instance: {
  native: SepPair,
  win32: SepPair,
  posix:SepPair,
};

function getInstace() {
  if (!s_instance) {
    const win32: SepPair = [ path.win32.sep, path.posix.sep ];
    const posix: SepPair = [ path.posix.sep, path.win32.sep ];
    const native = (os.platform() === "win32") ? win32 : posix;
    s_instance = { native, win32, posix };
  }
  return s_instance;
}

export function representPathAsNative(inputPath: string) {
  const pair = getInstace().native;
  return inputPath.replaceAll(pair[1], pair[0]);
}

export function representPathAsPosix(inputPath: string) {
  const pair = getInstace().posix;
  return inputPath.replaceAll(pair[1], pair[0]);
}

export function representPathAsWin32(inputPath: string) {
  const pair = getInstace().win32;
  return inputPath.replaceAll(pair[1], pair[0]);
}

} // namespace

export class MkdirCache {
  private _dirSet = new Set<string>;
  
  public async mkdir(dirPath: string) {
    if (!this._dirSet.has(dirPath)) {
      await fs.promises.mkdir(dirPath, { recursive: true });
      this._dirSet.add(dirPath);
    }
  }
};

export interface FileStat {
  name: string;
  filepath: string;
  stat: fs.Stats;
};

async function getFileStatsImpl(result: FileStat[], filenames: string[], directory: string): Promise<FileStat[]> {
  for (const name of filenames) {
    const filepath = path.join(directory, PathSep.representPathAsNative(name));
    const stat = await fs.promises.stat(filepath);
    const item = { name, filepath, stat };
    result.push(item);
    if (stat.isDirectory()) {
      item.name += path.posix.sep;
      const items = (await fs.promises.readdir(filepath)).map(i => path.join(name, i));
      await getFileStatsImpl(result, items, directory);
    }
  }
  return result;
}

export async function getFileStats(filenames: string[], directory: string): Promise<FileStat[]> {
  return getFileStatsImpl([], filenames.map(i => PathSep.representPathAsPosix(i)), PathSep.representPathAsNative(directory));
}
