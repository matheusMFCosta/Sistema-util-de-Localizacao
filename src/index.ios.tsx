import React, { Component } from "react";
import { Provider } from 'react-redux';
import { rootSaga } from './sagas/index';
import createSagaMiddleware from 'redux-saga';
import createStore from './createStore'
import Router from './routes'

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
            <Router/>
        </Provider>
        );
    }
}

