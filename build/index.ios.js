import React, { Component } from "react";
import { Provider } from 'react-redux';
var { Actions } = require('react-native-router-flux');
import { rootSaga } from './sagas/index';
import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(sagaMiddleware);
import Router from './routes';
sagaMiddleware.run(rootSaga);
export default class Ios extends Component {
    render() {
        return (React.createElement(Provider, { store: store },
            React.createElement(Router, null)));
    }
}
//# sourceMappingURL=index.ios.js.map