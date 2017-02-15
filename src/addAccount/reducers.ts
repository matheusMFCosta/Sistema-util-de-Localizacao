import { handleActions, Action } from 'redux-actions';
import { AddAccount } from './addAccount'

import {
  SET_CAMERA_BE_OPEN_STATUS,
  CHANGE_ACCONT_NAME_INPUT,
  CHANGE_ACCOUNT_CODE_INPUNT,
  CHANGE_ACCOUNT_OWNER_INPUT
} from './actions'

const cameraInitialState: AddAccount ={
    accountName: "",
    accountOwner: "",
    accountSecret: "",
    shouldCameraBeOpen: false
} 


function assign<T> (state : T, patch : Partial<T>) : T {
  return Object.assign({}, state, patch);
}
    
    
export const addAccountReducer  = handleActions<AddAccount>({
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

}, cameraInitialState)