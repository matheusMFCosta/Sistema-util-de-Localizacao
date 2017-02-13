import { combineReducers } from 'redux';
import { listMethods } from './../listMethods/reducers'
import { cameraReducer } from './../camera/reducers'

export default  combineReducers({
  listMethods: listMethods,
  camera: cameraReducer
});