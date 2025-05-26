#!/usr/bin/env node
/******/ (() => { // webpackBootstrap
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEIsQ0FBQztBQUVELFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDbEQsSUFBSSxDQUFDLFlBQVksS0FBSyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLENBQUMsS0FBSztZQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDOztRQUVDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xpYmFyY2hpdmUvZXh0ZXJuYWwgY29tbW9uanMyIFwiLi9saWJhcmNoaXZlLW5vZGUuanNcIiIsIndlYnBhY2s6Ly9saWJhcmNoaXZlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGliYXJjaGl2ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xpYmFyY2hpdmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9saWJhcmNoaXZlLy4vc3JjL05vZGVQcm9ncmFtLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vbGliYXJjaGl2ZS1ub2RlLmpzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjUgIFl1cmlpIFlha3ViaW4gKHl1cmlpLnlha3ViaW5AZ21haWwuY29tKVxuICpcbiAqIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZVxuICogdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGZvciBkZXRhaWxzLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJnbG9iYWwuZC50c1wiIC8+XG5cbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBsaWJhcmNoaXZlIGZyb20gXCJsaWJhcmNoaXZlL25vZGVcIjtcblxuY29uc3QgX08gPSAoc29wdDogc3RyaW5nLCBsb3B0OiBzdHJpbmcsIGFyZzogc3RyaW5nIHwgbnVsbCwgZGVzYzogc3RyaW5nKSA9PiAoe3NvcHQsIGxvcHQsIGFyZywgZGVzY30pO1xuXG5jb25zdCBvcHRzID0gW1xuICBfTyggXCJjXCIsICAgXCJjcmVhdGVcIiwgICAgbnVsbCwgICAgICAgXCJjcmVhdGUgYSBuZXcgYXJjaGl2ZVwiICAgICAgICAgICApLFxuICBfTyggXCJ4XCIsICAgXCJleHRyYWN0XCIsICAgbnVsbCwgICAgICAgXCJleHRyYWN0IGZpbGVzIGZyb20gYW4gYXJjaGl2ZVwiICApLFxuICBfTyggXCJDXCIsICAgXCJkaXJlY3RvcnlcIiwgXCJESVJcIiwgICAgICBcImNoYW5nZSB0byBkaXJlY3RvcnkgRElSXCIgICAgICAgICksXG4gIF9PKCBcImZcIiwgICBcImZpbGVcIiwgICAgICBcIkFSQ0hJVkVcIiwgIFwiZXh0cmFjdCBmaWxlcyBmcm9tIGFuIGFyY2hpdmVcIiAgKSxcbiAgX08oIFwiXCIsICAgIFwidmVyc2lvblwiLCAgIG51bGwsICAgICAgIFwicHJpbnQgcHJvZ3JhbSB2ZXJzaW9uXCIgICAgICAgICAgKSxcbiAgX08oIFwidlwiLCAgIFwidmVyYm9zZVwiLCAgIG51bGwsICAgICAgIFwidmVyYm9zZWx5IGxpc3QgZmlsZXMgcHJvY2Vzc2VkXCIgKSxcbiAgX08oIFwiP1wiLCAgIFwiaGVscFwiLCAgICAgIG51bGwsICAgICAgIFwiZ2l2ZSB0aGlzIGhlbHAgbGlzdFwiICAgICAgICAgICAgKSxcbl07XG5cbmNvbnN0IFRSWV9NRVNTQUdFID0gYFRyeSAnJHtQUk9KRUNUX05BTUV9IC0taGVscCcgZm9yIG1vcmUgaW5mb3JtYXRpb24uYDtcblxuZnVuY3Rpb24gdXNhZ2UoKSB7XG4gIGNvbnNvbGUubG9nKGBVc2FnZTogJHtQUk9KRUNUX05BTUV9IFtPUFRJT04uLi5dIFtGSUxFXS4uLmApO1xuICBjb25zb2xlLmxvZyhcIlwiKTtcbiAgY29uc29sZS5sb2coXCJFeGFtcGxlczpcIik7XG4gIGNvbnNvbGUubG9nKGAgICR7UFJPSkVDVF9OQU1FfSAtY3ZmIGFyY2hpdmUudGFyIGRpciBmaWxlICMgQ3JlYXRlIGFyY2hpdmUudGFyIGZyb20gZGlyIGFuZCBmaWxlYCk7XG4gIGNvbnNvbGUubG9nKGAgICR7UFJPSkVDVF9OQU1FfSAteHZmIGFyY2hpdmUuemlwICAgICAgICAgICMgRXh0cmFjdCBhbGwgZmlsZXMgZnJvbSBhcmNoaXZlLnppcGApO1xuICBjb25zb2xlLmxvZyhcIlwiKTtcbiAgY29uc29sZS5sb2coXCJPcHRpb25zOlwiKTtcblxuICBjb25zdCBsaW5lcyA9IFtdO1xuICBsZXQgbWF4TGVuZ3RoID0gMDtcbiAgZm9yIChjb25zdCBpdGVyIG9mIG9wdHMpIHtcbiAgICBjb25zdCBzb3B0ID0gaXRlci5zb3B0ID8gYC0ke2l0ZXIuc29wdH0sYCA6IFwiICAgXCI7XG4gICAgY29uc3QgdGV4dCA9IGAgICR7c29wdH0gIC0tJHtpdGVyLmxvcHR9YCArIChpdGVyLmFyZyA/IFwiPVwiICsgaXRlci5hcmcgOiBcIlwiKTtcbiAgICBtYXhMZW5ndGggPSBNYXRoLm1heChtYXhMZW5ndGgsIHRleHQubGVuZ3RoKTtcbiAgICBsaW5lcy5wdXNoKHsgdGV4dCwgZGVzYzogaXRlci5kZXNjIH0pO1xuICB9XG5cbiAgbWF4TGVuZ3RoICs9IDI7XG4gIGZvciAoY29uc3QgaXRlciBvZiBsaW5lcylcbiAgICBjb25zb2xlLmxvZyhpdGVyLnRleHQucGFkRW5kKG1heExlbmd0aCwgXCIgXCIpICsgaXRlci5kZXNjKTtcbiAgY29uc29sZS5sb2coXCJcIik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1blNjcmlwdCgpIHtcbiAgY29uc3QgWyAsLCAuLi5hcmdzIF0gPSBwcm9jZXNzLmFyZ3Y7XG5cbiAgY29uc3QgZmlsZXMgPSBbXTtcbiAgY29uc3Qgb3B0aW9uczogYW55ID0ge307XG4gIGxldCBsYXN0T3B0ID0gXCJcIjtcblxuICBmb3IgKGNvbnN0IGl0ZXIgb2YgYXJncykge1xuICAgIGlmICghaXRlcikge1xuICAgICAgY29uc29sZS5sb2coYCR7UFJPSkVDVF9OQU1FfTogb3B0aW9uIGlzIGVtcHR5YCk7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfVxuXG4gICAgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgZmlsZXMucHVzaChpdGVyKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChsYXN0T3B0KSB7XG4gICAgICBvcHRpb25zW2xhc3RPcHRdID0gaXRlcjtcbiAgICAgIGxhc3RPcHQgPSBcIlwiO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGl0ZXIuc3RhcnRzV2l0aChcIi0tXCIpKSB7XG4gICAgICBsZXQgbmFtZSA9IGl0ZXIuc2xpY2UoMik7XG4gICAgICBsZXQgdmFsOiBzdHJpbmcgfCBib29sZWFuID0gdHJ1ZTtcbiAgICAgIGNvbnN0IG4gPSBuYW1lLmluZGV4T2YoXCI9XCIpO1xuICAgICAgaWYgKG4gIT09IC0xKSB7XG4gICAgICAgIHZhbCA9IG5hbWUuc2xpY2UobiArIDEpO1xuICAgICAgICBpZiAoIXZhbCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGAke1BST0pFQ1RfTkFNRX06IG9wdGlvbiAnJHtpdGVyfScgaXMgZW1wdHlgKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhUUllfTUVTU0FHRSk7XG4gICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICB9XG4gICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDAsIG4pO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0ID0gb3B0cy5maW5kKGkgPT4gaS5sb3B0ID09PSBuYW1lKTtcbiAgICAgIGlmICghb3B0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke1BST0pFQ1RfTkFNRX06IHVucmVjb2duaXplZCBvcHRpb24gJyR7aXRlcn0nYCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFRSWV9NRVNTQUdFKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgfVxuICAgICAgb3B0aW9uc1tuYW1lXSA9IHZhbDtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChpdGVyWzBdID09IFwiLVwiKSB7XG4gICAgICBmb3IgKGNvbnN0IGNoIG9mIGl0ZXIuc2xpY2UoMSkpIHtcbiAgICAgICAgY29uc3Qgb3B0ID0gb3B0cy5maW5kKGkgPT4gaS5zb3B0ID09PSBjaCk7XG4gICAgICAgIGlmICghb3B0KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYCR7UFJPSkVDVF9OQU1FfTogaW52YWxpZCBvcHRpb24gLS0gJyR7Y2h9J2ApO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFRSWV9NRVNTQUdFKTtcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RPcHQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtQUk9KRUNUX05BTUV9OiBvcHRpb24gJyR7bGFzdE9wdH0nIG5vdCBsYXN0IGluICcke2l0ZXJ9J2ApO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFRSWV9NRVNTQUdFKTtcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdC5hcmcpIHtcbiAgICAgICAgICBsYXN0T3B0ID0gb3B0LmxvcHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgb3B0aW9uc1tvcHQubG9wdF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBmaWxlcy5wdXNoKGl0ZXIpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGVscCkge1xuICAgIHVzYWdlKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGxpYmFyY2hpdmUoKTtcblxuICBpZiAob3B0aW9ucy5leHRyYWN0KSB7XG4gICAgaWYgKCFvcHRpb25zLmZpbGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7UFJPSkVDVF9OQU1FfTogQXJjaGl2ZSBmaWxlIG5vdCBzcGVjaWZpZWQgKG1pc3NpbmcgLWYgb3B0aW9uKWApO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfVxuICAgIGF3YWl0IGxpYmFyY2hpdmUuZGVjb21wcmVzcyhvcHRpb25zLmZpbGUsIG9wdGlvbnMuZGlyZWN0b3J5LCB7IHZlcmJvc2U6IG9wdGlvbnMudmVyYm9zZSB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAob3B0aW9ucy5jcmVhdGUpIHtcbiAgICBpZiAoIW9wdGlvbnMuZmlsZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtQUk9KRUNUX05BTUV9OiBBcmNoaXZlIGZpbGUgbm90IHNwZWNpZmllZCAobWlzc2luZyAtZiBvcHRpb24pYCk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG4gICAgYXdhaXQgbGliYXJjaGl2ZS5jb21wcmVzcyhmaWxlcywgb3B0aW9ucy5maWxlLCB7IHZlcmJvc2U6IG9wdGlvbnMudmVyYm9zZSB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAob3B0aW9ucy52ZXJzaW9uKSB7XG4gICAgY29uc29sZS5sb2coYFZlcnNpb24gJHtQUk9KRUNUX1ZFUlNJT059YCk7XG4gICAgY29uc29sZS5sb2coY29udGV4dC52ZXJzaW9uRGV0YWlscyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc29sZS5sb2coYCR7UFJPSkVDVF9OQU1FfTogZGV0ZXJtaW5lIHRoZSByZXF1aXJlZCBjb21tYW5kYCk7XG4gIGNvbnNvbGUubG9nKFRSWV9NRVNTQUdFKTtcbiAgcHJvY2Vzcy5leGl0KDEpO1xufVxuXG5ydW5TY3JpcHQoKS50aGVuKCgpID0+IHByb2Nlc3MuZXhpdCgwKSkuY2F0Y2goKGUpID0+IHtcbiAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIGlmIChlLmNhdXNlKVxuICAgICAgY29uc29sZS5lcnJvcihcIkNhdXNlOlwiLCBlLmNhdXNlKTtcbiAgICBjb25zb2xlLmVycm9yKGUuc3RhY2spO1xuICB9XG4gIGVsc2VcbiAgICBjb25zb2xlLmVycm9yKGUpO1xuICBwcm9jZXNzLmV4aXQoMik7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==