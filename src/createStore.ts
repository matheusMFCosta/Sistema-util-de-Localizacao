import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import reducer  from './reducers/index'
import devToolsEnhancer from 'remote-redux-devtools';
//var composeWithDevTools = require('remote-redux-devtools');


export default (sagaMiddleware ,data = {}) => {

  //const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
  const middleware = applyMiddleware(sagaMiddleware);
  const composeMiddlware = compose(
    middleware,
    devToolsEnhancer()
    )
  return createStore(reducer, data, composeMiddlware)
}


