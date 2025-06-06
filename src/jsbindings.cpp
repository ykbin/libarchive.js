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
#include <locale.h>

#include <archive.h>
#include <archive_entry.h>

struct archive_base_wrapper {
  struct archive* archive;
};

struct archive_read_wrapper {
  struct archive_base_wrapper base;
  int last_error;
  uint8_t buffer[10240];
};

struct archive_write_wrapper {
  struct archive_base_wrapper base;
};

__ATTR_IMPORT_NAME("env", "archive_open_handler")
int __archive_open_handler(struct archive_base_wrapper* arch);

__ATTR_IMPORT_NAME("env", "archive_read_handler")
int __archive_read_handler(struct archive_base_wrapper* arch, void* buffer, unsigned size);

__ATTR_IMPORT_NAME("env", "archive_write_handler")
int __archive_write_handler(struct archive_base_wrapper* arch, const void* buffer, unsigned size);

__ATTR_IMPORT_NAME("env", "archive_close_handler")
int __archive_close_handler(struct archive_base_wrapper* arch);

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

__ATTR_EXPORT_NAME("archive_setlocale")
const char* __archive_setlocale(const char* name)
{
  return setlocale(LC_ALL, name);
}

__ATTR_EXPORT_NAME("archive_errno")
int __archive_errno(struct archive_read_wrapper* arch)
{
  return archive_errno(arch->base.archive);
}

__ATTR_EXPORT_NAME("archive_error_string")
const char* __archive_error_string(struct archive_read_wrapper* arch)
{
  return archive_error_string(arch->base.archive);
}

__ATTR_EXPORT_NAME("archive_read_new")
struct archive_read_wrapper* __archive_read_new(void)
{
  struct archive_read_wrapper* arch;
  
  arch = reinterpret_cast<archive_read_wrapper*>(malloc(sizeof(archive_read_wrapper)));
  if (!arch)
    return nullptr;

  arch->base.archive = archive_read_new();
  if (!arch->base.archive) {
    free(arch);
    return nullptr;
  }

  arch->last_error = ARCHIVE_OK;
  return arch;
}

__ATTR_EXPORT_NAME("archive_read_free")
void __archive_read_free(struct archive_read_wrapper* arch)
{
  archive_read_free(arch->base.archive);
  free(arch);
}

__ATTR_EXPORT_NAME("archive_read_support_filter_all")
void __archive_read_support_filter_all(struct archive_read_wrapper* arch)
{
  archive_read_support_filter_all(arch->base.archive);
}

__ATTR_EXPORT_NAME("archive_read_support_format_all")
void __archive_read_support_format_all(struct archive_read_wrapper* arch)
{
  archive_read_support_format_all(arch->base.archive);
}

__ATTR_EXPORT_NAME("archive_read_add_passphrase")
int __archive_read_add_passphrase(struct archive_read_wrapper* arch, const char* passphrase)
{
  return archive_read_add_passphrase(arch->base.archive, passphrase);
}

static int archive_on_open(struct archive* a, void* userdata)
{
  auto arch = reinterpret_cast<struct archive_base_wrapper*>(userdata);
  return __archive_open_handler(arch);
}

static la_ssize_t	archive_on_read(struct archive* a, void* userdata, const void** buffer)
{
  auto arch = reinterpret_cast<struct archive_read_wrapper*>(userdata);
  *buffer = arch->buffer;
  return __archive_read_handler(&arch->base, arch->buffer, sizeof(arch->buffer));
}

static la_ssize_t	archive_on_write(struct archive* a, void* userdata, const void* buffer, size_t length)
{
  auto arch = reinterpret_cast<struct archive_base_wrapper*>(userdata);
  return __archive_write_handler(arch, buffer, length);
}

static int archive_on_close(struct archive* a, void* userdata)
{
  auto arch = reinterpret_cast<struct archive_base_wrapper*>(userdata);
  return __archive_close_handler(arch);
}

__ATTR_EXPORT_NAME("archive_read_open")
int __archive_read_open(struct archive_read_wrapper* arch)
{
  return archive_read_open2(arch->base.archive, &arch->base, &archive_on_open, &archive_on_read, nullptr, &archive_on_close);
}

__ATTR_EXPORT_NAME("archive_read_close")
int __archive_read_close(struct archive_read_wrapper* arch)
{
  return archive_read_close(arch->base.archive);
}

__ATTR_EXPORT_NAME("archive_read_next_header")
struct archive_entry* __archive_read_next_header(struct archive_read_wrapper* arch)
{
  struct archive_entry* entry;
  arch->last_error = archive_read_next_header(arch->base.archive, &entry);
  if (arch->last_error == ARCHIVE_OK)
    return entry;
  if (arch->last_error == ARCHIVE_EOF)
    arch->last_error = ARCHIVE_OK;
  return nullptr;
}

__ATTR_EXPORT_NAME("archive_read_last_error")
int __archive_read_last_error(struct archive_read_wrapper* arch)
{
  return arch->last_error;
}

__ATTR_EXPORT_NAME("archive_read_data")
int __archive_read_data(struct archive_read_wrapper* arch, void* buffer, unsigned size)
{
  return archive_read_data(arch->base.archive, buffer, size);
}

__ATTR_EXPORT_NAME("archive_read_data_skip")
int __archive_read_data_skip(struct archive_read_wrapper* arch)
{
  return archive_read_data_skip(arch->base.archive);
}

