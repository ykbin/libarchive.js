(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["libarchive"] = factory();
	else
		root["libarchive"] = factory();
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Archive.ts":
/*!************************!*\
  !*** ./src/Archive.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AE_IFBLK: () => (/* binding */ AE_IFBLK),
/* harmony export */   AE_IFCHR: () => (/* binding */ AE_IFCHR),
/* harmony export */   AE_IFDIR: () => (/* binding */ AE_IFDIR),
/* harmony export */   AE_IFIFO: () => (/* binding */ AE_IFIFO),
/* harmony export */   AE_IFLNK: () => (/* binding */ AE_IFLNK),
/* harmony export */   AE_IFMT: () => (/* binding */ AE_IFMT),
/* harmony export */   AE_IFREG: () => (/* binding */ AE_IFREG),
/* harmony export */   AE_IFSOCK: () => (/* binding */ AE_IFSOCK),
/* harmony export */   ARCHIVE_FAILED: () => (/* binding */ ARCHIVE_FAILED),
/* harmony export */   ARCHIVE_FATAL: () => (/* binding */ ARCHIVE_FATAL),
/* harmony export */   ARCHIVE_OK: () => (/* binding */ ARCHIVE_OK),
/* harmony export */   ARCHIVE_RETRY: () => (/* binding */ ARCHIVE_RETRY),
/* harmony export */   ARCHIVE_WARN: () => (/* binding */ ARCHIVE_WARN)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
const ARCHIVE_OK = 0;
const ARCHIVE_RETRY = -10;
const ARCHIVE_WARN = -20;
const ARCHIVE_FAILED = -25;
const ARCHIVE_FATAL = -30;
const AE_IFMT = 0xf000;
const AE_IFREG = 0x8000;
const AE_IFLNK = 0xa000;
const AE_IFSOCK = 0xc000;
const AE_IFCHR = 0x2000;
const AE_IFBLK = 0x6000;
const AE_IFDIR = 0x4000;
const AE_IFIFO = 0x1000;
;
;
;
;
;
;
;


/***/ }),

/***/ "./src/ArchiveBase.ts":
/*!****************************!*\
  !*** ./src/ArchiveBase.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArchiveBase: () => (/* binding */ ArchiveBase)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

class ArchiveBase {
    _context;
    _archive;
    constructor(context, archive) {
        this._context = context;
        this._archive = archive;
    }
    get memoryOffset() {
        return this._archive;
    }
    get errno() {
        return this._context.archive_errno(this._archive);
    }
    get errorString() {
        const offset = this._context.archive_error_string(this._archive);
        return _Utils__WEBPACK_IMPORTED_MODULE_0__.StringExtras.fromBuffer(this._context.memoryBuffer, offset);
    }
}
;


/***/ }),

/***/ "./src/ArchiveBuffer.ts":
/*!******************************!*\
  !*** ./src/ArchiveBuffer.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArchiveBuffer: () => (/* binding */ ArchiveBuffer)
/* harmony export */ });
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
class ArchiveBuffer {
    _context;
    _byteOffset;
    _byteLength;
    constructor(context, byteOffset, byteLength) {
        this._context = context;
        this._byteOffset = byteOffset;
        this._byteLength = byteLength;
    }
    release() {
        this._context.archive_buffer_free(this._byteOffset);
    }
    get buffer() {
        return this._context.memoryBuffer;
    }
    get byteOffset() {
        return this._byteOffset;
    }
    get byteLength() {
        return this._byteLength;
    }
}
;


/***/ }),

/***/ "./src/ArchiveContext.ts":
/*!*******************************!*\
  !*** ./src/ArchiveContext.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArchiveContext: () => (/* binding */ ArchiveContext)
/* harmony export */ });
/* harmony import */ var _ArchiveBuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ArchiveBuffer */ "./src/ArchiveBuffer.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

class ArchiveCallbacks {
    _map = new Map;
    get(archive) {
        const callbacks = this._map.get(archive);
        if (!callbacks)
            throw Error(`Handle ${archive} does not exists`);
        return callbacks;
    }
    set(archive, callbacks) {
        if (!archive)
            throw Error(`Handle is null`);
        if (this._map.has(archive))
            throw Error(`Handle ${archive} is registred`);
        this._map.set(archive, callbacks);
    }
    delete(archive) {
        this._map.delete(archive);
    }
}
;
class ArchiveContext {
    _native;
    _memory;
    _callbacks = new ArchiveCallbacks;
    _readBuffer = new Uint8Array;
    constructor(native, memory) {
        this._native = native;
        this._memory = memory;
    }
    get memoryBuffer() {
        return this._memory.buffer;
    }
    archive_version() {
        return this._native.archive_version();
    }
    archive_version_details() {
        return this._native.archive_version_details();
    }
    archive_setlocale(name) {
        return this._native.archive_setlocale(name);
    }
    archive_errno(archive) {
        return this._native.archive_errno(archive);
    }
    archive_error_string(archive) {
        return this._native.archive_error_string(archive);
    }
    archive_open_handler(archive) {
        const client = this._callbacks.get(archive);
        return client.opener ? client.opener() : 0;
    }
    archive_read_handler(archive, offset, size) {
        if (!this._readBuffer.length) {
            const client = this._callbacks.get(archive);
            if (!client.reader)
                return 0;
            const buf = client.reader();
            if (!buf)
                return 0;
            this._readBuffer = new Uint8Array(buf);
        }
        const n = Math.min(size, this._readBuffer.length);
        const dst = new Uint8Array(this._memory.buffer, offset, n);
        for (let i = 0; i < n; i++)
            dst[i] = this._readBuffer[i];
        this._readBuffer = this._readBuffer.slice(n);
        return n;
    }
    archive_read_last_error(archive) {
        return this._native.archive_read_last_error(archive);
    }
    archive_write_handler(archive, offset, size) {
        const callbacks = this._callbacks.get(archive);
        if (callbacks.writer)
            callbacks.writer(new _ArchiveBuffer__WEBPACK_IMPORTED_MODULE_0__.ArchiveBuffer(this, offset, size));
        return size;
    }
    ;
    archive_close_handler(archive) {
        const client = this._callbacks.get(archive);
        return client.closer ? client.closer() : 0;
    }
    archive_read_new() {
        const archive = this._native.archive_read_new();
        if (archive) {
            const impl = {};
            this._callbacks.set(archive, impl);
        }
        return archive;
    }
    archive_read_free(archive) {
        this._callbacks.delete(archive);
        this._native.archive_read_free(archive);
    }
    archive_read_add_passphrase(archive, passphrase) {
        return this._native.archive_read_add_passphrase(archive, passphrase);
    }
    archive_read_support_filter_all(archive) {
        return this._native.archive_read_support_filter_all(archive);
    }
    archive_read_support_format_all(archive) {
        return this._native.archive_read_support_format_all(archive);
    }
    archive_read_open(archive) {
        return this._native.archive_read_open(archive);
    }
    archive_read_close(archive) {
        return this._native.archive_read_close(archive);
    }
    archive_read_next_header(archive) {
        return this._native.archive_read_next_header(archive);
    }
    archive_read_data(archive, offset, size) {
        return this._native.archive_read_data(archive, offset, size);
    }
    archive_read_data_skip(archive) {
        return this._native.archive_read_data_skip(archive);
    }
    archive_read_set_open_callback(archive, callback) {
        const callbacks = this._callbacks.get(archive);
        callbacks.opener = callback;
    }
    archive_read_set_read_callback(archive, callback) {
        const callbacks = this._callbacks.get(archive);
        callbacks.reader = callback;
    }
    archive_read_set_close_callback(archive, callback) {
        const callbacks = this._callbacks.get(archive);
        callbacks.closer = callback;
    }
    archive_write_new() {
        const archive = this._native.archive_write_new();
        if (archive) {
            const impl = {};
            this._callbacks.set(archive, impl);
        }
        return archive;
    }
    archive_write_free(archive) {
        this._callbacks.delete(archive);
        this._native.archive_write_free(archive);
    }
    archive_write_set_options(archive, options) {
        return this._native.archive_write_set_options(archive, options);
    }
    archive_write_set_passphrase(archive, passphrase) {
        return this._native.archive_write_set_passphrase(archive, passphrase);
    }
    archive_write_set_format_by_name(archive, name) {
        return this._native.archive_write_set_format_by_name(archive, name);
    }
    archive_write_add_filter_by_name(archive, name) {
        return this._native.archive_write_add_filter_by_name(archive, name);
    }
    archive_write_set_format_filter_by_ext(archive, filename) {
        return this._native.archive_write_set_format_filter_by_ext(archive, filename);
    }
    archive_write_set_open_callback(archive, callback) {
        const callbacks = this._callbacks.get(archive);
        callbacks.opener = callback;
    }
    archive_write_set_write_callback(archive, callback) {
        const callbacks = this._callbacks.get(archive);
        callbacks.writer = callback;
    }
    archive_write_set_close_callback(archive, callback) {
        const callbacks = this._callbacks.get(archive);
        callbacks.closer = callback;
    }
    archive_write_open(archive) {
        return this._native.archive_write_open(archive);
    }
    archive_write_close(archive) {
        return this._native.archive_write_close(archive);
    }
    archive_write_header(archive, entry) {
        return this._native.archive_write_header(archive, entry);
    }
    archive_write_data(archive, offset, size) {
        return this._native.archive_write_data(archive, offset, size);
    }
    archive_entry_new() {
        return this._native.archive_entry_new();
    }
    archive_entry_free(entry) {
        this._native.archive_entry_free(entry);
    }
    archive_entry_pathname(entry) {
        return this._native.archive_entry_pathname(entry);
    }
    archive_entry_pathname_w(entry) {
        return this._native.archive_entry_pathname_w(entry);
    }
    archive_entry_pathname_utf8(entry) {
        return this._native.archive_entry_pathname_utf8(entry);
    }
    archive_entry_set_pathname_utf8(entry, pathname) {
        this._native.archive_entry_set_pathname_utf8(entry, pathname);
    }
    archive_entry_size(entry) {
        const lo = this._native.archive_entry_size_lo(entry);
        const hi = this._native.archive_entry_size_hi(entry);
        return hi * 4294967296 + lo;
    }
    archive_entry_set_size(entry, size) {
        this._native.archive_entry_set_size(entry, 0, size);
    }
    archive_entry_size_is_set(entry) {
        return this._native.archive_entry_size_is_set(entry);
    }
    archive_entry_mode(entry) {
        return this._native.archive_entry_mode(entry);
    }
    archive_entry_set_mode(entry, mode) {
        this._native.archive_entry_set_mode(entry, mode);
    }
    archive_buffer_new(size) {
        return this._native.archive_buffer_new(size);
    }
    archive_buffer_free(buffer) {
        this._native.archive_buffer_free(buffer);
    }
    archive_buffer_from(str) {
        const encoder = new TextEncoder;
        const bytes = encoder.encode(str + "\x00");
        const offset = this._native.archive_buffer_new(bytes.length);
        if (offset)
            (new Uint8Array(this._memory.buffer, offset, bytes.length)).set(bytes);
        return offset;
    }
}
;


/***/ }),

/***/ "./src/ArchiveEntry.ts":
/*!*****************************!*\
  !*** ./src/ArchiveEntry.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArchiveEntry: () => (/* binding */ ArchiveEntry)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

class ArchiveEntry {
    _context;
    _entry;
    constructor(context, entry) {
        this._context = context;
        this._entry = entry;
    }
    release() {
        this._context.archive_entry_free(this._entry);
    }
    get memoryOffset() {
        return this._entry;
    }
    get pathname() {
        const pathnameUTF8Ptr = this._context.archive_entry_pathname_utf8(this._entry);
        if (pathnameUTF8Ptr) {
            return _Utils__WEBPACK_IMPORTED_MODULE_0__.StringExtras.fromBuffer(this._context.memoryBuffer, pathnameUTF8Ptr);
        }
        const pathnamePtr = this._context.archive_entry_pathname(this._entry);
        if (pathnamePtr) {
            return _Utils__WEBPACK_IMPORTED_MODULE_0__.StringExtras.fromBuffer(this._context.memoryBuffer, pathnamePtr);
        }
    }
    set pathname(pathname) {
        const pathnamePtr = this._context.archive_buffer_from(pathname);
        if (!pathnamePtr)
            throw new Error(_Utils__WEBPACK_IMPORTED_MODULE_0__.NO_MEMORY);
        this._context.archive_entry_set_pathname_utf8(this._entry, pathnamePtr);
    }
    get size() {
        if (this._context.archive_entry_size_is_set(this._entry))
            return this._context.archive_entry_size(this._entry);
    }
    set size(value) {
        this._context.archive_entry_set_size(this._entry, value);
    }
    get mode() {
        return this._context.archive_entry_mode(this._entry);
    }
    set mode(mode) {
        this._context.archive_entry_set_mode(this._entry, mode);
    }
}
;


/***/ }),

/***/ "./src/ArchiveImpl.ts":
/*!****************************!*\
  !*** ./src/ArchiveImpl.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Archive: () => (/* binding */ Archive)
/* harmony export */ });
/* harmony import */ var _ArchiveContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ArchiveContext */ "./src/ArchiveContext.ts");
/* harmony import */ var _ArchiveBuffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ArchiveBuffer */ "./src/ArchiveBuffer.ts");
/* harmony import */ var _ArchiveEntry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ArchiveEntry */ "./src/ArchiveEntry.ts");
/* harmony import */ var _ArchiveRead__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ArchiveRead */ "./src/ArchiveRead.ts");
/* harmony import */ var _ArchiveWrite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ArchiveWrite */ "./src/ArchiveWrite.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */






