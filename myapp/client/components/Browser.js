import React from 'react';
import {NavLink} from "react-router-dom";

const Browser = () => {

    const [state, setState] = React.useState("");

    return(
        <div className="browser">
            <div className="browser-input-container">
                <img className="logo" src="Logo_ML.png"/>
                <input className="browser-input" placeholder={ "Nunca dejes de buscar" } value={ state } onChange={ (e)=> setState(e.target.value) }/>
                <NavLink to={{pathname: `/items?search=${state}`}} style={{ textDecoration: 'none' }}>
                    <img className="browser-image" src="ic_Search.png"/>
                </NavLink>
            </div>
        </div>
    )
};

export default Browser;