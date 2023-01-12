/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "ls/common/IDispose/dispose";

export interface ITitlebarHost extends IDisposable {

    //focus it
    focusTitlebar(): void;
    //blur it
    blurTitlebar(): void;
}

export class TitlebarHostManager implements ITitlebarHost {


    private titlebarHostElementHandle: HTMLDivElement | null;

    constructor(host:HTMLDivElement) {
        this.titlebarHostElementHandle = host;
    }


    public focusTitlebar(): void {
        if (this.titlebarHostElementHandle) {
            this.titlebarHostElementHandle.style.backgroundColor = 'var(--ls-titlebar-focus)';
        }

    }
    public blurTitlebar(): void {
        if (this.titlebarHostElementHandle) {
            this.titlebarHostElementHandle.style.backgroundColor = 'var(--ls-titlebar-blur)';
        
        }
    }

    public dispose(): void {
        this.titlebarHostElementHandle = null;
    }



}