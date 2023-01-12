/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "ls/common/IDispose/dispose";


export class SashContainer implements IDisposable {

    private sashContainerHost: HTMLDivElement | null;
    private sashSectionOne: HTMLDivElement | null;
    private sashSectionTwo: HTMLDivElement | null;


    constructor(sashContainerHost:HTMLDivElement){
        this.sashContainerHost = sashContainerHost;
        this.sashSectionOne = null;
        this.sashSectionTwo = null;
    };



    public initializeSashContainer() {
        this.loadSubstancesIntoSash();
    }
    private loadSubstancesIntoSash() {
        if (this.sashContainerHost) {
            const substances = [this.createSashSectionOne(), this.createSashSectionTwo()];
            this.sashContainerHost.append(...substances);
        }
    }



    private createSashSectionOne() {
        const sashSectionOneContainer = document.createElement('div');
        sashSectionOneContainer.classList.add('xl-sash-sectionone');
        this.sashSectionOne = sashSectionOneContainer;
        return sashSectionOneContainer;
    }
    private createSashSectionTwo() {
        const sashSectionTwoContainer = document.createElement('div');
        sashSectionTwoContainer.classList.add('xl-sash-sectiontwo');
        this.sashSectionTwo = sashSectionTwoContainer;
        return sashSectionTwoContainer;
    }


    public dispose(): void {
        this.sashContainerHost = null;
        this.sashSectionOne = null;
        this.sashSectionTwo = null;
    }

}