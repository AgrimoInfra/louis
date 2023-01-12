/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "ls/common/IDispose/dispose";

export const EVENT_TYPES = {
    FOCUS : 'focus',
    CLICK : 'click',
    RESIZE : 'resize',
    KEY_DOWN : 'keydown',
    KEY_UP : 'keyup',
    MOUSE_DOWN : 'mousedown',
    DBL_CLICk : 'dblclick',
    BLUR  : 'blur',
    FOCUS_OUT: 'focusout'
}


class DomListener implements IDisposable {
    private _node:EventTarget|null;
    private _handler:any;
    private _options:any;
    private readonly _event:string;
    constructor(node:EventTarget,event:string,handler:(e:any)=>any,options?:any){
        this._node = node;
        this._handler = handler;
        this._event = event;
        this._options = options;
        this._node.addEventListener(this._event,this._handler,this._options);
    }
    public dispose(){
        if(this._handler != null){
            this._node!.removeEventListener(this._event,this._handler,this._options)
        };
        //clean up resources;
        this._handler = null;
        this._node  = null;
        this._options = null;
    }
}


export function $<T extends Element>(element:string,parentElement?:HTMLDivElement){
    let _parentElement = parentElement?? document;
    let _result = _parentElement.querySelector<T>(element);
    if(_result){
        return _result;
    }else{
        return undefined;
    }
}
export function $$<T extends Element>(element:string,parentElement?:HTMLDivElement){
    let _parentElement  = parentElement?? document;
    let _result = _parentElement.querySelectorAll<T>(element);
    if(_result.length > 0){
        return _result;
    }else{
        return undefined;
    }
}

export function addDisposableEventListener<K extends keyof GlobalEventHandlersEventMap>(node:EventTarget,type:K,handler:(event:GlobalEventHandlersEventMap[K])=> void,useCapture?:boolean):IDisposable;
export function addDisposableEventListener(node:EventTarget,type:string,handler:(event:any)=>void,useCapture?:boolean):IDisposable;
export function addDisposableEventListener(node:EventTarget,type:string,handler:(event:any)=>void,options:AddEventListenerOptions):IDisposable;
export function addDisposableEventListener(node:EventTarget,type:string,handler:(event:any)=>void,useCaptureOrOptions?:boolean|AddEventListenerOptions):IDisposable{
    return new DomListener(node,type,handler,useCaptureOrOptions)
}



