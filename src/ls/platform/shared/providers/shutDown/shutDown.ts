/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


import { exec } from "child_process";

export const ShutDownManager = {


    invoke() {
        //check operating system

        if (process.platform == "win32") {

            exec('shutdown.exe /s /t 00', (err, stdout, stderr) => {
                console.log(`${stdout}`);
                console.log(`${stderr}`);
                if (err !== null) {
                    console.log(`exec error: ${err}`);
                }
            })

        }



    }

}

