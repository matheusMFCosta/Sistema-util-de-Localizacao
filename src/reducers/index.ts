import { combineReducers } from 'redux';
import { listMethodsReducer } from './../listMethods/reducers'
import { cameraReducer } from './../camera/reducers'

export default  combineReducers({
  listMethods: listMethodsReducer,
  camera: cameraReducer
});