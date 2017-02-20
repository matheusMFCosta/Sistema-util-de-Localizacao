import { Action, createAction }from 'redux-actions';
import { pathPoint, pathPoints, destinationPoint } from './../maps/maps'

export const SET_CAMERA_BE_OPEN_STATUS = "SET_CAMERA_BE_OPEN_STATUS";
export const POINT_SEARCH_QR_CODE = "POINT_SEARCH_QR_CODE"
export const SET_MAPS_DATA_FROM_SERVER = "SET_MAPS_DATA_FROM_SERVER"
export const GET_DESTINATION_POINT_DETAILS = "GET_DESTINATION_POINT_DETAILS"
export const SET_DESTINATION_POINT = "SET_DESTINATION_POINT"
export const GET_ORIGIN_POINT_DETAILS = "GET_ORIGIN_POINT_DETAILS"
export const SET_ORIGIN_POINT = "SET_ORIGIN_POINT"
export const CHANGE_POINT_FIND_FILTER = "CHANGE_POINT_FIND_FILTER"
//export const teste: () => Action = createAction<null>(TESTE)

export const setCameraBeOpenStatus: (status:boolean) => 
    Action<boolean> = createAction<boolean>(SET_CAMERA_BE_OPEN_STATUS);


export const changePointFindFilter: (issuer:string) => 
    Action<string> = createAction<string>(CHANGE_POINT_FIND_FILTER);


export const pointSearchQrCode: (qstr: string) => Action<string> = createAction<string>(POINT_SEARCH_QR_CODE);

export const setMapsDataFromServer: (route:pathPoints) => Action<pathPoints> = createAction<pathPoints>(SET_MAPS_DATA_FROM_SERVER);

export const getOriginPointDetails: (id:string) => Action<string> = createAction<string>(GET_ORIGIN_POINT_DETAILS);

export const setOriginPoint: (destinationPoint:pathPoint) => Action<pathPoint> = createAction<pathPoint>(SET_ORIGIN_POINT);

export const getDestinationPointDetails: (id:string) => Action<string> = createAction<string>(GET_DESTINATION_POINT_DETAILS);

export const setDestinationPoint: (destinationPoint:pathPoint) => Action<pathPoint> = createAction<pathPoint>(SET_DESTINATION_POINT);
    
// export const setCameraBeOpenStatus: (status:boolean) => Action = createAction<boolean>(
//     SET_CAMERA_BE_OPEN_STATUS, (wow) => { console.log(wow); return(wow) }
// );


