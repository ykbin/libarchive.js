/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export type StringPtr = number;
export type ArchivePtr = number;
export type ArchiveEntryPtr = number;

export interface ArchiveNative extends WebAssembly.Exports {
  readonly memory: WebAssembly.Memory;

  archive_version(): StringPtr;
  archive_version_details(): StringPtr;
  archive_setlocale(name: StringPtr): StringPtr;

  archive_errno(archive: number): number;
  archive_error_string(archive: number): StringPtr;

  archive_read_new(): ArchivePtr;
  archive_read_free(archive: ArchivePtr): void;
  archive_read_support_filter_all(archive: ArchivePtr): void;
  archive_read_support_format_all(archive: ArchivePtr): void;
  archive_read_add_passphrase(archive: ArchivePtr, passphrase: number): number;
  archive_read_open(archive: ArchivePtr): number;
  archive_read_close(archive: ArchivePtr): number;
  archive_read_next_header(archive: ArchivePtr): ArchiveEntryPtr;
  archive_read_last_error(archive: ArchivePtr): number;
  archive_read_data(archive: ArchivePtr, offset: number, length: number): number;
  archive_read_data_skip(archive: ArchivePtr): number;

  archive_write_new(): ArchivePtr;
  archive_write_free(archive: ArchivePtr): void;
  archive_write_set_options(archive: ArchivePtr, options: StringPtr): number;
  archive_write_set_passphrase(archive: ArchivePtr, passphrase: StringPtr): number;
  archive_write_set_format_by_name(archive: ArchivePtr, name: StringPtr): number;
  archive_write_add_filter_by_name(archive: ArchivePtr, name: StringPtr): number;
  archive_write_set_format_filter_by_ext(archive: ArchivePtr, filename: StringPtr): number;
  archive_write_open(archive: ArchivePtr): number;
  archive_write_close(archive: ArchivePtr): number;
  archive_write_header(archive: ArchivePtr, entry: ArchiveEntryPtr): number;
  archive_write_data(archive: ArchivePtr, offset: number, length: number): number;

  archive_entry_new(): ArchiveEntryPtr;
  archive_entry_free(entry: ArchiveEntryPtr): void;
  archive_entry_pathname(entry: ArchiveEntryPtr): number;
  archive_entry_pathname_w(entry: ArchiveEntryPtr): number;
  archive_entry_pathname_utf8(entry: ArchiveEntryPtr): number;
  archive_entry_set_pathname_utf8(entry: ArchiveEntryPtr, pathname: StringPtr): void;
  archive_entry_size_lo(entry: ArchiveEntryPtr): number;
  archive_entry_size_hi(entry: ArchiveEntryPtr): number;
  archive_entry_set_size(entry: ArchiveEntryPtr, hi: number, lo: number): void;
  archive_entry_size_is_set(entry: ArchiveEntryPtr): number;
  archive_entry_mode(entry: ArchiveEntryPtr): number;
  archive_entry_set_mode(entry: ArchiveEntryPtr, mode: number): void;

  archive_buffer_new(length: number): number;
  archive_buffer_free(offset: number): void;
};
