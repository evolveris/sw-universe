const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_NODE':
            return {
                ...state,
                currentNode: action.payload
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