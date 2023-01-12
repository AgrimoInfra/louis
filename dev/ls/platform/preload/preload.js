/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ls/platform/shared/providers/bundle.ts":
/*!****************************************************!*\
  !*** ./src/ls/platform/shared/providers/bundle.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
const webFrame_1 = __webpack_require__(/*! ./webFrame/webFrame */ "./src/ls/platform/shared/providers/webFrame/webFrame.ts");
const ipcChannel_1 = __webpack_require__(/*! ./ipcChannel/ipcChannel */ "./src/ls/platform/shared/providers/ipcChannel/ipcChannel.ts");
const shutDown_1 = __webpack_require__(/*! ./shutDown/shutDown */ "./src/ls/platform/shared/providers/shutDown/shutDown.ts");
const electron_1 = __webpack_require__(/*! electron */ "electron");
const globals = {
    IpcRenderer: ipcChannel_1.IpcChannel,
    WebFrame: webFrame_1.WebFrameManager,
    ShutDownSystem: shutDown_1.ShutDownManager
};
if (process.contextIsolated) {
    try {
        electron_1.contextBridge.exposeInMainWorld('louis', globals);
    }
    catch (error) {
        console.error(error);
    }
}
else {
    //@ts-ignore
    window.louis = globals;
}


/***/ }),

/***/ "./src/ls/platform/shared/providers/ipcChannel/ipcChannel.ts":
/*!*******************************************************************!*\
  !*** ./src/ls/platform/shared/providers/ipcChannel/ipcChannel.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IpcChannel = exports.IPCChannel = void 0;
/**
 * IpcChannel Used By the MainProcess
 */
const electron_1 = __webpack_require__(/*! electron */ "electron");
class IPCChannel {
    constructor() { }
    validateIpcChannel(channel) {
        if (!channel || !channel.startsWith("louis:")) {
            throw new Error(`Unsupported event IPC channel '${channel}'`);
        }
        return true;
    }
    //globals;
    send(channel, ...args) {
        if (this.validateIpcChannel(channel)) {
            electron_1.ipcRenderer.send(channel, ...args);
        }
    }
    invoke(channel, ...args) {
        if (this.validateIpcChannel(channel)) {
            return electron_1.ipcRenderer.invoke(channel, ...args);
        }
        else {
            return `[FAILED_IPC_CHANNEL]`;
        }
    }
    ;
    on(channel, listener) {
        if (this.validateIpcChannel(channel)) {
            electron_1.ipcRenderer.on(channel, listener);
            return this;
        }
        else {
            return `[FAILED_IPC_CHANNEL]`;
        }
    }
    once(channel, listener) {
        if (this.validateIpcChannel(channel)) {
            electron_1.ipcRenderer.once(channel, listener);
            return this;
        }
        else {
            return `[FAILED_IPC_CHANNEL]`;
        }
    }
    removeEventListener(channel, listener) {
        if (this.validateIpcChannel(channel)) {
            electron_1.ipcRenderer.removeListener(channel, listener);
            return this;
        }
        else {
            return `[FAILED_IPC_CHANNEL]`;
        }
    }
}
exports.IPCChannel = IPCChannel;
function I() {
    return new IPCChannel();
}
exports.IpcChannel = I();


/***/ }),

/***/ "./src/ls/platform/shared/providers/shutDown/shutDown.ts":
/*!***************************************************************!*\
  !*** ./src/ls/platform/shared/providers/shutDown/shutDown.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShutDownManager = void 0;
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
exports.ShutDownManager = {
    invoke() {
        //check operating system
        if (process.platform == "win32") {
            (0, child_process_1.exec)('shutdown.exe /s /t 00', (err, stdout, stderr) => {
                console.log(`${stdout}`);
                console.log(`${stderr}`);
                if (err !== null) {
                    console.log(`exec error: ${err}`);
                }
            });
        }
    }
};


/***/ }),

/***/ "./src/ls/platform/shared/providers/webFrame/webFrame.ts":
/*!***************************************************************!*\
  !*** ./src/ls/platform/shared/providers/webFrame/webFrame.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebFrameManager = void 0;
const electron_1 = __webpack_require__(/*! electron */ "electron");
/**
 * webframe
 */
const webFrameAPI = {
    setZoomLevel(level) {
        if (typeof level === 'number') {
            electron_1.webFrame.setZoomLevel(level);
        }
    }
};
exports.WebFrameManager = webFrameAPI;


/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*******************************************!*\
  !*** ./src/ls/platform/shared/preload.ts ***!
  \*******************************************/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