__ATTR_EXPORT_NAME("archive_write_new")
struct archive_write_wrapper* __archive_write_new(void)
{
  auto arch = reinterpret_cast<archive_write_wrapper*>(malloc(sizeof(archive_write_wrapper)));
  if (!arch)
    return nullptr;

  arch->base.archive = archive_write_new();
  if (!arch->base.archive) {
    free(arch);
    return nullptr;
  }

  return arch;
}

__ATTR_EXPORT_NAME("archive_write_free")
void __archive_write_free(struct archive_write_wrapper* arch)
{
  archive_write_free(arch->base.archive);
  free(arch);
}

__ATTR_EXPORT_NAME("archive_write_set_options")
int __archive_write_set_options(struct archive_write_wrapper* arch, const char* options)
{
  return archive_write_set_options(arch->base.archive, options);
}

__ATTR_EXPORT_NAME("archive_write_set_passphrase")
int __archive_write_set_passphrase(struct archive_write_wrapper* arch, const char* passphrase)
{
  return archive_write_set_passphrase(arch->base.archive, passphrase);
}

__ATTR_EXPORT_NAME("archive_write_set_format_by_name")
int __archive_write_set_format_by_name(struct archive_write_wrapper* arch, const char* name)
{
  return archive_write_set_format_by_name(arch->base.archive, name);
}

__ATTR_EXPORT_NAME("archive_write_add_filter_by_name")
int __archive_write_add_filter_by_name(struct archive_write_wrapper* arch, const char* name)
{
  return archive_write_add_filter_by_name(arch->base.archive, name);
}

__ATTR_EXPORT_NAME("archive_write_set_format_filter_by_ext")
int __archive_write_set_format_filter_by_ext(struct archive_write_wrapper* arch, const char* filename)
{
  return archive_write_set_format_filter_by_ext_def(arch->base.archive, filename, ".zip");
}

__ATTR_EXPORT_NAME("archive_write_open")
int __archive_write_open(struct archive_write_wrapper* arch)
{
  return archive_write_open2(arch->base.archive, &arch->base, &archive_on_open, &archive_on_write, &archive_on_close, nullptr);
}

__ATTR_EXPORT_NAME("archive_write_close")
int __archive_write_close(struct archive_write_wrapper* arch)
{
  return archive_write_close(arch->base.archive);
}

__ATTR_EXPORT_NAME("archive_write_header")
int __archive_write_header(struct archive_write_wrapper* arch, struct archive_entry* entry)
{
  return archive_write_header(arch->base.archive, entry);
}

__ATTR_EXPORT_NAME("archive_write_data")
int __archive_write_data(struct archive_write_wrapper* arch, const void* buffer, unsigned size)
{
  return static_cast<int>(archive_write_data(arch->base.archive, buffer, size));
}

__ATTR_EXPORT_NAME("archive_entry_new")
struct archive_entry* __archive_entry_new()
{
  return archive_entry_new();
}

__ATTR_EXPORT_NAME("archive_entry_free")
void __archive_entry_free(struct archive_entry* entry)
{
  archive_entry_free(entry);
}

__ATTR_EXPORT_NAME("archive_entry_pathname")
const char* __archive_entry_pathname(struct archive_entry* entry)
{
  return archive_entry_pathname(entry);
}

__ATTR_EXPORT_NAME("archive_entry_pathname_w")
const wchar_t* __archive_entry_pathname_w(struct archive_entry* entry)
{
  return archive_entry_pathname_w(entry);
}

__ATTR_EXPORT_NAME("archive_entry_pathname_utf8")
const char* __archive_entry_pathname_utf8(struct archive_entry* entry)
{
  return archive_entry_pathname_utf8(entry);
}

__ATTR_EXPORT_NAME("archive_entry_size_lo")
unsigned __archive_entry_size_lo(struct archive_entry* entry)
{
  return archive_entry_size(entry) & 0xffffffff;
}

__ATTR_EXPORT_NAME("archive_entry_size_hi")
unsigned __archive_entry_size_hi(struct archive_entry* entry)
{
  return archive_entry_size(entry) >> 32;
}

__ATTR_EXPORT_NAME("archive_entry_set_size")
void __archive_entry_set_size(struct archive_entry* entry, unsigned hi, unsigned lo)
{
  archive_entry_set_size(entry, static_cast<la_int64_t>(hi) << 32 | lo);
}

__ATTR_EXPORT_NAME("archive_entry_size_is_set")
int __archive_entry_size_is_set(struct archive_entry* entry)
{
  return archive_entry_size_is_set(entry);
}

__ATTR_EXPORT_NAME("archive_entry_set_pathname_utf8")
void __archive_entry_set_pathname_utf8(struct archive_entry* entry, const char* name)
{
  archive_entry_set_pathname_utf8(entry, name);
}

__ATTR_EXPORT_NAME("archive_entry_mode")
unsigned __archive_entry_mode(struct archive_entry* entry)
{
  return archive_entry_mode(entry);
}

__ATTR_EXPORT_NAME("archive_entry_set_mode")
void __archive_entry_mode(struct archive_entry* entry, unsigned mode)
{
  archive_entry_set_mode(entry, mode);
}

__ATTR_EXPORT_NAME("archive_buffer_new")
void* __archive_buffer_new(unsigned size)
{
  return malloc(size);
}

__ATTR_EXPORT_NAME("archive_buffer_free")
void __archive_entry_free(void* buffer)
{
  free(reinterpret_cast<void*>(buffer));
}
