/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "ls/common/IDispose/dispose";

export type iconType = "chrome-close" | "chrome-restore" | "chrome-maximize" | "chrome-minimize";

export interface ITitlebarControllerItemOptions {

    classList: string | string[];
    isVisible: boolean;
    icon: iconType;


}
export interface ItemFormat extends IDisposable {
    readonly item: HTMLDivElement;
    readonly mainClass: string;
    readonly visibility: boolean;
    readonly iconNature: iconType;
    toggleClass(currentClass: string, newClass: string): void;

}

export class titlebarControllerItem implements ItemFormat {

    private classList: string | string[];
    private isVisible: boolean;
    private icon: iconType;
    private container: HTMLDivElement | null = null;

    constructor(itemOptions: ITitlebarControllerItemOptions) {
        this.classList = itemOptions.classList;
        this.isVisible = itemOptions.isVisible;
        this.icon = itemOptions.icon;
        this.container = null;
        this.initializeContainerItem()
    };

    private initializeContainerItem() {
        this.createContainerItem();
    }
    public  toggleClass(currentClass: string, newClass: string): void {
        if (this.container && this.container.classList.contains(currentClass)) {
            this.container.classList.replace(currentClass,newClass)
        }
    }

    public get item(): HTMLDivElement{
        return this.container!;
    }
    public get mainClass(): string{
        return this.classList[1]
    }
    public get visibility(): boolean{
        return this.isVisible;
    }
    public get iconNature(): iconType {
        return this.icon;
    }
    public dispose(): void {
        this.container = null;
    }

    private createContainerItem() {
        const mcContainer = document.createElement("div");
        mcContainer.classList.add(...this.classList);
        this.container = mcContainer;
    }

}