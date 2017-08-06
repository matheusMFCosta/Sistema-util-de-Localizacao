import { combineReducers } from "redux";
import { todoApp } from "./../listMethods/reducers";

export default combineReducers({ todoApp: todoApp });
