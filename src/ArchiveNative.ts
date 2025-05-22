/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export type ArchiveEntryHandle = number;

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
  archive_read_next_header(handle: number): ArchiveEntryHandle;
  archive_read_last_error(handle: number): number;
  archive_read_data(handle: number): number;
  archive_read_data_offset(handle: number): number;
  archive_read_data_skip(handle: number): number;

  archive_write_new(): number;
  archive_write_free(handle: number): void;
  archive_write_set_format_zip(handle: number): number;
  archive_write_open(handle: number): number;
  archive_write_header(handle: number, entry: ArchiveEntryHandle): number;

  archive_entry_new(): ArchiveEntryHandle;
  archive_entry_free(handle: ArchiveEntryHandle): void;
  archive_entry_pathname_w(handle: ArchiveEntryHandle): number;
  archive_entry_filetype(handle: ArchiveEntryHandle): number;
  archive_entry_size_lo(handle: ArchiveEntryHandle): number;
  archive_entry_size_hi(handle: ArchiveEntryHandle): number;
};
