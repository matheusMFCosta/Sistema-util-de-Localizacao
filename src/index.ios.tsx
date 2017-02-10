import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Provider } from 'react-redux';
import App from './App'


import { rootSaga } from './sagas/index';
import createSagaMiddleware from 'redux-saga';

import createStore from './createStore'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(sagaMiddleware)


sagaMiddleware.run(rootSaga);


interface Props {

}

interface State {

}

export default class Ios extends Component<Props, State> {
    render() {
        return (
        <Provider store={store}>
            <App />
        </Provider>
        );
    }
}