class Archive {
    _context;
    _version = "";
    _versionDetails = "";
    constructor(context) {
        this._context = context;
    }
    get version() {
        if (!this._version) {
            const versionPtr = this._context.archive_version();
            this._version = _Utils__WEBPACK_IMPORTED_MODULE_5__.StringExtras.fromBuffer(this._context.memoryBuffer, versionPtr);
        }
        return this._version;
    }
    get versionDetails() {
        if (!this._versionDetails) {
            const versionDetailsPtr = this._context.archive_version_details();
            this._versionDetails = _Utils__WEBPACK_IMPORTED_MODULE_5__.StringExtras.fromBuffer(this._context.memoryBuffer, versionDetailsPtr);
        }
        return this._versionDetails;
    }
    setlocale(name) {
        const namePtr = this._context.archive_buffer_from(name);
        if (!namePtr)
            throw new Error(_Utils__WEBPACK_IMPORTED_MODULE_5__.NO_MEMORY);
        const resultPtr = this._context.archive_setlocale(namePtr);
        if (resultPtr)
            return _Utils__WEBPACK_IMPORTED_MODULE_5__.StringExtras.fromBuffer(this._context.memoryBuffer, resultPtr);
    }
    newRead() {
        const archive_read = this._context.archive_read_new();
        if (!archive_read)
            throw new Error(_Utils__WEBPACK_IMPORTED_MODULE_5__.NO_MEMORY);
        return new _ArchiveRead__WEBPACK_IMPORTED_MODULE_3__.ArchiveRead(this._context, archive_read);
    }
    newWrite() {
        const archive_write = this._context.archive_write_new();
        if (!archive_write)
            throw new Error(_Utils__WEBPACK_IMPORTED_MODULE_5__.NO_MEMORY);
        return new _ArchiveWrite__WEBPACK_IMPORTED_MODULE_4__.ArchiveWrite(this._context, archive_write);
    }
    newEntry() {
        const entry = this._context.archive_entry_new();
        if (!entry)
            throw new Error(_Utils__WEBPACK_IMPORTED_MODULE_5__.NO_MEMORY);
        return new _ArchiveEntry__WEBPACK_IMPORTED_MODULE_2__.ArchiveEntry(this._context, entry);
    }
    newBuffer(length) {
        const offset = this._context.archive_buffer_new(length);
        if (!offset)
            throw new Error(_Utils__WEBPACK_IMPORTED_MODULE_5__.NO_MEMORY);
        return new _ArchiveBuffer__WEBPACK_IMPORTED_MODULE_1__.ArchiveBuffer(this._context, offset, length);
    }
    static async instantiate(buffer) {
        let context;
        const importObject = {
            env: {
                archive_open_handler: (archive) => context.archive_open_handler(archive),
                archive_read_handler: (archive, offset, size) => context.archive_read_handler(archive, offset, size),
                archive_write_handler: (archive, offset, size) => context.archive_write_handler(archive, offset, size),
                archive_close_handler: (archive) => context.archive_close_handler(archive),
            },
        };
        const instSource = await WebAssembly.instantiate(buffer, importObject);
        const native = instSource.instance.exports;
        context = new _ArchiveContext__WEBPACK_IMPORTED_MODULE_0__.ArchiveContext(native, native.memory);
        return new Archive(context);
    }
}
;


/***/ }),

/***/ "./src/ArchiveOperations.ts":
/*!**********************************!*\
  !*** ./src/ArchiveOperations.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArchiveOperations: () => (/* binding */ ArchiveOperations)
/* harmony export */ });
/* harmony import */ var _Archive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Archive */ "./src/Archive.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

var ArchiveOperations;
(function (ArchiveOperations) {
    ;
    ;
    async function decompress(context, input, callbacks) {
        const archive = context.newRead();
        archive.supportFilterAll();
        archive.supportFormatAll();
        const chunks = [input];
        archive.onread = () => chunks.shift();
        archive.open();
        const buffer = context.newBuffer(4092);
        for (;;) {
            const entry = archive.nextHeader();
            if (!entry) {
                break;
            }
            const pathname = entry.pathname;
            if (!pathname) {
                archive.dataSkip();
                continue;
            }
            const info = {
                pathname,
                size: entry.size,
                mode: entry.mode,
            };
            let size = 0;
            const filetype = entry.mode & _Archive__WEBPACK_IMPORTED_MODULE_0__.AE_IFMT;
            if (filetype === _Archive__WEBPACK_IMPORTED_MODULE_0__.AE_IFDIR) {
                const r = callbacks.dirEntry(info);
                if (r instanceof Promise)
                    await r;
            }
            else if (filetype === _Archive__WEBPACK_IMPORTED_MODULE_0__.AE_IFREG) {
                const f = callbacks.fileEntry(info);
                let writer = (f instanceof Promise) ? (await f) : f;
                size = entry.size || 0;
                while (size > 0) {
                    let n = archive.dataRead(buffer);
                    while (n) {
                        const w = writer.writeData(buffer.buffer, buffer.byteOffset, n);
                        const sz = (w instanceof Promise) ? (await w) : w;
                        n -= sz;
                        size -= sz;
                    }
                }
                if (archive.dataRead(buffer) != 0) {
                    console.warn(`${pathname} file has wrong data size (${size})`);
                }
                continue;
            }
            if (size == 0)
                archive.dataSkip();
        }
        buffer.release();
        archive.close();
        archive.release();
    }
    ArchiveOperations.decompress = decompress;
    ;
    ;
    async function compress(context, callbacks, output) {
        const archive = context.newWrite();
        archive.setFormatFilterByExt(output);
        const buffer = context.newBuffer(8192);
        const chunks = new Array;
        archive.onwrite = (buffer) => {
            chunks.push(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
        };
        const flushChunks = async () => {
            for (;;) {
                const bytes = chunks.shift();
                if (!bytes)
                    return;
                let offset = 0;
                let length = bytes.byteLength;
                while (length) {
                    const w = callbacks.writeData(bytes, offset, length);
                    const n = (w instanceof Promise) ? (await w) : w;
                    offset += n;
                    length -= n;
                }
            }
        };
        archive.open();
        for (;;) {
            const x = callbacks.nextEntry();
            const iter = (x instanceof Promise) ? (await x) : x;
            if (!iter)
                break;
            const entry = context.newEntry();
            entry.pathname = iter.pathname;
            entry.mode = iter.mode;
            if (iter.size !== undefined) {
                entry.size = iter.size;
            }
            archive.writeHeader(entry);
            if (iter.size) {
                let size = iter.size;
                while (size) {
                    const r = iter.readData(buffer.buffer, buffer.byteOffset, buffer.byteLength);
                    const sz = (r instanceof Promise) ? (await r) : r;
                    archive.writeData(buffer, 0, sz);
                    size -= sz;
                }
            }
            entry.release();
            await flushChunks();
        }
        archive.close();
        await flushChunks();
        buffer.release();
        archive.release();
    }
    ArchiveOperations.compress = compress;
})(ArchiveOperations || (ArchiveOperations = {})); // namespace ArchiveOperations


/***/ }),

/***/ "./src/ArchiveRead.ts":
/*!****************************!*\
  !*** ./src/ArchiveRead.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArchiveRead: () => (/* binding */ ArchiveRead)
/* harmony export */ });
/* harmony import */ var _Archive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Archive */ "./src/Archive.ts");
/* harmony import */ var _ArchiveBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ArchiveBase */ "./src/ArchiveBase.ts");
/* harmony import */ var _ArchiveEntry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ArchiveEntry */ "./src/ArchiveEntry.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */




class ArchiveRead extends _ArchiveBase__WEBPACK_IMPORTED_MODULE_1__.ArchiveBase {
    constructor(context, archive) {
        super(context, archive);
    }
    release() {
        this._context.archive_read_free(this._archive);
    }
    supportFilterAll() {
        return this._context.archive_read_support_filter_all(this._archive);
    }
    supportFormatAll() {
        return this._context.archive_read_support_format_all(this._archive);
    }
    addPassphrase(passphrase) {
        const passphrasePtr = this._context.archive_buffer_from(passphrase);
        if (!passphrasePtr)
            throw new Error(_Utils__WEBPACK_IMPORTED_MODULE_3__.NO_MEMORY);
        const code = this._context.archive_read_add_passphrase(this._archive, passphrasePtr);
        this._context.archive_buffer_free(passphrasePtr);
        if (code != _Archive__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_OK) {
            throw new Error(this.errorString, { cause: (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.errorCodeToString)(code) });
        }
    }
    open() {
        const code = this._context.archive_read_open(this._archive);
        if (code !== _Archive__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_OK) {
            throw new Error(this.errorString, { cause: (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.errorCodeToString)(code) });
        }
    }
    close() {
        this._context.archive_read_close(this._archive);
    }
    nextHeader() {
        const entry = this._context.archive_read_next_header(this._archive);
        if (entry)
            return new _ArchiveEntry__WEBPACK_IMPORTED_MODULE_2__.ArchiveEntry(this._context, entry);
        const code = this._context.archive_read_last_error(this._archive);
        if (code !== _Archive__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_OK) {
            throw new Error(this.errorString, { cause: (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.errorCodeToString)(code) });
        }
    }
    dataRead(buffer, offset, length) {
        offset = buffer.byteOffset + (offset || 0);
        length = length || buffer.byteLength;
        const n = this._context.archive_read_data(this._archive, offset, length);
        if (n < 0) {
            throw new Error(this.errorString, { cause: (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.errorCodeToString)(n) });
        }
        return n;
    }
    dataSkip() {
        return this._context.archive_read_data_skip(this._archive);
    }
    set onopen(callback) {
        this._context.archive_read_set_open_callback(this._archive, callback);
    }
    set onread(callback) {
        this._context.archive_read_set_read_callback(this._archive, callback);
    }
    set onclose(callback) {
        this._context.archive_read_set_close_callback(this._archive, callback);
    }
}
;


/***/ }),

/***/ "./src/ArchiveWrite.ts":
/*!*****************************!*\
  !*** ./src/ArchiveWrite.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArchiveWrite: () => (/* binding */ ArchiveWrite)
/* harmony export */ });
/* harmony import */ var _Archive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Archive */ "./src/Archive.ts");
/* harmony import */ var _ArchiveBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ArchiveBase */ "./src/ArchiveBase.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



class ArchiveWrite extends _ArchiveBase__WEBPACK_IMPORTED_MODULE_1__.ArchiveBase {
    constructor(context, archive) {
        super(context, archive);
    }
    release() {
        this._context.archive_write_free(this._archive);
    }
    set format(value) {
        const name = this._context.archive_buffer_from(value);
        if (!name)
            throw new Error(_Utils__WEBPACK_IMPORTED_MODULE_2__.NO_MEMORY);
        const code = this._context.archive_write_set_format_by_name(this._archive, name);
        this._context.archive_buffer_free(name);
        if (code != _Archive__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_OK) {
            throw new Error(this.errorString, { cause: (0,_Utils__WEBPACK_IMPORTED_MODULE_2__.errorCodeToString)(code) });
        }
    }
    set options(options) {
        const optionsPtr = this._context.archive_buffer_from(options);
        if (!optionsPtr)
            throw new Error(_Utils__WEBPACK_IMPORTED_MODULE_2__.NO_MEMORY);
        const code = this._context.archive_write_set_options(this._archive, optionsPtr);
        this._context.archive_buffer_free(optionsPtr);
        if (code != _Archive__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_OK) {
            throw new Error(this.errorString, { cause: (0,_Utils__WEBPACK_IMPORTED_MODULE_2__.errorCodeToString)(code) });
        }
    }
    set passphrase(passphrase) {
        const passphrasePtr = this._context.archive_buffer_from(passphrase);
        if (!passphrasePtr)
            throw new Error(_Utils__WEBPACK_IMPORTED_MODULE_2__.NO_MEMORY);
        const code = this._context.archive_write_set_passphrase(this._archive, passphrasePtr);
        this._context.archive_buffer_free(passphrasePtr);
        if (code != _Archive__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_OK) {
            throw new Error(this.errorString, { cause: (0,_Utils__WEBPACK_IMPORTED_MODULE_2__.errorCodeToString)(code) });
        }
    }
    addFilter(filter) {
        const name = this._context.archive_buffer_from(filter);
        if (!name)
            throw new Error(_Utils__WEBPACK_IMPORTED_MODULE_2__.NO_MEMORY);
        const code = this._context.archive_write_add_filter_by_name(this._archive, name);
        this._context.archive_buffer_free(name);
        if (code != _Archive__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_OK) {
            throw new Error(this.errorString, { cause: (0,_Utils__WEBPACK_IMPORTED_MODULE_2__.errorCodeToString)(code) });
        }
    }
    setFormatFilterByExt(filename) {
        const fname = this._context.archive_buffer_from(filename);
        if (!fname)
            throw new Error(_Utils__WEBPACK_IMPORTED_MODULE_2__.NO_MEMORY);
        const code = this._context.archive_write_set_format_filter_by_ext(this._archive, fname);
        this._context.archive_buffer_free(fname);
        if (code != _Archive__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_OK) {
            throw new Error(this.errorString, { cause: (0,_Utils__WEBPACK_IMPORTED_MODULE_2__.errorCodeToString)(code) });
        }
    }
    set onopen(callback) {
        this._context.archive_write_set_open_callback(this._archive, callback);
    }
    set onwrite(callback) {
        this._context.archive_write_set_write_callback(this._archive, callback);
    }
    set onclose(callback) {
        this._context.archive_write_set_open_callback(this._archive, callback);
    }
    open() {
        const code = this._context.archive_write_open(this._archive);
        if (code !== _Archive__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_OK) {
            throw new Error(this.errorString, { cause: (0,_Utils__WEBPACK_IMPORTED_MODULE_2__.errorCodeToString)(code) });
        }
    }
    close() {
        this._context.archive_write_close(this._archive);
    }
    writeHeader(entry) {
        return this._context.archive_write_header(this._archive, entry.memoryOffset);
    }
    writeData(buffer, offset, length) {
        offset = buffer.byteOffset + (offset || 0);
        length = length || buffer.byteLength - offset;
        const n = this._context.archive_write_data(this._archive, offset, length);
        if (n < 0) {
            throw new Error(this.errorString, { cause: (0,_Utils__WEBPACK_IMPORTED_MODULE_2__.errorCodeToString)(n) });
        }
        return n;
    }
}
;


/***/ }),

/***/ "./src/FileSystem.ts":
/*!***************************!*\
  !*** ./src/FileSystem.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileSystem: () => (/* binding */ FileSystem),
/* harmony export */   MkdirCache: () => (/* binding */ MkdirCache),
/* harmony export */   PathSep: () => (/* binding */ PathSep),
/* harmony export */   getFileStats: () => (/* binding */ getFileStats),
/* harmony export */   getScriptDirectory: () => (/* binding */ getScriptDirectory)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:os */ "node:os");
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_os__WEBPACK_IMPORTED_MODULE_2__);
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



function getScriptDirectory() {
    if (true)
        return eval("__dirname");
    // removed by dead control flow
{}
}
;
;
var FileSystem;
(function (FileSystem) {
    function createNode(options) {
        const hostFs = {
            mkdir: (node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises).mkdir,
            open: (node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises).open,
            readFile: (node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises).readFile,
        };
        if (options?.withMkdirCache) {
            const mkdirCache = new MkdirCache;
            hostFs.mkdir = (dirPath, options) => {
                return mkdirCache.mkdir(dirPath, options);
            };
        }
        return hostFs;
    }
    FileSystem.createNode = createNode;
})(FileSystem || (FileSystem = {})); // namespace FileSystem
var PathSep;
(function (PathSep) {
    let s_instance;
    function getInstace() {
        if (!s_instance) {
            const win32 = [(node_path__WEBPACK_IMPORTED_MODULE_0___default().win32).sep, (node_path__WEBPACK_IMPORTED_MODULE_0___default().posix).sep];
            const posix = [(node_path__WEBPACK_IMPORTED_MODULE_0___default().posix).sep, (node_path__WEBPACK_IMPORTED_MODULE_0___default().win32).sep];
            const native = (node_os__WEBPACK_IMPORTED_MODULE_2___default().platform() === "win32") ? win32 : posix;
            s_instance = { native, win32, posix };
        }
        return s_instance;
    }
    function representPathAsNative(inputPath) {
        const pair = getInstace().native;
        return inputPath.replaceAll(pair[1], pair[0]);
    }
    PathSep.representPathAsNative = representPathAsNative;
    function representPathAsPosix(inputPath) {
        const pair = getInstace().posix;
        return inputPath.replaceAll(pair[1], pair[0]);
    }
    PathSep.representPathAsPosix = representPathAsPosix;
    function representPathAsWin32(inputPath) {
        const pair = getInstace().win32;
        return inputPath.replaceAll(pair[1], pair[0]);
    }
    PathSep.representPathAsWin32 = representPathAsWin32;
})(PathSep || (PathSep = {})); // namespace
class MkdirCache {
    _dirMap = new Map;
    async mkdir(dirPath, options) {
        let result = this._dirMap.get(dirPath);
        if (result === null)
            return undefined;
        if (result === undefined) {
            result = await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.mkdir(dirPath, options);
            this._dirMap.set(dirPath, (result === undefined) ? null : result);
        }
        return result;
    }
}
;
;
async function getFileStatsImpl(result, filenames, directory) {
    for (const name of filenames) {
        const filepath = node_path__WEBPACK_IMPORTED_MODULE_0___default().join(directory, PathSep.representPathAsNative(name));
        const stat = await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.stat(filepath);
        const item = { name, filepath, stat };
        result.push(item);
        if (stat.isDirectory()) {
            item.name += (node_path__WEBPACK_IMPORTED_MODULE_0___default().posix).sep;
            const items = (await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.readdir(filepath)).map(i => node_path__WEBPACK_IMPORTED_MODULE_0___default().join(name, i));
            await getFileStatsImpl(result, items, directory);
        }
    }
    return result;
}
async function getFileStats(filenames, directory) {
    return getFileStatsImpl([], filenames.map(i => PathSep.representPathAsPosix(i)), PathSep.representPathAsNative(directory));
}


