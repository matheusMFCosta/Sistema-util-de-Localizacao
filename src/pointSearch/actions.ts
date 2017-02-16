import { Action, createAction }from 'redux-actions';
import { pathPoint, pathPoints, destinationPoint } from './../maps/maps'

export const SET_CAMERA_BE_OPEN_STATUS = "SET_CAMERA_BE_OPEN_STATUS";
export const CHANGE_ACCONT_NAME_INPUT = "CHANGE_ACCONT_NAME_INPUT";
export const CHANGE_ACCOUNT_CODE_INPUNT = "CHANGE_ACCOUNT_CODE_INPUNT";
export const CHANGE_ACCOUNT_OWNER_INPUT = "CHANGE_ACCOUNT_OWNER_INPUT"
export const POINT_SEARCH_QR_CODE = "POINT_SEARCH_QR_CODE"
export const SET_MAP_PATH_POINT = "SET_MAP_PATH_POINT"

export const GET_DESTINATION_POINT_DETAILS = "GET_DESTINATION_POINT_DETAILS"
export const SET_DESTINATION_POINT = "SET_DESTINATION_POINT"
export const GET_ORIGIN_POINT_DETAILS = "GET_ORIGIN_POINT_DETAILS"
export const SET_ORIGIN_POINT = "SET_ORIGIN_POINT"
//export const teste: () => Action = createAction<null>(TESTE)

export const setCameraBeOpenStatus: (status:boolean) => 
    Action<boolean> = createAction<boolean>(SET_CAMERA_BE_OPEN_STATUS);

export const changeAccountName: (accountName:string) => 
    Action<string> = createAction<string>(CHANGE_ACCONT_NAME_INPUT);

export const changeAccountCodeInput: (accessCode:string) => 
    Action<string> = createAction<string>(CHANGE_ACCOUNT_CODE_INPUNT);

export const changeAccountOwnerInput: (issuer:string) => 
    Action<string> = createAction<string>(CHANGE_ACCOUNT_OWNER_INPUT);


export const pointSearchQrCode: (qstr: string) => Action<string> = createAction<string>(POINT_SEARCH_QR_CODE);

export const setMapPathPoints: (route:pathPoints) => Action<pathPoints> = createAction<pathPoints>(SET_MAP_PATH_POINT);

export const getOriginPointDetails: (id:string) => Action<string> = createAction<string>(GET_ORIGIN_POINT_DETAILS);

export const setOriginPoint: (destinationPoint:pathPoint) => Action<pathPoint> = createAction<pathPoint>(SET_ORIGIN_POINT);

export const getDestinationPointDetails: (id:string) => Action<string> = createAction<string>(GET_DESTINATION_POINT_DETAILS);

export const setDestinationPoint: (destinationPoint:pathPoint) => Action<pathPoint> = createAction<pathPoint>(SET_DESTINATION_POINT);
    
// export const setCameraBeOpenStatus: (status:boolean) => Action = createAction<boolean>(
//     SET_CAMERA_BE_OPEN_STATUS, (wow) => { console.log(wow); return(wow) }
// );


