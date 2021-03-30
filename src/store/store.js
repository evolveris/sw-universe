import React, {createContext, useReducer} from "react";
import Reducer from './reducer'

const globalState = {
    currentNode: null,
    error: null
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, globalState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(globalState);
export default Store;