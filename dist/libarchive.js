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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQztRQUN2QyxNQUFNLE9BQU8sR0FBRyxNQUFNLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM1RCw4RkFBOEY7SUFDaEcsQ0FBQztDQUNGLENBQUMsQ0FBQztBQUVILGlFQUFlLFVBQVUsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZS50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVCYXNlLnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZUJ1ZmZlci50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVDb250ZXh0LnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZUVudHJ5LnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZUltcGwudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlUmVhZC50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVXcml0ZS50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL1V0aWxzLnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL01haW5MaWJyYXJ5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImxpYmFyY2hpdmVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wibGliYXJjaGl2ZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmV4cG9ydCBjb25zdCBBUkNISVZFX09LID0gMDtcbmV4cG9ydCBjb25zdCBBUkNISVZFX1JFVFJZID0gLTEwO1xuZXhwb3J0IGNvbnN0IEFSQ0hJVkVfV0FSTiA9IC0yMDtcbmV4cG9ydCBjb25zdCBBUkNISVZFX0ZBSUxFRCA9IC0yNTtcbmV4cG9ydCBjb25zdCBBUkNISVZFX0ZBVEFMID0gLTMwO1xuXG5leHBvcnQgY29uc3QgQUVfSUZNVCAgID0gMHhmMDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGUkVHICA9IDB4ODAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRkxOSyAgPSAweGEwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZTT0NLID0gMHhjMDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGQ0hSICA9IDB4MjAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRkJMSyAgPSAweDYwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZESVIgID0gMHg0MDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGSUZPICA9IDB4MTAwMDtcblxuZXhwb3J0IHR5cGUgQXJjaGl2ZU9wZW5DYWxsYmFjayA9ICgpID0+IG51bWJlcjtcbmV4cG9ydCB0eXBlIEFyY2hpdmVSZWFkQ2FsbGJhY2sgPSAoKSA9PiBCdWZmZXIgfCB1bmRlZmluZWQ7XG5leHBvcnQgdHlwZSBBcmNoaXZlV3JpdGVDYWxsYmFjayA9IChidWZmZXI6IElBcmNoaXZlQnVmZmVyKSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgQXJjaGl2ZUNsb3NlQ2FsbGJhY2sgPSAoKSA9PiBudW1iZXI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmVCdWZmZXIge1xuICByZWxlYXNlKCk6IHZvaWQ7XG5cbiAgZ2V0IGJ1ZmZlcigpOiBBcnJheUJ1ZmZlcjtcbiAgZ2V0IGJ5dGVPZmZzZXQoKTogbnVtYmVyO1xuICBnZXQgYnl0ZUxlbmd0aCgpOiBudW1iZXI7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcmNoaXZlRW50cnkge1xuICByZWxlYXNlKCk6IHZvaWQ7XG5cbiAgZ2V0IHBhdGhuYW1lKCk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgc2V0IHBhdGhuYW1lKHZhbHVlOiBzdHJpbmcpO1xuXG4gIGdldCBzaXplKCk6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgc2V0IHNpemUodmFsdWU6IG51bWJlcik7XG5cbiAgZ2V0IG1vZGUoKTogbnVtYmVyO1xuICBzZXQgbW9kZShtb2RlOiBudW1iZXIpO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZVJlYWQge1xuICByZWxlYXNlKCk6IHZvaWQ7XG5cbiAgZ2V0IGVycm5vKCk6IG51bWJlcjtcbiAgZ2V0IGVycm9yU3RyaW5nKCk6IHN0cmluZztcblxuICBzdXBwb3J0RmlsdGVyQWxsKCk6IHZvaWQ7XG4gIHN1cHBvcnRGb3JtYXRBbGwoKTogdm9pZDtcblxuICBhZGRQYXNzcGhyYXNlKHBhc3NwaHJhc2U6IHN0cmluZyk6IHZvaWQ7XG5cbiAgc2V0IG9ub3BlbihjYWxsYmFjazogQXJjaGl2ZU9wZW5DYWxsYmFjayk7XG4gIHNldCBvbnJlYWQoY2FsbGJhY2s6IEFyY2hpdmVSZWFkQ2FsbGJhY2spO1xuICBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spO1xuXG4gIG9wZW4oKTogdm9pZDtcbiAgY2xvc2UoKTogdm9pZDtcbiAgbmV4dEhlYWRlcigpOiBJQXJjaGl2ZUVudHJ5IHwgdW5kZWZpbmVkO1xuICBkYXRhUmVhZChidWZmZXI6IElBcmNoaXZlQnVmZmVyLCBvZmZzZXQ/OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IG51bWJlcjtcbiAgZGF0YVNraXAoKTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZVdyaXRlIHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIGdldCBlcnJubygpOiBudW1iZXI7XG4gIGdldCBlcnJvclN0cmluZygpOiBzdHJpbmc7XG5cbiAgc2V0IGZvcm1hdCh2YWx1ZTogc3RyaW5nKTtcbiAgc2V0IG9wdGlvbnMob3B0aW9uczogc3RyaW5nKTtcbiAgc2V0IHBhc3NwaHJhc2UocGFzc3BocmFzZTogc3RyaW5nKTtcbiAgYWRkRmlsdGVyKGZpbHRlcjogc3RyaW5nKTogdm9pZDtcbiAgc2V0Rm9ybWF0RmlsdGVyQnlFeHQoZmlsZW5hbWU6IHN0cmluZyk6IHZvaWQ7XG5cbiAgc2V0IG9ub3BlbihjYWxsYmFjazogQXJjaGl2ZU9wZW5DYWxsYmFjayk7XG4gIHNldCBvbndyaXRlKGNhbGxiYWNrOiBBcmNoaXZlV3JpdGVDYWxsYmFjayk7XG4gIHNldCBvbmNsb3NlKGNhbGxiYWNrOiBBcmNoaXZlQ2xvc2VDYWxsYmFjayk7XG5cbiAgb3BlbigpOiB2b2lkO1xuICBjbG9zZSgpOiB2b2lkO1xuICB3cml0ZUhlYWRlcihlbnRyeTogSUFyY2hpdmVFbnRyeSk6IG51bWJlcjtcbiAgd3JpdGVEYXRhKGJ1ZmZlcjogSUFyY2hpdmVCdWZmZXIsIG9mZnNldD86IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZSB7XG4gIG5ld1JlYWQoKTogSUFyY2hpdmVSZWFkO1xuICBuZXdXcml0ZSgpOiBJQXJjaGl2ZVdyaXRlO1xuICBuZXdFbnRyeSgpOiBJQXJjaGl2ZUVudHJ5O1xuICBuZXdCdWZmZXIobGVuZ3RoOiBudW1iZXIpOiBJQXJjaGl2ZUJ1ZmZlcjtcbn07XG5cbmV4cG9ydCB0eXBlIERlY29tcHJlc3NPcHRpb25zID0ge1xuICB2ZXJib3NlPzogYm9vbGVhbjtcbiAgbW9kdWxlVXJsPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgQ29tcHJlc3NPcHRpb25zID0ge1xuICB2ZXJib3NlPzogYm9vbGVhbjtcbiAgbW9kdWxlVXJsPzogc3RyaW5nO1xuICBkaXJlY3Rvcnk/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEVudHJ5SW5mbyB7XG4gIHBhdGhuYW1lOiBzdHJpbmc7XG4gIG1vZGU6IG51bWJlcjtcbiAgc2l6ZT86IG51bWJlcjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmVFeHBvcnQge1xuICAocGFyYW1zPzogc3RyaW5nIHwgQnVmZmVyKTogUHJvbWlzZTxJQXJjaGl2ZT47XG5cbiAgcmVhZG9ubHkgQVJDSElWRV9PSzogbnVtYmVyO1xuICByZWFkb25seSBBUkNISVZFX1JFVFJZOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFSQ0hJVkVfV0FSTjogbnVtYmVyO1xuICByZWFkb25seSBBUkNISVZFX0ZBSUxFRDogbnVtYmVyO1xuICByZWFkb25seSBBUkNISVZFX0ZBVEFMOiBudW1iZXI7XG5cbiAgcmVhZG9ubHkgQUVfSUZNVDogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRlJFRzogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRkxOSzogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRlNPQ0s6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZDSFI6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZCTEs6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZESVI6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZJRk86IG51bWJlcjtcblxuICBkZWNvbXByZXNzKGlucHV0OiBzdHJpbmcgfCBCdWZmZXIsIG91dHB1dD86IHN0cmluZywgb3B0aW9ucz86IERlY29tcHJlc3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcbiAgY29tcHJlc3MoaW5wdXQ6IHN0cmluZyB8IHN0cmluZ1tdLCBvdXRwdXQ6IHN0cmluZywgb3B0aW9ucz86IENvbXByZXNzT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5pbXBvcnQgeyBTdHJpbmdFeHRyYXMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXJjaGl2ZUJhc2Uge1xuICBwcm90ZWN0ZWQgX2NvbnRleHQ6IEFyY2hpdmVDb250ZXh0O1xuICBwcm90ZWN0ZWQgX2FyY2hpdmU6IG51bWJlcjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoY29udGV4dDogQXJjaGl2ZUNvbnRleHQsIGFyY2hpdmU6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuX2FyY2hpdmUgPSBhcmNoaXZlO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHJlbGVhc2UoKTogdm9pZDtcblxuICBwdWJsaWMgZ2V0IG1lbW9yeU9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJjaGl2ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZXJybm8oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX2Vycm5vKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGdldCBlcnJvclN0cmluZygpOiBzdHJpbmcge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lcnJvcl9zdHJpbmcodGhpcy5fYXJjaGl2ZSk7XG4gICAgcmV0dXJuIFN0cmluZ0V4dHJhcy5mcm9tQnVmZmVyKHRoaXMuX2NvbnRleHQubWVtb3J5QnVmZmVyLCBvZmZzZXQpO1xuICB9XG5cbiAgLy8gaGFuZGxlRXZlbnRcbiAgLy8gYWRkRXZlbnRMaXN0bmVyXG4gIC8vIHJlbW92ZUV2ZW50TGlzdGVuZXJcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElBcmNoaXZlQnVmZmVyIH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUNvbnRleHQgfSBmcm9tIFwiLi9BcmNoaXZlQ29udGV4dFwiO1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZUJ1ZmZlciBpbXBsZW1lbnRzIElBcmNoaXZlQnVmZmVyIHtcbiAgcHJpdmF0ZSBfY29udGV4dDogQXJjaGl2ZUNvbnRleHQ7XG4gIHByaXZhdGUgX2J5dGVPZmZzZXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBfYnl0ZUxlbmd0aDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLl9ieXRlT2Zmc2V0ID0gYnl0ZU9mZnNldDtcbiAgICB0aGlzLl9ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyByZWxlYXNlKCkge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZSh0aGlzLl9ieXRlT2Zmc2V0KTtcbiAgfVxuXG4gIGdldCBidWZmZXIoKTogQXJyYXlCdWZmZXIge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0Lm1lbW9yeUJ1ZmZlcjtcbiAgfVxuXG4gIGdldCBieXRlT2Zmc2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2J5dGVPZmZzZXQ7XG4gIH1cblxuICBnZXQgYnl0ZUxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9ieXRlTGVuZ3RoO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBcmNoaXZlT3BlbkNhbGxiYWNrLCBBcmNoaXZlUmVhZENhbGxiYWNrLCBBcmNoaXZlV3JpdGVDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIEFSQ0hJVkVfT0sgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlTmF0aXZlLCBBcmNoaXZlUHRyLCBBcmNoaXZlRW50cnlQdHIgfSBmcm9tIFwiLi9BcmNoaXZlTmF0aXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQnVmZmVyIH0gZnJvbSBcIi4vQXJjaGl2ZUJ1ZmZlclwiO1xuXG50eXBlIEFyY2hpdmVSZWFkQ2FsYmFja3MgPSB7XG4gIG9wZW5lcj86IEFyY2hpdmVPcGVuQ2FsbGJhY2ssXG4gIHJlYWRlcj86IEFyY2hpdmVSZWFkQ2FsbGJhY2ssXG4gIGNsb3Nlcj86IEFyY2hpdmVDbG9zZUNhbGxiYWNrLFxufTtcblxudHlwZSBBcmNoaXZlV3JpdGVDYWxiYWNrcyA9IHtcbiAgb3BlbmVyPzogQXJjaGl2ZU9wZW5DYWxsYmFjayxcbiAgd3JpdGVyPzogQXJjaGl2ZVdyaXRlQ2FsbGJhY2ssXG4gIGNsb3Nlcj86IEFyY2hpdmVDbG9zZUNhbGxiYWNrLFxufTtcblxuY2xhc3MgQXJjaGl2ZUNhbGxiYWNrcyB7XG4gIHByaXZhdGUgX21hcCA9IG5ldyBNYXA8bnVtYmVyLCBBcmNoaXZlUmVhZENhbGJhY2tzIHwgQXJjaGl2ZVdyaXRlQ2FsYmFja3M+O1xuXG4gIHB1YmxpYyBnZXQoYXJjaGl2ZTogbnVtYmVyKTogQXJjaGl2ZVJlYWRDYWxiYWNrcyB8IEFyY2hpdmVXcml0ZUNhbGJhY2tzIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9tYXAuZ2V0KGFyY2hpdmUpO1xuICAgIGlmICghY2FsbGJhY2tzKVxuICAgICAgdGhyb3cgRXJyb3IoYEhhbmRsZSAke2FyY2hpdmV9IGRvZXMgbm90IGV4aXN0c2ApO1xuICAgIHJldHVybiBjYWxsYmFja3M7XG4gIH1cblxuICBwdWJsaWMgc2V0KGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2tzOiBBcmNoaXZlUmVhZENhbGJhY2tzIHwgQXJjaGl2ZVdyaXRlQ2FsYmFja3MpIHtcbiAgICBpZiAoIWFyY2hpdmUpXG4gICAgICB0aHJvdyBFcnJvcihgSGFuZGxlIGlzIG51bGxgKTtcbiAgICBpZiAodGhpcy5fbWFwLmhhcyhhcmNoaXZlKSlcbiAgICAgIHRocm93IEVycm9yKGBIYW5kbGUgJHthcmNoaXZlfSBpcyByZWdpc3RyZWRgKTtcbiAgICB0aGlzLl9tYXAuc2V0KGFyY2hpdmUsIGNhbGxiYWNrcyk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlKGFyY2hpdmU6IG51bWJlcikge1xuICAgIHRoaXMuX21hcC5kZWxldGUoYXJjaGl2ZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBBcmNoaXZlQ29udGV4dCB7XG4gIHByaXZhdGUgX25hdGl2ZTogQXJjaGl2ZU5hdGl2ZTtcbiAgcHJpdmF0ZSBfbWVtb3J5OiBXZWJBc3NlbWJseS5NZW1vcnk7XG4gIHByaXZhdGUgX2NhbGxiYWNrcyA9IG5ldyBBcmNoaXZlQ2FsbGJhY2tzO1xuICBwcml2YXRlIF9yZWFkQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXk7XG5cbiAgY29uc3RydWN0b3IobmF0aXZlOiBBcmNoaXZlTmF0aXZlLCBtZW1vcnk6IFdlYkFzc2VtYmx5Lk1lbW9yeSkge1xuICAgIHRoaXMuX25hdGl2ZSA9IG5hdGl2ZTtcbiAgICB0aGlzLl9tZW1vcnkgPSBtZW1vcnk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1lbW9yeUJ1ZmZlcigpOiBBcnJheUJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX21lbW9yeS5idWZmZXI7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV92ZXJzaW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3ZlcnNpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3ZlcnNpb25fZGV0YWlscygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV92ZXJzaW9uX2RldGFpbHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2Vycm5vKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2Vycm5vKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZXJyb3Jfc3RyaW5nKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2Vycm9yX3N0cmluZyhhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX29wZW5faGFuZGxlcihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGNsaWVudCA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSk7XG4gICAgcmV0dXJuIGNsaWVudC5vcGVuZXIgPyBjbGllbnQub3BlbmVyKCkgOiAwO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9oYW5kbGVyKGFyY2hpdmU6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5fcmVhZEJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVJlYWRDYWxiYWNrcztcbiAgICAgIGlmICghY2xpZW50LnJlYWRlcilcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICBjb25zdCBidWYgPSBjbGllbnQucmVhZGVyKCk7XG4gICAgICBpZiAoIWJ1ZilcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB0aGlzLl9yZWFkQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICB9XG5cbiAgICBjb25zdCBuID0gTWF0aC5taW4oc2l6ZSwgdGhpcy5fcmVhZEJ1ZmZlci5sZW5ndGgpO1xuICAgIGNvbnN0IGRzdCA9IG5ldyBVaW50OEFycmF5KHRoaXMuX21lbW9yeS5idWZmZXIsIG9mZnNldCwgbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspXG4gICAgICBkc3RbaV0gPSB0aGlzLl9yZWFkQnVmZmVyW2ldO1xuXG4gICAgdGhpcy5fcmVhZEJ1ZmZlciA9IHRoaXMuX3JlYWRCdWZmZXIuc2xpY2Uobik7XG4gICAgcmV0dXJuIG47XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2xhc3RfZXJyb3IoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9sYXN0X2Vycm9yKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfaGFuZGxlcihhcmNoaXZlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVdyaXRlQ2FsYmFja3M7XG4gICAgaWYgKGNhbGxiYWNrcy53cml0ZXIpXG4gICAgICBjYWxsYmFja3Mud3JpdGVyKG5ldyBBcmNoaXZlQnVmZmVyKHRoaXMsIG9mZnNldCwgc2l6ZSkpXG4gICAgcmV0dXJuIHNpemU7XG4gIH07XG5cbiAgcHVibGljIGFyY2hpdmVfY2xvc2VfaGFuZGxlcihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGNsaWVudCA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSk7XG4gICAgcmV0dXJuIGNsaWVudC5jbG9zZXIgPyBjbGllbnQuY2xvc2VyKCkgOiAwO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9uZXcoKTogQXJjaGl2ZVB0ciB7XG4gICAgY29uc3QgYXJjaGl2ZSA9IHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfbmV3KCk7XG4gICAgaWYgKGFyY2hpdmUpIHtcbiAgICAgIGNvbnN0IGltcGw6IEFyY2hpdmVSZWFkQ2FsYmFja3MgPSB7fTtcbiAgICAgIHRoaXMuX2NhbGxiYWNrcy5zZXQoYXJjaGl2ZSwgaW1wbCk7XG4gICAgfVxuICAgIHJldHVybiBhcmNoaXZlO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9mcmVlKGFyY2hpdmU6IG51bWJlcikge1xuICAgIHRoaXMuX2NhbGxiYWNrcy5kZWxldGUoYXJjaGl2ZSk7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9mcmVlKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9hZGRfcGFzc3BocmFzZShhcmNoaXZlOiBBcmNoaXZlUHRyLCBwYXNzcGhyYXNlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX2FkZF9wYXNzcGhyYXNlKGFyY2hpdmUsIHBhc3NwaHJhc2UpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9zdXBwb3J0X2ZpbHRlcl9hbGwoYXJjaGl2ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfc3VwcG9ydF9maWx0ZXJfYWxsKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9zdXBwb3J0X2Zvcm1hdF9hbGwoYXJjaGl2ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfc3VwcG9ydF9mb3JtYXRfYWxsKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9vcGVuKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfb3BlbihhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfY2xvc2UoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9jbG9zZShhcmNoaXZlKTtcbiAgfVxuICBcbiAgcHVibGljIGFyY2hpdmVfcmVhZF9uZXh0X2hlYWRlcihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX25leHRfaGVhZGVyKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9kYXRhKGFyY2hpdmU6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfZGF0YShhcmNoaXZlLCBvZmZzZXQsIHNpemUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9kYXRhX3NraXAoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9kYXRhX3NraXAoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX3NldF9vcGVuX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVSZWFkQ2FsYmFja3M7XG4gICAgY2FsbGJhY2tzLm9wZW5lciA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9zZXRfcmVhZF9jYWxsYmFjayhhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrOiBBcmNoaXZlUmVhZENhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlUmVhZENhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy5yZWFkZXIgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfc2V0X2Nsb3NlX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVDbG9zZUNhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlUmVhZENhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy5jbG9zZXIgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX25ldygpOiBBcmNoaXZlUHRyIHtcbiAgICBjb25zdCBhcmNoaXZlID0gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfbmV3KCk7XG4gICAgaWYgKGFyY2hpdmUpIHtcbiAgICAgIGNvbnN0IGltcGw6IEFyY2hpdmVXcml0ZUNhbGJhY2tzID0ge307XG4gICAgICB0aGlzLl9jYWxsYmFja3Muc2V0KGFyY2hpdmUsIGltcGwpO1xuICAgIH1cbiAgICByZXR1cm4gYXJjaGl2ZTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX2ZyZWUoYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzLmRlbGV0ZShhcmNoaXZlKTtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9mcmVlKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X29wdGlvbnMoYXJjaGl2ZTogbnVtYmVyLCBvcHRpb25zOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9zZXRfb3B0aW9ucyhhcmNoaXZlLCBvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF9wYXNzcGhyYXNlKGFyY2hpdmU6IG51bWJlciwgcGFzc3BocmFzZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfc2V0X3Bhc3NwaHJhc2UoYXJjaGl2ZSwgcGFzc3BocmFzZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2J5X25hbWUoYXJjaGl2ZTogbnVtYmVyLCBuYW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2J5X25hbWUoYXJjaGl2ZSwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9hZGRfZmlsdGVyX2J5X25hbWUoYXJjaGl2ZTogbnVtYmVyLCBuYW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9hZGRfZmlsdGVyX2J5X25hbWUoYXJjaGl2ZSwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2ZpbHRlcl9ieV9leHQoYXJjaGl2ZTogbnVtYmVyLCBmaWxlbmFtZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9maWx0ZXJfYnlfZXh0KGFyY2hpdmUsIGZpbGVuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF9vcGVuX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVXcml0ZUNhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy5vcGVuZXIgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF93cml0ZV9jYWxsYmFjayhhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrOiBBcmNoaXZlV3JpdGVDYWxsYmFjayk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVdyaXRlQ2FsYmFja3M7XG4gICAgY2FsbGJhY2tzLndyaXRlciA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X2Nsb3NlX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVDbG9zZUNhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlV3JpdGVDYWxiYWNrcztcbiAgICBjYWxsYmFja3MuY2xvc2VyID0gY2FsbGJhY2s7XG4gIH1cbiAgXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX29wZW4oYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfb3BlbihhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX2Nsb3NlKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX2Nsb3NlKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfaGVhZGVyKGFyY2hpdmU6IG51bWJlciwgZW50cnk6IEFyY2hpdmVFbnRyeVB0cik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX2hlYWRlcihhcmNoaXZlLCBlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9kYXRhKGFyY2hpdmU6IEFyY2hpdmVQdHIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9kYXRhKGFyY2hpdmUsIG9mZnNldCwgc2l6ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9uZXcoKTogQXJjaGl2ZUVudHJ5UHRyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfbmV3KCk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9mcmVlKGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpIHtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9mcmVlKGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X3BhdGhuYW1lX3V0ZjgoZW50cnk6IEFyY2hpdmVFbnRyeVB0cik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3BhdGhuYW1lX3V0ZjgoZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfc2V0X3BhdGhuYW1lX3V0ZjgoZW50cnk6IEFyY2hpdmVFbnRyeVB0ciwgcGF0aG5hbWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3NldF9wYXRobmFtZV91dGY4KGVudHJ5LCBwYXRobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9zaXplKGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpOiBudW1iZXIge1xuICAgIGNvbnN0IGxvID0gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfc2l6ZV9sbyhlbnRyeSk7XG4gICAgY29uc3QgaGkgPSB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zaXplX2hpKGVudHJ5KTtcbiAgICByZXR1cm4gaGkgKiA0Mjk0OTY3Mjk2ICsgbG87XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9zZXRfc2l6ZShlbnRyeTogQXJjaGl2ZUVudHJ5UHRyLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zZXRfc2l6ZShlbnRyeSwgMCwgc2l6ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9zaXplX2lzX3NldChlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfc2l6ZV9pc19zZXQoZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfbW9kZShlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfbW9kZShlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9zZXRfbW9kZShlbnRyeTogQXJjaGl2ZUVudHJ5UHRyLCBtb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zZXRfbW9kZShlbnRyeSwgbW9kZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9idWZmZXJfbmV3KHNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2J1ZmZlcl9uZXcoc2l6ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9idWZmZXJfZnJlZShidWZmZXI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2J1ZmZlcl9mcmVlKGJ1ZmZlcik7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9idWZmZXJfZnJvbShzdHI6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcjtcbiAgICBjb25zdCBieXRlcyA9IGVuY29kZXIuZW5jb2RlKHN0ciArIFwiXFx4MDBcIik7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fbmF0aXZlLmFyY2hpdmVfYnVmZmVyX25ldyhieXRlcy5sZW5ndGgpO1xuICAgIGlmIChvZmZzZXQpXG4gICAgICAobmV3IFVpbnQ4QXJyYXkodGhpcy5fbWVtb3J5LmJ1ZmZlciwgb2Zmc2V0LCBieXRlcy5sZW5ndGgpKS5zZXQoYnl0ZXMpO1xuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElBcmNoaXZlRW50cnkgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5pbXBvcnQgeyBBcmNoaXZlRW50cnlQdHIgfSBmcm9tIFwiLi9BcmNoaXZlTmF0aXZlXCI7XG5pbXBvcnQgeyBOT19NRU1PUlksIFN0cmluZ0V4dHJhcyB9IGZyb20gXCIuL1V0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBBcmNoaXZlRW50cnkgaW1wbGVtZW50cyBJQXJjaGl2ZUVudHJ5IHtcbiAgcHJpdmF0ZSBfY29udGV4dDogQXJjaGl2ZUNvbnRleHQ7XG4gIHByaXZhdGUgX2VudHJ5OiBBcmNoaXZlRW50cnlQdHI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEFyY2hpdmVDb250ZXh0LCBlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKSB7XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5fZW50cnkgPSBlbnRyeTtcbiAgfVxuXG4gIHB1YmxpYyByZWxlYXNlKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9mcmVlKHRoaXMuX2VudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWVtb3J5T2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9lbnRyeTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGF0aG5hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBwYXRobmFtZVB0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9wYXRobmFtZV91dGY4KHRoaXMuX2VudHJ5KTtcbiAgICBpZiAocGF0aG5hbWVQdHIpIHtcbiAgICAgIHJldHVybiBTdHJpbmdFeHRyYXMuZnJvbUJ1ZmZlcih0aGlzLl9jb250ZXh0Lm1lbW9yeUJ1ZmZlciwgcGF0aG5hbWVQdHIpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgcGF0aG5hbWUocGF0aG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHBhdGhuYW1lUHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKHBhdGhuYW1lKTtcbiAgICBpZiAoIXBhdGhuYW1lUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfc2V0X3BhdGhuYW1lX3V0ZjgodGhpcy5fZW50cnksIHBhdGhuYW1lUHRyKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2l6ZSgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfc2l6ZV9pc19zZXQodGhpcy5fZW50cnkpKVxuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9zaXplKHRoaXMuX2VudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc2l6ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3NldF9zaXplKHRoaXMuX2VudHJ5LCB2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1vZGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X21vZGUodGhpcy5fZW50cnkpO1xuICB9XG5cbiAgcHVibGljIHNldCBtb2RlKG1vZGU6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9zZXRfbW9kZSh0aGlzLl9lbnRyeSwgbW9kZSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElBcmNoaXZlIH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZU5hdGl2ZSB9IGZyb20gXCIuL0FyY2hpdmVOYXRpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcbmltcG9ydCB7IEFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlQnVmZmVyXCI7XG5pbXBvcnQgeyBBcmNoaXZlRW50cnkgfSBmcm9tIFwiLi9BcmNoaXZlRW50cnlcIjtcbmltcG9ydCB7IEFyY2hpdmVSZWFkIH0gZnJvbSBcIi4vQXJjaGl2ZVJlYWRcIjtcbmltcG9ydCB7IEFyY2hpdmVXcml0ZSB9IGZyb20gXCIuL0FyY2hpdmVXcml0ZVwiO1xuaW1wb3J0IHsgTk9fTUVNT1JZLCBTdHJpbmdFeHRyYXMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZSBpbXBsZW1lbnRzIElBcmNoaXZlIHtcbiAgcHJpdmF0ZSBfY29udGV4dDogQXJjaGl2ZUNvbnRleHQ7XG4gIHByaXZhdGUgX3ZlcnNpb24gPSBcIlwiO1xuICBwcml2YXRlIF92ZXJzaW9uRGV0YWlscyA9IFwiXCI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEFyY2hpdmVDb250ZXh0KSB7XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZlcnNpb24oKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuX3ZlcnNpb24pIHtcbiAgICAgIGNvbnN0IHZlcnNpb25QdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfdmVyc2lvbigpO1xuICAgICAgdGhpcy5fdmVyc2lvbiA9IFN0cmluZ0V4dHJhcy5mcm9tQnVmZmVyKHRoaXMuX2NvbnRleHQubWVtb3J5QnVmZmVyLCB2ZXJzaW9uUHRyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3ZlcnNpb247XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZlcnNpb25EZXRhaWxzKCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLl92ZXJzaW9uRGV0YWlscykge1xuICAgICAgY29uc3QgdmVyc2lvbkRldGFpbHNQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfdmVyc2lvbl9kZXRhaWxzKCk7XG4gICAgICB0aGlzLl92ZXJzaW9uRGV0YWlscyA9IFN0cmluZ0V4dHJhcy5mcm9tQnVmZmVyKHRoaXMuX2NvbnRleHQubWVtb3J5QnVmZmVyLCB2ZXJzaW9uRGV0YWlsc1B0cik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl92ZXJzaW9uRGV0YWlscztcbiAgfVxuXG4gIHB1YmxpYyBuZXdSZWFkKCk6IEFyY2hpdmVSZWFkIHtcbiAgICBjb25zdCBhcmNoaXZlX3JlYWQgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9uZXcoKTtcbiAgICBpZiAoIWFyY2hpdmVfcmVhZClcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIHJldHVybiBuZXcgQXJjaGl2ZVJlYWQodGhpcy5fY29udGV4dCwgYXJjaGl2ZV9yZWFkKTtcbiAgfVxuXG4gIHB1YmxpYyBuZXdXcml0ZSgpOiBBcmNoaXZlV3JpdGUge1xuICAgIGNvbnN0IGFyY2hpdmVfd3JpdGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfbmV3KCk7XG4gICAgaWYgKCFhcmNoaXZlX3dyaXRlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgcmV0dXJuIG5ldyBBcmNoaXZlV3JpdGUodGhpcy5fY29udGV4dCwgYXJjaGl2ZV93cml0ZSk7XG4gIH1cblxuICBwdWJsaWMgbmV3RW50cnkoKTogQXJjaGl2ZUVudHJ5IHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9uZXcoKTtcbiAgICBpZiAoIWVudHJ5KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgcmV0dXJuIG5ldyBBcmNoaXZlRW50cnkodGhpcy5fY29udGV4dCwgZW50cnkpO1xuICB9XG5cbiAgcHVibGljIG5ld0J1ZmZlcihsZW5ndGg6IG51bWJlcik6IEFyY2hpdmVCdWZmZXIge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfbmV3KGxlbmd0aCk7XG4gICAgaWYgKCFvZmZzZXQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICByZXR1cm4gbmV3IEFyY2hpdmVCdWZmZXIodGhpcy5fY29udGV4dCwgb2Zmc2V0LCBsZW5ndGgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBpbnN0YW50aWF0ZShidWZmZXI6IEJ1ZmZlciB8IEFycmF5QnVmZmVyKTogUHJvbWlzZTxBcmNoaXZlPiB7XG4gICAgbGV0IGNvbnRleHQ6IEFyY2hpdmVDb250ZXh0O1xuXG4gICAgY29uc3QgaW1wb3J0T2JqZWN0ID0ge1xuICAgICAgZW52OiB7XG4gICAgICAgIGFyY2hpdmVfb3Blbl9oYW5kbGVyOiAoYXJjaGl2ZTogbnVtYmVyKSA9PiBjb250ZXh0LmFyY2hpdmVfb3Blbl9oYW5kbGVyKGFyY2hpdmUpLFxuICAgICAgICBhcmNoaXZlX3JlYWRfaGFuZGxlcjogKGFyY2hpdmU6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcikgPT4gY29udGV4dC5hcmNoaXZlX3JlYWRfaGFuZGxlcihhcmNoaXZlLCBvZmZzZXQsIHNpemUpLFxuICAgICAgICBhcmNoaXZlX3dyaXRlX2hhbmRsZXI6IChhcmNoaXZlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpID0+IGNvbnRleHQuYXJjaGl2ZV93cml0ZV9oYW5kbGVyKGFyY2hpdmUsIG9mZnNldCwgc2l6ZSksXG4gICAgICAgIGFyY2hpdmVfY2xvc2VfaGFuZGxlcjogKGFyY2hpdmU6IG51bWJlcikgPT4gY29udGV4dC5hcmNoaXZlX2Nsb3NlX2hhbmRsZXIoYXJjaGl2ZSksXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBpbnN0U291cmNlID0gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoYnVmZmVyLCBpbXBvcnRPYmplY3QpO1xuICAgIGNvbnN0IG5hdGl2ZSA9IGluc3RTb3VyY2UuaW5zdGFuY2UuZXhwb3J0cyBhcyBBcmNoaXZlTmF0aXZlO1xuICAgIGNvbnRleHQgPSBuZXcgQXJjaGl2ZUNvbnRleHQobmF0aXZlLCBuYXRpdmUubWVtb3J5KTtcblxuICAgIHJldHVybiBuZXcgQXJjaGl2ZShjb250ZXh0KTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQXJjaGl2ZU9wZW5DYWxsYmFjaywgQXJjaGl2ZVJlYWRDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIElBcmNoaXZlUmVhZCwgQVJDSElWRV9PSyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcbmltcG9ydCB7IEFyY2hpdmVCYXNlIH0gZnJvbSBcIi4vQXJjaGl2ZUJhc2VcIjtcbmltcG9ydCB7IEFyY2hpdmVFbnRyeSB9IGZyb20gXCIuL0FyY2hpdmVFbnRyeVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUJ1ZmZlciB9IGZyb20gXCIuL0FyY2hpdmVCdWZmZXJcIjtcbmltcG9ydCB7IGVycm9yQ29kZVRvU3RyaW5nLCBOT19NRU1PUlkgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZVJlYWQgZXh0ZW5kcyBBcmNoaXZlQmFzZSBpbXBsZW1lbnRzIElBcmNoaXZlUmVhZCB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgc3VwZXIoY29udGV4dCwgYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9mcmVlKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHN1cHBvcnRGaWx0ZXJBbGwoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZmlsdGVyX2FsbCh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBzdXBwb3J0Rm9ybWF0QWxsKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zdXBwb3J0X2Zvcm1hdF9hbGwodGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUGFzc3BocmFzZShwYXNzcGhyYXNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBwYXNzcGhyYXNlUHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKHBhc3NwaHJhc2UpO1xuICAgIGlmICghcGFzc3BocmFzZVB0cikgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX2FkZF9wYXNzcGhyYXNlKHRoaXMuX2FyY2hpdmUsIHBhc3NwaHJhc2VQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShwYXNzcGhyYXNlUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX29wZW4odGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGNvZGUgIT09IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfY2xvc2UodGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgbmV4dEhlYWRlcigpOiBBcmNoaXZlRW50cnkgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfbmV4dF9oZWFkZXIodGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGVudHJ5KVxuICAgICAgcmV0dXJuIG5ldyBBcmNoaXZlRW50cnkodGhpcy5fY29udGV4dCwgZW50cnkpO1xuXG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX2xhc3RfZXJyb3IodGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGNvZGUgIT09IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGF0YVJlYWQoYnVmZmVyOiBBcmNoaXZlQnVmZmVyLCBvZmZzZXQ/OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IG51bWJlciB7XG4gICAgb2Zmc2V0ID0gYnVmZmVyLmJ5dGVPZmZzZXQgKyAob2Zmc2V0IHx8IDApO1xuICAgIGxlbmd0aCA9IGxlbmd0aCB8fCBidWZmZXIuYnl0ZUxlbmd0aDtcblxuICAgIGNvbnN0IG4gPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9kYXRhKHRoaXMuX2FyY2hpdmUsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhuKSB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG47XG4gIH1cblxuICBwdWJsaWMgZGF0YVNraXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfZGF0YV9za2lwKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHNldCBvbm9wZW4oY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zZXRfb3Blbl9jYWxsYmFjayh0aGlzLl9hcmNoaXZlLCBjYWxsYmFjayk7XG4gIH1cblxuICBwdWJsaWMgc2V0IG9ucmVhZChjYWxsYmFjazogQXJjaGl2ZVJlYWRDYWxsYmFjaykge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3NldF9yZWFkX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zZXRfY2xvc2VfY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJQXJjaGl2ZVdyaXRlLCBBcmNoaXZlT3BlbkNhbGxiYWNrLCBBcmNoaXZlV3JpdGVDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIEFSQ0hJVkVfT0sgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5pbXBvcnQgeyBBcmNoaXZlQmFzZSB9IGZyb20gXCIuL0FyY2hpdmVCYXNlXCI7XG5pbXBvcnQgeyBBcmNoaXZlRW50cnkgfSBmcm9tIFwiLi9BcmNoaXZlRW50cnlcIjtcbmltcG9ydCB7IEFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlQnVmZmVyXCI7XG5pbXBvcnQgeyBOT19NRU1PUlksIGVycm9yQ29kZVRvU3RyaW5nIH0gZnJvbSBcIi4vVXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEFyY2hpdmVXcml0ZSBleHRlbmRzIEFyY2hpdmVCYXNlIGltcGxlbWVudHMgSUFyY2hpdmVXcml0ZSB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgc3VwZXIoY29udGV4dCwgYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfZnJlZSh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgZm9ybWF0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKHZhbHVlKTtcbiAgICBpZiAoIW5hbWUpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9ieV9uYW1lKHRoaXMuX2FyY2hpdmUsIG5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShuYW1lKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBvcHRpb25zKG9wdGlvbnM6IHN0cmluZykge1xuICAgIGNvbnN0IG9wdGlvbnNQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9vcHRpb25zKHRoaXMuX2FyY2hpdmUsIG9wdGlvbnNQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShvcHRpb25zUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBwYXNzcGhyYXNlKHBhc3NwaHJhc2U6IHN0cmluZykge1xuICAgIGNvbnN0IHBhc3NwaHJhc2VQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ocGFzc3BocmFzZSk7XG4gICAgaWYgKCFwYXNzcGhyYXNlUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9wYXNzcGhyYXNlKHRoaXMuX2FyY2hpdmUsIHBhc3NwaHJhc2VQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShwYXNzcGhyYXNlUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZEZpbHRlcihmaWx0ZXI6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20oZmlsdGVyKTtcbiAgICBpZiAoIW5hbWUpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfYWRkX2ZpbHRlcl9ieV9uYW1lKHRoaXMuX2FyY2hpdmUsIG5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShuYW1lKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldEZvcm1hdEZpbHRlckJ5RXh0KGZpbGVuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmbmFtZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJvbShmaWxlbmFtZSk7XG4gICAgaWYgKCFmbmFtZSkgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2ZpbHRlcl9ieV9leHQodGhpcy5fYXJjaGl2ZSwgZm5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShmbmFtZSk7XG4gICAgaWYgKGNvZGUgIT0gQVJDSElWRV9PSykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuZXJyb3JTdHJpbmcsIHsgY2F1c2U6IGVycm9yQ29kZVRvU3RyaW5nKGNvZGUpIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25vcGVuKGNhbGxiYWNrOiBBcmNoaXZlT3BlbkNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9vcGVuX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb253cml0ZShjYWxsYmFjazogQXJjaGl2ZVdyaXRlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X3dyaXRlX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X29wZW5fY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9vcGVuKHRoaXMuX2FyY2hpdmUpO1xuICAgIGlmIChjb2RlICE9PSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9jbG9zZSh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZUhlYWRlcihlbnRyeTogQXJjaGl2ZUVudHJ5KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX2hlYWRlcih0aGlzLl9hcmNoaXZlLCBlbnRyeS5tZW1vcnlPZmZzZXQpO1xuICB9XG5cbiAgcHVibGljIHdyaXRlRGF0YShidWZmZXI6IEFyY2hpdmVCdWZmZXIsIG9mZnNldD86IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBvZmZzZXQgPSBidWZmZXIuYnl0ZU9mZnNldCArIChvZmZzZXQgfHwgMCk7XG4gICAgbGVuZ3RoID0gbGVuZ3RoIHx8IGJ1ZmZlci5ieXRlTGVuZ3RoIC0gb2Zmc2V0O1xuXG4gICAgY29uc3QgbiA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9kYXRhKHRoaXMuX2FyY2hpdmUsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhuKSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbjtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQVJDSElWRV9PSywgQVJDSElWRV9SRVRSWSwgQVJDSElWRV9XQVJOLCBBUkNISVZFX0ZBSUxFRCwgQVJDSElWRV9GQVRBTCB9IGZyb20gXCIuL0FyY2hpdmVcIjtcblxuZXhwb3J0IGNvbnN0IE5PX01FTU9SWSA9IFwiTm8gTWVtb3J5XCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3RyaW5nRXh0cmFzIHsgXG5leHBvcnQgZnVuY3Rpb24gZnJvbUJ1ZmZlcihidWZmZXI6IEFycmF5QnVmZmVyLCBvZmZzZXQ6IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogc3RyaW5nXG57XG4gIGxldCBieXRlczogVWludDhBcnJheTtcblxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwO1xuICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCBvZmZzZXQpO1xuICAgIHdoaWxlIChieXRlc1tsZW5ndGhdKVxuICAgICAgbGVuZ3RoKys7XG4gIH1cblxuICBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgpO1xuICBpZiAoYnVmZmVyIGluc3RhbmNlb2YgU2hhcmVkQXJyYXlCdWZmZXIpIHtcbiAgICBjb25zdCBjb3B5Qnl0ZXMgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgIGNvcHlCeXRlcy5zZXQoYnl0ZXMpO1xuICAgIGJ5dGVzID0gY29weUJ5dGVzO1xuICB9XG5cbiAgcmV0dXJuIChuZXcgVGV4dERlY29kZXIoXCJ1dGYtOFwiKSkuZGVjb2RlKGJ5dGVzKTtcbn1cbn0gLy8gbmFtZXNwYWNlIFN0cmluZ0V4dHJhc1xuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JDb2RlVG9TdHJpbmcoY29kZTogbnVtYmVyKTogc3RyaW5nXG57XG4gIHN3aXRjaCAoY29kZSkge1xuICBjYXNlIEFSQ0hJVkVfT0s6XG4gICAgcmV0dXJuIFwiQVJDSElWRV9PS1wiO1xuICBjYXNlIEFSQ0hJVkVfUkVUUlk6XG4gICAgcmV0dXJuIFwiQVJDSElWRV9SRVRSWVwiO1xuICBjYXNlIEFSQ0hJVkVfV0FSTjpcbiAgICByZXR1cm4gXCJBUkNISVZFX1dBUk5cIjtcbiAgY2FzZSBBUkNISVZFX0ZBSUxFRDpcbiAgICByZXR1cm4gXCJBUkNISVZFX0ZBSUxFRFwiO1xuICBjYXNlIEFSQ0hJVkVfRkFUQUw6XG4gICAgcmV0dXJuIFwiQVJDSElWRV9GQVRBTFwiO1xuICB9XG5cbiAgaWYgKGNvZGUgPCAwKVxuICAgIHJldHVybiBcIkFSQ0hJVkVfXCIgKyAoLWNvZGUpO1xuXG4gIHRocm93IG5ldyBFcnJvcihgRXJyb3IgY29kZSAke2NvZGV9IG11c3QgYmUgbmVnYXRpdmVgKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiZ2xvYmFsLmQudHNcIiAvPlxuXG5pbXBvcnQgeyBJQXJjaGl2ZSwgSUFyY2hpdmVFeHBvcnQsIERlY29tcHJlc3NPcHRpb25zLCBDb21wcmVzc09wdGlvbnMgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlIH0gZnJvbSBcIi4vQXJjaGl2ZUltcGxcIjtcbmltcG9ydCB7IEFSQ0hJVkVfT0ssIEFSQ0hJVkVfUkVUUlksIEFSQ0hJVkVfV0FSTiwgQVJDSElWRV9GQUlMRUQsIEFSQ0hJVkVfRkFUQUwgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBRV9JRk1ULCBBRV9JRlJFRywgQUVfSUZMTkssIEFFX0lGU09DSywgQUVfSUZDSFIsIEFFX0lGQkxLLCBBRV9JRkRJUiwgQUVfSUZJRk8gfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoQnVmZmVyKHN0cjogc3RyaW5nKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHN0cik7XG4gIHJldHVybiByZXNwb25zZS5hcnJheUJ1ZmZlcigpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBuZXdBcmNoaXZlQ29udGV4dChwYXJhbXM6IHN0cmluZyB8IEFycmF5QnVmZmVyKTogUHJvbWlzZTxJQXJjaGl2ZT4ge1xuICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIilcbiAgICBwYXJhbXMgPSBhd2FpdCBmZXRjaEJ1ZmZlcihwYXJhbXMpO1xuICByZXR1cm4gQXJjaGl2ZS5pbnN0YW50aWF0ZShwYXJhbXMpO1xufVxuXG5sZXQgZ19hcmNoaXZlOiBJQXJjaGl2ZTtcbmFzeW5jIGZ1bmN0aW9uIGdldEFyY2hpdmVDb250ZXh0KHBhcmFtcz86IHN0cmluZyB8IEFycmF5QnVmZmVyKTogUHJvbWlzZTxJQXJjaGl2ZT4ge1xuICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbmV3QXJjaGl2ZUNvbnRleHQocGFyYW1zKTtcbiAgfVxuXG4gIGlmICghZ19hcmNoaXZlKSB7XG4gICAgZ19hcmNoaXZlID0gYXdhaXQgbmV3QXJjaGl2ZUNvbnRleHQoTElCQVJDSElWRV9XQVNNX0ZJTEVOQU1FKTtcbiAgfVxuXG4gIHJldHVybiBnX2FyY2hpdmU7XG59XG5cbmNvbnN0IGxpYmFyY2hpdmU6IElBcmNoaXZlRXhwb3J0ID0gT2JqZWN0LmFzc2lnbihnZXRBcmNoaXZlQ29udGV4dCwge1xuICBBUkNISVZFX09LLFxuICBBUkNISVZFX1JFVFJZLFxuICBBUkNISVZFX1dBUk4sXG4gIEFSQ0hJVkVfRkFJTEVELFxuICBBUkNISVZFX0ZBVEFMLFxuXG4gIEFFX0lGTVQsXG4gIEFFX0lGUkVHLFxuICBBRV9JRkxOSyxcbiAgQUVfSUZTT0NLLFxuICBBRV9JRkNIUixcbiAgQUVfSUZCTEssXG4gIEFFX0lGRElSLFxuICBBRV9JRklGTyxcblxuICBhc3luYyBkZWNvbXByZXNzKGlucHV0OiBzdHJpbmcgfCBBcnJheUJ1ZmZlciwgb3V0cHV0Pzogc3RyaW5nLCBvcHRpb25zPzogRGVjb21wcmVzc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zb2xlLmxvZyhcIklBcmNoaXZlRXhwb3J0LmRlY29tcHJlc3NcIik7XG4gICAgY29uc3QgY29udGV4dCA9IGF3YWl0IGdldEFyY2hpdmVDb250ZXh0KG9wdGlvbnM/Lm1vZHVsZVVybCk7XG4gICAgLy9yZXR1cm4gQXJjaGl2ZU9wZXJhdGlvbnMuZGVjb21wcmVzcyh3ZWJGcywgYXdhaXQgbmV3QXJjaGl2ZUNvbnRleHQoKSwgaW5wdXQsIG91dHB1dCwgb3B0aW9ucyk7XG4gIH0sXG5cbiAgYXN5bmMgY29tcHJlc3MoaW5wdXQ6IHN0cmluZyB8IHN0cmluZ1tdLCBvdXRwdXQ6IHN0cmluZywgb3B0aW9ucz86IENvbXByZXNzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKFwiSUFyY2hpdmVFeHBvcnQuY29tcHJlc3NcIik7XG4gICAgY29uc3QgY29udGV4dCA9IGF3YWl0IGdldEFyY2hpdmVDb250ZXh0KG9wdGlvbnM/Lm1vZHVsZVVybCk7XG4gICAgLy9yZXR1cm4gQXJjaGl2ZU9wZXJhdGlvbnMuY29tcHJlc3Mod2ViRnMsIGF3YWl0IG5ld0FyY2hpdmVDb250ZXh0KCksIGlucHV0LCBvdXRwdXQsIG9wdGlvbnMpO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGxpYmFyY2hpdmU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=