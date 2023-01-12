/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "ls/common/IDispose/dispose";
import { $,$$ } from "ls/sandbox/common/dom";

/**
 * The routerElementProvider Provides the base for obtaining all
 * the necessary elements that are goigng to take part in the router bussiness
 * 
 * That includes :  {the routerProviderElement} its self and its children
 * the routes.
 */

export class routerElementProvider implements IDisposable{
    
    private requestedElementClass: string | null;
    protected routerElementHandle: HTMLDivElement | null;
    protected routeElementsWithinProvider: NodeListOf<HTMLDivElement> | null;

    constructor(elementClass:string) {
        this.requestedElementClass = elementClass;
        this.routerElementHandle = null;
        this.routeElementsWithinProvider = null;
    };
    protected initializeProvider() {
        this.queryRouterElementAndObtainHandle();
        this.registerRouterElementAttributes();
        this.queryAllRouteElementsWithinRouterProvider()
    }

    /**
     * Obtain the element that will act as a view for the router via an element class;
     * and save its handle for later
     */

    private queryRouterElementAndObtainHandle() {
        if (this.requestedElementClass && this.requestedElementClass.charCodeAt(0)) {
            const routerElementDomHandle = $<HTMLDivElement>(this.requestedElementClass)!;
            this.routerElementHandle = routerElementDomHandle;
        }
    }

    /**
     * register the router provider  attribute to signal the css that this is my-router or routing
     * host and hide it well --> in accordance for the animations provider;
     */

    private registerRouterElementAttributes() {
        if (this.routerElementHandle) {
            this.routerElementHandle.setAttribute('ls-router-provider', 'main');
        }
    };

    /**
     * Query All Elements With the Router Provider;
     * that were earlier created
     */
    private queryAllRouteElementsWithinRouterProvider() {
        if (this.routerElementHandle) {
            const routeElements = $$('.ls-route-page', this.routerElementHandle)! as NodeListOf<HTMLDivElement>;
            this.routeElementsWithinProvider = routeElements;
        }
    }

    public dispose(): void {
        this.requestedElementClass = null;
        this.routerElementHandle = null;
        this.routeElementsWithinProvider = null; 
    }

}