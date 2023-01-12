/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator as createServiceDescorator } from "ls/common/decorators/decoratorServer";


export const ILogger = createServiceDescorator<ILoggerService>('LoggerService');


export interface ILoggerService {


    /**
     * Information message
     * @param message The message Passed to console.log
     */

    info(message: string): void;
    /**
     * Warning  message
     * @param message The message Passed to console.log
     */
    warn(message: string): void;

    /**
     * Warning  message
     * @param condition The condtion to be Passed
     * @param message The message Passed to console.log
     * @param location Source From Which the assertion originated from
     */
    assert(condition:any,message:string,location?:string): void;

};

const LoggerColors   = {

    INFO_COLOR: "color:#0000ff",
    WARN_COLOR: "color:#ffff00",
    ASSERT_COLOR: "color:#adff2f"
}
type LogMessageType = "info" | "warn" | "assert";


export class Logger implements ILoggerService {

    constructor(){}


    private formatLoggingMessage(type:LogMessageType,message:string,location?:string) {
        switch (type) {
            case "info":
                console.log("%cINFO", LoggerColors.INFO_COLOR, message);
                break;
            case "warn":
                console.warn("%cWARN", LoggerColors.WARN_COLOR, message);
                break;
            case "assert":
                console.log("%cASSERT:", message, location);
                break;
            default:
                console.log("%cINFO", LoggerColors.INFO_COLOR, message);
        }
    }
    private createAssertionBody(condition: any,message:string, location?: string) {
        if (condition) {
            this.formatLoggingMessage("assert",message,location)
        } else {
            this.formatLoggingMessage("assert",`FAILED_(->${message}<-)`,location)
            
        }
    }

    public info(message: string): void {
        this.formatLoggingMessage("info",message)
    }
    public warn(message: string): void {
        this.formatLoggingMessage("warn",message)
    }
    public assert(condition: any,message:string, location?: string): void {
        this.createAssertionBody(condition,message,location)
    }

    
}