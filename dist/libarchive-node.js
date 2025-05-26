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
        if (typeof input === "string") {
            const response = await fetch(input);
            input = Buffer.from(await response.arrayBuffer());
        }
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
        if (length === undefined) {
            length = 0;
            const bytes = new Uint8Array(buffer, offset);
            while (bytes[length])
                length++;
        }
        return (new TextDecoder("utf-8")).decode(new Uint8Array(buffer, offset, length));
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








async function newArchiveContext(params) {
    if (typeof params === "string") {
        params = await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.readFile(params);
        return _ArchiveImpl__WEBPACK_IMPORTED_MODULE_2__.Archive.instantiate(params);
    }
    else if (!(params instanceof Buffer)) {
        throw Error(`Not supported parameter ${params}`);
    }
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
        if (typeof input === "string" && !input.startsWith("http://") && !input.startsWith("https://")) {
            if (input.startsWith("file://"))
                input = node_url__WEBPACK_IMPORTED_MODULE_6___default().fileURLToPath(input);
            input = await node_fs__WEBPACK_IMPORTED_MODULE_1___default().promises.readFile(input);
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
        return _ArchiveOperations__WEBPACK_IMPORTED_MODULE_5__.ArchiveOperations.decompress(await getArchiveContext(), input, callbacks);
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
        const result = await _ArchiveOperations__WEBPACK_IMPORTED_MODULE_5__.ArchiveOperations.compress(await getArchiveContext(), callbacks, output);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TUFBTSxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbEcsT0FBTyxZQUFZLENBQUM7WUFDdEIsQ0FBQztTQUNGLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLGlFQUFpQixDQUFDLFFBQVEsQ0FBQyxNQUFNLGlCQUFpQixFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzlGLE1BQU0sWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRixDQUFDLENBQUM7QUFFSCxpRUFBZSxVQUFVLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmUudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlQmFzZS50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVCdWZmZXIudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVFbnRyeS50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVJbXBsLnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZU9wZXJhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlUmVhZC50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVXcml0ZS50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0ZpbGVTeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9VdGlscy50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmZzXCIiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpvc1wiIiwid2VicGFjazovL2xpYmFyY2hpdmUvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6cGF0aFwiIiwid2VicGFjazovL2xpYmFyY2hpdmUvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6dXJsXCIiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9Ob2RlTGlicmFyeS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJsaWJhcmNoaXZlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImxpYmFyY2hpdmVcIl0gPSBmYWN0b3J5KCk7XG59KShnbG9iYWwsICgpID0+IHtcbnJldHVybiAiLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBBUkNISVZFX09LID0gMDtcbmV4cG9ydCBjb25zdCBBUkNISVZFX1JFVFJZID0gLTEwO1xuZXhwb3J0IGNvbnN0IEFSQ0hJVkVfV0FSTiA9IC0yMDtcbmV4cG9ydCBjb25zdCBBUkNISVZFX0ZBSUxFRCA9IC0yNTtcbmV4cG9ydCBjb25zdCBBUkNISVZFX0ZBVEFMID0gLTMwO1xuXG5leHBvcnQgY29uc3QgQUVfSUZNVCAgID0gMHhmMDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGUkVHICA9IDB4ODAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRkxOSyAgPSAweGEwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZTT0NLID0gMHhjMDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGQ0hSICA9IDB4MjAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRkJMSyAgPSAweDYwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZESVIgID0gMHg0MDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGSUZPICA9IDB4MTAwMDtcblxuZXhwb3J0IHR5cGUgQXJjaGl2ZU9wZW5DYWxsYmFjayA9ICgpID0+IG51bWJlcjtcbmV4cG9ydCB0eXBlIEFyY2hpdmVSZWFkQ2FsbGJhY2sgPSAoKSA9PiBCdWZmZXIgfCB1bmRlZmluZWQ7XG5leHBvcnQgdHlwZSBBcmNoaXZlV3JpdGVDYWxsYmFjayA9IChidWZmZXI6IElBcmNoaXZlQnVmZmVyKSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgQXJjaGl2ZUNsb3NlQ2FsbGJhY2sgPSAoKSA9PiBudW1iZXI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmVCdWZmZXIge1xuICByZWxlYXNlKCk6IHZvaWQ7XG5cbiAgZ2V0IGJ1ZmZlcigpOiBBcnJheUJ1ZmZlcjtcbiAgZ2V0IGJ5dGVPZmZzZXQoKTogbnVtYmVyO1xuICBnZXQgYnl0ZUxlbmd0aCgpOiBudW1iZXI7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcmNoaXZlRW50cnkge1xuICByZWxlYXNlKCk6IHZvaWQ7XG5cbiAgZ2V0IHBhdGhuYW1lKCk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgc2V0IHBhdGhuYW1lKHZhbHVlOiBzdHJpbmcpO1xuXG4gIGdldCBzaXplKCk6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgc2V0IHNpemUodmFsdWU6IG51bWJlcik7XG5cbiAgZ2V0IG1vZGUoKTogbnVtYmVyO1xuICBzZXQgbW9kZShtb2RlOiBudW1iZXIpO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZVJlYWQge1xuICByZWxlYXNlKCk6IHZvaWQ7XG5cbiAgZ2V0IGVycm5vKCk6IG51bWJlcjtcbiAgZ2V0IGVycm9yU3RyaW5nKCk6IHN0cmluZztcblxuICBzdXBwb3J0RmlsdGVyQWxsKCk6IHZvaWQ7XG4gIHN1cHBvcnRGb3JtYXRBbGwoKTogdm9pZDtcblxuICBhZGRQYXNzcGhyYXNlKHBhc3NwaHJhc2U6IHN0cmluZyk6IHZvaWQ7XG5cbiAgc2V0IG9ub3BlbihjYWxsYmFjazogQXJjaGl2ZU9wZW5DYWxsYmFjayk7XG4gIHNldCBvbnJlYWQoY2FsbGJhY2s6IEFyY2hpdmVSZWFkQ2FsbGJhY2spO1xuICBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spO1xuXG4gIG9wZW4oKTogdm9pZDtcbiAgY2xvc2UoKTogdm9pZDtcbiAgbmV4dEhlYWRlcigpOiBJQXJjaGl2ZUVudHJ5IHwgdW5kZWZpbmVkO1xuICBkYXRhUmVhZChidWZmZXI6IElBcmNoaXZlQnVmZmVyLCBvZmZzZXQ/OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IG51bWJlcjtcbiAgZGF0YVNraXAoKTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZVdyaXRlIHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIGdldCBlcnJubygpOiBudW1iZXI7XG4gIGdldCBlcnJvclN0cmluZygpOiBzdHJpbmc7XG5cbiAgc2V0IGZvcm1hdCh2YWx1ZTogc3RyaW5nKTtcbiAgc2V0IG9wdGlvbnMob3B0aW9uczogc3RyaW5nKTtcbiAgc2V0IHBhc3NwaHJhc2UocGFzc3BocmFzZTogc3RyaW5nKTtcbiAgYWRkRmlsdGVyKGZpbHRlcjogc3RyaW5nKTogdm9pZDtcbiAgc2V0Rm9ybWF0RmlsdGVyQnlFeHQoZmlsZW5hbWU6IHN0cmluZyk6IHZvaWQ7XG5cbiAgc2V0IG9ub3BlbihjYWxsYmFjazogQXJjaGl2ZU9wZW5DYWxsYmFjayk7XG4gIHNldCBvbndyaXRlKGNhbGxiYWNrOiBBcmNoaXZlV3JpdGVDYWxsYmFjayk7XG4gIHNldCBvbmNsb3NlKGNhbGxiYWNrOiBBcmNoaXZlQ2xvc2VDYWxsYmFjayk7XG5cbiAgb3BlbigpOiB2b2lkO1xuICBjbG9zZSgpOiB2b2lkO1xuICB3cml0ZUhlYWRlcihlbnRyeTogSUFyY2hpdmVFbnRyeSk6IG51bWJlcjtcbiAgd3JpdGVEYXRhKGJ1ZmZlcjogSUFyY2hpdmVCdWZmZXIsIG9mZnNldD86IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZSB7XG4gIG5ld1JlYWQoKTogSUFyY2hpdmVSZWFkO1xuICBuZXdXcml0ZSgpOiBJQXJjaGl2ZVdyaXRlO1xuICBuZXdFbnRyeSgpOiBJQXJjaGl2ZUVudHJ5O1xuICBuZXdCdWZmZXIobGVuZ3RoOiBudW1iZXIpOiBJQXJjaGl2ZUJ1ZmZlcjtcbn07XG5cbmV4cG9ydCB0eXBlIERlY29tcHJlc3NPcHRpb25zID0ge1xuICB2ZXJib3NlPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIENvbXByZXNzT3B0aW9ucyA9IHtcbiAgdmVyYm9zZT86IGJvb2xlYW47XG4gIGRpcmVjdG9yeT86IHN0cmluZztcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50cnlJbmZvIHtcbiAgcGF0aG5hbWU6IHN0cmluZztcbiAgbW9kZTogbnVtYmVyO1xuICBzaXplPzogbnVtYmVyO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZUV4cG9ydCB7XG4gIChwYXJhbXM/OiBzdHJpbmcgfCBCdWZmZXIpOiBQcm9taXNlPElBcmNoaXZlPjtcblxuICByZWFkb25seSBBUkNISVZFX09LOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFSQ0hJVkVfUkVUUlk6IG51bWJlcjtcbiAgcmVhZG9ubHkgQVJDSElWRV9XQVJOOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFSQ0hJVkVfRkFJTEVEOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFSQ0hJVkVfRkFUQUw6IG51bWJlcjtcblxuICByZWFkb25seSBBRV9JRk1UOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFFX0lGUkVHOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFFX0lGTE5LOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFFX0lGU09DSzogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRkNIUjogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRkJMSzogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRkRJUjogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRklGTzogbnVtYmVyO1xuXG4gIGRlY29tcHJlc3MoaW5wdXQ6IHN0cmluZyB8IEJ1ZmZlciwgb3V0cHV0Pzogc3RyaW5nLCBvcHRpb25zPzogRGVjb21wcmVzc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuICBjb21wcmVzcyhpbnB1dDogc3RyaW5nIHwgc3RyaW5nW10sIG91dHB1dDogc3RyaW5nLCBvcHRpb25zPzogQ29tcHJlc3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcbmltcG9ydCB7IFN0cmluZ0V4dHJhcyB9IGZyb20gXCIuL1V0aWxzXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBcmNoaXZlQmFzZSB7XG4gIHByb3RlY3RlZCBfY29udGV4dDogQXJjaGl2ZUNvbnRleHQ7XG4gIHByb3RlY3RlZCBfYXJjaGl2ZTogbnVtYmVyO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5fYXJjaGl2ZSA9IGFyY2hpdmU7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIHB1YmxpYyBnZXQgbWVtb3J5T2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9hcmNoaXZlO1xuICB9XG5cbiAgcHVibGljIGdldCBlcnJubygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZXJybm8odGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVycm9yU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2Vycm9yX3N0cmluZyh0aGlzLl9hcmNoaXZlKTtcbiAgICByZXR1cm4gU3RyaW5nRXh0cmFzLmZyb21CdWZmZXIodGhpcy5fY29udGV4dC5tZW1vcnlCdWZmZXIsIG9mZnNldCk7XG4gIH1cblxuICAvLyBoYW5kbGVFdmVudFxuICAvLyBhZGRFdmVudExpc3RuZXJcbiAgLy8gcmVtb3ZlRXZlbnRMaXN0ZW5lclxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSUFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5cbmV4cG9ydCBjbGFzcyBBcmNoaXZlQnVmZmVyIGltcGxlbWVudHMgSUFyY2hpdmVCdWZmZXIge1xuICBwcml2YXRlIF9jb250ZXh0OiBBcmNoaXZlQ29udGV4dDtcbiAgcHJpdmF0ZSBfYnl0ZU9mZnNldDogbnVtYmVyO1xuICBwcml2YXRlIF9ieXRlTGVuZ3RoOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEFyY2hpdmVDb250ZXh0LCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuX2J5dGVPZmZzZXQgPSBieXRlT2Zmc2V0O1xuICAgIHRoaXMuX2J5dGVMZW5ndGggPSBieXRlTGVuZ3RoO1xuICB9XG5cbiAgcHVibGljIHJlbGVhc2UoKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcmVlKHRoaXMuX2J5dGVPZmZzZXQpO1xuICB9XG5cbiAgZ2V0IGJ1ZmZlcigpOiBBcnJheUJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQubWVtb3J5QnVmZmVyO1xuICB9XG5cbiAgZ2V0IGJ5dGVPZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYnl0ZU9mZnNldDtcbiAgfVxuXG4gIGdldCBieXRlTGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2J5dGVMZW5ndGg7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFyY2hpdmVPcGVuQ2FsbGJhY2ssIEFyY2hpdmVSZWFkQ2FsbGJhY2ssIEFyY2hpdmVXcml0ZUNhbGxiYWNrLCBBcmNoaXZlQ2xvc2VDYWxsYmFjaywgQVJDSElWRV9PSyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVOYXRpdmUsIEFyY2hpdmVQdHIsIEFyY2hpdmVFbnRyeVB0ciB9IGZyb20gXCIuL0FyY2hpdmVOYXRpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlQnVmZmVyXCI7XG5cbnR5cGUgQXJjaGl2ZVJlYWRDYWxiYWNrcyA9IHtcbiAgb3BlbmVyPzogQXJjaGl2ZU9wZW5DYWxsYmFjayxcbiAgcmVhZGVyPzogQXJjaGl2ZVJlYWRDYWxsYmFjayxcbiAgY2xvc2VyPzogQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssXG59O1xuXG50eXBlIEFyY2hpdmVXcml0ZUNhbGJhY2tzID0ge1xuICBvcGVuZXI/OiBBcmNoaXZlT3BlbkNhbGxiYWNrLFxuICB3cml0ZXI/OiBBcmNoaXZlV3JpdGVDYWxsYmFjayxcbiAgY2xvc2VyPzogQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssXG59O1xuXG5jbGFzcyBBcmNoaXZlQ2FsbGJhY2tzIHtcbiAgcHJpdmF0ZSBfbWFwID0gbmV3IE1hcDxudW1iZXIsIEFyY2hpdmVSZWFkQ2FsYmFja3MgfCBBcmNoaXZlV3JpdGVDYWxiYWNrcz47XG5cbiAgcHVibGljIGdldChhcmNoaXZlOiBudW1iZXIpOiBBcmNoaXZlUmVhZENhbGJhY2tzIHwgQXJjaGl2ZVdyaXRlQ2FsYmFja3Mge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX21hcC5nZXQoYXJjaGl2ZSk7XG4gICAgaWYgKCFjYWxsYmFja3MpXG4gICAgICB0aHJvdyBFcnJvcihgSGFuZGxlICR7YXJjaGl2ZX0gZG9lcyBub3QgZXhpc3RzYCk7XG4gICAgcmV0dXJuIGNhbGxiYWNrcztcbiAgfVxuXG4gIHB1YmxpYyBzZXQoYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFja3M6IEFyY2hpdmVSZWFkQ2FsYmFja3MgfCBBcmNoaXZlV3JpdGVDYWxiYWNrcykge1xuICAgIGlmICghYXJjaGl2ZSlcbiAgICAgIHRocm93IEVycm9yKGBIYW5kbGUgaXMgbnVsbGApO1xuICAgIGlmICh0aGlzLl9tYXAuaGFzKGFyY2hpdmUpKVxuICAgICAgdGhyb3cgRXJyb3IoYEhhbmRsZSAke2FyY2hpdmV9IGlzIHJlZ2lzdHJlZGApO1xuICAgIHRoaXMuX21hcC5zZXQoYXJjaGl2ZSwgY2FsbGJhY2tzKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGUoYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWFwLmRlbGV0ZShhcmNoaXZlKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIEFyY2hpdmVDb250ZXh0IHtcbiAgcHJpdmF0ZSBfbmF0aXZlOiBBcmNoaXZlTmF0aXZlO1xuICBwcml2YXRlIF9tZW1vcnk6IFdlYkFzc2VtYmx5Lk1lbW9yeTtcbiAgcHJpdmF0ZSBfY2FsbGJhY2tzID0gbmV3IEFyY2hpdmVDYWxsYmFja3M7XG4gIHByaXZhdGUgX3JlYWRCdWZmZXIgPSBuZXcgVWludDhBcnJheTtcblxuICBjb25zdHJ1Y3RvcihuYXRpdmU6IEFyY2hpdmVOYXRpdmUsIG1lbW9yeTogV2ViQXNzZW1ibHkuTWVtb3J5KSB7XG4gICAgdGhpcy5fbmF0aXZlID0gbmF0aXZlO1xuICAgIHRoaXMuX21lbW9yeSA9IG1lbW9yeTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWVtb3J5QnVmZmVyKCk6IEFycmF5QnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWVtb3J5LmJ1ZmZlcjtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3ZlcnNpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfdmVyc2lvbigpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfdmVyc2lvbl9kZXRhaWxzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3ZlcnNpb25fZGV0YWlscygpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZXJybm8oYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZXJybm8oYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lcnJvcl9zdHJpbmcoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZXJyb3Jfc3RyaW5nKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfb3Blbl9oYW5kbGVyKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgY2xpZW50ID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKTtcbiAgICByZXR1cm4gY2xpZW50Lm9wZW5lciA/IGNsaWVudC5vcGVuZXIoKSA6IDA7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2hhbmRsZXIoYXJjaGl2ZTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgc2l6ZTogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLl9yZWFkQnVmZmVyLmxlbmd0aCkge1xuICAgICAgY29uc3QgY2xpZW50ID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlUmVhZENhbGJhY2tzO1xuICAgICAgaWYgKCFjbGllbnQucmVhZGVyKVxuICAgICAgICByZXR1cm4gMDtcbiAgICAgIGNvbnN0IGJ1ZiA9IGNsaWVudC5yZWFkZXIoKTtcbiAgICAgIGlmICghYnVmKVxuICAgICAgICByZXR1cm4gMDtcbiAgICAgIHRoaXMuX3JlYWRCdWZmZXIgPSBuZXcgVWludDhBcnJheShidWYpO1xuICAgIH1cblxuICAgIGNvbnN0IG4gPSBNYXRoLm1pbihzaXplLCB0aGlzLl9yZWFkQnVmZmVyLmxlbmd0aCk7XG4gICAgY29uc3QgZHN0ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fbWVtb3J5LmJ1ZmZlciwgb2Zmc2V0LCBuKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKylcbiAgICAgIGRzdFtpXSA9IHRoaXMuX3JlYWRCdWZmZXJbaV07XG5cbiAgICB0aGlzLl9yZWFkQnVmZmVyID0gdGhpcy5fcmVhZEJ1ZmZlci5zbGljZShuKTtcbiAgICByZXR1cm4gbjtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfbGFzdF9lcnJvcihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX2xhc3RfZXJyb3IoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9oYW5kbGVyKGFyY2hpdmU6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlV3JpdGVDYWxiYWNrcztcbiAgICBpZiAoY2FsbGJhY2tzLndyaXRlcilcbiAgICAgIGNhbGxiYWNrcy53cml0ZXIobmV3IEFyY2hpdmVCdWZmZXIodGhpcywgb2Zmc2V0LCBzaXplKSlcbiAgICByZXR1cm4gc2l6ZTtcbiAgfTtcblxuICBwdWJsaWMgYXJjaGl2ZV9jbG9zZV9oYW5kbGVyKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgY2xpZW50ID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKTtcbiAgICByZXR1cm4gY2xpZW50LmNsb3NlciA/IGNsaWVudC5jbG9zZXIoKSA6IDA7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX25ldygpOiBBcmNoaXZlUHRyIHtcbiAgICBjb25zdCBhcmNoaXZlID0gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9uZXcoKTtcbiAgICBpZiAoYXJjaGl2ZSkge1xuICAgICAgY29uc3QgaW1wbDogQXJjaGl2ZVJlYWRDYWxiYWNrcyA9IHt9O1xuICAgICAgdGhpcy5fY2FsbGJhY2tzLnNldChhcmNoaXZlLCBpbXBsKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyY2hpdmU7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2ZyZWUoYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzLmRlbGV0ZShhcmNoaXZlKTtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX2ZyZWUoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2FkZF9wYXNzcGhyYXNlKGFyY2hpdmU6IEFyY2hpdmVQdHIsIHBhc3NwaHJhc2U6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfYWRkX3Bhc3NwaHJhc2UoYXJjaGl2ZSwgcGFzc3BocmFzZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZmlsdGVyX2FsbChhcmNoaXZlOiBudW1iZXIpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9zdXBwb3J0X2ZpbHRlcl9hbGwoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZm9ybWF0X2FsbChhcmNoaXZlOiBudW1iZXIpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9zdXBwb3J0X2Zvcm1hdF9hbGwoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX29wZW4oYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9vcGVuKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9jbG9zZShhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX2Nsb3NlKGFyY2hpdmUpO1xuICB9XG4gIFxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX25leHRfaGVhZGVyKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfbmV4dF9oZWFkZXIoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2RhdGEoYXJjaGl2ZTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgc2l6ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9kYXRhKGFyY2hpdmUsIG9mZnNldCwgc2l6ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2RhdGFfc2tpcChhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX2RhdGFfc2tpcChhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfc2V0X29wZW5fY2FsbGJhY2soYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFjazogQXJjaGl2ZU9wZW5DYWxsYmFjayk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVJlYWRDYWxiYWNrcztcbiAgICBjYWxsYmFja3Mub3BlbmVyID0gY2FsbGJhY2s7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX3NldF9yZWFkX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVSZWFkQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVSZWFkQ2FsYmFja3M7XG4gICAgY2FsbGJhY2tzLnJlYWRlciA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9zZXRfY2xvc2VfY2FsbGJhY2soYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVSZWFkQ2FsYmFja3M7XG4gICAgY2FsbGJhY2tzLmNsb3NlciA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfbmV3KCk6IEFyY2hpdmVQdHIge1xuICAgIGNvbnN0IGFyY2hpdmUgPSB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9uZXcoKTtcbiAgICBpZiAoYXJjaGl2ZSkge1xuICAgICAgY29uc3QgaW1wbDogQXJjaGl2ZVdyaXRlQ2FsYmFja3MgPSB7fTtcbiAgICAgIHRoaXMuX2NhbGxiYWNrcy5zZXQoYXJjaGl2ZSwgaW1wbCk7XG4gICAgfVxuICAgIHJldHVybiBhcmNoaXZlO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfZnJlZShhcmNoaXZlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jYWxsYmFja3MuZGVsZXRlKGFyY2hpdmUpO1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX2ZyZWUoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfb3B0aW9ucyhhcmNoaXZlOiBudW1iZXIsIG9wdGlvbnM6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX3NldF9vcHRpb25zKGFyY2hpdmUsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X3Bhc3NwaHJhc2UoYXJjaGl2ZTogbnVtYmVyLCBwYXNzcGhyYXNlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9zZXRfcGFzc3BocmFzZShhcmNoaXZlLCBwYXNzcGhyYXNlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF9mb3JtYXRfYnlfbmFtZShhcmNoaXZlOiBudW1iZXIsIG5hbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX3NldF9mb3JtYXRfYnlfbmFtZShhcmNoaXZlLCBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX2FkZF9maWx0ZXJfYnlfbmFtZShhcmNoaXZlOiBudW1iZXIsIG5hbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX2FkZF9maWx0ZXJfYnlfbmFtZShhcmNoaXZlLCBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF9mb3JtYXRfZmlsdGVyX2J5X2V4dChhcmNoaXZlOiBudW1iZXIsIGZpbGVuYW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2ZpbHRlcl9ieV9leHQoYXJjaGl2ZSwgZmlsZW5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X29wZW5fY2FsbGJhY2soYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFjazogQXJjaGl2ZU9wZW5DYWxsYmFjayk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVdyaXRlQ2FsYmFja3M7XG4gICAgY2FsbGJhY2tzLm9wZW5lciA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X3dyaXRlX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVXcml0ZUNhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlV3JpdGVDYWxiYWNrcztcbiAgICBjYWxsYmFja3Mud3JpdGVyID0gY2FsbGJhY2s7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfY2xvc2VfY2FsbGJhY2soYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVXcml0ZUNhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy5jbG9zZXIgPSBjYWxsYmFjaztcbiAgfVxuICBcbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfb3BlbihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9vcGVuKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfY2xvc2UoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfY2xvc2UoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9oZWFkZXIoYXJjaGl2ZTogbnVtYmVyLCBlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfaGVhZGVyKGFyY2hpdmUsIGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX2RhdGEoYXJjaGl2ZTogQXJjaGl2ZVB0ciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX2RhdGEoYXJjaGl2ZSwgb2Zmc2V0LCBzaXplKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X25ldygpOiBBcmNoaXZlRW50cnlQdHIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9uZXcoKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X2ZyZWUoZW50cnk6IEFyY2hpdmVFbnRyeVB0cikge1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X2ZyZWUoZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfcGF0aG5hbWVfdXRmOChlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfcGF0aG5hbWVfdXRmOChlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9zZXRfcGF0aG5hbWVfdXRmOChlbnRyeTogQXJjaGl2ZUVudHJ5UHRyLCBwYXRobmFtZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfc2V0X3BhdGhuYW1lX3V0ZjgoZW50cnksIHBhdGhuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X3NpemUoZW50cnk6IEFyY2hpdmVFbnRyeVB0cik6IG51bWJlciB7XG4gICAgY29uc3QgbG8gPSB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zaXplX2xvKGVudHJ5KTtcbiAgICBjb25zdCBoaSA9IHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3NpemVfaGkoZW50cnkpO1xuICAgIHJldHVybiBoaSAqIDQyOTQ5NjcyOTYgKyBsbztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X3NldF9zaXplKGVudHJ5OiBBcmNoaXZlRW50cnlQdHIsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3NldF9zaXplKGVudHJ5LCAwLCBzaXplKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X3NpemVfaXNfc2V0KGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zaXplX2lzX3NldChlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9tb2RlKGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9tb2RlKGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X3NldF9tb2RlKGVudHJ5OiBBcmNoaXZlRW50cnlQdHIsIG1vZGU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3NldF9tb2RlKGVudHJ5LCBtb2RlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2J1ZmZlcl9uZXcoc2l6ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfYnVmZmVyX25ldyhzaXplKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2J1ZmZlcl9mcmVlKGJ1ZmZlcjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfYnVmZmVyX2ZyZWUoYnVmZmVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2J1ZmZlcl9mcm9tKHN0cjogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBlbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyO1xuICAgIGNvbnN0IGJ5dGVzID0gZW5jb2Rlci5lbmNvZGUoc3RyICsgXCJcXHgwMFwiKTtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9idWZmZXJfbmV3KGJ5dGVzLmxlbmd0aCk7XG4gICAgaWYgKG9mZnNldClcbiAgICAgIChuZXcgVWludDhBcnJheSh0aGlzLl9tZW1vcnkuYnVmZmVyLCBvZmZzZXQsIGJ5dGVzLmxlbmd0aCkpLnNldChieXRlcyk7XG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSUFyY2hpdmVFbnRyeSB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcbmltcG9ydCB7IEFyY2hpdmVFbnRyeVB0ciB9IGZyb20gXCIuL0FyY2hpdmVOYXRpdmVcIjtcbmltcG9ydCB7IE5PX01FTU9SWSwgU3RyaW5nRXh0cmFzIH0gZnJvbSBcIi4vVXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEFyY2hpdmVFbnRyeSBpbXBsZW1lbnRzIElBcmNoaXZlRW50cnkge1xuICBwcml2YXRlIF9jb250ZXh0OiBBcmNoaXZlQ29udGV4dDtcbiAgcHJpdmF0ZSBfZW50cnk6IEFyY2hpdmVFbnRyeVB0cjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29udGV4dDogQXJjaGl2ZUNvbnRleHQsIGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpIHtcbiAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLl9lbnRyeSA9IGVudHJ5O1xuICB9XG5cbiAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X2ZyZWUodGhpcy5fZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGdldCBtZW1vcnlPZmZzZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VudHJ5O1xuICB9XG5cbiAgcHVibGljIGdldCBwYXRobmFtZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHBhdGhuYW1lUHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3BhdGhuYW1lX3V0ZjgodGhpcy5fZW50cnkpO1xuICAgIGlmIChwYXRobmFtZVB0cikge1xuICAgICAgcmV0dXJuIFN0cmluZ0V4dHJhcy5mcm9tQnVmZmVyKHRoaXMuX2NvbnRleHQubWVtb3J5QnVmZmVyLCBwYXRobmFtZVB0cik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBwYXRobmFtZShwYXRobmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcGF0aG5hbWVQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ocGF0aG5hbWUpO1xuICAgIGlmICghcGF0aG5hbWVQdHIpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9zZXRfcGF0aG5hbWVfdXRmOCh0aGlzLl9lbnRyeSwgcGF0aG5hbWVQdHIpO1xuICB9XG5cbiAgcHVibGljIGdldCBzaXplKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9zaXplX2lzX3NldCh0aGlzLl9lbnRyeSkpXG4gICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3NpemUodGhpcy5fZW50cnkpO1xuICB9XG5cbiAgcHVibGljIHNldCBzaXplKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfc2V0X3NpemUodGhpcy5fZW50cnksIHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbW9kZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfbW9kZSh0aGlzLl9lbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgc2V0IG1vZGUobW9kZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3NldF9tb2RlKHRoaXMuX2VudHJ5LCBtb2RlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSUFyY2hpdmUgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlTmF0aXZlIH0gZnJvbSBcIi4vQXJjaGl2ZU5hdGl2ZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUNvbnRleHQgfSBmcm9tIFwiLi9BcmNoaXZlQ29udGV4dFwiO1xuaW1wb3J0IHsgQXJjaGl2ZUJ1ZmZlciB9IGZyb20gXCIuL0FyY2hpdmVCdWZmZXJcIjtcbmltcG9ydCB7IEFyY2hpdmVFbnRyeSB9IGZyb20gXCIuL0FyY2hpdmVFbnRyeVwiO1xuaW1wb3J0IHsgQXJjaGl2ZVJlYWQgfSBmcm9tIFwiLi9BcmNoaXZlUmVhZFwiO1xuaW1wb3J0IHsgQXJjaGl2ZVdyaXRlIH0gZnJvbSBcIi4vQXJjaGl2ZVdyaXRlXCI7XG5pbXBvcnQgeyBOT19NRU1PUlksIFN0cmluZ0V4dHJhcyB9IGZyb20gXCIuL1V0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBBcmNoaXZlIGltcGxlbWVudHMgSUFyY2hpdmUge1xuICBwcml2YXRlIF9jb250ZXh0OiBBcmNoaXZlQ29udGV4dDtcbiAgcHJpdmF0ZSBfdmVyc2lvbiA9IFwiXCI7XG4gIHByaXZhdGUgX3ZlcnNpb25EZXRhaWxzID0gXCJcIjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29udGV4dDogQXJjaGl2ZUNvbnRleHQpIHtcbiAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmVyc2lvbigpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5fdmVyc2lvbikge1xuICAgICAgY29uc3QgdmVyc2lvblB0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV92ZXJzaW9uKCk7XG4gICAgICB0aGlzLl92ZXJzaW9uID0gU3RyaW5nRXh0cmFzLmZyb21CdWZmZXIodGhpcy5fY29udGV4dC5tZW1vcnlCdWZmZXIsIHZlcnNpb25QdHIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdmVyc2lvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmVyc2lvbkRldGFpbHMoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuX3ZlcnNpb25EZXRhaWxzKSB7XG4gICAgICBjb25zdCB2ZXJzaW9uRGV0YWlsc1B0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV92ZXJzaW9uX2RldGFpbHMoKTtcbiAgICAgIHRoaXMuX3ZlcnNpb25EZXRhaWxzID0gU3RyaW5nRXh0cmFzLmZyb21CdWZmZXIodGhpcy5fY29udGV4dC5tZW1vcnlCdWZmZXIsIHZlcnNpb25EZXRhaWxzUHRyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3ZlcnNpb25EZXRhaWxzO1xuICB9XG5cbiAgcHVibGljIG5ld1JlYWQoKTogQXJjaGl2ZVJlYWQge1xuICAgIGNvbnN0IGFyY2hpdmVfcmVhZCA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX25ldygpO1xuICAgIGlmICghYXJjaGl2ZV9yZWFkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgcmV0dXJuIG5ldyBBcmNoaXZlUmVhZCh0aGlzLl9jb250ZXh0LCBhcmNoaXZlX3JlYWQpO1xuICB9XG5cbiAgcHVibGljIG5ld1dyaXRlKCk6IEFyY2hpdmVXcml0ZSB7XG4gICAgY29uc3QgYXJjaGl2ZV93cml0ZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9uZXcoKTtcbiAgICBpZiAoIWFyY2hpdmVfd3JpdGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICByZXR1cm4gbmV3IEFyY2hpdmVXcml0ZSh0aGlzLl9jb250ZXh0LCBhcmNoaXZlX3dyaXRlKTtcbiAgfVxuXG4gIHB1YmxpYyBuZXdFbnRyeSgpOiBBcmNoaXZlRW50cnkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X25ldygpO1xuICAgIGlmICghZW50cnkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICByZXR1cm4gbmV3IEFyY2hpdmVFbnRyeSh0aGlzLl9jb250ZXh0LCBlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgbmV3QnVmZmVyKGxlbmd0aDogbnVtYmVyKTogQXJjaGl2ZUJ1ZmZlciB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9uZXcobGVuZ3RoKTtcbiAgICBpZiAoIW9mZnNldClcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIHJldHVybiBuZXcgQXJjaGl2ZUJ1ZmZlcih0aGlzLl9jb250ZXh0LCBvZmZzZXQsIGxlbmd0aCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIGluc3RhbnRpYXRlKGJ1ZmZlcjogQnVmZmVyIHwgQXJyYXlCdWZmZXIpOiBQcm9taXNlPEFyY2hpdmU+IHtcbiAgICBsZXQgY29udGV4dDogQXJjaGl2ZUNvbnRleHQ7XG5cbiAgICBjb25zdCBpbXBvcnRPYmplY3QgPSB7XG4gICAgICBlbnY6IHtcbiAgICAgICAgYXJjaGl2ZV9vcGVuX2hhbmRsZXI6IChhcmNoaXZlOiBudW1iZXIpID0+IGNvbnRleHQuYXJjaGl2ZV9vcGVuX2hhbmRsZXIoYXJjaGl2ZSksXG4gICAgICAgIGFyY2hpdmVfcmVhZF9oYW5kbGVyOiAoYXJjaGl2ZTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgc2l6ZTogbnVtYmVyKSA9PiBjb250ZXh0LmFyY2hpdmVfcmVhZF9oYW5kbGVyKGFyY2hpdmUsIG9mZnNldCwgc2l6ZSksXG4gICAgICAgIGFyY2hpdmVfd3JpdGVfaGFuZGxlcjogKGFyY2hpdmU6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcikgPT4gY29udGV4dC5hcmNoaXZlX3dyaXRlX2hhbmRsZXIoYXJjaGl2ZSwgb2Zmc2V0LCBzaXplKSxcbiAgICAgICAgYXJjaGl2ZV9jbG9zZV9oYW5kbGVyOiAoYXJjaGl2ZTogbnVtYmVyKSA9PiBjb250ZXh0LmFyY2hpdmVfY2xvc2VfaGFuZGxlcihhcmNoaXZlKSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IGluc3RTb3VyY2UgPSBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShidWZmZXIsIGltcG9ydE9iamVjdCk7XG4gICAgY29uc3QgbmF0aXZlID0gaW5zdFNvdXJjZS5pbnN0YW5jZS5leHBvcnRzIGFzIEFyY2hpdmVOYXRpdmU7XG4gICAgY29udGV4dCA9IG5ldyBBcmNoaXZlQ29udGV4dChuYXRpdmUsIG5hdGl2ZS5tZW1vcnkpO1xuXG4gICAgcmV0dXJuIG5ldyBBcmNoaXZlKGNvbnRleHQpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJQXJjaGl2ZSwgSUFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBRV9JRk1ULCBBRV9JRlJFRywgQUVfSUZESVIsIEVudHJ5SW5mbyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcblxuZXhwb3J0IG5hbWVzcGFjZSBBcmNoaXZlT3BlcmF0aW9ucyB7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFXcml0ZXIge1xuICB3cml0ZURhdGEoYnVmZmVyOiBBcnJheUJ1ZmZlciwgYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoOiBudW1iZXIpOiBudW1iZXIgfCBQcm9taXNlPG51bWJlcj47XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElEZWNvbXByZXNzQ2FsbGJhY2tzIHtcbiAgZGlyRW50cnkoZW50cnk6IEVudHJ5SW5mbyk6IHZvaWQgfCBQcm9taXNlPHZvaWQ+O1xuICBmaWxlRW50cnkoZW50cnk6IEVudHJ5SW5mbyk6IElEYXRhV3JpdGVyIHwgUHJvbWlzZTxJRGF0YVdyaXRlcj47XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVjb21wcmVzcyhjb250ZXh0OiBJQXJjaGl2ZSwgaW5wdXQ6IHN0cmluZyB8IEJ1ZmZlciwgY2FsbGJhY2tzOiBJRGVjb21wcmVzc0NhbGxiYWNrcyk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAodHlwZW9mIGlucHV0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChpbnB1dCk7XG4gICAgaW5wdXQgPSBCdWZmZXIuZnJvbShhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpKTtcbiAgfVxuXG4gIGNvbnN0IGFyY2hpdmUgPSBjb250ZXh0Lm5ld1JlYWQoKTtcblxuICBhcmNoaXZlLnN1cHBvcnRGaWx0ZXJBbGwoKTtcbiAgYXJjaGl2ZS5zdXBwb3J0Rm9ybWF0QWxsKCk7XG5cbiAgY29uc3QgY2h1bmtzOiBCdWZmZXJbXSA9IFsgaW5wdXQgXTtcbiAgYXJjaGl2ZS5vbnJlYWQgPSAoKSA9PiBjaHVua3Muc2hpZnQoKTtcbiAgYXJjaGl2ZS5vcGVuKCk7XG5cbiAgY29uc3QgYnVmZmVyID0gY29udGV4dC5uZXdCdWZmZXIoNDA5Mik7XG5cbiAgZm9yICg7Oykge1xuICAgIGNvbnN0IGVudHJ5ID0gYXJjaGl2ZS5uZXh0SGVhZGVyKCk7XG4gICAgaWYoIWVudHJ5KSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBwYXRobmFtZSA9IGVudHJ5LnBhdGhuYW1lO1xuICAgIGlmICghcGF0aG5hbWUpIHtcbiAgICAgIGFyY2hpdmUuZGF0YVNraXAoKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGluZm86IEVudHJ5SW5mbyA9IHtcbiAgICAgIHBhdGhuYW1lLFxuICAgICAgc2l6ZTogZW50cnkuc2l6ZSxcbiAgICAgIG1vZGU6IGVudHJ5Lm1vZGUsXG4gICAgfTtcblxuICAgIGxldCBzaXplID0gMDtcbiAgICBjb25zdCBmaWxldHlwZSA9IGVudHJ5Lm1vZGUgJiBBRV9JRk1UO1xuICAgIGlmIChmaWxldHlwZSA9PT0gQUVfSUZESVIpIHtcbiAgICAgIGNvbnN0IHIgPSBjYWxsYmFja3MuZGlyRW50cnkoaW5mbyk7XG4gICAgICBpZiAociBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgIGF3YWl0IHI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGZpbGV0eXBlID09PSBBRV9JRlJFRykge1xuICAgICAgY29uc3QgZiA9IGNhbGxiYWNrcy5maWxlRW50cnkoaW5mbyk7XG4gICAgICBsZXQgd3JpdGVyID0gKGYgaW5zdGFuY2VvZiBQcm9taXNlKSA/IChhd2FpdCBmKSA6IGY7XG4gICAgICBzaXplID0gZW50cnkuc2l6ZSB8fCAwO1xuICAgICAgd2hpbGUgKHNpemUgPiAwKSB7XG4gICAgICAgIGxldCBuID0gYXJjaGl2ZS5kYXRhUmVhZChidWZmZXIpO1xuICAgICAgICB3aGlsZSAobikge1xuICAgICAgICAgIGNvbnN0IHcgPSB3cml0ZXIud3JpdGVEYXRhKGJ1ZmZlci5idWZmZXIsIGJ1ZmZlci5ieXRlT2Zmc2V0LCBuKTtcbiAgICAgICAgICBjb25zdCBzeiA9ICh3IGluc3RhbmNlb2YgUHJvbWlzZSkgPyAoYXdhaXQgdykgOiB3O1xuICAgICAgICAgIG4gLT0gc3o7XG4gICAgICAgICAgc2l6ZSAtPSBzejtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGFyY2hpdmUuZGF0YVJlYWQoYnVmZmVyKSAhPSAwKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgJHtwYXRobmFtZX0gZmlsZSBoYXMgd3JvbmcgZGF0YSBzaXplICgke3NpemV9KWApO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNpemUgPT0gMClcbiAgICAgIGFyY2hpdmUuZGF0YVNraXAoKTtcbiAgfVxuXG4gIGJ1ZmZlci5yZWxlYXNlKCk7XG4gIGFyY2hpdmUuY2xvc2UoKTtcbiAgYXJjaGl2ZS5yZWxlYXNlKCk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUVudHJ5UmVhZGVyIHtcbiAgcGF0aG5hbWU6IHN0cmluZztcbiAgbW9kZTogbnVtYmVyO1xuICBzaXplPzogbnVtYmVyO1xuXG4gIHJlYWREYXRhKGJ1ZmZlcjogQXJyYXlCdWZmZXIsIGJ5dGVPZmZzZXQ/OiBudW1iZXIsIGJ5dGVMZW5ndGg/OiBudW1iZXIpOiBudW1iZXIgfCBQcm9taXNlPG51bWJlcj47XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb21wcmVzc0NhbGxiYWNrcyB7XG4gIG5leHRFbnRyeSgpOiBJRW50cnlSZWFkZXIgfCB1bmRlZmluZWQgfCBQcm9taXNlPElFbnRyeVJlYWRlciB8IHVuZGVmaW5lZD47XG4gIHdyaXRlRGF0YShidWZmZXI6IEFycmF5QnVmZmVyLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg6IG51bWJlcik6IG51bWJlciB8IFByb21pc2U8bnVtYmVyPjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wcmVzcyhjb250ZXh0OiBJQXJjaGl2ZSwgY2FsbGJhY2tzOiBJQ29tcHJlc3NDYWxsYmFja3MsIG91dHB1dDogc3RyaW5nKSB7XG4gIGNvbnN0IGFyY2hpdmUgPSBjb250ZXh0Lm5ld1dyaXRlKCk7XG5cbiAgYXJjaGl2ZS5zZXRGb3JtYXRGaWx0ZXJCeUV4dChvdXRwdXQpO1xuXG4gIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQubmV3QnVmZmVyKDgxOTIpO1xuXG4gIGNvbnN0IGNodW5rcyA9IG5ldyBBcnJheTxBcnJheUJ1ZmZlcj47XG4gIGFyY2hpdmUub253cml0ZSA9IChidWZmZXI6IElBcmNoaXZlQnVmZmVyKSA9PiB7XG4gICAgY2h1bmtzLnB1c2goYnVmZmVyLmJ1ZmZlci5zbGljZShidWZmZXIuYnl0ZU9mZnNldCwgYnVmZmVyLmJ5dGVPZmZzZXQgKyBidWZmZXIuYnl0ZUxlbmd0aCkpO1xuICB9XG5cbiAgY29uc3QgZmx1c2hDaHVua3MgPSBhc3luYyAoKSA9PiB7XG4gICAgZm9yICg7Oykge1xuICAgICAgY29uc3QgYnl0ZXMgPSBjaHVua3Muc2hpZnQoKTtcbiAgICAgIGlmICghYnl0ZXMpXG4gICAgICAgIHJldHVybjtcbiAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgbGV0IGxlbmd0aCA9IGJ5dGVzLmJ5dGVMZW5ndGg7XG4gICAgICB3aGlsZSAobGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHcgPSBjYWxsYmFja3Mud3JpdGVEYXRhKGJ5dGVzLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICAgIGNvbnN0IG4gPSAodyBpbnN0YW5jZW9mIFByb21pc2UpID8gKGF3YWl0IHcpIDogdztcbiAgICAgICAgb2Zmc2V0ICs9IG47XG4gICAgICAgIGxlbmd0aCAtPSBuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFyY2hpdmUub3BlbigpO1xuICBmb3IgKDs7KSB7XG4gICAgY29uc3QgeCA9IGNhbGxiYWNrcy5uZXh0RW50cnkoKTtcbiAgICBjb25zdCBpdGVyID0gKHggaW5zdGFuY2VvZiBQcm9taXNlKSA/IChhd2FpdCB4KSA6IHg7XG4gICAgaWYgKCFpdGVyKVxuICAgICAgYnJlYWs7XG5cbiAgICBjb25zdCBlbnRyeSA9IGNvbnRleHQubmV3RW50cnkoKTtcbiAgICBlbnRyeS5wYXRobmFtZSA9IGl0ZXIucGF0aG5hbWU7XG4gICAgZW50cnkubW9kZSA9IGl0ZXIubW9kZTtcblxuICAgIGlmIChpdGVyLnNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZW50cnkuc2l6ZSA9IGl0ZXIuc2l6ZTtcbiAgICB9XG5cbiAgICBhcmNoaXZlLndyaXRlSGVhZGVyKGVudHJ5KTtcblxuICAgIGlmIChpdGVyLnNpemUpIHtcbiAgICAgIGxldCBzaXplID0gaXRlci5zaXplO1xuICAgICAgd2hpbGUgKHNpemUpIHtcbiAgICAgICAgY29uc3QgciA9IGl0ZXIucmVhZERhdGEoYnVmZmVyLmJ1ZmZlciwgYnVmZmVyLmJ5dGVPZmZzZXQsIGJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgY29uc3Qgc3ogPSAociBpbnN0YW5jZW9mIFByb21pc2UpID8gKGF3YWl0IHIpIDogcjtcbiAgICAgICAgYXJjaGl2ZS53cml0ZURhdGEoYnVmZmVyLCAwLCBzeik7XG4gICAgICAgIHNpemUgLT0gc3o7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZW50cnkucmVsZWFzZSgpO1xuXG4gICAgYXdhaXQgZmx1c2hDaHVua3MoKTtcbiAgfVxuICBhcmNoaXZlLmNsb3NlKCk7XG5cbiAgYXdhaXQgZmx1c2hDaHVua3MoKTtcblxuICBidWZmZXIucmVsZWFzZSgpO1xuICBhcmNoaXZlLnJlbGVhc2UoKTtcbn1cblxufSAvLyBuYW1lc3BhY2UgQXJjaGl2ZU9wZXJhdGlvbnNcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQXJjaGl2ZU9wZW5DYWxsYmFjaywgQXJjaGl2ZVJlYWRDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIElBcmNoaXZlUmVhZCwgQVJDSElWRV9PSyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcbmltcG9ydCB7IEFyY2hpdmVCYXNlIH0gZnJvbSBcIi4vQXJjaGl2ZUJhc2VcIjtcbmltcG9ydCB7IEFyY2hpdmVFbnRyeSB9IGZyb20gXCIuL0FyY2hpdmVFbnRyeVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUJ1ZmZlciB9IGZyb20gXCIuL0FyY2hpdmVCdWZmZXJcIjtcbmltcG9ydCB7IGVycm9yQ29kZVRvU3RyaW5nLCBOT19NRU1PUlkgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZVJlYWQgZXh0ZW5kcyBBcmNoaXZlQmFzZSBpbXBsZW1lbnRzIElBcmNoaXZlUmVhZCB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgc3VwZXIoY29udGV4dCwgYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9mcmVlKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHN1cHBvcnRGaWx0ZXJBbGwoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZmlsdGVyX2FsbCh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBzdXBwb3J0Rm9ybWF0QWxsKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zdXBwb3J0X2Zvcm1hdF9hbGwodGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUGFzc3BocmFzZShwYXNzcGhyYXNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBwYXNzcGhyYXNlUHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKHBhc3NwaHJhc2UpO1xuICAgIGlmICghcGFzc3BocmFzZVB0cikgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX2FkZF9wYXNzcGhyYXNlKHRoaXMuX2FyY2hpdmUsIHBhc3NwaHJhc2VQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShwYXNzcGhyYXNlUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX29wZW4odGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGNvZGUgIT09IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfY2xvc2UodGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgbmV4dEhlYWRlcigpOiBBcmNoaXZlRW50cnkgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfbmV4dF9oZWFkZXIodGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGVudHJ5KVxuICAgICAgcmV0dXJuIG5ldyBBcmNoaXZlRW50cnkodGhpcy5fY29udGV4dCwgZW50cnkpO1xuXG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX2xhc3RfZXJyb3IodGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGNvZGUgIT09IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGF0YVJlYWQoYnVmZmVyOiBBcmNoaXZlQnVmZmVyLCBvZmZzZXQ/OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IG51bWJlciB7XG4gICAgb2Zmc2V0ID0gYnVmZmVyLmJ5dGVPZmZzZXQgKyAob2Zmc2V0IHx8IDApO1xuICAgIGxlbmd0aCA9IGxlbmd0aCB8fCBidWZmZXIuYnl0ZUxlbmd0aDtcblxuICAgIGNvbnN0IG4gPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9kYXRhKHRoaXMuX2FyY2hpdmUsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhuKSB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG47XG4gIH1cblxuICBwdWJsaWMgZGF0YVNraXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfZGF0YV9za2lwKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHNldCBvbm9wZW4oY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zZXRfb3Blbl9jYWxsYmFjayh0aGlzLl9hcmNoaXZlLCBjYWxsYmFjayk7XG4gIH1cblxuICBwdWJsaWMgc2V0IG9ucmVhZChjYWxsYmFjazogQXJjaGl2ZVJlYWRDYWxsYmFjaykge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3NldF9yZWFkX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zZXRfY2xvc2VfY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJQXJjaGl2ZVdyaXRlLCBBcmNoaXZlT3BlbkNhbGxiYWNrLCBBcmNoaXZlV3JpdGVDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIEFSQ0hJVkVfT0sgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5pbXBvcnQgeyBBcmNoaXZlQmFzZSB9IGZyb20gXCIuL0FyY2hpdmVCYXNlXCI7XG5pbXBvcnQgeyBBcmNoaXZlRW50cnkgfSBmcm9tIFwiLi9BcmNoaXZlRW50cnlcIjtcbmltcG9ydCB7IEFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlQnVmZmVyXCI7XG5pbXBvcnQgeyBOT19NRU1PUlksIGVycm9yQ29kZVRvU3RyaW5nIH0gZnJvbSBcIi4vVXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEFyY2hpdmVXcml0ZSBleHRlbmRzIEFyY2hpdmVCYXNlIGltcGxlbWVudHMgSUFyY2hpdmVXcml0ZSB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgc3VwZXIoY29udGV4dCwgYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfZnJlZSh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgZm9ybWF0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKHZhbHVlKTtcbiAgICBpZiAoIW5hbWUpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9ieV9uYW1lKHRoaXMuX2FyY2hpdmUsIG5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShuYW1lKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBvcHRpb25zKG9wdGlvbnM6IHN0cmluZykge1xuICAgIGNvbnN0IG9wdGlvbnNQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9vcHRpb25zKHRoaXMuX2FyY2hpdmUsIG9wdGlvbnNQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShvcHRpb25zUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBwYXNzcGhyYXNlKHBhc3NwaHJhc2U6IHN0cmluZykge1xuICAgIGNvbnN0IHBhc3NwaHJhc2VQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ocGFzc3BocmFzZSk7XG4gICAgaWYgKCFwYXNzcGhyYXNlUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9wYXNzcGhyYXNlKHRoaXMuX2FyY2hpdmUsIHBhc3NwaHJhc2VQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShwYXNzcGhyYXNlUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZEZpbHRlcihmaWx0ZXI6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20oZmlsdGVyKTtcbiAgICBpZiAoIW5hbWUpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfYWRkX2ZpbHRlcl9ieV9uYW1lKHRoaXMuX2FyY2hpdmUsIG5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShuYW1lKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldEZvcm1hdEZpbHRlckJ5RXh0KGZpbGVuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmbmFtZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJvbShmaWxlbmFtZSk7XG4gICAgaWYgKCFmbmFtZSkgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2ZpbHRlcl9ieV9leHQodGhpcy5fYXJjaGl2ZSwgZm5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShmbmFtZSk7XG4gICAgaWYgKGNvZGUgIT0gQVJDSElWRV9PSykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuZXJyb3JTdHJpbmcsIHsgY2F1c2U6IGVycm9yQ29kZVRvU3RyaW5nKGNvZGUpIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25vcGVuKGNhbGxiYWNrOiBBcmNoaXZlT3BlbkNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9vcGVuX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb253cml0ZShjYWxsYmFjazogQXJjaGl2ZVdyaXRlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X3dyaXRlX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X29wZW5fY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9vcGVuKHRoaXMuX2FyY2hpdmUpO1xuICAgIGlmIChjb2RlICE9PSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9jbG9zZSh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZUhlYWRlcihlbnRyeTogQXJjaGl2ZUVudHJ5KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX2hlYWRlcih0aGlzLl9hcmNoaXZlLCBlbnRyeS5tZW1vcnlPZmZzZXQpO1xuICB9XG5cbiAgcHVibGljIHdyaXRlRGF0YShidWZmZXI6IEFyY2hpdmVCdWZmZXIsIG9mZnNldD86IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBvZmZzZXQgPSBidWZmZXIuYnl0ZU9mZnNldCArIChvZmZzZXQgfHwgMCk7XG4gICAgbGVuZ3RoID0gbGVuZ3RoIHx8IGJ1ZmZlci5ieXRlTGVuZ3RoIC0gb2Zmc2V0O1xuXG4gICAgY29uc3QgbiA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9kYXRhKHRoaXMuX2FyY2hpdmUsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhuKSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbjtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcmlwdERpcmVjdG9yeSgpIHtcbiAgaWYgKHR5cGVvZiBfX2Rpcm5hbWUgIT09ICd1bmRlZmluZWQnKVxuICAgIHJldHVybiBldmFsKFwiX19kaXJuYW1lXCIpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRmlsZUhhbmRsZSB7XG4gIHJlYWQoYnVmZmVyOiBVaW50OEFycmF5KTogUHJvbWlzZTx7IGJ5dGVzUmVhZDogbnVtYmVyfT47XG4gIHdyaXRlKGJ1ZmZlcjogVWludDhBcnJheSk6IFByb21pc2U8eyBieXRlc1dyaXR0ZW46IG51bWJlciB9PjtcbiAgY2xvc2UoKTogUHJvbWlzZTx2b2lkPjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTeXN0ZW0ge1xuICBta2RpcihwYXRoOiBzdHJpbmcsIG9wdGlvbnM6IHsgcmVjdXJzaXZlOiBib29sZWFuIH0pOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD47XG4gIG9wZW4ocGF0aDogc3RyaW5nLCBmbGFncz86IHN0cmluZyB8IG51bWJlciwgbW9kZT86IG51bWJlcik6IFByb21pc2U8SUZpbGVIYW5kbGU+O1xuICByZWFkRmlsZShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj47XG59O1xuXG5leHBvcnQgbmFtZXNwYWNlIEZpbGVTeXN0ZW0ge1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vZGUob3B0aW9ucz86IHsgd2l0aE1rZGlyQ2FjaGU/OiBib29sZWFuLCBjdXJyZW50RGlyPzogc3RyaW5nIH0pOiBJRmlsZVN5c3RlbVxue1xuICBjb25zdCBob3N0RnM6IElGaWxlU3lzdGVtID0ge1xuICAgIG1rZGlyOiBmcy5wcm9taXNlcy5ta2RpcixcbiAgICBvcGVuOiBmcy5wcm9taXNlcy5vcGVuLFxuICAgIHJlYWRGaWxlOiBmcy5wcm9taXNlcy5yZWFkRmlsZSxcbiAgfTtcblxuICBpZihvcHRpb25zPy53aXRoTWtkaXJDYWNoZSkge1xuICAgIGNvbnN0IG1rZGlyQ2FjaGUgPSBuZXcgTWtkaXJDYWNoZTtcbiAgICBob3N0RnMubWtkaXIgPSAoZGlyUGF0aDogc3RyaW5nLCBvcHRpb25zOiB7IHJlY3Vyc2l2ZTogYm9vbGVhbiB9KTogUHJvbWlzZTxzdHJpbmcgfCB1bmRlZmluZWQ+ID0+IHtcbiAgICAgIHJldHVybiBta2RpckNhY2hlLm1rZGlyKGRpclBhdGgsIG9wdGlvbnMpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gaG9zdEZzO1xufVxufSAvLyBuYW1lc3BhY2UgRmlsZVN5c3RlbVxuXG5leHBvcnQgbmFtZXNwYWNlIFBhdGhTZXAge1xuXG50eXBlIFNlcFBhaXIgPSAgWyBmaXJzdDogc3RyaW5nLCBzZWNvbmQ6IHN0cmluZyBdO1xuXG5sZXQgc19pbnN0YW5jZToge1xuICBuYXRpdmU6IFNlcFBhaXIsXG4gIHdpbjMyOiBTZXBQYWlyLFxuICBwb3NpeDpTZXBQYWlyLFxufTtcblxuZnVuY3Rpb24gZ2V0SW5zdGFjZSgpIHtcbiAgaWYgKCFzX2luc3RhbmNlKSB7XG4gICAgY29uc3Qgd2luMzI6IFNlcFBhaXIgPSBbIHBhdGgud2luMzIuc2VwLCBwYXRoLnBvc2l4LnNlcCBdO1xuICAgIGNvbnN0IHBvc2l4OiBTZXBQYWlyID0gWyBwYXRoLnBvc2l4LnNlcCwgcGF0aC53aW4zMi5zZXAgXTtcbiAgICBjb25zdCBuYXRpdmUgPSAob3MucGxhdGZvcm0oKSA9PT0gXCJ3aW4zMlwiKSA/IHdpbjMyIDogcG9zaXg7XG4gICAgc19pbnN0YW5jZSA9IHsgbmF0aXZlLCB3aW4zMiwgcG9zaXggfTtcbiAgfVxuICByZXR1cm4gc19pbnN0YW5jZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcHJlc2VudFBhdGhBc05hdGl2ZShpbnB1dFBhdGg6IHN0cmluZykge1xuICBjb25zdCBwYWlyID0gZ2V0SW5zdGFjZSgpLm5hdGl2ZTtcbiAgcmV0dXJuIGlucHV0UGF0aC5yZXBsYWNlQWxsKHBhaXJbMV0sIHBhaXJbMF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwcmVzZW50UGF0aEFzUG9zaXgoaW5wdXRQYXRoOiBzdHJpbmcpIHtcbiAgY29uc3QgcGFpciA9IGdldEluc3RhY2UoKS5wb3NpeDtcbiAgcmV0dXJuIGlucHV0UGF0aC5yZXBsYWNlQWxsKHBhaXJbMV0sIHBhaXJbMF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwcmVzZW50UGF0aEFzV2luMzIoaW5wdXRQYXRoOiBzdHJpbmcpIHtcbiAgY29uc3QgcGFpciA9IGdldEluc3RhY2UoKS53aW4zMjtcbiAgcmV0dXJuIGlucHV0UGF0aC5yZXBsYWNlQWxsKHBhaXJbMV0sIHBhaXJbMF0pO1xufVxuXG59IC8vIG5hbWVzcGFjZVxuXG5leHBvcnQgY2xhc3MgTWtkaXJDYWNoZSB7XG4gIHByaXZhdGUgX2Rpck1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmcgfCBudWxsPjtcbiAgXG4gIHB1YmxpYyBhc3luYyBta2RpcihkaXJQYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiB7IHJlY3Vyc2l2ZTogYm9vbGVhbiB9KSB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuX2Rpck1hcC5nZXQoZGlyUGF0aCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbClcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihkaXJQYXRoLCBvcHRpb25zKTtcbiAgICAgIHRoaXMuX2Rpck1hcC5zZXQoZGlyUGF0aCwgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSA/IG51bGwgOiByZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVTdGF0IHtcbiAgbmFtZTogc3RyaW5nO1xuICBmaWxlcGF0aDogc3RyaW5nO1xuICBzdGF0OiBmcy5TdGF0cztcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZpbGVTdGF0c0ltcGwocmVzdWx0OiBGaWxlU3RhdFtdLCBmaWxlbmFtZXM6IHN0cmluZ1tdLCBkaXJlY3Rvcnk6IHN0cmluZyk6IFByb21pc2U8RmlsZVN0YXRbXT4ge1xuICBmb3IgKGNvbnN0IG5hbWUgb2YgZmlsZW5hbWVzKSB7XG4gICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLmpvaW4oZGlyZWN0b3J5LCBQYXRoU2VwLnJlcHJlc2VudFBhdGhBc05hdGl2ZShuYW1lKSk7XG4gICAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnByb21pc2VzLnN0YXQoZmlsZXBhdGgpO1xuICAgIGNvbnN0IGl0ZW0gPSB7IG5hbWUsIGZpbGVwYXRoLCBzdGF0IH07XG4gICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgaXRlbS5uYW1lICs9IHBhdGgucG9zaXguc2VwO1xuICAgICAgY29uc3QgaXRlbXMgPSAoYXdhaXQgZnMucHJvbWlzZXMucmVhZGRpcihmaWxlcGF0aCkpLm1hcChpID0+IHBhdGguam9pbihuYW1lLCBpKSk7XG4gICAgICBhd2FpdCBnZXRGaWxlU3RhdHNJbXBsKHJlc3VsdCwgaXRlbXMsIGRpcmVjdG9yeSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRGaWxlU3RhdHMoZmlsZW5hbWVzOiBzdHJpbmdbXSwgZGlyZWN0b3J5OiBzdHJpbmcpOiBQcm9taXNlPEZpbGVTdGF0W10+IHtcbiAgcmV0dXJuIGdldEZpbGVTdGF0c0ltcGwoW10sIGZpbGVuYW1lcy5tYXAoaSA9PiBQYXRoU2VwLnJlcHJlc2VudFBhdGhBc1Bvc2l4KGkpKSwgUGF0aFNlcC5yZXByZXNlbnRQYXRoQXNOYXRpdmUoZGlyZWN0b3J5KSk7XG59XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFSQ0hJVkVfT0ssIEFSQ0hJVkVfUkVUUlksIEFSQ0hJVkVfV0FSTiwgQVJDSElWRV9GQUlMRUQsIEFSQ0hJVkVfRkFUQUwgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5cbmV4cG9ydCBjb25zdCBOT19NRU1PUlkgPSBcIk5vIE1lbW9yeVwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIFN0cmluZ0V4dHJhcyB7IFxuZXhwb3J0IGZ1bmN0aW9uIGZyb21CdWZmZXIoYnVmZmVyOiBBcnJheUJ1ZmZlciwgb2Zmc2V0OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IHN0cmluZ1xue1xuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwO1xuICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCBvZmZzZXQpO1xuICAgIHdoaWxlIChieXRlc1tsZW5ndGhdKVxuICAgICAgbGVuZ3RoKys7XG4gIH1cblxuICByZXR1cm4gKG5ldyBUZXh0RGVjb2RlcihcInV0Zi04XCIpKS5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCkpO1xufVxufSAvLyBuYW1lc3BhY2UgU3RyaW5nRXh0cmFzXG5cbmV4cG9ydCBmdW5jdGlvbiBlcnJvckNvZGVUb1N0cmluZyhjb2RlOiBudW1iZXIpOiBzdHJpbmdcbntcbiAgc3dpdGNoIChjb2RlKSB7XG4gIGNhc2UgQVJDSElWRV9PSzpcbiAgICByZXR1cm4gXCJBUkNISVZFX09LXCI7XG4gIGNhc2UgQVJDSElWRV9SRVRSWTpcbiAgICByZXR1cm4gXCJBUkNISVZFX1JFVFJZXCI7XG4gIGNhc2UgQVJDSElWRV9XQVJOOlxuICAgIHJldHVybiBcIkFSQ0hJVkVfV0FSTlwiO1xuICBjYXNlIEFSQ0hJVkVfRkFJTEVEOlxuICAgIHJldHVybiBcIkFSQ0hJVkVfRkFJTEVEXCI7XG4gIGNhc2UgQVJDSElWRV9GQVRBTDpcbiAgICByZXR1cm4gXCJBUkNISVZFX0ZBVEFMXCI7XG4gIH1cblxuICBpZiAoY29kZSA8IDApXG4gICAgcmV0dXJuIFwiQVJDSElWRV9cIiArICgtY29kZSk7XG5cbiAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciBjb2RlICR7Y29kZX0gbXVzdCBiZSBuZWdhdGl2ZWApO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnVybFwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcblxuaW1wb3J0IHsgSUFyY2hpdmUsIElBcmNoaXZlRXhwb3J0LCBEZWNvbXByZXNzT3B0aW9ucywgQ29tcHJlc3NPcHRpb25zLCBFbnRyeUluZm8gfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlIH0gZnJvbSBcIi4vQXJjaGl2ZUltcGxcIjtcbmltcG9ydCB7IEFSQ0hJVkVfT0ssIEFSQ0hJVkVfUkVUUlksIEFSQ0hJVkVfV0FSTiwgQVJDSElWRV9GQUlMRUQsIEFSQ0hJVkVfRkFUQUwgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBRV9JRk1ULCBBRV9JRlJFRywgQUVfSUZMTkssIEFFX0lGU09DSywgQUVfSUZDSFIsIEFFX0lGQkxLLCBBRV9JRkRJUiwgQUVfSUZJRk8gfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBnZXRTY3JpcHREaXJlY3RvcnksIFBhdGhTZXAsIGdldEZpbGVTdGF0cywgTWtkaXJDYWNoZSB9IGZyb20gXCIuL0ZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IEFyY2hpdmVPcGVyYXRpb25zIH0gZnJvbSBcIi4vQXJjaGl2ZU9wZXJhdGlvbnNcIjtcbmltcG9ydCB1cmwgZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIG5ld0FyY2hpdmVDb250ZXh0KHBhcmFtczogc3RyaW5nIHwgQnVmZmVyKTogUHJvbWlzZTxJQXJjaGl2ZT4ge1xuICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikge1xuICAgIHBhcmFtcyA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHBhcmFtcyk7XG4gICAgcmV0dXJuIEFyY2hpdmUuaW5zdGFudGlhdGUocGFyYW1zKTtcbiAgfVxuICBlbHNlIGlmICghKHBhcmFtcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICB0aHJvdyBFcnJvcihgTm90IHN1cHBvcnRlZCBwYXJhbWV0ZXIgJHtwYXJhbXN9YCk7XG4gIH1cblxuICByZXR1cm4gQXJjaGl2ZS5pbnN0YW50aWF0ZShwYXJhbXMpO1xufVxuXG5sZXQgZ19hcmNoaXZlOiBJQXJjaGl2ZTtcbmFzeW5jIGZ1bmN0aW9uIGdldEFyY2hpdmVDb250ZXh0KHBhcmFtcz86IHN0cmluZyB8IEJ1ZmZlcik6IFByb21pc2U8SUFyY2hpdmU+IHtcbiAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIG5ld0FyY2hpdmVDb250ZXh0KHBhcmFtcyk7XG4gIH1cblxuICBpZiAoIWdfYXJjaGl2ZSkge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5qb2luKGdldFNjcmlwdERpcmVjdG9yeSgpLCBcImxpYmFyY2hpdmUud2FzbVwiKTtcbiAgICBnX2FyY2hpdmUgPSBhd2FpdCBuZXdBcmNoaXZlQ29udGV4dChmaWxlbmFtZSk7XG4gIH1cblxuICByZXR1cm4gZ19hcmNoaXZlO1xufVxuXG5jb25zdCBsaWJhcmNoaXZlOiBJQXJjaGl2ZUV4cG9ydCA9IE9iamVjdC5hc3NpZ24oZ2V0QXJjaGl2ZUNvbnRleHQsIHtcbiAgQVJDSElWRV9PSyxcbiAgQVJDSElWRV9SRVRSWSxcbiAgQVJDSElWRV9XQVJOLFxuICBBUkNISVZFX0ZBSUxFRCxcbiAgQVJDSElWRV9GQVRBTCxcblxuICBBRV9JRk1ULFxuICBBRV9JRlJFRyxcbiAgQUVfSUZMTkssXG4gIEFFX0lGU09DSyxcbiAgQUVfSUZDSFIsXG4gIEFFX0lGQkxLLFxuICBBRV9JRkRJUixcbiAgQUVfSUZJRk8sXG5cbiAgYXN5bmMgZGVjb21wcmVzcyhpbnB1dDogc3RyaW5nIHwgQnVmZmVyLCBvdXRwdXQ/OiBzdHJpbmcsIG9wdGlvbnM/OiBEZWNvbXByZXNzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHZlcmJvc2UgPSBvcHRpb25zICYmIG9wdGlvbnMudmVyYm9zZTtcblxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09IFwic3RyaW5nXCIgJiYgIWlucHV0LnN0YXJ0c1dpdGgoXCJodHRwOi8vXCIpICYmICFpbnB1dC5zdGFydHNXaXRoKFwiaHR0cHM6Ly9cIikpIHtcbiAgICAgIGlmIChpbnB1dC5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSlcbiAgICAgICAgaW5wdXQgPSB1cmwuZmlsZVVSTFRvUGF0aChpbnB1dCk7XG4gICAgICBpbnB1dCA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGlucHV0KTtcbiAgICB9XG5cbiAgICBjb25zdCBvdXRwdXREaXIgPSBwYXRoLnJlc29sdmUob3V0cHV0ID8gUGF0aFNlcC5yZXByZXNlbnRQYXRoQXNOYXRpdmUob3V0cHV0KSA6IFwiXCIpO1xuICAgIGNvbnN0IG1rZGlyQ2FjaGUgPSBuZXcgTWtkaXJDYWNoZTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgIGFzeW5jIGRpckVudHJ5KGVudHJ5OiBFbnRyeUluZm8pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdmVyYm9zZSAmJiBjb25zb2xlLmxvZyhcInhcIiwgZW50cnkucGF0aG5hbWUpO1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IHBhdGguam9pbihvdXRwdXREaXIsIFBhdGhTZXAucmVwcmVzZW50UGF0aEFzTmF0aXZlKGVudHJ5LnBhdGhuYW1lKSk7XG4gICAgICAgIGF3YWl0IG1rZGlyQ2FjaGUubWtkaXIoZmlsZXBhdGgsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgfSxcbiAgICAgIGFzeW5jIGZpbGVFbnRyeShlbnRyeTogRW50cnlJbmZvKSB7XG4gICAgICAgIHZlcmJvc2UgJiYgY29uc29sZS5sb2coXCJ4XCIsIGVudHJ5LnBhdGhuYW1lKTtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLmpvaW4ob3V0cHV0RGlyLCBQYXRoU2VwLnJlcHJlc2VudFBhdGhBc05hdGl2ZShlbnRyeS5wYXRobmFtZSkpO1xuICAgICAgICBjb25zdCBkaXJwYXRoID0gcGF0aC5kaXJuYW1lKGZpbGVwYXRoKTtcbiAgICAgICAgYXdhaXQgbWtkaXJDYWNoZS5ta2RpcihkaXJwYXRoLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgICAgICBsZXQgZmlsZUhhbmRsZTogZnMucHJvbWlzZXMuRmlsZUhhbmRsZTtcbiAgICAgICAgbGV0IHNpemUgPSBlbnRyeS5zaXplIHx8IDA7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhc3luYyB3cml0ZURhdGEoYnVmZmVyOiBBcnJheUJ1ZmZlciwgYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICAgICAgaWYgKCFzaXplIHx8IHNpemUgPCBieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc2l6ZSAke2J5dGVMZW5ndGh9IHVzZWRgKVxuICAgICAgICAgICAgaWYgKCFmaWxlSGFuZGxlKVxuICAgICAgICAgICAgICBmaWxlSGFuZGxlID0gYXdhaXQgZnMucHJvbWlzZXMub3BlbihmaWxlcGF0aCwgXCJ3XCIpO1xuICAgICAgICAgICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpO1xuICAgICAgICAgICAgY29uc3QgeyBieXRlc1dyaXR0ZW4gfSA9IChhd2FpdCBmaWxlSGFuZGxlLndyaXRlKGJ5dGVzKSk7XG4gICAgICAgICAgICBzaXplIC09IGJ5dGVzV3JpdHRlbjtcbiAgICAgICAgICAgIGlmICghc2l6ZSlcbiAgICAgICAgICAgICAgYXdhaXQgZmlsZUhhbmRsZS5jbG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGJ5dGVzV3JpdHRlbjtcbiAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG5cbiAgICByZXR1cm4gQXJjaGl2ZU9wZXJhdGlvbnMuZGVjb21wcmVzcyhhd2FpdCBnZXRBcmNoaXZlQ29udGV4dCgpLCBpbnB1dCwgY2FsbGJhY2tzKTtcbiAgfSxcblxuICBhc3luYyBjb21wcmVzcyhpbnB1dDogc3RyaW5nIHwgc3RyaW5nW10sIG91dHB1dDogc3RyaW5nLCBvcHRpb25zPzogQ29tcHJlc3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdmVyYm9zZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy52ZXJib3NlO1xuICAgIGNvbnN0IGN1cnJlbnREaXJlY3RvcnkgPSBvcHRpb25zICYmIG9wdGlvbnMuZGlyZWN0b3J5IHx8IHByb2Nlc3MuY3dkKCk7XG4gICAgY29uc3Qgb3V0cHV0SGFuZGxlID0gYXdhaXQgZnMucHJvbWlzZXMub3BlbihvdXRwdXQsIFwid1wiKTtcbiAgICBjb25zdCBmaWxlRW50cmllcyA9IGF3YWl0IGdldEZpbGVTdGF0cyhbIGlucHV0IF0uZmxhdCgpLCBjdXJyZW50RGlyZWN0b3J5KTtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICBhc3luYyBuZXh0RW50cnkoKSB7XG4gICAgICAgIGxldCBzaXplOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBmZW50cnkgPSBmaWxlRW50cmllcy5zaGlmdCgpO1xuICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgaWYgKCFmZW50cnkpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIGlmIChmZW50cnkuc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgc2l6ZSA9IGZlbnRyeS5zdGF0LnNpemU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKCFmZW50cnkuc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICB2ZXJib3NlICYmIGNvbnNvbGUud2FybihmZW50cnkubmFtZSwgXCJza2lwcGVkXCIpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZlcmJvc2UgJiYgY29uc29sZS5sb2coZmVudHJ5Lm5hbWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpbGVIYW5kbGU6IGZzLnByb21pc2VzLkZpbGVIYW5kbGU7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwYXRobmFtZTogZmVudHJ5Lm5hbWUsXG4gICAgICAgICAgbW9kZTogZmVudHJ5LnN0YXQubW9kZSxcbiAgICAgICAgICBzaXplLFxuXG4gICAgICAgICAgYXN5bmMgcmVhZERhdGEoYnVmZmVyOiBBcnJheUJ1ZmZlciwgYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICAgICAgaWYgKCFzaXplKVxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIERhdGFgKTtcblxuICAgICAgICAgICAgaWYgKCFmaWxlSGFuZGxlKSB7XG4gICAgICAgICAgICAgIGZpbGVIYW5kbGUgPSBhd2FpdCBmcy5wcm9taXNlcy5vcGVuKGZlbnRyeS5maWxlcGF0aCwgXCJyXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgYnl0ZU9mZnNldCwgTWF0aC5taW4oYnl0ZUxlbmd0aCwgc2l6ZSkpO1xuICAgICAgICAgICAgY29uc3QgeyBieXRlc1JlYWQgfSA9IGF3YWl0IGZpbGVIYW5kbGUucmVhZChieXRlcyk7XG4gICAgICAgICAgICBzaXplIC09IGJ5dGVzUmVhZDtcblxuICAgICAgICAgICAgaWYgKCFzaXplKSB7XG4gICAgICAgICAgICAgIGF3YWl0IGZpbGVIYW5kbGUuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGJ5dGVzUmVhZDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgYXN5bmMgd3JpdGVEYXRhKGJ1ZmZlcjogQXJyYXlCdWZmZXIsIGJ5dGVPZmZzZXQ6IG51bWJlciwgYnl0ZUxlbmd0aDogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgY29uc3QgeyBieXRlc1dyaXR0ZW4gfSA9IGF3YWl0IG91dHB1dEhhbmRsZS53cml0ZShuZXcgVWludDhBcnJheShidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpKTtcbiAgICAgICAgcmV0dXJuIGJ5dGVzV3JpdHRlbjtcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBBcmNoaXZlT3BlcmF0aW9ucy5jb21wcmVzcyhhd2FpdCBnZXRBcmNoaXZlQ29udGV4dCgpLCBjYWxsYmFja3MsIG91dHB1dCk7XG4gICAgYXdhaXQgb3V0cHV0SGFuZGxlLmNsb3NlKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBsaWJhcmNoaXZlO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9