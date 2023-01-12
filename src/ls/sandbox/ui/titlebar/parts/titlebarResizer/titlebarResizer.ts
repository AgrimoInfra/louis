/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDisposable } from "ls/common/IDispose/dispose";

export interface ItitlebarWindowResizer extends IDisposable{

    visibility(requestedState:"visible"|"hidden"): void;
}

export class titlebarResizerController implements ItitlebarWindowResizer {

    private titlebarResizerHostHandle: HTMLDivElement | null;
    private isVisible: boolean;

    constructor(resizerHost: HTMLDivElement) {
        this.isVisible = true;
        this.titlebarResizerHostHandle = resizerHost
    }

    public visibility(requestedState:"visible"|"hidden"): void {
        if (this.titlebarResizerHostHandle) {
            if (requestedState == "visible") {
                //check if its not actually visible
                if (!this.isVisible) {
                    this.titlebarResizerHostHandle.style.display = "block";
                    this.isVisible = true;
                }
            } else {
                //check if its actually visible;
                if (this.isVisible) {
                    this.titlebarResizerHostHandle.style.display = "none";
                    this.isVisible = false;
                }
            }
        }
    };
    public dispose(): void {
        this.titlebarResizerHostHandle = null;
    }


}