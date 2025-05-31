(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["libarchive"] = factory();
	else
		root["libarchive"] = factory();
})(self, () => {
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



async function fetchBuffer(str) {
    const response = await fetch(str);
    return response.arrayBuffer();
}
async function newArchiveContext(params) {
    if (typeof params === "string")
        params = await fetchBuffer(params);
    return _ArchiveImpl__WEBPACK_IMPORTED_MODULE_0__.Archive.instantiate(params);
}
let g_archive;
async function getArchiveContext(params) {
    if (params !== undefined) {
        return newArchiveContext(params);
    }
    if (!g_archive) {
        g_archive = await newArchiveContext("libarchive.wasm");
    }
    return g_archive;
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
        console.log("IArchiveExport.decompress");
        const context = await getArchiveContext(options?.moduleUrl);
        //return ArchiveOperations.decompress(webFs, await newArchiveContext(), input, output, options);
    },
    async compress(input, output, options) {
        console.log("IArchiveExport.compress");
        const context = await getArchiveContext(options?.moduleUrl);
        //return ArchiveOperations.compress(webFs, await newArchiveContext(), input, output, options);
    },
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (libarchive);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFSCxpRUFBZSxVQUFVLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmUudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlQmFzZS50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVCdWZmZXIudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVFbnRyeS50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVJbXBsLnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZVJlYWQudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlV3JpdGUudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9VdGlscy50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9NYWluTGlicmFyeS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJsaWJhcmNoaXZlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImxpYmFyY2hpdmVcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgQVJDSElWRV9PSyA9IDA7XG5leHBvcnQgY29uc3QgQVJDSElWRV9SRVRSWSA9IC0xMDtcbmV4cG9ydCBjb25zdCBBUkNISVZFX1dBUk4gPSAtMjA7XG5leHBvcnQgY29uc3QgQVJDSElWRV9GQUlMRUQgPSAtMjU7XG5leHBvcnQgY29uc3QgQVJDSElWRV9GQVRBTCA9IC0zMDtcblxuZXhwb3J0IGNvbnN0IEFFX0lGTVQgICA9IDB4ZjAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRlJFRyAgPSAweDgwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZMTksgID0gMHhhMDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGU09DSyA9IDB4YzAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRkNIUiAgPSAweDIwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZCTEsgID0gMHg2MDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGRElSICA9IDB4NDAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRklGTyAgPSAweDEwMDA7XG5cbmV4cG9ydCB0eXBlIEFyY2hpdmVPcGVuQ2FsbGJhY2sgPSAoKSA9PiBudW1iZXI7XG5leHBvcnQgdHlwZSBBcmNoaXZlUmVhZENhbGxiYWNrID0gKCkgPT4gQnVmZmVyIHwgdW5kZWZpbmVkO1xuZXhwb3J0IHR5cGUgQXJjaGl2ZVdyaXRlQ2FsbGJhY2sgPSAoYnVmZmVyOiBJQXJjaGl2ZUJ1ZmZlcikgPT4gdm9pZDtcbmV4cG9ydCB0eXBlIEFyY2hpdmVDbG9zZUNhbGxiYWNrID0gKCkgPT4gbnVtYmVyO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcmNoaXZlQnVmZmVyIHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIGdldCBidWZmZXIoKTogQXJyYXlCdWZmZXI7XG4gIGdldCBieXRlT2Zmc2V0KCk6IG51bWJlcjtcbiAgZ2V0IGJ5dGVMZW5ndGgoKTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZUVudHJ5IHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIGdldCBwYXRobmFtZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHNldCBwYXRobmFtZSh2YWx1ZTogc3RyaW5nKTtcblxuICBnZXQgc2l6ZSgpOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHNldCBzaXplKHZhbHVlOiBudW1iZXIpO1xuXG4gIGdldCBtb2RlKCk6IG51bWJlcjtcbiAgc2V0IG1vZGUobW9kZTogbnVtYmVyKTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmVSZWFkIHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIGdldCBlcnJubygpOiBudW1iZXI7XG4gIGdldCBlcnJvclN0cmluZygpOiBzdHJpbmc7XG5cbiAgc3VwcG9ydEZpbHRlckFsbCgpOiB2b2lkO1xuICBzdXBwb3J0Rm9ybWF0QWxsKCk6IHZvaWQ7XG5cbiAgYWRkUGFzc3BocmFzZShwYXNzcGhyYXNlOiBzdHJpbmcpOiB2b2lkO1xuXG4gIHNldCBvbm9wZW4oY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spO1xuICBzZXQgb25yZWFkKGNhbGxiYWNrOiBBcmNoaXZlUmVhZENhbGxiYWNrKTtcbiAgc2V0IG9uY2xvc2UoY2FsbGJhY2s6IEFyY2hpdmVDbG9zZUNhbGxiYWNrKTtcblxuICBvcGVuKCk6IHZvaWQ7XG4gIGNsb3NlKCk6IHZvaWQ7XG4gIG5leHRIZWFkZXIoKTogSUFyY2hpdmVFbnRyeSB8IHVuZGVmaW5lZDtcbiAgZGF0YVJlYWQoYnVmZmVyOiBJQXJjaGl2ZUJ1ZmZlciwgb2Zmc2V0PzogbnVtYmVyLCBsZW5ndGg/OiBudW1iZXIpOiBudW1iZXI7XG4gIGRhdGFTa2lwKCk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmVXcml0ZSB7XG4gIHJlbGVhc2UoKTogdm9pZDtcblxuICBnZXQgZXJybm8oKTogbnVtYmVyO1xuICBnZXQgZXJyb3JTdHJpbmcoKTogc3RyaW5nO1xuXG4gIHNldCBmb3JtYXQodmFsdWU6IHN0cmluZyk7XG4gIHNldCBvcHRpb25zKG9wdGlvbnM6IHN0cmluZyk7XG4gIHNldCBwYXNzcGhyYXNlKHBhc3NwaHJhc2U6IHN0cmluZyk7XG4gIGFkZEZpbHRlcihmaWx0ZXI6IHN0cmluZyk6IHZvaWQ7XG4gIHNldEZvcm1hdEZpbHRlckJ5RXh0KGZpbGVuYW1lOiBzdHJpbmcpOiB2b2lkO1xuXG4gIHNldCBvbm9wZW4oY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spO1xuICBzZXQgb253cml0ZShjYWxsYmFjazogQXJjaGl2ZVdyaXRlQ2FsbGJhY2spO1xuICBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spO1xuXG4gIG9wZW4oKTogdm9pZDtcbiAgY2xvc2UoKTogdm9pZDtcbiAgd3JpdGVIZWFkZXIoZW50cnk6IElBcmNoaXZlRW50cnkpOiBudW1iZXI7XG4gIHdyaXRlRGF0YShidWZmZXI6IElBcmNoaXZlQnVmZmVyLCBvZmZzZXQ/OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmUge1xuICBnZXQgdmVyc2lvbigpOiBzdHJpbmc7XG4gIGdldCB2ZXJzaW9uRGV0YWlscygpOiBzdHJpbmc7XG5cbiAgc2V0bG9jYWxlKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBuZXdSZWFkKCk6IElBcmNoaXZlUmVhZDtcbiAgbmV3V3JpdGUoKTogSUFyY2hpdmVXcml0ZTtcbiAgbmV3RW50cnkoKTogSUFyY2hpdmVFbnRyeTtcbiAgbmV3QnVmZmVyKGxlbmd0aDogbnVtYmVyKTogSUFyY2hpdmVCdWZmZXI7XG59O1xuXG5leHBvcnQgdHlwZSBEZWNvbXByZXNzT3B0aW9ucyA9IHtcbiAgdmVyYm9zZT86IGJvb2xlYW47XG4gIG1vZHVsZVVybD86IHN0cmluZztcbiAgbG9jYWxlPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgQ29tcHJlc3NPcHRpb25zID0ge1xuICB2ZXJib3NlPzogYm9vbGVhbjtcbiAgbW9kdWxlVXJsPzogc3RyaW5nO1xuICBsb2NhbGU/OiBzdHJpbmc7XG4gIGRpcmVjdG9yeT86IHN0cmluZztcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50cnlJbmZvIHtcbiAgcGF0aG5hbWU6IHN0cmluZztcbiAgbW9kZTogbnVtYmVyO1xuICBzaXplPzogbnVtYmVyO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZUV4cG9ydCB7XG4gIChwYXJhbXM/OiBzdHJpbmcgfCBCdWZmZXIpOiBQcm9taXNlPElBcmNoaXZlPjtcblxuICByZWFkb25seSBBUkNISVZFX09LOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFSQ0hJVkVfUkVUUlk6IG51bWJlcjtcbiAgcmVhZG9ubHkgQVJDSElWRV9XQVJOOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFSQ0hJVkVfRkFJTEVEOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFSQ0hJVkVfRkFUQUw6IG51bWJlcjtcblxuICByZWFkb25seSBBRV9JRk1UOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFFX0lGUkVHOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFFX0lGTE5LOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFFX0lGU09DSzogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRkNIUjogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRkJMSzogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRkRJUjogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRklGTzogbnVtYmVyO1xuXG4gIGRlY29tcHJlc3MoaW5wdXQ6IHN0cmluZyB8IEJ1ZmZlciwgb3V0cHV0Pzogc3RyaW5nLCBvcHRpb25zPzogRGVjb21wcmVzc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuICBjb21wcmVzcyhpbnB1dDogc3RyaW5nIHwgc3RyaW5nW10sIG91dHB1dDogc3RyaW5nLCBvcHRpb25zPzogQ29tcHJlc3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcbmltcG9ydCB7IFN0cmluZ0V4dHJhcyB9IGZyb20gXCIuL1V0aWxzXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBcmNoaXZlQmFzZSB7XG4gIHByb3RlY3RlZCBfY29udGV4dDogQXJjaGl2ZUNvbnRleHQ7XG4gIHByb3RlY3RlZCBfYXJjaGl2ZTogbnVtYmVyO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5fYXJjaGl2ZSA9IGFyY2hpdmU7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIHB1YmxpYyBnZXQgbWVtb3J5T2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9hcmNoaXZlO1xuICB9XG5cbiAgcHVibGljIGdldCBlcnJubygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZXJybm8odGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVycm9yU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2Vycm9yX3N0cmluZyh0aGlzLl9hcmNoaXZlKTtcbiAgICByZXR1cm4gU3RyaW5nRXh0cmFzLmZyb21CdWZmZXIodGhpcy5fY29udGV4dC5tZW1vcnlCdWZmZXIsIG9mZnNldCk7XG4gIH1cblxuICAvLyBoYW5kbGVFdmVudFxuICAvLyBhZGRFdmVudExpc3RuZXJcbiAgLy8gcmVtb3ZlRXZlbnRMaXN0ZW5lclxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSUFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5cbmV4cG9ydCBjbGFzcyBBcmNoaXZlQnVmZmVyIGltcGxlbWVudHMgSUFyY2hpdmVCdWZmZXIge1xuICBwcml2YXRlIF9jb250ZXh0OiBBcmNoaXZlQ29udGV4dDtcbiAgcHJpdmF0ZSBfYnl0ZU9mZnNldDogbnVtYmVyO1xuICBwcml2YXRlIF9ieXRlTGVuZ3RoOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEFyY2hpdmVDb250ZXh0LCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuX2J5dGVPZmZzZXQgPSBieXRlT2Zmc2V0O1xuICAgIHRoaXMuX2J5dGVMZW5ndGggPSBieXRlTGVuZ3RoO1xuICB9XG5cbiAgcHVibGljIHJlbGVhc2UoKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcmVlKHRoaXMuX2J5dGVPZmZzZXQpO1xuICB9XG5cbiAgZ2V0IGJ1ZmZlcigpOiBBcnJheUJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQubWVtb3J5QnVmZmVyO1xuICB9XG5cbiAgZ2V0IGJ5dGVPZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYnl0ZU9mZnNldDtcbiAgfVxuXG4gIGdldCBieXRlTGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2J5dGVMZW5ndGg7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IEFyY2hpdmVPcGVuQ2FsbGJhY2ssIEFyY2hpdmVSZWFkQ2FsbGJhY2ssIEFyY2hpdmVXcml0ZUNhbGxiYWNrLCBBcmNoaXZlQ2xvc2VDYWxsYmFjaywgQVJDSElWRV9PSyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVOYXRpdmUsIEFyY2hpdmVQdHIsIEFyY2hpdmVFbnRyeVB0ciB9IGZyb20gXCIuL0FyY2hpdmVOYXRpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlQnVmZmVyXCI7XG5cbnR5cGUgQXJjaGl2ZVJlYWRDYWxiYWNrcyA9IHtcbiAgb3BlbmVyPzogQXJjaGl2ZU9wZW5DYWxsYmFjayxcbiAgcmVhZGVyPzogQXJjaGl2ZVJlYWRDYWxsYmFjayxcbiAgY2xvc2VyPzogQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssXG59O1xuXG50eXBlIEFyY2hpdmVXcml0ZUNhbGJhY2tzID0ge1xuICBvcGVuZXI/OiBBcmNoaXZlT3BlbkNhbGxiYWNrLFxuICB3cml0ZXI/OiBBcmNoaXZlV3JpdGVDYWxsYmFjayxcbiAgY2xvc2VyPzogQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssXG59O1xuXG5jbGFzcyBBcmNoaXZlQ2FsbGJhY2tzIHtcbiAgcHJpdmF0ZSBfbWFwID0gbmV3IE1hcDxudW1iZXIsIEFyY2hpdmVSZWFkQ2FsYmFja3MgfCBBcmNoaXZlV3JpdGVDYWxiYWNrcz47XG5cbiAgcHVibGljIGdldChhcmNoaXZlOiBudW1iZXIpOiBBcmNoaXZlUmVhZENhbGJhY2tzIHwgQXJjaGl2ZVdyaXRlQ2FsYmFja3Mge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX21hcC5nZXQoYXJjaGl2ZSk7XG4gICAgaWYgKCFjYWxsYmFja3MpXG4gICAgICB0aHJvdyBFcnJvcihgSGFuZGxlICR7YXJjaGl2ZX0gZG9lcyBub3QgZXhpc3RzYCk7XG4gICAgcmV0dXJuIGNhbGxiYWNrcztcbiAgfVxuXG4gIHB1YmxpYyBzZXQoYXJjaGl2ZTogbnVtYmVyLCBjYWxsYmFja3M6IEFyY2hpdmVSZWFkQ2FsYmFja3MgfCBBcmNoaXZlV3JpdGVDYWxiYWNrcykge1xuICAgIGlmICghYXJjaGl2ZSlcbiAgICAgIHRocm93IEVycm9yKGBIYW5kbGUgaXMgbnVsbGApO1xuICAgIGlmICh0aGlzLl9tYXAuaGFzKGFyY2hpdmUpKVxuICAgICAgdGhyb3cgRXJyb3IoYEhhbmRsZSAke2FyY2hpdmV9IGlzIHJlZ2lzdHJlZGApO1xuICAgIHRoaXMuX21hcC5zZXQoYXJjaGl2ZSwgY2FsbGJhY2tzKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGUoYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWFwLmRlbGV0ZShhcmNoaXZlKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIEFyY2hpdmVDb250ZXh0IHtcbiAgcHJpdmF0ZSBfbmF0aXZlOiBBcmNoaXZlTmF0aXZlO1xuICBwcml2YXRlIF9tZW1vcnk6IFdlYkFzc2VtYmx5Lk1lbW9yeTtcbiAgcHJpdmF0ZSBfY2FsbGJhY2tzID0gbmV3IEFyY2hpdmVDYWxsYmFja3M7XG4gIHByaXZhdGUgX3JlYWRCdWZmZXIgPSBuZXcgVWludDhBcnJheTtcblxuICBjb25zdHJ1Y3RvcihuYXRpdmU6IEFyY2hpdmVOYXRpdmUsIG1lbW9yeTogV2ViQXNzZW1ibHkuTWVtb3J5KSB7XG4gICAgdGhpcy5fbmF0aXZlID0gbmF0aXZlO1xuICAgIHRoaXMuX21lbW9yeSA9IG1lbW9yeTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWVtb3J5QnVmZmVyKCk6IEFycmF5QnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWVtb3J5LmJ1ZmZlcjtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3ZlcnNpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfdmVyc2lvbigpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfdmVyc2lvbl9kZXRhaWxzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3ZlcnNpb25fZGV0YWlscygpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfc2V0bG9jYWxlKG5hbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3NldGxvY2FsZShuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2Vycm5vKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2Vycm5vKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZXJyb3Jfc3RyaW5nKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2Vycm9yX3N0cmluZyhhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX29wZW5faGFuZGxlcihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGNsaWVudCA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSk7XG4gICAgcmV0dXJuIGNsaWVudC5vcGVuZXIgPyBjbGllbnQub3BlbmVyKCkgOiAwO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9oYW5kbGVyKGFyY2hpdmU6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5fcmVhZEJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVJlYWRDYWxiYWNrcztcbiAgICAgIGlmICghY2xpZW50LnJlYWRlcilcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICBjb25zdCBidWYgPSBjbGllbnQucmVhZGVyKCk7XG4gICAgICBpZiAoIWJ1ZilcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB0aGlzLl9yZWFkQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICB9XG5cbiAgICBjb25zdCBuID0gTWF0aC5taW4oc2l6ZSwgdGhpcy5fcmVhZEJ1ZmZlci5sZW5ndGgpO1xuICAgIGNvbnN0IGRzdCA9IG5ldyBVaW50OEFycmF5KHRoaXMuX21lbW9yeS5idWZmZXIsIG9mZnNldCwgbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspXG4gICAgICBkc3RbaV0gPSB0aGlzLl9yZWFkQnVmZmVyW2ldO1xuXG4gICAgdGhpcy5fcmVhZEJ1ZmZlciA9IHRoaXMuX3JlYWRCdWZmZXIuc2xpY2Uobik7XG4gICAgcmV0dXJuIG47XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2xhc3RfZXJyb3IoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9sYXN0X2Vycm9yKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfaGFuZGxlcihhcmNoaXZlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVdyaXRlQ2FsYmFja3M7XG4gICAgaWYgKGNhbGxiYWNrcy53cml0ZXIpXG4gICAgICBjYWxsYmFja3Mud3JpdGVyKG5ldyBBcmNoaXZlQnVmZmVyKHRoaXMsIG9mZnNldCwgc2l6ZSkpXG4gICAgcmV0dXJuIHNpemU7XG4gIH07XG5cbiAgcHVibGljIGFyY2hpdmVfY2xvc2VfaGFuZGxlcihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGNsaWVudCA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSk7XG4gICAgcmV0dXJuIGNsaWVudC5jbG9zZXIgPyBjbGllbnQuY2xvc2VyKCkgOiAwO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9uZXcoKTogQXJjaGl2ZVB0ciB7XG4gICAgY29uc3QgYXJjaGl2ZSA9IHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfbmV3KCk7XG4gICAgaWYgKGFyY2hpdmUpIHtcbiAgICAgIGNvbnN0IGltcGw6IEFyY2hpdmVSZWFkQ2FsYmFja3MgPSB7fTtcbiAgICAgIHRoaXMuX2NhbGxiYWNrcy5zZXQoYXJjaGl2ZSwgaW1wbCk7XG4gICAgfVxuICAgIHJldHVybiBhcmNoaXZlO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9mcmVlKGFyY2hpdmU6IG51bWJlcikge1xuICAgIHRoaXMuX2NhbGxiYWNrcy5kZWxldGUoYXJjaGl2ZSk7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9mcmVlKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9hZGRfcGFzc3BocmFzZShhcmNoaXZlOiBBcmNoaXZlUHRyLCBwYXNzcGhyYXNlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX2FkZF9wYXNzcGhyYXNlKGFyY2hpdmUsIHBhc3NwaHJhc2UpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9zdXBwb3J0X2ZpbHRlcl9hbGwoYXJjaGl2ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfc3VwcG9ydF9maWx0ZXJfYWxsKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9zdXBwb3J0X2Zvcm1hdF9hbGwoYXJjaGl2ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfc3VwcG9ydF9mb3JtYXRfYWxsKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9vcGVuKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfb3BlbihhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfY2xvc2UoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9jbG9zZShhcmNoaXZlKTtcbiAgfVxuICBcbiAgcHVibGljIGFyY2hpdmVfcmVhZF9uZXh0X2hlYWRlcihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX25leHRfaGVhZGVyKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9kYXRhKGFyY2hpdmU6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfZGF0YShhcmNoaXZlLCBvZmZzZXQsIHNpemUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9kYXRhX3NraXAoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9kYXRhX3NraXAoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX3NldF9vcGVuX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVSZWFkQ2FsYmFja3M7XG4gICAgY2FsbGJhY2tzLm9wZW5lciA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9zZXRfcmVhZF9jYWxsYmFjayhhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrOiBBcmNoaXZlUmVhZENhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlUmVhZENhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy5yZWFkZXIgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfc2V0X2Nsb3NlX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVDbG9zZUNhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlUmVhZENhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy5jbG9zZXIgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX25ldygpOiBBcmNoaXZlUHRyIHtcbiAgICBjb25zdCBhcmNoaXZlID0gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfbmV3KCk7XG4gICAgaWYgKGFyY2hpdmUpIHtcbiAgICAgIGNvbnN0IGltcGw6IEFyY2hpdmVXcml0ZUNhbGJhY2tzID0ge307XG4gICAgICB0aGlzLl9jYWxsYmFja3Muc2V0KGFyY2hpdmUsIGltcGwpO1xuICAgIH1cbiAgICByZXR1cm4gYXJjaGl2ZTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX2ZyZWUoYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzLmRlbGV0ZShhcmNoaXZlKTtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9mcmVlKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X29wdGlvbnMoYXJjaGl2ZTogbnVtYmVyLCBvcHRpb25zOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9zZXRfb3B0aW9ucyhhcmNoaXZlLCBvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF9wYXNzcGhyYXNlKGFyY2hpdmU6IG51bWJlciwgcGFzc3BocmFzZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfc2V0X3Bhc3NwaHJhc2UoYXJjaGl2ZSwgcGFzc3BocmFzZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2J5X25hbWUoYXJjaGl2ZTogbnVtYmVyLCBuYW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2J5X25hbWUoYXJjaGl2ZSwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9hZGRfZmlsdGVyX2J5X25hbWUoYXJjaGl2ZTogbnVtYmVyLCBuYW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9hZGRfZmlsdGVyX2J5X25hbWUoYXJjaGl2ZSwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2ZpbHRlcl9ieV9leHQoYXJjaGl2ZTogbnVtYmVyLCBmaWxlbmFtZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9maWx0ZXJfYnlfZXh0KGFyY2hpdmUsIGZpbGVuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF9vcGVuX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVXcml0ZUNhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy5vcGVuZXIgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF93cml0ZV9jYWxsYmFjayhhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrOiBBcmNoaXZlV3JpdGVDYWxsYmFjayk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVdyaXRlQ2FsYmFja3M7XG4gICAgY2FsbGJhY2tzLndyaXRlciA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X2Nsb3NlX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVDbG9zZUNhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlV3JpdGVDYWxiYWNrcztcbiAgICBjYWxsYmFja3MuY2xvc2VyID0gY2FsbGJhY2s7XG4gIH1cbiAgXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX29wZW4oYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfb3BlbihhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX2Nsb3NlKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX2Nsb3NlKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfaGVhZGVyKGFyY2hpdmU6IG51bWJlciwgZW50cnk6IEFyY2hpdmVFbnRyeVB0cik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX2hlYWRlcihhcmNoaXZlLCBlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9kYXRhKGFyY2hpdmU6IEFyY2hpdmVQdHIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9kYXRhKGFyY2hpdmUsIG9mZnNldCwgc2l6ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9uZXcoKTogQXJjaGl2ZUVudHJ5UHRyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfbmV3KCk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9mcmVlKGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpIHtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9mcmVlKGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X3BhdGhuYW1lKGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9wYXRobmFtZShlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9wYXRobmFtZV93KGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9wYXRobmFtZV93KGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X3BhdGhuYW1lX3V0ZjgoZW50cnk6IEFyY2hpdmVFbnRyeVB0cik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3BhdGhuYW1lX3V0ZjgoZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfc2V0X3BhdGhuYW1lX3V0ZjgoZW50cnk6IEFyY2hpdmVFbnRyeVB0ciwgcGF0aG5hbWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3NldF9wYXRobmFtZV91dGY4KGVudHJ5LCBwYXRobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9zaXplKGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpOiBudW1iZXIge1xuICAgIGNvbnN0IGxvID0gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfc2l6ZV9sbyhlbnRyeSk7XG4gICAgY29uc3QgaGkgPSB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zaXplX2hpKGVudHJ5KTtcbiAgICByZXR1cm4gaGkgKiA0Mjk0OTY3Mjk2ICsgbG87XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9zZXRfc2l6ZShlbnRyeTogQXJjaGl2ZUVudHJ5UHRyLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zZXRfc2l6ZShlbnRyeSwgMCwgc2l6ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9zaXplX2lzX3NldChlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfc2l6ZV9pc19zZXQoZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfbW9kZShlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfbW9kZShlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9zZXRfbW9kZShlbnRyeTogQXJjaGl2ZUVudHJ5UHRyLCBtb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zZXRfbW9kZShlbnRyeSwgbW9kZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9idWZmZXJfbmV3KHNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2J1ZmZlcl9uZXcoc2l6ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9idWZmZXJfZnJlZShidWZmZXI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2J1ZmZlcl9mcmVlKGJ1ZmZlcik7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9idWZmZXJfZnJvbShzdHI6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcjtcbiAgICBjb25zdCBieXRlcyA9IGVuY29kZXIuZW5jb2RlKHN0ciArIFwiXFx4MDBcIik7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fbmF0aXZlLmFyY2hpdmVfYnVmZmVyX25ldyhieXRlcy5sZW5ndGgpO1xuICAgIGlmIChvZmZzZXQpXG4gICAgICAobmV3IFVpbnQ4QXJyYXkodGhpcy5fbWVtb3J5LmJ1ZmZlciwgb2Zmc2V0LCBieXRlcy5sZW5ndGgpKS5zZXQoYnl0ZXMpO1xuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElBcmNoaXZlRW50cnkgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5pbXBvcnQgeyBBcmNoaXZlRW50cnlQdHIgfSBmcm9tIFwiLi9BcmNoaXZlTmF0aXZlXCI7XG5pbXBvcnQgeyBOT19NRU1PUlksIFN0cmluZ0V4dHJhcyB9IGZyb20gXCIuL1V0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBBcmNoaXZlRW50cnkgaW1wbGVtZW50cyBJQXJjaGl2ZUVudHJ5IHtcbiAgcHJpdmF0ZSBfY29udGV4dDogQXJjaGl2ZUNvbnRleHQ7XG4gIHByaXZhdGUgX2VudHJ5OiBBcmNoaXZlRW50cnlQdHI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEFyY2hpdmVDb250ZXh0LCBlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKSB7XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5fZW50cnkgPSBlbnRyeTtcbiAgfVxuXG4gIHB1YmxpYyByZWxlYXNlKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9mcmVlKHRoaXMuX2VudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWVtb3J5T2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9lbnRyeTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGF0aG5hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBwYXRobmFtZVVURjhQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfcGF0aG5hbWVfdXRmOCh0aGlzLl9lbnRyeSk7XG4gICAgaWYgKHBhdGhuYW1lVVRGOFB0cikge1xuICAgICAgcmV0dXJuIFN0cmluZ0V4dHJhcy5mcm9tQnVmZmVyKHRoaXMuX2NvbnRleHQubWVtb3J5QnVmZmVyLCBwYXRobmFtZVVURjhQdHIpO1xuICAgIH1cbiAgICBjb25zdCBwYXRobmFtZVB0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9wYXRobmFtZSh0aGlzLl9lbnRyeSk7XG4gICAgaWYgKHBhdGhuYW1lUHRyKSB7XG4gICAgICByZXR1cm4gU3RyaW5nRXh0cmFzLmZyb21CdWZmZXIodGhpcy5fY29udGV4dC5tZW1vcnlCdWZmZXIsIHBhdGhuYW1lUHRyKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IHBhdGhuYW1lKHBhdGhuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXRobmFtZVB0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJvbShwYXRobmFtZSk7XG4gICAgaWYgKCFwYXRobmFtZVB0cikgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3NldF9wYXRobmFtZV91dGY4KHRoaXMuX2VudHJ5LCBwYXRobmFtZVB0cik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3NpemVfaXNfc2V0KHRoaXMuX2VudHJ5KSlcbiAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfc2l6ZSh0aGlzLl9lbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNpemUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9zZXRfc2l6ZSh0aGlzLl9lbnRyeSwgdmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBtb2RlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9tb2RlKHRoaXMuX2VudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbW9kZShtb2RlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfc2V0X21vZGUodGhpcy5fZW50cnksIG1vZGUpO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJQXJjaGl2ZSB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVOYXRpdmUgfSBmcm9tIFwiLi9BcmNoaXZlTmF0aXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5pbXBvcnQgeyBBcmNoaXZlQnVmZmVyIH0gZnJvbSBcIi4vQXJjaGl2ZUJ1ZmZlclwiO1xuaW1wb3J0IHsgQXJjaGl2ZUVudHJ5IH0gZnJvbSBcIi4vQXJjaGl2ZUVudHJ5XCI7XG5pbXBvcnQgeyBBcmNoaXZlUmVhZCB9IGZyb20gXCIuL0FyY2hpdmVSZWFkXCI7XG5pbXBvcnQgeyBBcmNoaXZlV3JpdGUgfSBmcm9tIFwiLi9BcmNoaXZlV3JpdGVcIjtcbmltcG9ydCB7IE5PX01FTU9SWSwgU3RyaW5nRXh0cmFzIH0gZnJvbSBcIi4vVXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEFyY2hpdmUgaW1wbGVtZW50cyBJQXJjaGl2ZSB7XG4gIHByaXZhdGUgX2NvbnRleHQ6IEFyY2hpdmVDb250ZXh0O1xuICBwcml2YXRlIF92ZXJzaW9uID0gXCJcIjtcbiAgcHJpdmF0ZSBfdmVyc2lvbkRldGFpbHMgPSBcIlwiO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCkge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICB9XG5cbiAgcHVibGljIGdldCB2ZXJzaW9uKCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLl92ZXJzaW9uKSB7XG4gICAgICBjb25zdCB2ZXJzaW9uUHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3ZlcnNpb24oKTtcbiAgICAgIHRoaXMuX3ZlcnNpb24gPSBTdHJpbmdFeHRyYXMuZnJvbUJ1ZmZlcih0aGlzLl9jb250ZXh0Lm1lbW9yeUJ1ZmZlciwgdmVyc2lvblB0cik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl92ZXJzaW9uO1xuICB9XG5cbiAgcHVibGljIGdldCB2ZXJzaW9uRGV0YWlscygpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5fdmVyc2lvbkRldGFpbHMpIHtcbiAgICAgIGNvbnN0IHZlcnNpb25EZXRhaWxzUHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3ZlcnNpb25fZGV0YWlscygpO1xuICAgICAgdGhpcy5fdmVyc2lvbkRldGFpbHMgPSBTdHJpbmdFeHRyYXMuZnJvbUJ1ZmZlcih0aGlzLl9jb250ZXh0Lm1lbW9yeUJ1ZmZlciwgdmVyc2lvbkRldGFpbHNQdHIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdmVyc2lvbkRldGFpbHM7XG4gIH1cblxuICBwdWJsaWMgc2V0bG9jYWxlKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgbmFtZVB0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJvbShuYW1lKTtcbiAgICBpZiAoIW5hbWVQdHIpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IHJlc3VsdFB0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9zZXRsb2NhbGUobmFtZVB0cik7XG4gICAgaWYgKHJlc3VsdFB0cilcbiAgICAgIHJldHVybiBTdHJpbmdFeHRyYXMuZnJvbUJ1ZmZlcih0aGlzLl9jb250ZXh0Lm1lbW9yeUJ1ZmZlciwgcmVzdWx0UHRyKTtcbiAgfVxuXG4gIHB1YmxpYyBuZXdSZWFkKCk6IEFyY2hpdmVSZWFkIHtcbiAgICBjb25zdCBhcmNoaXZlX3JlYWQgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9uZXcoKTtcbiAgICBpZiAoIWFyY2hpdmVfcmVhZClcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIHJldHVybiBuZXcgQXJjaGl2ZVJlYWQodGhpcy5fY29udGV4dCwgYXJjaGl2ZV9yZWFkKTtcbiAgfVxuXG4gIHB1YmxpYyBuZXdXcml0ZSgpOiBBcmNoaXZlV3JpdGUge1xuICAgIGNvbnN0IGFyY2hpdmVfd3JpdGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfbmV3KCk7XG4gICAgaWYgKCFhcmNoaXZlX3dyaXRlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgcmV0dXJuIG5ldyBBcmNoaXZlV3JpdGUodGhpcy5fY29udGV4dCwgYXJjaGl2ZV93cml0ZSk7XG4gIH1cblxuICBwdWJsaWMgbmV3RW50cnkoKTogQXJjaGl2ZUVudHJ5IHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9uZXcoKTtcbiAgICBpZiAoIWVudHJ5KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgcmV0dXJuIG5ldyBBcmNoaXZlRW50cnkodGhpcy5fY29udGV4dCwgZW50cnkpO1xuICB9XG5cbiAgcHVibGljIG5ld0J1ZmZlcihsZW5ndGg6IG51bWJlcik6IEFyY2hpdmVCdWZmZXIge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfbmV3KGxlbmd0aCk7XG4gICAgaWYgKCFvZmZzZXQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICByZXR1cm4gbmV3IEFyY2hpdmVCdWZmZXIodGhpcy5fY29udGV4dCwgb2Zmc2V0LCBsZW5ndGgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBpbnN0YW50aWF0ZShidWZmZXI6IEJ1ZmZlciB8IEFycmF5QnVmZmVyKTogUHJvbWlzZTxBcmNoaXZlPiB7XG4gICAgbGV0IGNvbnRleHQ6IEFyY2hpdmVDb250ZXh0O1xuXG4gICAgY29uc3QgaW1wb3J0T2JqZWN0ID0ge1xuICAgICAgZW52OiB7XG4gICAgICAgIGFyY2hpdmVfb3Blbl9oYW5kbGVyOiAoYXJjaGl2ZTogbnVtYmVyKSA9PiBjb250ZXh0LmFyY2hpdmVfb3Blbl9oYW5kbGVyKGFyY2hpdmUpLFxuICAgICAgICBhcmNoaXZlX3JlYWRfaGFuZGxlcjogKGFyY2hpdmU6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcikgPT4gY29udGV4dC5hcmNoaXZlX3JlYWRfaGFuZGxlcihhcmNoaXZlLCBvZmZzZXQsIHNpemUpLFxuICAgICAgICBhcmNoaXZlX3dyaXRlX2hhbmRsZXI6IChhcmNoaXZlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpID0+IGNvbnRleHQuYXJjaGl2ZV93cml0ZV9oYW5kbGVyKGFyY2hpdmUsIG9mZnNldCwgc2l6ZSksXG4gICAgICAgIGFyY2hpdmVfY2xvc2VfaGFuZGxlcjogKGFyY2hpdmU6IG51bWJlcikgPT4gY29udGV4dC5hcmNoaXZlX2Nsb3NlX2hhbmRsZXIoYXJjaGl2ZSksXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBpbnN0U291cmNlID0gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoYnVmZmVyLCBpbXBvcnRPYmplY3QpO1xuICAgIGNvbnN0IG5hdGl2ZSA9IGluc3RTb3VyY2UuaW5zdGFuY2UuZXhwb3J0cyBhcyBBcmNoaXZlTmF0aXZlO1xuICAgIGNvbnRleHQgPSBuZXcgQXJjaGl2ZUNvbnRleHQobmF0aXZlLCBuYXRpdmUubWVtb3J5KTtcblxuICAgIHJldHVybiBuZXcgQXJjaGl2ZShjb250ZXh0KTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQXJjaGl2ZU9wZW5DYWxsYmFjaywgQXJjaGl2ZVJlYWRDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIElBcmNoaXZlUmVhZCwgQVJDSElWRV9PSyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcbmltcG9ydCB7IEFyY2hpdmVCYXNlIH0gZnJvbSBcIi4vQXJjaGl2ZUJhc2VcIjtcbmltcG9ydCB7IEFyY2hpdmVFbnRyeSB9IGZyb20gXCIuL0FyY2hpdmVFbnRyeVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUJ1ZmZlciB9IGZyb20gXCIuL0FyY2hpdmVCdWZmZXJcIjtcbmltcG9ydCB7IGVycm9yQ29kZVRvU3RyaW5nLCBOT19NRU1PUlkgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZVJlYWQgZXh0ZW5kcyBBcmNoaXZlQmFzZSBpbXBsZW1lbnRzIElBcmNoaXZlUmVhZCB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgc3VwZXIoY29udGV4dCwgYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9mcmVlKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHN1cHBvcnRGaWx0ZXJBbGwoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZmlsdGVyX2FsbCh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBzdXBwb3J0Rm9ybWF0QWxsKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zdXBwb3J0X2Zvcm1hdF9hbGwodGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUGFzc3BocmFzZShwYXNzcGhyYXNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBwYXNzcGhyYXNlUHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKHBhc3NwaHJhc2UpO1xuICAgIGlmICghcGFzc3BocmFzZVB0cikgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX2FkZF9wYXNzcGhyYXNlKHRoaXMuX2FyY2hpdmUsIHBhc3NwaHJhc2VQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShwYXNzcGhyYXNlUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX29wZW4odGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGNvZGUgIT09IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfY2xvc2UodGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgbmV4dEhlYWRlcigpOiBBcmNoaXZlRW50cnkgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfbmV4dF9oZWFkZXIodGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGVudHJ5KVxuICAgICAgcmV0dXJuIG5ldyBBcmNoaXZlRW50cnkodGhpcy5fY29udGV4dCwgZW50cnkpO1xuXG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX2xhc3RfZXJyb3IodGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGNvZGUgIT09IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGF0YVJlYWQoYnVmZmVyOiBBcmNoaXZlQnVmZmVyLCBvZmZzZXQ/OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IG51bWJlciB7XG4gICAgb2Zmc2V0ID0gYnVmZmVyLmJ5dGVPZmZzZXQgKyAob2Zmc2V0IHx8IDApO1xuICAgIGxlbmd0aCA9IGxlbmd0aCB8fCBidWZmZXIuYnl0ZUxlbmd0aDtcblxuICAgIGNvbnN0IG4gPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9kYXRhKHRoaXMuX2FyY2hpdmUsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhuKSB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG47XG4gIH1cblxuICBwdWJsaWMgZGF0YVNraXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfZGF0YV9za2lwKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHNldCBvbm9wZW4oY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zZXRfb3Blbl9jYWxsYmFjayh0aGlzLl9hcmNoaXZlLCBjYWxsYmFjayk7XG4gIH1cblxuICBwdWJsaWMgc2V0IG9ucmVhZChjYWxsYmFjazogQXJjaGl2ZVJlYWRDYWxsYmFjaykge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3NldF9yZWFkX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zZXRfY2xvc2VfY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJQXJjaGl2ZVdyaXRlLCBBcmNoaXZlT3BlbkNhbGxiYWNrLCBBcmNoaXZlV3JpdGVDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIEFSQ0hJVkVfT0sgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5pbXBvcnQgeyBBcmNoaXZlQmFzZSB9IGZyb20gXCIuL0FyY2hpdmVCYXNlXCI7XG5pbXBvcnQgeyBBcmNoaXZlRW50cnkgfSBmcm9tIFwiLi9BcmNoaXZlRW50cnlcIjtcbmltcG9ydCB7IEFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlQnVmZmVyXCI7XG5pbXBvcnQgeyBOT19NRU1PUlksIGVycm9yQ29kZVRvU3RyaW5nIH0gZnJvbSBcIi4vVXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEFyY2hpdmVXcml0ZSBleHRlbmRzIEFyY2hpdmVCYXNlIGltcGxlbWVudHMgSUFyY2hpdmVXcml0ZSB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgc3VwZXIoY29udGV4dCwgYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfZnJlZSh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgZm9ybWF0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKHZhbHVlKTtcbiAgICBpZiAoIW5hbWUpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9ieV9uYW1lKHRoaXMuX2FyY2hpdmUsIG5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShuYW1lKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBvcHRpb25zKG9wdGlvbnM6IHN0cmluZykge1xuICAgIGNvbnN0IG9wdGlvbnNQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9vcHRpb25zKHRoaXMuX2FyY2hpdmUsIG9wdGlvbnNQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShvcHRpb25zUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBwYXNzcGhyYXNlKHBhc3NwaHJhc2U6IHN0cmluZykge1xuICAgIGNvbnN0IHBhc3NwaHJhc2VQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ocGFzc3BocmFzZSk7XG4gICAgaWYgKCFwYXNzcGhyYXNlUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9wYXNzcGhyYXNlKHRoaXMuX2FyY2hpdmUsIHBhc3NwaHJhc2VQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShwYXNzcGhyYXNlUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZEZpbHRlcihmaWx0ZXI6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20oZmlsdGVyKTtcbiAgICBpZiAoIW5hbWUpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfYWRkX2ZpbHRlcl9ieV9uYW1lKHRoaXMuX2FyY2hpdmUsIG5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShuYW1lKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldEZvcm1hdEZpbHRlckJ5RXh0KGZpbGVuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmbmFtZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJvbShmaWxlbmFtZSk7XG4gICAgaWYgKCFmbmFtZSkgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2ZpbHRlcl9ieV9leHQodGhpcy5fYXJjaGl2ZSwgZm5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShmbmFtZSk7XG4gICAgaWYgKGNvZGUgIT0gQVJDSElWRV9PSykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuZXJyb3JTdHJpbmcsIHsgY2F1c2U6IGVycm9yQ29kZVRvU3RyaW5nKGNvZGUpIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25vcGVuKGNhbGxiYWNrOiBBcmNoaXZlT3BlbkNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9vcGVuX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb253cml0ZShjYWxsYmFjazogQXJjaGl2ZVdyaXRlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X3dyaXRlX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X29wZW5fY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9vcGVuKHRoaXMuX2FyY2hpdmUpO1xuICAgIGlmIChjb2RlICE9PSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9jbG9zZSh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZUhlYWRlcihlbnRyeTogQXJjaGl2ZUVudHJ5KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX2hlYWRlcih0aGlzLl9hcmNoaXZlLCBlbnRyeS5tZW1vcnlPZmZzZXQpO1xuICB9XG5cbiAgcHVibGljIHdyaXRlRGF0YShidWZmZXI6IEFyY2hpdmVCdWZmZXIsIG9mZnNldD86IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBvZmZzZXQgPSBidWZmZXIuYnl0ZU9mZnNldCArIChvZmZzZXQgfHwgMCk7XG4gICAgbGVuZ3RoID0gbGVuZ3RoIHx8IGJ1ZmZlci5ieXRlTGVuZ3RoIC0gb2Zmc2V0O1xuXG4gICAgY29uc3QgbiA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9kYXRhKHRoaXMuX2FyY2hpdmUsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhuKSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbjtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQVJDSElWRV9PSywgQVJDSElWRV9SRVRSWSwgQVJDSElWRV9XQVJOLCBBUkNISVZFX0ZBSUxFRCwgQVJDSElWRV9GQVRBTCB9IGZyb20gXCIuL0FyY2hpdmVcIjtcblxuZXhwb3J0IGNvbnN0IE5PX01FTU9SWSA9IFwiTm8gTWVtb3J5XCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3RyaW5nRXh0cmFzIHsgXG5leHBvcnQgZnVuY3Rpb24gZnJvbUJ1ZmZlcihidWZmZXI6IEFycmF5QnVmZmVyIHwgU2hhcmVkQXJyYXlCdWZmZXIsIG9mZnNldDogbnVtYmVyLCBsZW5ndGg/OiBudW1iZXIpOiBzdHJpbmdcbntcbiAgbGV0IGJ5dGVzOiBVaW50OEFycmF5O1xuXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDA7XG4gICAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIsIG9mZnNldCk7XG4gICAgd2hpbGUgKGJ5dGVzW2xlbmd0aF0pXG4gICAgICBsZW5ndGgrKztcbiAgfVxuXG4gIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCk7XG4gIGlmIChidWZmZXIgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlcikge1xuICAgIGNvbnN0IGNvcHlCeXRlcyA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgY29weUJ5dGVzLnNldChieXRlcyk7XG4gICAgYnl0ZXMgPSBjb3B5Qnl0ZXM7XG4gIH1cblxuICByZXR1cm4gKG5ldyBUZXh0RGVjb2RlcihcInV0Zi04XCIpKS5kZWNvZGUoYnl0ZXMpO1xufVxufSAvLyBuYW1lc3BhY2UgU3RyaW5nRXh0cmFzXG5cbmV4cG9ydCBmdW5jdGlvbiBlcnJvckNvZGVUb1N0cmluZyhjb2RlOiBudW1iZXIpOiBzdHJpbmdcbntcbiAgc3dpdGNoIChjb2RlKSB7XG4gIGNhc2UgQVJDSElWRV9PSzpcbiAgICByZXR1cm4gXCJBUkNISVZFX09LXCI7XG4gIGNhc2UgQVJDSElWRV9SRVRSWTpcbiAgICByZXR1cm4gXCJBUkNISVZFX1JFVFJZXCI7XG4gIGNhc2UgQVJDSElWRV9XQVJOOlxuICAgIHJldHVybiBcIkFSQ0hJVkVfV0FSTlwiO1xuICBjYXNlIEFSQ0hJVkVfRkFJTEVEOlxuICAgIHJldHVybiBcIkFSQ0hJVkVfRkFJTEVEXCI7XG4gIGNhc2UgQVJDSElWRV9GQVRBTDpcbiAgICByZXR1cm4gXCJBUkNISVZFX0ZBVEFMXCI7XG4gIH1cblxuICBpZiAoY29kZSA8IDApXG4gICAgcmV0dXJuIFwiQVJDSElWRV9cIiArICgtY29kZSk7XG5cbiAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciBjb2RlICR7Y29kZX0gbXVzdCBiZSBuZWdhdGl2ZWApO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJnbG9iYWwuZC50c1wiIC8+XG5cbmltcG9ydCB7IElBcmNoaXZlLCBJQXJjaGl2ZUV4cG9ydCwgRGVjb21wcmVzc09wdGlvbnMsIENvbXByZXNzT3B0aW9ucyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmUgfSBmcm9tIFwiLi9BcmNoaXZlSW1wbFwiO1xuaW1wb3J0IHsgQVJDSElWRV9PSywgQVJDSElWRV9SRVRSWSwgQVJDSElWRV9XQVJOLCBBUkNISVZFX0ZBSUxFRCwgQVJDSElWRV9GQVRBTCB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFFX0lGTVQsIEFFX0lGUkVHLCBBRV9JRkxOSywgQUVfSUZTT0NLLCBBRV9JRkNIUiwgQUVfSUZCTEssIEFFX0lGRElSLCBBRV9JRklGTyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hCdWZmZXIoc3RyOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goc3RyKTtcbiAgcmV0dXJuIHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG5ld0FyY2hpdmVDb250ZXh0KHBhcmFtczogc3RyaW5nIHwgQXJyYXlCdWZmZXIpOiBQcm9taXNlPElBcmNoaXZlPiB7XG4gIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKVxuICAgIHBhcmFtcyA9IGF3YWl0IGZldGNoQnVmZmVyKHBhcmFtcyk7XG4gIHJldHVybiBBcmNoaXZlLmluc3RhbnRpYXRlKHBhcmFtcyk7XG59XG5cbmxldCBnX2FyY2hpdmU6IElBcmNoaXZlO1xuYXN5bmMgZnVuY3Rpb24gZ2V0QXJjaGl2ZUNvbnRleHQocGFyYW1zPzogc3RyaW5nIHwgQXJyYXlCdWZmZXIpOiBQcm9taXNlPElBcmNoaXZlPiB7XG4gIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBuZXdBcmNoaXZlQ29udGV4dChwYXJhbXMpO1xuICB9XG5cbiAgaWYgKCFnX2FyY2hpdmUpIHtcbiAgICBnX2FyY2hpdmUgPSBhd2FpdCBuZXdBcmNoaXZlQ29udGV4dChMSUJBUkNISVZFX1dBU01fRklMRU5BTUUpO1xuICB9XG5cbiAgcmV0dXJuIGdfYXJjaGl2ZTtcbn1cblxuY29uc3QgbGliYXJjaGl2ZTogSUFyY2hpdmVFeHBvcnQgPSBPYmplY3QuYXNzaWduKGdldEFyY2hpdmVDb250ZXh0LCB7XG4gIEFSQ0hJVkVfT0ssXG4gIEFSQ0hJVkVfUkVUUlksXG4gIEFSQ0hJVkVfV0FSTixcbiAgQVJDSElWRV9GQUlMRUQsXG4gIEFSQ0hJVkVfRkFUQUwsXG5cbiAgQUVfSUZNVCxcbiAgQUVfSUZSRUcsXG4gIEFFX0lGTE5LLFxuICBBRV9JRlNPQ0ssXG4gIEFFX0lGQ0hSLFxuICBBRV9JRkJMSyxcbiAgQUVfSUZESVIsXG4gIEFFX0lGSUZPLFxuXG4gIGFzeW5jIGRlY29tcHJlc3MoaW5wdXQ6IHN0cmluZyB8IEFycmF5QnVmZmVyLCBvdXRwdXQ/OiBzdHJpbmcsIG9wdGlvbnM/OiBEZWNvbXByZXNzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKFwiSUFyY2hpdmVFeHBvcnQuZGVjb21wcmVzc1wiKTtcbiAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZ2V0QXJjaGl2ZUNvbnRleHQob3B0aW9ucz8ubW9kdWxlVXJsKTtcbiAgICAvL3JldHVybiBBcmNoaXZlT3BlcmF0aW9ucy5kZWNvbXByZXNzKHdlYkZzLCBhd2FpdCBuZXdBcmNoaXZlQ29udGV4dCgpLCBpbnB1dCwgb3V0cHV0LCBvcHRpb25zKTtcbiAgfSxcblxuICBhc3luYyBjb21wcmVzcyhpbnB1dDogc3RyaW5nIHwgc3RyaW5nW10sIG91dHB1dDogc3RyaW5nLCBvcHRpb25zPzogQ29tcHJlc3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc29sZS5sb2coXCJJQXJjaGl2ZUV4cG9ydC5jb21wcmVzc1wiKTtcbiAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZ2V0QXJjaGl2ZUNvbnRleHQob3B0aW9ucz8ubW9kdWxlVXJsKTtcbiAgICAvL3JldHVybiBBcmNoaXZlT3BlcmF0aW9ucy5jb21wcmVzcyh3ZWJGcywgYXdhaXQgbmV3QXJjaGl2ZUNvbnRleHQoKSwgaW5wdXQsIG91dHB1dCwgb3B0aW9ucyk7XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbGliYXJjaGl2ZTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==