/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export const enum WindowError {

    /**
     * Window is unresponsive
     */
    UNRESPONSIVE = 1,

    /**
     * Window has crashed
     */
    CRASHED = 2,

    /**
     * did-fail-load
     */
    LOAD = 3,
}
