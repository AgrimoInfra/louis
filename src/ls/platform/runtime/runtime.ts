/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { LsWindow, createLsWindow } from "ls/platform/window/window";
import { IDisposable } from "ls/common/IDispose/dispose";
import {IEnvironment,IEnvironmentService} from "ls/platform/services/environment/environmentService"
import { app, ipcMain } from "electron";
import { IMessageChannel } from "ls/common/messageChannel/channelService";


//Runtime Should Use Dependency Injection;;;

export class Runtime implements IDisposable {

    private runtimeAppWindow:LsWindow|null

    constructor(
        @IEnvironment private readonly environment:IEnvironmentService
    ) { 
        this.runtimeAppWindow = null;
    };

    
    private openLsWindow() {
        this.runtimeAppWindow = createLsWindow(this.environment);
        this.runtimeAppWindow.loadWindowSandBox()
    }
    private registerMainWindowListener() {
        ipcMain.on(IMessageChannel.windowCommands.CLOSE_WINDOW_CMD, () => {
            app.quit();
            this.dispose()
        })
    }

    public async initializeRuntimeApp() {
        this.openLsWindow();
        this.registerMainWindowListener()
    }

    //dispose ApplicationRuntime dependencies;
    public dispose(): void {
        if (this.runtimeAppWindow) {
            this.runtimeAppWindow.dispose()
        }
    }

}

