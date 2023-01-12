/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BrowserWindow, BrowserWindowConstructorOptions, dialog, ipcMain } from "electron";
import { IDisposable } from "ls/common/IDispose/dispose";
import { IMessageChannel } from "ls/common/messageChannel/channelService";
import { WindowError } from "ls/platform/window/windowError";
import { Utilites } from "ls/common/utils/utils";
import { IEnvironmentService } from "ls/platform/services/environment/environmentService";

/**
 * Window Instance thats Created at Startup And Can Be Disposed
 */


export class LsWindow implements IDisposable {

    private win: BrowserWindow | null = null;

    constructor(public environment: IEnvironmentService) {

        {

            let windowConfiguration: BrowserWindowConstructorOptions = {
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
                    preload : this.getPreloadPath(),
                    v8CacheOptions: "code",
                    devTools: true,
                    enableWebSQL: false,
                    //Should be removed to security Issues
                    nodeIntegration: true,
                    contextIsolation : false,

                }
            };
            this.win = new BrowserWindow(windowConfiguration);
            this.connectWindowRenderedListeners();
            this.registerWindowUserEventListeners();
            this.shouldOpenDevTools()

        }
    };
    //development purposes
    private shouldOpenDevTools() {
        if (this.environment.isDevelopment()) {
            if (this.win) {
                this.win.webContents.openDevTools()
            }
        }
    }

    private getPreloadPath() {
            return Utilites.fsPath("./preload/preload.js", { isDirectory: true })
    }
    

    //SendMessageToRenderer
    private sendMessageToRenderer(channel: string, args?: any[]) {
        if (this.win) {
            this.win.webContents.send(channel, args != undefined ? args : undefined)
        }
    }



    //WindowLifecyleEvents
    private registerWindowUserEventListeners() {

        if (this.win) {
            this.win.on('maximize', () => {
                this.sendMessageToRenderer(IMessageChannel.windowEvents.WINDOW_DID_MAXIMIZE);
            })
            this.win.on('unmaximize', () => {
                this.sendMessageToRenderer(IMessageChannel.windowEvents.WINDOW_DID_RESTORE)
            });
            ipcMain.on(IMessageChannel.windowCommands.MINIMIZE_WINDOW_CMD, () => {
                //Minimize Window;
                /**
                 * Changed Feature in Selix:
                 * from hiding the window to, actually minimizing the window
                 */
                if (this.win) {
                    this.win.minimize();
                }
            });
            ipcMain.on(IMessageChannel.windowCommands.RESTORE_WINDOW_CMD, () => {
                if (this.win) {
                    this.win.unmaximize();
                }
            });

            ipcMain.on(IMessageChannel.windowCommands.MAXIMIZE_WINDOW_CMD, () => {
                if (this.win) {
                    this.win.maximize();
                }
            });
        }
    }


    //MainWindowRendererListeners
    private connectWindowRenderedListeners() {
        ipcMain.on(IMessageChannel.rendererProcess.WINDOW_RELOAD, () => {
            this.loadWindowSandBox();
        });

        if (this.win) {
            this.win.on('unresponsive', () => {
                this.windowDidEncounterError(WindowError.UNRESPONSIVE);
            });

            this.win.webContents.on('render-process-gone', (_event, detail) => {
                this.windowDidEncounterError(WindowError.CRASHED, detail);
            });
            this.win.webContents.on('did-fail-load', (_event, _errorCode, errorDescription) => {
                const details = {
                    reason: errorDescription
                }
                this.windowDidEncounterError(WindowError.LOAD, details);

            });

            this.win.webContents.on('will-prevent-unload', (_event) => {
                _event.preventDefault();
            });

            this.win.on('closed', () => {
                this.dispose();
            })
            ipcMain.on(IMessageChannel.rendererProcess.WINDOW_SHOW, () => {
                this.showWindow();
            });
        }
    }






    //WindowErrorManager
    private async windowDidEncounterError(type: WindowError, details?: { reason: any }) {

        //WindowErrorsHandled
        switch (type) {

            case WindowError.CRASHED:
                console.log(`[LsWindow:Crashed]:${details?.reason}`);
                break;
            case WindowError.UNRESPONSIVE:
                console.log(`[LsWindow:unresponsive]`);
                break;
            case WindowError.LOAD:
                console.log(`[LsWindow:Failed Load]${details?.reason}`)

        }

        switch (type) {

            case WindowError.UNRESPONSIVE:
            case WindowError.CRASHED:

                //Not Responsive Window;
                if (type == WindowError.UNRESPONSIVE) {

                    const result = await dialog.showMessageBox(this.win!, {
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
                    } else if (result.response === 1) {
                        return;
                    }

                }

                //did Crash;
                else if (type == WindowError.CRASHED) {
                    const result = await dialog.showMessageBox(this.win!, {
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
                    } else if (result.response === 1) {
                        this.win.destroy();
                    }
                }

        }

    }



    //showWindow
    public showWindow() {
        if (this.win && !this.win.isVisible()) {
            this.win.show();
        }
    }
    //currentActiveWindow
    public currentActiveWindow() {
        return this.win;
    }
    //focus window
    public focusWindow() {
        if (!this.win) {
            return;
        }

        if (this.isMinimized()) {
            this.win.restore()
        };
        this.win.focus();

    }

    private getSandboxPath() {
        if (this.environment.isDevelopment()) {
            return Utilites.fsPath("../sandbox/runtime/runtime.html", { isDirectory: true })
        } else {
            return Utilites.fsPath("../sandbox/template/runtime.html", { isDirectory: true })
        }
    }

    //isWindowMinimized
    private isMinimized() {
        return this.win ? this.win.isMinimized() : false
    }
    //LoadRendererProcess
    public async loadWindowSandBox() {
        if (this.win) {
            this.win.loadURL(Utilites.fileUriFromPath(this.getSandboxPath(), { isWindows: true }))
            this.focusWindow();
        }
    }
    //Dispose Window
    public dispose(): void {
        this.win = null;
    }




}

export function createLsWindow(environment: IEnvironmentService) {
    return new LsWindow(environment)
}