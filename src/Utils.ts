/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ARCHIVE_OK, ARCHIVE_RETRY, ARCHIVE_WARN, ARCHIVE_FAILED, ARCHIVE_FATAL } from "./Archive";

export function utf8DataToString(buffer: ArrayBuffer, offset: number): string
{
  const bytes = new Uint8Array(buffer, offset);

  let length = 0;
  while (bytes[length])
    length++;

  const decoder = new TextDecoder;
  return decoder.decode(bytes.slice(0, length));
}

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
    return "ARCHIVE_ERROR_" + (-code);

  return "ARCHIVE_NUMBER_" + code;
}
