import { handleActions, Action } from 'redux-actions';
import { Camera } from './camera'

import {
  SET_CAMERA_BE_OPEN_STATUS,
  CHANGE_QR_CODE
} from './actions'

const cameraInitialState: Camera ={
    qrCode: "",
    shouldCameraBeOpen: false
} 


function assign<T> (state : T, patch : Partial<T>) : T {
  return Object.assign({}, state, patch);
}
    
    
export const cameraReducer  = handleActions<Camera>({
    [SET_CAMERA_BE_OPEN_STATUS]: (state : Camera , action : Action): Camera => {
        return assign(state, { shouldCameraBeOpen: action.payload } );
    },
    [CHANGE_QR_CODE]: (state : Camera , action : Action): Camera => {
        return assign(state, { qrCode: action.payload } );
    },

}, cameraInitialState)