import { combineReducers } from 'redux';
import { listMethodsReducer } from './../listMethods/reducers'
import { addAccountReducer } from './../addAccount/reducers'
import { mainReducer } from './../main/reducers'

export default  combineReducers({
  listMethods: listMethodsReducer,
  camera: addAccountReducer,
  main: mainReducer
});