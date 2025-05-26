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
        const pathnamePtr = this._context.archive_entry_pathname_utf8(this._entry);
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
    return null;
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
/* harmony import */ var _ArchiveImpl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ArchiveImpl */ "./src/ArchiveImpl.ts");
/* harmony import */ var _Archive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Archive */ "./src/Archive.ts");
/* harmony import */ var _FileSystem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FileSystem */ "./src/FileSystem.ts");
/* harmony import */ var _ArchiveOperations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ArchiveOperations */ "./src/ArchiveOperations.ts");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(node_url__WEBPACK_IMPORTED_MODULE_6__);
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
        const filepath = str.startsWith("file://") ? node_url__WEBPACK_IMPORTED_MODULE_6___default().fileURLToPath(str) : str;
        return await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.readFile(filepath);
    }
    const response = await fetch(str);
    return Buffer.from(await response.arrayBuffer());
}
async function newArchiveContext(params) {
    if (typeof params === "string")
        params = await fetchBuffer(params);
    return _ArchiveImpl__WEBPACK_IMPORTED_MODULE_2__.Archive.instantiate(params);
}
let g_archive;
async function getArchiveContext(params) {
    if (params !== undefined) {
        return newArchiveContext(params);
    }
    if (!g_archive) {
        const filename = node_path__WEBPACK_IMPORTED_MODULE_0___default().join((0,_FileSystem__WEBPACK_IMPORTED_MODULE_4__.getScriptDirectory)(), "libarchive.wasm");
        g_archive = await newArchiveContext(filename);
    }
    return g_archive;
}
const libarchive = Object.assign(getArchiveContext, {
    ARCHIVE_OK: _Archive__WEBPACK_IMPORTED_MODULE_3__.ARCHIVE_OK,
    ARCHIVE_RETRY: _Archive__WEBPACK_IMPORTED_MODULE_3__.ARCHIVE_RETRY,
    ARCHIVE_WARN: _Archive__WEBPACK_IMPORTED_MODULE_3__.ARCHIVE_WARN,
    ARCHIVE_FAILED: _Archive__WEBPACK_IMPORTED_MODULE_3__.ARCHIVE_FAILED,
    ARCHIVE_FATAL: _Archive__WEBPACK_IMPORTED_MODULE_3__.ARCHIVE_FATAL,
    AE_IFMT: _Archive__WEBPACK_IMPORTED_MODULE_3__.AE_IFMT,
    AE_IFREG: _Archive__WEBPACK_IMPORTED_MODULE_3__.AE_IFREG,
    AE_IFLNK: _Archive__WEBPACK_IMPORTED_MODULE_3__.AE_IFLNK,
    AE_IFSOCK: _Archive__WEBPACK_IMPORTED_MODULE_3__.AE_IFSOCK,
    AE_IFCHR: _Archive__WEBPACK_IMPORTED_MODULE_3__.AE_IFCHR,
    AE_IFBLK: _Archive__WEBPACK_IMPORTED_MODULE_3__.AE_IFBLK,
    AE_IFDIR: _Archive__WEBPACK_IMPORTED_MODULE_3__.AE_IFDIR,
    AE_IFIFO: _Archive__WEBPACK_IMPORTED_MODULE_3__.AE_IFIFO,
    async decompress(input, output, options) {
        const verbose = options && options.verbose;
        if (typeof input === "string") {
            input = await fetchBuffer(input);
        }
        const outputDir = node_path__WEBPACK_IMPORTED_MODULE_0___default().resolve(output ? _FileSystem__WEBPACK_IMPORTED_MODULE_4__.PathSep.representPathAsNative(output) : "");
        const mkdirCache = new _FileSystem__WEBPACK_IMPORTED_MODULE_4__.MkdirCache;
        const callbacks = {
            async dirEntry(entry) {
                verbose && console.log("x", entry.pathname);
                const filepath = node_path__WEBPACK_IMPORTED_MODULE_0___default().join(outputDir, _FileSystem__WEBPACK_IMPORTED_MODULE_4__.PathSep.representPathAsNative(entry.pathname));
                await mkdirCache.mkdir(filepath, { recursive: true });
            },
            async fileEntry(entry) {
                verbose && console.log("x", entry.pathname);
                const filepath = node_path__WEBPACK_IMPORTED_MODULE_0___default().join(outputDir, _FileSystem__WEBPACK_IMPORTED_MODULE_4__.PathSep.representPathAsNative(entry.pathname));
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
        return _ArchiveOperations__WEBPACK_IMPORTED_MODULE_5__.ArchiveOperations.decompress(context, input, callbacks);
    },
    async compress(input, output, options) {
        const verbose = options && options.verbose;
        const currentDirectory = options && options.directory || process.cwd();
        const outputHandle = await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.open(output, "w");
        const fileEntries = await (0,_FileSystem__WEBPACK_IMPORTED_MODULE_4__.getFileStats)([input].flat(), currentDirectory);
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
        const result = await _ArchiveOperations__WEBPACK_IMPORTED_MODULE_5__.ArchiveOperations.compress(context, callbacks, output);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFVLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQzNCLENBQUM7d0JBRUQsT0FBTyxTQUFTLENBQUM7b0JBQ25CLENBQUM7aUJBQ0YsQ0FBQztZQUNKLENBQUM7WUFDRCxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQW1CLEVBQUUsVUFBa0IsRUFBRSxVQUFrQjtnQkFDekUsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0sWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xHLE9BQU8sWUFBWSxDQUFDO1lBQ3RCLENBQUM7U0FDRixDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDNUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxpRUFBaUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1RSxNQUFNLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsaUVBQWUsVUFBVSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlLnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZUJhc2UudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlQnVmZmVyLnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZUNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlRW50cnkudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlSW1wbC50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVPcGVyYXRpb25zLnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZVJlYWQudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlV3JpdGUudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9GaWxlU3lzdGVtLnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvVXRpbHMudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpmc1wiIiwid2VicGFjazovL2xpYmFyY2hpdmUvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6b3NcIiIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOnBhdGhcIiIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOnVybFwiIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvTm9kZUxpYnJhcnkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibGliYXJjaGl2ZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJsaWJhcmNoaXZlXCJdID0gZmFjdG9yeSgpO1xufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgQVJDSElWRV9PSyA9IDA7XG5leHBvcnQgY29uc3QgQVJDSElWRV9SRVRSWSA9IC0xMDtcbmV4cG9ydCBjb25zdCBBUkNISVZFX1dBUk4gPSAtMjA7XG5leHBvcnQgY29uc3QgQVJDSElWRV9GQUlMRUQgPSAtMjU7XG5leHBvcnQgY29uc3QgQVJDSElWRV9GQVRBTCA9IC0zMDtcblxuZXhwb3J0IGNvbnN0IEFFX0lGTVQgICA9IDB4ZjAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRlJFRyAgPSAweDgwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZMTksgID0gMHhhMDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGU09DSyA9IDB4YzAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRkNIUiAgPSAweDIwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZCTEsgID0gMHg2MDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGRElSICA9IDB4NDAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRklGTyAgPSAweDEwMDA7XG5cbmV4cG9ydCB0eXBlIEFyY2hpdmVPcGVuQ2FsbGJhY2sgPSAoKSA9PiBudW1iZXI7XG5leHBvcnQgdHlwZSBBcmNoaXZlUmVhZENhbGxiYWNrID0gKCkgPT4gQnVmZmVyIHwgdW5kZWZpbmVkO1xuZXhwb3J0IHR5cGUgQXJjaGl2ZVdyaXRlQ2FsbGJhY2sgPSAoYnVmZmVyOiBJQXJjaGl2ZUJ1ZmZlcikgPT4gdm9pZDtcbmV4cG9ydCB0eXBlIEFyY2hpdmVDbG9zZUNhbGxiYWNrID0gKCkgPT4gbnVtYmVyO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcmNoaXZlQnVmZmVyIHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIGdldCBidWZmZXIoKTogQXJyYXlCdWZmZXI7XG4gIGdldCBieXRlT2Zmc2V0KCk6IG51bWJlcjtcbiAgZ2V0IGJ5dGVMZW5ndGgoKTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZUVudHJ5IHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIGdldCBwYXRobmFtZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHNldCBwYXRobmFtZSh2YWx1ZTogc3RyaW5nKTtcblxuICBnZXQgc2l6ZSgpOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHNldCBzaXplKHZhbHVlOiBudW1iZXIpO1xuXG4gIGdldCBtb2RlKCk6IG51bWJlcjtcbiAgc2V0IG1vZGUobW9kZTogbnVtYmVyKTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmVSZWFkIHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIGdldCBlcnJubygpOiBudW1iZXI7XG4gIGdldCBlcnJvclN0cmluZygpOiBzdHJpbmc7XG5cbiAgc3VwcG9ydEZpbHRlckFsbCgpOiB2b2lkO1xuICBzdXBwb3J0Rm9ybWF0QWxsKCk6IHZvaWQ7XG5cbiAgYWRkUGFzc3BocmFzZShwYXNzcGhyYXNlOiBzdHJpbmcpOiB2b2lkO1xuXG4gIHNldCBvbm9wZW4oY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spO1xuICBzZXQgb25yZWFkKGNhbGxiYWNrOiBBcmNoaXZlUmVhZENhbGxiYWNrKTtcbiAgc2V0IG9uY2xvc2UoY2FsbGJhY2s6IEFyY2hpdmVDbG9zZUNhbGxiYWNrKTtcblxuICBvcGVuKCk6IHZvaWQ7XG4gIGNsb3NlKCk6IHZvaWQ7XG4gIG5leHRIZWFkZXIoKTogSUFyY2hpdmVFbnRyeSB8IHVuZGVmaW5lZDtcbiAgZGF0YVJlYWQoYnVmZmVyOiBJQXJjaGl2ZUJ1ZmZlciwgb2Zmc2V0PzogbnVtYmVyLCBsZW5ndGg/OiBudW1iZXIpOiBudW1iZXI7XG4gIGRhdGFTa2lwKCk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmVXcml0ZSB7XG4gIHJlbGVhc2UoKTogdm9pZDtcblxuICBnZXQgZXJybm8oKTogbnVtYmVyO1xuICBnZXQgZXJyb3JTdHJpbmcoKTogc3RyaW5nO1xuXG4gIHNldCBmb3JtYXQodmFsdWU6IHN0cmluZyk7XG4gIHNldCBvcHRpb25zKG9wdGlvbnM6IHN0cmluZyk7XG4gIHNldCBwYXNzcGhyYXNlKHBhc3NwaHJhc2U6IHN0cmluZyk7XG4gIGFkZEZpbHRlcihmaWx0ZXI6IHN0cmluZyk6IHZvaWQ7XG4gIHNldEZvcm1hdEZpbHRlckJ5RXh0KGZpbGVuYW1lOiBzdHJpbmcpOiB2b2lkO1xuXG4gIHNldCBvbm9wZW4oY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spO1xuICBzZXQgb253cml0ZShjYWxsYmFjazogQXJjaGl2ZVdyaXRlQ2FsbGJhY2spO1xuICBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spO1xuXG4gIG9wZW4oKTogdm9pZDtcbiAgY2xvc2UoKTogdm9pZDtcbiAgd3JpdGVIZWFkZXIoZW50cnk6IElBcmNoaXZlRW50cnkpOiBudW1iZXI7XG4gIHdyaXRlRGF0YShidWZmZXI6IElBcmNoaXZlQnVmZmVyLCBvZmZzZXQ/OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmUge1xuICBuZXdSZWFkKCk6IElBcmNoaXZlUmVhZDtcbiAgbmV3V3JpdGUoKTogSUFyY2hpdmVXcml0ZTtcbiAgbmV3RW50cnkoKTogSUFyY2hpdmVFbnRyeTtcbiAgbmV3QnVmZmVyKGxlbmd0aDogbnVtYmVyKTogSUFyY2hpdmVCdWZmZXI7XG59O1xuXG5leHBvcnQgdHlwZSBEZWNvbXByZXNzT3B0aW9ucyA9IHtcbiAgdmVyYm9zZT86IGJvb2xlYW47XG4gIG1vZHVsZVVybD86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIENvbXByZXNzT3B0aW9ucyA9IHtcbiAgdmVyYm9zZT86IGJvb2xlYW47XG4gIG1vZHVsZVVybD86IHN0cmluZztcbiAgZGlyZWN0b3J5Pzogc3RyaW5nO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBFbnRyeUluZm8ge1xuICBwYXRobmFtZTogc3RyaW5nO1xuICBtb2RlOiBudW1iZXI7XG4gIHNpemU/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcmNoaXZlRXhwb3J0IHtcbiAgKHBhcmFtcz86IHN0cmluZyB8IEJ1ZmZlcik6IFByb21pc2U8SUFyY2hpdmU+O1xuXG4gIHJlYWRvbmx5IEFSQ0hJVkVfT0s6IG51bWJlcjtcbiAgcmVhZG9ubHkgQVJDSElWRV9SRVRSWTogbnVtYmVyO1xuICByZWFkb25seSBBUkNISVZFX1dBUk46IG51bWJlcjtcbiAgcmVhZG9ubHkgQVJDSElWRV9GQUlMRUQ6IG51bWJlcjtcbiAgcmVhZG9ubHkgQVJDSElWRV9GQVRBTDogbnVtYmVyO1xuXG4gIHJlYWRvbmx5IEFFX0lGTVQ6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZSRUc6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZMTks6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZTT0NLOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFFX0lGQ0hSOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFFX0lGQkxLOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFFX0lGRElSOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFFX0lGSUZPOiBudW1iZXI7XG5cbiAgZGVjb21wcmVzcyhpbnB1dDogc3RyaW5nIHwgQnVmZmVyLCBvdXRwdXQ/OiBzdHJpbmcsIG9wdGlvbnM/OiBEZWNvbXByZXNzT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG4gIGNvbXByZXNzKGlucHV0OiBzdHJpbmcgfCBzdHJpbmdbXSwgb3V0cHV0OiBzdHJpbmcsIG9wdGlvbnM/OiBDb21wcmVzc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQXJjaGl2ZUNvbnRleHQgfSBmcm9tIFwiLi9BcmNoaXZlQ29udGV4dFwiO1xuaW1wb3J0IHsgU3RyaW5nRXh0cmFzIH0gZnJvbSBcIi4vVXRpbHNcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFyY2hpdmVCYXNlIHtcbiAgcHJvdGVjdGVkIF9jb250ZXh0OiBBcmNoaXZlQ29udGV4dDtcbiAgcHJvdGVjdGVkIF9hcmNoaXZlOiBudW1iZXI7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEFyY2hpdmVDb250ZXh0LCBhcmNoaXZlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLl9hcmNoaXZlID0gYXJjaGl2ZTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCByZWxlYXNlKCk6IHZvaWQ7XG5cbiAgcHVibGljIGdldCBtZW1vcnlPZmZzZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FyY2hpdmU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVycm5vKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lcnJubyh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZXJyb3JTdHJpbmcoKTogc3RyaW5nIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZXJyb3Jfc3RyaW5nKHRoaXMuX2FyY2hpdmUpO1xuICAgIHJldHVybiBTdHJpbmdFeHRyYXMuZnJvbUJ1ZmZlcih0aGlzLl9jb250ZXh0Lm1lbW9yeUJ1ZmZlciwgb2Zmc2V0KTtcbiAgfVxuXG4gIC8vIGhhbmRsZUV2ZW50XG4gIC8vIGFkZEV2ZW50TGlzdG5lclxuICAvLyByZW1vdmVFdmVudExpc3RlbmVyXG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJQXJjaGl2ZUJ1ZmZlciB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcblxuZXhwb3J0IGNsYXNzIEFyY2hpdmVCdWZmZXIgaW1wbGVtZW50cyBJQXJjaGl2ZUJ1ZmZlciB7XG4gIHByaXZhdGUgX2NvbnRleHQ6IEFyY2hpdmVDb250ZXh0O1xuICBwcml2YXRlIF9ieXRlT2Zmc2V0OiBudW1iZXI7XG4gIHByaXZhdGUgX2J5dGVMZW5ndGg6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29udGV4dDogQXJjaGl2ZUNvbnRleHQsIGJ5dGVPZmZzZXQ6IG51bWJlciwgYnl0ZUxlbmd0aDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5fYnl0ZU9mZnNldCA9IGJ5dGVPZmZzZXQ7XG4gICAgdGhpcy5fYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2ZyZWUodGhpcy5fYnl0ZU9mZnNldCk7XG4gIH1cblxuICBnZXQgYnVmZmVyKCk6IEFycmF5QnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5tZW1vcnlCdWZmZXI7XG4gIH1cblxuICBnZXQgYnl0ZU9mZnNldCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9ieXRlT2Zmc2V0O1xuICB9XG5cbiAgZ2V0IGJ5dGVMZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYnl0ZUxlbmd0aDtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQXJjaGl2ZU9wZW5DYWxsYmFjaywgQXJjaGl2ZVJlYWRDYWxsYmFjaywgQXJjaGl2ZVdyaXRlQ2FsbGJhY2ssIEFyY2hpdmVDbG9zZUNhbGxiYWNrLCBBUkNISVZFX09LIH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZU5hdGl2ZSwgQXJjaGl2ZVB0ciwgQXJjaGl2ZUVudHJ5UHRyIH0gZnJvbSBcIi4vQXJjaGl2ZU5hdGl2ZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUJ1ZmZlciB9IGZyb20gXCIuL0FyY2hpdmVCdWZmZXJcIjtcblxudHlwZSBBcmNoaXZlUmVhZENhbGJhY2tzID0ge1xuICBvcGVuZXI/OiBBcmNoaXZlT3BlbkNhbGxiYWNrLFxuICByZWFkZXI/OiBBcmNoaXZlUmVhZENhbGxiYWNrLFxuICBjbG9zZXI/OiBBcmNoaXZlQ2xvc2VDYWxsYmFjayxcbn07XG5cbnR5cGUgQXJjaGl2ZVdyaXRlQ2FsYmFja3MgPSB7XG4gIG9wZW5lcj86IEFyY2hpdmVPcGVuQ2FsbGJhY2ssXG4gIHdyaXRlcj86IEFyY2hpdmVXcml0ZUNhbGxiYWNrLFxuICBjbG9zZXI/OiBBcmNoaXZlQ2xvc2VDYWxsYmFjayxcbn07XG5cbmNsYXNzIEFyY2hpdmVDYWxsYmFja3Mge1xuICBwcml2YXRlIF9tYXAgPSBuZXcgTWFwPG51bWJlciwgQXJjaGl2ZVJlYWRDYWxiYWNrcyB8IEFyY2hpdmVXcml0ZUNhbGJhY2tzPjtcblxuICBwdWJsaWMgZ2V0KGFyY2hpdmU6IG51bWJlcik6IEFyY2hpdmVSZWFkQ2FsYmFja3MgfCBBcmNoaXZlV3JpdGVDYWxiYWNrcyB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fbWFwLmdldChhcmNoaXZlKTtcbiAgICBpZiAoIWNhbGxiYWNrcylcbiAgICAgIHRocm93IEVycm9yKGBIYW5kbGUgJHthcmNoaXZlfSBkb2VzIG5vdCBleGlzdHNgKTtcbiAgICByZXR1cm4gY2FsbGJhY2tzO1xuICB9XG5cbiAgcHVibGljIHNldChhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrczogQXJjaGl2ZVJlYWRDYWxiYWNrcyB8IEFyY2hpdmVXcml0ZUNhbGJhY2tzKSB7XG4gICAgaWYgKCFhcmNoaXZlKVxuICAgICAgdGhyb3cgRXJyb3IoYEhhbmRsZSBpcyBudWxsYCk7XG4gICAgaWYgKHRoaXMuX21hcC5oYXMoYXJjaGl2ZSkpXG4gICAgICB0aHJvdyBFcnJvcihgSGFuZGxlICR7YXJjaGl2ZX0gaXMgcmVnaXN0cmVkYCk7XG4gICAgdGhpcy5fbWFwLnNldChhcmNoaXZlLCBjYWxsYmFja3MpO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZShhcmNoaXZlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXAuZGVsZXRlKGFyY2hpdmUpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZUNvbnRleHQge1xuICBwcml2YXRlIF9uYXRpdmU6IEFyY2hpdmVOYXRpdmU7XG4gIHByaXZhdGUgX21lbW9yeTogV2ViQXNzZW1ibHkuTWVtb3J5O1xuICBwcml2YXRlIF9jYWxsYmFja3MgPSBuZXcgQXJjaGl2ZUNhbGxiYWNrcztcbiAgcHJpdmF0ZSBfcmVhZEJ1ZmZlciA9IG5ldyBVaW50OEFycmF5O1xuXG4gIGNvbnN0cnVjdG9yKG5hdGl2ZTogQXJjaGl2ZU5hdGl2ZSwgbWVtb3J5OiBXZWJBc3NlbWJseS5NZW1vcnkpIHtcbiAgICB0aGlzLl9uYXRpdmUgPSBuYXRpdmU7XG4gICAgdGhpcy5fbWVtb3J5ID0gbWVtb3J5O1xuICB9XG5cbiAgcHVibGljIGdldCBtZW1vcnlCdWZmZXIoKTogQXJyYXlCdWZmZXIge1xuICAgIHJldHVybiB0aGlzLl9tZW1vcnkuYnVmZmVyO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfdmVyc2lvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV92ZXJzaW9uKCk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV92ZXJzaW9uX2RldGFpbHMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfdmVyc2lvbl9kZXRhaWxzKCk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lcnJubyhhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lcnJubyhhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2Vycm9yX3N0cmluZyhhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lcnJvcl9zdHJpbmcoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9vcGVuX2hhbmRsZXIoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBjbGllbnQgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpO1xuICAgIHJldHVybiBjbGllbnQub3BlbmVyID8gY2xpZW50Lm9wZW5lcigpIDogMDtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfaGFuZGxlcihhcmNoaXZlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuX3JlYWRCdWZmZXIubGVuZ3RoKSB7XG4gICAgICBjb25zdCBjbGllbnQgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVSZWFkQ2FsYmFja3M7XG4gICAgICBpZiAoIWNsaWVudC5yZWFkZXIpXG4gICAgICAgIHJldHVybiAwO1xuICAgICAgY29uc3QgYnVmID0gY2xpZW50LnJlYWRlcigpO1xuICAgICAgaWYgKCFidWYpXG4gICAgICAgIHJldHVybiAwO1xuICAgICAgdGhpcy5fcmVhZEJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgfVxuXG4gICAgY29uc3QgbiA9IE1hdGgubWluKHNpemUsIHRoaXMuX3JlYWRCdWZmZXIubGVuZ3RoKTtcbiAgICBjb25zdCBkc3QgPSBuZXcgVWludDhBcnJheSh0aGlzLl9tZW1vcnkuYnVmZmVyLCBvZmZzZXQsIG4pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKVxuICAgICAgZHN0W2ldID0gdGhpcy5fcmVhZEJ1ZmZlcltpXTtcblxuICAgIHRoaXMuX3JlYWRCdWZmZXIgPSB0aGlzLl9yZWFkQnVmZmVyLnNsaWNlKG4pO1xuICAgIHJldHVybiBuO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9sYXN0X2Vycm9yKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfbGFzdF9lcnJvcihhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX2hhbmRsZXIoYXJjaGl2ZTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgc2l6ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVXcml0ZUNhbGJhY2tzO1xuICAgIGlmIChjYWxsYmFja3Mud3JpdGVyKVxuICAgICAgY2FsbGJhY2tzLndyaXRlcihuZXcgQXJjaGl2ZUJ1ZmZlcih0aGlzLCBvZmZzZXQsIHNpemUpKVxuICAgIHJldHVybiBzaXplO1xuICB9O1xuXG4gIHB1YmxpYyBhcmNoaXZlX2Nsb3NlX2hhbmRsZXIoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBjbGllbnQgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpO1xuICAgIHJldHVybiBjbGllbnQuY2xvc2VyID8gY2xpZW50LmNsb3NlcigpIDogMDtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfbmV3KCk6IEFyY2hpdmVQdHIge1xuICAgIGNvbnN0IGFyY2hpdmUgPSB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX25ldygpO1xuICAgIGlmIChhcmNoaXZlKSB7XG4gICAgICBjb25zdCBpbXBsOiBBcmNoaXZlUmVhZENhbGJhY2tzID0ge307XG4gICAgICB0aGlzLl9jYWxsYmFja3Muc2V0KGFyY2hpdmUsIGltcGwpO1xuICAgIH1cbiAgICByZXR1cm4gYXJjaGl2ZTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfZnJlZShhcmNoaXZlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jYWxsYmFja3MuZGVsZXRlKGFyY2hpdmUpO1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfZnJlZShhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfYWRkX3Bhc3NwaHJhc2UoYXJjaGl2ZTogQXJjaGl2ZVB0ciwgcGFzc3BocmFzZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9hZGRfcGFzc3BocmFzZShhcmNoaXZlLCBwYXNzcGhyYXNlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfc3VwcG9ydF9maWx0ZXJfYWxsKGFyY2hpdmU6IG51bWJlcik6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZmlsdGVyX2FsbChhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfc3VwcG9ydF9mb3JtYXRfYWxsKGFyY2hpdmU6IG51bWJlcik6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZm9ybWF0X2FsbChhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfb3BlbihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX29wZW4oYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2Nsb3NlKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfY2xvc2UoYXJjaGl2ZSk7XG4gIH1cbiAgXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfbmV4dF9oZWFkZXIoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9uZXh0X2hlYWRlcihhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfZGF0YShhcmNoaXZlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX2RhdGEoYXJjaGl2ZSwgb2Zmc2V0LCBzaXplKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfZGF0YV9za2lwKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfZGF0YV9za2lwKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9zZXRfb3Blbl9jYWxsYmFjayhhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrOiBBcmNoaXZlT3BlbkNhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlUmVhZENhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy5vcGVuZXIgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfc2V0X3JlYWRfY2FsbGJhY2soYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFjazogQXJjaGl2ZVJlYWRDYWxsYmFjayk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVJlYWRDYWxiYWNrcztcbiAgICBjYWxsYmFja3MucmVhZGVyID0gY2FsbGJhY2s7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX3NldF9jbG9zZV9jYWxsYmFjayhhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrOiBBcmNoaXZlQ2xvc2VDYWxsYmFjayk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVJlYWRDYWxiYWNrcztcbiAgICBjYWxsYmFja3MuY2xvc2VyID0gY2FsbGJhY2s7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9uZXcoKTogQXJjaGl2ZVB0ciB7XG4gICAgY29uc3QgYXJjaGl2ZSA9IHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX25ldygpO1xuICAgIGlmIChhcmNoaXZlKSB7XG4gICAgICBjb25zdCBpbXBsOiBBcmNoaXZlV3JpdGVDYWxiYWNrcyA9IHt9O1xuICAgICAgdGhpcy5fY2FsbGJhY2tzLnNldChhcmNoaXZlLCBpbXBsKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyY2hpdmU7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9mcmVlKGFyY2hpdmU6IG51bWJlcikge1xuICAgIHRoaXMuX2NhbGxiYWNrcy5kZWxldGUoYXJjaGl2ZSk7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfZnJlZShhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF9vcHRpb25zKGFyY2hpdmU6IG51bWJlciwgb3B0aW9uczogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfc2V0X29wdGlvbnMoYXJjaGl2ZSwgb3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfcGFzc3BocmFzZShhcmNoaXZlOiBudW1iZXIsIHBhc3NwaHJhc2U6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX3NldF9wYXNzcGhyYXNlKGFyY2hpdmUsIHBhc3NwaHJhc2UpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9ieV9uYW1lKGFyY2hpdmU6IG51bWJlciwgbmFtZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9ieV9uYW1lKGFyY2hpdmUsIG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfYWRkX2ZpbHRlcl9ieV9uYW1lKGFyY2hpdmU6IG51bWJlciwgbmFtZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfYWRkX2ZpbHRlcl9ieV9uYW1lKGFyY2hpdmUsIG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9maWx0ZXJfYnlfZXh0KGFyY2hpdmU6IG51bWJlciwgZmlsZW5hbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX3NldF9mb3JtYXRfZmlsdGVyX2J5X2V4dChhcmNoaXZlLCBmaWxlbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfb3Blbl9jYWxsYmFjayhhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrOiBBcmNoaXZlT3BlbkNhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlV3JpdGVDYWxiYWNrcztcbiAgICBjYWxsYmFja3Mub3BlbmVyID0gY2FsbGJhY2s7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfd3JpdGVfY2FsbGJhY2soYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFjazogQXJjaGl2ZVdyaXRlQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVXcml0ZUNhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy53cml0ZXIgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF9jbG9zZV9jYWxsYmFjayhhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrOiBBcmNoaXZlQ2xvc2VDYWxsYmFjayk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVdyaXRlQ2FsYmFja3M7XG4gICAgY2FsbGJhY2tzLmNsb3NlciA9IGNhbGxiYWNrO1xuICB9XG4gIFxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9vcGVuKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX29wZW4oYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9jbG9zZShhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9jbG9zZShhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX2hlYWRlcihhcmNoaXZlOiBudW1iZXIsIGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9oZWFkZXIoYXJjaGl2ZSwgZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfZGF0YShhcmNoaXZlOiBBcmNoaXZlUHRyLCBvZmZzZXQ6IG51bWJlciwgc2l6ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfZGF0YShhcmNoaXZlLCBvZmZzZXQsIHNpemUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfbmV3KCk6IEFyY2hpdmVFbnRyeVB0ciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X25ldygpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfZnJlZShlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKSB7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfZnJlZShlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9wYXRobmFtZV91dGY4KGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9wYXRobmFtZV91dGY4KGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X3NldF9wYXRobmFtZV91dGY4KGVudHJ5OiBBcmNoaXZlRW50cnlQdHIsIHBhdGhuYW1lOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zZXRfcGF0aG5hbWVfdXRmOChlbnRyeSwgcGF0aG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfc2l6ZShlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKTogbnVtYmVyIHtcbiAgICBjb25zdCBsbyA9IHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3NpemVfbG8oZW50cnkpO1xuICAgIGNvbnN0IGhpID0gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfc2l6ZV9oaShlbnRyeSk7XG4gICAgcmV0dXJuIGhpICogNDI5NDk2NzI5NiArIGxvO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfc2V0X3NpemUoZW50cnk6IEFyY2hpdmVFbnRyeVB0ciwgc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfc2V0X3NpemUoZW50cnksIDAsIHNpemUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfc2l6ZV9pc19zZXQoZW50cnk6IEFyY2hpdmVFbnRyeVB0cik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3NpemVfaXNfc2V0KGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X21vZGUoZW50cnk6IEFyY2hpdmVFbnRyeVB0cik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X21vZGUoZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfc2V0X21vZGUoZW50cnk6IEFyY2hpdmVFbnRyeVB0ciwgbW9kZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfc2V0X21vZGUoZW50cnksIG1vZGUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfYnVmZmVyX25ldyhzaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9idWZmZXJfbmV3KHNpemUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfYnVmZmVyX2ZyZWUoYnVmZmVyOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9idWZmZXJfZnJlZShidWZmZXIpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfYnVmZmVyX2Zyb20oc3RyOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXI7XG4gICAgY29uc3QgYnl0ZXMgPSBlbmNvZGVyLmVuY29kZShzdHIgKyBcIlxceDAwXCIpO1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuX25hdGl2ZS5hcmNoaXZlX2J1ZmZlcl9uZXcoYnl0ZXMubGVuZ3RoKTtcbiAgICBpZiAob2Zmc2V0KVxuICAgICAgKG5ldyBVaW50OEFycmF5KHRoaXMuX21lbW9yeS5idWZmZXIsIG9mZnNldCwgYnl0ZXMubGVuZ3RoKSkuc2V0KGJ5dGVzKTtcbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJQXJjaGl2ZUVudHJ5IH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUNvbnRleHQgfSBmcm9tIFwiLi9BcmNoaXZlQ29udGV4dFwiO1xuaW1wb3J0IHsgQXJjaGl2ZUVudHJ5UHRyIH0gZnJvbSBcIi4vQXJjaGl2ZU5hdGl2ZVwiO1xuaW1wb3J0IHsgTk9fTUVNT1JZLCBTdHJpbmdFeHRyYXMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZUVudHJ5IGltcGxlbWVudHMgSUFyY2hpdmVFbnRyeSB7XG4gIHByaXZhdGUgX2NvbnRleHQ6IEFyY2hpdmVDb250ZXh0O1xuICBwcml2YXRlIF9lbnRyeTogQXJjaGl2ZUVudHJ5UHRyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgZW50cnk6IEFyY2hpdmVFbnRyeVB0cikge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuX2VudHJ5ID0gZW50cnk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfZnJlZSh0aGlzLl9lbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1lbW9yeU9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZW50cnk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhdGhuYW1lKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcGF0aG5hbWVQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfcGF0aG5hbWVfdXRmOCh0aGlzLl9lbnRyeSk7XG4gICAgaWYgKHBhdGhuYW1lUHRyKSB7XG4gICAgICByZXR1cm4gU3RyaW5nRXh0cmFzLmZyb21CdWZmZXIodGhpcy5fY29udGV4dC5tZW1vcnlCdWZmZXIsIHBhdGhuYW1lUHRyKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IHBhdGhuYW1lKHBhdGhuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXRobmFtZVB0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJvbShwYXRobmFtZSk7XG4gICAgaWYgKCFwYXRobmFtZVB0cikgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3NldF9wYXRobmFtZV91dGY4KHRoaXMuX2VudHJ5LCBwYXRobmFtZVB0cik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3NpemVfaXNfc2V0KHRoaXMuX2VudHJ5KSlcbiAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfc2l6ZSh0aGlzLl9lbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNpemUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9zZXRfc2l6ZSh0aGlzLl9lbnRyeSwgdmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBtb2RlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9tb2RlKHRoaXMuX2VudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbW9kZShtb2RlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfc2V0X21vZGUodGhpcy5fZW50cnksIG1vZGUpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJQXJjaGl2ZSB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVOYXRpdmUgfSBmcm9tIFwiLi9BcmNoaXZlTmF0aXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5pbXBvcnQgeyBBcmNoaXZlQnVmZmVyIH0gZnJvbSBcIi4vQXJjaGl2ZUJ1ZmZlclwiO1xuaW1wb3J0IHsgQXJjaGl2ZUVudHJ5IH0gZnJvbSBcIi4vQXJjaGl2ZUVudHJ5XCI7XG5pbXBvcnQgeyBBcmNoaXZlUmVhZCB9IGZyb20gXCIuL0FyY2hpdmVSZWFkXCI7XG5pbXBvcnQgeyBBcmNoaXZlV3JpdGUgfSBmcm9tIFwiLi9BcmNoaXZlV3JpdGVcIjtcbmltcG9ydCB7IE5PX01FTU9SWSwgU3RyaW5nRXh0cmFzIH0gZnJvbSBcIi4vVXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEFyY2hpdmUgaW1wbGVtZW50cyBJQXJjaGl2ZSB7XG4gIHByaXZhdGUgX2NvbnRleHQ6IEFyY2hpdmVDb250ZXh0O1xuICBwcml2YXRlIF92ZXJzaW9uID0gXCJcIjtcbiAgcHJpdmF0ZSBfdmVyc2lvbkRldGFpbHMgPSBcIlwiO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCkge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICB9XG5cbiAgcHVibGljIGdldCB2ZXJzaW9uKCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLl92ZXJzaW9uKSB7XG4gICAgICBjb25zdCB2ZXJzaW9uUHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3ZlcnNpb24oKTtcbiAgICAgIHRoaXMuX3ZlcnNpb24gPSBTdHJpbmdFeHRyYXMuZnJvbUJ1ZmZlcih0aGlzLl9jb250ZXh0Lm1lbW9yeUJ1ZmZlciwgdmVyc2lvblB0cik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl92ZXJzaW9uO1xuICB9XG5cbiAgcHVibGljIGdldCB2ZXJzaW9uRGV0YWlscygpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5fdmVyc2lvbkRldGFpbHMpIHtcbiAgICAgIGNvbnN0IHZlcnNpb25EZXRhaWxzUHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3ZlcnNpb25fZGV0YWlscygpO1xuICAgICAgdGhpcy5fdmVyc2lvbkRldGFpbHMgPSBTdHJpbmdFeHRyYXMuZnJvbUJ1ZmZlcih0aGlzLl9jb250ZXh0Lm1lbW9yeUJ1ZmZlciwgdmVyc2lvbkRldGFpbHNQdHIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdmVyc2lvbkRldGFpbHM7XG4gIH1cblxuICBwdWJsaWMgbmV3UmVhZCgpOiBBcmNoaXZlUmVhZCB7XG4gICAgY29uc3QgYXJjaGl2ZV9yZWFkID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfbmV3KCk7XG4gICAgaWYgKCFhcmNoaXZlX3JlYWQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICByZXR1cm4gbmV3IEFyY2hpdmVSZWFkKHRoaXMuX2NvbnRleHQsIGFyY2hpdmVfcmVhZCk7XG4gIH1cblxuICBwdWJsaWMgbmV3V3JpdGUoKTogQXJjaGl2ZVdyaXRlIHtcbiAgICBjb25zdCBhcmNoaXZlX3dyaXRlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX25ldygpO1xuICAgIGlmICghYXJjaGl2ZV93cml0ZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIHJldHVybiBuZXcgQXJjaGl2ZVdyaXRlKHRoaXMuX2NvbnRleHQsIGFyY2hpdmVfd3JpdGUpO1xuICB9XG5cbiAgcHVibGljIG5ld0VudHJ5KCk6IEFyY2hpdmVFbnRyeSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfbmV3KCk7XG4gICAgaWYgKCFlbnRyeSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIHJldHVybiBuZXcgQXJjaGl2ZUVudHJ5KHRoaXMuX2NvbnRleHQsIGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBuZXdCdWZmZXIobGVuZ3RoOiBudW1iZXIpOiBBcmNoaXZlQnVmZmVyIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX25ldyhsZW5ndGgpO1xuICAgIGlmICghb2Zmc2V0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgcmV0dXJuIG5ldyBBcmNoaXZlQnVmZmVyKHRoaXMuX2NvbnRleHQsIG9mZnNldCwgbGVuZ3RoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgaW5zdGFudGlhdGUoYnVmZmVyOiBCdWZmZXIgfCBBcnJheUJ1ZmZlcik6IFByb21pc2U8QXJjaGl2ZT4ge1xuICAgIGxldCBjb250ZXh0OiBBcmNoaXZlQ29udGV4dDtcblxuICAgIGNvbnN0IGltcG9ydE9iamVjdCA9IHtcbiAgICAgIGVudjoge1xuICAgICAgICBhcmNoaXZlX29wZW5faGFuZGxlcjogKGFyY2hpdmU6IG51bWJlcikgPT4gY29udGV4dC5hcmNoaXZlX29wZW5faGFuZGxlcihhcmNoaXZlKSxcbiAgICAgICAgYXJjaGl2ZV9yZWFkX2hhbmRsZXI6IChhcmNoaXZlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpID0+IGNvbnRleHQuYXJjaGl2ZV9yZWFkX2hhbmRsZXIoYXJjaGl2ZSwgb2Zmc2V0LCBzaXplKSxcbiAgICAgICAgYXJjaGl2ZV93cml0ZV9oYW5kbGVyOiAoYXJjaGl2ZTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgc2l6ZTogbnVtYmVyKSA9PiBjb250ZXh0LmFyY2hpdmVfd3JpdGVfaGFuZGxlcihhcmNoaXZlLCBvZmZzZXQsIHNpemUpLFxuICAgICAgICBhcmNoaXZlX2Nsb3NlX2hhbmRsZXI6IChhcmNoaXZlOiBudW1iZXIpID0+IGNvbnRleHQuYXJjaGl2ZV9jbG9zZV9oYW5kbGVyKGFyY2hpdmUpLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgaW5zdFNvdXJjZSA9IGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKGJ1ZmZlciwgaW1wb3J0T2JqZWN0KTtcbiAgICBjb25zdCBuYXRpdmUgPSBpbnN0U291cmNlLmluc3RhbmNlLmV4cG9ydHMgYXMgQXJjaGl2ZU5hdGl2ZTtcbiAgICBjb250ZXh0ID0gbmV3IEFyY2hpdmVDb250ZXh0KG5hdGl2ZSwgbmF0aXZlLm1lbW9yeSk7XG5cbiAgICByZXR1cm4gbmV3IEFyY2hpdmUoY29udGV4dCk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElBcmNoaXZlLCBJQXJjaGl2ZUJ1ZmZlciB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFFX0lGTVQsIEFFX0lGUkVHLCBBRV9JRkRJUiwgRW50cnlJbmZvIH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFyY2hpdmVPcGVyYXRpb25zIHtcblxuZXhwb3J0IGludGVyZmFjZSBJRGF0YVdyaXRlciB7XG4gIHdyaXRlRGF0YShidWZmZXI6IEFycmF5QnVmZmVyLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg6IG51bWJlcik6IG51bWJlciB8IFByb21pc2U8bnVtYmVyPjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURlY29tcHJlc3NDYWxsYmFja3Mge1xuICBkaXJFbnRyeShlbnRyeTogRW50cnlJbmZvKTogdm9pZCB8IFByb21pc2U8dm9pZD47XG4gIGZpbGVFbnRyeShlbnRyeTogRW50cnlJbmZvKTogSURhdGFXcml0ZXIgfCBQcm9taXNlPElEYXRhV3JpdGVyPjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWNvbXByZXNzKGNvbnRleHQ6IElBcmNoaXZlLCBpbnB1dDogQnVmZmVyLCBjYWxsYmFja3M6IElEZWNvbXByZXNzQ2FsbGJhY2tzKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGFyY2hpdmUgPSBjb250ZXh0Lm5ld1JlYWQoKTtcblxuICBhcmNoaXZlLnN1cHBvcnRGaWx0ZXJBbGwoKTtcbiAgYXJjaGl2ZS5zdXBwb3J0Rm9ybWF0QWxsKCk7XG5cbiAgY29uc3QgY2h1bmtzOiBCdWZmZXJbXSA9IFsgaW5wdXQgXTtcbiAgYXJjaGl2ZS5vbnJlYWQgPSAoKSA9PiBjaHVua3Muc2hpZnQoKTtcbiAgYXJjaGl2ZS5vcGVuKCk7XG5cbiAgY29uc3QgYnVmZmVyID0gY29udGV4dC5uZXdCdWZmZXIoNDA5Mik7XG5cbiAgZm9yICg7Oykge1xuICAgIGNvbnN0IGVudHJ5ID0gYXJjaGl2ZS5uZXh0SGVhZGVyKCk7XG4gICAgaWYoIWVudHJ5KSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBwYXRobmFtZSA9IGVudHJ5LnBhdGhuYW1lO1xuICAgIGlmICghcGF0aG5hbWUpIHtcbiAgICAgIGFyY2hpdmUuZGF0YVNraXAoKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGluZm86IEVudHJ5SW5mbyA9IHtcbiAgICAgIHBhdGhuYW1lLFxuICAgICAgc2l6ZTogZW50cnkuc2l6ZSxcbiAgICAgIG1vZGU6IGVudHJ5Lm1vZGUsXG4gICAgfTtcblxuICAgIGxldCBzaXplID0gMDtcbiAgICBjb25zdCBmaWxldHlwZSA9IGVudHJ5Lm1vZGUgJiBBRV9JRk1UO1xuICAgIGlmIChmaWxldHlwZSA9PT0gQUVfSUZESVIpIHtcbiAgICAgIGNvbnN0IHIgPSBjYWxsYmFja3MuZGlyRW50cnkoaW5mbyk7XG4gICAgICBpZiAociBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGF3YWl0IHI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGZpbGV0eXBlID09PSBBRV9JRlJFRykge1xuICAgICAgY29uc3QgZiA9IGNhbGxiYWNrcy5maWxlRW50cnkoaW5mbyk7XG4gICAgICBsZXQgd3JpdGVyID0gKGYgaW5zdGFuY2VvZiBQcm9taXNlKSA/IChhd2FpdCBmKSA6IGY7XG4gICAgICBzaXplID0gZW50cnkuc2l6ZSB8fCAwO1xuICAgICAgd2hpbGUgKHNpemUgPiAwKSB7XG4gICAgICAgIGxldCBuID0gYXJjaGl2ZS5kYXRhUmVhZChidWZmZXIpO1xuICAgICAgICB3aGlsZSAobikge1xuICAgICAgICAgIGNvbnN0IHcgPSB3cml0ZXIud3JpdGVEYXRhKGJ1ZmZlci5idWZmZXIsIGJ1ZmZlci5ieXRlT2Zmc2V0LCBuKTtcbiAgICAgICAgICBjb25zdCBzeiA9ICh3IGluc3RhbmNlb2YgUHJvbWlzZSkgPyAoYXdhaXQgdykgOiB3O1xuICAgICAgICAgIG4gLT0gc3o7XG4gICAgICAgICAgc2l6ZSAtPSBzejtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGFyY2hpdmUuZGF0YVJlYWQoYnVmZmVyKSAhPSAwKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgJHtwYXRobmFtZX0gZmlsZSBoYXMgd3JvbmcgZGF0YSBzaXplICgke3NpemV9KWApO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNpemUgPT0gMClcbiAgICAgIGFyY2hpdmUuZGF0YVNraXAoKTtcbiAgfVxuXG4gIGJ1ZmZlci5yZWxlYXNlKCk7XG4gIGFyY2hpdmUuY2xvc2UoKTtcbiAgYXJjaGl2ZS5yZWxlYXNlKCk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUVudHJ5UmVhZGVyIHtcbiAgcGF0aG5hbWU6IHN0cmluZztcbiAgbW9kZTogbnVtYmVyO1xuICBzaXplPzogbnVtYmVyO1xuXG4gIHJlYWREYXRhKGJ1ZmZlcjogQXJyYXlCdWZmZXIsIGJ5dGVPZmZzZXQ/OiBudW1iZXIsIGJ5dGVMZW5ndGg/OiBudW1iZXIpOiBudW1iZXIgfCBQcm9taXNlPG51bWJlcj47XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb21wcmVzc0NhbGxiYWNrcyB7XG4gIG5leHRFbnRyeSgpOiBJRW50cnlSZWFkZXIgfCB1bmRlZmluZWQgfCBQcm9taXNlPElFbnRyeVJlYWRlciB8IHVuZGVmaW5lZD47XG4gIHdyaXRlRGF0YShidWZmZXI6IEFycmF5QnVmZmVyLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg6IG51bWJlcik6IG51bWJlciB8IFByb21pc2U8bnVtYmVyPjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wcmVzcyhjb250ZXh0OiBJQXJjaGl2ZSwgY2FsbGJhY2tzOiBJQ29tcHJlc3NDYWxsYmFja3MsIG91dHB1dDogc3RyaW5nKSB7XG4gIGNvbnN0IGFyY2hpdmUgPSBjb250ZXh0Lm5ld1dyaXRlKCk7XG5cbiAgYXJjaGl2ZS5zZXRGb3JtYXRGaWx0ZXJCeUV4dChvdXRwdXQpO1xuXG4gIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQubmV3QnVmZmVyKDgxOTIpO1xuXG4gIGNvbnN0IGNodW5rcyA9IG5ldyBBcnJheTxBcnJheUJ1ZmZlcj47XG4gIGFyY2hpdmUub253cml0ZSA9IChidWZmZXI6IElBcmNoaXZlQnVmZmVyKSA9PiB7XG4gICAgY2h1bmtzLnB1c2goYnVmZmVyLmJ1ZmZlci5zbGljZShidWZmZXIuYnl0ZU9mZnNldCwgYnVmZmVyLmJ5dGVPZmZzZXQgKyBidWZmZXIuYnl0ZUxlbmd0aCkpO1xuICB9XG5cbiAgY29uc3QgZmx1c2hDaHVua3MgPSBhc3luYyAoKSA9PiB7XG4gICAgZm9yICg7Oykge1xuICAgICAgY29uc3QgYnl0ZXMgPSBjaHVua3Muc2hpZnQoKTtcbiAgICAgIGlmICghYnl0ZXMpXG4gICAgICAgIHJldHVybjtcbiAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgbGV0IGxlbmd0aCA9IGJ5dGVzLmJ5dGVMZW5ndGg7XG4gICAgICB3aGlsZSAobGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHcgPSBjYWxsYmFja3Mud3JpdGVEYXRhKGJ5dGVzLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICAgIGNvbnN0IG4gPSAodyBpbnN0YW5jZW9mIFByb21pc2UpID8gKGF3YWl0IHcpIDogdztcbiAgICAgICAgb2Zmc2V0ICs9IG47XG4gICAgICAgIGxlbmd0aCAtPSBuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFyY2hpdmUub3BlbigpO1xuICBmb3IgKDs7KSB7XG4gICAgY29uc3QgeCA9IGNhbGxiYWNrcy5uZXh0RW50cnkoKTtcbiAgICBjb25zdCBpdGVyID0gKHggaW5zdGFuY2VvZiBQcm9taXNlKSA/IChhd2FpdCB4KSA6IHg7XG4gICAgaWYgKCFpdGVyKVxuICAgICAgYnJlYWs7XG5cbiAgICBjb25zdCBlbnRyeSA9IGNvbnRleHQubmV3RW50cnkoKTtcbiAgICBlbnRyeS5wYXRobmFtZSA9IGl0ZXIucGF0aG5hbWU7XG4gICAgZW50cnkubW9kZSA9IGl0ZXIubW9kZTtcblxuICAgIGlmIChpdGVyLnNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZW50cnkuc2l6ZSA9IGl0ZXIuc2l6ZTtcbiAgICB9XG5cbiAgICBhcmNoaXZlLndyaXRlSGVhZGVyKGVudHJ5KTtcblxuICAgIGlmIChpdGVyLnNpemUpIHtcbiAgICAgIGxldCBzaXplID0gaXRlci5zaXplO1xuICAgICAgd2hpbGUgKHNpemUpIHtcbiAgICAgICAgY29uc3QgciA9IGl0ZXIucmVhZERhdGEoYnVmZmVyLmJ1ZmZlciwgYnVmZmVyLmJ5dGVPZmZzZXQsIGJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgY29uc3Qgc3ogPSAociBpbnN0YW5jZW9mIFByb21pc2UpID8gKGF3YWl0IHIpIDogcjtcbiAgICAgICAgYXJjaGl2ZS53cml0ZURhdGEoYnVmZmVyLCAwLCBzeik7XG4gICAgICAgIHNpemUgLT0gc3o7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZW50cnkucmVsZWFzZSgpO1xuXG4gICAgYXdhaXQgZmx1c2hDaHVua3MoKTtcbiAgfVxuICBhcmNoaXZlLmNsb3NlKCk7XG5cbiAgYXdhaXQgZmx1c2hDaHVua3MoKTtcblxuICBidWZmZXIucmVsZWFzZSgpO1xuICBhcmNoaXZlLnJlbGVhc2UoKTtcbn1cblxufSAvLyBuYW1lc3BhY2UgQXJjaGl2ZU9wZXJhdGlvbnNcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQXJjaGl2ZU9wZW5DYWxsYmFjaywgQXJjaGl2ZVJlYWRDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIElBcmNoaXZlUmVhZCwgQVJDSElWRV9PSyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcbmltcG9ydCB7IEFyY2hpdmVCYXNlIH0gZnJvbSBcIi4vQXJjaGl2ZUJhc2VcIjtcbmltcG9ydCB7IEFyY2hpdmVFbnRyeSB9IGZyb20gXCIuL0FyY2hpdmVFbnRyeVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUJ1ZmZlciB9IGZyb20gXCIuL0FyY2hpdmVCdWZmZXJcIjtcbmltcG9ydCB7IGVycm9yQ29kZVRvU3RyaW5nLCBOT19NRU1PUlkgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZVJlYWQgZXh0ZW5kcyBBcmNoaXZlQmFzZSBpbXBsZW1lbnRzIElBcmNoaXZlUmVhZCB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgc3VwZXIoY29udGV4dCwgYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9mcmVlKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHN1cHBvcnRGaWx0ZXJBbGwoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZmlsdGVyX2FsbCh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBzdXBwb3J0Rm9ybWF0QWxsKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zdXBwb3J0X2Zvcm1hdF9hbGwodGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUGFzc3BocmFzZShwYXNzcGhyYXNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBwYXNzcGhyYXNlUHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKHBhc3NwaHJhc2UpO1xuICAgIGlmICghcGFzc3BocmFzZVB0cikgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX2FkZF9wYXNzcGhyYXNlKHRoaXMuX2FyY2hpdmUsIHBhc3NwaHJhc2VQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShwYXNzcGhyYXNlUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX29wZW4odGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGNvZGUgIT09IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfY2xvc2UodGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgbmV4dEhlYWRlcigpOiBBcmNoaXZlRW50cnkgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfbmV4dF9oZWFkZXIodGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGVudHJ5KVxuICAgICAgcmV0dXJuIG5ldyBBcmNoaXZlRW50cnkodGhpcy5fY29udGV4dCwgZW50cnkpO1xuXG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX2xhc3RfZXJyb3IodGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGNvZGUgIT09IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGF0YVJlYWQoYnVmZmVyOiBBcmNoaXZlQnVmZmVyLCBvZmZzZXQ/OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IG51bWJlciB7XG4gICAgb2Zmc2V0ID0gYnVmZmVyLmJ5dGVPZmZzZXQgKyAob2Zmc2V0IHx8IDApO1xuICAgIGxlbmd0aCA9IGxlbmd0aCB8fCBidWZmZXIuYnl0ZUxlbmd0aDtcblxuICAgIGNvbnN0IG4gPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9kYXRhKHRoaXMuX2FyY2hpdmUsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhuKSB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG47XG4gIH1cblxuICBwdWJsaWMgZGF0YVNraXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfZGF0YV9za2lwKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHNldCBvbm9wZW4oY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zZXRfb3Blbl9jYWxsYmFjayh0aGlzLl9hcmNoaXZlLCBjYWxsYmFjayk7XG4gIH1cblxuICBwdWJsaWMgc2V0IG9ucmVhZChjYWxsYmFjazogQXJjaGl2ZVJlYWRDYWxsYmFjaykge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3NldF9yZWFkX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zZXRfY2xvc2VfY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJQXJjaGl2ZVdyaXRlLCBBcmNoaXZlT3BlbkNhbGxiYWNrLCBBcmNoaXZlV3JpdGVDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIEFSQ0hJVkVfT0sgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5pbXBvcnQgeyBBcmNoaXZlQmFzZSB9IGZyb20gXCIuL0FyY2hpdmVCYXNlXCI7XG5pbXBvcnQgeyBBcmNoaXZlRW50cnkgfSBmcm9tIFwiLi9BcmNoaXZlRW50cnlcIjtcbmltcG9ydCB7IEFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlQnVmZmVyXCI7XG5pbXBvcnQgeyBOT19NRU1PUlksIGVycm9yQ29kZVRvU3RyaW5nIH0gZnJvbSBcIi4vVXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEFyY2hpdmVXcml0ZSBleHRlbmRzIEFyY2hpdmVCYXNlIGltcGxlbWVudHMgSUFyY2hpdmVXcml0ZSB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgc3VwZXIoY29udGV4dCwgYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfZnJlZSh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgZm9ybWF0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKHZhbHVlKTtcbiAgICBpZiAoIW5hbWUpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9ieV9uYW1lKHRoaXMuX2FyY2hpdmUsIG5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShuYW1lKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBvcHRpb25zKG9wdGlvbnM6IHN0cmluZykge1xuICAgIGNvbnN0IG9wdGlvbnNQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9vcHRpb25zKHRoaXMuX2FyY2hpdmUsIG9wdGlvbnNQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShvcHRpb25zUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBwYXNzcGhyYXNlKHBhc3NwaHJhc2U6IHN0cmluZykge1xuICAgIGNvbnN0IHBhc3NwaHJhc2VQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ocGFzc3BocmFzZSk7XG4gICAgaWYgKCFwYXNzcGhyYXNlUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9wYXNzcGhyYXNlKHRoaXMuX2FyY2hpdmUsIHBhc3NwaHJhc2VQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShwYXNzcGhyYXNlUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZEZpbHRlcihmaWx0ZXI6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20oZmlsdGVyKTtcbiAgICBpZiAoIW5hbWUpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfYWRkX2ZpbHRlcl9ieV9uYW1lKHRoaXMuX2FyY2hpdmUsIG5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShuYW1lKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldEZvcm1hdEZpbHRlckJ5RXh0KGZpbGVuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmbmFtZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJvbShmaWxlbmFtZSk7XG4gICAgaWYgKCFmbmFtZSkgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2ZpbHRlcl9ieV9leHQodGhpcy5fYXJjaGl2ZSwgZm5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShmbmFtZSk7XG4gICAgaWYgKGNvZGUgIT0gQVJDSElWRV9PSykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuZXJyb3JTdHJpbmcsIHsgY2F1c2U6IGVycm9yQ29kZVRvU3RyaW5nKGNvZGUpIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25vcGVuKGNhbGxiYWNrOiBBcmNoaXZlT3BlbkNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9vcGVuX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb253cml0ZShjYWxsYmFjazogQXJjaGl2ZVdyaXRlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X3dyaXRlX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X29wZW5fY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9vcGVuKHRoaXMuX2FyY2hpdmUpO1xuICAgIGlmIChjb2RlICE9PSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9jbG9zZSh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZUhlYWRlcihlbnRyeTogQXJjaGl2ZUVudHJ5KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX2hlYWRlcih0aGlzLl9hcmNoaXZlLCBlbnRyeS5tZW1vcnlPZmZzZXQpO1xuICB9XG5cbiAgcHVibGljIHdyaXRlRGF0YShidWZmZXI6IEFyY2hpdmVCdWZmZXIsIG9mZnNldD86IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBvZmZzZXQgPSBidWZmZXIuYnl0ZU9mZnNldCArIChvZmZzZXQgfHwgMCk7XG4gICAgbGVuZ3RoID0gbGVuZ3RoIHx8IGJ1ZmZlci5ieXRlTGVuZ3RoIC0gb2Zmc2V0O1xuXG4gICAgY29uc3QgbiA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9kYXRhKHRoaXMuX2FyY2hpdmUsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhuKSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbjtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcmlwdERpcmVjdG9yeSgpIHtcbiAgaWYgKHR5cGVvZiBfX2Rpcm5hbWUgIT09ICd1bmRlZmluZWQnKVxuICAgIHJldHVybiBldmFsKFwiX19kaXJuYW1lXCIpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRmlsZUhhbmRsZSB7XG4gIHJlYWQoYnVmZmVyOiBVaW50OEFycmF5KTogUHJvbWlzZTx7IGJ5dGVzUmVhZDogbnVtYmVyfT47XG4gIHdyaXRlKGJ1ZmZlcjogVWludDhBcnJheSk6IFByb21pc2U8eyBieXRlc1dyaXR0ZW46IG51bWJlciB9PjtcbiAgY2xvc2UoKTogUHJvbWlzZTx2b2lkPjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTeXN0ZW0ge1xuICBta2RpcihwYXRoOiBzdHJpbmcsIG9wdGlvbnM6IHsgcmVjdXJzaXZlOiBib29sZWFuIH0pOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD47XG4gIG9wZW4ocGF0aDogc3RyaW5nLCBmbGFncz86IHN0cmluZyB8IG51bWJlciwgbW9kZT86IG51bWJlcik6IFByb21pc2U8SUZpbGVIYW5kbGU+O1xuICByZWFkRmlsZShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj47XG59O1xuXG5leHBvcnQgbmFtZXNwYWNlIEZpbGVTeXN0ZW0ge1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vZGUob3B0aW9ucz86IHsgd2l0aE1rZGlyQ2FjaGU/OiBib29sZWFuLCBjdXJyZW50RGlyPzogc3RyaW5nIH0pOiBJRmlsZVN5c3RlbVxue1xuICBjb25zdCBob3N0RnM6IElGaWxlU3lzdGVtID0ge1xuICAgIG1rZGlyOiBmcy5wcm9taXNlcy5ta2RpcixcbiAgICBvcGVuOiBmcy5wcm9taXNlcy5vcGVuLFxuICAgIHJlYWRGaWxlOiBmcy5wcm9taXNlcy5yZWFkRmlsZSxcbiAgfTtcblxuICBpZihvcHRpb25zPy53aXRoTWtkaXJDYWNoZSkge1xuICAgIGNvbnN0IG1rZGlyQ2FjaGUgPSBuZXcgTWtkaXJDYWNoZTtcbiAgICBob3N0RnMubWtkaXIgPSAoZGlyUGF0aDogc3RyaW5nLCBvcHRpb25zOiB7IHJlY3Vyc2l2ZTogYm9vbGVhbiB9KTogUHJvbWlzZTxzdHJpbmcgfCB1bmRlZmluZWQ+ID0+IHtcbiAgICAgIHJldHVybiBta2RpckNhY2hlLm1rZGlyKGRpclBhdGgsIG9wdGlvbnMpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gaG9zdEZzO1xufVxufSAvLyBuYW1lc3BhY2UgRmlsZVN5c3RlbVxuXG5leHBvcnQgbmFtZXNwYWNlIFBhdGhTZXAge1xuXG50eXBlIFNlcFBhaXIgPSAgWyBmaXJzdDogc3RyaW5nLCBzZWNvbmQ6IHN0cmluZyBdO1xuXG5sZXQgc19pbnN0YW5jZToge1xuICBuYXRpdmU6IFNlcFBhaXIsXG4gIHdpbjMyOiBTZXBQYWlyLFxuICBwb3NpeDpTZXBQYWlyLFxufTtcblxuZnVuY3Rpb24gZ2V0SW5zdGFjZSgpIHtcbiAgaWYgKCFzX2luc3RhbmNlKSB7XG4gICAgY29uc3Qgd2luMzI6IFNlcFBhaXIgPSBbIHBhdGgud2luMzIuc2VwLCBwYXRoLnBvc2l4LnNlcCBdO1xuICAgIGNvbnN0IHBvc2l4OiBTZXBQYWlyID0gWyBwYXRoLnBvc2l4LnNlcCwgcGF0aC53aW4zMi5zZXAgXTtcbiAgICBjb25zdCBuYXRpdmUgPSAob3MucGxhdGZvcm0oKSA9PT0gXCJ3aW4zMlwiKSA/IHdpbjMyIDogcG9zaXg7XG4gICAgc19pbnN0YW5jZSA9IHsgbmF0aXZlLCB3aW4zMiwgcG9zaXggfTtcbiAgfVxuICByZXR1cm4gc19pbnN0YW5jZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcHJlc2VudFBhdGhBc05hdGl2ZShpbnB1dFBhdGg6IHN0cmluZykge1xuICBjb25zdCBwYWlyID0gZ2V0SW5zdGFjZSgpLm5hdGl2ZTtcbiAgcmV0dXJuIGlucHV0UGF0aC5yZXBsYWNlQWxsKHBhaXJbMV0sIHBhaXJbMF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwcmVzZW50UGF0aEFzUG9zaXgoaW5wdXRQYXRoOiBzdHJpbmcpIHtcbiAgY29uc3QgcGFpciA9IGdldEluc3RhY2UoKS5wb3NpeDtcbiAgcmV0dXJuIGlucHV0UGF0aC5yZXBsYWNlQWxsKHBhaXJbMV0sIHBhaXJbMF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwcmVzZW50UGF0aEFzV2luMzIoaW5wdXRQYXRoOiBzdHJpbmcpIHtcbiAgY29uc3QgcGFpciA9IGdldEluc3RhY2UoKS53aW4zMjtcbiAgcmV0dXJuIGlucHV0UGF0aC5yZXBsYWNlQWxsKHBhaXJbMV0sIHBhaXJbMF0pO1xufVxuXG59IC8vIG5hbWVzcGFjZVxuXG5leHBvcnQgY2xhc3MgTWtkaXJDYWNoZSB7XG4gIHByaXZhdGUgX2Rpck1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmcgfCBudWxsPjtcbiAgXG4gIHB1YmxpYyBhc3luYyBta2RpcihkaXJQYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiB7IHJlY3Vyc2l2ZTogYm9vbGVhbiB9KSB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuX2Rpck1hcC5nZXQoZGlyUGF0aCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbClcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihkaXJQYXRoLCBvcHRpb25zKTtcbiAgICAgIHRoaXMuX2Rpck1hcC5zZXQoZGlyUGF0aCwgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSA/IG51bGwgOiByZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVTdGF0IHtcbiAgbmFtZTogc3RyaW5nO1xuICBmaWxlcGF0aDogc3RyaW5nO1xuICBzdGF0OiBmcy5TdGF0cztcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZpbGVTdGF0c0ltcGwocmVzdWx0OiBGaWxlU3RhdFtdLCBmaWxlbmFtZXM6IHN0cmluZ1tdLCBkaXJlY3Rvcnk6IHN0cmluZyk6IFByb21pc2U8RmlsZVN0YXRbXT4ge1xuICBmb3IgKGNvbnN0IG5hbWUgb2YgZmlsZW5hbWVzKSB7XG4gICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLmpvaW4oZGlyZWN0b3J5LCBQYXRoU2VwLnJlcHJlc2VudFBhdGhBc05hdGl2ZShuYW1lKSk7XG4gICAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnByb21pc2VzLnN0YXQoZmlsZXBhdGgpO1xuICAgIGNvbnN0IGl0ZW0gPSB7IG5hbWUsIGZpbGVwYXRoLCBzdGF0IH07XG4gICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgaXRlbS5uYW1lICs9IHBhdGgucG9zaXguc2VwO1xuICAgICAgY29uc3QgaXRlbXMgPSAoYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihmaWxlcGF0aCkpLm1hcChpID0+IHBhdGguam9pbihuYW1lLCBpKSk7XG4gICAgICBhd2FpdCBnZXRGaWxlU3RhdHNJbXBsKHJlc3VsdCwgaXRlbXMsIGRpcmVjdG9yeSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRGaWxlU3RhdHMoZmlsZW5hbWVzOiBzdHJpbmdbXSwgZGlyZWN0b3J5OiBzdHJpbmcpOiBQcm9taXNlPEZpbGVTdGF0W10+IHtcbiAgcmV0dXJuIGdldEZpbGVTdGF0c0ltcGwoW10sIGZpbGVuYW1lcy5tYXAoaSA9PiBQYXRoU2VwLnJlcHJlc2VudFBhdGhBc1Bvc2l4KGkpKSwgUGF0aFNlcC5yZXByZXNlbnRQYXRoQXNOYXRpdmUoZGlyZWN0b3J5KSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFSQ0hJVkVfT0ssIEFSQ0hJVkVfUkVUUlksIEFSQ0hJVkVfV0FSTiwgQVJDSElWRV9GQUlMRUQsIEFSQ0hJVkVfRkFUQUwgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5cbmV4cG9ydCBjb25zdCBOT19NRU1PUlkgPSBcIk5vIE1lbW9yeVwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIFN0cmluZ0V4dHJhcyB7IFxuZXhwb3J0IGZ1bmN0aW9uIGZyb21CdWZmZXIoYnVmZmVyOiBBcnJheUJ1ZmZlciwgb2Zmc2V0OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IHN0cmluZ1xue1xuICBsZXQgYnl0ZXM6IFVpbnQ4QXJyYXk7XG5cbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMDtcbiAgICBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgb2Zmc2V0KTtcbiAgICB3aGlsZSAoYnl0ZXNbbGVuZ3RoXSlcbiAgICAgIGxlbmd0aCsrO1xuICB9XG5cbiAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIsIG9mZnNldCwgbGVuZ3RoKTtcbiAgaWYgKGJ1ZmZlciBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgY29uc3QgY29weUJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICBjb3B5Qnl0ZXMuc2V0KGJ5dGVzKTtcbiAgICBieXRlcyA9IGNvcHlCeXRlcztcbiAgfVxuXG4gIHJldHVybiAobmV3IFRleHREZWNvZGVyKFwidXRmLThcIikpLmRlY29kZShieXRlcyk7XG59XG59IC8vIG5hbWVzcGFjZSBTdHJpbmdFeHRyYXNcblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yQ29kZVRvU3RyaW5nKGNvZGU6IG51bWJlcik6IHN0cmluZ1xue1xuICBzd2l0Y2ggKGNvZGUpIHtcbiAgY2FzZSBBUkNISVZFX09LOlxuICAgIHJldHVybiBcIkFSQ0hJVkVfT0tcIjtcbiAgY2FzZSBBUkNISVZFX1JFVFJZOlxuICAgIHJldHVybiBcIkFSQ0hJVkVfUkVUUllcIjtcbiAgY2FzZSBBUkNISVZFX1dBUk46XG4gICAgcmV0dXJuIFwiQVJDSElWRV9XQVJOXCI7XG4gIGNhc2UgQVJDSElWRV9GQUlMRUQ6XG4gICAgcmV0dXJuIFwiQVJDSElWRV9GQUlMRURcIjtcbiAgY2FzZSBBUkNISVZFX0ZBVEFMOlxuICAgIHJldHVybiBcIkFSQ0hJVkVfRkFUQUxcIjtcbiAgfVxuXG4gIGlmIChjb2RlIDwgMClcbiAgICByZXR1cm4gXCJBUkNISVZFX1wiICsgKC1jb2RlKTtcblxuICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIGNvZGUgJHtjb2RlfSBtdXN0IGJlIG5lZ2F0aXZlYCk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOmZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6b3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6dXJsXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJnbG9iYWwuZC50c1wiIC8+XG5cbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgeyBJQXJjaGl2ZSwgSUFyY2hpdmVFeHBvcnQsIERlY29tcHJlc3NPcHRpb25zLCBDb21wcmVzc09wdGlvbnMsIEVudHJ5SW5mbyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmUgfSBmcm9tIFwiLi9BcmNoaXZlSW1wbFwiO1xuaW1wb3J0IHsgQVJDSElWRV9PSywgQVJDSElWRV9SRVRSWSwgQVJDSElWRV9XQVJOLCBBUkNISVZFX0ZBSUxFRCwgQVJDSElWRV9GQVRBTCB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFFX0lGTVQsIEFFX0lGUkVHLCBBRV9JRkxOSywgQUVfSUZTT0NLLCBBRV9JRkNIUiwgQUVfSUZCTEssIEFFX0lGRElSLCBBRV9JRklGTyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IGdldFNjcmlwdERpcmVjdG9yeSwgUGF0aFNlcCwgZ2V0RmlsZVN0YXRzLCBNa2RpckNhY2hlIH0gZnJvbSBcIi4vRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgQXJjaGl2ZU9wZXJhdGlvbnMgfSBmcm9tIFwiLi9BcmNoaXZlT3BlcmF0aW9uc1wiO1xuaW1wb3J0IHVybCBmcm9tIFwibm9kZTp1cmxcIjtcblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hCdWZmZXIoc3RyOiBzdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICBpZiAoIShzdHIuc3RhcnRzV2l0aChcImh0dHA6Ly9cIikgfHwgc3RyLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKSkpIHtcbiAgICBjb25zdCBmaWxlcGF0aCA9IHN0ci5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSA/IHVybC5maWxlVVJMVG9QYXRoKHN0cikgOiBzdHI7XG4gICAgcmV0dXJuIGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVwYXRoKTtcbiAgfVxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHN0cik7XG4gIHJldHVybiBCdWZmZXIuZnJvbShhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbmV3QXJjaGl2ZUNvbnRleHQocGFyYW1zOiBzdHJpbmcgfCBCdWZmZXIpOiBQcm9taXNlPElBcmNoaXZlPiB7XG4gIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKVxuICAgIHBhcmFtcyA9IGF3YWl0IGZldGNoQnVmZmVyKHBhcmFtcyk7XG4gIHJldHVybiBBcmNoaXZlLmluc3RhbnRpYXRlKHBhcmFtcyk7XG59XG5cbmxldCBnX2FyY2hpdmU6IElBcmNoaXZlO1xuYXN5bmMgZnVuY3Rpb24gZ2V0QXJjaGl2ZUNvbnRleHQocGFyYW1zPzogc3RyaW5nIHwgQnVmZmVyKTogUHJvbWlzZTxJQXJjaGl2ZT4ge1xuICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbmV3QXJjaGl2ZUNvbnRleHQocGFyYW1zKTtcbiAgfVxuXG4gIGlmICghZ19hcmNoaXZlKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmpvaW4oZ2V0U2NyaXB0RGlyZWN0b3J5KCksIExJQkFSQ0hJVkVfV0FTTV9GSUxFTkFNRSk7XG4gICAgZ19hcmNoaXZlID0gYXdhaXQgbmV3QXJjaGl2ZUNvbnRleHQoZmlsZW5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIGdfYXJjaGl2ZTtcbn1cblxuY29uc3QgbGliYXJjaGl2ZTogSUFyY2hpdmVFeHBvcnQgPSBPYmplY3QuYXNzaWduKGdldEFyY2hpdmVDb250ZXh0LCB7XG4gIEFSQ0hJVkVfT0ssXG4gIEFSQ0hJVkVfUkVUUlksXG4gIEFSQ0hJVkVfV0FSTixcbiAgQVJDSElWRV9GQUlMRUQsXG4gIEFSQ0hJVkVfRkFUQUwsXG5cbiAgQUVfSUZNVCxcbiAgQUVfSUZSRUcsXG4gIEFFX0lGTE5LLFxuICBBRV9JRlNPQ0ssXG4gIEFFX0lGQ0hSLFxuICBBRV9JRkJMSyxcbiAgQUVfSUZESVIsXG4gIEFFX0lGSUZPLFxuXG4gIGFzeW5jIGRlY29tcHJlc3MoaW5wdXQ6IHN0cmluZyB8IEJ1ZmZlciwgb3V0cHV0Pzogc3RyaW5nLCBvcHRpb25zPzogRGVjb21wcmVzc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB2ZXJib3NlID0gb3B0aW9ucyAmJiBvcHRpb25zLnZlcmJvc2U7XG5cbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBpbnB1dCA9IGF3YWl0IGZldGNoQnVmZmVyKGlucHV0KTtcbiAgICB9XG5cbiAgICBjb25zdCBvdXRwdXREaXIgPSBwYXRoLnJlc29sdmUob3V0cHV0ID8gUGF0aFNlcC5yZXByZXNlbnRQYXRoQXNOYXRpdmUob3V0cHV0KSA6IFwiXCIpO1xuICAgIGNvbnN0IG1rZGlyQ2FjaGUgPSBuZXcgTWtkaXJDYWNoZTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgIGFzeW5jIGRpckVudHJ5KGVudHJ5OiBFbnRyeUluZm8pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdmVyYm9zZSAmJiBjb25zb2xlLmxvZyhcInhcIiwgZW50cnkucGF0aG5hbWUpO1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IHBhdGguam9pbihvdXRwdXREaXIsIFBhdGhTZXAucmVwcmVzZW50UGF0aEFzTmF0aXZlKGVudHJ5LnBhdGhuYW1lKSk7XG4gICAgICAgIGF3YWl0IG1rZGlyQ2FjaGUubWtkaXIoZmlsZXBhdGgsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgfSxcbiAgICAgIGFzeW5jIGZpbGVFbnRyeShlbnRyeTogRW50cnlJbmZvKSB7XG4gICAgICAgIHZlcmJvc2UgJiYgY29uc29sZS5sb2coXCJ4XCIsIGVudHJ5LnBhdGhuYW1lKTtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLmpvaW4ob3V0cHV0RGlyLCBQYXRoU2VwLnJlcHJlc2VudFBhdGhBc05hdGl2ZShlbnRyeS5wYXRobmFtZSkpO1xuICAgICAgICBjb25zdCBkaXJwYXRoID0gcGF0aC5kaXJuYW1lKGZpbGVwYXRoKTtcbiAgICAgICAgYXdhaXQgbWtkaXJDYWNoZS5ta2RpcihkaXJwYXRoLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgICAgICBsZXQgZmlsZUhhbmRsZTogZnMucHJvbWlzZXMuRmlsZUhhbmRsZTtcbiAgICAgICAgbGV0IHNpemUgPSBlbnRyeS5zaXplIHx8IDA7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhc3luYyB3cml0ZURhdGEoYnVmZmVyOiBBcnJheUJ1ZmZlciwgYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICAgICAgaWYgKCFzaXplIHx8IHNpemUgPCBieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc2l6ZSAke2J5dGVMZW5ndGh9IHVzZWRgKVxuICAgICAgICAgICAgaWYgKCFmaWxlSGFuZGxlKVxuICAgICAgICAgICAgICBmaWxlSGFuZGxlID0gYXdhaXQgZnMucHJvbWlzZXMub3BlbihmaWxlcGF0aCwgXCJ3XCIpO1xuICAgICAgICAgICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpO1xuICAgICAgICAgICAgY29uc3QgeyBieXRlc1dyaXR0ZW4gfSA9IChhd2FpdCBmaWxlSGFuZGxlLndyaXRlKGJ5dGVzKSk7XG4gICAgICAgICAgICBzaXplIC09IGJ5dGVzV3JpdHRlbjtcbiAgICAgICAgICAgIGlmICghc2l6ZSlcbiAgICAgICAgICAgICAgYXdhaXQgZmlsZUhhbmRsZS5jbG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGJ5dGVzV3JpdHRlbjtcbiAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZ2V0QXJjaGl2ZUNvbnRleHQob3B0aW9ucz8ubW9kdWxlVXJsKTtcbiAgICByZXR1cm4gQXJjaGl2ZU9wZXJhdGlvbnMuZGVjb21wcmVzcyhjb250ZXh0LCBpbnB1dCwgY2FsbGJhY2tzKTtcbiAgfSxcblxuICBhc3luYyBjb21wcmVzcyhpbnB1dDogc3RyaW5nIHwgc3RyaW5nW10sIG91dHB1dDogc3RyaW5nLCBvcHRpb25zPzogQ29tcHJlc3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdmVyYm9zZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy52ZXJib3NlO1xuICAgIGNvbnN0IGN1cnJlbnREaXJlY3RvcnkgPSBvcHRpb25zICYmIG9wdGlvbnMuZGlyZWN0b3J5IHx8IHByb2Nlc3MuY3dkKCk7XG4gICAgY29uc3Qgb3V0cHV0SGFuZGxlID0gYXdhaXQgZnMucHJvbWlzZXMub3BlbihvdXRwdXQsIFwid1wiKTtcbiAgICBjb25zdCBmaWxlRW50cmllcyA9IGF3YWl0IGdldEZpbGVTdGF0cyhbIGlucHV0IF0uZmxhdCgpLCBjdXJyZW50RGlyZWN0b3J5KTtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICBhc3luYyBuZXh0RW50cnkoKSB7XG4gICAgICAgIGxldCBzaXplOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBmZW50cnkgPSBmaWxlRW50cmllcy5zaGlmdCgpO1xuICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgaWYgKCFmZW50cnkpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIGlmIChmZW50cnkuc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgc2l6ZSA9IGZlbnRyeS5zdGF0LnNpemU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKCFmZW50cnkuc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICB2ZXJib3NlICYmIGNvbnNvbGUud2FybihmZW50cnkubmFtZSwgXCJza2lwcGVkXCIpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZlcmJvc2UgJiYgY29uc29sZS5sb2coZmVudHJ5Lm5hbWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpbGVIYW5kbGU6IGZzLnByb21pc2VzLkZpbGVIYW5kbGU7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwYXRobmFtZTogZmVudHJ5Lm5hbWUsXG4gICAgICAgICAgbW9kZTogZmVudHJ5LnN0YXQubW9kZSxcbiAgICAgICAgICBzaXplLFxuXG4gICAgICAgICAgYXN5bmMgcmVhZERhdGEoYnVmZmVyOiBBcnJheUJ1ZmZlciwgYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICAgICAgaWYgKCFzaXplKVxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIERhdGFgKTtcblxuICAgICAgICAgICAgaWYgKCFmaWxlSGFuZGxlKSB7XG4gICAgICAgICAgICAgIGZpbGVIYW5kbGUgPSBhd2FpdCBmcy5wcm9taXNlcy5vcGVuKGZlbnRyeS5maWxlcGF0aCwgXCJyXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgYnl0ZU9mZnNldCwgTWF0aC5taW4oYnl0ZUxlbmd0aCwgc2l6ZSkpO1xuICAgICAgICAgICAgY29uc3QgeyBieXRlc1JlYWQgfSA9IGF3YWl0IGZpbGVIYW5kbGUucmVhZChieXRlcyk7XG4gICAgICAgICAgICBzaXplIC09IGJ5dGVzUmVhZDtcblxuICAgICAgICAgICAgaWYgKCFzaXplKSB7XG4gICAgICAgICAgICAgIGF3YWl0IGZpbGVIYW5kbGUuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGJ5dGVzUmVhZDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgYXN5bmMgd3JpdGVEYXRhKGJ1ZmZlcjogQXJyYXlCdWZmZXIsIGJ5dGVPZmZzZXQ6IG51bWJlciwgYnl0ZUxlbmd0aDogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgY29uc3QgeyBieXRlc1dyaXR0ZW4gfSA9IGF3YWl0IG91dHB1dEhhbmRsZS53cml0ZShuZXcgVWludDhBcnJheShidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpKTtcbiAgICAgICAgcmV0dXJuIGJ5dGVzV3JpdHRlbjtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBnZXRBcmNoaXZlQ29udGV4dChvcHRpb25zPy5tb2R1bGVVcmwpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEFyY2hpdmVPcGVyYXRpb25zLmNvbXByZXNzKGNvbnRleHQsIGNhbGxiYWNrcywgb3V0cHV0KTtcbiAgICBhd2FpdCBvdXRwdXRIYW5kbGUuY2xvc2UoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGxpYmFyY2hpdmU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=