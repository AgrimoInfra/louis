/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * IpcChannel Used By the MainProcess
 */

import { ipcRenderer,IpcRendererEvent } from "electron";

export class IPCChannel {


    constructor(){ }


    private validateIpcChannel(channel: string) {
        if (!channel || !channel.startsWith("louis:")) {
            throw new Error(`Unsupported event IPC channel '${channel}'`)
            
        }
        return true;
    }

    //globals;


    public send(channel: string, ...args: any[]) {
        if (this.validateIpcChannel(channel)) {
            ipcRenderer.send(channel,...args)
        }
    }

    public invoke(channel: string, ...args: any[]) {
        if (this.validateIpcChannel(channel)) {
            return ipcRenderer.invoke(channel,...args)
        } else {
            return `[FAILED_IPC_CHANNEL]`
        }
    };

    public on(channel: string, listener: (event: IpcRendererEvent, ...ars: any[]) => void) {
        if (this.validateIpcChannel(channel)) {
            ipcRenderer.on(channel, listener);
            return this;
        } else {
            return `[FAILED_IPC_CHANNEL]`
        }
    }

    public once(channel: string, listener: (event: IpcRendererEvent, ...ars: any[]) => void) {
        if (this.validateIpcChannel(channel)) {
            ipcRenderer.once(channel, listener);
            return this;
        } else {
            return `[FAILED_IPC_CHANNEL]`
            
        }
    }

    public removeEventListener(channel: string, listener: (event: IpcRendererEvent, ...ars: any[]) => void) {
        if (this.validateIpcChannel(channel)) {
            ipcRenderer.removeListener(channel, listener)
            return this
        } else {
            return `[FAILED_IPC_CHANNEL]`
        }
    }

}

function I() {
    return new IPCChannel()
}

export const IpcChannel = I()