/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { resolve } from 'path';

interface IUtilites {
    isWindows:boolean;
    scheme? : string
    fallbackAuthority?:string
}

export class Utilites {

    public static fsPath(source:string,options:{isDirectory : boolean}){
        if(options.isDirectory){
            return resolve(__dirname,source)
        }else{
            return resolve(source);
        }
    };

    public static fileUriFromPath(path:string,config:IUtilites){

        let pathName = path.replace(/\\/g, '/');
		if (pathName.length > 0 && pathName.charAt(0) !== '/') {
			pathName = `/${pathName}`;
		}

        let uri:string;

        if (config.isWindows && pathName.startsWith('//')) {
			uri = encodeURI(`${config.scheme || 'file'}:${pathName}`);
		}

        else{
			uri = encodeURI(`${config.scheme || 'file'}://${config.fallbackAuthority || ''}${pathName}`);

        }
        return uri.replace(/#/g, '%23');
    }

};