/***/ }),

/***/ "./src/Utils.ts":
/*!**********************!*\
  !*** ./src/Utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NO_MEMORY: () => (/* binding */ NO_MEMORY),
/* harmony export */   StringExtras: () => (/* binding */ StringExtras),
/* harmony export */   errorCodeToString: () => (/* binding */ errorCodeToString)
/* harmony export */ });
/* harmony import */ var _Archive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Archive */ "./src/Archive.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const NO_MEMORY = "No Memory";
var StringExtras;
(function (StringExtras) {
    function fromBuffer(buffer, offset, length) {
        let bytes;
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
    StringExtras.fromBuffer = fromBuffer;
})(StringExtras || (StringExtras = {})); // namespace StringExtras
function errorCodeToString(code) {
    switch (code) {
        case _Archive__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_OK:
            return "ARCHIVE_OK";
        case _Archive__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_RETRY:
            return "ARCHIVE_RETRY";
        case _Archive__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_WARN:
            return "ARCHIVE_WARN";
        case _Archive__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_FAILED:
            return "ARCHIVE_FAILED";
        case _Archive__WEBPACK_IMPORTED_MODULE_0__.ARCHIVE_FATAL:
            return "ARCHIVE_FATAL";
    }
    if (code < 0)
        return "ARCHIVE_" + (-code);
    throw new Error(`Error code ${code} must be negative`);
}


/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ "node:os":
/*!**************************!*\
  !*** external "node:os" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:os");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("node:url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/NodeLibrary.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ArchiveImpl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ArchiveImpl */ "./src/ArchiveImpl.ts");
/* harmony import */ var _Archive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Archive */ "./src/Archive.ts");
/* harmony import */ var _FileSystem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FileSystem */ "./src/FileSystem.ts");
/* harmony import */ var _ArchiveOperations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ArchiveOperations */ "./src/ArchiveOperations.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
/// <reference path="global.d.ts" />








