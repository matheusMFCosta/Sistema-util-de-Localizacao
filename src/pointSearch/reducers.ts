import { handleActions, Action } from 'redux-actions';
import { AddAccount } from './pointSearch'
import { pathPoints } from './../maps/maps'

import {
  SET_CAMERA_BE_OPEN_STATUS,
  CHANGE_ACCONT_NAME_INPUT,
  CHANGE_ACCOUNT_CODE_INPUNT,
  CHANGE_ACCOUNT_OWNER_INPUT,
  SET_MAP_PATH_POINT
} from './actions'

const cameraInitialState: AddAccount ={
    accountName: "",
    accountOwner: "",
    accountSecret: "",
    shouldCameraBeOpen: false,
    pathPoints: []
} 


function assign<T> (state : T, patch : Partial<T>) : T {
  return Object.assign({}, state, patch);
}
    
    
export const pointSearchReducer  = handleActions<AddAccount>({
    [SET_CAMERA_BE_OPEN_STATUS]: (state : AddAccount , action : Action<boolean> ): AddAccount => {
        return assign(state, { shouldCameraBeOpen: action.payload } );
    },
    [CHANGE_ACCOUNT_CODE_INPUNT]: (state : AddAccount , action : Action<string>): AddAccount => {
        return assign(state, { accountSecret: action.payload } );
    },
    [CHANGE_ACCONT_NAME_INPUT]: (state : AddAccount , action : Action<string>): AddAccount => {
        return assign(state, { accountName: action.payload } );
    },
    [CHANGE_ACCOUNT_OWNER_INPUT]: (state : AddAccount , action : Action<string>): AddAccount => {
        return assign(state, { accountOwner: action.payload } );
    },
    [SET_MAP_PATH_POINT]: (state : AddAccount , action : Action<pathPoints>): AddAccount => {
        return assign(state, { pathPoints: action.payload } );
    },

}, cameraInitialState)