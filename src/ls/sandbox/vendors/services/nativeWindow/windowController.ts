/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator as createServiceDecorator } from "ls/common/decorators/decoratorServer";
import { IpcRenderer } from "electron";
import { IMessageChannel } from "ls/common/messageChannel/channelService";

export const IWindowController = createServiceDecorator<IWindowControllerService>("windowController");

export interface IWindowControllerService  {

    /**
     * whether to focus or blur;
     * @param token allowed or not
     */
    shouldFocus(token: boolean): void;
    /**
     * Simutaneouly close Window;
     */
    closeWindow(): void;
    /**
     * Request Window Minimization
     */
    minimizeWindow(): void;
    /**
     * Request Window Maximization
     */
    maximizeWindow(): void;
    /**
     * Request Window Restoration
     */
    restoreWindow(): void;

    /**
     * Check if The Window is Maximized
     */
    isMaximized:boolean;

    /**
     * Switch Or UnSwitch From fullscreen Mode;
     * @param token A token to accept or reject
     */
    
    shouldfullScreenWindow(token:boolean): void;

   
};


export class windowController implements IWindowControllerService {

    public isMaximized: boolean;
    constructor() {
        this.isMaximized = false;
    }


    private IPC_CHANNEL(): IpcRenderer {
        //@ts-ignore
        return window.louis.IpcRenderer;
    };

    public shouldFocus(token: boolean): void {
        if (token) {
            window.focus()
        } else {
            window.blur()
        }
    }


    public closeWindow(): void {
        this.IPC_CHANNEL().send(IMessageChannel.windowCommands.CLOSE_WINDOW_CMD, null);
    }
    public minimizeWindow(): void {
        this.IPC_CHANNEL().send(IMessageChannel.windowCommands.MINIMIZE_WINDOW_CMD,null)
    }
    public maximizeWindow(): void {
        this.IPC_CHANNEL().send(IMessageChannel.windowCommands.MAXIMIZE_WINDOW_CMD, null);
    }
    public restoreWindow(): void {
        this.IPC_CHANNEL().send(IMessageChannel.windowCommands.RESTORE_WINDOW_CMD,null)
    }
    public shouldfullScreenWindow(token: boolean): void {
        //must be implemented
    }
}