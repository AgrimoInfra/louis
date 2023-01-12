/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


/// <reference path="../../../types/jasmine.d.ts" />


/**
 * Frame Container Test Suit
 */

describe("FrameContainerTest", () => {
    

    it("ShouldBeCreated", () => {

        expect(document.querySelector<HTMLDivElement>('.ls-frame-window')).toBeTruthy()
    });

})
