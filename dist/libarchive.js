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
        console.log("IArchiveExport.decompress");
        //return ArchiveOperations.decompress(webFs, await newArchiveContext(), input, output, options);
    },
    async compress(input, output, options) {
        console.log("IArchiveExport.compress");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliYXJjaGl2ZS5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTs7Ozs7OztHQU9HO0FBRUksTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLE1BQU0sYUFBYSxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQzFCLE1BQU0sWUFBWSxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ3pCLE1BQU0sY0FBYyxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQzNCLE1BQU0sYUFBYSxHQUFHLENBQUMsRUFBRSxDQUFDO0FBRTFCLE1BQU0sT0FBTyxHQUFLLE1BQU0sQ0FBQztBQUN6QixNQUFNLFFBQVEsR0FBSSxNQUFNLENBQUM7QUFDekIsTUFBTSxRQUFRLEdBQUksTUFBTSxDQUFDO0FBQ3pCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUN6QixNQUFNLFFBQVEsR0FBSSxNQUFNLENBQUM7QUFDekIsTUFBTSxRQUFRLEdBQUksTUFBTSxDQUFDO0FBQ3pCLE1BQU0sUUFBUSxHQUFJLE1BQU0sQ0FBQztBQUN6QixNQUFNLFFBQVEsR0FBSSxNQUFNLENBQUM7QUFhL0IsQ0FBQztBQWFELENBQUM7QUFzQkQsQ0FBQztBQXNCRCxDQUFDO0FBT0QsQ0FBQztBQWVELENBQUM7QUFzQkQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hJRjs7Ozs7OztHQU9HO0FBR29DO0FBRWhDLE1BQWUsV0FBVztJQUNyQixRQUFRLENBQWlCO0lBQ3pCLFFBQVEsQ0FBUztJQUUzQixZQUFzQixPQUF1QixFQUFFLE9BQWU7UUFDNUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQUlELElBQVcsWUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQVcsS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxJQUFXLFdBQVc7UUFDcEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakUsT0FBTyxnREFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBS0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUN2Q0Y7Ozs7Ozs7R0FPRztBQUtJLE1BQU0sYUFBYTtJQUNoQixRQUFRLENBQWlCO0lBQ3pCLFdBQVcsQ0FBUztJQUNwQixXQUFXLENBQVM7SUFFNUIsWUFBbUIsT0FBdUIsRUFBRSxVQUFrQixFQUFFLFVBQWtCO1FBQ2hGLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7Q0FDRjtBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0Y7Ozs7Ozs7R0FPRztBQUk2QztBQWNoRCxNQUFNLGdCQUFnQjtJQUNaLElBQUksR0FBRyxJQUFJLEdBQXVELENBQUM7SUFFcEUsR0FBRyxDQUFDLE9BQWU7UUFDeEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVM7WUFDWixNQUFNLEtBQUssQ0FBQyxVQUFVLE9BQU8sa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRU0sR0FBRyxDQUFDLE9BQWUsRUFBRSxTQUFxRDtRQUMvRSxJQUFJLENBQUMsT0FBTztZQUNWLE1BQU0sS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDeEIsTUFBTSxLQUFLLENBQUMsVUFBVSxPQUFPLGVBQWUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sTUFBTSxDQUFDLE9BQWU7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBQUEsQ0FBQztBQUVLLE1BQU0sY0FBYztJQUNqQixPQUFPLENBQWdCO0lBQ3ZCLE9BQU8sQ0FBcUI7SUFDNUIsVUFBVSxHQUFHLElBQUksZ0JBQWdCLENBQUM7SUFDbEMsV0FBVyxHQUFHLElBQUksVUFBVSxDQUFDO0lBRXJDLFlBQVksTUFBcUIsRUFBRSxNQUEwQjtRQUMzRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBVyxZQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDN0IsQ0FBQztJQUVNLGVBQWU7UUFDcEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTSx1QkFBdUI7UUFDNUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVNLGFBQWEsQ0FBQyxPQUFlO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLG9CQUFvQixDQUFDLE9BQWU7UUFDekMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxPQUFlO1FBQ3pDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLG9CQUFvQixDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsSUFBWTtRQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM3QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQXdCLENBQUM7WUFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2dCQUNoQixPQUFPLENBQUMsQ0FBQztZQUNYLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsR0FBRztnQkFDTixPQUFPLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUVELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sdUJBQXVCLENBQUMsT0FBZTtRQUM1QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLHFCQUFxQixDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsSUFBWTtRQUN4RSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQXlCLENBQUM7UUFDdkUsSUFBSSxTQUFTLENBQUMsTUFBTTtZQUNsQixTQUFTLENBQUMsTUFBTSxDQUFDLElBQUkseURBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUFBLENBQUM7SUFFSyxxQkFBcUIsQ0FBQyxPQUFlO1FBQzFDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLGdCQUFnQjtRQUNyQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDaEQsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLE1BQU0sSUFBSSxHQUF3QixFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRU0saUJBQWlCLENBQUMsT0FBZTtRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSwyQkFBMkIsQ0FBQyxPQUFtQixFQUFFLFVBQWtCO1FBQ3hFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVNLCtCQUErQixDQUFDLE9BQWU7UUFDcEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLCtCQUErQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTSwrQkFBK0IsQ0FBQyxPQUFlO1FBQ3BELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU0saUJBQWlCLENBQUMsT0FBZTtRQUN0QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVNLGtCQUFrQixDQUFDLE9BQWU7UUFDdkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSx3QkFBd0IsQ0FBQyxPQUFlO1FBQzdDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU0saUJBQWlCLENBQUMsT0FBZSxFQUFFLE1BQWMsRUFBRSxJQUFZO1FBQ3BFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTSxzQkFBc0IsQ0FBQyxPQUFlO1FBQzNDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sOEJBQThCLENBQUMsT0FBZSxFQUFFLFFBQTZCO1FBQ2xGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBd0IsQ0FBQztRQUN0RSxTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBRU0sOEJBQThCLENBQUMsT0FBZSxFQUFFLFFBQTZCO1FBQ2xGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBd0IsQ0FBQztRQUN0RSxTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBRU0sK0JBQStCLENBQUMsT0FBZSxFQUFFLFFBQThCO1FBQ3BGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBd0IsQ0FBQztRQUN0RSxTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBRU0saUJBQWlCO1FBQ3RCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNqRCxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ1osTUFBTSxJQUFJLEdBQXlCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxPQUFlO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLHlCQUF5QixDQUFDLE9BQWUsRUFBRSxPQUFlO1FBQy9ELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVNLDRCQUE0QixDQUFDLE9BQWUsRUFBRSxVQUFrQjtRQUNyRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSxnQ0FBZ0MsQ0FBQyxPQUFlLEVBQUUsSUFBWTtRQUNuRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSxnQ0FBZ0MsQ0FBQyxPQUFlLEVBQUUsSUFBWTtRQUNuRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSxzQ0FBc0MsQ0FBQyxPQUFlLEVBQUUsUUFBZ0I7UUFDN0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRU0sK0JBQStCLENBQUMsT0FBZSxFQUFFLFFBQTZCO1FBQ25GLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBeUIsQ0FBQztRQUN2RSxTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBRU0sZ0NBQWdDLENBQUMsT0FBZSxFQUFFLFFBQThCO1FBQ3JGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBeUIsQ0FBQztRQUN2RSxTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBRU0sZ0NBQWdDLENBQUMsT0FBZSxFQUFFLFFBQThCO1FBQ3JGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBeUIsQ0FBQztRQUN2RSxTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBRU0sa0JBQWtCLENBQUMsT0FBZTtRQUN2QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLG1CQUFtQixDQUFDLE9BQWU7UUFDeEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxPQUFlLEVBQUUsS0FBc0I7UUFDakUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU0sa0JBQWtCLENBQUMsT0FBbUIsRUFBRSxNQUFjLEVBQUUsSUFBWTtRQUN6RSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU0saUJBQWlCO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxLQUFzQjtRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSwyQkFBMkIsQ0FBQyxLQUFzQjtRQUN2RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVNLCtCQUErQixDQUFDLEtBQXNCLEVBQUUsUUFBZ0I7UUFDN0UsSUFBSSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVNLGtCQUFrQixDQUFDLEtBQXNCO1FBQzlDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxPQUFPLEVBQUUsR0FBRyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTSxzQkFBc0IsQ0FBQyxLQUFzQixFQUFFLElBQVk7UUFDaEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSx5QkFBeUIsQ0FBQyxLQUFzQjtRQUNyRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLGtCQUFrQixDQUFDLEtBQXNCO1FBQzlDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sc0JBQXNCLENBQUMsS0FBc0IsRUFBRSxJQUFZO1FBQ2hFLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxJQUFZO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sbUJBQW1CLENBQUMsTUFBYztRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxtQkFBbUIsQ0FBQyxHQUFXO1FBQ3BDLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDO1FBQ2hDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdELElBQUksTUFBTTtZQUNSLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RSxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDNVNGOzs7Ozs7O0dBT0c7QUFLK0M7QUFFM0MsTUFBTSxZQUFZO0lBQ2YsUUFBUSxDQUFpQjtJQUN6QixNQUFNLENBQWtCO0lBRWhDLFlBQW1CLE9BQXVCLEVBQUUsS0FBc0I7UUFDaEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsSUFBVyxZQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLElBQUksV0FBVyxFQUFFLENBQUM7WUFDaEIsT0FBTyxnREFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMxRSxDQUFDO0lBQ0gsQ0FBQztJQUVELElBQVcsUUFBUSxDQUFDLFFBQWdCO1FBQ2xDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFdBQVc7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDZDQUFTLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3RELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELElBQVcsSUFBSSxDQUFDLEtBQWE7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxJQUFXLElBQUksQ0FBQyxJQUFZO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1REY7Ozs7Ozs7R0FPRztBQUkrQztBQUNGO0FBQ0Y7QUFDRjtBQUNFO0FBQ0k7QUFFM0MsTUFBTSxPQUFPO0lBQ1YsUUFBUSxDQUFpQjtJQUN6QixRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2QsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUU3QixZQUFtQixPQUF1QjtRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNuRCxJQUFJLENBQUMsUUFBUSxHQUFHLGdEQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQVcsY0FBYztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzFCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBQ2xFLElBQUksQ0FBQyxlQUFlLEdBQUcsZ0RBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUNoRyxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFFTSxPQUFPO1FBQ1osTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3RELElBQUksQ0FBQyxZQUFZO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBUyxDQUFDLENBQUM7UUFDN0IsT0FBTyxJQUFJLHFEQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sUUFBUTtRQUNiLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsYUFBYTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLDZDQUFTLENBQUMsQ0FBQztRQUM3QixPQUFPLElBQUksdURBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFTSxRQUFRO1FBQ2IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLO1lBQ1IsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBUyxDQUFDLENBQUM7UUFDN0IsT0FBTyxJQUFJLHVEQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sU0FBUyxDQUFDLE1BQWM7UUFDN0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsTUFBTTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQVMsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sSUFBSSx5REFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUE0QjtRQUMxRCxJQUFJLE9BQXVCLENBQUM7UUFFNUIsTUFBTSxZQUFZLEdBQUc7WUFDbkIsR0FBRyxFQUFFO2dCQUNILG9CQUFvQixFQUFFLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDO2dCQUNoRixvQkFBb0IsRUFBRSxDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsSUFBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7Z0JBQzVILHFCQUFxQixFQUFFLENBQUMsT0FBZSxFQUFFLE1BQWMsRUFBRSxJQUFZLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQztnQkFDOUgscUJBQXFCLEVBQUUsQ0FBQyxPQUFlLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUM7YUFDbkY7U0FDRixDQUFDO1FBRUYsTUFBTSxVQUFVLEdBQUcsTUFBTSxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN2RSxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQXdCLENBQUM7UUFDNUQsT0FBTyxHQUFHLElBQUksMkRBQWMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBELE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pGRjs7Ozs7OztHQU9HO0FBRWtIO0FBRXpFO0FBQ0U7QUFFUztBQUVoRCxNQUFNLFdBQVksU0FBUSxxREFBVztJQUMxQyxZQUFtQixPQUF1QixFQUFFLE9BQWU7UUFDekQsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRU0sZ0JBQWdCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVNLGFBQWEsQ0FBQyxVQUFrQjtRQUNyQyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxhQUFhO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBUyxDQUFDLENBQUM7UUFDL0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakQsSUFBSSxJQUFJLElBQUksZ0RBQVUsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSx5REFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNILENBQUM7SUFFTSxJQUFJO1FBQ1QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUQsSUFBSSxJQUFJLEtBQUssZ0RBQVUsRUFBRSxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSx5REFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNILENBQUM7SUFFTSxLQUFLO1FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLFVBQVU7UUFDZixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRSxJQUFJLEtBQUs7WUFDUCxPQUFPLElBQUksdURBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWhELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLElBQUksSUFBSSxLQUFLLGdEQUFVLEVBQUUsQ0FBQztZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUseURBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7SUFDSCxDQUFDO0lBRU0sUUFBUSxDQUFDLE1BQXFCLEVBQUUsTUFBZSxFQUFFLE1BQWU7UUFDckUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0MsTUFBTSxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDO1FBRXJDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUseURBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFFRCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsSUFBVyxNQUFNLENBQUMsUUFBNkI7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxJQUFXLE1BQU0sQ0FBQyxRQUE2QjtRQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELElBQVcsT0FBTyxDQUFDLFFBQThCO1FBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN6RSxDQUFDO0NBQ0Y7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RkY7Ozs7Ozs7R0FPRztBQUVvSDtBQUUzRTtBQUdXO0FBRWhELE1BQU0sWUFBYSxTQUFRLHFEQUFXO0lBQzNDLFlBQW1CLE9BQXVCLEVBQUUsT0FBZTtRQUN6RCxLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQVcsTUFBTSxDQUFDLEtBQWE7UUFDN0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQVMsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0NBQWdDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksSUFBSSxJQUFJLGdEQUFVLEVBQUUsQ0FBQztZQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUseURBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7SUFDSCxDQUFDO0lBRUQsSUFBVyxPQUFPLENBQUMsT0FBZTtRQUNoQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxVQUFVO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBUyxDQUFDLENBQUM7UUFDNUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsSUFBSSxJQUFJLElBQUksZ0RBQVUsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSx5REFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFXLFVBQVUsQ0FBQyxVQUFrQjtRQUN0QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxhQUFhO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBUyxDQUFDLENBQUM7UUFDL0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakQsSUFBSSxJQUFJLElBQUksZ0RBQVUsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSx5REFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNILENBQUM7SUFFTSxTQUFTLENBQUMsTUFBYztRQUM3QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBUyxDQUFDLENBQUM7UUFDdEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQ0FBZ0MsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsSUFBSSxJQUFJLElBQUksZ0RBQVUsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSx5REFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNILENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxRQUFnQjtRQUMxQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxLQUFLO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBUyxDQUFDLENBQUM7UUFDdkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQ0FBc0MsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLElBQUksZ0RBQVUsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSx5REFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFXLE1BQU0sQ0FBQyxRQUE2QjtRQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELElBQVcsT0FBTyxDQUFDLFFBQThCO1FBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsZ0NBQWdDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsSUFBVyxPQUFPLENBQUMsUUFBOEI7UUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTSxJQUFJO1FBQ1QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0QsSUFBSSxJQUFJLEtBQUssZ0RBQVUsRUFBRSxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSx5REFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNILENBQUM7SUFFTSxLQUFLO1FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVNLFdBQVcsQ0FBQyxLQUFtQjtRQUNwQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVNLFNBQVMsQ0FBQyxNQUFxQixFQUFFLE1BQWUsRUFBRSxNQUFlO1FBQ3RFLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFFOUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSx5REFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUVELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztDQUNGO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakhGOzs7Ozs7O0dBT0c7QUFFZ0c7QUFFNUYsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDO0FBRTlCLElBQVUsWUFBWSxDQVk1QjtBQVpELFdBQWlCLFlBQVk7SUFDN0IsU0FBZ0IsVUFBVSxDQUFDLE1BQW1CLEVBQUUsTUFBYyxFQUFFLE1BQWU7UUFFN0UsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDekIsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNYLE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM3QyxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQ2xCLE1BQU0sRUFBRSxDQUFDO1FBQ2IsQ0FBQztRQUVELE9BQU8sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQVZlLHVCQUFVLGFBVXpCO0FBQ0QsQ0FBQyxFQVpnQixZQUFZLEtBQVosWUFBWSxRQVk1QixDQUFDLHlCQUF5QjtBQUVwQixTQUFTLGlCQUFpQixDQUFDLElBQVk7SUFFNUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUNmLEtBQUssZ0RBQVU7WUFDYixPQUFPLFlBQVksQ0FBQztRQUN0QixLQUFLLG1EQUFhO1lBQ2hCLE9BQU8sZUFBZSxDQUFDO1FBQ3pCLEtBQUssa0RBQVk7WUFDZixPQUFPLGNBQWMsQ0FBQztRQUN4QixLQUFLLG9EQUFjO1lBQ2pCLE9BQU8sZ0JBQWdCLENBQUM7UUFDMUIsS0FBSyxtREFBYTtZQUNoQixPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxJQUFJLEdBQUcsQ0FBQztRQUNWLE9BQU8sVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU5QixNQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3pELENBQUM7Ozs7Ozs7VUM5Q0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTs7Ozs7OztHQU9HO0FBR3FDO0FBQzJEO0FBQ1E7QUFFM0csS0FBSyxVQUFVLGlCQUFpQixDQUFDLE1BQXdCO0lBQ3ZELElBQUksQ0FBQyxNQUFNO1FBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBRXZELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDN0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsT0FBTyxpREFBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBRUQsTUFBTSxVQUFVLEdBQW1CLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUU7SUFDbEUsVUFBVTtJQUNWLGFBQWE7SUFDYixZQUFZO0lBQ1osY0FBYztJQUNkLGFBQWE7SUFFYixPQUFPO0lBQ1AsUUFBUTtJQUNSLFFBQVE7SUFDUixTQUFTO0lBQ1QsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsUUFBUTtJQUVSLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBc0IsRUFBRSxNQUFlLEVBQUUsT0FBMkI7UUFDbkYsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ3pDLGdHQUFnRztJQUNsRyxDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUF3QixFQUFFLE1BQWMsRUFBRSxPQUF5QjtRQUNoRixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDdkMsOEZBQThGO0lBQ2hHLENBQUM7Q0FDRixDQUFDLENBQUM7QUFFSCxpRUFBZSxVQUFVLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmUudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlQmFzZS50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVCdWZmZXIudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlQ29udGV4dC50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVFbnRyeS50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL0FyY2hpdmVJbXBsLnRzIiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvQXJjaGl2ZVJlYWQudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9BcmNoaXZlV3JpdGUudHMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9VdGlscy50cyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS8uL3NyYy9NYWluTGlicmFyeS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJsaWJhcmNoaXZlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImxpYmFyY2hpdmVcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5leHBvcnQgY29uc3QgQVJDSElWRV9PSyA9IDA7XG5leHBvcnQgY29uc3QgQVJDSElWRV9SRVRSWSA9IC0xMDtcbmV4cG9ydCBjb25zdCBBUkNISVZFX1dBUk4gPSAtMjA7XG5leHBvcnQgY29uc3QgQVJDSElWRV9GQUlMRUQgPSAtMjU7XG5leHBvcnQgY29uc3QgQVJDSElWRV9GQVRBTCA9IC0zMDtcblxuZXhwb3J0IGNvbnN0IEFFX0lGTVQgICA9IDB4ZjAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRlJFRyAgPSAweDgwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZMTksgID0gMHhhMDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGU09DSyA9IDB4YzAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRkNIUiAgPSAweDIwMDA7XG5leHBvcnQgY29uc3QgQUVfSUZCTEsgID0gMHg2MDAwO1xuZXhwb3J0IGNvbnN0IEFFX0lGRElSICA9IDB4NDAwMDtcbmV4cG9ydCBjb25zdCBBRV9JRklGTyAgPSAweDEwMDA7XG5cbmV4cG9ydCB0eXBlIEFyY2hpdmVPcGVuQ2FsbGJhY2sgPSAoKSA9PiBudW1iZXI7XG5leHBvcnQgdHlwZSBBcmNoaXZlUmVhZENhbGxiYWNrID0gKCkgPT4gQnVmZmVyIHwgdW5kZWZpbmVkO1xuZXhwb3J0IHR5cGUgQXJjaGl2ZVdyaXRlQ2FsbGJhY2sgPSAoYnVmZmVyOiBJQXJjaGl2ZUJ1ZmZlcikgPT4gdm9pZDtcbmV4cG9ydCB0eXBlIEFyY2hpdmVDbG9zZUNhbGxiYWNrID0gKCkgPT4gbnVtYmVyO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcmNoaXZlQnVmZmVyIHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIGdldCBidWZmZXIoKTogQXJyYXlCdWZmZXI7XG4gIGdldCBieXRlT2Zmc2V0KCk6IG51bWJlcjtcbiAgZ2V0IGJ5dGVMZW5ndGgoKTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJQXJjaGl2ZUVudHJ5IHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIGdldCBwYXRobmFtZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHNldCBwYXRobmFtZSh2YWx1ZTogc3RyaW5nKTtcblxuICBnZXQgc2l6ZSgpOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHNldCBzaXplKHZhbHVlOiBudW1iZXIpO1xuXG4gIGdldCBtb2RlKCk6IG51bWJlcjtcbiAgc2V0IG1vZGUobW9kZTogbnVtYmVyKTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmVSZWFkIHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuXG4gIGdldCBlcnJubygpOiBudW1iZXI7XG4gIGdldCBlcnJvclN0cmluZygpOiBzdHJpbmc7XG5cbiAgc3VwcG9ydEZpbHRlckFsbCgpOiB2b2lkO1xuICBzdXBwb3J0Rm9ybWF0QWxsKCk6IHZvaWQ7XG5cbiAgYWRkUGFzc3BocmFzZShwYXNzcGhyYXNlOiBzdHJpbmcpOiB2b2lkO1xuXG4gIHNldCBvbm9wZW4oY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spO1xuICBzZXQgb25yZWFkKGNhbGxiYWNrOiBBcmNoaXZlUmVhZENhbGxiYWNrKTtcbiAgc2V0IG9uY2xvc2UoY2FsbGJhY2s6IEFyY2hpdmVDbG9zZUNhbGxiYWNrKTtcblxuICBvcGVuKCk6IHZvaWQ7XG4gIGNsb3NlKCk6IHZvaWQ7XG4gIG5leHRIZWFkZXIoKTogSUFyY2hpdmVFbnRyeSB8IHVuZGVmaW5lZDtcbiAgZGF0YVJlYWQoYnVmZmVyOiBJQXJjaGl2ZUJ1ZmZlciwgb2Zmc2V0PzogbnVtYmVyLCBsZW5ndGg/OiBudW1iZXIpOiBudW1iZXI7XG4gIGRhdGFTa2lwKCk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmVXcml0ZSB7XG4gIHJlbGVhc2UoKTogdm9pZDtcblxuICBnZXQgZXJybm8oKTogbnVtYmVyO1xuICBnZXQgZXJyb3JTdHJpbmcoKTogc3RyaW5nO1xuXG4gIHNldCBmb3JtYXQodmFsdWU6IHN0cmluZyk7XG4gIHNldCBvcHRpb25zKG9wdGlvbnM6IHN0cmluZyk7XG4gIHNldCBwYXNzcGhyYXNlKHBhc3NwaHJhc2U6IHN0cmluZyk7XG4gIGFkZEZpbHRlcihmaWx0ZXI6IHN0cmluZyk6IHZvaWQ7XG4gIHNldEZvcm1hdEZpbHRlckJ5RXh0KGZpbGVuYW1lOiBzdHJpbmcpOiB2b2lkO1xuXG4gIHNldCBvbm9wZW4oY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spO1xuICBzZXQgb253cml0ZShjYWxsYmFjazogQXJjaGl2ZVdyaXRlQ2FsbGJhY2spO1xuICBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spO1xuXG4gIG9wZW4oKTogdm9pZDtcbiAgY2xvc2UoKTogdm9pZDtcbiAgd3JpdGVIZWFkZXIoZW50cnk6IElBcmNoaXZlRW50cnkpOiBudW1iZXI7XG4gIHdyaXRlRGF0YShidWZmZXI6IElBcmNoaXZlQnVmZmVyLCBvZmZzZXQ/OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmUge1xuICBuZXdSZWFkKCk6IElBcmNoaXZlUmVhZDtcbiAgbmV3V3JpdGUoKTogSUFyY2hpdmVXcml0ZTtcbiAgbmV3RW50cnkoKTogSUFyY2hpdmVFbnRyeTtcbiAgbmV3QnVmZmVyKGxlbmd0aDogbnVtYmVyKTogSUFyY2hpdmVCdWZmZXI7XG59O1xuXG5leHBvcnQgdHlwZSBEZWNvbXByZXNzT3B0aW9ucyA9IHtcbiAgdmVyYm9zZT86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBDb21wcmVzc09wdGlvbnMgPSB7XG4gIHZlcmJvc2U/OiBib29sZWFuO1xuICBkaXJlY3Rvcnk/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEVudHJ5SW5mbyB7XG4gIHBhdGhuYW1lOiBzdHJpbmc7XG4gIG1vZGU6IG51bWJlcjtcbiAgc2l6ZT86IG51bWJlcjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFyY2hpdmVFeHBvcnQge1xuICAocGFyYW1zPzogc3RyaW5nIHwgQnVmZmVyKTogUHJvbWlzZTxJQXJjaGl2ZT47XG5cbiAgcmVhZG9ubHkgQVJDSElWRV9PSzogbnVtYmVyO1xuICByZWFkb25seSBBUkNISVZFX1JFVFJZOiBudW1iZXI7XG4gIHJlYWRvbmx5IEFSQ0hJVkVfV0FSTjogbnVtYmVyO1xuICByZWFkb25seSBBUkNISVZFX0ZBSUxFRDogbnVtYmVyO1xuICByZWFkb25seSBBUkNISVZFX0ZBVEFMOiBudW1iZXI7XG5cbiAgcmVhZG9ubHkgQUVfSUZNVDogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRlJFRzogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRkxOSzogbnVtYmVyO1xuICByZWFkb25seSBBRV9JRlNPQ0s6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZDSFI6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZCTEs6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZESVI6IG51bWJlcjtcbiAgcmVhZG9ubHkgQUVfSUZJRk86IG51bWJlcjtcblxuICBkZWNvbXByZXNzKGlucHV0OiBzdHJpbmcgfCBCdWZmZXIsIG91dHB1dD86IHN0cmluZywgb3B0aW9ucz86IERlY29tcHJlc3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcbiAgY29tcHJlc3MoaW5wdXQ6IHN0cmluZyB8IHN0cmluZ1tdLCBvdXRwdXQ6IHN0cmluZywgb3B0aW9ucz86IENvbXByZXNzT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5pbXBvcnQgeyBTdHJpbmdFeHRyYXMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXJjaGl2ZUJhc2Uge1xuICBwcm90ZWN0ZWQgX2NvbnRleHQ6IEFyY2hpdmVDb250ZXh0O1xuICBwcm90ZWN0ZWQgX2FyY2hpdmU6IG51bWJlcjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoY29udGV4dDogQXJjaGl2ZUNvbnRleHQsIGFyY2hpdmU6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuX2FyY2hpdmUgPSBhcmNoaXZlO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHJlbGVhc2UoKTogdm9pZDtcblxuICBwdWJsaWMgZ2V0IG1lbW9yeU9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJjaGl2ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZXJybm8oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX2Vycm5vKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGdldCBlcnJvclN0cmluZygpOiBzdHJpbmcge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lcnJvcl9zdHJpbmcodGhpcy5fYXJjaGl2ZSk7XG4gICAgcmV0dXJuIFN0cmluZ0V4dHJhcy5mcm9tQnVmZmVyKHRoaXMuX2NvbnRleHQubWVtb3J5QnVmZmVyLCBvZmZzZXQpO1xuICB9XG5cbiAgLy8gaGFuZGxlRXZlbnRcbiAgLy8gYWRkRXZlbnRMaXN0bmVyXG4gIC8vIHJlbW92ZUV2ZW50TGlzdGVuZXJcbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElBcmNoaXZlQnVmZmVyIH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUNvbnRleHQgfSBmcm9tIFwiLi9BcmNoaXZlQ29udGV4dFwiO1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZUJ1ZmZlciBpbXBsZW1lbnRzIElBcmNoaXZlQnVmZmVyIHtcbiAgcHJpdmF0ZSBfY29udGV4dDogQXJjaGl2ZUNvbnRleHQ7XG4gIHByaXZhdGUgX2J5dGVPZmZzZXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBfYnl0ZUxlbmd0aDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLl9ieXRlT2Zmc2V0ID0gYnl0ZU9mZnNldDtcbiAgICB0aGlzLl9ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyByZWxlYXNlKCkge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZSh0aGlzLl9ieXRlT2Zmc2V0KTtcbiAgfVxuXG4gIGdldCBidWZmZXIoKTogQXJyYXlCdWZmZXIge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0Lm1lbW9yeUJ1ZmZlcjtcbiAgfVxuXG4gIGdldCBieXRlT2Zmc2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2J5dGVPZmZzZXQ7XG4gIH1cblxuICBnZXQgYnl0ZUxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9ieXRlTGVuZ3RoO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBBcmNoaXZlT3BlbkNhbGxiYWNrLCBBcmNoaXZlUmVhZENhbGxiYWNrLCBBcmNoaXZlV3JpdGVDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIEFSQ0hJVkVfT0sgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlTmF0aXZlLCBBcmNoaXZlUHRyLCBBcmNoaXZlRW50cnlQdHIgfSBmcm9tIFwiLi9BcmNoaXZlTmF0aXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQnVmZmVyIH0gZnJvbSBcIi4vQXJjaGl2ZUJ1ZmZlclwiO1xuXG50eXBlIEFyY2hpdmVSZWFkQ2FsYmFja3MgPSB7XG4gIG9wZW5lcj86IEFyY2hpdmVPcGVuQ2FsbGJhY2ssXG4gIHJlYWRlcj86IEFyY2hpdmVSZWFkQ2FsbGJhY2ssXG4gIGNsb3Nlcj86IEFyY2hpdmVDbG9zZUNhbGxiYWNrLFxufTtcblxudHlwZSBBcmNoaXZlV3JpdGVDYWxiYWNrcyA9IHtcbiAgb3BlbmVyPzogQXJjaGl2ZU9wZW5DYWxsYmFjayxcbiAgd3JpdGVyPzogQXJjaGl2ZVdyaXRlQ2FsbGJhY2ssXG4gIGNsb3Nlcj86IEFyY2hpdmVDbG9zZUNhbGxiYWNrLFxufTtcblxuY2xhc3MgQXJjaGl2ZUNhbGxiYWNrcyB7XG4gIHByaXZhdGUgX21hcCA9IG5ldyBNYXA8bnVtYmVyLCBBcmNoaXZlUmVhZENhbGJhY2tzIHwgQXJjaGl2ZVdyaXRlQ2FsYmFja3M+O1xuXG4gIHB1YmxpYyBnZXQoYXJjaGl2ZTogbnVtYmVyKTogQXJjaGl2ZVJlYWRDYWxiYWNrcyB8IEFyY2hpdmVXcml0ZUNhbGJhY2tzIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9tYXAuZ2V0KGFyY2hpdmUpO1xuICAgIGlmICghY2FsbGJhY2tzKVxuICAgICAgdGhyb3cgRXJyb3IoYEhhbmRsZSAke2FyY2hpdmV9IGRvZXMgbm90IGV4aXN0c2ApO1xuICAgIHJldHVybiBjYWxsYmFja3M7XG4gIH1cblxuICBwdWJsaWMgc2V0KGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2tzOiBBcmNoaXZlUmVhZENhbGJhY2tzIHwgQXJjaGl2ZVdyaXRlQ2FsYmFja3MpIHtcbiAgICBpZiAoIWFyY2hpdmUpXG4gICAgICB0aHJvdyBFcnJvcihgSGFuZGxlIGlzIG51bGxgKTtcbiAgICBpZiAodGhpcy5fbWFwLmhhcyhhcmNoaXZlKSlcbiAgICAgIHRocm93IEVycm9yKGBIYW5kbGUgJHthcmNoaXZlfSBpcyByZWdpc3RyZWRgKTtcbiAgICB0aGlzLl9tYXAuc2V0KGFyY2hpdmUsIGNhbGxiYWNrcyk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlKGFyY2hpdmU6IG51bWJlcikge1xuICAgIHRoaXMuX21hcC5kZWxldGUoYXJjaGl2ZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBBcmNoaXZlQ29udGV4dCB7XG4gIHByaXZhdGUgX25hdGl2ZTogQXJjaGl2ZU5hdGl2ZTtcbiAgcHJpdmF0ZSBfbWVtb3J5OiBXZWJBc3NlbWJseS5NZW1vcnk7XG4gIHByaXZhdGUgX2NhbGxiYWNrcyA9IG5ldyBBcmNoaXZlQ2FsbGJhY2tzO1xuICBwcml2YXRlIF9yZWFkQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXk7XG5cbiAgY29uc3RydWN0b3IobmF0aXZlOiBBcmNoaXZlTmF0aXZlLCBtZW1vcnk6IFdlYkFzc2VtYmx5Lk1lbW9yeSkge1xuICAgIHRoaXMuX25hdGl2ZSA9IG5hdGl2ZTtcbiAgICB0aGlzLl9tZW1vcnkgPSBtZW1vcnk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1lbW9yeUJ1ZmZlcigpOiBBcnJheUJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX21lbW9yeS5idWZmZXI7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV92ZXJzaW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3ZlcnNpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3ZlcnNpb25fZGV0YWlscygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV92ZXJzaW9uX2RldGFpbHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2Vycm5vKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2Vycm5vKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZXJyb3Jfc3RyaW5nKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2Vycm9yX3N0cmluZyhhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX29wZW5faGFuZGxlcihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGNsaWVudCA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSk7XG4gICAgcmV0dXJuIGNsaWVudC5vcGVuZXIgPyBjbGllbnQub3BlbmVyKCkgOiAwO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9oYW5kbGVyKGFyY2hpdmU6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5fcmVhZEJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVJlYWRDYWxiYWNrcztcbiAgICAgIGlmICghY2xpZW50LnJlYWRlcilcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICBjb25zdCBidWYgPSBjbGllbnQucmVhZGVyKCk7XG4gICAgICBpZiAoIWJ1ZilcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB0aGlzLl9yZWFkQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICB9XG5cbiAgICBjb25zdCBuID0gTWF0aC5taW4oc2l6ZSwgdGhpcy5fcmVhZEJ1ZmZlci5sZW5ndGgpO1xuICAgIGNvbnN0IGRzdCA9IG5ldyBVaW50OEFycmF5KHRoaXMuX21lbW9yeS5idWZmZXIsIG9mZnNldCwgbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspXG4gICAgICBkc3RbaV0gPSB0aGlzLl9yZWFkQnVmZmVyW2ldO1xuXG4gICAgdGhpcy5fcmVhZEJ1ZmZlciA9IHRoaXMuX3JlYWRCdWZmZXIuc2xpY2Uobik7XG4gICAgcmV0dXJuIG47XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX2xhc3RfZXJyb3IoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9sYXN0X2Vycm9yKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfaGFuZGxlcihhcmNoaXZlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVdyaXRlQ2FsYmFja3M7XG4gICAgaWYgKGNhbGxiYWNrcy53cml0ZXIpXG4gICAgICBjYWxsYmFja3Mud3JpdGVyKG5ldyBBcmNoaXZlQnVmZmVyKHRoaXMsIG9mZnNldCwgc2l6ZSkpXG4gICAgcmV0dXJuIHNpemU7XG4gIH07XG5cbiAgcHVibGljIGFyY2hpdmVfY2xvc2VfaGFuZGxlcihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGNsaWVudCA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSk7XG4gICAgcmV0dXJuIGNsaWVudC5jbG9zZXIgPyBjbGllbnQuY2xvc2VyKCkgOiAwO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9uZXcoKTogQXJjaGl2ZVB0ciB7XG4gICAgY29uc3QgYXJjaGl2ZSA9IHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfbmV3KCk7XG4gICAgaWYgKGFyY2hpdmUpIHtcbiAgICAgIGNvbnN0IGltcGw6IEFyY2hpdmVSZWFkQ2FsYmFja3MgPSB7fTtcbiAgICAgIHRoaXMuX2NhbGxiYWNrcy5zZXQoYXJjaGl2ZSwgaW1wbCk7XG4gICAgfVxuICAgIHJldHVybiBhcmNoaXZlO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9mcmVlKGFyY2hpdmU6IG51bWJlcikge1xuICAgIHRoaXMuX2NhbGxiYWNrcy5kZWxldGUoYXJjaGl2ZSk7XG4gICAgdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9mcmVlKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9hZGRfcGFzc3BocmFzZShhcmNoaXZlOiBBcmNoaXZlUHRyLCBwYXNzcGhyYXNlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX2FkZF9wYXNzcGhyYXNlKGFyY2hpdmUsIHBhc3NwaHJhc2UpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9zdXBwb3J0X2ZpbHRlcl9hbGwoYXJjaGl2ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfc3VwcG9ydF9maWx0ZXJfYWxsKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9zdXBwb3J0X2Zvcm1hdF9hbGwoYXJjaGl2ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfc3VwcG9ydF9mb3JtYXRfYWxsKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9vcGVuKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfb3BlbihhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfY2xvc2UoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9jbG9zZShhcmNoaXZlKTtcbiAgfVxuICBcbiAgcHVibGljIGFyY2hpdmVfcmVhZF9uZXh0X2hlYWRlcihhcmNoaXZlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9yZWFkX25leHRfaGVhZGVyKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9kYXRhKGFyY2hpdmU6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3JlYWRfZGF0YShhcmNoaXZlLCBvZmZzZXQsIHNpemUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9kYXRhX3NraXAoYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfcmVhZF9kYXRhX3NraXAoYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9yZWFkX3NldF9vcGVuX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVSZWFkQ2FsYmFja3M7XG4gICAgY2FsbGJhY2tzLm9wZW5lciA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfcmVhZF9zZXRfcmVhZF9jYWxsYmFjayhhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrOiBBcmNoaXZlUmVhZENhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlUmVhZENhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy5yZWFkZXIgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3JlYWRfc2V0X2Nsb3NlX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVDbG9zZUNhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlUmVhZENhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy5jbG9zZXIgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX25ldygpOiBBcmNoaXZlUHRyIHtcbiAgICBjb25zdCBhcmNoaXZlID0gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfbmV3KCk7XG4gICAgaWYgKGFyY2hpdmUpIHtcbiAgICAgIGNvbnN0IGltcGw6IEFyY2hpdmVXcml0ZUNhbGJhY2tzID0ge307XG4gICAgICB0aGlzLl9jYWxsYmFja3Muc2V0KGFyY2hpdmUsIGltcGwpO1xuICAgIH1cbiAgICByZXR1cm4gYXJjaGl2ZTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX2ZyZWUoYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzLmRlbGV0ZShhcmNoaXZlKTtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9mcmVlKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X29wdGlvbnMoYXJjaGl2ZTogbnVtYmVyLCBvcHRpb25zOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9zZXRfb3B0aW9ucyhhcmNoaXZlLCBvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF9wYXNzcGhyYXNlKGFyY2hpdmU6IG51bWJlciwgcGFzc3BocmFzZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfc2V0X3Bhc3NwaHJhc2UoYXJjaGl2ZSwgcGFzc3BocmFzZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2J5X25hbWUoYXJjaGl2ZTogbnVtYmVyLCBuYW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2J5X25hbWUoYXJjaGl2ZSwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9hZGRfZmlsdGVyX2J5X25hbWUoYXJjaGl2ZTogbnVtYmVyLCBuYW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9hZGRfZmlsdGVyX2J5X25hbWUoYXJjaGl2ZSwgbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2ZpbHRlcl9ieV9leHQoYXJjaGl2ZTogbnVtYmVyLCBmaWxlbmFtZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9maWx0ZXJfYnlfZXh0KGFyY2hpdmUsIGZpbGVuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF9vcGVuX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZ2V0KGFyY2hpdmUpIGFzIEFyY2hpdmVXcml0ZUNhbGJhY2tzO1xuICAgIGNhbGxiYWNrcy5vcGVuZXIgPSBjYWxsYmFjaztcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX3NldF93cml0ZV9jYWxsYmFjayhhcmNoaXZlOiBudW1iZXIsIGNhbGxiYWNrOiBBcmNoaXZlV3JpdGVDYWxsYmFjayk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5nZXQoYXJjaGl2ZSkgYXMgQXJjaGl2ZVdyaXRlQ2FsYmFja3M7XG4gICAgY2FsbGJhY2tzLndyaXRlciA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfc2V0X2Nsb3NlX2NhbGxiYWNrKGFyY2hpdmU6IG51bWJlciwgY2FsbGJhY2s6IEFyY2hpdmVDbG9zZUNhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmdldChhcmNoaXZlKSBhcyBBcmNoaXZlV3JpdGVDYWxiYWNrcztcbiAgICBjYWxsYmFja3MuY2xvc2VyID0gY2FsbGJhY2s7XG4gIH1cbiAgXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX29wZW4oYXJjaGl2ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfd3JpdGVfb3BlbihhcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX3dyaXRlX2Nsb3NlKGFyY2hpdmU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX2Nsb3NlKGFyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfd3JpdGVfaGVhZGVyKGFyY2hpdmU6IG51bWJlciwgZW50cnk6IEFyY2hpdmVFbnRyeVB0cik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX3dyaXRlX2hlYWRlcihhcmNoaXZlLCBlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV93cml0ZV9kYXRhKGFyY2hpdmU6IEFyY2hpdmVQdHIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uYXRpdmUuYXJjaGl2ZV93cml0ZV9kYXRhKGFyY2hpdmUsIG9mZnNldCwgc2l6ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9uZXcoKTogQXJjaGl2ZUVudHJ5UHRyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfbmV3KCk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9mcmVlKGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpIHtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9mcmVlKGVudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNoaXZlX2VudHJ5X3BhdGhuYW1lX3V0ZjgoZW50cnk6IEFyY2hpdmVFbnRyeVB0cik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3BhdGhuYW1lX3V0ZjgoZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfc2V0X3BhdGhuYW1lX3V0ZjgoZW50cnk6IEFyY2hpdmVFbnRyeVB0ciwgcGF0aG5hbWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2VudHJ5X3NldF9wYXRobmFtZV91dGY4KGVudHJ5LCBwYXRobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9zaXplKGVudHJ5OiBBcmNoaXZlRW50cnlQdHIpOiBudW1iZXIge1xuICAgIGNvbnN0IGxvID0gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfc2l6ZV9sbyhlbnRyeSk7XG4gICAgY29uc3QgaGkgPSB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zaXplX2hpKGVudHJ5KTtcbiAgICByZXR1cm4gaGkgKiA0Mjk0OTY3Mjk2ICsgbG87XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9zZXRfc2l6ZShlbnRyeTogQXJjaGl2ZUVudHJ5UHRyLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zZXRfc2l6ZShlbnRyeSwgMCwgc2l6ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9zaXplX2lzX3NldChlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfc2l6ZV9pc19zZXQoZW50cnkpO1xuICB9XG5cbiAgcHVibGljIGFyY2hpdmVfZW50cnlfbW9kZShlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlLmFyY2hpdmVfZW50cnlfbW9kZShlbnRyeSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9lbnRyeV9zZXRfbW9kZShlbnRyeTogQXJjaGl2ZUVudHJ5UHRyLCBtb2RlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9uYXRpdmUuYXJjaGl2ZV9lbnRyeV9zZXRfbW9kZShlbnRyeSwgbW9kZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9idWZmZXJfbmV3KHNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2J1ZmZlcl9uZXcoc2l6ZSk7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9idWZmZXJfZnJlZShidWZmZXI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX25hdGl2ZS5hcmNoaXZlX2J1ZmZlcl9mcmVlKGJ1ZmZlcik7XG4gIH1cblxuICBwdWJsaWMgYXJjaGl2ZV9idWZmZXJfZnJvbShzdHI6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcjtcbiAgICBjb25zdCBieXRlcyA9IGVuY29kZXIuZW5jb2RlKHN0ciArIFwiXFx4MDBcIik7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fbmF0aXZlLmFyY2hpdmVfYnVmZmVyX25ldyhieXRlcy5sZW5ndGgpO1xuICAgIGlmIChvZmZzZXQpXG4gICAgICAobmV3IFVpbnQ4QXJyYXkodGhpcy5fbWVtb3J5LmJ1ZmZlciwgb2Zmc2V0LCBieXRlcy5sZW5ndGgpKS5zZXQoYnl0ZXMpO1xuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElBcmNoaXZlRW50cnkgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5pbXBvcnQgeyBBcmNoaXZlRW50cnlQdHIgfSBmcm9tIFwiLi9BcmNoaXZlTmF0aXZlXCI7XG5pbXBvcnQgeyBOT19NRU1PUlksIFN0cmluZ0V4dHJhcyB9IGZyb20gXCIuL1V0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBBcmNoaXZlRW50cnkgaW1wbGVtZW50cyBJQXJjaGl2ZUVudHJ5IHtcbiAgcHJpdmF0ZSBfY29udGV4dDogQXJjaGl2ZUNvbnRleHQ7XG4gIHByaXZhdGUgX2VudHJ5OiBBcmNoaXZlRW50cnlQdHI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEFyY2hpdmVDb250ZXh0LCBlbnRyeTogQXJjaGl2ZUVudHJ5UHRyKSB7XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5fZW50cnkgPSBlbnRyeTtcbiAgfVxuXG4gIHB1YmxpYyByZWxlYXNlKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9mcmVlKHRoaXMuX2VudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWVtb3J5T2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9lbnRyeTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGF0aG5hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBwYXRobmFtZVB0ciA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9wYXRobmFtZV91dGY4KHRoaXMuX2VudHJ5KTtcbiAgICBpZiAocGF0aG5hbWVQdHIpIHtcbiAgICAgIHJldHVybiBTdHJpbmdFeHRyYXMuZnJvbUJ1ZmZlcih0aGlzLl9jb250ZXh0Lm1lbW9yeUJ1ZmZlciwgcGF0aG5hbWVQdHIpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgcGF0aG5hbWUocGF0aG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHBhdGhuYW1lUHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKHBhdGhuYW1lKTtcbiAgICBpZiAoIXBhdGhuYW1lUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfc2V0X3BhdGhuYW1lX3V0ZjgodGhpcy5fZW50cnksIHBhdGhuYW1lUHRyKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2l6ZSgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLl9jb250ZXh0LmFyY2hpdmVfZW50cnlfc2l6ZV9pc19zZXQodGhpcy5fZW50cnkpKVxuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9zaXplKHRoaXMuX2VudHJ5KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc2l6ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X3NldF9zaXplKHRoaXMuX2VudHJ5LCB2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1vZGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX2VudHJ5X21vZGUodGhpcy5fZW50cnkpO1xuICB9XG5cbiAgcHVibGljIHNldCBtb2RlKG1vZGU6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9zZXRfbW9kZSh0aGlzLl9lbnRyeSwgbW9kZSk7XG4gIH1cbn07XG4iLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbmltcG9ydCB7IElBcmNoaXZlIH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZU5hdGl2ZSB9IGZyb20gXCIuL0FyY2hpdmVOYXRpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcbmltcG9ydCB7IEFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlQnVmZmVyXCI7XG5pbXBvcnQgeyBBcmNoaXZlRW50cnkgfSBmcm9tIFwiLi9BcmNoaXZlRW50cnlcIjtcbmltcG9ydCB7IEFyY2hpdmVSZWFkIH0gZnJvbSBcIi4vQXJjaGl2ZVJlYWRcIjtcbmltcG9ydCB7IEFyY2hpdmVXcml0ZSB9IGZyb20gXCIuL0FyY2hpdmVXcml0ZVwiO1xuaW1wb3J0IHsgTk9fTUVNT1JZLCBTdHJpbmdFeHRyYXMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZSBpbXBsZW1lbnRzIElBcmNoaXZlIHtcbiAgcHJpdmF0ZSBfY29udGV4dDogQXJjaGl2ZUNvbnRleHQ7XG4gIHByaXZhdGUgX3ZlcnNpb24gPSBcIlwiO1xuICBwcml2YXRlIF92ZXJzaW9uRGV0YWlscyA9IFwiXCI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEFyY2hpdmVDb250ZXh0KSB7XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZlcnNpb24oKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuX3ZlcnNpb24pIHtcbiAgICAgIGNvbnN0IHZlcnNpb25QdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfdmVyc2lvbigpO1xuICAgICAgdGhpcy5fdmVyc2lvbiA9IFN0cmluZ0V4dHJhcy5mcm9tQnVmZmVyKHRoaXMuX2NvbnRleHQubWVtb3J5QnVmZmVyLCB2ZXJzaW9uUHRyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3ZlcnNpb247XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZlcnNpb25EZXRhaWxzKCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLl92ZXJzaW9uRGV0YWlscykge1xuICAgICAgY29uc3QgdmVyc2lvbkRldGFpbHNQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfdmVyc2lvbl9kZXRhaWxzKCk7XG4gICAgICB0aGlzLl92ZXJzaW9uRGV0YWlscyA9IFN0cmluZ0V4dHJhcy5mcm9tQnVmZmVyKHRoaXMuX2NvbnRleHQubWVtb3J5QnVmZmVyLCB2ZXJzaW9uRGV0YWlsc1B0cik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl92ZXJzaW9uRGV0YWlscztcbiAgfVxuXG4gIHB1YmxpYyBuZXdSZWFkKCk6IEFyY2hpdmVSZWFkIHtcbiAgICBjb25zdCBhcmNoaXZlX3JlYWQgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9uZXcoKTtcbiAgICBpZiAoIWFyY2hpdmVfcmVhZClcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIHJldHVybiBuZXcgQXJjaGl2ZVJlYWQodGhpcy5fY29udGV4dCwgYXJjaGl2ZV9yZWFkKTtcbiAgfVxuXG4gIHB1YmxpYyBuZXdXcml0ZSgpOiBBcmNoaXZlV3JpdGUge1xuICAgIGNvbnN0IGFyY2hpdmVfd3JpdGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfbmV3KCk7XG4gICAgaWYgKCFhcmNoaXZlX3dyaXRlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgcmV0dXJuIG5ldyBBcmNoaXZlV3JpdGUodGhpcy5fY29udGV4dCwgYXJjaGl2ZV93cml0ZSk7XG4gIH1cblxuICBwdWJsaWMgbmV3RW50cnkoKTogQXJjaGl2ZUVudHJ5IHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9lbnRyeV9uZXcoKTtcbiAgICBpZiAoIWVudHJ5KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgcmV0dXJuIG5ldyBBcmNoaXZlRW50cnkodGhpcy5fY29udGV4dCwgZW50cnkpO1xuICB9XG5cbiAgcHVibGljIG5ld0J1ZmZlcihsZW5ndGg6IG51bWJlcik6IEFyY2hpdmVCdWZmZXIge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfbmV3KGxlbmd0aCk7XG4gICAgaWYgKCFvZmZzZXQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICByZXR1cm4gbmV3IEFyY2hpdmVCdWZmZXIodGhpcy5fY29udGV4dCwgb2Zmc2V0LCBsZW5ndGgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBpbnN0YW50aWF0ZShidWZmZXI6IEJ1ZmZlciB8IEFycmF5QnVmZmVyKTogUHJvbWlzZTxBcmNoaXZlPiB7XG4gICAgbGV0IGNvbnRleHQ6IEFyY2hpdmVDb250ZXh0O1xuXG4gICAgY29uc3QgaW1wb3J0T2JqZWN0ID0ge1xuICAgICAgZW52OiB7XG4gICAgICAgIGFyY2hpdmVfb3Blbl9oYW5kbGVyOiAoYXJjaGl2ZTogbnVtYmVyKSA9PiBjb250ZXh0LmFyY2hpdmVfb3Blbl9oYW5kbGVyKGFyY2hpdmUpLFxuICAgICAgICBhcmNoaXZlX3JlYWRfaGFuZGxlcjogKGFyY2hpdmU6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHNpemU6IG51bWJlcikgPT4gY29udGV4dC5hcmNoaXZlX3JlYWRfaGFuZGxlcihhcmNoaXZlLCBvZmZzZXQsIHNpemUpLFxuICAgICAgICBhcmNoaXZlX3dyaXRlX2hhbmRsZXI6IChhcmNoaXZlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBzaXplOiBudW1iZXIpID0+IGNvbnRleHQuYXJjaGl2ZV93cml0ZV9oYW5kbGVyKGFyY2hpdmUsIG9mZnNldCwgc2l6ZSksXG4gICAgICAgIGFyY2hpdmVfY2xvc2VfaGFuZGxlcjogKGFyY2hpdmU6IG51bWJlcikgPT4gY29udGV4dC5hcmNoaXZlX2Nsb3NlX2hhbmRsZXIoYXJjaGl2ZSksXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBpbnN0U291cmNlID0gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoYnVmZmVyLCBpbXBvcnRPYmplY3QpO1xuICAgIGNvbnN0IG5hdGl2ZSA9IGluc3RTb3VyY2UuaW5zdGFuY2UuZXhwb3J0cyBhcyBBcmNoaXZlTmF0aXZlO1xuICAgIGNvbnRleHQgPSBuZXcgQXJjaGl2ZUNvbnRleHQobmF0aXZlLCBuYXRpdmUubWVtb3J5KTtcblxuICAgIHJldHVybiBuZXcgQXJjaGl2ZShjb250ZXh0KTtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQXJjaGl2ZU9wZW5DYWxsYmFjaywgQXJjaGl2ZVJlYWRDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIElBcmNoaXZlUmVhZCwgQVJDSElWRV9PSyB9IGZyb20gXCIuL0FyY2hpdmVcIjtcbmltcG9ydCB7IEFyY2hpdmVDb250ZXh0IH0gZnJvbSBcIi4vQXJjaGl2ZUNvbnRleHRcIjtcbmltcG9ydCB7IEFyY2hpdmVCYXNlIH0gZnJvbSBcIi4vQXJjaGl2ZUJhc2VcIjtcbmltcG9ydCB7IEFyY2hpdmVFbnRyeSB9IGZyb20gXCIuL0FyY2hpdmVFbnRyeVwiO1xuaW1wb3J0IHsgQXJjaGl2ZUJ1ZmZlciB9IGZyb20gXCIuL0FyY2hpdmVCdWZmZXJcIjtcbmltcG9ydCB7IGVycm9yQ29kZVRvU3RyaW5nLCBOT19NRU1PUlkgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQXJjaGl2ZVJlYWQgZXh0ZW5kcyBBcmNoaXZlQmFzZSBpbXBsZW1lbnRzIElBcmNoaXZlUmVhZCB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgc3VwZXIoY29udGV4dCwgYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9mcmVlKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHN1cHBvcnRGaWx0ZXJBbGwoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3N1cHBvcnRfZmlsdGVyX2FsbCh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBzdXBwb3J0Rm9ybWF0QWxsKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zdXBwb3J0X2Zvcm1hdF9hbGwodGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUGFzc3BocmFzZShwYXNzcGhyYXNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBwYXNzcGhyYXNlUHRyID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKHBhc3NwaHJhc2UpO1xuICAgIGlmICghcGFzc3BocmFzZVB0cikgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX2FkZF9wYXNzcGhyYXNlKHRoaXMuX2FyY2hpdmUsIHBhc3NwaHJhc2VQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShwYXNzcGhyYXNlUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX29wZW4odGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGNvZGUgIT09IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfY2xvc2UodGhpcy5fYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgbmV4dEhlYWRlcigpOiBBcmNoaXZlRW50cnkgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfbmV4dF9oZWFkZXIodGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGVudHJ5KVxuICAgICAgcmV0dXJuIG5ldyBBcmNoaXZlRW50cnkodGhpcy5fY29udGV4dCwgZW50cnkpO1xuXG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX2xhc3RfZXJyb3IodGhpcy5fYXJjaGl2ZSk7XG4gICAgaWYgKGNvZGUgIT09IEFSQ0hJVkVfT0spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhjb2RlKSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGF0YVJlYWQoYnVmZmVyOiBBcmNoaXZlQnVmZmVyLCBvZmZzZXQ/OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IG51bWJlciB7XG4gICAgb2Zmc2V0ID0gYnVmZmVyLmJ5dGVPZmZzZXQgKyAob2Zmc2V0IHx8IDApO1xuICAgIGxlbmd0aCA9IGxlbmd0aCB8fCBidWZmZXIuYnl0ZUxlbmd0aDtcblxuICAgIGNvbnN0IG4gPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9kYXRhKHRoaXMuX2FyY2hpdmUsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhuKSB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG47XG4gIH1cblxuICBwdWJsaWMgZGF0YVNraXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX3JlYWRfZGF0YV9za2lwKHRoaXMuX2FyY2hpdmUpO1xuICB9XG5cbiAgcHVibGljIHNldCBvbm9wZW4oY2FsbGJhY2s6IEFyY2hpdmVPcGVuQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zZXRfb3Blbl9jYWxsYmFjayh0aGlzLl9hcmNoaXZlLCBjYWxsYmFjayk7XG4gIH1cblxuICBwdWJsaWMgc2V0IG9ucmVhZChjYWxsYmFjazogQXJjaGl2ZVJlYWRDYWxsYmFjaykge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9yZWFkX3NldF9yZWFkX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfcmVhZF9zZXRfY2xvc2VfY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG59O1xuIiwiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG5pbXBvcnQgeyBJQXJjaGl2ZVdyaXRlLCBBcmNoaXZlT3BlbkNhbGxiYWNrLCBBcmNoaXZlV3JpdGVDYWxsYmFjaywgQXJjaGl2ZUNsb3NlQ2FsbGJhY2ssIEFSQ0hJVkVfT0sgfSBmcm9tIFwiLi9BcmNoaXZlXCI7XG5pbXBvcnQgeyBBcmNoaXZlQ29udGV4dCB9IGZyb20gXCIuL0FyY2hpdmVDb250ZXh0XCI7XG5pbXBvcnQgeyBBcmNoaXZlQmFzZSB9IGZyb20gXCIuL0FyY2hpdmVCYXNlXCI7XG5pbXBvcnQgeyBBcmNoaXZlRW50cnkgfSBmcm9tIFwiLi9BcmNoaXZlRW50cnlcIjtcbmltcG9ydCB7IEFyY2hpdmVCdWZmZXIgfSBmcm9tIFwiLi9BcmNoaXZlQnVmZmVyXCI7XG5pbXBvcnQgeyBOT19NRU1PUlksIGVycm9yQ29kZVRvU3RyaW5nIH0gZnJvbSBcIi4vVXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEFyY2hpdmVXcml0ZSBleHRlbmRzIEFyY2hpdmVCYXNlIGltcGxlbWVudHMgSUFyY2hpdmVXcml0ZSB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBcmNoaXZlQ29udGV4dCwgYXJjaGl2ZTogbnVtYmVyKSB7XG4gICAgc3VwZXIoY29udGV4dCwgYXJjaGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfZnJlZSh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgZm9ybWF0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX2J1ZmZlcl9mcm9tKHZhbHVlKTtcbiAgICBpZiAoIW5hbWUpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X2Zvcm1hdF9ieV9uYW1lKHRoaXMuX2FyY2hpdmUsIG5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShuYW1lKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBvcHRpb25zKG9wdGlvbnM6IHN0cmluZykge1xuICAgIGNvbnN0IG9wdGlvbnNQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9vcHRpb25zKHRoaXMuX2FyY2hpdmUsIG9wdGlvbnNQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShvcHRpb25zUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBwYXNzcGhyYXNlKHBhc3NwaHJhc2U6IHN0cmluZykge1xuICAgIGNvbnN0IHBhc3NwaHJhc2VQdHIgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20ocGFzc3BocmFzZSk7XG4gICAgaWYgKCFwYXNzcGhyYXNlUHRyKSB0aHJvdyBuZXcgRXJyb3IoTk9fTUVNT1JZKTtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9wYXNzcGhyYXNlKHRoaXMuX2FyY2hpdmUsIHBhc3NwaHJhc2VQdHIpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShwYXNzcGhyYXNlUHRyKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZEZpbHRlcihmaWx0ZXI6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfYnVmZmVyX2Zyb20oZmlsdGVyKTtcbiAgICBpZiAoIW5hbWUpIHRocm93IG5ldyBFcnJvcihOT19NRU1PUlkpO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfYWRkX2ZpbHRlcl9ieV9uYW1lKHRoaXMuX2FyY2hpdmUsIG5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShuYW1lKTtcbiAgICBpZiAoY29kZSAhPSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldEZvcm1hdEZpbHRlckJ5RXh0KGZpbGVuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmbmFtZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJvbShmaWxlbmFtZSk7XG4gICAgaWYgKCFmbmFtZSkgdGhyb3cgbmV3IEVycm9yKE5PX01FTU9SWSk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9zZXRfZm9ybWF0X2ZpbHRlcl9ieV9leHQodGhpcy5fYXJjaGl2ZSwgZm5hbWUpO1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV9idWZmZXJfZnJlZShmbmFtZSk7XG4gICAgaWYgKGNvZGUgIT0gQVJDSElWRV9PSykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuZXJyb3JTdHJpbmcsIHsgY2F1c2U6IGVycm9yQ29kZVRvU3RyaW5nKGNvZGUpIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25vcGVuKGNhbGxiYWNrOiBBcmNoaXZlT3BlbkNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX3NldF9vcGVuX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb253cml0ZShjYWxsYmFjazogQXJjaGl2ZVdyaXRlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X3dyaXRlX2NhbGxiYWNrKHRoaXMuX2FyY2hpdmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb25jbG9zZShjYWxsYmFjazogQXJjaGl2ZUNsb3NlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb250ZXh0LmFyY2hpdmVfd3JpdGVfc2V0X29wZW5fY2FsbGJhY2sodGhpcy5fYXJjaGl2ZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9vcGVuKHRoaXMuX2FyY2hpdmUpO1xuICAgIGlmIChjb2RlICE9PSBBUkNISVZFX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5lcnJvclN0cmluZywgeyBjYXVzZTogZXJyb3JDb2RlVG9TdHJpbmcoY29kZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9jbG9zZSh0aGlzLl9hcmNoaXZlKTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZUhlYWRlcihlbnRyeTogQXJjaGl2ZUVudHJ5KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5hcmNoaXZlX3dyaXRlX2hlYWRlcih0aGlzLl9hcmNoaXZlLCBlbnRyeS5tZW1vcnlPZmZzZXQpO1xuICB9XG5cbiAgcHVibGljIHdyaXRlRGF0YShidWZmZXI6IEFyY2hpdmVCdWZmZXIsIG9mZnNldD86IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBvZmZzZXQgPSBidWZmZXIuYnl0ZU9mZnNldCArIChvZmZzZXQgfHwgMCk7XG4gICAgbGVuZ3RoID0gbGVuZ3RoIHx8IGJ1ZmZlci5ieXRlTGVuZ3RoIC0gb2Zmc2V0O1xuXG4gICAgY29uc3QgbiA9IHRoaXMuX2NvbnRleHQuYXJjaGl2ZV93cml0ZV9kYXRhKHRoaXMuX2FyY2hpdmUsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmVycm9yU3RyaW5nLCB7IGNhdXNlOiBlcnJvckNvZGVUb1N0cmluZyhuKSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbjtcbiAgfVxufTtcbiIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgQVJDSElWRV9PSywgQVJDSElWRV9SRVRSWSwgQVJDSElWRV9XQVJOLCBBUkNISVZFX0ZBSUxFRCwgQVJDSElWRV9GQVRBTCB9IGZyb20gXCIuL0FyY2hpdmVcIjtcblxuZXhwb3J0IGNvbnN0IE5PX01FTU9SWSA9IFwiTm8gTWVtb3J5XCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3RyaW5nRXh0cmFzIHsgXG5leHBvcnQgZnVuY3Rpb24gZnJvbUJ1ZmZlcihidWZmZXI6IEFycmF5QnVmZmVyLCBvZmZzZXQ6IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogc3RyaW5nXG57XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDA7XG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIsIG9mZnNldCk7XG4gICAgd2hpbGUgKGJ5dGVzW2xlbmd0aF0pXG4gICAgICBsZW5ndGgrKztcbiAgfVxuXG4gIHJldHVybiAobmV3IFRleHREZWNvZGVyKFwidXRmLThcIikpLmRlY29kZShuZXcgVWludDhBcnJheShidWZmZXIsIG9mZnNldCwgbGVuZ3RoKSk7XG59XG59IC8vIG5hbWVzcGFjZSBTdHJpbmdFeHRyYXNcblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yQ29kZVRvU3RyaW5nKGNvZGU6IG51bWJlcik6IHN0cmluZ1xue1xuICBzd2l0Y2ggKGNvZGUpIHtcbiAgY2FzZSBBUkNISVZFX09LOlxuICAgIHJldHVybiBcIkFSQ0hJVkVfT0tcIjtcbiAgY2FzZSBBUkNISVZFX1JFVFJZOlxuICAgIHJldHVybiBcIkFSQ0hJVkVfUkVUUllcIjtcbiAgY2FzZSBBUkNISVZFX1dBUk46XG4gICAgcmV0dXJuIFwiQVJDSElWRV9XQVJOXCI7XG4gIGNhc2UgQVJDSElWRV9GQUlMRUQ6XG4gICAgcmV0dXJuIFwiQVJDSElWRV9GQUlMRURcIjtcbiAgY2FzZSBBUkNISVZFX0ZBVEFMOlxuICAgIHJldHVybiBcIkFSQ0hJVkVfRkFUQUxcIjtcbiAgfVxuXG4gIGlmIChjb2RlIDwgMClcbiAgICByZXR1cm4gXCJBUkNISVZFX1wiICsgKC1jb2RlKTtcblxuICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIGNvZGUgJHtjb2RlfSBtdXN0IGJlIG5lZ2F0aXZlYCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuaW1wb3J0IHsgSUFyY2hpdmUsIElBcmNoaXZlRXhwb3J0LCBEZWNvbXByZXNzT3B0aW9ucywgQ29tcHJlc3NPcHRpb25zIH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuaW1wb3J0IHsgQXJjaGl2ZSB9IGZyb20gXCIuL0FyY2hpdmVJbXBsXCI7XG5pbXBvcnQgeyBBUkNISVZFX09LLCBBUkNISVZFX1JFVFJZLCBBUkNISVZFX1dBUk4sIEFSQ0hJVkVfRkFJTEVELCBBUkNISVZFX0ZBVEFMIH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuaW1wb3J0IHsgQUVfSUZNVCwgQUVfSUZSRUcsIEFFX0lGTE5LLCBBRV9JRlNPQ0ssIEFFX0lGQ0hSLCBBRV9JRkJMSywgQUVfSUZESVIsIEFFX0lGSUZPIH0gZnJvbSBcIi4vQXJjaGl2ZVwiO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRBcmNoaXZlQ29udGV4dChwYXJhbXM/OiBzdHJpbmcgfCBCdWZmZXIpOiBQcm9taXNlPElBcmNoaXZlPiB7XG4gIGlmICghcGFyYW1zKVxuICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXBwb3J0ZWQgcGFyYW1zIGFzIHVuZGVmaW5lZFwiKTtcblxuICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChwYXJhbXMpO1xuICAgICAgcGFyYW1zID0gQnVmZmVyLmZyb20oYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSk7XG4gIH1cblxuICByZXR1cm4gQXJjaGl2ZS5pbnN0YW50aWF0ZShwYXJhbXMpO1xufVxuXG5jb25zdCBsaWJhcmNoaXZlOiBJQXJjaGl2ZUV4cG9ydCA9IE9iamVjdC5hc3NpZ24oZ2V0QXJjaGl2ZUNvbnRleHQsIHtcbiAgQVJDSElWRV9PSyxcbiAgQVJDSElWRV9SRVRSWSxcbiAgQVJDSElWRV9XQVJOLFxuICBBUkNISVZFX0ZBSUxFRCxcbiAgQVJDSElWRV9GQVRBTCxcblxuICBBRV9JRk1ULFxuICBBRV9JRlJFRyxcbiAgQUVfSUZMTkssXG4gIEFFX0lGU09DSyxcbiAgQUVfSUZDSFIsXG4gIEFFX0lGQkxLLFxuICBBRV9JRkRJUixcbiAgQUVfSUZJRk8sXG5cbiAgYXN5bmMgZGVjb21wcmVzcyhpbnB1dDogc3RyaW5nIHwgQnVmZmVyLCBvdXRwdXQ/OiBzdHJpbmcsIG9wdGlvbnM/OiBEZWNvbXByZXNzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKFwiSUFyY2hpdmVFeHBvcnQuZGVjb21wcmVzc1wiKTtcbiAgICAvL3JldHVybiBBcmNoaXZlT3BlcmF0aW9ucy5kZWNvbXByZXNzKHdlYkZzLCBhd2FpdCBuZXdBcmNoaXZlQ29udGV4dCgpLCBpbnB1dCwgb3V0cHV0LCBvcHRpb25zKTtcbiAgfSxcblxuICBhc3luYyBjb21wcmVzcyhpbnB1dDogc3RyaW5nIHwgc3RyaW5nW10sIG91dHB1dDogc3RyaW5nLCBvcHRpb25zPzogQ29tcHJlc3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc29sZS5sb2coXCJJQXJjaGl2ZUV4cG9ydC5jb21wcmVzc1wiKTtcbiAgICAvL3JldHVybiBBcmNoaXZlT3BlcmF0aW9ucy5jb21wcmVzcyh3ZWJGcywgYXdhaXQgbmV3QXJjaGl2ZUNvbnRleHQoKSwgaW5wdXQsIG91dHB1dCwgb3B0aW9ucyk7XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbGliYXJjaGl2ZTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==