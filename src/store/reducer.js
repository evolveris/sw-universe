const changeNodeNameById = (state, nodeId, newNodeName) => {
    state = {...state};
    const foundNode = state.graph.nodes.find(n => n.name === nodeId);

    if (foundNode) {
        foundNode.name = newNodeName;
    }
    return state;
};

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_NODE':
            return {
                ...state,
                currentNode: action.payload
            }
        case 'SET_GRAPH':
            return {
                ...state,
                graph: action.payload
            }

        case 'CHANGE_NODE_NAME_BY_NODE_ID':
            return changeNodeNameById(
                state, 
                action.payload.nodeId, 
                action.payload.newNodeName
            );

        case 'SET_SHOW_SIDEBAR':
            return {
                ...state,
                showSidebar: action.payload
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;