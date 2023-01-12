/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "ls/common/IDispose/dispose";


/**
 * TO BE NOTED THE ICON SHOULD BE ABLE TO BE HIDDEN
 */

export interface ISashItemOptions {
    /**
     * Whether at runtime this specific item is activre or not
     */
    isInitiallyActive: boolean;

    /**
     * The routeLocation Label to keep management of state in stable way
     */
    routeLocationLabel: string;

    /**
     * if the item is routed then we can associate to a routing listeners;
     */
    isRouted: boolean;

    /**
     * The tooltip to be displayed when the item is hovered on
     */
    tooltip: string;

    /**
     * The Icon to be provided
     */
    iconManager: any;


}

export class sashItem implements IDisposable {


    public dispose(): void {
        
    }
}