/******/ (() => { // webpackBootstrap
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
  !*** ./src/MainLibrary.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ArchiveImpl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ArchiveImpl */ "./src/ArchiveImpl.ts");
/* harmony import */ var _Archive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Archive */ "./src/Archive.ts");
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */



async function getArchiveContext(params) {
    if (!params)
        throw new Error("Not supported params as undefined");
    if (typeof params === "string") {
        const response = await fetch(params);
        params = Buffer.from(await response.arrayBuffer());
    }
    return _ArchiveImpl__WEBPACK_IMPORTED_MODULE_0__.Archive.instantiate(params);
}
const libarchive = Object.assign(getArchiveContext, {
    ARCHIVE_OK: _Archive__WEBPACK_IMPORTED_MODULE_1__.ARCHIVE_OK,
    ARCHIVE_RETRY: _Archive__WEBPACK_IMPORTED_MODULE_1__.ARCHIVE_RETRY,
    ARCHIVE_WARN: _Archive__WEBPACK_IMPORTED_MODULE_1__.ARCHIVE_WARN,
    ARCHIVE_FAILED: _Archive__WEBPACK_IMPORTED_MODULE_1__.ARCHIVE_FAILED,
    ARCHIVE_FATAL: _Archive__WEBPACK_IMPORTED_MODULE_1__.ARCHIVE_FATAL,
    AE_IFMT: _Archive__WEBPACK_IMPORTED_MODULE_1__.AE_IFMT,
    AE_IFREG: _Archive__WEBPACK_IMPORTED_MODULE_1__.AE_IFREG,
    AE_IFLNK: _Archive__WEBPACK_IMPORTED_MODULE_1__.AE_IFLNK,
    AE_IFSOCK: _Archive__WEBPACK_IMPORTED_MODULE_1__.AE_IFSOCK,
    AE_IFCHR: _Archive__WEBPACK_IMPORTED_MODULE_1__.AE_IFCHR,
    AE_IFBLK: _Archive__WEBPACK_IMPORTED_MODULE_1__.AE_IFBLK,
    AE_IFDIR: _Archive__WEBPACK_IMPORTED_MODULE_1__.AE_IFDIR,
    AE_IFIFO: _Archive__WEBPACK_IMPORTED_MODULE_1__.AE_IFIFO,
    async decompress(input, output, options) {
        //return ArchiveOperations.decompress(webFs, await newArchiveContext(), input, output, options);
    },
    async compress(input, output, options) {
        //return ArchiveOperations.compress(webFs, await newArchiveContext(), input, output, options);
    },
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (libarchive);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxVQUFVO0lBQ1YsYUFBYTtJQUNiLFlBQVk7SUFDWixjQUFjO0lBQ2QsYUFBYTtJQUViLE9BQU87SUFDUCxRQUFRO0lBQ1IsUUFBUTtJQUNSLFNBQVM7SUFDVCxRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBRVIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFzQixFQUFFLE1BQWUsRUFBRSxPQUEyQjtRQUNuRixnR0FBZ0c7SUFDbEcsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBd0IsRUFBRSxNQUFjLEVBQUUsT0FBeUI7UUFDaEYsOEZBQThGO0lBQ2hHLENBQUM7Q0FDRixDQUFDLENBQUM7QUFFSCxpRUFBZSxVQUFVLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmUudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlQmFzZS50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVCdWZmZXIudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVFbnRyeS50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVJbXBsLnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZVJlYWQudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlV3JpdGUudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9VdGlscy50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9NYWluTGlicmFyeS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBBUkNISVZFX09LID0gMDtcbmV4cG9ydCBjb25zdCBBUkNISVZFX1JFVFJZID0gLTEwO1xuZXhwb3J0IGNvbnN0IEFSQ0hJVkVfV0FSTiA9IC0yMDtcbmV4cG9ydCBjb25zdCBBUkNISVZFX0ZBSUxFRCA9IC0yNTtcbmV4cG9ydCBjb25zdCBBUkNISVZFX0ZBVEFMID0gLTMwO1xuXG5leHBvcnQgY29uc3QgQUVfSUZNVCAgID0gMHhmMDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGUkVHICA9IDB4ODAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRkxOSyAgPSAweGEwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZTT0NLID0gMHhjMDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGQ0hSICA9IDB4MjAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRkJMSyAgPSAweDYwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZESVIgID0gMHg0MDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGSUZPICA9IDB4MTAwMDtcblxuZXhwb3J0IHR5cGUgQXJjaGl2ZU9wZW5DYWxsYmFjayA9ICgpID0+IG51bWJlcjtcbmV4cG9ydCB0eXBlIEFyY2hpdmVSZWFkQ2FsbGJhY2sgPSAoKSA9PiBCdWZmZXIgfCB1bmRlZmluZWQ7XG5leHBvcnQgdHlwZSBBcmNoaXZlV3JpdGVDYWxsYmFjayA9IChidWZmZXI6IElBcmNoaXZlQnVmZmVyKSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgQXJjaGl2ZUNsb3NlQ2FsbGJhY2sgPSAoKSA9PiBudW1iZXI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmVCdWZmZXIge1xuICByZWxlYXNlKCk6IHZvaWQ7XG5cbiAgZ2V0IGJ1ZmZlcigpOiBBcnJheUJ1ZmZlcjtcbiAgZ2V0IGJ5dGVPZmZzZXQoKTogbnVtYmVyO1xuICBnZXQgYnl0ZUxlbmd0aCgpOiBudW1iZXI7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcmNoaXZlRW50cnkge1xuICByZWxlYXNlKCk6IHZvaWQ7XG5cbiAgZ2V0IHBhdGhuYW1lKCk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgc2V0IHBhdGhuYW1lKHZhbHVlOiBzdHJpbmcpO1xuXG4gIGdldCBzaXplKCk6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgc2V0IHNpemUodmFsdWU6IG51bWJlcik7XG5cbiAgZ2V0IG1vZGUoKTogbnVtYmVyO1xuICBzZXQgbW9kZShtb2RlOiBudW1iZXIpO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZVJlYWQge1xuICByZWxlYXNlKCk6IHZvaWQ7XG5cbiAgZ2V0IGVycm5vKCk6IG51bWJlcjtcbiAgZ2V0IGVycm9yU3RyaW5nKCk6IHN0cmluZztcblxuICBzdXBwb3J0RmlsdGVyQWxsKCk6IHZvaWQ7XG4gIHN1cHBvcnRGb3JtYXRBbGwoKTogdm9pZDtcblxuICBhZGRQYXNzcGhyYXNlKHBhc3NwaHJhc2U6IHN0cmluZyk6IHZvaWQ7XG5cbiAgc2V0IG9ub3BlbihjYWxsYmFjazogQXJjaGl2ZU9wZW5DYWxsYmFjayk7XG4gIHNldCBvbnJlYWQoY2FsbGJhY2s6IEFyY2hpdmVSZWFkQ2FsbGJhY2spO1xuICBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spO1xuXG4gIG9wZW4oKTogdm9pZDtcbiAgY2xvc2UoKTogdm9pZDtcbiAgbmV4dEhlYWRlcigpOiBJQXJjaGl2ZUVudHJ5IHwgdW5kZWZpbmVkO1xuICBkYXRhUmVhZChidWZmZXI6IElBcmNoaXZlQnVmZmVyLCBvZmZzZXQ/OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IG51bWJlcjtcbiAgZGF0YVNraXAoKTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZVdyaXRlIHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIGdldCBlcnJubygpOiBudW1iZXI7XG4gIGdldCBlcnJvclN0cmluZygpOiBzdHJpbmc7XG5cbiAgc2V0IGZvcm1hdCh2YWx1ZTogc3RyaW5nKTtcbiAgc2V0IG9wdGlvbnMob3B0aW9uczogc3RyaW5nKTtcbiAgc2V0IHBhc3NwaHJhc2UocGFzc3BocmFzZTogc3RyaW5nKTtcbiAgYWRkRmlsdGVyKGZpbHRlcjogc3RyaW5nKTogdm9pZDtcbiAgc2V0Rm9ybWF0RmlsdGVyQnlFeHQoZmlsZW5hbWU6IHN0cmluZyk6IHZvaWQ7XG5cbiAgc2V0IG9ub3BlbihjYWxsYmFjazogQXJjaGl2ZU9wZW5DYWxsYmFjayk7XG4gIHNldCBvbndyaXRlKGNhbGxiYWNrOiBBcmNoaXZlV3JpdGVDYWxsYmFjayk7XG4gIHNldCBvbmNsb3NlKGNhbGxiYWNrOiBBcmNoaXZlQ2xvc2VDYWxsYmFjayk7XG5cbiAgb3BlbigpOiB2b2lkO1xuICBjbG9zZSgpOiB2b2lkO1xuICB3cml0ZUhlYWRlcihlbnRyeTogSUFyY2hpdmVFbnRyeSk6IG51bWJlcjtcbiAgd3JpdGVEYXRhKGJ1ZmZlcjogSUFyY2hpdmVCdWZmZXIsIG9mZnNldD86IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZSB7XG4gIG5ld1JlYWQoKTogSUFyY2hpdmVSZWFkO1xuICBuZXdXcml0ZSgpOiBJQXJjaGl2ZVdyaXRlO1xuICBuZXdFbnRyeSgpOiBJQXJjaGl2ZUVudHJ5O1xuICBuZXdCdWZmZXIobGVuZ3RoOiBudW1iZXIpOiBJQXJjaGl2ZUJ1ZmZlcjtcbn07XG5cbmV4cG9ydCB0eXBlIERlY29tcHJlc3NPcHRpb25zID0ge1xuICB2ZXJib3NlPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIENvbXByZXNzT3B0aW9ucyA9IHtcbiAgdmVyYm9zZT86IGJvb2xlYW47XG4gIGRpcmVjdG9yeT86IHN0cmluZztcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50cnlJbmZvIHtcbiAgcGF0aG5hbWU6IHN0cmluZztcbiAgbW9kZTogbnVtYmVyO1xuICBzaXplPzogbnVtYmVyO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZUV4cG9ydCB7XG4gIChwYXJhbXM/OiBzdHJpbmcgfCBCdWZmZXIpOiBQcm9taXNlPElBcmNoaXZlPjtcblxuICByZWFkb25seSBBUkNISVZFX09LOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFSQ0hJVkVfUkVUUlk6IG51bWJlcjtcbiAgcmVhZG9ubHkgQVJDSElWRV9XQVJOOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFSQ0hJVkVfRkFJTEVEOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFSQ0hJVkVfRkFUQUw6IG51bWJlcjtcblxuICByZWFkb25seSBBRV9JRk1UOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFFX0lGUkVHOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFFX0lGTE5LOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFFX0lGU09DSzogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRkNIUjogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRkJMSzogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRkRJUjogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRklGTzogbnVtYmVyO1xuXG4gIGRlY29tcHJlc3MoaW5wdXQ6IHN0cmluZyB8IEJ1ZmZlciwgb3V0cHV0Pzogc3RyaW5nLCBvcHRpb25zPzogRGVjb21wcmVzc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuICBjb21wcmVzcyhpbnB1dDogc3RyaW5nIHwgc3RyaW5nW10sIG91dHB1dDogc3RyaW5nLCBvcHRpb25zPzogQ29tcHJlc3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcbmltcG9ydCB7IFN0cmluZ0V4dHJhcyB9IGZyb20gXCIuL1V0aWxzXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBcmNoaXZlQmFzZSB7XG4gIHByb3RlY3RlZCBfY29udGV4dDogQXJjaGl2ZUNvbnRleHQ7XG4gIHByb3RlY3RlZCBfYXJjaGl2ZTogbnVtYmVyO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5fYXJjaGl2ZSA9IGFyY2hpdmU7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIHB1YmxpYyBnZXQgbWVtb3J5T2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9hcmNoaXZlO1xuICB9XG5cbiAgcHVibGljIGdldCBlcnJubygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZXJybm8odGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVycm9yU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2Vycm9yX3N0cmluZyh0aGlzLl9hcmNoaXZlKTtcbiAgICByZXR1cm4gU3RyaW5nRXh0cmFzLmZyb21CdWZmZXIodGhpcy5fY29udGV4dC5tZW1vcnlCdWZmZXIsIG9mZnNldCk7XG4gIH1cblxuICAvLyBoYW5kbGVFdmVudFxuICAvLyBhZGRFdmVudExpc3RuZXJcbiAgLy8gcmVtb3ZlRXZlbnRMaXN0ZW5lclxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSUFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5cbmV4cG9ydCBjbGFzcyBBcmNoaXZlQnVmZmVyIGltcGxlbWVudHMgSUFyY2hpdmVCdWZmZXIge1xuICBwcml2YXRlIF9jb250ZXh0OiBBcmNoaXZlQ29udGV4dDtcbiAgcHJpdmF0ZSBfYnl0ZU9mZnNldDogbnVtYmVyO1xuICBwcml2YXRlIF9ieXRlTGVuZ3RoOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEFyY2hpdmVDb250ZXh0LCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuX2J5dGVPZmZzZXQgPSBieXRlT2Zmc2V0O1xuICAgIHRoaXMuX2J5dGVMZW5ndGggPSBieXRlTGVuZ3RoO1xuICB9XG5cbiAgcHVibGljIHJlbGVhc2UoKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcmVlKHRoaXMuX2J5dGVPZmZzZXQpO1xuICB9XG5cbiAgZ2V0IGJ1ZmZlcigpOiBBcnJheUJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQubWVtb3J5QnVmZmVyO1xuICB9XG5cbiAgZ2V0IGJ5dGVPZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYnl0ZU9mZnNldDtcbiAgfVxuXG4gIGdldCBieXRlTGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2J5dGVMZW5ndGg7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFyY2hpdmVPcGVuQ2FsbGJhY2ssIEFyY2hpdmVSZWFkQ2FsbGJhY2ssIEFyY2hpdmVXcml0ZUNhbGxiYWNrLCBBcmNoaXZlQ2xvc2VDYWxsYmFjaywgQVJDSElWRV9PSyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVOYXRpdmUsIEFyY2hpdmVQdHIsIEFyY2hpdmVFbnRyeVB0ciB9IGZyb20gXCIuL0FyY2hpdmVOYXRpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlQnVmZmVyXCI7XG5cbnR5cGUgQXJjaGl2ZVJlYWRDYWxiYWNrcyA9IHtcbiAgb3BlbmVyPzogQXJjaGl2ZU9wZW5DYWxsYmFjayxcbiAgcmVhZGVyPzogQXJjaGl2ZVJlYWRDYWxsYmFjayxcbiAgY2xvc2VyPzogQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssXG59O1xuXG50eXBlIEFyY2hpdmVXcml0ZUNhbGJhY2tzID0ge1xuICBvcGVuZXI/OiBBcmNoaXZlT3BlbkNhbGxiYWNrLFxuICB3cml0ZXI/OiBBcmNoaXZlV3JpdGVDYWxsYmFjayxcbiAgY2xvc2VyPzogQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssXG59O1xuXG5jbGFzcyBBcmNoaXZlQ2FsbGJhY2tzIHtcbiAgcHJpdmF0ZSBfbWFwID0gbmV3IE1hcDxudW1iZXIsIEFyY2hpdmVSZWFkQ2FsYmFja3MgfCBBcmNoaXZlV3JpdGVDYWxiYWNrcz47XG5cbiAgcHVibGljIGdldChhcmNoaXZlOiBudW1iZXIpOiBBcmNoaXZlUmVhZENhbGJhY2tzIHwgQXJjaGl2ZVdyaXRlQ2FsYmFja3Mge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX21hcC5nZXQoYXJjaGl2ZSk7XG4gICAgaWYgKCFjYWxsYmFja3MpXG4gICAgICB0aHJvdyBFcnJvcihgSGFuZGxlICR7YXJjaGl2ZX0gZG9lcyBub3QgZXhpc3RzYCk7XG4gICAgcmV0dXJuIGNhbGxiYWNrcztcbiAgfVxuXG4gIHB1YmxpYyBzZXQoYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFja3M6IEFyY2hpdmVSZWFkQ2FsYmFja3MgfCBBcmNoaXZlV3JpdGVDYWxiYWNrcykge1xuICAgIGlmICghYXJjaGl2ZSlcbiAgICAgIHRocm93IEVycm9yKGBIYW5kbGUgaXMgbnVsbGApO1xuICAgIGlmICh0aGlzLl9tYXAuaGFzKGFyY2hpdmUpKVxuICAgICAgdGhyb3cgRXJyb3IoYEhhbmRsZSAke2FyY2hpdmV9IGlzIHJlZ2lzdHJlZGApO1xuICAgIHRoaXMuX21hcC5zZXQoYXJjaGl2ZSwgY2FsbGJhY2tzKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGUoYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWFwLmRlbGV0ZShhcmNoaXZlKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIEFyY2hpdmVDb250ZXh0IHtcbiAgcHJpdmF0ZSBfbmF0aXZlOiBBcmNoaXZlTmF0aXZlO1xuICBwcml2YXRlIF9tZW1vcnk6IFdlYkFzc2VtYmx5Lk1lbW9yeTtcbiAgcHJpdmF0ZSBfY2FsbGJhY2tzID0gbmV3IEFyY2hpdmVDYWxsYmFja3M7XG4gIHByaXZhdGUgX3JlYWRCdWZmZXIgPSBuZXcgVWludDhBcnJheTtcblxuICBjb25zdHJ1Y3RvcihuYXRpdmU6IEFyY2hpdmVOYXRpdmUsIG1lbW9yeTogV2ViQXNzZW1ibHkuTWVtb3J5KSB7XG4gICAgdGhpcy5fbmF0aXZlID0gbmF0aXZlO1xuICAgIHRoaXMuX21lbW9yeSA9IG1lbW9yeTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWVtb3J5QnVmZmVyKCk6IEFycmF5QnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWVtb3J5LmJ1ZmZlcjtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3ZlcnNpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfdmVyc2lvbigpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfdmVyc2lvbl9kZXRhaWxzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3ZlcnNpb25fZGV0YWlscygpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZXJybm8oYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZXJybm8oYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lcnJvcl9zdHJpbmcoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZXJyb3Jfc3RyaW5nKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfb3Blbl9oYW5kbGVyKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgY2xpZW50ID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKTtcbiAgICByZXR1cm4gY2xpZW50Lm9wZW5lciA/IGNsaWVudC5vcGVuZXIoKSA6IDA7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2hhbmRsZXIoYXJjaGl2ZTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgc2l6ZTogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLl9yZWFkQnVmZmVyLmxlbmd0aCkge1xuICAgICAgY29uc3QgY2xpZW50ID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlUmVhZENhbGJhY2tzO1xuICAgICAgaWYgKCFjbGllbnQucmVhZGVyKVxuICAgICAgICByZXR1cm4gMDtcbiAgICAgIGNvbnN0IGJ1ZiA9IGNsaWVudC5yZWFkZXIoKTtcbiAgICAgIGlmICghYnVmKVxuICAgICAgICByZXR1cm4gMDtcbiAgICAgIHRoaXMuX3JlYWRCdWZmZXIgPSBuZXcgVWludDhBcnJheShidWYpO1xuICAgIH1cblxuICAgIGNvbnN0IG4gPSBNYXRoLm1pbihzaXplLCB0aGlzLl9yZWFkQnVmZmVyLmxlbmd0aCk7XG4gICAgY29uc3QgZHN0ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fbWVtb3J5LmJ1ZmZlciwgb2Zmc2V0LCBuKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKylcbiAgICAgIGRzdFtpXSA9IHRoaXMuX3JlYWRCdWZmZXJbaV07XG5cbiAgICB0aGlzLl9yZWFkQnVmZmVyID0gdGhpcy5fcmVhZEJ1ZmZlci5zbGljZShuKTtcbiAgICByZXR1cm4gbjtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfbGFzdF9lcnJvcihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX2xhc3RfZXJyb3IoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9oYW5kbGVyKGFyY2hpdmU6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlV3JpdGVDYWxiYWNrcztcbiAgICBpZiAoY2FsbGJhY2tzLndyaXRlcilcbiAgICAgIGNhbGxiYWNrcy53cml0ZXIobmV3IEFyY2hpdmVCdWZmZXIodGhpcywgb2Zmc2V0LCBzaXplKSlcbiAgICByZXR1cm4gc2l6ZTtcbiAgfTtcblxuICBwdWJsaWMgYXJjaGl2ZV9jbG9zZV9oYW5kbGVyKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgY2xpZW50ID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKTtcbiAgICByZXR1cm4gY2xpZW50LmNsb3NlciA/IGNsaWVudC5jbG9zZXIoKSA6IDA7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX25ldygpOiBBcmNoaXZlUHRyIHtcbiAgICBjb25zdCBhcmNoaXZlID0gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9uZXcoKTtcbiAgICBpZiAoYXJjaGl2ZSkge1xuICAgICAgY29uc3QgaW1wbDogQXJjaGl2ZVJlYWRDYWxiYWNrcyA9IHt9O1xuICAgICAgdGhpcy5fY2FsbGJhY2tzLnNldChhcmNoaXZlLCBpbXBsKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyY2hpdmU7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2ZyZWUoYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzLmRlbGV0ZShhcmNoaXZlKTtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX2ZyZWUoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2FkZF9wYXNzcGhyYXNlKGFyY2hpdmU6IEFyY2hpdmVQdHIsIHBhc3NwaHJhc2U6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfYWRkX3Bhc3NwaHJhc2UoYXJjaGl2ZSwgcGFzc3BocmFzZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZmlsdGVyX2FsbChhcmNoaXZlOiBudW1iZXIpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9zdXBwb3J0X2ZpbHRlcl9hbGwoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZm9ybWF0X2FsbChhcmNoaXZlOiBudW1iZXIpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9zdXBwb3J0X2Zvcm1hdF9hbGwoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX29wZW4oYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9vcGVuKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9jbG9zZShhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX2Nsb3NlKGFyY2hpdmUpO1xuICB9XG4gIFxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX25leHRfaGVhZGVyKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfbmV4dF9oZWFkZXIoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2RhdGEoYXJjaGl2ZTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgc2l6ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9kYXRhKGFyY2hpdmUsIG9mZnNldCwgc2l6ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2RhdGFfc2tpcChhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX2RhdGFfc2tpcChhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfc2V0X29wZW5fY2FsbGJhY2soYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFjazogQXJjaGl2ZU9wZW5DYWxsYmFjayk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVJlYWRDYWxiYWNrcztcbiAgICBjYWxsYmFja3Mub3BlbmVyID0gY2FsbGJhY2s7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX3NldF9yZWFkX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVSZWFkQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVSZWFkQ2FsYmFja3M7XG4gICAgY2FsbGJhY2tzLnJlYWRlciA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9zZXRfY2xvc2VfY2FsbGJhY2soYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVSZWFkQ2FsYmFja3M7XG4gICAgY2FsbGJhY2tzLmNsb3NlciA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfbmV3KCk6IEFyY2hpdmVQdHIge1xuICAgIGNvbnN0IGFyY2hpdmUgPSB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9uZXcoKTtcbiAgICBpZiAoYXJjaGl2ZSkge1xuICAgICAgY29uc3QgaW1wbDogQXJjaGl2ZVdyaXRlQ2FsYmFja3MgPSB7fTtcbiAgICAgIHRoaXMuX2NhbGxiYWNrcy5zZXQoYXJjaGl2ZSwgaW1wbCk7XG4gICAgfVxuICAgIHJldHVybiBhcmNoaXZlO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfZnJlZShhcmNoaXZlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jYWxsYmFja3MuZGVsZXRlKGFyY2hpdmUpO1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX2ZyZWUoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfb3B0aW9ucyhhcmNoaXZlOiBudW1iZXIsIG9wdGlvbnM6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX3NldF9vcHRpb25zKGFyY2hpdmUsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X3Bhc3NwaHJhc2UoYXJjaGl2ZTogbnVtYmVyLCBwYXNzcGhyYXNlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9zZXRfcGFzc3BocmFzZShhcmNoaXZlLCBwYXNzcGhyYXNlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF9mb3JtYXRfYnlfbmFtZShhcmNoaXZlOiBudW1iZXIsIG5hbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX3NldF9mb3JtYXRfYnlfbmFtZShhcmNoaXZlLCBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX2FkZF9maWx0ZXJfYnlfbmFtZShhcmNoaXZlOiBudW1iZXIsIG5hbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX2FkZF9maWx0ZXJfYnlfbmFtZShhcmNoaXZlLCBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF9mb3JtYXRfZmlsdGVyX2J5X2V4dChhcmNoaXZlOiBudW1iZXIsIGZpbGVuYW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2ZpbHRlcl9ieV9leHQoYXJjaGl2ZSwgZmlsZW5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X29wZW5fY2FsbGJhY2soYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFjazogQXJjaGl2ZU9wZW5DYWxsYmFjayk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVdyaXRlQ2FsYmFja3M7XG4gICAgY2FsbGJhY2tzLm9wZW5lciA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X3dyaXRlX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVXcml0ZUNhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlV3JpdGVDYWxiYWNrcztcbiAgICBjYWxsYmFja3Mud3JpdGVyID0gY2FsbGJhY2s7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfY2xvc2VfY2FsbGJhY2soYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVXcml0ZUNhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy5jbG9zZXIgPSBjYWxsYmFjaztcbiAgfVxuICBcbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfb3BlbihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9vcGVuKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfY2xvc2UoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfY2xvc2UoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9oZWFkZXIoYXJjaGl2ZTogbnVtYmVyLCBlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfaGVhZGVyKGFyY2hpdmUsIGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX2RhdGEoYXJjaGl2ZTogQXJjaGl2ZVB0ciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX2RhdGEoYXJjaGl2ZSwgb2Zmc2V0LCBzaXplKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X25ldygpOiBBcmNoaXZlRW50cnlQdHIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9uZXcoKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X2ZyZWUoZW50cnk6IEFyY2hpdmVFbnRyeVB0cikge1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X2ZyZWUoZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfcGF0aG5hbWVfdXRmOChlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfcGF0aG5hbWVfdXRmOChlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9zZXRfcGF0aG5hbWVfdXRmOChlbnRyeTogQXJjaGl2ZUVudHJ5UHRyLCBwYXRobmFtZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfc2V0X3BhdGhuYW1lX3V0ZjgoZW50cnksIHBhdGhuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X3NpemUoZW50cnk6IEFyY2hpdmVFbnRyeVB0cik6IG51bWJlciB7XG4gICAgY29uc3QgbG8gPSB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zaXplX2xvKGVudHJ5KTtcbiAgICBjb25zdCBoaSA9IHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3NpemVfaGkoZW50cnkpO1xuICAgIHJldHVybiBoaSAqIDQyOTQ5NjcyOTYgKyBsbztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X3NldF9zaXplKGVudHJ5OiBBcmNoaXZlRW50cnlQdHIsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3NldF9zaXplKGVudHJ5LCAwLCBzaXplKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X3NpemVfaXNfc2V0KGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zaXplX2lzX3NldChlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9tb2RlKGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9tb2RlKGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X3NldF9tb2RlKGVudHJ5OiBBcmNoaXZlRW50cnlQdHIsIG1vZGU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3NldF9tb2RlKGVudHJ5LCBtb2RlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2J1ZmZlcl9uZXcoc2l6ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfYnVmZmVyX25ldyhzaXplKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2J1ZmZlcl9mcmVlKGJ1ZmZlcjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfYnVmZmVyX2ZyZWUoYnVmZmVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2J1ZmZlcl9mcm9tKHN0cjogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBlbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyO1xuICAgIGNvbnN0IGJ5dGVzID0gZW5jb2Rlci5lbmNvZGUoc3RyICsgXCJcXHgwMFwiKTtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9idWZmZXJfbmV3KGJ5dGVzLmxlbmd0aCk7XG4gICAgaWYgKG9mZnNldClcbiAgICAgIChuZXcgVWludDhBcnJheSh0aGlzLl9tZW1vcnkuYnVmZmVyLCBvZmZzZXQsIGJ5dGVzLmxlbmd0aCkpLnNldChieXRlcyk7XG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSUFyY2hpdmVFbnRyeSB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcbmltcG9ydCB7IEFyY2hpdmVFbnRyeVB0ciB9IGZyb20gXCIuL0FyY2hpdmVOYXRpdmVcIjtcbmltcG9ydCB7IE5PX01FTU9SWSwgU3RyaW5nRXh0cmFzIH0gZnJvbSBcIi4vVXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEFyY2hpdmVFbnRyeSBpbXBsZW1lbnRzIElBcmNoaXZlRW50cnkge1xuICBwcml2YXRlIF9jb250ZXh0OiBBcmNoaXZlQ29udGV4dDtcbiAgcHJpdmF0ZSBfZW50cnk6IEFyY2hpdmVFbnRyeVB0cjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29udGV4dDogQXJjaGl2ZUNvbnRleHQsIGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpIHtcbiAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLl9lbnRyeSA9IGVudHJ5O1xuICB9XG5cbiAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X2ZyZWUodGhpcy5fZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGdldCBtZW1vcnlPZmZzZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VudHJ5O1xuICB9XG5cbiAgcHVibGljIGdldCBwYXRobmFtZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHBhdGhuYW1lUHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3BhdGhuYW1lX3V0ZjgodGhpcy5fZW50cnkpO1xuICAgIGlmIChwYXRobmFtZVB0cikge1xuICAgICAgcmV0dXJuIFN0cmluZ0V4dHJhcy5mcm9tQnVmZmVyKHRoaXMuX2NvbnRleHQubWVtb3J5QnVmZmVyLCBwYXRobmFtZVB0cik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBwYXRobmFtZShwYXRobmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcGF0aG5hbWVQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ocGF0aG5hbWUpO1xuICAgIGlmICghcGF0aG5hbWVQdHIpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9zZXRfcGF0aG5hbWVfdXRmOCh0aGlzLl9lbnRyeSwgcGF0aG5hbWVQdHIpO1xuICB9XG5cbiAgcHVibGljIGdldCBzaXplKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9zaXplX2lzX3NldCh0aGlzLl9lbnRyeSkpXG4gICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3NpemUodGhpcy5fZW50cnkpO1xuICB9XG5cbiAgcHVibGljIHNldCBzaXplKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfc2V0X3NpemUodGhpcy5fZW50cnksIHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbW9kZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfbW9kZSh0aGlzLl9lbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgc2V0IG1vZGUobW9kZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3NldF9tb2RlKHRoaXMuX2VudHJ5LCBtb2RlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSUFyY2hpdmUgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlTmF0aXZlIH0gZnJvbSBcIi4vQXJjaGl2ZU5hdGl2ZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUNvbnRleHQgfSBmcm9tIFwiLi9BcmNoaXZlQ29udGV4dFwiO1xuaW1wb3J0IHsgQXJjaGl2ZUJ1ZmZlciB9IGZyb20gXCIuL0FyY2hpdmVCdWZmZXJcIjtcbmltcG9ydCB7IEFyY2hpdmVFbnRyeSB9IGZyb20gXCIuL0FyY2hpdmVFbnRyeVwiO1xuaW1wb3J0IHsgQXJjaGl2ZVJlYWQgfSBmcm9tIFwiLi9BcmNoaXZlUmVhZFwiO1xuaW1wb3J0IHsgQXJjaGl2ZVdyaXRlIH0gZnJvbSBcIi4vQXJjaGl2ZVdyaXRlXCI7XG5pbXBvcnQgeyBOT19NRU1PUlksIFN0cmluZ0V4dHJhcyB9IGZyb20gXCIuL1V0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBBcmNoaXZlIGltcGxlbWVudHMgSUFyY2hpdmUge1xuICBwcml2YXRlIF9jb250ZXh0OiBBcmNoaXZlQ29udGV4dDtcbiAgcHJpdmF0ZSBfdmVyc2lvbiA9IFwiXCI7XG4gIHByaXZhdGUgX3ZlcnNpb25EZXRhaWxzID0gXCJcIjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29udGV4dDogQXJjaGl2ZUNvbnRleHQpIHtcbiAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmVyc2lvbigpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5fdmVyc2lvbikge1xuICAgICAgY29uc3QgdmVyc2lvblB0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV92ZXJzaW9uKCk7XG4gICAgICB0aGlzLl92ZXJzaW9uID0gU3RyaW5nRXh0cmFzLmZyb21CdWZmZXIodGhpcy5fY29udGV4dC5tZW1vcnlCdWZmZXIsIHZlcnNpb25QdHIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdmVyc2lvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmVyc2lvbkRldGFpbHMoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuX3ZlcnNpb25EZXRhaWxzKSB7XG4gICAgICBjb25zdCB2ZXJzaW9uRGV0YWlsc1B0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV92ZXJzaW9uX2RldGFpbHMoKTtcbiAgICAgIHRoaXMuX3ZlcnNpb25EZXRhaWxzID0gU3RyaW5nRXh0cmFzLmZyb21CdWZmZXIodGhpcy5fY29udGV4dC5tZW1vcnlCdWZmZXIsIHZlcnNpb25EZXRhaWxzUHRyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3ZlcnNpb25EZXRhaWxzO1xuICB9XG5cbiAgcHVibGljIG5ld1JlYWQoKTogQXJjaGl2ZVJlYWQge1xuICAgIGNvbnN0IGFyY2hpdmVfcmVhZCA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX25ldygpO1xuICAgIGlmICghYXJjaGl2ZV9yZWFkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgcmV0dXJuIG5ldyBBcmNoaXZlUmVhZCh0aGlzLl9jb250ZXh0LCBhcmNoaXZlX3JlYWQpO1xuICB9XG5cbiAgcHVibGljIG5ld1dyaXRlKCk6IEFyY2hpdmVXcml0ZSB7XG4gICAgY29uc3QgYXJjaGl2ZV93cml0ZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9uZXcoKTtcbiAgICBpZiAoIWFyY2hpdmVfd3JpdGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICByZXR1cm4gbmV3IEFyY2hpdmVXcml0ZSh0aGlzLl9jb250ZXh0LCBhcmNoaXZlX3dyaXRlKTtcbiAgfVxuXG4gIHB1YmxpYyBuZXdFbnRyeSgpOiBBcmNoaXZlRW50cnkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X25ldygpO1xuICAgIGlmICghZW50cnkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICByZXR1cm4gbmV3IEFyY2hpdmVFbnRyeSh0aGlzLl9jb250ZXh0LCBlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgbmV3QnVmZmVyKGxlbmd0aDogbnVtYmVyKTogQXJjaGl2ZUJ1ZmZlciB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9uZXcobGVuZ3RoKTtcbiAgICBpZiAoIW9mZnNldClcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIHJldHVybiBuZXcgQXJjaGl2ZUJ1ZmZlcih0aGlzLl9jb250ZXh0LCBvZmZzZXQsIGxlbmd0aCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIGluc3RhbnRpYXRlKGJ1ZmZlcjogQnVmZmVyIHwgQXJyYXlCdWZmZXIpOiBQcm9taXNlPEFyY2hpdmU+IHtcbiAgICBsZXQgY29udGV4dDogQXJjaGl2ZUNvbnRleHQ7XG5cbiAgICBjb25zdCBpbXBvcnRPYmplY3QgPSB7XG4gICAgICBlbnY6IHtcbiAgICAgICAgYXJjaGl2ZV9vcGVuX2hhbmRsZXI6IChhcmNoaXZlOiBudW1iZXIpID0+IGNvbnRleHQuYXJjaGl2ZV9vcGVuX2hhbmRsZXIoYXJjaGl2ZSksXG4gICAgICAgIGFyY2hpdmVfcmVhZF9oYW5kbGVyOiAoYXJjaGl2ZTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgc2l6ZTogbnVtYmVyKSA9PiBjb250ZXh0LmFyY2hpdmVfcmVhZF9oYW5kbGVyKGFyY2hpdmUsIG9mZnNldCwgc2l6ZSksXG4gICAgICAgIGFyY2hpdmVfd3JpdGVfaGFuZGxlcjogKGFyY2hpdmU6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcikgPT4gY29udGV4dC5hcmNoaXZlX3dyaXRlX2hhbmRsZXIoYXJjaGl2ZSwgb2Zmc2V0LCBzaXplKSxcbiAgICAgICAgYXJjaGl2ZV9jbG9zZV9oYW5kbGVyOiAoYXJjaGl2ZTogbnVtYmVyKSA9PiBjb250ZXh0LmFyY2hpdmVfY2xvc2VfaGFuZGxlcihhcmNoaXZlKSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IGluc3RTb3VyY2UgPSBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShidWZmZXIsIGltcG9ydE9iamVjdCk7XG4gICAgY29uc3QgbmF0aXZlID0gaW5zdFNvdXJjZS5pbnN0YW5jZS5leHBvcnRzIGFzIEFyY2hpdmVOYXRpdmU7XG4gICAgY29udGV4dCA9IG5ldyBBcmNoaXZlQ29udGV4dChuYXRpdmUsIG5hdGl2ZS5tZW1vcnkpO1xuXG4gICAgcmV0dXJuIG5ldyBBcmNoaXZlKGNvbnRleHQpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBcmNoaXZlT3BlbkNhbGxiYWNrLCBBcmNoaXZlUmVhZENhbGxiYWNrLCBBcmNoaXZlQ2xvc2VDYWxsYmFjaywgSUFyY2hpdmVSZWFkLCBBUkNISVZFX09LIH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUNvbnRleHQgfSBmcm9tIFwiLi9BcmNoaXZlQ29udGV4dFwiO1xuaW1wb3J0IHsgQXJjaGl2ZUJhc2UgfSBmcm9tIFwiLi9BcmNoaXZlQmFzZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUVudHJ5IH0gZnJvbSBcIi4vQXJjaGl2ZUVudHJ5XCI7XG5pbXBvcnQgeyBBcmNoaXZlQnVmZmVyIH0gZnJvbSBcIi4vQXJjaGl2ZUJ1ZmZlclwiO1xuaW1wb3J0IHsgZXJyb3JDb2RlVG9TdHJpbmcsIE5PX01FTU9SWSB9IGZyb20gXCIuL1V0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBBcmNoaXZlUmVhZCBleHRlbmRzIEFyY2hpdmVCYXNlIGltcGxlbWVudHMgSUFyY2hpdmVSZWFkIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEFyY2hpdmVDb250ZXh0LCBhcmNoaXZlOiBudW1iZXIpIHtcbiAgICBzdXBlcihjb250ZXh0LCBhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyByZWxlYXNlKCkge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX2ZyZWUodGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgc3VwcG9ydEZpbHRlckFsbCgpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfc3VwcG9ydF9maWx0ZXJfYWxsKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHN1cHBvcnRGb3JtYXRBbGwoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZm9ybWF0X2FsbCh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQYXNzcGhyYXNlKHBhc3NwaHJhc2U6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHBhc3NwaHJhc2VQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ocGFzc3BocmFzZSk7XG4gICAgaWYgKCFwYXNzcGhyYXNlUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfYWRkX3Bhc3NwaHJhc2UodGhpcy5fYXJjaGl2ZSwgcGFzc3BocmFzZVB0cik7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcmVlKHBhc3NwaHJhc2VQdHIpO1xuICAgIGlmIChjb2RlICE9IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfb3Blbih0aGlzLl9hcmNoaXZlKTtcbiAgICBpZiAoY29kZSAhPT0gQVJDSElWRV9PSykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuZXJyb3JTdHJpbmcsIHsgY2F1c2U6IGVycm9yQ29kZVRvU3RyaW5nKGNvZGUpIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9jbG9zZSh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBuZXh0SGVhZGVyKCk6IEFyY2hpdmVFbnRyeSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9uZXh0X2hlYWRlcih0aGlzLl9hcmNoaXZlKTtcbiAgICBpZiAoZW50cnkpXG4gICAgICByZXR1cm4gbmV3IEFyY2hpdmVFbnRyeSh0aGlzLl9jb250ZXh0LCBlbnRyeSk7XG5cbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfbGFzdF9lcnJvcih0aGlzLl9hcmNoaXZlKTtcbiAgICBpZiAoY29kZSAhPT0gQVJDSElWRV9PSykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuZXJyb3JTdHJpbmcsIHsgY2F1c2U6IGVycm9yQ29kZVRvU3RyaW5nKGNvZGUpIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkYXRhUmVhZChidWZmZXI6IEFyY2hpdmVCdWZmZXIsIG9mZnNldD86IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBvZmZzZXQgPSBidWZmZXIuYnl0ZU9mZnNldCArIChvZmZzZXQgfHwgMCk7XG4gICAgbGVuZ3RoID0gbGVuZ3RoIHx8IGJ1ZmZlci5ieXRlTGVuZ3RoO1xuXG4gICAgY29uc3QgbiA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX2RhdGEodGhpcy5fYXJjaGl2ZSwgb2Zmc2V0LCBsZW5ndGgpO1xuICAgIGlmIChuIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuZXJyb3JTdHJpbmcsIHsgY2F1c2U6IGVycm9yQ29kZVRvU3RyaW5nKG4pIH0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbjtcbiAgfVxuXG4gIHB1YmxpYyBkYXRhU2tpcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9kYXRhX3NraXAodGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgc2V0IG9ub3BlbihjYWxsYmFjazogQXJjaGl2ZU9wZW5DYWxsYmFjaykge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3NldF9vcGVuX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25yZWFkKGNhbGxiYWNrOiBBcmNoaXZlUmVhZENhbGxiYWNrKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfc2V0X3JlYWRfY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIHNldCBvbmNsb3NlKGNhbGxiYWNrOiBBcmNoaXZlQ2xvc2VDYWxsYmFjaykge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3NldF9jbG9zZV9jYWxsYmFjayh0aGlzLl9hcmNoaXZlLCBjYWxsYmFjayk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElBcmNoaXZlV3JpdGUsIEFyY2hpdmVPcGVuQ2FsbGJhY2ssIEFyY2hpdmVXcml0ZUNhbGxiYWNrLCBBcmNoaXZlQ2xvc2VDYWxsYmFjaywgQVJDSElWRV9PSyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcbmltcG9ydCB7IEFyY2hpdmVCYXNlIH0gZnJvbSBcIi4vQXJjaGl2ZUJhc2VcIjtcbmltcG9ydCB7IEFyY2hpdmVFbnRyeSB9IGZyb20gXCIuL0FyY2hpdmVFbnRyeVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUJ1ZmZlciB9IGZyb20gXCIuL0FyY2hpdmVCdWZmZXJcIjtcbmltcG9ydCB7IE5PX01FTU9SWSwgZXJyb3JDb2RlVG9TdHJpbmcgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZVdyaXRlIGV4dGVuZHMgQXJjaGl2ZUJhc2UgaW1wbGVtZW50cyBJQXJjaGl2ZVdyaXRlIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEFyY2hpdmVDb250ZXh0LCBhcmNoaXZlOiBudW1iZXIpIHtcbiAgICBzdXBlcihjb250ZXh0LCBhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyByZWxlYXNlKCkge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9mcmVlKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHNldCBmb3JtYXQodmFsdWU6IHN0cmluZykge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20odmFsdWUpO1xuICAgIGlmICghbmFtZSkgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2J5X25hbWUodGhpcy5fYXJjaGl2ZSwgbmFtZSk7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcmVlKG5hbWUpO1xuICAgIGlmIChjb2RlICE9IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IG9wdGlvbnMob3B0aW9uczogc3RyaW5nKSB7XG4gICAgY29uc3Qgb3B0aW9uc1B0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJvbShvcHRpb25zKTtcbiAgICBpZiAoIW9wdGlvbnNQdHIpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X29wdGlvbnModGhpcy5fYXJjaGl2ZSwgb3B0aW9uc1B0cik7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcmVlKG9wdGlvbnNQdHIpO1xuICAgIGlmIChjb2RlICE9IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IHBhc3NwaHJhc2UocGFzc3BocmFzZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcGFzc3BocmFzZVB0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJvbShwYXNzcGhyYXNlKTtcbiAgICBpZiAoIXBhc3NwaHJhc2VQdHIpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X3Bhc3NwaHJhc2UodGhpcy5fYXJjaGl2ZSwgcGFzc3BocmFzZVB0cik7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcmVlKHBhc3NwaHJhc2VQdHIpO1xuICAgIGlmIChjb2RlICE9IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkRmlsdGVyKGZpbHRlcjogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJvbShmaWx0ZXIpO1xuICAgIGlmICghbmFtZSkgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9hZGRfZmlsdGVyX2J5X25hbWUodGhpcy5fYXJjaGl2ZSwgbmFtZSk7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcmVlKG5hbWUpO1xuICAgIGlmIChjb2RlICE9IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0Rm9ybWF0RmlsdGVyQnlFeHQoZmlsZW5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZuYW1lID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKGZpbGVuYW1lKTtcbiAgICBpZiAoIWZuYW1lKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9mb3JtYXRfZmlsdGVyX2J5X2V4dCh0aGlzLl9hcmNoaXZlLCBmbmFtZSk7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcmVlKGZuYW1lKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBvbm9wZW4oY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X29wZW5fY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIHNldCBvbndyaXRlKGNhbGxiYWNrOiBBcmNoaXZlV3JpdGVDYWxsYmFjaykge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9zZXRfd3JpdGVfY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIHNldCBvbmNsb3NlKGNhbGxiYWNrOiBBcmNoaXZlQ2xvc2VDYWxsYmFjaykge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9zZXRfb3Blbl9jYWxsYmFjayh0aGlzLl9hcmNoaXZlLCBjYWxsYmFjayk7XG4gIH1cblxuICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX29wZW4odGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGNvZGUgIT09IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX2Nsb3NlKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHdyaXRlSGVhZGVyKGVudHJ5OiBBcmNoaXZlRW50cnkpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfaGVhZGVyKHRoaXMuX2FyY2hpdmUsIGVudHJ5Lm1lbW9yeU9mZnNldCk7XG4gIH1cblxuICBwdWJsaWMgd3JpdGVEYXRhKGJ1ZmZlcjogQXJjaGl2ZUJ1ZmZlciwgb2Zmc2V0PzogbnVtYmVyLCBsZW5ndGg/OiBudW1iZXIpOiBudW1iZXIge1xuICAgIG9mZnNldCA9IGJ1ZmZlci5ieXRlT2Zmc2V0ICsgKG9mZnNldCB8fCAwKTtcbiAgICBsZW5ndGggPSBsZW5ndGggfHwgYnVmZmVyLmJ5dGVMZW5ndGggLSBvZmZzZXQ7XG5cbiAgICBjb25zdCBuID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX2RhdGEodGhpcy5fYXJjaGl2ZSwgb2Zmc2V0LCBsZW5ndGgpO1xuICAgIGlmIChuIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuZXJyb3JTdHJpbmcsIHsgY2F1c2U6IGVycm9yQ29kZVRvU3RyaW5nKG4pIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBuO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBUkNISVZFX09LLCBBUkNISVZFX1JFVFJZLCBBUkNISVZFX1dBUk4sIEFSQ0hJVkVfRkFJTEVELCBBUkNISVZFX0ZBVEFMIH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuXG5leHBvcnQgY29uc3QgTk9fTUVNT1JZID0gXCJObyBNZW1vcnlcIjtcblxuZXhwb3J0IG5hbWVzcGFjZSBTdHJpbmdFeHRyYXMgeyBcbmV4cG9ydCBmdW5jdGlvbiBmcm9tQnVmZmVyKGJ1ZmZlcjogQXJyYXlCdWZmZXIsIG9mZnNldDogbnVtYmVyLCBsZW5ndGg/OiBudW1iZXIpOiBzdHJpbmdcbntcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMDtcbiAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgb2Zmc2V0KTtcbiAgICB3aGlsZSAoYnl0ZXNbbGVuZ3RoXSlcbiAgICAgIGxlbmd0aCsrO1xuICB9XG5cbiAgcmV0dXJuIChuZXcgVGV4dERlY29kZXIoXCJ1dGYtOFwiKSkuZGVjb2RlKG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgpKTtcbn1cbn0gLy8gbmFtZXNwYWNlIFN0cmluZ0V4dHJhc1xuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JDb2RlVG9TdHJpbmcoY29kZTogbnVtYmVyKTogc3RyaW5nXG57XG4gIHN3aXRjaCAoY29kZSkge1xuICBjYXNlIEFSQ0hJVkVfT0s6XG4gICAgcmV0dXJuIFwiQVJDSElWRV9PS1wiO1xuICBjYXNlIEFSQ0hJVkVfUkVUUlk6XG4gICAgcmV0dXJuIFwiQVJDSElWRV9SRVRSWVwiO1xuICBjYXNlIEFSQ0hJVkVfV0FSTjpcbiAgICByZXR1cm4gXCJBUkNISVZFX1dBUk5cIjtcbiAgY2FzZSBBUkNISVZFX0ZBSUxFRDpcbiAgICByZXR1cm4gXCJBUkNISVZFX0ZBSUxFRFwiO1xuICBjYXNlIEFSQ0hJVkVfRkFUQUw6XG4gICAgcmV0dXJuIFwiQVJDSElWRV9GQVRBTFwiO1xuICB9XG5cbiAgaWYgKGNvZGUgPCAwKVxuICAgIHJldHVybiBcIkFSQ0hJVkVfXCIgKyAoLWNvZGUpO1xuXG4gIHRocm93IG5ldyBFcnJvcihgRXJyb3IgY29kZSAke2NvZGV9IG11c3QgYmUgbmVnYXRpdmVgKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJQXJjaGl2ZSwgSUFyY2hpdmVFeHBvcnQsIERlY29tcHJlc3NPcHRpb25zLCBDb21wcmVzc09wdGlvbnMgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlIH0gZnJvbSBcIi4vQXJjaGl2ZUltcGxcIjtcbmltcG9ydCB7IEFSQ0hJVkVfT0ssIEFSQ0hJVkVfUkVUUlksIEFSQ0hJVkVfV0FSTiwgQVJDSElWRV9GQUlMRUQsIEFSQ0hJVkVfRkFUQUwgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBRV9JRk1ULCBBRV9JRlJFRywgQUVfSUZMTkssIEFFX0lGU09DSywgQUVfSUZDSFIsIEFFX0lGQkxLLCBBRV9JRkRJUiwgQUVfSUZJRk8gfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFyY2hpdmVDb250ZXh0KHBhcmFtcz86IHN0cmluZyB8IEJ1ZmZlcik6IFByb21pc2U8SUFyY2hpdmU+IHtcbiAgaWYgKCFwYXJhbXMpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IHN1cHBvcnRlZCBwYXJhbXMgYXMgdW5kZWZpbmVkXCIpO1xuXG4gIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHBhcmFtcyk7XG4gICAgICBwYXJhbXMgPSBCdWZmZXIuZnJvbShhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpKTtcbiAgfVxuXG4gIHJldHVybiBBcmNoaXZlLmluc3RhbnRpYXRlKHBhcmFtcyk7XG59XG5cbmNvbnN0IGxpYmFyY2hpdmU6IElBcmNoaXZlRXhwb3J0ID0gT2JqZWN0LmFzc2lnbihnZXRBcmNoaXZlQ29udGV4dCwge1xuICBBUkNISVZFX09LLFxuICBBUkNISVZFX1JFVFJZLFxuICBBUkNISVZFX1dBUk4sXG4gIEFSQ0hJVkVfRkFJTEVELFxuICBBUkNISVZFX0ZBVEFMLFxuXG4gIEFFX0lGTVQsXG4gIEFFX0lGUkVHLFxuICBBRV9JRkxOSyxcbiAgQUVfSUZTT0NLLFxuICBBRV9JRkNIUixcbiAgQUVfSUZCTEssXG4gIEFFX0lGRElSLFxuICBBRV9JRklGTyxcblxuICBhc3luYyBkZWNvbXByZXNzKGlucHV0OiBzdHJpbmcgfCBCdWZmZXIsIG91dHB1dD86IHN0cmluZywgb3B0aW9ucz86IERlY29tcHJlc3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy9yZXR1cm4gQXJjaGl2ZU9wZXJhdGlvbnMuZGVjb21wcmVzcyh3ZWJGcywgYXdhaXQgbmV3QXJjaGl2ZUNvbnRleHQoKSwgaW5wdXQsIG91dHB1dCwgb3B0aW9ucyk7XG4gIH0sXG5cbiAgYXN5bmMgY29tcHJlc3MoaW5wdXQ6IHN0cmluZyB8IHN0cmluZ1tdLCBvdXRwdXQ6IHN0cmluZywgb3B0aW9ucz86IENvbXByZXNzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vcmV0dXJuIEFyY2hpdmVPcGVyYXRpb25zLmNvbXByZXNzKHdlYkZzLCBhd2FpdCBuZXdBcmNoaXZlQ29udGV4dCgpLCBpbnB1dCwgb3V0cHV0LCBvcHRpb25zKTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBsaWJhcmNoaXZlO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9