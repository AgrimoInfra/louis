/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ls/_platform.ts":
/*!*****************************!*\
  !*** ./src/ls/_platform.ts ***!
  \*****************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ls/platform/xl.platform */ "./src/ls/platform/xl.platform.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/ls/common/IDispose/dispose.ts":
/*!*******************************************!*\
  !*** ./src/ls/common/IDispose/dispose.ts ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/ls/common/decorators/decoratorServer.ts":
/*!*****************************************************!*\
  !*** ./src/ls/common/decorators/decoratorServer.ts ***!
  \*****************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.createDecorator = exports.util = void 0;
    var util;
    (function (util) {
        util.serviceIds = new Map();
        util.DI_TARGET = "$di#target";
        util.DI_DEPENDENCIES = "$di$dependencies";
        function getServiceDepenencies(ctor) {
            return ctor[util.DI_DEPENDENCIES] || [];
        }
        util.getServiceDepenencies = getServiceDepenencies;
    })(util = exports.util || (exports.util = {}));
    ;
    function storeServiceDependency(id, target, index) {
        if (target[util.DI_TARGET] === target) {
            target[util.DI_DEPENDENCIES].push({ id, index });
        }
        else {
            target[util.DI_DEPENDENCIES] = [{ id, index }];
            target[util.DI_TARGET] = target;
        }
    }
    function createDecorator(serviceId) {
        if (util.serviceIds.has(serviceId)) {
            //@ts-ignore
            return util.serviceIds.get(serviceId);
        }
        ;
        const id = function (target, key, index) {
            if (arguments.length !== 3) {
                throw new Error("Service Decorator should be used to decorate a parameter");
            }
            storeServiceDependency(id, target, index);
        };
        id.toString = () => serviceId;
        util.serviceIds.set(serviceId, id);
        return id;
    }
    exports.createDecorator = createDecorator;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/ls/common/decorators/injector.ts":
/*!**********************************************!*\
  !*** ./src/ls/common/decorators/injector.ts ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ls/common/decorators/decoratorServer */ "./src/ls/common/decorators/decoratorServer.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, decoratorServer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Injector = void 0;
    class Injector {
        constructor(services) {
            this._services = services;
        }
        getOrCreateServiceInstance(id) {
            let _instanceDesc = this._services.get(id);
            return _instanceDesc;
        }
        createInstance(ctor) {
            //organise dependencies relative to their position in the parameters
            let _serviceDependencies = decoratorServer_1.util.getServiceDepenencies(ctor).sort((a, b) => a.index - b.index);
            let _servieArgs = [];
            for (const dependency of _serviceDependencies) {
                let service = this.getOrCreateServiceInstance(dependency.id);
                if (!service) {
                    throw new Error("Unknown Service");
                }
                ;
                _servieArgs.push(service);
            }
            ;
            return new ctor(..._servieArgs);
        }
        ;
    }
    exports.Injector = Injector;
    ;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/ls/common/decorators/serviceCollectionManager.ts":
