import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducer.js';

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    //window.devToolsExtension && window.devToolsExtension()
))

export default store;