import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store.js';
import * as serviceWorker from './serviceWorker';

const ReactAppWrapper = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Provider store={store}>
                <App />
            </Provider>
        </React.Fragment>
    );
}

ReactDOM.render(<ReactAppWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
