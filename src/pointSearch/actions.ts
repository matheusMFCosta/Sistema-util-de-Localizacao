import { Action, createAction }from 'redux-actions';
import { pathPoint, pathPoints, destinationPoint } from './../maps/maps'

export const SET_CAMERA_BE_OPEN_STATUS = "SET_CAMERA_BE_OPEN_STATUS";
export const POINT_SEARCH_QR_CODE = "POINT_SEARCH_QR_CODE"
export const SET_MAPS_DATA_FROM_SERVER = "SET_MAPS_DATA_FROM_SERVER"
export const SET_DESTINATION_POINT = "SET_DESTINATION_POINT"
export const SET_DESTINATION_POINT_SUCCESS = "SET_DESTINATION_POINT_SUCCESS"
export const SET_ORIGIN_POINT = "SET_ORIGIN_POINT"
export const SET_ORIGIN_POINT_SUCCESS = "SET_ORIGIN_POINT_SUCCESS"
export const CHANGE_POINT_FIND_FILTER = "CHANGE_POINT_FIND_FILTER"
export const SET_MAP_CONFIGURATION_FROM_SERVER = "SET_MAP_CONFIGURATION_FROM_SERVER"
export const GET_ALL_MAPS_DATA_SUCCEESS = "GET_ALL_MAPS_DATA_SUCCEESS"
//export const teste: () => Action = createAction<null>(TESTE)

export const setCameraBeOpenStatus: (status:boolean) => 
    Action<boolean> = createAction<boolean>(SET_CAMERA_BE_OPEN_STATUS);


export const changePointFindFilter: (issuer:string) => 
    Action<string> = createAction<string>(CHANGE_POINT_FIND_FILTER);

export const getAllmapsDataSuccess: (data:any,name:string) => Action<{pathPoints:any,name:string}> = createAction<{data:any,name:string}>(GET_ALL_MAPS_DATA_SUCCEESS,
(data:any,name:string) => {
    return{
            data:data.pathPoints,
            name:name
        }
    }
);

export const pointSearchQrCode: (qstr: string) => Action<string> = createAction<string>(POINT_SEARCH_QR_CODE);

export const setMapsDataFromServer: (route:pathPoints) => Action<pathPoints> = createAction<pathPoints>(SET_MAPS_DATA_FROM_SERVER);

export const setMapConfigurantionFromserver: (route:any) => Action<any> = createAction<any>(SET_MAP_CONFIGURATION_FROM_SERVER);

export const setOriginPoint: (destinationPoint:pathPoint) => Action<pathPoint> = createAction<pathPoint>(SET_ORIGIN_POINT);

export const setOriginPointSuccess: (destinationPoint:pathPoint) => Action<pathPoint> = createAction<pathPoint>(SET_ORIGIN_POINT_SUCCESS);

export const setDestinationPointSuccess: (destinationPoint:pathPoint) => Action<pathPoint> = createAction<pathPoint>(SET_DESTINATION_POINT_SUCCESS);
    
export const setDestinationPoint: (destinationPoint:pathPoint,pathPoints) => Action<pathPoint> = createAction<any>(SET_DESTINATION_POINT,
    (destinationPoint:pathPoint,pathPoints) => {
        return{
            destinationPoint: destinationPoint,
            pathPoints: pathPoints
        }
    });
    
// export const setCameraBeOpenStatus: (status:boolean) => Action = createAction<boolean>(
//     SET_CAMERA_BE_OPEN_STATUS, (wow) => { console.log(wow); return(wow) }
// );


