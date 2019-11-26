import React from 'react';
import * as actions from "../actions/Actions";
import AppReducer from "../reducers/AppReducer";

const ItemDetail = ({ location }) => {

    const [state, dispatch] = React.useReducer(AppReducer, {
        loading: false
    });

    React.useEffect(() => {
        const param = location.pathname.replace('/items/', '');
        actions.searchDetailsFn(param, dispatch)
    }, [location]);

    console.log(1)

    return(
        <div>
            {
                !state.loading &&
                <div className="detail-container">
                    <div className="detail">
                        <div className="detail-left">
                            <img className="detail-image" src={ state.picture }/>
                            <div className="detail-description-container">
                                <div className="detail-description-title">Descripción del producto</div>
                                <p className="detail-description">{state.description}</p>
                            </div>
                        </div>
                        {
                            state.item &&
                            <div className="detail-right">
                                <div>
                                    <span>{ state.condition === "new" && "Nuevo" || "Usado" }</span> - <span>Vendidos { state.sold_quantity }</span>
                                </div>
                                <div><b>{ state.item.title }</b></div>
                                <div className="detail-price-container">
                                    <span className="detail-price">{ state.item.price.currency }</span>
                                    <span className="detail-price">{ state.item.price.amount }</span>
                                    {
                                        state.item.free_shipping &&
                                        <img src="ic_shipping.png"/>
                                    }
                                </div>
                                <button className="button-detail">Comprar</button>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
};

export default ItemDetail;