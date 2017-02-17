import { combineReducers } from 'redux';
import { appReducer } from './../app/reducers'
import { pointSearchReducer } from './../pointSearch/reducers'
import { mainReducer } from './../main/reducers'
import { mapsReducer } from './../maps/reducers'

export default  combineReducers({
  app: appReducer,
  pointSearch: pointSearchReducer,
  main: mainReducer,
  maps: mapsReducer
});