/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export interface ArchiveNative extends WebAssembly.Exports {
  readonly memory: WebAssembly.Memory;

  archive_version(): number;
  archive_version_details(): number;

  archive_errno(handle: number): number;
  archive_error_string(handle: number): number;

  archive_read_new(): number;
  archive_read_free(handle: number): void;
  archive_read_support_filter_all(handle: number): void;
  archive_read_support_format_all(handle: number): void;
  archive_read_open(handle: number): number;
  archive_read_close(handle: number): number;
  archive_read_next_header(handle: number): number;
  archive_read_data(handle: number): number;
  archive_read_data_offset(handle: number): number;
  archive_read_data_skip(handle: number): number;

  archive_entry_pathname_w(handle: number): number;
  archive_entry_filetype(handle: number): number;
  archive_entry_size_lo(handle: number): number;
  archive_entry_size_hi(handle: number): number;
};
