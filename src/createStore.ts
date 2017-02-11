import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducer  from './reducers/index'




export default (sagaMiddleware ,data = {}) => {
  const middleware = applyMiddleware(sagaMiddleware);
  // const rootReducer = combineReducers(
  //   //every modules reducer should be define here
  //   reducer
  // )
  return createStore(reducer, data, middleware)
}