/*!**************************************************************!*\
  !*** ./src/ls/common/decorators/serviceCollectionManager.ts ***!
  \**************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ServiceCollection = void 0;
    class ServiceCollection {
        constructor() {
            this._entries = new Map();
        }
        set(id, instance) {
            if (!this._entries.has(id)) {
                this._entries.set(id, instance);
            }
        }
        ;
        has(id) {
            return this._entries.has(id);
        }
        ;
        get(id) {
            return this._entries.get(id);
        }
    }
    exports.ServiceCollection = ServiceCollection;
    ;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/ls/common/messageChannel/channelService.ts":
/*!********************************************************!*\
  !*** ./src/ls/common/messageChannel/channelService.ts ***!
  \********************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.IMessageChannel = void 0;
    exports.IMessageChannel = {
        windowEvents: {
            WINDOW_DID_RESIZE: 'louis:windowDidResize',
            WINDOW_DID_MAXIMIZE: 'louis:windowDidMaximize',
            WINDOW_DID_MINIMIZE: 'louis:windowDidBlur',
            WINDOW_DID_FOCUS: 'louis:windowDidFocus',
            WINDOW_DID_RESTORE: 'louis:windowDidRestore'
        },
        windowCommands: {
            CLOSE_WINDOW_CMD: 'louis:windowClose',
            MINIMIZE_WINDOW_CMD: 'louis:windowMinimize',
            MAXIMIZE_WINDOW_CMD: 'louis:windowMaximize',
            RESTORE_WINDOW_CMD: 'louis:windowRestore'
        },
        rendererProcess: {
            WINDOW_RELOAD: 'louis:reloadWindow',
            WINDOW_SHOW: 'louis:showWindow',
        }
    };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/ls/common/utils/utils.ts":
/*!**************************************!*\
  !*** ./src/ls/common/utils/utils.ts ***!
  \**************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! path */ "path")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, path_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Utilites = void 0;
    class Utilites {
        static fsPath(source, options) {
            if (options.isDirectory) {
                return (0, path_1.resolve)(__dirname, source);
            }
            else {
                return (0, path_1.resolve)(source);
            }
        }
        ;
        static fileUriFromPath(path, config) {
            let pathName = path.replace(/\\/g, '/');
            if (pathName.length > 0 && pathName.charAt(0) !== '/') {
                pathName = `/${pathName}`;
            }
            let uri;
            if (config.isWindows && pathName.startsWith('//')) {
                uri = encodeURI(`${config.scheme || 'file'}:${pathName}`);
            }
            else {
                uri = encodeURI(`${config.scheme || 'file'}://${config.fallbackAuthority || ''}${pathName}`);
            }
            return uri.replace(/#/g, '%23');
        }
    }
    exports.Utilites = Utilites;
    ;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/ls/platform/electron-main/main.ts":
/*!***********************************************!*\
  !*** ./src/ls/platform/electron-main/main.ts ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ls/platform/runtime/runtime */ "./src/ls/platform/runtime/runtime.ts"), __webpack_require__(/*! ls/common/decorators/serviceCollectionManager */ "./src/ls/common/decorators/serviceCollectionManager.ts"), __webpack_require__(/*! ls/common/decorators/injector */ "./src/ls/common/decorators/injector.ts"), __webpack_require__(/*! ls/platform/services/environment/environmentService */ "./src/ls/platform/services/environment/environmentService.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, runtime_1, serviceCollectionManager_1, injector_1, environmentService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.LsMain = void 0;
    /**
     * Main Dependency Injection Point
     * tobe implemented For the runtimeApp;
     */
    class LsMain {
        constructor() {
            this.runTimeInstance = null;
        }
        async base() {
            //create instances
            let _instantiationService = this.createServices();
            this.runTimeInstance = _instantiationService.createInstance(runtime_1.Runtime);
            this.instantiateRunTime();
        }
        ;
        createServices() {
            const services = new serviceCollectionManager_1.ServiceCollection();
            services.set(environmentService_1.IEnvironment, new environmentService_1.Environment());
            return new injector_1.Injector(services);
        }
        instantiateRunTime() {
            if (this.runTimeInstance) {
                this.runTimeInstance.initializeRuntimeApp();
            }
        }
        dispose() {
            this.runTimeInstance = null;
        }
    }
    exports.LsMain = LsMain;
    ;
    const _LsMain = new LsMain();
    _LsMain.base();
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/ls/platform/runtime/runtime.ts":
/*!********************************************!*\
  !*** ./src/ls/platform/runtime/runtime.ts ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ls/platform/window/window */ "./src/ls/platform/window/window.ts"), __webpack_require__(/*! ls/platform/services/environment/environmentService */ "./src/ls/platform/services/environment/environmentService.ts"), __webpack_require__(/*! electron */ "electron"), __webpack_require__(/*! ls/common/messageChannel/channelService */ "./src/ls/common/messageChannel/channelService.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, window_1, environmentService_1, electron_1, channelService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Runtime = void 0;
    //Runtime Should Use Dependency Injection;;;
    let Runtime = class Runtime {
        constructor(environment) {
            this.environment = environment;
            this.runtimeAppWindow = null;
        }
        ;
        openLsWindow() {
            this.runtimeAppWindow = (0, window_1.createLsWindow)(this.environment);
            this.runtimeAppWindow.loadWindowSandBox();
        }
        registerMainWindowListener() {
            electron_1.ipcMain.on(channelService_1.IMessageChannel.windowCommands.CLOSE_WINDOW_CMD, () => {
                electron_1.app.quit();
                this.dispose();
            });
        }
        async initializeRuntimeApp() {
            this.openLsWindow();
            this.registerMainWindowListener();
        }
        //dispose ApplicationRuntime dependencies;
        dispose() {
            if (this.runtimeAppWindow) {
                this.runtimeAppWindow.dispose();
            }
        }
    };
    Runtime = __decorate([
        __param(0, environmentService_1.IEnvironment)
    ], Runtime);
    exports.Runtime = Runtime;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/ls/platform/services/environment/environmentService.ts":
/*!********************************************************************!*\
  !*** ./src/ls/platform/services/environment/environmentService.ts ***!
  \********************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ls/common/decorators/decoratorServer */ "./src/ls/common/decorators/decoratorServer.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, decoratorServer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Environment = exports.IEnvironment = void 0;
    exports.IEnvironment = (0, decoratorServer_1.createDecorator)("EnvironmentService");
    class Environment {
        isDevelopment() {
            let _variable = process.env.LS_DEV;
            return _variable ? true : false;
        }
        xlBackground() {
            return "#050B26";
        }
    }
    exports.Environment = Environment;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/ls/platform/window/window.ts":
/*!******************************************!*\
  !*** ./src/ls/platform/window/window.ts ***!
  \******************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! electron */ "electron"), __webpack_require__(/*! ls/common/messageChannel/channelService */ "./src/ls/common/messageChannel/channelService.ts"), __webpack_require__(/*! ls/common/utils/utils */ "./src/ls/common/utils/utils.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, electron_1, channelService_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.createLsWindow = exports.LsWindow = void 0;
    /**
     * Window Instance thats Created at Startup And Can Be Disposed
     */
    class LsWindow {
        constructor(environment) {
            this.environment = environment;
            this.win = null;
            {
                let windowConfiguration = {
                    title: "Louis",
                    width: 1040,
                    height: 619,
                    show: true,
                    minWidth: 500,
                    minHeight: 427,
                    fullscreenable: true,
                    frame: false,
                    backgroundColor: this.environment.xlBackground(),
                    webPreferences: {
                        preload: this.getPreloadPath(),
                        v8CacheOptions: "code",
                        devTools: true,
                        enableWebSQL: false,
                        //Should be removed to security Issues
                        nodeIntegration: true,
                        contextIsolation: false,
                    }
                };
                this.win = new electron_1.BrowserWindow(windowConfiguration);
                this.connectWindowRenderedListeners();
                this.registerWindowUserEventListeners();
                this.shouldOpenDevTools();
            }
        }
        ;
        //development purposes
        shouldOpenDevTools() {
            if (this.environment.isDevelopment()) {
                if (this.win) {
                    this.win.webContents.openDevTools();
                }
            }
        }
        getPreloadPath() {
            return utils_1.Utilites.fsPath("./preload/preload.js", { isDirectory: true });
        }
        //SendMessageToRenderer
        sendMessageToRenderer(channel, args) {
            if (this.win) {
                this.win.webContents.send(channel, args != undefined ? args : undefined);
            }
        }
        //WindowLifecyleEvents
        registerWindowUserEventListeners() {
            if (this.win) {
                this.win.on('maximize', () => {
                    this.sendMessageToRenderer(channelService_1.IMessageChannel.windowEvents.WINDOW_DID_MAXIMIZE);
                });
                this.win.on('unmaximize', () => {
                    this.sendMessageToRenderer(channelService_1.IMessageChannel.windowEvents.WINDOW_DID_RESTORE);
                });
                electron_1.ipcMain.on(channelService_1.IMessageChannel.windowCommands.MINIMIZE_WINDOW_CMD, () => {
                    //Minimize Window;
                    /**
                     * Changed Feature in Selix:
                     * from hiding the window to, actually minimizing the window
                     */
                    if (this.win) {
                        this.win.minimize();
                    }
                });
                electron_1.ipcMain.on(channelService_1.IMessageChannel.windowCommands.RESTORE_WINDOW_CMD, () => {
                    if (this.win) {
                        this.win.unmaximize();
                    }
                });
                electron_1.ipcMain.on(channelService_1.IMessageChannel.windowCommands.MAXIMIZE_WINDOW_CMD, () => {
                    if (this.win) {
                        this.win.maximize();
                    }
                });
            }
        }
        //MainWindowRendererListeners
        connectWindowRenderedListeners() {
            electron_1.ipcMain.on(channelService_1.IMessageChannel.rendererProcess.WINDOW_RELOAD, () => {
                this.loadWindowSandBox();
            });
            if (this.win) {
                this.win.on('unresponsive', () => {
                    this.windowDidEncounterError(1 /* WindowError.UNRESPONSIVE */);
                });
                this.win.webContents.on('render-process-gone', (_event, detail) => {
                    this.windowDidEncounterError(2 /* WindowError.CRASHED */, detail);
                });
                this.win.webContents.on('did-fail-load', (_event, _errorCode, errorDescription) => {
                    const details = {
                        reason: errorDescription
                    };
                    this.windowDidEncounterError(3 /* WindowError.LOAD */, details);
                });
                this.win.webContents.on('will-prevent-unload', (_event) => {
                    _event.preventDefault();
                });
                this.win.on('closed', () => {
                    this.dispose();
                });
                electron_1.ipcMain.on(channelService_1.IMessageChannel.rendererProcess.WINDOW_SHOW, () => {
                    this.showWindow();
                });
            }
        }
        //WindowErrorManager
        async windowDidEncounterError(type, details) {
            //WindowErrorsHandled
            switch (type) {
                case 2 /* WindowError.CRASHED */:
                    console.log(`[LsWindow:Crashed]:${details?.reason}`);
                    break;
                case 1 /* WindowError.UNRESPONSIVE */:
                    console.log(`[LsWindow:unresponsive]`);
                    break;
                case 3 /* WindowError.LOAD */:
                    console.log(`[LsWindow:Failed Load]${details?.reason}`);
            }
            switch (type) {
                case 1 /* WindowError.UNRESPONSIVE */:
                case 2 /* WindowError.CRASHED */:
                    //Not Responsive Window;
                    if (type == 1 /* WindowError.UNRESPONSIVE */) {
                        const result = await electron_1.dialog.showMessageBox(this.win, {
                            title: 'Louis-dev',
                            type: 'warning',
                            buttons: ['Re Open', 'Keep Waiting'],
                            message: 'The Window is Not Responding',
                            defaultId: 0,
                            cancelId: 1,
                            noLink: true,
                        });
                        if (!this.win) {
                            return;
                        }
                        if (result.response === 0) {
                            this.win.webContents.forcefullyCrashRenderer();
                            this.loadWindowSandBox();
                        }
                        else if (result.response === 1) {
                            return;
                        }
                    }
                    //did Crash;
                    else if (type == 2 /* WindowError.CRASHED */) {
                        const result = await electron_1.dialog.showMessageBox(this.win, {
                            title: 'Louis-dev',
                            type: 'warning',
                            buttons: ['Re Open', 'Keep Waiting'],
                            message: 'The Window has Crashed',
                            defaultId: 0,
                            cancelId: 1,
                            noLink: true,
                        });
                        if (!this.win) {
                            return;
                        }
                        if (result.response === 0) {
                            this.loadWindowSandBox();
                        }
                        else if (result.response === 1) {
                            this.win.destroy();
                        }
                    }
            }
        }
        //showWindow
        showWindow() {
            if (this.win && !this.win.isVisible()) {
                this.win.show();
            }
        }
        //currentActiveWindow
        currentActiveWindow() {
            return this.win;
        }
        //focus window
        focusWindow() {
            if (!this.win) {
                return;
            }
            if (this.isMinimized()) {
                this.win.restore();
            }
            ;
            this.win.focus();
        }
        getSandboxPath() {
            if (this.environment.isDevelopment()) {
                return utils_1.Utilites.fsPath("../sandbox/runtime/runtime.html", { isDirectory: true });
            }
            else {
                return utils_1.Utilites.fsPath("../sandbox/template/runtime.html", { isDirectory: true });
            }
        }
        //isWindowMinimized
        isMinimized() {
            return this.win ? this.win.isMinimized() : false;
        }
        //LoadRendererProcess
        async loadWindowSandBox() {
            if (this.win) {
                this.win.loadURL(utils_1.Utilites.fileUriFromPath(this.getSandboxPath(), { isWindows: true }));
                this.focusWindow();
            }
        }
        //Dispose Window
        dispose() {
            this.win = null;
        }
    }
    exports.LsWindow = LsWindow;
    function createLsWindow(environment) {
        return new LsWindow(environment);
    }
    exports.createLsWindow = createLsWindow;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/ls/platform/window/windowError.ts":
/*!***********************************************!*\
  !*** ./src/ls/platform/window/windowError.ts ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/ls/platform/xl.platform.ts":
/*!****************************************!*\
  !*** ./src/ls/platform/xl.platform.ts ***!
  \****************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ls/common/IDispose/dispose */ "./src/ls/common/IDispose/dispose.ts"), __webpack_require__(/*! ls/common/messageChannel/channelService */ "./src/ls/common/messageChannel/channelService.ts"), __webpack_require__(/*! ls/common/utils/utils */ "./src/ls/common/utils/utils.ts"), __webpack_require__(/*! ls/common/decorators/decoratorServer */ "./src/ls/common/decorators/decoratorServer.ts"), __webpack_require__(/*! ls/common/decorators/injector */ "./src/ls/common/decorators/injector.ts"), __webpack_require__(/*! ls/common/decorators/serviceCollectionManager */ "./src/ls/common/decorators/serviceCollectionManager.ts"), __webpack_require__(/*! ls/platform/services/environment/environmentService */ "./src/ls/platform/services/environment/environmentService.ts"), __webpack_require__(/*! ls/platform/runtime/runtime */ "./src/ls/platform/runtime/runtime.ts"), __webpack_require__(/*! ls/platform/window/window */ "./src/ls/platform/window/window.ts"), __webpack_require__(/*! ls/platform/window/windowError */ "./src/ls/platform/window/windowError.ts"), __webpack_require__(/*! ls/platform/electron-main/main */ "./src/ls/platform/electron-main/main.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ls/_platform.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGwucGxhdGZvcm0uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBTyxDQUFDLG1CQUFTLEVBQUUsT0FBUyxFQUFFLHNGQUF5QixDQUFDLG1DQUFFO0FBQzFEO0FBQ0EsSUFBSSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDakUsQ0FBQztBQUFBLGtHQUFDOzs7Ozs7Ozs7OztBQ1BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQU8sQ0FBQyxtQkFBUyxFQUFFLE9BQVMsQ0FBQyxtQ0FBRTtBQUMvQjtBQUNBLElBQUksOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQ2pFLENBQUM7QUFBQSxrR0FBQzs7Ozs7Ozs7Ozs7QUNQRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFPLENBQUMsbUJBQVMsRUFBRSxPQUFTLENBQUMsbUNBQUU7QUFDL0I7QUFDQSxJQUFJLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUNqRSxJQUFJLHVCQUF1QixHQUFHLFlBQVk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSywwQkFBMEIsWUFBWSxLQUFLO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxXQUFXO0FBQzNEO0FBQ0E7QUFDQSw4Q0FBOEMsV0FBVztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksdUJBQXVCO0FBQzNCLENBQUM7QUFBQSxrR0FBQzs7Ozs7Ozs7Ozs7QUM3Q0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBTyxDQUFDLG1CQUFTLEVBQUUsT0FBUyxFQUFFLGdIQUFzQyxDQUFDLG1DQUFFO0FBQ3ZFO0FBQ0EsSUFBSSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDakUsSUFBSSxnQkFBZ0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdCQUFnQjtBQUNwQjtBQUNBLENBQUM7QUFBQSxrR0FBQzs7Ozs7Ozs7Ozs7QUNuQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBTyxDQUFDLG1CQUFTLEVBQUUsT0FBUyxDQUFDLG1DQUFFO0FBQy9CO0FBQ0EsSUFBSSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDakUsSUFBSSx5QkFBeUI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5QkFBeUI7QUFDN0I7QUFDQSxDQUFDO0FBQUEsa0dBQUM7Ozs7Ozs7Ozs7O0FDNUJGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQU8sQ0FBQyxtQkFBUyxFQUFFLE9BQVMsQ0FBQyxtQ0FBRTtBQUMvQjtBQUNBLElBQUksOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQ2pFLElBQUksdUJBQXVCO0FBQzNCLElBQUksdUJBQXVCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQUEsa0dBQUM7Ozs7Ozs7Ozs7O0FDM0JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQU8sQ0FBQyxtQkFBUyxFQUFFLE9BQVMsRUFBRSx1Q0FBTSxDQUFDLG1DQUFFO0FBQ3ZDO0FBQ0EsSUFBSSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDakUsSUFBSSxnQkFBZ0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsU0FBUztBQUN4QztBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsd0JBQXdCLEdBQUcsU0FBUztBQUN2RTtBQUNBO0FBQ0EsbUNBQW1DLHdCQUF3QixLQUFLLCtCQUErQixFQUFFLFNBQVM7QUFDMUc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdCQUFnQjtBQUNwQjtBQUNBLENBQUM7QUFBQSxrR0FBQzs7Ozs7Ozs7Ozs7QUNuQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBTyxDQUFDLG1CQUFTLEVBQUUsT0FBUyxFQUFFLDhGQUE2QixFQUFFLGtJQUErQyxFQUFFLGtHQUErQixFQUFFLDhJQUFxRCxDQUFDLG1DQUFFO0FBQ3ZNO0FBQ0EsSUFBSSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDakUsSUFBSSxjQUFjO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGNBQWM7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUFBLGtHQUFDOzs7Ozs7Ozs7OztBQ3pDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxRQUFRO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBLGlDQUFPLENBQUMsbUJBQVMsRUFBRSxPQUFTLEVBQUUsMEZBQTJCLEVBQUUsOElBQXFELEVBQUUsK0NBQVUsRUFBRSxzSEFBeUMsQ0FBQyxtQ0FBRTtBQUMxSztBQUNBLElBQUksOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQ2pFLElBQUksZUFBZTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxlQUFlO0FBQ25CLENBQUM7QUFBQSxrR0FBQzs7Ozs7Ozs7Ozs7QUNqREY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBTyxDQUFDLG1CQUFTLEVBQUUsT0FBUyxFQUFFLGdIQUFzQyxDQUFDLG1DQUFFO0FBQ3ZFO0FBQ0EsSUFBSSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDakUsSUFBSSxtQkFBbUIsR0FBRyxvQkFBb0I7QUFDOUMsSUFBSSxvQkFBb0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxtQkFBbUI7QUFDdkIsQ0FBQztBQUFBLGtHQUFDOzs7Ozs7Ozs7OztBQ25CRixpR0FBTyxDQUFDLG1CQUFTLEVBQUUsT0FBUyxFQUFFLCtDQUFVLEVBQUUsc0hBQXlDLEVBQUUsa0ZBQXVCLENBQUMsbUNBQUU7QUFDL0c7QUFDQSxJQUFJLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUNqRSxJQUFJLHNCQUFzQixHQUFHLGdCQUFnQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLG1CQUFtQjtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsZ0JBQWdCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsZ0JBQWdCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRkFBb0YsbUJBQW1CO0FBQ3ZHO0FBQ0E7QUFDQSxxRkFBcUYsbUJBQW1CO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJGQUEyRixpQkFBaUI7QUFDNUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksZ0JBQWdCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLElBQUksc0JBQXNCO0FBQzFCLENBQUM7QUFBQSxrR0FBQzs7Ozs7Ozs7Ozs7QUNuT0YsaUdBQU8sQ0FBQyxtQkFBUyxFQUFFLE9BQVMsQ0FBQyxtQ0FBRTtBQUMvQjtBQUNBLElBQUksOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQ2pFLENBQUM7QUFBQSxrR0FBQzs7Ozs7Ozs7Ozs7QUNIRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFPLENBQUMsbUJBQVMsRUFBRSxPQUFTLEVBQUUsNEZBQTRCLEVBQUUsc0hBQXlDLEVBQUUsa0ZBQXVCLEVBQUUsZ0hBQXNDLEVBQUUsa0dBQStCLEVBQUUsa0lBQStDLEVBQUUsOElBQXFELEVBQUUsOEZBQTZCLEVBQUUsMEZBQTJCLEVBQUUsb0dBQWdDLEVBQUUsb0dBQWdDLENBQUMsbUNBQUU7QUFDbGI7QUFDQSxJQUFJLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUNqRSxDQUFDO0FBQUEsa0dBQUM7Ozs7Ozs7Ozs7OztBQ1BGOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9ycmVuY2VyLWRldi8uL3NyYy9scy9fcGxhdGZvcm0udHMiLCJ3ZWJwYWNrOi8vdG9ycmVuY2VyLWRldi8uL3NyYy9scy9jb21tb24vSURpc3Bvc2UvZGlzcG9zZS50cyIsIndlYnBhY2s6Ly90b3JyZW5jZXItZGV2Ly4vc3JjL2xzL2NvbW1vbi9kZWNvcmF0b3JzL2RlY29yYXRvclNlcnZlci50cyIsIndlYnBhY2s6Ly90b3JyZW5jZXItZGV2Ly4vc3JjL2xzL2NvbW1vbi9kZWNvcmF0b3JzL2luamVjdG9yLnRzIiwid2VicGFjazovL3RvcnJlbmNlci1kZXYvLi9zcmMvbHMvY29tbW9uL2RlY29yYXRvcnMvc2VydmljZUNvbGxlY3Rpb25NYW5hZ2VyLnRzIiwid2VicGFjazovL3RvcnJlbmNlci1kZXYvLi9zcmMvbHMvY29tbW9uL21lc3NhZ2VDaGFubmVsL2NoYW5uZWxTZXJ2aWNlLnRzIiwid2VicGFjazovL3RvcnJlbmNlci1kZXYvLi9zcmMvbHMvY29tbW9uL3V0aWxzL3V0aWxzLnRzIiwid2VicGFjazovL3RvcnJlbmNlci1kZXYvLi9zcmMvbHMvcGxhdGZvcm0vZWxlY3Ryb24tbWFpbi9tYWluLnRzIiwid2VicGFjazovL3RvcnJlbmNlci1kZXYvLi9zcmMvbHMvcGxhdGZvcm0vcnVudGltZS9ydW50aW1lLnRzIiwid2VicGFjazovL3RvcnJlbmNlci1kZXYvLi9zcmMvbHMvcGxhdGZvcm0vc2VydmljZXMvZW52aXJvbm1lbnQvZW52aXJvbm1lbnRTZXJ2aWNlLnRzIiwid2VicGFjazovL3RvcnJlbmNlci1kZXYvLi9zcmMvbHMvcGxhdGZvcm0vd2luZG93L3dpbmRvdy50cyIsIndlYnBhY2s6Ly90b3JyZW5jZXItZGV2Ly4vc3JjL2xzL3BsYXRmb3JtL3dpbmRvdy93aW5kb3dFcnJvci50cyIsIndlYnBhY2s6Ly90b3JyZW5jZXItZGV2Ly4vc3JjL2xzL3BsYXRmb3JtL3hsLnBsYXRmb3JtLnRzIiwid2VicGFjazovL3RvcnJlbmNlci1kZXYvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vdG9ycmVuY2VyLWRldi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwicGF0aFwiIiwid2VicGFjazovL3RvcnJlbmNlci1kZXYvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9ycmVuY2VyLWRldi93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvcnJlbmNlci1kZXYvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvcnJlbmNlci1kZXYvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIEFncmltbyBJbmZyYSBMVEQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwibHMvcGxhdGZvcm0veGwucGxhdGZvcm1cIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxufSk7XHJcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIEFncmltbyBJbmZyYSBMVEQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbn0pO1xyXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICBleHBvcnRzLmNyZWF0ZURlY29yYXRvciA9IGV4cG9ydHMudXRpbCA9IHZvaWQgMDtcclxuICAgIHZhciB1dGlsO1xyXG4gICAgKGZ1bmN0aW9uICh1dGlsKSB7XHJcbiAgICAgICAgdXRpbC5zZXJ2aWNlSWRzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHV0aWwuRElfVEFSR0VUID0gXCIkZGkjdGFyZ2V0XCI7XHJcbiAgICAgICAgdXRpbC5ESV9ERVBFTkRFTkNJRVMgPSBcIiRkaSRkZXBlbmRlbmNpZXNcIjtcclxuICAgICAgICBmdW5jdGlvbiBnZXRTZXJ2aWNlRGVwZW5lbmNpZXMoY3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gY3Rvclt1dGlsLkRJX0RFUEVOREVOQ0lFU10gfHwgW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHV0aWwuZ2V0U2VydmljZURlcGVuZW5jaWVzID0gZ2V0U2VydmljZURlcGVuZW5jaWVzO1xyXG4gICAgfSkodXRpbCA9IGV4cG9ydHMudXRpbCB8fCAoZXhwb3J0cy51dGlsID0ge30pKTtcclxuICAgIDtcclxuICAgIGZ1bmN0aW9uIHN0b3JlU2VydmljZURlcGVuZGVuY3koaWQsIHRhcmdldCwgaW5kZXgpIHtcclxuICAgICAgICBpZiAodGFyZ2V0W3V0aWwuRElfVEFSR0VUXSA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldFt1dGlsLkRJX0RFUEVOREVOQ0lFU10ucHVzaCh7IGlkLCBpbmRleCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRhcmdldFt1dGlsLkRJX0RFUEVOREVOQ0lFU10gPSBbeyBpZCwgaW5kZXggfV07XHJcbiAgICAgICAgICAgIHRhcmdldFt1dGlsLkRJX1RBUkdFVF0gPSB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRGVjb3JhdG9yKHNlcnZpY2VJZCkge1xyXG4gICAgICAgIGlmICh1dGlsLnNlcnZpY2VJZHMuaGFzKHNlcnZpY2VJZCkpIHtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHJldHVybiB1dGlsLnNlcnZpY2VJZHMuZ2V0KHNlcnZpY2VJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDtcclxuICAgICAgICBjb25zdCBpZCA9IGZ1bmN0aW9uICh0YXJnZXQsIGtleSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT09IDMpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNlcnZpY2UgRGVjb3JhdG9yIHNob3VsZCBiZSB1c2VkIHRvIGRlY29yYXRlIGEgcGFyYW1ldGVyXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0b3JlU2VydmljZURlcGVuZGVuY3koaWQsIHRhcmdldCwgaW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWQudG9TdHJpbmcgPSAoKSA9PiBzZXJ2aWNlSWQ7XHJcbiAgICAgICAgdXRpbC5zZXJ2aWNlSWRzLnNldChzZXJ2aWNlSWQsIGlkKTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcbiAgICBleHBvcnRzLmNyZWF0ZURlY29yYXRvciA9IGNyZWF0ZURlY29yYXRvcjtcclxufSk7XHJcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5kZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCJscy9jb21tb24vZGVjb3JhdG9ycy9kZWNvcmF0b3JTZXJ2ZXJcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBkZWNvcmF0b3JTZXJ2ZXJfMSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICBleHBvcnRzLkluamVjdG9yID0gdm9pZCAwO1xyXG4gICAgY2xhc3MgSW5qZWN0b3Ige1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2VzID0gc2VydmljZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldE9yQ3JlYXRlU2VydmljZUluc3RhbmNlKGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBfaW5zdGFuY2VEZXNjID0gdGhpcy5fc2VydmljZXMuZ2V0KGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIF9pbnN0YW5jZURlc2M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNyZWF0ZUluc3RhbmNlKGN0b3IpIHtcclxuICAgICAgICAgICAgLy9vcmdhbmlzZSBkZXBlbmRlbmNpZXMgcmVsYXRpdmUgdG8gdGhlaXIgcG9zaXRpb24gaW4gdGhlIHBhcmFtZXRlcnNcclxuICAgICAgICAgICAgbGV0IF9zZXJ2aWNlRGVwZW5kZW5jaWVzID0gZGVjb3JhdG9yU2VydmVyXzEudXRpbC5nZXRTZXJ2aWNlRGVwZW5lbmNpZXMoY3Rvcikuc29ydCgoYSwgYikgPT4gYS5pbmRleCAtIGIuaW5kZXgpO1xyXG4gICAgICAgICAgICBsZXQgX3NlcnZpZUFyZ3MgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBkZXBlbmRlbmN5IG9mIF9zZXJ2aWNlRGVwZW5kZW5jaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VydmljZSA9IHRoaXMuZ2V0T3JDcmVhdGVTZXJ2aWNlSW5zdGFuY2UoZGVwZW5kZW5jeS5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIFNlcnZpY2VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICBfc2VydmllQXJncy5wdXNoKHNlcnZpY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBjdG9yKC4uLl9zZXJ2aWVBcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0cy5JbmplY3RvciA9IEluamVjdG9yO1xyXG4gICAgO1xyXG59KTtcclxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4gICAgZXhwb3J0cy5TZXJ2aWNlQ29sbGVjdGlvbiA9IHZvaWQgMDtcclxuICAgIGNsYXNzIFNlcnZpY2VDb2xsZWN0aW9uIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5fZW50cmllcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0KGlkLCBpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2VudHJpZXMuaGFzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW50cmllcy5zZXQoaWQsIGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICA7XHJcbiAgICAgICAgaGFzKGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbnRyaWVzLmhhcyhpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDtcclxuICAgICAgICBnZXQoaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VudHJpZXMuZ2V0KGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnRzLlNlcnZpY2VDb2xsZWN0aW9uID0gU2VydmljZUNvbGxlY3Rpb247XHJcbiAgICA7XHJcbn0pO1xyXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBBZ3JpbW8gSW5mcmEgTFRELiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4gICAgZXhwb3J0cy5JTWVzc2FnZUNoYW5uZWwgPSB2b2lkIDA7XHJcbiAgICBleHBvcnRzLklNZXNzYWdlQ2hhbm5lbCA9IHtcclxuICAgICAgICB3aW5kb3dFdmVudHM6IHtcclxuICAgICAgICAgICAgV0lORE9XX0RJRF9SRVNJWkU6ICdsb3Vpczp3aW5kb3dEaWRSZXNpemUnLFxyXG4gICAgICAgICAgICBXSU5ET1dfRElEX01BWElNSVpFOiAnbG91aXM6d2luZG93RGlkTWF4aW1pemUnLFxyXG4gICAgICAgICAgICBXSU5ET1dfRElEX01JTklNSVpFOiAnbG91aXM6d2luZG93RGlkQmx1cicsXHJcbiAgICAgICAgICAgIFdJTkRPV19ESURfRk9DVVM6ICdsb3Vpczp3aW5kb3dEaWRGb2N1cycsXHJcbiAgICAgICAgICAgIFdJTkRPV19ESURfUkVTVE9SRTogJ2xvdWlzOndpbmRvd0RpZFJlc3RvcmUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3aW5kb3dDb21tYW5kczoge1xyXG4gICAgICAgICAgICBDTE9TRV9XSU5ET1dfQ01EOiAnbG91aXM6d2luZG93Q2xvc2UnLFxyXG4gICAgICAgICAgICBNSU5JTUlaRV9XSU5ET1dfQ01EOiAnbG91aXM6d2luZG93TWluaW1pemUnLFxyXG4gICAgICAgICAgICBNQVhJTUlaRV9XSU5ET1dfQ01EOiAnbG91aXM6d2luZG93TWF4aW1pemUnLFxyXG4gICAgICAgICAgICBSRVNUT1JFX1dJTkRPV19DTUQ6ICdsb3Vpczp3aW5kb3dSZXN0b3JlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyZXJQcm9jZXNzOiB7XHJcbiAgICAgICAgICAgIFdJTkRPV19SRUxPQUQ6ICdsb3VpczpyZWxvYWRXaW5kb3cnLFxyXG4gICAgICAgICAgICBXSU5ET1dfU0hPVzogJ2xvdWlzOnNob3dXaW5kb3cnLFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pO1xyXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBBZ3JpbW8gSW5mcmEgTFRELiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcInBhdGhcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBwYXRoXzEpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4gICAgZXhwb3J0cy5VdGlsaXRlcyA9IHZvaWQgMDtcclxuICAgIGNsYXNzIFV0aWxpdGVzIHtcclxuICAgICAgICBzdGF0aWMgZnNQYXRoKHNvdXJjZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pc0RpcmVjdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICgwLCBwYXRoXzEucmVzb2x2ZSkoX19kaXJuYW1lLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICgwLCBwYXRoXzEucmVzb2x2ZSkoc291cmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICA7XHJcbiAgICAgICAgc3RhdGljIGZpbGVVcmlGcm9tUGF0aChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICAgICAgbGV0IHBhdGhOYW1lID0gcGF0aC5yZXBsYWNlKC9cXFxcL2csICcvJyk7XHJcbiAgICAgICAgICAgIGlmIChwYXRoTmFtZS5sZW5ndGggPiAwICYmIHBhdGhOYW1lLmNoYXJBdCgwKSAhPT0gJy8nKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoTmFtZSA9IGAvJHtwYXRoTmFtZX1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB1cmk7XHJcbiAgICAgICAgICAgIGlmIChjb25maWcuaXNXaW5kb3dzICYmIHBhdGhOYW1lLnN0YXJ0c1dpdGgoJy8vJykpIHtcclxuICAgICAgICAgICAgICAgIHVyaSA9IGVuY29kZVVSSShgJHtjb25maWcuc2NoZW1lIHx8ICdmaWxlJ306JHtwYXRoTmFtZX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVyaSA9IGVuY29kZVVSSShgJHtjb25maWcuc2NoZW1lIHx8ICdmaWxlJ306Ly8ke2NvbmZpZy5mYWxsYmFja0F1dGhvcml0eSB8fCAnJ30ke3BhdGhOYW1lfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB1cmkucmVwbGFjZSgvIy9nLCAnJTIzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0cy5VdGlsaXRlcyA9IFV0aWxpdGVzO1xyXG4gICAgO1xyXG59KTtcclxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgQWdyaW1vIEluZnJhIExURC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5kZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCJscy9wbGF0Zm9ybS9ydW50aW1lL3J1bnRpbWVcIiwgXCJscy9jb21tb24vZGVjb3JhdG9ycy9zZXJ2aWNlQ29sbGVjdGlvbk1hbmFnZXJcIiwgXCJscy9jb21tb24vZGVjb3JhdG9ycy9pbmplY3RvclwiLCBcImxzL3BsYXRmb3JtL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50U2VydmljZVwiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIHJ1bnRpbWVfMSwgc2VydmljZUNvbGxlY3Rpb25NYW5hZ2VyXzEsIGluamVjdG9yXzEsIGVudmlyb25tZW50U2VydmljZV8xKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuICAgIGV4cG9ydHMuTHNNYWluID0gdm9pZCAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBNYWluIERlcGVuZGVuY3kgSW5qZWN0aW9uIFBvaW50XHJcbiAgICAgKiB0b2JlIGltcGxlbWVudGVkIEZvciB0aGUgcnVudGltZUFwcDtcclxuICAgICAqL1xyXG4gICAgY2xhc3MgTHNNYWluIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5ydW5UaW1lSW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhc3luYyBiYXNlKCkge1xyXG4gICAgICAgICAgICAvL2NyZWF0ZSBpbnN0YW5jZXNcclxuICAgICAgICAgICAgbGV0IF9pbnN0YW50aWF0aW9uU2VydmljZSA9IHRoaXMuY3JlYXRlU2VydmljZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5ydW5UaW1lSW5zdGFuY2UgPSBfaW5zdGFudGlhdGlvblNlcnZpY2UuY3JlYXRlSW5zdGFuY2UocnVudGltZV8xLlJ1bnRpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbnRpYXRlUnVuVGltZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICA7XHJcbiAgICAgICAgY3JlYXRlU2VydmljZXMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VzID0gbmV3IHNlcnZpY2VDb2xsZWN0aW9uTWFuYWdlcl8xLlNlcnZpY2VDb2xsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHNlcnZpY2VzLnNldChlbnZpcm9ubWVudFNlcnZpY2VfMS5JRW52aXJvbm1lbnQsIG5ldyBlbnZpcm9ubWVudFNlcnZpY2VfMS5FbnZpcm9ubWVudCgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBpbmplY3Rvcl8xLkluamVjdG9yKHNlcnZpY2VzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5zdGFudGlhdGVSdW5UaW1lKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ydW5UaW1lSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVuVGltZUluc3RhbmNlLmluaXRpYWxpemVSdW50aW1lQXBwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZGlzcG9zZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5ydW5UaW1lSW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydHMuTHNNYWluID0gTHNNYWluO1xyXG4gICAgO1xyXG4gICAgY29uc3QgX0xzTWFpbiA9IG5ldyBMc01haW4oKTtcclxuICAgIF9Mc01haW4uYmFzZSgpO1xyXG59KTtcclxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgQWdyaW1vIEluZnJhIExURC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG52YXIgX19wYXJhbSA9ICh0aGlzICYmIHRoaXMuX19wYXJhbSkgfHwgZnVuY3Rpb24gKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn07XHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcImxzL3BsYXRmb3JtL3dpbmRvdy93aW5kb3dcIiwgXCJscy9wbGF0Zm9ybS9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudFNlcnZpY2VcIiwgXCJlbGVjdHJvblwiLCBcImxzL2NvbW1vbi9tZXNzYWdlQ2hhbm5lbC9jaGFubmVsU2VydmljZVwiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIHdpbmRvd18xLCBlbnZpcm9ubWVudFNlcnZpY2VfMSwgZWxlY3Ryb25fMSwgY2hhbm5lbFNlcnZpY2VfMSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICBleHBvcnRzLlJ1bnRpbWUgPSB2b2lkIDA7XHJcbiAgICAvL1J1bnRpbWUgU2hvdWxkIFVzZSBEZXBlbmRlbmN5IEluamVjdGlvbjs7O1xyXG4gICAgbGV0IFJ1bnRpbWUgPSBjbGFzcyBSdW50aW1lIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihlbnZpcm9ubWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmVudmlyb25tZW50ID0gZW52aXJvbm1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMucnVudGltZUFwcFdpbmRvdyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDtcclxuICAgICAgICBvcGVuTHNXaW5kb3coKSB7XHJcbiAgICAgICAgICAgIHRoaXMucnVudGltZUFwcFdpbmRvdyA9ICgwLCB3aW5kb3dfMS5jcmVhdGVMc1dpbmRvdykodGhpcy5lbnZpcm9ubWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMucnVudGltZUFwcFdpbmRvdy5sb2FkV2luZG93U2FuZEJveCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZWdpc3Rlck1haW5XaW5kb3dMaXN0ZW5lcigpIHtcclxuICAgICAgICAgICAgZWxlY3Ryb25fMS5pcGNNYWluLm9uKGNoYW5uZWxTZXJ2aWNlXzEuSU1lc3NhZ2VDaGFubmVsLndpbmRvd0NvbW1hbmRzLkNMT1NFX1dJTkRPV19DTUQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZWN0cm9uXzEuYXBwLnF1aXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXN5bmMgaW5pdGlhbGl6ZVJ1bnRpbWVBcHAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkxzV2luZG93KCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJNYWluV2luZG93TGlzdGVuZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9kaXNwb3NlIEFwcGxpY2F0aW9uUnVudGltZSBkZXBlbmRlbmNpZXM7XHJcbiAgICAgICAgZGlzcG9zZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucnVudGltZUFwcFdpbmRvdykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydW50aW1lQXBwV2luZG93LmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBSdW50aW1lID0gX19kZWNvcmF0ZShbXHJcbiAgICAgICAgX19wYXJhbSgwLCBlbnZpcm9ubWVudFNlcnZpY2VfMS5JRW52aXJvbm1lbnQpXHJcbiAgICBdLCBSdW50aW1lKTtcclxuICAgIGV4cG9ydHMuUnVudGltZSA9IFJ1bnRpbWU7XHJcbn0pO1xyXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBBZ3JpbW8gSW5mcmEgTFRELiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcImxzL2NvbW1vbi9kZWNvcmF0b3JzL2RlY29yYXRvclNlcnZlclwiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIGRlY29yYXRvclNlcnZlcl8xKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuICAgIGV4cG9ydHMuRW52aXJvbm1lbnQgPSBleHBvcnRzLklFbnZpcm9ubWVudCA9IHZvaWQgMDtcclxuICAgIGV4cG9ydHMuSUVudmlyb25tZW50ID0gKDAsIGRlY29yYXRvclNlcnZlcl8xLmNyZWF0ZURlY29yYXRvcikoXCJFbnZpcm9ubWVudFNlcnZpY2VcIik7XHJcbiAgICBjbGFzcyBFbnZpcm9ubWVudCB7XHJcbiAgICAgICAgaXNEZXZlbG9wbWVudCgpIHtcclxuICAgICAgICAgICAgbGV0IF92YXJpYWJsZSA9IHByb2Nlc3MuZW52LkxTX0RFVjtcclxuICAgICAgICAgICAgcmV0dXJuIF92YXJpYWJsZSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgeGxCYWNrZ3JvdW5kKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCIjMDUwQjI2XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0cy5FbnZpcm9ubWVudCA9IEVudmlyb25tZW50O1xyXG59KTtcclxuIiwiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiZWxlY3Ryb25cIiwgXCJscy9jb21tb24vbWVzc2FnZUNoYW5uZWwvY2hhbm5lbFNlcnZpY2VcIiwgXCJscy9jb21tb24vdXRpbHMvdXRpbHNcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBlbGVjdHJvbl8xLCBjaGFubmVsU2VydmljZV8xLCB1dGlsc18xKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuICAgIGV4cG9ydHMuY3JlYXRlTHNXaW5kb3cgPSBleHBvcnRzLkxzV2luZG93ID0gdm9pZCAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBXaW5kb3cgSW5zdGFuY2UgdGhhdHMgQ3JlYXRlZCBhdCBTdGFydHVwIEFuZCBDYW4gQmUgRGlzcG9zZWRcclxuICAgICAqL1xyXG4gICAgY2xhc3MgTHNXaW5kb3cge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGVudmlyb25tZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnQgPSBlbnZpcm9ubWVudDtcclxuICAgICAgICAgICAgdGhpcy53aW4gPSBudWxsO1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2luZG93Q29uZmlndXJhdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJMb3Vpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDQwLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNjE5LFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluV2lkdGg6IDUwMCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IDQyNyxcclxuICAgICAgICAgICAgICAgICAgICBmdWxsc2NyZWVuYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmcmFtZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmVudmlyb25tZW50LnhsQmFja2dyb3VuZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYlByZWZlcmVuY2VzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWxvYWQ6IHRoaXMuZ2V0UHJlbG9hZFBhdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdjhDYWNoZU9wdGlvbnM6IFwiY29kZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXZUb29sczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlV2ViU1FMOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TaG91bGQgYmUgcmVtb3ZlZCB0byBzZWN1cml0eSBJc3N1ZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUludGVncmF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0SXNvbGF0aW9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aW4gPSBuZXcgZWxlY3Ryb25fMS5Ccm93c2VyV2luZG93KHdpbmRvd0NvbmZpZ3VyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0V2luZG93UmVuZGVyZWRMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJXaW5kb3dVc2VyRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdWxkT3BlbkRldlRvb2xzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgO1xyXG4gICAgICAgIC8vZGV2ZWxvcG1lbnQgcHVycG9zZXNcclxuICAgICAgICBzaG91bGRPcGVuRGV2VG9vbHMoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVudmlyb25tZW50LmlzRGV2ZWxvcG1lbnQoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW4ud2ViQ29udGVudHMub3BlbkRldlRvb2xzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0UHJlbG9hZFBhdGgoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1dGlsc18xLlV0aWxpdGVzLmZzUGF0aChcIi4vcHJlbG9hZC9wcmVsb2FkLmpzXCIsIHsgaXNEaXJlY3Rvcnk6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vU2VuZE1lc3NhZ2VUb1JlbmRlcmVyXHJcbiAgICAgICAgc2VuZE1lc3NhZ2VUb1JlbmRlcmVyKGNoYW5uZWwsIGFyZ3MpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud2luKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndpbi53ZWJDb250ZW50cy5zZW5kKGNoYW5uZWwsIGFyZ3MgIT0gdW5kZWZpbmVkID8gYXJncyA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9XaW5kb3dMaWZlY3lsZUV2ZW50c1xyXG4gICAgICAgIHJlZ2lzdGVyV2luZG93VXNlckV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53aW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2luLm9uKCdtYXhpbWl6ZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlVG9SZW5kZXJlcihjaGFubmVsU2VydmljZV8xLklNZXNzYWdlQ2hhbm5lbC53aW5kb3dFdmVudHMuV0lORE9XX0RJRF9NQVhJTUlaRSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2luLm9uKCd1bm1heGltaXplJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2VUb1JlbmRlcmVyKGNoYW5uZWxTZXJ2aWNlXzEuSU1lc3NhZ2VDaGFubmVsLndpbmRvd0V2ZW50cy5XSU5ET1dfRElEX1JFU1RPUkUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBlbGVjdHJvbl8xLmlwY01haW4ub24oY2hhbm5lbFNlcnZpY2VfMS5JTWVzc2FnZUNoYW5uZWwud2luZG93Q29tbWFuZHMuTUlOSU1JWkVfV0lORE9XX0NNRCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vTWluaW1pemUgV2luZG93O1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAqIENoYW5nZWQgRmVhdHVyZSBpbiBTZWxpeDpcclxuICAgICAgICAgICAgICAgICAgICAgKiBmcm9tIGhpZGluZyB0aGUgd2luZG93IHRvLCBhY3R1YWxseSBtaW5pbWl6aW5nIHRoZSB3aW5kb3dcclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy53aW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53aW4ubWluaW1pemUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGVsZWN0cm9uXzEuaXBjTWFpbi5vbihjaGFubmVsU2VydmljZV8xLklNZXNzYWdlQ2hhbm5lbC53aW5kb3dDb21tYW5kcy5SRVNUT1JFX1dJTkRPV19DTUQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy53aW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53aW4udW5tYXhpbWl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxlY3Ryb25fMS5pcGNNYWluLm9uKGNoYW5uZWxTZXJ2aWNlXzEuSU1lc3NhZ2VDaGFubmVsLndpbmRvd0NvbW1hbmRzLk1BWElNSVpFX1dJTkRPV19DTUQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy53aW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53aW4ubWF4aW1pemUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL01haW5XaW5kb3dSZW5kZXJlckxpc3RlbmVyc1xyXG4gICAgICAgIGNvbm5lY3RXaW5kb3dSZW5kZXJlZExpc3RlbmVycygpIHtcclxuICAgICAgICAgICAgZWxlY3Ryb25fMS5pcGNNYWluLm9uKGNoYW5uZWxTZXJ2aWNlXzEuSU1lc3NhZ2VDaGFubmVsLnJlbmRlcmVyUHJvY2Vzcy5XSU5ET1dfUkVMT0FELCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRXaW5kb3dTYW5kQm94KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy53aW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2luLm9uKCd1bnJlc3BvbnNpdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5kb3dEaWRFbmNvdW50ZXJFcnJvcigxIC8qIFdpbmRvd0Vycm9yLlVOUkVTUE9OU0lWRSAqLyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2luLndlYkNvbnRlbnRzLm9uKCdyZW5kZXItcHJvY2Vzcy1nb25lJywgKF9ldmVudCwgZGV0YWlsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5kb3dEaWRFbmNvdW50ZXJFcnJvcigyIC8qIFdpbmRvd0Vycm9yLkNSQVNIRUQgKi8sIGRldGFpbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2luLndlYkNvbnRlbnRzLm9uKCdkaWQtZmFpbC1sb2FkJywgKF9ldmVudCwgX2Vycm9yQ29kZSwgZXJyb3JEZXNjcmlwdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYXNvbjogZXJyb3JEZXNjcmlwdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5kb3dEaWRFbmNvdW50ZXJFcnJvcigzIC8qIFdpbmRvd0Vycm9yLkxPQUQgKi8sIGRldGFpbHMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndpbi53ZWJDb250ZW50cy5vbignd2lsbC1wcmV2ZW50LXVubG9hZCcsIChfZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBfZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aW4ub24oJ2Nsb3NlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxlY3Ryb25fMS5pcGNNYWluLm9uKGNoYW5uZWxTZXJ2aWNlXzEuSU1lc3NhZ2VDaGFubmVsLnJlbmRlcmVyUHJvY2Vzcy5XSU5ET1dfU0hPVywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1dpbmRvdygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9XaW5kb3dFcnJvck1hbmFnZXJcclxuICAgICAgICBhc3luYyB3aW5kb3dEaWRFbmNvdW50ZXJFcnJvcih0eXBlLCBkZXRhaWxzKSB7XHJcbiAgICAgICAgICAgIC8vV2luZG93RXJyb3JzSGFuZGxlZFxyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMiAvKiBXaW5kb3dFcnJvci5DUkFTSEVEICovOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbTHNXaW5kb3c6Q3Jhc2hlZF06JHtkZXRhaWxzPy5yZWFzb259YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEgLyogV2luZG93RXJyb3IuVU5SRVNQT05TSVZFICovOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbTHNXaW5kb3c6dW5yZXNwb25zaXZlXWApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzIC8qIFdpbmRvd0Vycm9yLkxPQUQgKi86XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFtMc1dpbmRvdzpGYWlsZWQgTG9hZF0ke2RldGFpbHM/LnJlYXNvbn1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMSAvKiBXaW5kb3dFcnJvci5VTlJFU1BPTlNJVkUgKi86XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIgLyogV2luZG93RXJyb3IuQ1JBU0hFRCAqLzpcclxuICAgICAgICAgICAgICAgICAgICAvL05vdCBSZXNwb25zaXZlIFdpbmRvdztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSAxIC8qIFdpbmRvd0Vycm9yLlVOUkVTUE9OU0lWRSAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBlbGVjdHJvbl8xLmRpYWxvZy5zaG93TWVzc2FnZUJveCh0aGlzLndpbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdMb3Vpcy1kZXYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogWydSZSBPcGVuJywgJ0tlZXAgV2FpdGluZyddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1RoZSBXaW5kb3cgaXMgTm90IFJlc3BvbmRpbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdElkOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsSWQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0xpbms6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMud2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXNwb25zZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53aW4ud2ViQ29udGVudHMuZm9yY2VmdWxseUNyYXNoUmVuZGVyZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZFdpbmRvd1NhbmRCb3goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXN1bHQucmVzcG9uc2UgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2RpZCBDcmFzaDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlID09IDIgLyogV2luZG93RXJyb3IuQ1JBU0hFRCAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBlbGVjdHJvbl8xLmRpYWxvZy5zaG93TWVzc2FnZUJveCh0aGlzLndpbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdMb3Vpcy1kZXYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogWydSZSBPcGVuJywgJ0tlZXAgV2FpdGluZyddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1RoZSBXaW5kb3cgaGFzIENyYXNoZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdElkOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsSWQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0xpbms6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMud2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXNwb25zZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkV2luZG93U2FuZEJveCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3VsdC5yZXNwb25zZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53aW4uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vc2hvd1dpbmRvd1xyXG4gICAgICAgIHNob3dXaW5kb3coKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLndpbiAmJiAhdGhpcy53aW4uaXNWaXNpYmxlKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2luLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2N1cnJlbnRBY3RpdmVXaW5kb3dcclxuICAgICAgICBjdXJyZW50QWN0aXZlV2luZG93KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy53aW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vZm9jdXMgd2luZG93XHJcbiAgICAgICAgZm9jdXNXaW5kb3coKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy53aW4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc01pbmltaXplZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndpbi5yZXN0b3JlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB0aGlzLndpbi5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXRTYW5kYm94UGF0aCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZW52aXJvbm1lbnQuaXNEZXZlbG9wbWVudCgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXRpbHNfMS5VdGlsaXRlcy5mc1BhdGgoXCIuLi9zYW5kYm94L3J1bnRpbWUvcnVudGltZS5odG1sXCIsIHsgaXNEaXJlY3Rvcnk6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXRpbHNfMS5VdGlsaXRlcy5mc1BhdGgoXCIuLi9zYW5kYm94L3RlbXBsYXRlL3J1bnRpbWUuaHRtbFwiLCB7IGlzRGlyZWN0b3J5OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaXNXaW5kb3dNaW5pbWl6ZWRcclxuICAgICAgICBpc01pbmltaXplZCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2luID8gdGhpcy53aW4uaXNNaW5pbWl6ZWQoKSA6IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0xvYWRSZW5kZXJlclByb2Nlc3NcclxuICAgICAgICBhc3luYyBsb2FkV2luZG93U2FuZEJveCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud2luKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndpbi5sb2FkVVJMKHV0aWxzXzEuVXRpbGl0ZXMuZmlsZVVyaUZyb21QYXRoKHRoaXMuZ2V0U2FuZGJveFBhdGgoKSwgeyBpc1dpbmRvd3M6IHRydWUgfSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c1dpbmRvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vRGlzcG9zZSBXaW5kb3dcclxuICAgICAgICBkaXNwb3NlKCkge1xyXG4gICAgICAgICAgICB0aGlzLndpbiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0cy5Mc1dpbmRvdyA9IExzV2luZG93O1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlTHNXaW5kb3coZW52aXJvbm1lbnQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IExzV2luZG93KGVudmlyb25tZW50KTtcclxuICAgIH1cclxuICAgIGV4cG9ydHMuY3JlYXRlTHNXaW5kb3cgPSBjcmVhdGVMc1dpbmRvdztcclxufSk7XHJcbiIsImRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG59KTtcclxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgQWdyaW1vIEluZnJhIExURC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5kZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCJscy9jb21tb24vSURpc3Bvc2UvZGlzcG9zZVwiLCBcImxzL2NvbW1vbi9tZXNzYWdlQ2hhbm5lbC9jaGFubmVsU2VydmljZVwiLCBcImxzL2NvbW1vbi91dGlscy91dGlsc1wiLCBcImxzL2NvbW1vbi9kZWNvcmF0b3JzL2RlY29yYXRvclNlcnZlclwiLCBcImxzL2NvbW1vbi9kZWNvcmF0b3JzL2luamVjdG9yXCIsIFwibHMvY29tbW9uL2RlY29yYXRvcnMvc2VydmljZUNvbGxlY3Rpb25NYW5hZ2VyXCIsIFwibHMvcGxhdGZvcm0vc2VydmljZXMvZW52aXJvbm1lbnQvZW52aXJvbm1lbnRTZXJ2aWNlXCIsIFwibHMvcGxhdGZvcm0vcnVudGltZS9ydW50aW1lXCIsIFwibHMvcGxhdGZvcm0vd2luZG93L3dpbmRvd1wiLCBcImxzL3BsYXRmb3JtL3dpbmRvdy93aW5kb3dFcnJvclwiLCBcImxzL3BsYXRmb3JtL2VsZWN0cm9uLW1haW4vbWFpblwiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG59KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdtb2R1bGUnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2xzL19wbGF0Zm9ybS50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==