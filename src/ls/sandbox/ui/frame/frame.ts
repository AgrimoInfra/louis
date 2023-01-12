/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import "ls/sandbox/ui/frame/frame.css";
import { Browser } from "ls/sandbox/vendors/browser";
import { Injector } from "ls/common/decorators/injector";
import { ServiceCollection } from "ls/common/decorators/serviceCollectionManager";
import { ILogger, Logger } from "ls/sandbox/vendors/services/Logger";
import { IWindowController, windowController} from "ls/sandbox/vendors/services/nativeWindow/windowController";
import { IWindowEvent, WindowEvents } from "ls/sandbox/vendors/services/nativeWindow/windowEvents";
import { IDisposable } from "ls/common/IDispose/dispose";


export class FrameWindow implements IDisposable {

    private frameContainer: HTMLDivElement | null;
    private didCreateFrameContainer: boolean;
    private browserController: Browser | null;

    constructor() {
        this.frameContainer = null;
        this.didCreateFrameContainer = false;
        this.browserController = null;
    };

    public startup() {
        this.initalizeFrameControlWindow()
    }
    private initalizeFrameControlWindow() {
        this.createFrameContainer();
        this.isFrameContainerPresent();
        this.createWorkArea()
    };

    private isFrameContainerPresent() {
        if (this.frameContainer && this.frameContainer.classList.contains('ls-frame-window')) {
            this.didCreateFrameContainer = true;
        }
    };
    private instantiateServices() {
        let makeInstantiationBundle = this.createServiceDependencies();
        this.browserController =  makeInstantiationBundle.createInstance<Browser>(Browser);

    }
    private createServiceDependencies() {
        let serviceCollection = new ServiceCollection();
        serviceCollection.set(ILogger, new Logger());
        serviceCollection.set(IWindowController, new windowController());
        serviceCollection.set(IWindowEvent, new WindowEvents());
        return new Injector(serviceCollection)
    }
    private loadBrowser() {
        if (this.browserController && this.frameContainer) {
            this.browserController.startup(this.frameContainer);
        }
    }

    private async createWorkArea() {
        if (this.didCreateFrameContainer) {
            this.instantiateServices();
            this.loadBrowser()
        }
    }

    public dispose(): void {
        this.frameContainer = null;
        this.browserController = null;
    }

    private createFrameContainer() {
        const frameElement = document.createElement('div');
        frameElement.classList.add('ls-frame-window');
        this.frameContainer = frameElement;
        document.body.appendChild(this.frameContainer);
    };

};

new FrameWindow().startup()