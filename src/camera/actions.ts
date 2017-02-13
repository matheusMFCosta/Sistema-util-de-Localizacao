import { Action, createAction }from 'redux-actions';
import { Camera } from './camera';

export const SET_CAMERA_BE_OPEN_STATUS = "SET_CAMERA_BE_OPEN_STATUS";
export const CHANGE_QR_CODE = "CHANGE_QR_CODE";


//export const teste: () => Action = createAction<null>(TESTE)

export const setCameraBeOpenStatus: (status:boolean) => 
    Action<boolean> = createAction<boolean>(SET_CAMERA_BE_OPEN_STATUS)

export const changeQrCode: (qrCode:string) => 
    Action<string> = createAction<string>(CHANGE_QR_CODE)

// export const setCameraBeOpenStatus: (status:boolean) => Action = createAction<boolean>(
//     SET_CAMERA_BE_OPEN_STATUS, (wow) => { console.log(wow); return(wow) }
// );


