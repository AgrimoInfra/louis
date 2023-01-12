/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "ls/common/IDispose/dispose";
import { routerData } from "ls/sandbox/vendors/services/viewletRouter/controls/routerData/routerData";


/**
 * RouterActions holds the actions that are provider outside such as;
 * navigate
 * goback;
 * goforward;
 * currentRouteKey,
 * recentRouteKey,
 * backwardState.
 */

export class routerActions extends routerData implements IDisposable {


    constructor(routerElementClass:string,initialRouteKey:string) {
        super(routerElementClass,initialRouteKey)
    }

    protected override initializeProvider(): void {
        if (this.initalRouteKey) {
            super.initializeProvider();
            this.navigate(this.initalRouteKey,{virtualData : null})    
        }
    }

    /**
     * Used to navigate within routes;
     * @param routeKey the routekey to navigate to
     * @param data the data to pass on to the routerEvents
     * 
     * theory of operation
     * 
     * first, the user gives us the routeKey and the data he wants to move around;
     * second, we check if the routeKey is actually present in our database, if not fire an ERROR;
     * thirdly, if the routeKey is present [yes we're clear to proceed] 
     * fourth, we get the currently [active-location] element and save its routekey as the [tobe recent-route-key] if its an {initalRun} we keep rolling
     * fifth, we fire the before-navigation-event,
     * {{We can add a promise barrier here to prevent navigation from proceeding until all subscribers are settled}}
     * sixth, we hide the [was-active-element] and display the [new element]
     * seventh, we update the [active-location] attribute. to [newlocatedElement];
     * eigth, we fire the afterNavigationEvent with the {data}that was moved around {{virtualData : value}} and the {newRouteKey};
     * ninth, we then get the [recent-route-key] that was earlier saved and we store it in the backwardstack;
     * tenth, we then update the currentRoutekey [--third-step--]
     * eleventh, we clear the moving data adn dispose references,,[[[memory-management]]];
     * ---incase someone clicks to navigate to the same-location we still follow the same procedure
     */
    public navigate(routeKey: string, data: any) {

        
    }

    /**
     * Used to move backwards within routes;
     * 
     * theory of operation
     * first,we get the currently [active-location] element and save its routekey as the [tobe recent-route-key],
     * second, we get the [recently-showed-element] from the [backward-stack] and obtain its corresponding element and we relax a bit
     * thirdly, we fire the before navigation event,
     * {{We can add a promise barrier here to prevent navigation from proceeding until all subscribers are settled}}
     * fourth, we hide the [was-active-element] and display the [new element],
     * fifth, we update the [active-location] attribute. to [newlocatedElement];
     * sixth, we fire the afterNavigationEvent with the {newRouteKey} and {null virtual data} because the data moves forward and is always reset every time a person uses the navigate();
     * seventh, we then get the [recent-route-key] that was earlier saved and we store it in the forwardstack;
     * eighth, we then update the currentRoutekey [--first-step--];
     * ninth, clear [was-route-key] from the backward stack;
     * ninth, eleventh, we dispose references,,[[[memory-management]]];
     */

    public goBack() {
        
    }








    public override dispose(): void {
        
    }
}