/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator as createServiceDecorator } from "ls/common/decorators/decoratorServer";


export const IEnvironment = createServiceDecorator<IEnvironmentService>("EnvironmentService");

export interface IEnvironmentService {

    isDevelopment(): boolean;
    xlBackground(): string;

}


export class Environment implements IEnvironmentService {

    public isDevelopment(): boolean {
        let _variable = process.env.LS_DEV;
        
        return _variable ? true : false;
    }
    public xlBackground(): string {
        return "#050B26";
    }

}