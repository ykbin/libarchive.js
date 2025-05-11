/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

#include <wasmux/compiler.h>

#include <stdlib.h>

#include <archive.h>
#include <archive_entry.h>

struct archive_read_wrapper {
  struct archive* impl;
  struct archive_entry* entry;
  uint8_t inputBuffer[4092];
  uint8_t outputBuffer[512];
};

__ATTR_IMPORT_NAME("env", "archive_open_handler")
int __archive_open_handler(struct archive_read_wrapper* arch);

__ATTR_IMPORT_NAME("env", "archive_read_handler")
int __archive_read_handler(struct archive_read_wrapper* arch, void* buffer, unsigned size);

__ATTR_IMPORT_NAME("env", "archive_close_handler")
int __archive_close_handler(struct archive_read_wrapper* arch);

__ATTR_EXPORT_NAME("archive_version")
const char* __archive_version()
{
  return ARCHIVE_VERSION_ONLY_STRING;
}

__ATTR_EXPORT_NAME("archive_version_details")
const char* __archive_version_details()
{
  return archive_version_details();
}

__ATTR_EXPORT_NAME("archive_errno")
int __archive_errno(struct archive_read_wrapper* arch)
{
  return archive_errno(arch->impl);
}

__ATTR_EXPORT_NAME("archive_error_string")
const char* __archive_error_string(struct archive_read_wrapper* arch)
{
  return archive_error_string(arch->impl);
}

__ATTR_EXPORT_NAME("archive_read_new")
struct archive_read_wrapper* __archive_read_new(void)
{
  struct archive_read_wrapper* arch;
  
  arch = reinterpret_cast<archive_read_wrapper*>(malloc(sizeof(archive_read_wrapper)));
  if (!arch)
    return nullptr;

  arch->impl = archive_read_new();
  if (!arch->impl) {
    free(arch);
    return nullptr;
  }

  arch->entry = nullptr;

  return arch;
}

__ATTR_EXPORT_NAME("archive_read_free")
void __archive_read_free(struct archive_read_wrapper* arch)
{
  archive_read_free(arch->impl);
  free(arch->impl);
}

__ATTR_EXPORT_NAME("archive_read_support_filter_all")
void __archive_read_support_filter_all(struct archive_read_wrapper* arch)
{
  archive_read_support_filter_all(arch->impl);
}

__ATTR_EXPORT_NAME("archive_read_support_format_all")
void __archive_read_support_format_all(struct archive_read_wrapper* arch)
{
  archive_read_support_format_all(arch->impl);
}

static int archive_on_open(struct archive* impl, void* userdata)
{
  struct archive_read_wrapper* arch = reinterpret_cast<struct archive_read_wrapper*>(userdata);
  return __archive_open_handler(arch);
}

static la_ssize_t	archive_on_read(struct archive* impl, void* userdata, const void** _buffer)
{
  struct archive_read_wrapper* arch = reinterpret_cast<struct archive_read_wrapper*>(userdata);
  *_buffer = arch->inputBuffer;
  return __archive_read_handler(arch, arch->inputBuffer, sizeof(arch->inputBuffer));
}

static int archive_on_close(struct archive* impl, void* userdata)
{
  struct archive_read_wrapper* arch = reinterpret_cast<struct archive_read_wrapper*>(userdata);
  return __archive_close_handler(arch);
}

__ATTR_EXPORT_NAME("archive_read_open")
int __archive_read_open(struct archive_read_wrapper* arch, unsigned open_id, unsigned read_id, unsigned close_id)
{
  return archive_read_open(arch->impl, arch, &archive_on_open, &archive_on_read, &archive_on_close);
}

__ATTR_EXPORT_NAME("archive_read_close")
int __archive_read_close(struct archive_read_wrapper* arch)
{
  return archive_read_close(arch->impl);
}

__ATTR_EXPORT_NAME("archive_read_next_header")
int __archive_read_next_header(struct archive_read_wrapper* arch)
{
  return archive_read_next_header(arch->impl, &arch->entry);
}

__ATTR_EXPORT_NAME("archive_read_data")
int __archive_read_data(struct archive_read_wrapper* arch)
{
  return archive_read_data(arch->impl, arch->outputBuffer, sizeof(arch->outputBuffer));
}

__ATTR_EXPORT_NAME("archive_read_data_offset")
const uint8_t* __archive_read_data_offset(struct archive_read_wrapper* arch)
{
  return arch->outputBuffer;
}

__ATTR_EXPORT_NAME("archive_read_data_skip")
int __archive_read_data_skip(struct archive_read_wrapper* arch)
{
  return archive_read_data_skip(arch->impl);
}

__ATTR_EXPORT_NAME("archive_entry_pathname_w")
const wchar_t* __archive_entry_pathname_w(struct archive_read_wrapper* arch)
{
  return archive_entry_pathname_w(arch->entry);
}

__ATTR_EXPORT_NAME("archive_entry_filetype")
int __archive_entry_filetype(struct archive_read_wrapper* arch)
{
  return archive_entry_filetype(arch->entry);
}

__ATTR_EXPORT_NAME("archive_entry_size_lo")
unsigned __archive_entry_size_lo(struct archive_read_wrapper* arch)
{
  return archive_entry_size(arch->entry) & 0xffffffff;
}

__ATTR_EXPORT_NAME("archive_entry_size_hi")
unsigned __archive_entry_size_hi(struct archive_read_wrapper* arch)
{
  return archive_entry_size(arch->entry) >> 32;
}
