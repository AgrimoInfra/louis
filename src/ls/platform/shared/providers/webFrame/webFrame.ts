/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { webFrame } from "electron"

/**
 * webframe
 */

const webFrameAPI = {

    setZoomLevel(level:number|string) {
        if (typeof level === 'number') {
            webFrame.setZoomLevel(level);
        }
    }
}

export const WebFrameManager = webFrameAPI