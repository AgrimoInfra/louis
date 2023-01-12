/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


export const IMessageChannel = {

    windowEvents: {
        WINDOW_DID_RESIZE: 'louis:windowDidResize',
        WINDOW_DID_MAXIMIZE: 'louis:windowDidMaximize',
        WINDOW_DID_MINIMIZE: 'louis:windowDidBlur',
        WINDOW_DID_FOCUS: 'louis:windowDidFocus',   
        WINDOW_DID_RESTORE:'louis:windowDidRestore'
    },
    windowCommands: {
        CLOSE_WINDOW_CMD: 'louis:windowClose',
        MINIMIZE_WINDOW_CMD: 'louis:windowMinimize',
        MAXIMIZE_WINDOW_CMD: 'louis:windowMaximize',
        RESTORE_WINDOW_CMD : 'louis:windowRestore',
    },
    rendererProcess: {
        WINDOW_RELOAD: 'louis:reloadWindow',
        WINDOW_SHOW: 'louis:showWindow',
    }
};