import { handleActions, Action } from 'redux-actions';
import { AddAccount } from './pointSearch'
import { pathPoints, destinationPoint } from './../maps/maps'

import {
  SET_CAMERA_BE_OPEN_STATUS,
  CHANGE_ACCONT_NAME_INPUT,
  CHANGE_ACCOUNT_CODE_INPUNT,
  CHANGE_ACCOUNT_OWNER_INPUT,
  SET_MAP_PATH_POINT,
  SET_DESTINATION_POINT,
  SET_ORIGIN_POINT
} from './actions'

const destinationPointInitialState:destinationPoint ={
    id: "",
    adjacentes: {},
    description: "",
    x: 0,
    y: 0
}

const pointSearchInitialState: AddAccount ={
    accountName: "",
    accountOwner: "",
    accountSecret: "",
    shouldCameraBeOpen: false,
    pathPoints: [],
    destinationPoint: destinationPointInitialState,
    originPoint: destinationPointInitialState
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
        return assign(state, { pathPoints: [...state.pathPoints, ...action.payload] } );
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

