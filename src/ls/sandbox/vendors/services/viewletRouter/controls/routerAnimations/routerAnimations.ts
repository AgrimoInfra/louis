/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import "ls/sandbox/vendors/services/viewletRouter/controls/routerAnimations/routerAnimations.css"
import { IDisposable } from "ls/common/IDispose/dispose";

/**
 * Route Animations provides simple Animations for the router page transitions
 */

export class routerAnimations implements IDisposable {

    private mainRouterProvider: HTMLDivElement | null;
    constructor(mainRouteProvider:HTMLDivElement) {
        this.mainRouterProvider = mainRouteProvider;
    };


    protected fadeInElement(element:HTMLDivElement) {
        if (this.mainRouterProvider) {
            element.style.animation = "fadeInElement .5s ease"
        }
        
    }
    protected fadeOutElement(element:HTMLDivElement) {
        if (this.mainRouterProvider) {
            element.style.animation = "fadeInElement .5s ease"
        }
        
    }

    public dispose(): void {
        this.mainRouterProvider = null;
    }


}