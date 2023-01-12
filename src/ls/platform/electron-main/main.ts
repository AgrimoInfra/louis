/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Runtime } from "ls/platform/runtime/runtime";
import { IDisposable } from "ls/common/IDispose/dispose";
import { ServiceCollection } from "ls/common/decorators/serviceCollectionManager";
import { Injector } from "ls/common/decorators/injector";

import { IEnvironment, Environment } from "ls/platform/services/environment/environmentService"

/**
 * Main Dependency Injection Point 
 * tobe implemented For the runtimeApp;
 */

export class LsMain implements IDisposable {

    private runTimeInstance: Runtime | null;

    constructor() {
        this.runTimeInstance = null;
    }

    public async base() {
        //create instances
        let _instantiationService = this.createServices();
        this.runTimeInstance = _instantiationService.createInstance(Runtime);
        this.instantiateRunTime();
    };
    private createServices() {
        const services = new ServiceCollection();
        services.set(IEnvironment, new Environment());
        return new Injector(services)
    }
    private instantiateRunTime() {
        if (this.runTimeInstance) {
            this.runTimeInstance.initializeRuntimeApp();
        }
    }
    public dispose(): void {
        this.runTimeInstance = null;
    }



};

const _LsMain = new LsMain();
_LsMain.base();