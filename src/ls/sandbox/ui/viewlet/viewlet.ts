/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import "ls/sandbox/ui/viewlet/viewlet.css";
import { IDisposable } from "ls/common/IDispose/dispose";

export class ViewletPart implements IDisposable {

    private mainContainer: HTMLDivElement | null;
    private navigationBarContainer: HTMLDivElement | null;
    private navigationSashContainer: HTMLDivElement | null;
    private routerViewContainer: HTMLDivElement | null;
    private frameHandle: HTMLDivElement | null;

    constructor() {
        this.mainContainer = null;
        this.navigationBarContainer = null;
        this.navigationSashContainer = null;
        this.routerViewContainer = null;
        this.frameHandle = null;
    }

    public getFrameHandle(host:HTMLDivElement) {
        if (this.frameHandle == null) {
            this.frameHandle = host;
        }
    };
    public initializeSubstance(){
        this.createViewletContainer();
        this.loadContainerIntoFrame();
        this.loadPartSubstances();
        this.intializeController()
    };

    private loadPartSubstances(){
        if(this.mainContainer){
            const substances:Array<HTMLDivElement> = [this.createNavigationSashContainer(), this.createNavigationBarContainer(),this.createRouterViewContainer()];
            this.mainContainer.append(...substances);
        }
    }

    private loadContainerIntoFrame(){
        if(this.mainContainer && this.frameHandle){
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

    private intializeController() {
        if (this.mainContainer && this.routerViewContainer && this.navigationBarContainer && this.navigationSashContainer) {
            
        }
    }

    private createViewletContainer(){
        const container = document.createElement("div");
        container.classList.add('ls-viewlet-part');
        this.mainContainer = container;
    };

    private createNavigationSashContainer() {
        const navigationSashContainer = document.createElement('div');
        navigationSashContainer.classList.add('xl-navigationsash');
        this.navigationSashContainer = navigationSashContainer;
        return navigationSashContainer;
    }

    private createNavigationBarContainer(){
        const navigationBarContentBox = document.createElement('div');
        navigationBarContentBox.classList.add('xl-navigationbar');
        this.navigationBarContainer = navigationBarContentBox;
        return navigationBarContentBox;
    };

    private createRouterViewContainer(){
        const routerViewContentBox = document.createElement("div");
        routerViewContentBox.classList.add('xl-routerview');
        this.routerViewContainer = routerViewContentBox;
        return routerViewContentBox;
    }



    public dispose(): void {
        this.mainContainer = null;
        this.mainContainer = null;
        this.navigationSashContainer = null;
        this.navigationBarContainer = null;
        this.routerViewContainer = null;
        this.frameHandle = null
    }

}