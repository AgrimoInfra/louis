/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { WebFrameManager } from "./webFrame/webFrame";
import { IpcChannel } from "./ipcChannel/ipcChannel";
import { ShutDownManager } from "./shutDown/shutDown";
import { contextBridge } from "electron";



const globals = {
    IpcRenderer: IpcChannel,
    WebFrame: WebFrameManager,
    ShutDownSystem : ShutDownManager
}

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('louis',globals)
    } catch (error) {
        console.error(error)
    }
} else {
    
    //@ts-ignore
    window.louis = globals;
}