//off the main build
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./providers/bundle */ "./src/ls/platform/shared/providers/bundle.ts");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUIsbUJBQU8sQ0FBQyxvRkFBcUI7QUFDaEQscUJBQXFCLG1CQUFPLENBQUMsNEZBQXlCO0FBQ3RELG1CQUFtQixtQkFBTyxDQUFDLG9GQUFxQjtBQUNoRCxtQkFBbUIsbUJBQU8sQ0FBQywwQkFBVTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFCYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQixHQUFHLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQU8sQ0FBQywwQkFBVTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCxRQUFRO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjs7Ozs7Ozs7Ozs7QUNsRUw7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx1QkFBdUI7QUFDdkIsd0JBQXdCLG1CQUFPLENBQUMsb0NBQWU7QUFDL0MsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLE9BQU87QUFDdEMsK0JBQStCLE9BQU87QUFDdEM7QUFDQSwrQ0FBK0MsSUFBSTtBQUNuRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDckJhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsdUJBQXVCO0FBQ3ZCLG1CQUFtQixtQkFBTyxDQUFDLDBCQUFVO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCOzs7Ozs7Ozs7OztBQ2xCdkI7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQU8sQ0FBQyx3RUFBb0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3JyZW5jZXItZGV2Ly4vc3JjL2xzL3BsYXRmb3JtL3NoYXJlZC9wcm92aWRlcnMvYnVuZGxlLnRzIiwid2VicGFjazovL3RvcnJlbmNlci1kZXYvLi9zcmMvbHMvcGxhdGZvcm0vc2hhcmVkL3Byb3ZpZGVycy9pcGNDaGFubmVsL2lwY0NoYW5uZWwudHMiLCJ3ZWJwYWNrOi8vdG9ycmVuY2VyLWRldi8uL3NyYy9scy9wbGF0Zm9ybS9zaGFyZWQvcHJvdmlkZXJzL3NodXREb3duL3NodXREb3duLnRzIiwid2VicGFjazovL3RvcnJlbmNlci1kZXYvLi9zcmMvbHMvcGxhdGZvcm0vc2hhcmVkL3Byb3ZpZGVycy93ZWJGcmFtZS93ZWJGcmFtZS50cyIsIndlYnBhY2s6Ly90b3JyZW5jZXItZGV2L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vdG9ycmVuY2VyLWRldi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly90b3JyZW5jZXItZGV2L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcnJlbmNlci1kZXYvLi9zcmMvbHMvcGxhdGZvcm0vc2hhcmVkL3ByZWxvYWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIEFncmltbyBJbmZyYSBMVEQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB3ZWJGcmFtZV8xID0gcmVxdWlyZShcIi4vd2ViRnJhbWUvd2ViRnJhbWVcIik7XHJcbmNvbnN0IGlwY0NoYW5uZWxfMSA9IHJlcXVpcmUoXCIuL2lwY0NoYW5uZWwvaXBjQ2hhbm5lbFwiKTtcclxuY29uc3Qgc2h1dERvd25fMSA9IHJlcXVpcmUoXCIuL3NodXREb3duL3NodXREb3duXCIpO1xyXG5jb25zdCBlbGVjdHJvbl8xID0gcmVxdWlyZShcImVsZWN0cm9uXCIpO1xyXG5jb25zdCBnbG9iYWxzID0ge1xyXG4gICAgSXBjUmVuZGVyZXI6IGlwY0NoYW5uZWxfMS5JcGNDaGFubmVsLFxyXG4gICAgV2ViRnJhbWU6IHdlYkZyYW1lXzEuV2ViRnJhbWVNYW5hZ2VyLFxyXG4gICAgU2h1dERvd25TeXN0ZW06IHNodXREb3duXzEuU2h1dERvd25NYW5hZ2VyXHJcbn07XHJcbmlmIChwcm9jZXNzLmNvbnRleHRJc29sYXRlZCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBlbGVjdHJvbl8xLmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ2xvdWlzJywgZ2xvYmFscyk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgIH1cclxufVxyXG5lbHNlIHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgd2luZG93LmxvdWlzID0gZ2xvYmFscztcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgQWdyaW1vIEluZnJhIExURC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuSXBjQ2hhbm5lbCA9IGV4cG9ydHMuSVBDQ2hhbm5lbCA9IHZvaWQgMDtcclxuLyoqXHJcbiAqIElwY0NoYW5uZWwgVXNlZCBCeSB0aGUgTWFpblByb2Nlc3NcclxuICovXHJcbmNvbnN0IGVsZWN0cm9uXzEgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7XHJcbmNsYXNzIElQQ0NoYW5uZWwge1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuICAgIHZhbGlkYXRlSXBjQ2hhbm5lbChjaGFubmVsKSB7XHJcbiAgICAgICAgaWYgKCFjaGFubmVsIHx8ICFjaGFubmVsLnN0YXJ0c1dpdGgoXCJsb3VpczpcIikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBldmVudCBJUEMgY2hhbm5lbCAnJHtjaGFubmVsfSdgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvL2dsb2JhbHM7XHJcbiAgICBzZW5kKGNoYW5uZWwsIC4uLmFyZ3MpIHtcclxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZUlwY0NoYW5uZWwoY2hhbm5lbCkpIHtcclxuICAgICAgICAgICAgZWxlY3Ryb25fMS5pcGNSZW5kZXJlci5zZW5kKGNoYW5uZWwsIC4uLmFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGludm9rZShjaGFubmVsLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVJcGNDaGFubmVsKGNoYW5uZWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVjdHJvbl8xLmlwY1JlbmRlcmVyLmludm9rZShjaGFubmVsLCAuLi5hcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgW0ZBSUxFRF9JUENfQ0hBTk5FTF1gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIDtcclxuICAgIG9uKGNoYW5uZWwsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVJcGNDaGFubmVsKGNoYW5uZWwpKSB7XHJcbiAgICAgICAgICAgIGVsZWN0cm9uXzEuaXBjUmVuZGVyZXIub24oY2hhbm5lbCwgbGlzdGVuZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgW0ZBSUxFRF9JUENfQ0hBTk5FTF1gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uY2UoY2hhbm5lbCwgbGlzdGVuZXIpIHtcclxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZUlwY0NoYW5uZWwoY2hhbm5lbCkpIHtcclxuICAgICAgICAgICAgZWxlY3Ryb25fMS5pcGNSZW5kZXJlci5vbmNlKGNoYW5uZWwsIGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYFtGQUlMRURfSVBDX0NIQU5ORUxdYDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW1vdmVFdmVudExpc3RlbmVyKGNoYW5uZWwsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVJcGNDaGFubmVsKGNoYW5uZWwpKSB7XHJcbiAgICAgICAgICAgIGVsZWN0cm9uXzEuaXBjUmVuZGVyZXIucmVtb3ZlTGlzdGVuZXIoY2hhbm5lbCwgbGlzdGVuZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgW0ZBSUxFRF9JUENfQ0hBTk5FTF1gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLklQQ0NoYW5uZWwgPSBJUENDaGFubmVsO1xyXG5mdW5jdGlvbiBJKCkge1xyXG4gICAgcmV0dXJuIG5ldyBJUENDaGFubmVsKCk7XHJcbn1cclxuZXhwb3J0cy5JcGNDaGFubmVsID0gSSgpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgQWdyaW1vIEluZnJhIExURC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuU2h1dERvd25NYW5hZ2VyID0gdm9pZCAwO1xyXG5jb25zdCBjaGlsZF9wcm9jZXNzXzEgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTtcclxuZXhwb3J0cy5TaHV0RG93bk1hbmFnZXIgPSB7XHJcbiAgICBpbnZva2UoKSB7XHJcbiAgICAgICAgLy9jaGVjayBvcGVyYXRpbmcgc3lzdGVtXHJcbiAgICAgICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT0gXCJ3aW4zMlwiKSB7XHJcbiAgICAgICAgICAgICgwLCBjaGlsZF9wcm9jZXNzXzEuZXhlYykoJ3NodXRkb3duLmV4ZSAvcyAvdCAwMCcsIChlcnIsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtzdGRvdXR9YCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtzdGRlcnJ9YCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGV4ZWMgZXJyb3I6ICR7ZXJyfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBBZ3JpbW8gSW5mcmEgTFRELiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5XZWJGcmFtZU1hbmFnZXIgPSB2b2lkIDA7XHJcbmNvbnN0IGVsZWN0cm9uXzEgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7XHJcbi8qKlxyXG4gKiB3ZWJmcmFtZVxyXG4gKi9cclxuY29uc3Qgd2ViRnJhbWVBUEkgPSB7XHJcbiAgICBzZXRab29tTGV2ZWwobGV2ZWwpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGxldmVsID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBlbGVjdHJvbl8xLndlYkZyYW1lLnNldFpvb21MZXZlbChsZXZlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLldlYkZyYW1lTWFuYWdlciA9IHdlYkZyYW1lQVBJO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgQWdyaW1vIEluZnJhIExURC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG4vL29mZiB0aGUgbWFpbiBidWlsZFxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnJlcXVpcmUoXCIuL3Byb3ZpZGVycy9idW5kbGVcIik7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==