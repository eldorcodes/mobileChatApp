import React, {useReducer} from 'react'
import { Loader } from '../reducers'

export const Store = React.createContext();

const dispatch = {};

export function StoreProvider(props){
    // reducers
    const [mapLoaderState,dispatchLoaderAction] = useReducer(Loader,dispatch);
    // values for reducers
    const loaderValue = {mapLoaderState,dispatchLoaderAction}
    // combine state
    const value = {
        ...loaderValue
    }
    // store
return <Store.Provider value={value}>{props.children}</Store.Provider>
}