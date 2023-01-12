/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import "ls/sandbox/ui/titlebar/parts/titlebarControls/titlebarController.css";
import { titlebarControllerItem } from "ls/sandbox/ui/titlebar/parts/titlebarControls/titlebarControllerItem";
import { IWindowControllerService } from "ls/sandbox/vendors/services/nativeWindow/windowController";
import { IDisposable } from "ls/common/IDispose/dispose";
import { addDisposableEventListener, EVENT_TYPES } from "ls/sandbox/common/dom";
import { IWindowEventsService } from "ls/sandbox/vendors/services/nativeWindow/windowEvents";
import { ItitlebarWindowResizer } from "ls/sandbox/ui/titlebar/parts/titlebarResizer/titlebarResizer";
import { ITitlebarTitle } from "ls/sandbox/ui/titlebar/parts/titlebarTitle/titlebartitle";
import { ITitlebarHost } from "ls/sandbox/ui/titlebar/parts/titlebarHost/titlebarHost";


/**
 * This is the main titlebar controller and is responsible for disposing
 */

export class titlebarController implements IDisposable {


    private closeItemControl: titlebarControllerItem | null;
    private maximizeRestoreControl: titlebarControllerItem | null;
    private minimizeControl: titlebarControllerItem | null;

    private titleBarControlsHost: HTMLDivElement | null;
    

    private closeWindowListener: IDisposable | null;
    private maximizeRestoreWindowListener: IDisposable | null;
    private minimizeWindowListener: IDisposable | null;

    //supplied interfaces

    constructor(
        public windowController: IWindowControllerService,
        public windowEvents: IWindowEventsService,
        public windowResizer: ItitlebarWindowResizer,
        public windowTitle: ITitlebarTitle,
        public windowTitlebar: ITitlebarHost
    ) {
        this.closeItemControl = null;
        this.maximizeRestoreControl = null;
        this.minimizeControl = null;
        this.closeWindowListener = null;
        this.maximizeRestoreWindowListener = null;
        this.minimizeWindowListener = null;
        this.titleBarControlsHost = null;
        this.initializeController();
    };

    private initializeController() {
        this.createContollerItems()
        //set initial title content
        this.windowTitle.content = "Tor"
    }
    
    private createContollerItems() {

        this.closeItemControl = new titlebarControllerItem({
            classList: ["window-close","window-close-dark"],
            icon: "chrome-close",
            isVisible: true,
        });
        this.maximizeRestoreControl = new titlebarControllerItem({
            classList: ["window-maximize-restore", "window-maximize-dark","chrome-common"],
            icon: "chrome-maximize",
            isVisible: true,
        });
        this.minimizeControl = new titlebarControllerItem({
            classList: ["window-minimize","window-minimize-dark","chrome-common"],
            icon: "chrome-minimize",
            isVisible: true,
        });


    }

    private createEventListenerBed() {
        //domListeners
        if (this.maximizeRestoreControl && this.closeItemControl && this.minimizeControl) {
            this.closeWindowListener = addDisposableEventListener(this.closeItemControl.item, EVENT_TYPES.CLICK, () => {
                this.windowController.closeWindow()
            });
            this.maximizeRestoreWindowListener = addDisposableEventListener(this.maximizeRestoreControl.item, EVENT_TYPES.CLICK, () => {
                if (this.windowController.isMaximized) {
                    this.windowController.restoreWindow();
                } else {
                    this.windowController.maximizeWindow()
                }
            });
            this.minimizeWindowListener = addDisposableEventListener(this.minimizeControl.item, EVENT_TYPES.CLICK, () => {
                //loose focus
                this.windowController.shouldFocus(false)
                this.windowController.minimizeWindow();
            })
        };
        //windowListeners
        this.windowEvents.onDidRestoreOrMaximize.subscribeAsync(this.listenerForRestoreOrMaximizeListener.bind(this))
        this.windowEvents.onWindowDidFocus.subscribeAsync(this.listenerForFocusEvents.bind(this));
        this.windowEvents.onWindowDidBlur.subscribeAsync(this.listenerForBlurEvents.bind(this));

    }

    private listenerForBlurEvents() {
        /**
         * DidBlurWindow
         */
        this.windowTitlebar.blurTitlebar()
    }

    private listenerForFocusEvents() {
        /**
         * DidFocusWIndow
         * 
         */
        this.windowTitlebar.focusTitlebar()
    }

   

    /**
     * Catered for restore and maximize listeners
     */
    private listenerForRestoreOrMaximizeListener(isMaximized: boolean) {

        //set early to get initial state
        this.windowController.isMaximized = isMaximized;

        if (isMaximized) {
            this.windowResizer.visibility("hidden")
            if (this.maximizeRestoreControl) {
                //don't forget darktheme & lighttheme
                /**
                 * may use a global variable;
                 */
                this.maximizeRestoreControl.toggleClass("window-maximize-dark", "window-restore-dark")

            }

        } else {
            this.windowResizer.visibility("visible")
            if (this.maximizeRestoreControl) {
                //don't forget darktheme & lighttheme
                this.maximizeRestoreControl.toggleClass("window-restore-dark", "window-maximize-dark")

            }
        }


    }

    private registerControllerItemsToDom() {
        if (this.titleBarControlsHost && this.maximizeRestoreControl && this.closeItemControl && this.minimizeControl) {
            this.titleBarControlsHost.appendChild(this.minimizeControl.item);
            this.titleBarControlsHost.appendChild(this.maximizeRestoreControl.item);
            this.titleBarControlsHost.appendChild(this.closeItemControl.item);

        }
    }
    public invokeItemControllerSystem() {
        this.registerControllerItemsToDom()
        this.createEventListenerBed()
    }

    /**_________________________________________________________________
     * 
     * Main Startup. Must Called before invokeItemControllerSystem
     * 
     * @param host TitleBarControlsHost
     */
    public registerTitleBarControlsHost(host: HTMLDivElement) {
        if (this.titleBarControlsHost == null) {
            this.titleBarControlsHost = host;
        }
    };


    private disposeItemControllers() {
        if (this.maximizeRestoreControl && this.closeItemControl && this.minimizeControl) {
            this.maximizeRestoreControl.dispose();
            this.closeItemControl.dispose();
            this.minimizeControl.dispose()
        }
    }
    public dispose(): void {
        this.closeItemControl = null;
        this.maximizeRestoreControl = null;
        this.minimizeControl = null;
        this.titleBarControlsHost = null;
        this.disposeItemControllers();

        //dispose Listeners
        if (this.closeWindowListener && this.minimizeWindowListener && this.maximizeRestoreWindowListener) {
            this.closeWindowListener.dispose();
            this.maximizeRestoreWindowListener.dispose();
            this.minimizeWindowListener.dispose()
        }

        this.windowResizer.dispose();
    }





};