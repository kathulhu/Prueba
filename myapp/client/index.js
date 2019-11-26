import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";

import './styles.scss';

import Browser from './components/Browser';
import Items from './components/Items';
import ItemDetail from './components/ItemDetail';

const App = () => {

    return(
        <Router>
            <Route
                path={["/"]}
                render={() =>
                    <Browser/>
                }/>
                <div className="container">
                    <Route
                        path={["/items","/items?search=:q"]}
                        exact
                        render={(props) =>
                            <Items
                                {...props}
                            />
                        }/>
                    <Route
                        path={["/items/:id"]}
                        exact
                        render={(props) =>
                            <ItemDetail
                                {...props}
                            />
                        }
                    />
                </div>
        </Router>
    )

};
ReactDOM.render(<App/>, document.getElementById('root'));