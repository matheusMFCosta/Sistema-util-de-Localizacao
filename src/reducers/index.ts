import { combineReducers } from 'redux';
import { listMethods } from './../listMethods/reducers'

export default  combineReducers({
  listMethods: listMethods,
});