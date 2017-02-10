import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducer  from './reducers'




export default (sagaMiddleware ,data = {}) => {
  const middleware = applyMiddleware(sagaMiddleware);
  const rootReducer = combineReducers({
    //every modules reducer should be define here
    "aaa": reducer
  })
  return createStore(rootReducer, data, middleware)
}