async function fetchBuffer(str) {
    if (!(str.startsWith("http://") || str.startsWith("https://"))) {
        const filepath = str.startsWith("file://") ? node_url__WEBPACK_IMPORTED_MODULE_2___default().fileURLToPath(str) : str;
        return await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.readFile(filepath);
    }
    const response = await fetch(str);
    return Buffer.from(await response.arrayBuffer());
}
async function newArchiveContext(params) {
    if (typeof params === "string")
        params = await fetchBuffer(params);
    return _ArchiveImpl__WEBPACK_IMPORTED_MODULE_3__.Archive.instantiate(params);
}
let g_archive;
async function getArchiveContext(params) {
    if (params !== undefined) {
        return newArchiveContext(params);
    }
    if (!g_archive) {
        const filename = node_path__WEBPACK_IMPORTED_MODULE_0___default().join((0,_FileSystem__WEBPACK_IMPORTED_MODULE_5__.getScriptDirectory)(), "libarchive.wasm");
        g_archive = await newArchiveContext(filename);
    }
    return g_archive;
}
function setlocale(context, name, verbose) {
    if (name === undefined)
        name = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES;
    if (name !== undefined) {
        const result = context.setlocale(name);
        if (verbose && result === undefined) {
            console.warn(`Unable to set locale ${name}`);
        }
    }
}
const libarchive = Object.assign(getArchiveContext, {
    ARCHIVE_OK: _Archive__WEBPACK_IMPORTED_MODULE_4__.ARCHIVE_OK,
    ARCHIVE_RETRY: _Archive__WEBPACK_IMPORTED_MODULE_4__.ARCHIVE_RETRY,
    ARCHIVE_WARN: _Archive__WEBPACK_IMPORTED_MODULE_4__.ARCHIVE_WARN,
    ARCHIVE_FAILED: _Archive__WEBPACK_IMPORTED_MODULE_4__.ARCHIVE_FAILED,
    ARCHIVE_FATAL: _Archive__WEBPACK_IMPORTED_MODULE_4__.ARCHIVE_FATAL,
    AE_IFMT: _Archive__WEBPACK_IMPORTED_MODULE_4__.AE_IFMT,
    AE_IFREG: _Archive__WEBPACK_IMPORTED_MODULE_4__.AE_IFREG,
    AE_IFLNK: _Archive__WEBPACK_IMPORTED_MODULE_4__.AE_IFLNK,
    AE_IFSOCK: _Archive__WEBPACK_IMPORTED_MODULE_4__.AE_IFSOCK,
    AE_IFCHR: _Archive__WEBPACK_IMPORTED_MODULE_4__.AE_IFCHR,
    AE_IFBLK: _Archive__WEBPACK_IMPORTED_MODULE_4__.AE_IFBLK,
    AE_IFDIR: _Archive__WEBPACK_IMPORTED_MODULE_4__.AE_IFDIR,
    AE_IFIFO: _Archive__WEBPACK_IMPORTED_MODULE_4__.AE_IFIFO,
    async decompress(input, output, options) {
        const verbose = options && options.verbose;
        if (typeof input === "string") {
            input = await fetchBuffer(input);
        }
        const outputDir = node_path__WEBPACK_IMPORTED_MODULE_0___default().resolve(output ? _FileSystem__WEBPACK_IMPORTED_MODULE_5__.PathSep.representPathAsNative(output) : "");
        const mkdirCache = new _FileSystem__WEBPACK_IMPORTED_MODULE_5__.MkdirCache;
        const callbacks = {
            async dirEntry(entry) {
                verbose && console.log("x", entry.pathname);
                const filepath = node_path__WEBPACK_IMPORTED_MODULE_0___default().join(outputDir, _FileSystem__WEBPACK_IMPORTED_MODULE_5__.PathSep.representPathAsNative(entry.pathname));
                await mkdirCache.mkdir(filepath, { recursive: true });
            },
            async fileEntry(entry) {
                verbose && console.log("x", entry.pathname);
                const filepath = node_path__WEBPACK_IMPORTED_MODULE_0___default().join(outputDir, _FileSystem__WEBPACK_IMPORTED_MODULE_5__.PathSep.representPathAsNative(entry.pathname));
                const dirpath = node_path__WEBPACK_IMPORTED_MODULE_0___default().dirname(filepath);
                await mkdirCache.mkdir(dirpath, { recursive: true });
                let fileHandle;
                let size = entry.size || 0;
                return {
                    async writeData(buffer, byteOffset, byteLength) {
                        if (!size || size < byteLength)
                            throw new Error(`Invalid size ${byteLength} used`);
                        if (!fileHandle)
                            fileHandle = await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.open(filepath, "w");
                        const bytes = new Uint8Array(buffer, byteOffset, byteLength);
                        const { bytesWritten } = (await fileHandle.write(bytes));
                        size -= bytesWritten;
                        if (!size)
                            await fileHandle.close();
                        return bytesWritten;
                    },
                };
            },
        };
        const context = await getArchiveContext(options?.moduleUrl);
        setlocale(context, options?.locale, options?.verbose);
        return _ArchiveOperations__WEBPACK_IMPORTED_MODULE_6__.ArchiveOperations.decompress(context, input, callbacks);
    },
    async compress(input, output, options) {
        const verbose = options && options.verbose;
        const currentDirectory = options && options.directory || process.cwd();
        const outputHandle = await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.open(output, "w");
        const fileEntries = await (0,_FileSystem__WEBPACK_IMPORTED_MODULE_5__.getFileStats)([input].flat(), currentDirectory);
        const callbacks = {
            async nextEntry() {
                let size;
                let fentry = fileEntries.shift();
                for (;;) {
                    if (!fentry)
                        return undefined;
                    if (fentry.stat.isFile()) {
                        size = fentry.stat.size;
                    }
                    else if (!fentry.stat.isDirectory()) {
                        verbose && console.warn(fentry.name, "skipped");
                        continue;
                    }
                    verbose && console.log(fentry.name);
                    break;
                }
                let fileHandle;
                return {
                    pathname: fentry.name,
                    mode: fentry.stat.mode,
                    size,
                    async readData(buffer, byteOffset, byteLength) {
                        if (!size)
                            throw new Error(`No Data`);
                        if (!fileHandle) {
                            fileHandle = await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.open(fentry.filepath, "r");
                        }
                        const bytes = new Uint8Array(buffer, byteOffset, Math.min(byteLength, size));
                        const { bytesRead } = await fileHandle.read(bytes);
                        size -= bytesRead;
                        if (!size) {
                            await fileHandle.close();
                        }
                        return bytesRead;
                    }
                };
            },
            async writeData(buffer, byteOffset, byteLength) {
                const { bytesWritten } = await outputHandle.write(new Uint8Array(buffer, byteOffset, byteLength));
                return bytesWritten;
            },
        };
        const context = await getArchiveContext(options?.moduleUrl);
        setlocale(context, options?.locale, options?.verbose);
        const result = await _ArchiveOperations__WEBPACK_IMPORTED_MODULE_6__.ArchiveOperations.compress(context, callbacks, output);
        await outputHandle.close();
        return result;
    },
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (libarchive);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NUUsTUFBTSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGLENBQUMsQ0FBQztBQUVILGlFQUFlLFVBQVUsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZS50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVCYXNlLnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZUJ1ZmZlci50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVDb250ZXh0LnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZUVudHJ5LnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZUltcGwudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlT3BlcmF0aW9ucy50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVSZWFkLnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZVdyaXRlLnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvRmlsZVN5c3RlbS50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL1V0aWxzLnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6ZnNcIiIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOm9zXCIiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpwYXRoXCIiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTp1cmxcIiIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL05vZGVMaWJyYXJ5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImxpYmFyY2hpdmVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wibGliYXJjaGl2ZVwiXSA9IGZhY3RvcnkoKTtcbn0pKGdsb2JhbCwgKCkgPT4ge1xucmV0dXJuICIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuZXhwb3J0IGNvbnN0IEFSQ0hJVkVfT0sgPSAwO1xuZXhwb3J0IGNvbnN0IEFSQ0hJVkVfUkVUUlkgPSAtMTA7XG5leHBvcnQgY29uc3QgQVJDSElWRV9XQVJOID0gLTIwO1xuZXhwb3J0IGNvbnN0IEFSQ0hJVkVfRkFJTEVEID0gLTI1O1xuZXhwb3J0IGNvbnN0IEFSQ0hJVkVfRkFUQUwgPSAtMzA7XG5cbmV4cG9ydCBjb25zdCBBRV9JRk1UICAgPSAweGYwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZSRUcgID0gMHg4MDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGTE5LICA9IDB4YTAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRlNPQ0sgPSAweGMwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZDSFIgID0gMHgyMDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGQkxLICA9IDB4NjAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRkRJUiAgPSAweDQwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZJRk8gID0gMHgxMDAwO1xuXG5leHBvcnQgdHlwZSBBcmNoaXZlT3BlbkNhbGxiYWNrID0gKCkgPT4gbnVtYmVyO1xuZXhwb3J0IHR5cGUgQXJjaGl2ZVJlYWRDYWxsYmFjayA9ICgpID0+IEJ1ZmZlciB8IHVuZGVmaW5lZDtcbmV4cG9ydCB0eXBlIEFyY2hpdmVXcml0ZUNhbGxiYWNrID0gKGJ1ZmZlcjogSUFyY2hpdmVCdWZmZXIpID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBBcmNoaXZlQ2xvc2VDYWxsYmFjayA9ICgpID0+IG51bWJlcjtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZUJ1ZmZlciB7XG4gIHJlbGVhc2UoKTogdm9pZDtcblxuICBnZXQgYnVmZmVyKCk6IEFycmF5QnVmZmVyO1xuICBnZXQgYnl0ZU9mZnNldCgpOiBudW1iZXI7XG4gIGdldCBieXRlTGVuZ3RoKCk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmVFbnRyeSB7XG4gIHJlbGVhc2UoKTogdm9pZDtcblxuICBnZXQgcGF0aG5hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBzZXQgcGF0aG5hbWUodmFsdWU6IHN0cmluZyk7XG5cbiAgZ2V0IHNpemUoKTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBzZXQgc2l6ZSh2YWx1ZTogbnVtYmVyKTtcblxuICBnZXQgbW9kZSgpOiBudW1iZXI7XG4gIHNldCBtb2RlKG1vZGU6IG51bWJlcik7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcmNoaXZlUmVhZCB7XG4gIHJlbGVhc2UoKTogdm9pZDtcblxuICBnZXQgZXJybm8oKTogbnVtYmVyO1xuICBnZXQgZXJyb3JTdHJpbmcoKTogc3RyaW5nO1xuXG4gIHN1cHBvcnRGaWx0ZXJBbGwoKTogdm9pZDtcbiAgc3VwcG9ydEZvcm1hdEFsbCgpOiB2b2lkO1xuXG4gIGFkZFBhc3NwaHJhc2UocGFzc3BocmFzZTogc3RyaW5nKTogdm9pZDtcblxuICBzZXQgb25vcGVuKGNhbGxiYWNrOiBBcmNoaXZlT3BlbkNhbGxiYWNrKTtcbiAgc2V0IG9ucmVhZChjYWxsYmFjazogQXJjaGl2ZVJlYWRDYWxsYmFjayk7XG4gIHNldCBvbmNsb3NlKGNhbGxiYWNrOiBBcmNoaXZlQ2xvc2VDYWxsYmFjayk7XG5cbiAgb3BlbigpOiB2b2lkO1xuICBjbG9zZSgpOiB2b2lkO1xuICBuZXh0SGVhZGVyKCk6IElBcmNoaXZlRW50cnkgfCB1bmRlZmluZWQ7XG4gIGRhdGFSZWFkKGJ1ZmZlcjogSUFyY2hpdmVCdWZmZXIsIG9mZnNldD86IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogbnVtYmVyO1xuICBkYXRhU2tpcCgpOiBudW1iZXI7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcmNoaXZlV3JpdGUge1xuICByZWxlYXNlKCk6IHZvaWQ7XG5cbiAgZ2V0IGVycm5vKCk6IG51bWJlcjtcbiAgZ2V0IGVycm9yU3RyaW5nKCk6IHN0cmluZztcblxuICBzZXQgZm9ybWF0KHZhbHVlOiBzdHJpbmcpO1xuICBzZXQgb3B0aW9ucyhvcHRpb25zOiBzdHJpbmcpO1xuICBzZXQgcGFzc3BocmFzZShwYXNzcGhyYXNlOiBzdHJpbmcpO1xuICBhZGRGaWx0ZXIoZmlsdGVyOiBzdHJpbmcpOiB2b2lkO1xuICBzZXRGb3JtYXRGaWx0ZXJCeUV4dChmaWxlbmFtZTogc3RyaW5nKTogdm9pZDtcblxuICBzZXQgb25vcGVuKGNhbGxiYWNrOiBBcmNoaXZlT3BlbkNhbGxiYWNrKTtcbiAgc2V0IG9ud3JpdGUoY2FsbGJhY2s6IEFyY2hpdmVXcml0ZUNhbGxiYWNrKTtcbiAgc2V0IG9uY2xvc2UoY2FsbGJhY2s6IEFyY2hpdmVDbG9zZUNhbGxiYWNrKTtcblxuICBvcGVuKCk6IHZvaWQ7XG4gIGNsb3NlKCk6IHZvaWQ7XG4gIHdyaXRlSGVhZGVyKGVudHJ5OiBJQXJjaGl2ZUVudHJ5KTogbnVtYmVyO1xuICB3cml0ZURhdGEoYnVmZmVyOiBJQXJjaGl2ZUJ1ZmZlciwgb2Zmc2V0PzogbnVtYmVyLCBsZW5ndGg/OiBudW1iZXIpOiBudW1iZXI7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcmNoaXZlIHtcbiAgZ2V0IHZlcnNpb24oKTogc3RyaW5nO1xuICBnZXQgdmVyc2lvbkRldGFpbHMoKTogc3RyaW5nO1xuXG4gIHNldGxvY2FsZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgbmV3UmVhZCgpOiBJQXJjaGl2ZVJlYWQ7XG4gIG5ld1dyaXRlKCk6IElBcmNoaXZlV3JpdGU7XG4gIG5ld0VudHJ5KCk6IElBcmNoaXZlRW50cnk7XG4gIG5ld0J1ZmZlcihsZW5ndGg6IG51bWJlcik6IElBcmNoaXZlQnVmZmVyO1xufTtcblxuZXhwb3J0IHR5cGUgRGVjb21wcmVzc09wdGlvbnMgPSB7XG4gIHZlcmJvc2U/OiBib29sZWFuO1xuICBtb2R1bGVVcmw/OiBzdHJpbmc7XG4gIGxvY2FsZT86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIENvbXByZXNzT3B0aW9ucyA9IHtcbiAgdmVyYm9zZT86IGJvb2xlYW47XG4gIG1vZHVsZVVybD86IHN0cmluZztcbiAgbG9jYWxlPzogc3RyaW5nO1xuICBkaXJlY3Rvcnk/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEVudHJ5SW5mbyB7XG4gIHBhdGhuYW1lOiBzdHJpbmc7XG4gIG1vZGU6IG51bWJlcjtcbiAgc2l6ZT86IG51bWJlcjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmVFeHBvcnQge1xuICAocGFyYW1zPzogc3RyaW5nIHwgQnVmZmVyKTogUHJvbWlzZTxJQXJjaGl2ZT47XG5cbiAgcmVhZG9ubHkgQVJDSElWRV9PSzogbnVtYmVyO1xuICByZWFkb25seSBBUkNISVZFX1JFVFJZOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFSQ0hJVkVfV0FSTjogbnVtYmVyO1xuICByZWFkb25seSBBUkNISVZFX0ZBSUxFRDogbnVtYmVyO1xuICByZWFkb25seSBBUkNISVZFX0ZBVEFMOiBudW1iZXI7XG5cbiAgcmVhZG9ubHkgQUVfSUZNVDogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRlJFRzogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRkxOSzogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRlNPQ0s6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZDSFI6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZCTEs6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZESVI6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZJRk86IG51bWJlcjtcblxuICBkZWNvbXByZXNzKGlucHV0OiBzdHJpbmcgfCBCdWZmZXIsIG91dHB1dD86IHN0cmluZywgb3B0aW9ucz86IERlY29tcHJlc3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcbiAgY29tcHJlc3MoaW5wdXQ6IHN0cmluZyB8IHN0cmluZ1tdLCBvdXRwdXQ6IHN0cmluZywgb3B0aW9ucz86IENvbXByZXNzT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5pbXBvcnQgeyBTdHJpbmdFeHRyYXMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXJjaGl2ZUJhc2Uge1xuICBwcm90ZWN0ZWQgX2NvbnRleHQ6IEFyY2hpdmVDb250ZXh0O1xuICBwcm90ZWN0ZWQgX2FyY2hpdmU6IG51bWJlcjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoY29udGV4dDogQXJjaGl2ZUNvbnRleHQsIGFyY2hpdmU6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuX2FyY2hpdmUgPSBhcmNoaXZlO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHJlbGVhc2UoKTogdm9pZDtcblxuICBwdWJsaWMgZ2V0IG1lbW9yeU9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJjaGl2ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZXJybm8oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX2Vycm5vKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGdldCBlcnJvclN0cmluZygpOiBzdHJpbmcge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lcnJvcl9zdHJpbmcodGhpcy5fYXJjaGl2ZSk7XG4gICAgcmV0dXJuIFN0cmluZ0V4dHJhcy5mcm9tQnVmZmVyKHRoaXMuX2NvbnRleHQubWVtb3J5QnVmZmVyLCBvZmZzZXQpO1xuICB9XG5cbiAgLy8gaGFuZGxlRXZlbnRcbiAgLy8gYWRkRXZlbnRMaXN0bmVyXG4gIC8vIHJlbW92ZUV2ZW50TGlzdGVuZXJcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElBcmNoaXZlQnVmZmVyIH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUNvbnRleHQgfSBmcm9tIFwiLi9BcmNoaXZlQ29udGV4dFwiO1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZUJ1ZmZlciBpbXBsZW1lbnRzIElBcmNoaXZlQnVmZmVyIHtcbiAgcHJpdmF0ZSBfY29udGV4dDogQXJjaGl2ZUNvbnRleHQ7XG4gIHByaXZhdGUgX2J5dGVPZmZzZXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBfYnl0ZUxlbmd0aDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLl9ieXRlT2Zmc2V0ID0gYnl0ZU9mZnNldDtcbiAgICB0aGlzLl9ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyByZWxlYXNlKCkge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZSh0aGlzLl9ieXRlT2Zmc2V0KTtcbiAgfVxuXG4gIGdldCBidWZmZXIoKTogQXJyYXlCdWZmZXIge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0Lm1lbW9yeUJ1ZmZlcjtcbiAgfVxuXG4gIGdldCBieXRlT2Zmc2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2J5dGVPZmZzZXQ7XG4gIH1cblxuICBnZXQgYnl0ZUxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9ieXRlTGVuZ3RoO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBcmNoaXZlT3BlbkNhbGxiYWNrLCBBcmNoaXZlUmVhZENhbGxiYWNrLCBBcmNoaXZlV3JpdGVDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIEFSQ0hJVkVfT0sgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlTmF0aXZlLCBBcmNoaXZlUHRyLCBBcmNoaXZlRW50cnlQdHIgfSBmcm9tIFwiLi9BcmNoaXZlTmF0aXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQnVmZmVyIH0gZnJvbSBcIi4vQXJjaGl2ZUJ1ZmZlclwiO1xuXG50eXBlIEFyY2hpdmVSZWFkQ2FsYmFja3MgPSB7XG4gIG9wZW5lcj86IEFyY2hpdmVPcGVuQ2FsbGJhY2ssXG4gIHJlYWRlcj86IEFyY2hpdmVSZWFkQ2FsbGJhY2ssXG4gIGNsb3Nlcj86IEFyY2hpdmVDbG9zZUNhbGxiYWNrLFxufTtcblxudHlwZSBBcmNoaXZlV3JpdGVDYWxiYWNrcyA9IHtcbiAgb3BlbmVyPzogQXJjaGl2ZU9wZW5DYWxsYmFjayxcbiAgd3JpdGVyPzogQXJjaGl2ZVdyaXRlQ2FsbGJhY2ssXG4gIGNsb3Nlcj86IEFyY2hpdmVDbG9zZUNhbGxiYWNrLFxufTtcblxuY2xhc3MgQXJjaGl2ZUNhbGxiYWNrcyB7XG4gIHByaXZhdGUgX21hcCA9IG5ldyBNYXA8bnVtYmVyLCBBcmNoaXZlUmVhZENhbGJhY2tzIHwgQXJjaGl2ZVdyaXRlQ2FsYmFja3M+O1xuXG4gIHB1YmxpYyBnZXQoYXJjaGl2ZTogbnVtYmVyKTogQXJjaGl2ZVJlYWRDYWxiYWNrcyB8IEFyY2hpdmVXcml0ZUNhbGJhY2tzIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9tYXAuZ2V0KGFyY2hpdmUpO1xuICAgIGlmICghY2FsbGJhY2tzKVxuICAgICAgdGhyb3cgRXJyb3IoYEhhbmRsZSAke2FyY2hpdmV9IGRvZXMgbm90IGV4aXN0c2ApO1xuICAgIHJldHVybiBjYWxsYmFja3M7XG4gIH1cblxuICBwdWJsaWMgc2V0KGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2tzOiBBcmNoaXZlUmVhZENhbGJhY2tzIHwgQXJjaGl2ZVdyaXRlQ2FsYmFja3MpIHtcbiAgICBpZiAoIWFyY2hpdmUpXG4gICAgICB0aHJvdyBFcnJvcihgSGFuZGxlIGlzIG51bGxgKTtcbiAgICBpZiAodGhpcy5fbWFwLmhhcyhhcmNoaXZlKSlcbiAgICAgIHRocm93IEVycm9yKGBIYW5kbGUgJHthcmNoaXZlfSBpcyByZWdpc3RyZWRgKTtcbiAgICB0aGlzLl9tYXAuc2V0KGFyY2hpdmUsIGNhbGxiYWNrcyk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlKGFyY2hpdmU6IG51bWJlcikge1xuICAgIHRoaXMuX21hcC5kZWxldGUoYXJjaGl2ZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBBcmNoaXZlQ29udGV4dCB7XG4gIHByaXZhdGUgX25hdGl2ZTogQXJjaGl2ZU5hdGl2ZTtcbiAgcHJpdmF0ZSBfbWVtb3J5OiBXZWJBc3NlbWJseS5NZW1vcnk7XG4gIHByaXZhdGUgX2NhbGxiYWNrcyA9IG5ldyBBcmNoaXZlQ2FsbGJhY2tzO1xuICBwcml2YXRlIF9yZWFkQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXk7XG5cbiAgY29uc3RydWN0b3IobmF0aXZlOiBBcmNoaXZlTmF0aXZlLCBtZW1vcnk6IFdlYkFzc2VtYmx5Lk1lbW9yeSkge1xuICAgIHRoaXMuX25hdGl2ZSA9IG5hdGl2ZTtcbiAgICB0aGlzLl9tZW1vcnkgPSBtZW1vcnk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1lbW9yeUJ1ZmZlcigpOiBBcnJheUJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX21lbW9yeS5idWZmZXI7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV92ZXJzaW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3ZlcnNpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3ZlcnNpb25fZGV0YWlscygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV92ZXJzaW9uX2RldGFpbHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3NldGxvY2FsZShuYW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9zZXRsb2NhbGUobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lcnJubyhhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lcnJubyhhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2Vycm9yX3N0cmluZyhhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lcnJvcl9zdHJpbmcoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9vcGVuX2hhbmRsZXIoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBjbGllbnQgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpO1xuICAgIHJldHVybiBjbGllbnQub3BlbmVyID8gY2xpZW50Lm9wZW5lcigpIDogMDtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfaGFuZGxlcihhcmNoaXZlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuX3JlYWRCdWZmZXIubGVuZ3RoKSB7XG4gICAgICBjb25zdCBjbGllbnQgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVSZWFkQ2FsYmFja3M7XG4gICAgICBpZiAoIWNsaWVudC5yZWFkZXIpXG4gICAgICAgIHJldHVybiAwO1xuICAgICAgY29uc3QgYnVmID0gY2xpZW50LnJlYWRlcigpO1xuICAgICAgaWYgKCFidWYpXG4gICAgICAgIHJldHVybiAwO1xuICAgICAgdGhpcy5fcmVhZEJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgfVxuXG4gICAgY29uc3QgbiA9IE1hdGgubWluKHNpemUsIHRoaXMuX3JlYWRCdWZmZXIubGVuZ3RoKTtcbiAgICBjb25zdCBkc3QgPSBuZXcgVWludDhBcnJheSh0aGlzLl9tZW1vcnkuYnVmZmVyLCBvZmZzZXQsIG4pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKVxuICAgICAgZHN0W2ldID0gdGhpcy5fcmVhZEJ1ZmZlcltpXTtcblxuICAgIHRoaXMuX3JlYWRCdWZmZXIgPSB0aGlzLl9yZWFkQnVmZmVyLnNsaWNlKG4pO1xuICAgIHJldHVybiBuO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9sYXN0X2Vycm9yKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfbGFzdF9lcnJvcihhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX2hhbmRsZXIoYXJjaGl2ZTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgc2l6ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVXcml0ZUNhbGJhY2tzO1xuICAgIGlmIChjYWxsYmFja3Mud3JpdGVyKVxuICAgICAgY2FsbGJhY2tzLndyaXRlcihuZXcgQXJjaGl2ZUJ1ZmZlcih0aGlzLCBvZmZzZXQsIHNpemUpKVxuICAgIHJldHVybiBzaXplO1xuICB9O1xuXG4gIHB1YmxpYyBhcmNoaXZlX2Nsb3NlX2hhbmRsZXIoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBjbGllbnQgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpO1xuICAgIHJldHVybiBjbGllbnQuY2xvc2VyID8gY2xpZW50LmNsb3NlcigpIDogMDtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfbmV3KCk6IEFyY2hpdmVQdHIge1xuICAgIGNvbnN0IGFyY2hpdmUgPSB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX25ldygpO1xuICAgIGlmIChhcmNoaXZlKSB7XG4gICAgICBjb25zdCBpbXBsOiBBcmNoaXZlUmVhZENhbGJhY2tzID0ge307XG4gICAgICB0aGlzLl9jYWxsYmFja3Muc2V0KGFyY2hpdmUsIGltcGwpO1xuICAgIH1cbiAgICByZXR1cm4gYXJjaGl2ZTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfZnJlZShhcmNoaXZlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jYWxsYmFja3MuZGVsZXRlKGFyY2hpdmUpO1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfZnJlZShhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfYWRkX3Bhc3NwaHJhc2UoYXJjaGl2ZTogQXJjaGl2ZVB0ciwgcGFzc3BocmFzZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9hZGRfcGFzc3BocmFzZShhcmNoaXZlLCBwYXNzcGhyYXNlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfc3VwcG9ydF9maWx0ZXJfYWxsKGFyY2hpdmU6IG51bWJlcik6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZmlsdGVyX2FsbChhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfc3VwcG9ydF9mb3JtYXRfYWxsKGFyY2hpdmU6IG51bWJlcik6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZm9ybWF0X2FsbChhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfb3BlbihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX29wZW4oYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2Nsb3NlKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfY2xvc2UoYXJjaGl2ZSk7XG4gIH1cbiAgXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfbmV4dF9oZWFkZXIoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9uZXh0X2hlYWRlcihhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfZGF0YShhcmNoaXZlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX2RhdGEoYXJjaGl2ZSwgb2Zmc2V0LCBzaXplKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfZGF0YV9za2lwKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfZGF0YV9za2lwKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9zZXRfb3Blbl9jYWxsYmFjayhhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrOiBBcmNoaXZlT3BlbkNhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlUmVhZENhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy5vcGVuZXIgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfc2V0X3JlYWRfY2FsbGJhY2soYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFjazogQXJjaGl2ZVJlYWRDYWxsYmFjayk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVJlYWRDYWxiYWNrcztcbiAgICBjYWxsYmFja3MucmVhZGVyID0gY2FsbGJhY2s7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX3NldF9jbG9zZV9jYWxsYmFjayhhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrOiBBcmNoaXZlQ2xvc2VDYWxsYmFjayk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVJlYWRDYWxiYWNrcztcbiAgICBjYWxsYmFja3MuY2xvc2VyID0gY2FsbGJhY2s7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9uZXcoKTogQXJjaGl2ZVB0ciB7XG4gICAgY29uc3QgYXJjaGl2ZSA9IHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX25ldygpO1xuICAgIGlmIChhcmNoaXZlKSB7XG4gICAgICBjb25zdCBpbXBsOiBBcmNoaXZlV3JpdGVDYWxiYWNrcyA9IHt9O1xuICAgICAgdGhpcy5fY2FsbGJhY2tzLnNldChhcmNoaXZlLCBpbXBsKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyY2hpdmU7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9mcmVlKGFyY2hpdmU6IG51bWJlcikge1xuICAgIHRoaXMuX2NhbGxiYWNrcy5kZWxldGUoYXJjaGl2ZSk7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfZnJlZShhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF9vcHRpb25zKGFyY2hpdmU6IG51bWJlciwgb3B0aW9uczogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfc2V0X29wdGlvbnMoYXJjaGl2ZSwgb3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfcGFzc3BocmFzZShhcmNoaXZlOiBudW1iZXIsIHBhc3NwaHJhc2U6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX3NldF9wYXNzcGhyYXNlKGFyY2hpdmUsIHBhc3NwaHJhc2UpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9ieV9uYW1lKGFyY2hpdmU6IG51bWJlciwgbmFtZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9ieV9uYW1lKGFyY2hpdmUsIG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfYWRkX2ZpbHRlcl9ieV9uYW1lKGFyY2hpdmU6IG51bWJlciwgbmFtZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfYWRkX2ZpbHRlcl9ieV9uYW1lKGFyY2hpdmUsIG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9maWx0ZXJfYnlfZXh0KGFyY2hpdmU6IG51bWJlciwgZmlsZW5hbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX3NldF9mb3JtYXRfZmlsdGVyX2J5X2V4dChhcmNoaXZlLCBmaWxlbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfb3Blbl9jYWxsYmFjayhhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrOiBBcmNoaXZlT3BlbkNhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlV3JpdGVDYWxiYWNrcztcbiAgICBjYWxsYmFja3Mub3BlbmVyID0gY2FsbGJhY2s7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfd3JpdGVfY2FsbGJhY2soYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFjazogQXJjaGl2ZVdyaXRlQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVXcml0ZUNhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy53cml0ZXIgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF9jbG9zZV9jYWxsYmFjayhhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrOiBBcmNoaXZlQ2xvc2VDYWxsYmFjayk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVdyaXRlQ2FsYmFja3M7XG4gICAgY2FsbGJhY2tzLmNsb3NlciA9IGNhbGxiYWNrO1xuICB9XG4gIFxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9vcGVuKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX29wZW4oYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9jbG9zZShhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9jbG9zZShhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX2hlYWRlcihhcmNoaXZlOiBudW1iZXIsIGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9oZWFkZXIoYXJjaGl2ZSwgZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfZGF0YShhcmNoaXZlOiBBcmNoaXZlUHRyLCBvZmZzZXQ6IG51bWJlciwgc2l6ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfZGF0YShhcmNoaXZlLCBvZmZzZXQsIHNpemUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfbmV3KCk6IEFyY2hpdmVFbnRyeVB0ciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X25ldygpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfZnJlZShlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKSB7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfZnJlZShlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9wYXRobmFtZShlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfcGF0aG5hbWUoZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfcGF0aG5hbWVfdyhlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfcGF0aG5hbWVfdyhlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9wYXRobmFtZV91dGY4KGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9wYXRobmFtZV91dGY4KGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X3NldF9wYXRobmFtZV91dGY4KGVudHJ5OiBBcmNoaXZlRW50cnlQdHIsIHBhdGhuYW1lOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zZXRfcGF0aG5hbWVfdXRmOChlbnRyeSwgcGF0aG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfc2l6ZShlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKTogbnVtYmVyIHtcbiAgICBjb25zdCBsbyA9IHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3NpemVfbG8oZW50cnkpO1xuICAgIGNvbnN0IGhpID0gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfc2l6ZV9oaShlbnRyeSk7XG4gICAgcmV0dXJuIGhpICogNDI5NDk2NzI5NiArIGxvO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfc2V0X3NpemUoZW50cnk6IEFyY2hpdmVFbnRyeVB0ciwgc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfc2V0X3NpemUoZW50cnksIDAsIHNpemUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfc2l6ZV9pc19zZXQoZW50cnk6IEFyY2hpdmVFbnRyeVB0cik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3NpemVfaXNfc2V0KGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X21vZGUoZW50cnk6IEFyY2hpdmVFbnRyeVB0cik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X21vZGUoZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfc2V0X21vZGUoZW50cnk6IEFyY2hpdmVFbnRyeVB0ciwgbW9kZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfc2V0X21vZGUoZW50cnksIG1vZGUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfYnVmZmVyX25ldyhzaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9idWZmZXJfbmV3KHNpemUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfYnVmZmVyX2ZyZWUoYnVmZmVyOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9idWZmZXJfZnJlZShidWZmZXIpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfYnVmZmVyX2Zyb20oc3RyOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXI7XG4gICAgY29uc3QgYnl0ZXMgPSBlbmNvZGVyLmVuY29kZShzdHIgKyBcIlxceDAwXCIpO1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuX25hdGl2ZS5hcmNoaXZlX2J1ZmZlcl9uZXcoYnl0ZXMubGVuZ3RoKTtcbiAgICBpZiAob2Zmc2V0KVxuICAgICAgKG5ldyBVaW50OEFycmF5KHRoaXMuX21lbW9yeS5idWZmZXIsIG9mZnNldCwgYnl0ZXMubGVuZ3RoKSkuc2V0KGJ5dGVzKTtcbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJQXJjaGl2ZUVudHJ5IH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUNvbnRleHQgfSBmcm9tIFwiLi9BcmNoaXZlQ29udGV4dFwiO1xuaW1wb3J0IHsgQXJjaGl2ZUVudHJ5UHRyIH0gZnJvbSBcIi4vQXJjaGl2ZU5hdGl2ZVwiO1xuaW1wb3J0IHsgTk9fTUVNT1JZLCBTdHJpbmdFeHRyYXMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZUVudHJ5IGltcGxlbWVudHMgSUFyY2hpdmVFbnRyeSB7XG4gIHByaXZhdGUgX2NvbnRleHQ6IEFyY2hpdmVDb250ZXh0O1xuICBwcml2YXRlIF9lbnRyeTogQXJjaGl2ZUVudHJ5UHRyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgZW50cnk6IEFyY2hpdmVFbnRyeVB0cikge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuX2VudHJ5ID0gZW50cnk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfZnJlZSh0aGlzLl9lbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1lbW9yeU9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZW50cnk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhdGhuYW1lKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcGF0aG5hbWVVVEY4UHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3BhdGhuYW1lX3V0ZjgodGhpcy5fZW50cnkpO1xuICAgIGlmIChwYXRobmFtZVVURjhQdHIpIHtcbiAgICAgIHJldHVybiBTdHJpbmdFeHRyYXMuZnJvbUJ1ZmZlcih0aGlzLl9jb250ZXh0Lm1lbW9yeUJ1ZmZlciwgcGF0aG5hbWVVVEY4UHRyKTtcbiAgICB9XG4gICAgY29uc3QgcGF0aG5hbWVQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfcGF0aG5hbWUodGhpcy5fZW50cnkpO1xuICAgIGlmIChwYXRobmFtZVB0cikge1xuICAgICAgcmV0dXJuIFN0cmluZ0V4dHJhcy5mcm9tQnVmZmVyKHRoaXMuX2NvbnRleHQubWVtb3J5QnVmZmVyLCBwYXRobmFtZVB0cik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBwYXRobmFtZShwYXRobmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcGF0aG5hbWVQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ocGF0aG5hbWUpO1xuICAgIGlmICghcGF0aG5hbWVQdHIpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9zZXRfcGF0aG5hbWVfdXRmOCh0aGlzLl9lbnRyeSwgcGF0aG5hbWVQdHIpO1xuICB9XG5cbiAgcHVibGljIGdldCBzaXplKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9zaXplX2lzX3NldCh0aGlzLl9lbnRyeSkpXG4gICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3NpemUodGhpcy5fZW50cnkpO1xuICB9XG5cbiAgcHVibGljIHNldCBzaXplKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfc2V0X3NpemUodGhpcy5fZW50cnksIHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbW9kZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfbW9kZSh0aGlzLl9lbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgc2V0IG1vZGUobW9kZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3NldF9tb2RlKHRoaXMuX2VudHJ5LCBtb2RlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSUFyY2hpdmUgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlTmF0aXZlIH0gZnJvbSBcIi4vQXJjaGl2ZU5hdGl2ZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUNvbnRleHQgfSBmcm9tIFwiLi9BcmNoaXZlQ29udGV4dFwiO1xuaW1wb3J0IHsgQXJjaGl2ZUJ1ZmZlciB9IGZyb20gXCIuL0FyY2hpdmVCdWZmZXJcIjtcbmltcG9ydCB7IEFyY2hpdmVFbnRyeSB9IGZyb20gXCIuL0FyY2hpdmVFbnRyeVwiO1xuaW1wb3J0IHsgQXJjaGl2ZVJlYWQgfSBmcm9tIFwiLi9BcmNoaXZlUmVhZFwiO1xuaW1wb3J0IHsgQXJjaGl2ZVdyaXRlIH0gZnJvbSBcIi4vQXJjaGl2ZVdyaXRlXCI7XG5pbXBvcnQgeyBOT19NRU1PUlksIFN0cmluZ0V4dHJhcyB9IGZyb20gXCIuL1V0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBBcmNoaXZlIGltcGxlbWVudHMgSUFyY2hpdmUge1xuICBwcml2YXRlIF9jb250ZXh0OiBBcmNoaXZlQ29udGV4dDtcbiAgcHJpdmF0ZSBfdmVyc2lvbiA9IFwiXCI7XG4gIHByaXZhdGUgX3ZlcnNpb25EZXRhaWxzID0gXCJcIjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29udGV4dDogQXJjaGl2ZUNvbnRleHQpIHtcbiAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmVyc2lvbigpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5fdmVyc2lvbikge1xuICAgICAgY29uc3QgdmVyc2lvblB0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV92ZXJzaW9uKCk7XG4gICAgICB0aGlzLl92ZXJzaW9uID0gU3RyaW5nRXh0cmFzLmZyb21CdWZmZXIodGhpcy5fY29udGV4dC5tZW1vcnlCdWZmZXIsIHZlcnNpb25QdHIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdmVyc2lvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmVyc2lvbkRldGFpbHMoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuX3ZlcnNpb25EZXRhaWxzKSB7XG4gICAgICBjb25zdCB2ZXJzaW9uRGV0YWlsc1B0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV92ZXJzaW9uX2RldGFpbHMoKTtcbiAgICAgIHRoaXMuX3ZlcnNpb25EZXRhaWxzID0gU3RyaW5nRXh0cmFzLmZyb21CdWZmZXIodGhpcy5fY29udGV4dC5tZW1vcnlCdWZmZXIsIHZlcnNpb25EZXRhaWxzUHRyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3ZlcnNpb25EZXRhaWxzO1xuICB9XG5cbiAgcHVibGljIHNldGxvY2FsZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IG5hbWVQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20obmFtZSk7XG4gICAgaWYgKCFuYW1lUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCByZXN1bHRQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfc2V0bG9jYWxlKG5hbWVQdHIpO1xuICAgIGlmIChyZXN1bHRQdHIpXG4gICAgICByZXR1cm4gU3RyaW5nRXh0cmFzLmZyb21CdWZmZXIodGhpcy5fY29udGV4dC5tZW1vcnlCdWZmZXIsIHJlc3VsdFB0cik7XG4gIH1cblxuICBwdWJsaWMgbmV3UmVhZCgpOiBBcmNoaXZlUmVhZCB7XG4gICAgY29uc3QgYXJjaGl2ZV9yZWFkID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfbmV3KCk7XG4gICAgaWYgKCFhcmNoaXZlX3JlYWQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICByZXR1cm4gbmV3IEFyY2hpdmVSZWFkKHRoaXMuX2NvbnRleHQsIGFyY2hpdmVfcmVhZCk7XG4gIH1cblxuICBwdWJsaWMgbmV3V3JpdGUoKTogQXJjaGl2ZVdyaXRlIHtcbiAgICBjb25zdCBhcmNoaXZlX3dyaXRlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX25ldygpO1xuICAgIGlmICghYXJjaGl2ZV93cml0ZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIHJldHVybiBuZXcgQXJjaGl2ZVdyaXRlKHRoaXMuX2NvbnRleHQsIGFyY2hpdmVfd3JpdGUpO1xuICB9XG5cbiAgcHVibGljIG5ld0VudHJ5KCk6IEFyY2hpdmVFbnRyeSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfbmV3KCk7XG4gICAgaWYgKCFlbnRyeSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIHJldHVybiBuZXcgQXJjaGl2ZUVudHJ5KHRoaXMuX2NvbnRleHQsIGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBuZXdCdWZmZXIobGVuZ3RoOiBudW1iZXIpOiBBcmNoaXZlQnVmZmVyIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX25ldyhsZW5ndGgpO1xuICAgIGlmICghb2Zmc2V0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgcmV0dXJuIG5ldyBBcmNoaXZlQnVmZmVyKHRoaXMuX2NvbnRleHQsIG9mZnNldCwgbGVuZ3RoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgaW5zdGFudGlhdGUoYnVmZmVyOiBCdWZmZXIgfCBBcnJheUJ1ZmZlcik6IFByb21pc2U8QXJjaGl2ZT4ge1xuICAgIGxldCBjb250ZXh0OiBBcmNoaXZlQ29udGV4dDtcblxuICAgIGNvbnN0IGltcG9ydE9iamVjdCA9IHtcbiAgICAgIGVudjoge1xuICAgICAgICBhcmNoaXZlX29wZW5faGFuZGxlcjogKGFyY2hpdmU6IG51bWJlcikgPT4gY29udGV4dC5hcmNoaXZlX29wZW5faGFuZGxlcihhcmNoaXZlKSxcbiAgICAgICAgYXJjaGl2ZV9yZWFkX2hhbmRsZXI6IChhcmNoaXZlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpID0+IGNvbnRleHQuYXJjaGl2ZV9yZWFkX2hhbmRsZXIoYXJjaGl2ZSwgb2Zmc2V0LCBzaXplKSxcbiAgICAgICAgYXJjaGl2ZV93cml0ZV9oYW5kbGVyOiAoYXJjaGl2ZTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgc2l6ZTogbnVtYmVyKSA9PiBjb250ZXh0LmFyY2hpdmVfd3JpdGVfaGFuZGxlcihhcmNoaXZlLCBvZmZzZXQsIHNpemUpLFxuICAgICAgICBhcmNoaXZlX2Nsb3NlX2hhbmRsZXI6IChhcmNoaXZlOiBudW1iZXIpID0+IGNvbnRleHQuYXJjaGl2ZV9jbG9zZV9oYW5kbGVyKGFyY2hpdmUpLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgaW5zdFNvdXJjZSA9IGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKGJ1ZmZlciwgaW1wb3J0T2JqZWN0KTtcbiAgICBjb25zdCBuYXRpdmUgPSBpbnN0U291cmNlLmluc3RhbmNlLmV4cG9ydHMgYXMgQXJjaGl2ZU5hdGl2ZTtcbiAgICBjb250ZXh0ID0gbmV3IEFyY2hpdmVDb250ZXh0KG5hdGl2ZSwgbmF0aXZlLm1lbW9yeSk7XG5cbiAgICByZXR1cm4gbmV3IEFyY2hpdmUoY29udGV4dCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElBcmNoaXZlLCBJQXJjaGl2ZUJ1ZmZlciB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFFX0lGTVQsIEFFX0lGUkVHLCBBRV9JRkRJUiwgRW50cnlJbmZvIH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFyY2hpdmVPcGVyYXRpb25zIHtcblxuZXhwb3J0IGludGVyZmFjZSBJRGF0YVdyaXRlciB7XG4gIHdyaXRlRGF0YShidWZmZXI6IEFycmF5QnVmZmVyLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg6IG51bWJlcik6IG51bWJlciB8IFByb21pc2U8bnVtYmVyPjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURlY29tcHJlc3NDYWxsYmFja3Mge1xuICBkaXJFbnRyeShlbnRyeTogRW50cnlJbmZvKTogdm9pZCB8IFByb21pc2U8dm9pZD47XG4gIGZpbGVFbnRyeShlbnRyeTogRW50cnlJbmZvKTogSURhdGFXcml0ZXIgfCBQcm9taXNlPElEYXRhV3JpdGVyPjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWNvbXByZXNzKGNvbnRleHQ6IElBcmNoaXZlLCBpbnB1dDogQnVmZmVyLCBjYWxsYmFja3M6IElEZWNvbXByZXNzQ2FsbGJhY2tzKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGFyY2hpdmUgPSBjb250ZXh0Lm5ld1JlYWQoKTtcblxuICBhcmNoaXZlLnN1cHBvcnRGaWx0ZXJBbGwoKTtcbiAgYXJjaGl2ZS5zdXBwb3J0Rm9ybWF0QWxsKCk7XG5cbiAgY29uc3QgY2h1bmtzOiBCdWZmZXJbXSA9IFsgaW5wdXQgXTtcbiAgYXJjaGl2ZS5vbnJlYWQgPSAoKSA9PiBjaHVua3Muc2hpZnQoKTtcbiAgYXJjaGl2ZS5vcGVuKCk7XG5cbiAgY29uc3QgYnVmZmVyID0gY29udGV4dC5uZXdCdWZmZXIoNDA5Mik7XG5cbiAgZm9yICg7Oykge1xuICAgIGNvbnN0IGVudHJ5ID0gYXJjaGl2ZS5uZXh0SGVhZGVyKCk7XG4gICAgaWYoIWVudHJ5KSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBwYXRobmFtZSA9IGVudHJ5LnBhdGhuYW1lO1xuICAgIGlmICghcGF0aG5hbWUpIHtcbiAgICAgIGFyY2hpdmUuZGF0YVNraXAoKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGluZm86IEVudHJ5SW5mbyA9IHtcbiAgICAgIHBhdGhuYW1lLFxuICAgICAgc2l6ZTogZW50cnkuc2l6ZSxcbiAgICAgIG1vZGU6IGVudHJ5Lm1vZGUsXG4gICAgfTtcblxuICAgIGxldCBzaXplID0gMDtcbiAgICBjb25zdCBmaWxldHlwZSA9IGVudHJ5Lm1vZGUgJiBBRV9JRk1UO1xuICAgIGlmIChmaWxldHlwZSA9PT0gQUVfSUZESVIpIHtcbiAgICAgIGNvbnN0IHIgPSBjYWxsYmFja3MuZGlyRW50cnkoaW5mbyk7XG4gICAgICBpZiAociBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGF3YWl0IHI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGZpbGV0eXBlID09PSBBRV9JRlJFRykge1xuICAgICAgY29uc3QgZiA9IGNhbGxiYWNrcy5maWxlRW50cnkoaW5mbyk7XG4gICAgICBsZXQgd3JpdGVyID0gKGYgaW5zdGFuY2VvZiBQcm9taXNlKSA/IChhd2FpdCBmKSA6IGY7XG4gICAgICBzaXplID0gZW50cnkuc2l6ZSB8fCAwO1xuICAgICAgd2hpbGUgKHNpemUgPiAwKSB7XG4gICAgICAgIGxldCBuID0gYXJjaGl2ZS5kYXRhUmVhZChidWZmZXIpO1xuICAgICAgICB3aGlsZSAobikge1xuICAgICAgICAgIGNvbnN0IHcgPSB3cml0ZXIud3JpdGVEYXRhKGJ1ZmZlci5idWZmZXIsIGJ1ZmZlci5ieXRlT2Zmc2V0LCBuKTtcbiAgICAgICAgICBjb25zdCBzeiA9ICh3IGluc3RhbmNlb2YgUHJvbWlzZSkgPyAoYXdhaXQgdykgOiB3O1xuICAgICAgICAgIG4gLT0gc3o7XG4gICAgICAgICAgc2l6ZSAtPSBzejtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGFyY2hpdmUuZGF0YVJlYWQoYnVmZmVyKSAhPSAwKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgJHtwYXRobmFtZX0gZmlsZSBoYXMgd3JvbmcgZGF0YSBzaXplICgke3NpemV9KWApO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNpemUgPT0gMClcbiAgICAgIGFyY2hpdmUuZGF0YVNraXAoKTtcbiAgfVxuXG4gIGJ1ZmZlci5yZWxlYXNlKCk7XG4gIGFyY2hpdmUuY2xvc2UoKTtcbiAgYXJjaGl2ZS5yZWxlYXNlKCk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUVudHJ5UmVhZGVyIHtcbiAgcGF0aG5hbWU6IHN0cmluZztcbiAgbW9kZTogbnVtYmVyO1xuICBzaXplPzogbnVtYmVyO1xuXG4gIHJlYWREYXRhKGJ1ZmZlcjogQXJyYXlCdWZmZXIsIGJ5dGVPZmZzZXQ/OiBudW1iZXIsIGJ5dGVMZW5ndGg/OiBudW1iZXIpOiBudW1iZXIgfCBQcm9taXNlPG51bWJlcj47XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb21wcmVzc0NhbGxiYWNrcyB7XG4gIG5leHRFbnRyeSgpOiBJRW50cnlSZWFkZXIgfCB1bmRlZmluZWQgfCBQcm9taXNlPElFbnRyeVJlYWRlciB8IHVuZGVmaW5lZD47XG4gIHdyaXRlRGF0YShidWZmZXI6IEFycmF5QnVmZmVyLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg6IG51bWJlcik6IG51bWJlciB8IFByb21pc2U8bnVtYmVyPjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wcmVzcyhjb250ZXh0OiBJQXJjaGl2ZSwgY2FsbGJhY2tzOiBJQ29tcHJlc3NDYWxsYmFja3MsIG91dHB1dDogc3RyaW5nKSB7XG4gIGNvbnN0IGFyY2hpdmUgPSBjb250ZXh0Lm5ld1dyaXRlKCk7XG5cbiAgYXJjaGl2ZS5zZXRGb3JtYXRGaWx0ZXJCeUV4dChvdXRwdXQpO1xuXG4gIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQubmV3QnVmZmVyKDgxOTIpO1xuXG4gIGNvbnN0IGNodW5rcyA9IG5ldyBBcnJheTxBcnJheUJ1ZmZlcj47XG4gIGFyY2hpdmUub253cml0ZSA9IChidWZmZXI6IElBcmNoaXZlQnVmZmVyKSA9PiB7XG4gICAgY2h1bmtzLnB1c2goYnVmZmVyLmJ1ZmZlci5zbGljZShidWZmZXIuYnl0ZU9mZnNldCwgYnVmZmVyLmJ5dGVPZmZzZXQgKyBidWZmZXIuYnl0ZUxlbmd0aCkpO1xuICB9XG5cbiAgY29uc3QgZmx1c2hDaHVua3MgPSBhc3luYyAoKSA9PiB7XG4gICAgZm9yICg7Oykge1xuICAgICAgY29uc3QgYnl0ZXMgPSBjaHVua3Muc2hpZnQoKTtcbiAgICAgIGlmICghYnl0ZXMpXG4gICAgICAgIHJldHVybjtcbiAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgbGV0IGxlbmd0aCA9IGJ5dGVzLmJ5dGVMZW5ndGg7XG4gICAgICB3aGlsZSAobGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHcgPSBjYWxsYmFja3Mud3JpdGVEYXRhKGJ5dGVzLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICAgIGNvbnN0IG4gPSAodyBpbnN0YW5jZW9mIFByb21pc2UpID8gKGF3YWl0IHcpIDogdztcbiAgICAgICAgb2Zmc2V0ICs9IG47XG4gICAgICAgIGxlbmd0aCAtPSBuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFyY2hpdmUub3BlbigpO1xuICBmb3IgKDs7KSB7XG4gICAgY29uc3QgeCA9IGNhbGxiYWNrcy5uZXh0RW50cnkoKTtcbiAgICBjb25zdCBpdGVyID0gKHggaW5zdGFuY2VvZiBQcm9taXNlKSA/IChhd2FpdCB4KSA6IHg7XG4gICAgaWYgKCFpdGVyKVxuICAgICAgYnJlYWs7XG5cbiAgICBjb25zdCBlbnRyeSA9IGNvbnRleHQubmV3RW50cnkoKTtcbiAgICBlbnRyeS5wYXRobmFtZSA9IGl0ZXIucGF0aG5hbWU7XG4gICAgZW50cnkubW9kZSA9IGl0ZXIubW9kZTtcblxuICAgIGlmIChpdGVyLnNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZW50cnkuc2l6ZSA9IGl0ZXIuc2l6ZTtcbiAgICB9XG5cbiAgICBhcmNoaXZlLndyaXRlSGVhZGVyKGVudHJ5KTtcblxuICAgIGlmIChpdGVyLnNpemUpIHtcbiAgICAgIGxldCBzaXplID0gaXRlci5zaXplO1xuICAgICAgd2hpbGUgKHNpemUpIHtcbiAgICAgICAgY29uc3QgciA9IGl0ZXIucmVhZERhdGEoYnVmZmVyLmJ1ZmZlciwgYnVmZmVyLmJ5dGVPZmZzZXQsIGJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgY29uc3Qgc3ogPSAociBpbnN0YW5jZW9mIFByb21pc2UpID8gKGF3YWl0IHIpIDogcjtcbiAgICAgICAgYXJjaGl2ZS53cml0ZURhdGEoYnVmZmVyLCAwLCBzeik7XG4gICAgICAgIHNpemUgLT0gc3o7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZW50cnkucmVsZWFzZSgpO1xuXG4gICAgYXdhaXQgZmx1c2hDaHVua3MoKTtcbiAgfVxuICBhcmNoaXZlLmNsb3NlKCk7XG5cbiAgYXdhaXQgZmx1c2hDaHVua3MoKTtcblxuICBidWZmZXIucmVsZWFzZSgpO1xuICBhcmNoaXZlLnJlbGVhc2UoKTtcbn1cblxufSAvLyBuYW1lc3BhY2UgQXJjaGl2ZU9wZXJhdGlvbnNcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQXJjaGl2ZU9wZW5DYWxsYmFjaywgQXJjaGl2ZVJlYWRDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIElBcmNoaXZlUmVhZCwgQVJDSElWRV9PSyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcbmltcG9ydCB7IEFyY2hpdmVCYXNlIH0gZnJvbSBcIi4vQXJjaGl2ZUJhc2VcIjtcbmltcG9ydCB7IEFyY2hpdmVFbnRyeSB9IGZyb20gXCIuL0FyY2hpdmVFbnRyeVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUJ1ZmZlciB9IGZyb20gXCIuL0FyY2hpdmVCdWZmZXJcIjtcbmltcG9ydCB7IGVycm9yQ29kZVRvU3RyaW5nLCBOT19NRU1PUlkgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZVJlYWQgZXh0ZW5kcyBBcmNoaXZlQmFzZSBpbXBsZW1lbnRzIElBcmNoaXZlUmVhZCB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgc3VwZXIoY29udGV4dCwgYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9mcmVlKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHN1cHBvcnRGaWx0ZXJBbGwoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZmlsdGVyX2FsbCh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBzdXBwb3J0Rm9ybWF0QWxsKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zdXBwb3J0X2Zvcm1hdF9hbGwodGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUGFzc3BocmFzZShwYXNzcGhyYXNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBwYXNzcGhyYXNlUHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKHBhc3NwaHJhc2UpO1xuICAgIGlmICghcGFzc3BocmFzZVB0cikgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX2FkZF9wYXNzcGhyYXNlKHRoaXMuX2FyY2hpdmUsIHBhc3NwaHJhc2VQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShwYXNzcGhyYXNlUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX29wZW4odGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGNvZGUgIT09IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfY2xvc2UodGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgbmV4dEhlYWRlcigpOiBBcmNoaXZlRW50cnkgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfbmV4dF9oZWFkZXIodGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGVudHJ5KVxuICAgICAgcmV0dXJuIG5ldyBBcmNoaXZlRW50cnkodGhpcy5fY29udGV4dCwgZW50cnkpO1xuXG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX2xhc3RfZXJyb3IodGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGNvZGUgIT09IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGF0YVJlYWQoYnVmZmVyOiBBcmNoaXZlQnVmZmVyLCBvZmZzZXQ/OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IG51bWJlciB7XG4gICAgb2Zmc2V0ID0gYnVmZmVyLmJ5dGVPZmZzZXQgKyAob2Zmc2V0IHx8IDApO1xuICAgIGxlbmd0aCA9IGxlbmd0aCB8fCBidWZmZXIuYnl0ZUxlbmd0aDtcblxuICAgIGNvbnN0IG4gPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9kYXRhKHRoaXMuX2FyY2hpdmUsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhuKSB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG47XG4gIH1cblxuICBwdWJsaWMgZGF0YVNraXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfZGF0YV9za2lwKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHNldCBvbm9wZW4oY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zZXRfb3Blbl9jYWxsYmFjayh0aGlzLl9hcmNoaXZlLCBjYWxsYmFjayk7XG4gIH1cblxuICBwdWJsaWMgc2V0IG9ucmVhZChjYWxsYmFjazogQXJjaGl2ZVJlYWRDYWxsYmFjaykge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3NldF9yZWFkX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zZXRfY2xvc2VfY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJQXJjaGl2ZVdyaXRlLCBBcmNoaXZlT3BlbkNhbGxiYWNrLCBBcmNoaXZlV3JpdGVDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIEFSQ0hJVkVfT0sgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5pbXBvcnQgeyBBcmNoaXZlQmFzZSB9IGZyb20gXCIuL0FyY2hpdmVCYXNlXCI7XG5pbXBvcnQgeyBBcmNoaXZlRW50cnkgfSBmcm9tIFwiLi9BcmNoaXZlRW50cnlcIjtcbmltcG9ydCB7IEFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlQnVmZmVyXCI7XG5pbXBvcnQgeyBOT19NRU1PUlksIGVycm9yQ29kZVRvU3RyaW5nIH0gZnJvbSBcIi4vVXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEFyY2hpdmVXcml0ZSBleHRlbmRzIEFyY2hpdmVCYXNlIGltcGxlbWVudHMgSUFyY2hpdmVXcml0ZSB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgc3VwZXIoY29udGV4dCwgYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfZnJlZSh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgZm9ybWF0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKHZhbHVlKTtcbiAgICBpZiAoIW5hbWUpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9ieV9uYW1lKHRoaXMuX2FyY2hpdmUsIG5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShuYW1lKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBvcHRpb25zKG9wdGlvbnM6IHN0cmluZykge1xuICAgIGNvbnN0IG9wdGlvbnNQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9vcHRpb25zKHRoaXMuX2FyY2hpdmUsIG9wdGlvbnNQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShvcHRpb25zUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBwYXNzcGhyYXNlKHBhc3NwaHJhc2U6IHN0cmluZykge1xuICAgIGNvbnN0IHBhc3NwaHJhc2VQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ocGFzc3BocmFzZSk7XG4gICAgaWYgKCFwYXNzcGhyYXNlUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9wYXNzcGhyYXNlKHRoaXMuX2FyY2hpdmUsIHBhc3NwaHJhc2VQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShwYXNzcGhyYXNlUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZEZpbHRlcihmaWx0ZXI6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20oZmlsdGVyKTtcbiAgICBpZiAoIW5hbWUpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfYWRkX2ZpbHRlcl9ieV9uYW1lKHRoaXMuX2FyY2hpdmUsIG5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShuYW1lKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldEZvcm1hdEZpbHRlckJ5RXh0KGZpbGVuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmbmFtZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJvbShmaWxlbmFtZSk7XG4gICAgaWYgKCFmbmFtZSkgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2ZpbHRlcl9ieV9leHQodGhpcy5fYXJjaGl2ZSwgZm5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShmbmFtZSk7XG4gICAgaWYgKGNvZGUgIT0gQVJDSElWRV9PSykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuZXJyb3JTdHJpbmcsIHsgY2F1c2U6IGVycm9yQ29kZVRvU3RyaW5nKGNvZGUpIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25vcGVuKGNhbGxiYWNrOiBBcmNoaXZlT3BlbkNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9vcGVuX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb253cml0ZShjYWxsYmFjazogQXJjaGl2ZVdyaXRlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X3dyaXRlX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X29wZW5fY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9vcGVuKHRoaXMuX2FyY2hpdmUpO1xuICAgIGlmIChjb2RlICE9PSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9jbG9zZSh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZUhlYWRlcihlbnRyeTogQXJjaGl2ZUVudHJ5KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX2hlYWRlcih0aGlzLl9hcmNoaXZlLCBlbnRyeS5tZW1vcnlPZmZzZXQpO1xuICB9XG5cbiAgcHVibGljIHdyaXRlRGF0YShidWZmZXI6IEFyY2hpdmVCdWZmZXIsIG9mZnNldD86IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBvZmZzZXQgPSBidWZmZXIuYnl0ZU9mZnNldCArIChvZmZzZXQgfHwgMCk7XG4gICAgbGVuZ3RoID0gbGVuZ3RoIHx8IGJ1ZmZlci5ieXRlTGVuZ3RoIC0gb2Zmc2V0O1xuXG4gICAgY29uc3QgbiA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9kYXRhKHRoaXMuX2FyY2hpdmUsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhuKSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbjtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcmlwdERpcmVjdG9yeSgpIHtcbiAgaWYgKHR5cGVvZiBfX2Rpcm5hbWUgIT09ICd1bmRlZmluZWQnKVxuICAgIHJldHVybiBldmFsKFwiX19kaXJuYW1lXCIpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRmlsZUhhbmRsZSB7XG4gIHJlYWQoYnVmZmVyOiBVaW50OEFycmF5KTogUHJvbWlzZTx7IGJ5dGVzUmVhZDogbnVtYmVyfT47XG4gIHdyaXRlKGJ1ZmZlcjogVWludDhBcnJheSk6IFByb21pc2U8eyBieXRlc1dyaXR0ZW46IG51bWJlciB9PjtcbiAgY2xvc2UoKTogUHJvbWlzZTx2b2lkPjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTeXN0ZW0ge1xuICBta2RpcihwYXRoOiBzdHJpbmcsIG9wdGlvbnM6IHsgcmVjdXJzaXZlOiBib29sZWFuIH0pOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD47XG4gIG9wZW4ocGF0aDogc3RyaW5nLCBmbGFncz86IHN0cmluZyB8IG51bWJlciwgbW9kZT86IG51bWJlcik6IFByb21pc2U8SUZpbGVIYW5kbGU+O1xuICByZWFkRmlsZShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj47XG59O1xuXG5leHBvcnQgbmFtZXNwYWNlIEZpbGVTeXN0ZW0ge1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vZGUob3B0aW9ucz86IHsgd2l0aE1rZGlyQ2FjaGU/OiBib29sZWFuLCBjdXJyZW50RGlyPzogc3RyaW5nIH0pOiBJRmlsZVN5c3RlbVxue1xuICBjb25zdCBob3N0RnM6IElGaWxlU3lzdGVtID0ge1xuICAgIG1rZGlyOiBmcy5wcm9taXNlcy5ta2RpcixcbiAgICBvcGVuOiBmcy5wcm9taXNlcy5vcGVuLFxuICAgIHJlYWRGaWxlOiBmcy5wcm9taXNlcy5yZWFkRmlsZSxcbiAgfTtcblxuICBpZihvcHRpb25zPy53aXRoTWtkaXJDYWNoZSkge1xuICAgIGNvbnN0IG1rZGlyQ2FjaGUgPSBuZXcgTWtkaXJDYWNoZTtcbiAgICBob3N0RnMubWtkaXIgPSAoZGlyUGF0aDogc3RyaW5nLCBvcHRpb25zOiB7IHJlY3Vyc2l2ZTogYm9vbGVhbiB9KTogUHJvbWlzZTxzdHJpbmcgfCB1bmRlZmluZWQ+ID0+IHtcbiAgICAgIHJldHVybiBta2RpckNhY2hlLm1rZGlyKGRpclBhdGgsIG9wdGlvbnMpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gaG9zdEZzO1xufVxufSAvLyBuYW1lc3BhY2UgRmlsZVN5c3RlbVxuXG5leHBvcnQgbmFtZXNwYWNlIFBhdGhTZXAge1xuXG50eXBlIFNlcFBhaXIgPSAgWyBmaXJzdDogc3RyaW5nLCBzZWNvbmQ6IHN0cmluZyBdO1xuXG5sZXQgc19pbnN0YW5jZToge1xuICBuYXRpdmU6IFNlcFBhaXIsXG4gIHdpbjMyOiBTZXBQYWlyLFxuICBwb3NpeDpTZXBQYWlyLFxufTtcblxuZnVuY3Rpb24gZ2V0SW5zdGFjZSgpIHtcbiAgaWYgKCFzX2luc3RhbmNlKSB7XG4gICAgY29uc3Qgd2luMzI6IFNlcFBhaXIgPSBbIHBhdGgud2luMzIuc2VwLCBwYXRoLnBvc2l4LnNlcCBdO1xuICAgIGNvbnN0IHBvc2l4OiBTZXBQYWlyID0gWyBwYXRoLnBvc2l4LnNlcCwgcGF0aC53aW4zMi5zZXAgXTtcbiAgICBjb25zdCBuYXRpdmUgPSAob3MucGxhdGZvcm0oKSA9PT0gXCJ3aW4zMlwiKSA/IHdpbjMyIDogcG9zaXg7XG4gICAgc19pbnN0YW5jZSA9IHsgbmF0aXZlLCB3aW4zMiwgcG9zaXggfTtcbiAgfVxuICByZXR1cm4gc19pbnN0YW5jZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcHJlc2VudFBhdGhBc05hdGl2ZShpbnB1dFBhdGg6IHN0cmluZykge1xuICBjb25zdCBwYWlyID0gZ2V0SW5zdGFjZSgpLm5hdGl2ZTtcbiAgcmV0dXJuIGlucHV0UGF0aC5yZXBsYWNlQWxsKHBhaXJbMV0sIHBhaXJbMF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwcmVzZW50UGF0aEFzUG9zaXgoaW5wdXRQYXRoOiBzdHJpbmcpIHtcbiAgY29uc3QgcGFpciA9IGdldEluc3RhY2UoKS5wb3NpeDtcbiAgcmV0dXJuIGlucHV0UGF0aC5yZXBsYWNlQWxsKHBhaXJbMV0sIHBhaXJbMF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwcmVzZW50UGF0aEFzV2luMzIoaW5wdXRQYXRoOiBzdHJpbmcpIHtcbiAgY29uc3QgcGFpciA9IGdldEluc3RhY2UoKS53aW4zMjtcbiAgcmV0dXJuIGlucHV0UGF0aC5yZXBsYWNlQWxsKHBhaXJbMV0sIHBhaXJbMF0pO1xufVxuXG59IC8vIG5hbWVzcGFjZVxuXG5leHBvcnQgY2xhc3MgTWtkaXJDYWNoZSB7XG4gIHByaXZhdGUgX2Rpck1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmcgfCBudWxsPjtcbiAgXG4gIHB1YmxpYyBhc3luYyBta2RpcihkaXJQYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiB7IHJlY3Vyc2l2ZTogYm9vbGVhbiB9KSB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuX2Rpck1hcC5nZXQoZGlyUGF0aCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbClcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihkaXJQYXRoLCBvcHRpb25zKTtcbiAgICAgIHRoaXMuX2Rpck1hcC5zZXQoZGlyUGF0aCwgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSA/IG51bGwgOiByZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVTdGF0IHtcbiAgbmFtZTogc3RyaW5nO1xuICBmaWxlcGF0aDogc3RyaW5nO1xuICBzdGF0OiBmcy5TdGF0cztcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZpbGVTdGF0c0ltcGwocmVzdWx0OiBGaWxlU3RhdFtdLCBmaWxlbmFtZXM6IHN0cmluZ1tdLCBkaXJlY3Rvcnk6IHN0cmluZyk6IFByb21pc2U8RmlsZVN0YXRbXT4ge1xuICBmb3IgKGNvbnN0IG5hbWUgb2YgZmlsZW5hbWVzKSB7XG4gICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLmpvaW4oZGlyZWN0b3J5LCBQYXRoU2VwLnJlcHJlc2VudFBhdGhBc05hdGl2ZShuYW1lKSk7XG4gICAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnByb21pc2VzLnN0YXQoZmlsZXBhdGgpO1xuICAgIGNvbnN0IGl0ZW0gPSB7IG5hbWUsIGZpbGVwYXRoLCBzdGF0IH07XG4gICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgaXRlbS5uYW1lICs9IHBhdGgucG9zaXguc2VwO1xuICAgICAgY29uc3QgaXRlbXMgPSAoYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihmaWxlcGF0aCkpLm1hcChpID0+IHBhdGguam9pbihuYW1lLCBpKSk7XG4gICAgICBhd2FpdCBnZXRGaWxlU3RhdHNJbXBsKHJlc3VsdCwgaXRlbXMsIGRpcmVjdG9yeSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRGaWxlU3RhdHMoZmlsZW5hbWVzOiBzdHJpbmdbXSwgZGlyZWN0b3J5OiBzdHJpbmcpOiBQcm9taXNlPEZpbGVTdGF0W10+IHtcbiAgcmV0dXJuIGdldEZpbGVTdGF0c0ltcGwoW10sIGZpbGVuYW1lcy5tYXAoaSA9PiBQYXRoU2VwLnJlcHJlc2VudFBhdGhBc1Bvc2l4KGkpKSwgUGF0aFNlcC5yZXByZXNlbnRQYXRoQXNOYXRpdmUoZGlyZWN0b3J5KSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFSQ0hJVkVfT0ssIEFSQ0hJVkVfUkVUUlksIEFSQ0hJVkVfV0FSTiwgQVJDSElWRV9GQUlMRUQsIEFSQ0hJVkVfRkFUQUwgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5cbmV4cG9ydCBjb25zdCBOT19NRU1PUlkgPSBcIk5vIE1lbW9yeVwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIFN0cmluZ0V4dHJhcyB7IFxuZXhwb3J0IGZ1bmN0aW9uIGZyb21CdWZmZXIoYnVmZmVyOiBBcnJheUJ1ZmZlciB8IFNoYXJlZEFycmF5QnVmZmVyLCBvZmZzZXQ6IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogc3RyaW5nXG57XG4gIGxldCBieXRlczogVWludDhBcnJheTtcblxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwO1xuICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCBvZmZzZXQpO1xuICAgIHdoaWxlIChieXRlc1tsZW5ndGhdKVxuICAgICAgbGVuZ3RoKys7XG4gIH1cblxuICBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgpO1xuICBpZiAoYnVmZmVyIGluc3RhbmNlb2YgU2hhcmVkQXJyYXlCdWZmZXIpIHtcbiAgICBjb25zdCBjb3B5Qnl0ZXMgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgIGNvcHlCeXRlcy5zZXQoYnl0ZXMpO1xuICAgIGJ5dGVzID0gY29weUJ5dGVzO1xuICB9XG5cbiAgcmV0dXJuIChuZXcgVGV4dERlY29kZXIoXCJ1dGYtOFwiKSkuZGVjb2RlKGJ5dGVzKTtcbn1cbn0gLy8gbmFtZXNwYWNlIFN0cmluZ0V4dHJhc1xuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JDb2RlVG9TdHJpbmcoY29kZTogbnVtYmVyKTogc3RyaW5nXG57XG4gIHN3aXRjaCAoY29kZSkge1xuICBjYXNlIEFSQ0hJVkVfT0s6XG4gICAgcmV0dXJuIFwiQVJDSElWRV9PS1wiO1xuICBjYXNlIEFSQ0hJVkVfUkVUUlk6XG4gICAgcmV0dXJuIFwiQVJDSElWRV9SRVRSWVwiO1xuICBjYXNlIEFSQ0hJVkVfV0FSTjpcbiAgICByZXR1cm4gXCJBUkNISVZFX1dBUk5cIjtcbiAgY2FzZSBBUkNISVZFX0ZBSUxFRDpcbiAgICByZXR1cm4gXCJBUkNISVZFX0ZBSUxFRFwiO1xuICBjYXNlIEFSQ0hJVkVfRkFUQUw6XG4gICAgcmV0dXJuIFwiQVJDSElWRV9GQVRBTFwiO1xuICB9XG5cbiAgaWYgKGNvZGUgPCAwKVxuICAgIHJldHVybiBcIkFSQ0hJVkVfXCIgKyAoLWNvZGUpO1xuXG4gIHRocm93IG5ldyBFcnJvcihgRXJyb3IgY29kZSAke2NvZGV9IG11c3QgYmUgbmVnYXRpdmVgKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6ZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTp1cmxcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImdsb2JhbC5kLnRzXCIgLz5cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgdXJsIGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQgeyBJQXJjaGl2ZSwgSUFyY2hpdmVFeHBvcnQsIERlY29tcHJlc3NPcHRpb25zLCBDb21wcmVzc09wdGlvbnMsIEVudHJ5SW5mbyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmUgfSBmcm9tIFwiLi9BcmNoaXZlSW1wbFwiO1xuaW1wb3J0IHsgQVJDSElWRV9PSywgQVJDSElWRV9SRVRSWSwgQVJDSElWRV9XQVJOLCBBUkNISVZFX0ZBSUxFRCwgQVJDSElWRV9GQVRBTCB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFFX0lGTVQsIEFFX0lGUkVHLCBBRV9JRkxOSywgQUVfSUZTT0NLLCBBRV9JRkNIUiwgQUVfSUZCTEssIEFFX0lGRElSLCBBRV9JRklGTyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IGdldFNjcmlwdERpcmVjdG9yeSwgUGF0aFNlcCwgZ2V0RmlsZVN0YXRzLCBNa2RpckNhY2hlIH0gZnJvbSBcIi4vRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgQXJjaGl2ZU9wZXJhdGlvbnMgfSBmcm9tIFwiLi9BcmNoaXZlT3BlcmF0aW9uc1wiO1xuXG5hc3luYyBmdW5jdGlvbiBmZXRjaEJ1ZmZlcihzdHI6IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XG4gIGlmICghKHN0ci5zdGFydHNXaXRoKFwiaHR0cDovL1wiKSB8fCBzdHIuc3RhcnRzV2l0aChcImh0dHBzOi8vXCIpKSkge1xuICAgIGNvbnN0IGZpbGVwYXRoID0gc3RyLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpID8gdXJsLmZpbGVVUkxUb1BhdGgoc3RyKSA6IHN0cjtcbiAgICByZXR1cm4gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZmlsZXBhdGgpO1xuICB9XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goc3RyKTtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBuZXdBcmNoaXZlQ29udGV4dChwYXJhbXM6IHN0cmluZyB8IEJ1ZmZlcik6IFByb21pc2U8SUFyY2hpdmU+IHtcbiAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpXG4gICAgcGFyYW1zID0gYXdhaXQgZmV0Y2hCdWZmZXIocGFyYW1zKTtcbiAgcmV0dXJuIEFyY2hpdmUuaW5zdGFudGlhdGUocGFyYW1zKTtcbn1cblxubGV0IGdfYXJjaGl2ZTogSUFyY2hpdmU7XG5hc3luYyBmdW5jdGlvbiBnZXRBcmNoaXZlQ29udGV4dChwYXJhbXM/OiBzdHJpbmcgfCBCdWZmZXIpOiBQcm9taXNlPElBcmNoaXZlPiB7XG4gIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBuZXdBcmNoaXZlQ29udGV4dChwYXJhbXMpO1xuICB9XG5cbiAgaWYgKCFnX2FyY2hpdmUpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGguam9pbihnZXRTY3JpcHREaXJlY3RvcnkoKSwgTElCQVJDSElWRV9XQVNNX0ZJTEVOQU1FKTtcbiAgICBnX2FyY2hpdmUgPSBhd2FpdCBuZXdBcmNoaXZlQ29udGV4dChmaWxlbmFtZSk7XG4gIH1cblxuICByZXR1cm4gZ19hcmNoaXZlO1xufVxuXG5mdW5jdGlvbiBzZXRsb2NhbGUoY29udGV4dDogSUFyY2hpdmUsIG5hbWU/OiBzdHJpbmcsIHZlcmJvc2U/OiBib29sZWFuKSB7XG4gIGlmIChuYW1lID09PSB1bmRlZmluZWQpXG4gICAgbmFtZSA9IHByb2Nlc3MuZW52LkxBTkcgfHwgcHJvY2Vzcy5lbnYuTEFOR1VBR0UgfHwgcHJvY2Vzcy5lbnYuTENfQUxMIHx8IHByb2Nlc3MuZW52LkxDX01FU1NBR0VTO1xuXG4gIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCByZXN1bHQgPSBjb250ZXh0LnNldGxvY2FsZShuYW1lKTtcbiAgICBpZiAodmVyYm9zZSAmJiByZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS53YXJuKGBVbmFibGUgdG8gc2V0IGxvY2FsZSAke25hbWV9YCk7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGxpYmFyY2hpdmU6IElBcmNoaXZlRXhwb3J0ID0gT2JqZWN0LmFzc2lnbihnZXRBcmNoaXZlQ29udGV4dCwge1xuICBBUkNISVZFX09LLFxuICBBUkNISVZFX1JFVFJZLFxuICBBUkNISVZFX1dBUk4sXG4gIEFSQ0hJVkVfRkFJTEVELFxuICBBUkNISVZFX0ZBVEFMLFxuXG4gIEFFX0lGTVQsXG4gIEFFX0lGUkVHLFxuICBBRV9JRkxOSyxcbiAgQUVfSUZTT0NLLFxuICBBRV9JRkNIUixcbiAgQUVfSUZCTEssXG4gIEFFX0lGRElSLFxuICBBRV9JRklGTyxcblxuICBhc3luYyBkZWNvbXByZXNzKGlucHV0OiBzdHJpbmcgfCBCdWZmZXIsIG91dHB1dD86IHN0cmluZywgb3B0aW9ucz86IERlY29tcHJlc3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdmVyYm9zZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy52ZXJib3NlO1xuXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaW5wdXQgPSBhd2FpdCBmZXRjaEJ1ZmZlcihpbnB1dCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0RGlyID0gcGF0aC5yZXNvbHZlKG91dHB1dCA/IFBhdGhTZXAucmVwcmVzZW50UGF0aEFzTmF0aXZlKG91dHB1dCkgOiBcIlwiKTtcbiAgICBjb25zdCBta2RpckNhY2hlID0gbmV3IE1rZGlyQ2FjaGU7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICBhc3luYyBkaXJFbnRyeShlbnRyeTogRW50cnlJbmZvKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHZlcmJvc2UgJiYgY29uc29sZS5sb2coXCJ4XCIsIGVudHJ5LnBhdGhuYW1lKTtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLmpvaW4ob3V0cHV0RGlyLCBQYXRoU2VwLnJlcHJlc2VudFBhdGhBc05hdGl2ZShlbnRyeS5wYXRobmFtZSkpO1xuICAgICAgICBhd2FpdCBta2RpckNhY2hlLm1rZGlyKGZpbGVwYXRoLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgIH0sXG4gICAgICBhc3luYyBmaWxlRW50cnkoZW50cnk6IEVudHJ5SW5mbykge1xuICAgICAgICB2ZXJib3NlICYmIGNvbnNvbGUubG9nKFwieFwiLCBlbnRyeS5wYXRobmFtZSk7XG4gICAgICAgIGNvbnN0IGZpbGVwYXRoID0gcGF0aC5qb2luKG91dHB1dERpciwgUGF0aFNlcC5yZXByZXNlbnRQYXRoQXNOYXRpdmUoZW50cnkucGF0aG5hbWUpKTtcbiAgICAgICAgY29uc3QgZGlycGF0aCA9IHBhdGguZGlybmFtZShmaWxlcGF0aCk7XG4gICAgICAgIGF3YWl0IG1rZGlyQ2FjaGUubWtkaXIoZGlycGF0aCwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgICAgICAgbGV0IGZpbGVIYW5kbGU6IGZzLnByb21pc2VzLkZpbGVIYW5kbGU7XG4gICAgICAgIGxldCBzaXplID0gZW50cnkuc2l6ZSB8fCAwO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYXN5bmMgd3JpdGVEYXRhKGJ1ZmZlcjogQXJyYXlCdWZmZXIsIGJ5dGVPZmZzZXQ6IG51bWJlciwgYnl0ZUxlbmd0aDogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgICAgIGlmICghc2l6ZSB8fCBzaXplIDwgYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNpemUgJHtieXRlTGVuZ3RofSB1c2VkYClcbiAgICAgICAgICAgIGlmICghZmlsZUhhbmRsZSlcbiAgICAgICAgICAgICAgZmlsZUhhbmRsZSA9IGF3YWl0IGZzLnByb21pc2VzLm9wZW4oZmlsZXBhdGgsIFwid1wiKTtcbiAgICAgICAgICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IHsgYnl0ZXNXcml0dGVuIH0gPSAoYXdhaXQgZmlsZUhhbmRsZS53cml0ZShieXRlcykpO1xuICAgICAgICAgICAgc2l6ZSAtPSBieXRlc1dyaXR0ZW47XG4gICAgICAgICAgICBpZiAoIXNpemUpXG4gICAgICAgICAgICAgIGF3YWl0IGZpbGVIYW5kbGUuY2xvc2UoKTtcbiAgICAgICAgICAgIHJldHVybiBieXRlc1dyaXR0ZW47XG4gICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgY29udGV4dCA9IGF3YWl0IGdldEFyY2hpdmVDb250ZXh0KG9wdGlvbnM/Lm1vZHVsZVVybCk7XG4gICAgc2V0bG9jYWxlKGNvbnRleHQsIG9wdGlvbnM/LmxvY2FsZSwgb3B0aW9ucz8udmVyYm9zZSk7XG4gICAgcmV0dXJuIEFyY2hpdmVPcGVyYXRpb25zLmRlY29tcHJlc3MoY29udGV4dCwgaW5wdXQsIGNhbGxiYWNrcyk7XG4gIH0sXG5cbiAgYXN5bmMgY29tcHJlc3MoaW5wdXQ6IHN0cmluZyB8IHN0cmluZ1tdLCBvdXRwdXQ6IHN0cmluZywgb3B0aW9ucz86IENvbXByZXNzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHZlcmJvc2UgPSBvcHRpb25zICYmIG9wdGlvbnMudmVyYm9zZTtcbiAgICBjb25zdCBjdXJyZW50RGlyZWN0b3J5ID0gb3B0aW9ucyAmJiBvcHRpb25zLmRpcmVjdG9yeSB8fCBwcm9jZXNzLmN3ZCgpO1xuICAgIGNvbnN0IG91dHB1dEhhbmRsZSA9IGF3YWl0IGZzLnByb21pc2VzLm9wZW4ob3V0cHV0LCBcIndcIik7XG4gICAgY29uc3QgZmlsZUVudHJpZXMgPSBhd2FpdCBnZXRGaWxlU3RhdHMoWyBpbnB1dCBdLmZsYXQoKSwgY3VycmVudERpcmVjdG9yeSk7XG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgYXN5bmMgbmV4dEVudHJ5KCkge1xuICAgICAgICBsZXQgc2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgICBsZXQgZmVudHJ5ID0gZmlsZUVudHJpZXMuc2hpZnQoKTtcbiAgICAgICAgZm9yICg7Oykge1xuICAgICAgICAgIGlmICghZmVudHJ5KVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICBpZiAoZmVudHJ5LnN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgIHNpemUgPSBmZW50cnkuc3RhdC5zaXplO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICghZmVudHJ5LnN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgdmVyYm9zZSAmJiBjb25zb2xlLndhcm4oZmVudHJ5Lm5hbWUsIFwic2tpcHBlZFwiKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2ZXJib3NlICYmIGNvbnNvbGUubG9nKGZlbnRyeS5uYW1lKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmaWxlSGFuZGxlOiBmcy5wcm9taXNlcy5GaWxlSGFuZGxlO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcGF0aG5hbWU6IGZlbnRyeS5uYW1lLFxuICAgICAgICAgIG1vZGU6IGZlbnRyeS5zdGF0Lm1vZGUsXG4gICAgICAgICAgc2l6ZSxcblxuICAgICAgICAgIGFzeW5jIHJlYWREYXRhKGJ1ZmZlcjogQXJyYXlCdWZmZXIsIGJ5dGVPZmZzZXQ6IG51bWJlciwgYnl0ZUxlbmd0aDogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgICAgIGlmICghc2l6ZSlcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBEYXRhYCk7XG5cbiAgICAgICAgICAgIGlmICghZmlsZUhhbmRsZSkge1xuICAgICAgICAgICAgICBmaWxlSGFuZGxlID0gYXdhaXQgZnMucHJvbWlzZXMub3BlbihmZW50cnkuZmlsZXBhdGgsIFwiclwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIsIGJ5dGVPZmZzZXQsIE1hdGgubWluKGJ5dGVMZW5ndGgsIHNpemUpKTtcbiAgICAgICAgICAgIGNvbnN0IHsgYnl0ZXNSZWFkIH0gPSBhd2FpdCBmaWxlSGFuZGxlLnJlYWQoYnl0ZXMpO1xuICAgICAgICAgICAgc2l6ZSAtPSBieXRlc1JlYWQ7XG5cbiAgICAgICAgICAgIGlmICghc2l6ZSkge1xuICAgICAgICAgICAgICBhd2FpdCBmaWxlSGFuZGxlLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBieXRlc1JlYWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGFzeW5jIHdyaXRlRGF0YShidWZmZXI6IEFycmF5QnVmZmVyLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IHsgYnl0ZXNXcml0dGVuIH0gPSBhd2FpdCBvdXRwdXRIYW5kbGUud3JpdGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKSk7XG4gICAgICAgIHJldHVybiBieXRlc1dyaXR0ZW47XG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZ2V0QXJjaGl2ZUNvbnRleHQob3B0aW9ucz8ubW9kdWxlVXJsKTtcbiAgICBzZXRsb2NhbGUoY29udGV4dCwgb3B0aW9ucz8ubG9jYWxlLCBvcHRpb25zPy52ZXJib3NlKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBBcmNoaXZlT3BlcmF0aW9ucy5jb21wcmVzcyhjb250ZXh0LCBjYWxsYmFja3MsIG91dHB1dCk7XG4gICAgYXdhaXQgb3V0cHV0SGFuZGxlLmNsb3NlKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBsaWJhcmNoaXZlO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9