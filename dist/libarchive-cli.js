#!/usr/bin/env node
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

/***/ "libarchive/node":
/*!***************************************!*\
  !*** external "./libarchive-node.js" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("./libarchive-node.js");

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
  !*** ./src/NodeProgram.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var libarchive_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libarchive/node */ "libarchive/node");
/* harmony import */ var libarchive_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(libarchive_node__WEBPACK_IMPORTED_MODULE_0__);
/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */
/// <reference path="global.d.ts" />
// @ts-ignore

const _O = (sopt, lopt, arg, desc) => ({ sopt, lopt, arg, desc });
const opts = [
    _O("c", "create", null, "create a new archive"),
    _O("x", "extract", null, "extract files from an archive"),
    _O("C", "directory", "DIR", "change to directory DIR"),
    _O("f", "file", "ARCHIVE", "extract files from an archive"),
    _O("", "version", null, "print program version"),
    _O("v", "verbose", null, "verbosely list files processed"),
    _O("?", "help", null, "give this help list"),
];
const TRY_MESSAGE = `Try '${"libarchive"} --help' for more information.`;
function usage() {
    console.log(`Usage: ${"libarchive"} [OPTION...] [FILE]...`);
    console.log("");
    console.log("Examples:");
    console.log(`  ${"libarchive"} -cvf archive.tar dir file # Create archive.tar from dir and file`);
    console.log(`  ${"libarchive"} -xvf archive.zip          # Extract all files from archive.zip`);
    console.log("");
    console.log("Options:");
    const lines = [];
    let maxLength = 0;
    for (const iter of opts) {
        const sopt = iter.sopt ? `-${iter.sopt},` : "   ";
        const text = `  ${sopt}  --${iter.lopt}` + (iter.arg ? "=" + iter.arg : "");
        maxLength = Math.max(maxLength, text.length);
        lines.push({ text, desc: iter.desc });
    }
    maxLength += 2;
    for (const iter of lines)
        console.log(iter.text.padEnd(maxLength, " ") + iter.desc);
    console.log("");
}
async function runScript() {
    const [, , ...args] = process.argv;
    const files = [];
    const options = {};
    let lastOpt = "";
    for (const iter of args) {
        if (!iter) {
            console.log(`${"libarchive"}: option is empty`);
            process.exit(1);
        }
        if (files.length) {
            files.push(iter);
            continue;
        }
        if (lastOpt) {
            options[lastOpt] = iter;
            lastOpt = "";
            continue;
        }
        if (iter.startsWith("--")) {
            let name = iter.slice(2);
            let val = true;
            const n = name.indexOf("=");
            if (n !== -1) {
                val = name.slice(n + 1);
                if (!val) {
                    console.log(`${"libarchive"}: option '${iter}' is empty`);
                    console.log(TRY_MESSAGE);
                    process.exit(1);
                }
                name = name.slice(0, n);
            }
            const opt = opts.find(i => i.lopt === name);
            if (!opt) {
                console.log(`${"libarchive"}: unrecognized option '${iter}'`);
                console.log(TRY_MESSAGE);
                process.exit(1);
            }
            options[name] = val;
            continue;
        }
        if (iter[0] == "-") {
            for (const ch of iter.slice(1)) {
                const opt = opts.find(i => i.sopt === ch);
                if (!opt) {
                    console.log(`${"libarchive"}: invalid option -- '${ch}'`);
                    console.log(TRY_MESSAGE);
                    process.exit(1);
                }
                if (lastOpt) {
                    console.log(`${"libarchive"}: option '${lastOpt}' not last in '${iter}'`);
                    console.log(TRY_MESSAGE);
                    process.exit(1);
                }
                if (opt.arg) {
                    lastOpt = opt.lopt;
                }
                else {
                    options[opt.lopt] = true;
                }
            }
            continue;
        }
        files.push(iter);
    }
    if (options.help) {
        usage();
        return;
    }
    const context = await libarchive_node__WEBPACK_IMPORTED_MODULE_0___default()();
    if (options.extract) {
        if (!options.file) {
            console.log(`${"libarchive"}: Archive file not specified (missing -f option)`);
            process.exit(1);
        }
        await libarchive_node__WEBPACK_IMPORTED_MODULE_0___default().decompress(options.file, options.directory, { verbose: options.verbose });
        return;
    }
    if (options.create) {
        if (!options.file) {
            console.log(`${"libarchive"}: Archive file not specified (missing -f option)`);
            process.exit(1);
        }
        await libarchive_node__WEBPACK_IMPORTED_MODULE_0___default().compress(files, options.file, { verbose: options.verbose });
        return;
    }
    if (options.version) {
        console.log(`Version ${"0.0.1-develop.10"}`);
        console.log(context.versionDetails);
        return;
    }
    console.log(`${"libarchive"}: determine the required command`);
    console.log(TRY_MESSAGE);
    process.exit(1);
}
runScript().then(() => process.exit(0)).catch((e) => {
    if (e instanceof Error) {
        if (e.cause)
            console.error("Cause:", e.cause);
        console.error(e.stack);
    }
    else
        console.error(e);
    process.exit(2);
});

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDQUFDO0lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQixDQUFDO0FBRUQsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNsRCxJQUFJLENBQUMsWUFBWSxLQUFLLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsQ0FBQyxLQUFLO1lBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7O1FBRUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS9leHRlcm5hbCBjb21tb25qczIgXCIuL2xpYmFyY2hpdmUtbm9kZS5qc1wiIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xpYmFyY2hpdmUvLi9zcmMvTm9kZVByb2dyYW0udHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibGliYXJjaGl2ZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJsaWJhcmNoaXZlXCJdID0gZmFjdG9yeSgpO1xufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9saWJhcmNoaXZlLW5vZGUuanNcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyNSAgWXVyaWkgWWFrdWJpbiAoeXVyaWkueWFrdWJpbkBnbWFpbC5jb20pXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImdsb2JhbC5kLnRzXCIgLz5cblxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IGxpYmFyY2hpdmUgZnJvbSBcImxpYmFyY2hpdmUvbm9kZVwiO1xuXG5jb25zdCBfTyA9IChzb3B0OiBzdHJpbmcsIGxvcHQ6IHN0cmluZywgYXJnOiBzdHJpbmcgfCBudWxsLCBkZXNjOiBzdHJpbmcpID0+ICh7c29wdCwgbG9wdCwgYXJnLCBkZXNjfSk7XG5cbmNvbnN0IG9wdHMgPSBbXG4gIF9PKCBcImNcIiwgICBcImNyZWF0ZVwiLCAgICBudWxsLCAgICAgICBcImNyZWF0ZSBhIG5ldyBhcmNoaXZlXCIgICAgICAgICAgICksXG4gIF9PKCBcInhcIiwgICBcImV4dHJhY3RcIiwgICBudWxsLCAgICAgICBcImV4dHJhY3QgZmlsZXMgZnJvbSBhbiBhcmNoaXZlXCIgICksXG4gIF9PKCBcIkNcIiwgICBcImRpcmVjdG9yeVwiLCBcIkRJUlwiLCAgICAgIFwiY2hhbmdlIHRvIGRpcmVjdG9yeSBESVJcIiAgICAgICAgKSxcbiAgX08oIFwiZlwiLCAgIFwiZmlsZVwiLCAgICAgIFwiQVJDSElWRVwiLCAgXCJleHRyYWN0IGZpbGVzIGZyb20gYW4gYXJjaGl2ZVwiICApLFxuICBfTyggXCJcIiwgICAgXCJ2ZXJzaW9uXCIsICAgbnVsbCwgICAgICAgXCJwcmludCBwcm9ncmFtIHZlcnNpb25cIiAgICAgICAgICApLFxuICBfTyggXCJ2XCIsICAgXCJ2ZXJib3NlXCIsICAgbnVsbCwgICAgICAgXCJ2ZXJib3NlbHkgbGlzdCBmaWxlcyBwcm9jZXNzZWRcIiApLFxuICBfTyggXCI/XCIsICAgXCJoZWxwXCIsICAgICAgbnVsbCwgICAgICAgXCJnaXZlIHRoaXMgaGVscCBsaXN0XCIgICAgICAgICAgICApLFxuXTtcblxuY29uc3QgVFJZX01FU1NBR0UgPSBgVHJ5ICcke1BST0pFQ1RfTkFNRX0gLS1oZWxwJyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5gO1xuXG5mdW5jdGlvbiB1c2FnZSgpIHtcbiAgY29uc29sZS5sb2coYFVzYWdlOiAke1BST0pFQ1RfTkFNRX0gW09QVElPTi4uLl0gW0ZJTEVdLi4uYCk7XG4gIGNvbnNvbGUubG9nKFwiXCIpO1xuICBjb25zb2xlLmxvZyhcIkV4YW1wbGVzOlwiKTtcbiAgY29uc29sZS5sb2coYCAgJHtQUk9KRUNUX05BTUV9IC1jdmYgYXJjaGl2ZS50YXIgZGlyIGZpbGUgIyBDcmVhdGUgYXJjaGl2ZS50YXIgZnJvbSBkaXIgYW5kIGZpbGVgKTtcbiAgY29uc29sZS5sb2coYCAgJHtQUk9KRUNUX05BTUV9IC14dmYgYXJjaGl2ZS56aXAgICAgICAgICAgIyBFeHRyYWN0IGFsbCBmaWxlcyBmcm9tIGFyY2hpdmUuemlwYCk7XG4gIGNvbnNvbGUubG9nKFwiXCIpO1xuICBjb25zb2xlLmxvZyhcIk9wdGlvbnM6XCIpO1xuXG4gIGNvbnN0IGxpbmVzID0gW107XG4gIGxldCBtYXhMZW5ndGggPSAwO1xuICBmb3IgKGNvbnN0IGl0ZXIgb2Ygb3B0cykge1xuICAgIGNvbnN0IHNvcHQgPSBpdGVyLnNvcHQgPyBgLSR7aXRlci5zb3B0fSxgIDogXCIgICBcIjtcbiAgICBjb25zdCB0ZXh0ID0gYCAgJHtzb3B0fSAgLS0ke2l0ZXIubG9wdH1gICsgKGl0ZXIuYXJnID8gXCI9XCIgKyBpdGVyLmFyZyA6IFwiXCIpO1xuICAgIG1heExlbmd0aCA9IE1hdGgubWF4KG1heExlbmd0aCwgdGV4dC5sZW5ndGgpO1xuICAgIGxpbmVzLnB1c2goeyB0ZXh0LCBkZXNjOiBpdGVyLmRlc2MgfSk7XG4gIH1cblxuICBtYXhMZW5ndGggKz0gMjtcbiAgZm9yIChjb25zdCBpdGVyIG9mIGxpbmVzKVxuICAgIGNvbnNvbGUubG9nKGl0ZXIudGV4dC5wYWRFbmQobWF4TGVuZ3RoLCBcIiBcIikgKyBpdGVyLmRlc2MpO1xuICBjb25zb2xlLmxvZyhcIlwiKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcnVuU2NyaXB0KCkge1xuICBjb25zdCBbICwsIC4uLmFyZ3MgXSA9IHByb2Nlc3MuYXJndjtcblxuICBjb25zdCBmaWxlcyA9IFtdO1xuICBjb25zdCBvcHRpb25zOiBhbnkgPSB7fTtcbiAgbGV0IGxhc3RPcHQgPSBcIlwiO1xuXG4gIGZvciAoY29uc3QgaXRlciBvZiBhcmdzKSB7XG4gICAgaWYgKCFpdGVyKSB7XG4gICAgICBjb25zb2xlLmxvZyhgJHtQUk9KRUNUX05BTUV9OiBvcHRpb24gaXMgZW1wdHlgKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG5cbiAgICBpZiAoZmlsZXMubGVuZ3RoKSB7XG4gICAgICBmaWxlcy5wdXNoKGl0ZXIpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGxhc3RPcHQpIHtcbiAgICAgIG9wdGlvbnNbbGFzdE9wdF0gPSBpdGVyO1xuICAgICAgbGFzdE9wdCA9IFwiXCI7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoaXRlci5zdGFydHNXaXRoKFwiLS1cIikpIHtcbiAgICAgIGxldCBuYW1lID0gaXRlci5zbGljZSgyKTtcbiAgICAgIGxldCB2YWw6IHN0cmluZyB8IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgY29uc3QgbiA9IG5hbWUuaW5kZXhPZihcIj1cIik7XG4gICAgICBpZiAobiAhPT0gLTEpIHtcbiAgICAgICAgdmFsID0gbmFtZS5zbGljZShuICsgMSk7XG4gICAgICAgIGlmICghdmFsKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYCR7UFJPSkVDVF9OQU1FfTogb3B0aW9uICcke2l0ZXJ9JyBpcyBlbXB0eWApO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFRSWV9NRVNTQUdFKTtcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH1cbiAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMCwgbik7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHQgPSBvcHRzLmZpbmQoaSA9PiBpLmxvcHQgPT09IG5hbWUpO1xuICAgICAgaWYgKCFvcHQpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7UFJPSkVDVF9OQU1FfTogdW5yZWNvZ25pemVkIG9wdGlvbiAnJHtpdGVyfSdgKTtcbiAgICAgICAgY29uc29sZS5sb2coVFJZX01FU1NBR0UpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICB9XG4gICAgICBvcHRpb25zW25hbWVdID0gdmFsO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGl0ZXJbMF0gPT0gXCItXCIpIHtcbiAgICAgIGZvciAoY29uc3QgY2ggb2YgaXRlci5zbGljZSgxKSkge1xuICAgICAgICBjb25zdCBvcHQgPSBvcHRzLmZpbmQoaSA9PiBpLnNvcHQgPT09IGNoKTtcbiAgICAgICAgaWYgKCFvcHQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtQUk9KRUNUX05BTUV9OiBpbnZhbGlkIG9wdGlvbiAtLSAnJHtjaH0nYCk7XG4gICAgICAgICAgY29uc29sZS5sb2coVFJZX01FU1NBR0UpO1xuICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdE9wdCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGAke1BST0pFQ1RfTkFNRX06IG9wdGlvbiAnJHtsYXN0T3B0fScgbm90IGxhc3QgaW4gJyR7aXRlcn0nYCk7XG4gICAgICAgICAgY29uc29sZS5sb2coVFJZX01FU1NBR0UpO1xuICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0LmFyZykge1xuICAgICAgICAgIGxhc3RPcHQgPSBvcHQubG9wdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zW29wdC5sb3B0XSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGZpbGVzLnB1c2goaXRlcik7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oZWxwKSB7XG4gICAgdXNhZ2UoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgbGliYXJjaGl2ZSgpO1xuXG4gIGlmIChvcHRpb25zLmV4dHJhY3QpIHtcbiAgICBpZiAoIW9wdGlvbnMuZmlsZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtQUk9KRUNUX05BTUV9OiBBcmNoaXZlIGZpbGUgbm90IHNwZWNpZmllZCAobWlzc2luZyAtZiBvcHRpb24pYCk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG4gICAgYXdhaXQgbGliYXJjaGl2ZS5kZWNvbXByZXNzKG9wdGlvbnMuZmlsZSwgb3B0aW9ucy5kaXJlY3RvcnksIHsgdmVyYm9zZTogb3B0aW9ucy52ZXJib3NlIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmNyZWF0ZSkge1xuICAgIGlmICghb3B0aW9ucy5maWxlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke1BST0pFQ1RfTkFNRX06IEFyY2hpdmUgZmlsZSBub3Qgc3BlY2lmaWVkIChtaXNzaW5nIC1mIG9wdGlvbilgKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH1cbiAgICBhd2FpdCBsaWJhcmNoaXZlLmNvbXByZXNzKGZpbGVzLCBvcHRpb25zLmZpbGUsIHsgdmVyYm9zZTogb3B0aW9ucy52ZXJib3NlIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnZlcnNpb24pIHtcbiAgICBjb25zb2xlLmxvZyhgVmVyc2lvbiAke1BST0pFQ1RfVkVSU0lPTn1gKTtcbiAgICBjb25zb2xlLmxvZyhjb250ZXh0LnZlcnNpb25EZXRhaWxzKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zb2xlLmxvZyhgJHtQUk9KRUNUX05BTUV9OiBkZXRlcm1pbmUgdGhlIHJlcXVpcmVkIGNvbW1hbmRgKTtcbiAgY29uc29sZS5sb2coVFJZX01FU1NBR0UpO1xuICBwcm9jZXNzLmV4aXQoMSk7XG59XG5cbnJ1blNjcmlwdCgpLnRoZW4oKCkgPT4gcHJvY2Vzcy5leGl0KDApKS5jYXRjaCgoZSkgPT4ge1xuICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgaWYgKGUuY2F1c2UpXG4gICAgICBjb25zb2xlLmVycm9yKFwiQ2F1c2U6XCIsIGUuY2F1c2UpO1xuICAgIGNvbnNvbGUuZXJyb3IoZS5zdGFjayk7XG4gIH1cbiAgZWxzZVxuICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gIHByb2Nlc3MuZXhpdCgyKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9