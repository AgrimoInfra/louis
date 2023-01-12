/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import "ls/sandbox/ui/titlebar/titlebarPart.css";
import { IDisposable } from "ls/common/IDispose/dispose";
import { IWindowControllerService } from "ls/sandbox/vendors/services/nativeWindow/windowController";
import { IWindowEventsService } from "ls/sandbox/vendors/services/nativeWindow/windowEvents";
import { titlebarController } from "ls/sandbox/ui/titlebar/parts/titlebarControls/titlebarController";
import { titlebarResizerController } from "ls/sandbox/ui/titlebar/parts/titlebarResizer/titlebarResizer";
import { titlebarTitleContent } from "ls/sandbox/ui/titlebar/parts/titlebarTitle/titlebartitle";
import {  TitlebarHostManager } from "ls/sandbox/ui/titlebar/parts/titlebarHost/titlebarHost";


export class TitlebarPart implements IDisposable {

    private mainContainer: HTMLDivElement | null;
    private frameHandle: HTMLDivElement | null;
    private titlebarResizer: HTMLDivElement | null;
    private titlebarTitleArea: HTMLDivElement | null;
    private trafficLightsContainer: HTMLDivElement | null;
    private controller: titlebarController | null;

    constructor(
        public windowController: IWindowControllerService,
        public windowEvents: IWindowEventsService,
    ) {
        this.mainContainer = null;
        this.titlebarResizer = null;
        this.controller = null;
        this.frameHandle = null;
        this.titlebarTitleArea = null;
        this.trafficLightsContainer = null;
    };

    /**
     * get frame handle must run before initializing substances
     * @param handle 
     */

    public getFrameHandle(handle: HTMLDivElement) {
        if (!this.frameHandle) {
            this.frameHandle = handle;
        }
    }

    /**
     * Must Be called after aqurring frame handle
     */

    public initializeSubstance() {
        this.createTitleBarContainer()
        this.loadContainerIntoFrame()
        this.loadPartSubtances()
        this.initializeController();
    }
    private loadPartSubtances() {
        if (this.mainContainer) {
            const substances: Array<HTMLDivElement> = [this.createTitleBarContentBox(), this.createTitlebarResizer(), this.createTrafficLightsContainer()];
            this.mainContainer.append(...substances);
        }

    }

    private loadContainerIntoFrame() {
        if (this.mainContainer && this.frameHandle) {
            this.frameHandle.appendChild(this.mainContainer);
        }
    }


    /****************************************************
     *  |-----------------------------------------------|
     *  |                                               |
     *  |                                               |
     *  |             MAIN_CONTROLLER                   |
     *  |                                               |   
     *  |-----------------------------------------------|
     * 
     * *************************************************** 
     */

    private initializeController() {
        if (this.titlebarResizer && this.titlebarTitleArea && this.trafficLightsContainer && this.mainContainer) {
            this.controller = new titlebarController(this.windowController, this.windowEvents, new titlebarResizerController(this.titlebarResizer), new titlebarTitleContent(this.titlebarTitleArea),new TitlebarHostManager(this.mainContainer));
            this.controller.registerTitleBarControlsHost(this.trafficLightsContainer);
            this.controller.invokeItemControllerSystem()
        }
    }

    private createTitleBarContainer() {
        const container = document.createElement("div");
        container.classList.add('ls-titlebar-part');
        this.mainContainer = container;
    }

    private createTitlebarResizer() {
        const resizerContainer = document.createElement("div");
        resizerContainer.classList.add("xl-resizer");
        this.titlebarResizer = resizerContainer;
        return resizerContainer;
    }
    private createTitleBarContentBox() {
        const titlebarContentBox = document.createElement("div");
        titlebarContentBox.classList.add('xl-title');
        this.titlebarTitleArea = titlebarContentBox;
        return titlebarContentBox;
    }
    private createTrafficLightsContainer() {
        const trafficLightsContainer = document.createElement("div");
        trafficLightsContainer.classList.add('xl-traffic-lights');
        this.trafficLightsContainer = trafficLightsContainer;
        return trafficLightsContainer;

    }

    public dispose(): void {
        this.mainContainer = null;
        this.titlebarResizer = null;
        this.frameHandle = null;
        this.titlebarTitleArea = null;
        this.trafficLightsContainer = null;
        if(this.controller){this.controller.dispose()}
    }


}