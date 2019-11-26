const AppReducer = (state, action) => {
    switch (action.type) {
        case "SEARCHING":
            return {
                ...state,
                loading: true
            };
        case "SEARCH_RESPONSE":
            return {
                ...state,
                loading: false,
                ...action.response
            };
        default: return state;
    }
};

export default AppReducer;