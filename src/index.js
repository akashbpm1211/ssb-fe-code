import React from 'react';
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { history } from './store/store'
import { ConnectedRouter } from 'connected-react-router'

import App from './components/App';
import Transaction from './components/Transaction'
import store from './store/store'
import './styles/styles.css';


// Provider takes store imported
// Router takes history
const Root = () => {
    return (
        <Provider store={store}>
            <MuiThemeProvider>
                <ConnectedRouter history={history}>
                    <div>
                        <Route exact path="/" component={App} />
                        <Route exact path="/account" component={Transaction} />
                    </div>
                </ConnectedRouter>
            </MuiThemeProvider>
        </Provider>
    );
};

ReactDOM.render(<Root />, document.getElementById("app"));
