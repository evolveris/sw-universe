import React, {createContext, useReducer} from "react";
import Reducer from './reducer'

const NODE_TYPES = {
    UNKNOWN: "unknown",
    PLANET: "planet",
    MOVIE: "movie"
}

/** @type {StarWarsGlobalState} */
const globalState = {
    currentNode: {
        type: NODE_TYPES.UNKNOWN,
        name: "",
        id: null,
    },
    graph: null,
    showSidebar: false,
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