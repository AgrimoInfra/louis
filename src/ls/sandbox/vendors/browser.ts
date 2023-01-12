/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "ls/common/IDispose/dispose";
import { ILogger, ILoggerService } from "ls/sandbox/vendors/services/Logger";
import { IWindowController, IWindowControllerService } from "ls/sandbox/vendors/services/nativeWindow/windowController";
import { IWindowEvent, IWindowEventsService } from "ls/sandbox/vendors/services/nativeWindow/windowEvents";
import { TitlebarPart } from "ls/sandbox/ui/titlebar/titlebarPart";


export class Browser implements IDisposable{
    private frameHandle: HTMLDivElement | null;
    private titlebarControlManager : TitlebarPart | null;
    constructor(
        @ILogger readonly loggerService: ILoggerService,
        @IWindowEvent readonly windowService: IWindowEventsService,
        @IWindowController  readonly windowControllerService:IWindowControllerService
    ) { 

        this.titlebarControlManager = null
        this.frameHandle = null;
    };

    private async initiaize() {
        this.loggerService.info("BrowserControlInitialized")
        this.loadBrowserControls()
    }

    public startup(handle:HTMLDivElement){
        this.frameHandle = handle;
        this.initiaize()
    };

    private loadBrowserControls(){
        if(this.frameHandle){
            //create titlebarInstance
            this.titlebarControlManager = new TitlebarPart(this.windowControllerService, this.windowService);
            this.titlebarControlManager.getFrameHandle(this.frameHandle);
            this.titlebarControlManager.initializeSubstance()
        }
    }
    public dispose(): void {
        this.frameHandle = null;
        this.titlebarControlManager?.dispose()
    }


}

