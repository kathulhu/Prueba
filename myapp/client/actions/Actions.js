export const searchItemsFn = (query, dispatch) => {
    dispatch({type: "SEARCHING"});
    fetch(`/api/items?q=${query}`).
    then(response => response.json()).
    then(jsonResponse => {
        dispatch({type: "SEARCH_RESPONSE", response: jsonResponse})
    });
};

export const searchDetailsFn = (param, dispatch) => {
    dispatch({type: "SEARCHING"});
    fetch(`/api/items/${param}`).
    then(response => response.json()).
    then(jsonResponse => {
        dispatch({type: "SEARCH_RESPONSE", response: jsonResponse})
    });
};