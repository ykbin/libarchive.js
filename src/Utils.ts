/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export function utf8DataToString(buffer: ArrayBuffer, offset: number): string
{
  const bytes = new Uint8Array(buffer, offset);

  let length = 0;
  while (bytes[length])
    length++;

  const decoder = new TextDecoder;
  return decoder.decode(bytes.slice(0, length));
}
