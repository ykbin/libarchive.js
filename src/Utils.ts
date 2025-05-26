/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ARCHIVE_OK, ARCHIVE_RETRY, ARCHIVE_WARN, ARCHIVE_FAILED, ARCHIVE_FATAL } from "./Archive";

export const NO_MEMORY = "No Memory";

export namespace StringExtras { 
export function fromBuffer(buffer: ArrayBuffer, offset: number, length?: number): string
{
  let bytes: Uint8Array;

  if (length === undefined) {
    length = 0;
    bytes = new Uint8Array(buffer, offset);
    while (bytes[length])
      length++;
  }

  bytes = new Uint8Array(buffer, offset, length);
  if (buffer instanceof SharedArrayBuffer) {
    const copyBytes = new Uint8Array(length);
    copyBytes.set(bytes);
    bytes = copyBytes;
  }

  return (new TextDecoder("utf-8")).decode(bytes);
}
} // namespace StringExtras

export function errorCodeToString(code: number): string
{
  switch (code) {
  case ARCHIVE_OK:
    return "ARCHIVE_OK";
  case ARCHIVE_RETRY:
    return "ARCHIVE_RETRY";
  case ARCHIVE_WARN:
    return "ARCHIVE_WARN";
  case ARCHIVE_FAILED:
    return "ARCHIVE_FAILED";
  case ARCHIVE_FATAL:
    return "ARCHIVE_FATAL";
  }

  if (code < 0)
    return "ARCHIVE_" + (-code);

  throw new Error(`Error code ${code} must be negative`);
}
