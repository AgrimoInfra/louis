/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/



interface IEventEmitterCallback {
    (...args:any[]):void;
};

export interface IEventEmitter<T>{
    addEventListener(event:string,handler:IEventEmitterCallback):void;
    removeEventListener(event:string,handler:IEventEmitterCallback):void;
    emit(event:string,...args:T[]):void;
    deleteEmitter():void;
}

class _eventEmitterSingle<K> implements IEventEmitter<K> {
    private _listeners:Map<string,IEventEmitterCallback>|null = new Map<string,IEventEmitterCallback>();

    public addEventListener(event:string,handler:IEventEmitterCallback){
        this._listeners!.set(event,handler)
    };
    public removeEventListener(event:string,handler:IEventEmitterCallback){
        if(this._listeners != null && this._listeners!.has(event)){
            this._listeners!.delete(event)
        }else{
            throw new Error(`Removing Unknown Event ${event}`)
        }
    }
    public emit(event:string,...args:K[]){
        if(this._listeners != null && this._listeners!.has(event)){
            this._listeners!.get(event)!.apply(null,args);
        }else{  
            throw new Error(`Calling Unknown Event ${event}`);
        }
    }
    public deleteEmitter(){
        this._listeners!.clear();
        this._listeners = null;
    }
}

export interface IAsyncEventEmitter<T>{
    addAsyncEventListener(event:string,handler:IEventEmitterCallback):Promise<void>;
    removeAsyncEventListener(event:string,handler:IEventEmitterCallback):Promise<void>;
    emitAsync(event:string,...args:T[]):Promise<void>;
    deleteEmitterAsync():Promise<void>
}




class _asyncEventEmitter<H> extends _eventEmitterSingle<H>  implements IAsyncEventEmitter<H> {
    constructor(){
        super();
    };
    async addAsyncEventListener(event:string,handler:IEventEmitterCallback){
        this.addEventListener(event,handler);
        return Promise.resolve()     
    }
    async removeAsyncEventListener(event:string,handler:IEventEmitterCallback){
        try {
            this.removeEventListener(event,handler)
            return Promise.resolve();      
        } catch (err) {
            Promise.reject(err)
        }
        
    }
    async emitAsync(event:string,...args:H[]){
        try {
            this.emit(event,...args);
            return Promise.resolve();   
        } catch (e) {
            Promise.reject(e)
        }
        
    };
    async deleteEmitterAsync(){
        this.deleteEmitter()
    }
};



interface IGlobalEventEmitterHandlerSubscriber<T>{
    (args:T):void;
}


export interface IGlobalEventEmitter<T> {


    /**
     *Used to raiseEvent; 
     * @param args Arguments to be dispatched to the subscribers 
     */
    raiseEvent(...args:T[]):void

    /**
     * Used To Subscribe to An Event;
     * @param handler A method to Invoke When the Event is Raised
     */
    subscribe(handler:IGlobalEventEmitterHandlerSubscriber<T>):void;
    /**
     * Used to Unsubscribe to An Event;
     * @param handler 
     */
    unsubscribe(handler:IGlobalEventEmitterHandlerSubscriber<T>):void;
    //dont forget to dispose;

    /**
     * Dispose the Event Emitter;
     */
    dispose():void;

    /**
     * Function to be called when all event subscribers are settled;
     */
    didFireHandler:Function|null;

};

/**
 * Exposes an Event to the public;
 */

class _globalEventEmitter<K> implements IGlobalEventEmitter<K> {

    protected _eventListeners:Function[]|null = []
    public didFireHandler:Function|null = null;


    raiseEvent(...args:K[]){
        if(this._eventListeners != null && this._eventListeners!.length > 0){
            this._executeSubscribersWithArgs(args);
        }else{
            console.warn(`Raising Event With No Subscribers ${this}`);
        }
    };
    protected _executeSubscribersWithArgs(args:K[]){
        let _indicator =this._eventListeners!.length;
        for(let i = 0; i < this._eventListeners!.length; i++){
            this._eventListeners![i].apply(null,args);
            _indicator--;
            if(_indicator == 0){
                this._invokeDidFireHandler();
            }
        }
    }
    private _invokeDidFireHandler(){
        if(this.didFireHandler != null){
            this.didFireHandler();
        }
    }

   private _isRecorded(handler:IGlobalEventEmitterHandlerSubscriber<K>){
       if(this._eventListeners!.indexOf(handler) == -1){
           return false;
       }else{
           return true
       }
   };
   private _deleteHandler(handler:IGlobalEventEmitterHandlerSubscriber<K>){
        if(this._isRecorded(handler)){
            let i = this._eventListeners!.indexOf(handler);
            this._eventListeners!.splice(i,1)
        }
   }

    subscribe(handler:IGlobalEventEmitterHandlerSubscriber<K>){
        if(!this._isRecorded(handler)){
            this._eventListeners!.push(handler);
        }
       
    };
    unsubscribe(handler:IGlobalEventEmitterHandlerSubscriber<K>){
        this._deleteHandler(handler)
    }

    dispose(){
        this._eventListeners = null;
    }


}
/**
 * Creates An Async GlobalEvent Emitter;
 */
export interface IAsyncGlobalEventEmitter<T> {
    /**
     *Used to raiseEvent Asynchronously; 
     * @param args Arguments to be dispatched to the subscribers 
     */
     raiseEventAsync(...args:T[]):Promise<void>;

     /**
      * Used To Subscribe to An Event;
      * @param handler A method to Invoke When the Event is Raised
      */
     subscribeAsync(handler:IGlobalEventEmitterHandlerSubscriber<T>):Promise<void>;
     /**
      * Used to Unsubscribe to An Event;
      * @param handler 
      */
     unsubscribeAsync(handler:IGlobalEventEmitterHandlerSubscriber<T>):Promise<void>;
     //dont forget to dispose;
 
     /**
      * Dispose the Event Emitter;
      */
     dispose():void;
}

class _globalAsyncEventEmitter<K> extends _globalEventEmitter<K> implements IAsyncGlobalEventEmitter<K> {
    constructor(){
        super();
    }
    async raiseEventAsync(...args:K[]){
        if(this._eventListeners != null && this._eventListeners!.length > 0){
            this._executeSubscribersWithArgs(args);
        }else{
            console.warn(`Raising Event With No Subscribers ${this}`);
        }
        return Promise.resolve();
    };
    async subscribeAsync(handler:IGlobalEventEmitterHandlerSubscriber<K>){
        this.subscribe(handler);
        return Promise.resolve();
    }
    async unsubscribeAsync(handler:IGlobalEventEmitterHandlerSubscriber<K>){
        this.unsubscribe(handler);
        return Promise.resolve();
    };


}







interface ICommonEvents {
    createGlobalAsyncEventEmitter<T>():IAsyncGlobalEventEmitter<T>;
    createGlobalEventEmitter<T>():IGlobalEventEmitter<T>
    createAsyncEventEmitter<I>():IAsyncEventEmitter<I>
    createEventEmitter<G>():IEventEmitter<G>
}

export const CommonEvents:ICommonEvents = {
    createGlobalAsyncEventEmitter<T>():IAsyncGlobalEventEmitter<T> {
        return new _globalAsyncEventEmitter()
    },
    
     createGlobalEventEmitter<T>():IGlobalEventEmitter<T> {
        return new _globalEventEmitter();
    },
    
     createAsyncEventEmitter<I>():IAsyncEventEmitter<I> {
        return new _asyncEventEmitter();
    },
    
     createEventEmitter<G>():IEventEmitter<G>{
        return new _eventEmitterSingle();
    }

}



