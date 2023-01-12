/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "ls/common/IDispose/dispose";
import { $ } from "ls/sandbox/common/dom";

export interface ITitlebarTitle extends IDisposable{

    [key: string]: any;
    content: string;

}



export class titlebarTitleContent implements ITitlebarTitle{

    
    private titlebarTitleContentHost: HTMLDivElement | null;
    private domTitleElement: HTMLTitleElement | null;
    private titlebarContent: string;

    constructor(hostContainer:HTMLDivElement) {
        this.titlebarContent = "unset"
        this.titlebarTitleContentHost = hostContainer;
        this.domTitleElement = null;
        this.initializeTitleHost()

    }
    private initializeTitleHost() {
        this.getHandleOnTitleElement()
    }
    private getHandleOnTitleElement() {
        this.domTitleElement = $<HTMLTitleElement>('title')!
    }

    private setTitleElementContent(value: string) {
        if (this.domTitleElement) {
            this.domTitleElement.textContent = value;
        }
    }
   


    private setContentTextContent(value: string) {
        if (this.titlebarTitleContentHost) {
            this.titlebarTitleContentHost.textContent = value;
        }
    };

    
    public get content(): string{
        return this.titlebarContent;
    }
    public set content(v: string) {
        if (this.titlebarContent != v) {
            this.titlebarContent = v;
            this.setContentTextContent(this.titlebarContent);
            this.setTitleElementContent(this.titlebarContent)
        }
    }
    public dispose(): void {
        this.titlebarTitleContentHost = null;
        this.domTitleElement = null;
    }
    

}