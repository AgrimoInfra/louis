/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "ls/common/IDispose/dispose";
import { routerElementProvider} from "ls/sandbox/vendors/services/viewletRouter/controls/routerElement/routerElement";

/**
 * The routerData extends the routerElement by organising the relevant data for routing such as;
 * organizing the routerLocations from the routerElements {with the  routeLocations and corresponding element} in a map
 */

export class routerData extends routerElementProvider implements IDisposable {

    protected accquiredRoutes: Map<string, HTMLDivElement> | null;
    protected initalRouteKey: string | null;

    constructor(routerElementClass:string,initialRouteKey:string) {
        super(routerElementClass)
        this.initalRouteKey = initialRouteKey;
        this.accquiredRoutes = new Map<string, HTMLDivElement>()
    };
    
    protected override initializeProvider(): void {
        super.initializeProvider()
        this.getAndOrgranizeRouteLocationsEvenly()
    }


    private registerRoute(key:string,value:HTMLDivElement) {
        if (this.accquiredRoutes && !this.accquiredRoutes!.has(key)) {
            this.accquiredRoutes.set(key, value);
        }
    }

    private getAndOrgranizeRouteLocationsEvenly() {
        if (this.routeElementsWithinProvider) {
            this.routeElementsWithinProvider.forEach((routeElementPage) => {
                const locationKey = routeElementPage.getAttribute('route-key')!;
                this.registerRoute(locationKey,routeElementPage);
            })
        }
    }

    public override dispose(): void {
        this.initalRouteKey = null;
        this.accquiredRoutes = null;
    }
}