import { handleActions, Action } from 'redux-actions';
import { AddAccount } from './pointSearch'
import { pathPoints, destinationPoint, mapsData, pointsOfInterest } from './../maps/maps'

import {
  SET_CAMERA_BE_OPEN_STATUS,
  CHANGE_POINT_FIND_FILTER,
  SET_MAPS_DATA_FROM_SERVER,
  SET_DESTINATION_POINT,
  SET_ORIGIN_POINT
} from './actions'

const destinationPointInitialState:destinationPoint = {
    id: "",
    adjacentes: {},
    description: "",
    mapReference:"",
    x: 0,
    y: 0
}

const mapsinitialState: mapsData = {
    "id": "",
    "path": ""
}

const pointsOfInterestInitialState: pointsOfInterest = {
    id: "",
    adjacentes: {},
    description: "",
    mapReference:"",
    x: 0,
    y: 0
}

const pointSearchInitialState: AddAccount = {
    pointFindFilter: "",
    shouldCameraBeOpen: false,
    pathPoints: [],
    mapsData: mapsinitialState,
    mapsImage: [],
    pointsOfInterest: pointsOfInterestInitialState,
    destinationPoint: destinationPointInitialState,
    originPoint: destinationPointInitialState,
    pathOriginToDestinationCurrentMap: []
} 

interface setDestinationPont {
    pathPoints: pathPoints,
    destinationPoint: destinationPoint
}

function assign<T> (state : T, patch : Partial<T>) : T {
  return Object.assign({}, state, patch);
}
    
 
export const pointSearchReducer  = handleActions<AddAccount>({
    [SET_CAMERA_BE_OPEN_STATUS]: (state : AddAccount , action : Action<boolean> ): AddAccount => {
        return assign(state, { shouldCameraBeOpen: action.payload } );
    },
    [SET_MAPS_DATA_FROM_SERVER]: (state : AddAccount , action : Action<any>): AddAccount => {
        return assign(state, { pathPoints: [...state.pathPoints, ...action.payload.pathPoints],mapsData: action.payload.maps, pointsOfInterest: action.payload.pointsOfInterest } );
    },
    [SET_DESTINATION_POINT]: (state : AddAccount , action : Action<destinationPoint>): AddAccount => {
        return assign(state, { pathPoints: addNewNodePathPointMap(state.pathPoints,action.payload),destinationPoint: action.payload } );
    },
    [SET_ORIGIN_POINT]: (state : AddAccount , action : Action<destinationPoint>): AddAccount => {
        return assign(state, { pathPoints: addNewNodePathPointMap(state.pathPoints,action.payload),originPoint: action.payload } );
    },
}, pointSearchInitialState)


const addNewNodePathPointMap = (pathMap:pathPoints,newNode:destinationPoint) => {
    for(let keyNode in newNode.adjacentes){
        for(let keyMap in pathMap){
            let adjacentetarget = pathMap[keyMap]
            if(keyNode == adjacentetarget.id){
                adjacentetarget.adjacentes[newNode.id] = newNode.adjacentes[keyNode]
            }
        }
    }
    let final = [...pathMap, ...[newNode]]
    return final
}

