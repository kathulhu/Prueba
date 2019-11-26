import React from 'react';
import { NavLink } from "react-router-dom";
import * as actions from './../actions/Actions';
import AppReducer from "../reducers/AppReducer";

const Items = ({ location }) => {

    const [state, dispatch] = React.useReducer(AppReducer, { loading: false });

    React.useEffect(() => {
        let query = "";
        if(location.pathname.includes("search")){
            query = location.pathname.replace('/items?search=', '');
        }

        if(location.search.includes("search")){
            query = location.search.replace('?search=', '');
        }

        if(query !== ""){
            actions.searchItemsFn(query, dispatch)
        }
    }, [location]);

    return(
        <div>
            {
                !state.loading &&
                <div className="items-container">
                {
                    state.items && state.items.map((item, idx) =>
                        <div  key={`item-${idx}`} className="item">
                            <NavLink to={{pathname: `/items/${item.id}`}} style={{ textDecoration: 'none' }}>
                                <div className="item-left">
                                    <img className="item-image" src={ item.picture }/>
                                </div>
                                <div className="item-right">
                                    <div className="item-price-container">
                                        <span className="item-price">{ item.price.currency }</span>
                                        <span className="item-price">{ item.price.amount }</span>
                                        {
                                            item.free_shipping &&
                                            <img src="ic_shipping.png"/>
                                        }
                                    </div>
                                    <div>{ item.title }</div>
                                </div>
                            </NavLink>
                        </div>
                    )
                }
                </div>
            }
        </div>
    )
};

export default Items;