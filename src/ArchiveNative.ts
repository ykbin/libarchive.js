/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export type ArchiveReadPtr = number;
export type ArchiveWritePtr = number;
export type ArchiveEntryPtr = number;

export interface ArchiveNative extends WebAssembly.Exports {
  readonly memory: WebAssembly.Memory;

  archive_version(): number;
  archive_version_details(): number;

  archive_errno(handle: number): number;
  archive_error_string(handle: number): number;

  archive_read_new(): ArchiveReadPtr;
  archive_read_free(ar: ArchiveReadPtr): void;
  archive_read_support_filter_all(ar: ArchiveReadPtr): void;
  archive_read_support_format_all(ar: ArchiveReadPtr): void;
  archive_read_open(ar: ArchiveReadPtr): number;
  archive_read_close(ar: ArchiveReadPtr): number;
  archive_read_next_header(ar: ArchiveReadPtr): ArchiveEntryPtr;
  archive_read_last_error(ar: ArchiveReadPtr): number;
  archive_read_data(ar: ArchiveReadPtr, offset: number, length: number): number;
  archive_read_data_skip(ar: ArchiveReadPtr): number;

  archive_write_new(): ArchiveWritePtr;
  archive_write_free(aw: ArchiveWritePtr): void;
  archive_write_set_format_by_name(aw: ArchiveWritePtr, name: number): number;
  archive_write_add_filter_by_name(aw: ArchiveWritePtr, name: number): number;
  archive_write_set_format_filter_by_ext(aw: ArchiveWritePtr, filename: number): number;
  archive_write_open(aw: ArchiveWritePtr): number;
  archive_write_close(aw: ArchiveWritePtr): number;
  archive_write_header(aw: ArchiveWritePtr, entry: ArchiveEntryPtr): number;
  archive_write_data(aw: ArchiveWritePtr, offset: number, length: number): number;

  archive_entry_new(): ArchiveEntryPtr;
  archive_entry_free(entry: ArchiveEntryPtr): void;
  archive_entry_pathname_utf8(entry: ArchiveEntryPtr): number;
  archive_entry_pathname_w(entry: ArchiveEntryPtr): number;
  archive_entry_set_pathname_utf8(entry: ArchiveEntryPtr, name: number): void;
  archive_entry_filetype(entry: ArchiveEntryPtr): number;
  archive_entry_set_filetype(entry: ArchiveEntryPtr, filetype: number): void;
  archive_entry_size_lo(entry: ArchiveEntryPtr): number;
  archive_entry_size_hi(entry: ArchiveEntryPtr): number;
  archive_entry_set_size(entry: ArchiveEntryPtr, hi: number, lo: number): void;

  archive_buffer_new(length: number): number;
  archive_buffer_free(offset: number): void;
};
