/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IGlobalEventEmitter, IAsyncGlobalEventEmitter,CommonEvents } from "ls/sandbox/common/events";
import { createDecorator as createServiceDecorator } from "ls/common/decorators/decoratorServer";
import { IpcRenderer } from "electron";
import { addDisposableEventListener, EVENT_TYPES } from "ls/sandbox/common/dom";
import { IMessageChannel } from "ls/common/messageChannel/channelService";

export const IWindowEvent = createServiceDecorator<IWindowEventsService>("windowEvents");

export interface IWindowResizerDimensions {
    width : number;
    height : number;
}

export interface IWindowEventsService {

    readonly onBeforeMinimizeWindow:IGlobalEventEmitter<void>;

    /**
     * An event Fired when the Window has Minimized {hidden the window}
     */
    readonly onDidMinimizeWindow:IAsyncGlobalEventEmitter<void>;

    /**
     * An Event Fired When Restore on Maximize Events Occur;
     * 
     * @param _maximize whether window is Maximized or not
     */

    readonly onDidRestoreOrMaximize:IAsyncGlobalEventEmitter<boolean>;

    /**
     * An Event Fired when the Window Resizes;
     * 
     * @param dimensions New Dimensions of the window
     */
    readonly onWindowDidResize:IAsyncGlobalEventEmitter<IWindowResizerDimensions>;

   


    /**
     * An Event Fired when the window is loses focus;
     */

    readonly onWindowDidBlur:IAsyncGlobalEventEmitter<void>;


    /**
     * An Event Fired when the window is Gaines focus;
     */

     readonly onWindowDidFocus:IAsyncGlobalEventEmitter<void>;

     /**
      * 
      */

};


export class WindowEvents {
    public onBeforeMinimizeWindow:IGlobalEventEmitter<void> = CommonEvents.createGlobalEventEmitter<void>();
    public onWindowDidResize:IAsyncGlobalEventEmitter<IWindowResizerDimensions> =CommonEvents.createGlobalAsyncEventEmitter<IWindowResizerDimensions>();
    public onWindowDidBlur:IAsyncGlobalEventEmitter<void> = CommonEvents.createGlobalAsyncEventEmitter<void>();
    public onDidMinimizeWindow:IAsyncGlobalEventEmitter<void> = CommonEvents.createGlobalAsyncEventEmitter<void>();
    public onDidRestoreOrMaximize:IAsyncGlobalEventEmitter<boolean> = CommonEvents.createGlobalAsyncEventEmitter<boolean>();
    public onWindowDidFocus:IAsyncGlobalEventEmitter<void> = CommonEvents.createGlobalAsyncEventEmitter<void>();

    constructor() {
        this.registerWindowListenerInvokers();
    }

    private IPC_CHANNEL(): IpcRenderer {
        //@ts-ignore
        return window.louis.IpcRenderer;
    };

    private registerWindowListenerInvokers() {
        this.createWindowListenerInvokers()
    };

    private createWindowListenerInvokers() {
        
        //registerable listeners
        /**
         * Should register didResize Event
         */

        addDisposableEventListener(window, EVENT_TYPES.BLUR, () => {
            this.onWindowDidBlur.raiseEventAsync();
        });

        addDisposableEventListener(window, EVENT_TYPES.FOCUS, () => {
            this.onWindowDidFocus.raiseEventAsync();
        });

        this.IPC_CHANNEL().on(IMessageChannel.windowEvents.WINDOW_DID_MAXIMIZE, () => {
            this.onDidRestoreOrMaximize.raiseEventAsync(true)
        });

        this.IPC_CHANNEL().on(IMessageChannel.windowEvents.WINDOW_DID_RESTORE, () => {
            this.onDidRestoreOrMaximize.raiseEventAsync(false)
        })
                

    }


}