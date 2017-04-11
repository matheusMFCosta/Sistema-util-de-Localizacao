import { handleActions, Action } from 'redux-actions';
import { AddAccount } from './pointSearch'
import { pathPoints, destinationPoint, mapsData, pointsOfInterest } from './../maps/maps'

import {
  SET_CAMERA_BE_OPEN_STATUS,
  CHANGE_POINT_FIND_FILTER,
  SET_MAPS_DATA_FROM_SERVER,
  SET_DESTINATION_POINT_SUCCESS,
  SET_ORIGIN_POINT_SUCCESS,
  SET_MAP_CONFIGURATION_FROM_SERVER,
  GET_ALL_MAPS_DATA_SUCCEESS
} from './actions'

const destinationPointInitialState:destinationPoint = {
    id: "",
    adjacentes: {},
    description: "",
    mapReference:"",
    buildingReference: "",
    x: 0,
    y: 0
}

const mapsinitialState: mapsData = {
    "id": "",
    "path": "",
    height: 0,
    width: 0
}

const pointsOfInterestInitialState: pointsOfInterest = {
    id: "",
    adjacentes: {},
    description: "",
    mapReference:"",
    buildingReference: "",
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
    pathOriginToDestinationCurrentMap: [],
    buildPointsPath:{},
    mapsAllData:[],
    mapsMetadata:[]
} 

interface setDestinationPont {
    pathPoints: pathPoints,
    destinationPoint: destinationPoint
}

function assign<T> (state : T, patch : Partial<T>) : T {
  return Object.assign({}, state, patch);
}
    
 
export const pointSearchReducer  = handleActions<AddAccount>({
    [GET_ALL_MAPS_DATA_SUCCEESS]: (state : AddAccount , action : Action<any> ): AddAccount => {
        console.log("DDDDDDD")
        return assign(state, { mapsAllData: state.mapsAllData.concat( {[action.payload.name]: action.payload.data}),
            mapsMetadata: state.mapsMetadata.concat({name:action.payload.name,path:action.payload.path,height:action.payload.height,width:action.payload.width,buildingReference:action.payload.buildingReference})
         } );
    }, 
    [SET_MAP_CONFIGURATION_FROM_SERVER]: (state : AddAccount , action : Action<any> ): AddAccount => {
        return assign(state, { pointsOfInterest: action.payload.pointsOfInterest, buildPointsPath: action.payload.buildPointsPath} );
    },
    [SET_CAMERA_BE_OPEN_STATUS]: (state : AddAccount , action : Action<boolean> ): AddAccount => {
        return assign(state, { shouldCameraBeOpen: action.payload } );
    },
    [SET_MAPS_DATA_FROM_SERVER]: (state : AddAccount , action : Action<any>): AddAccount => {
        return assign(state, { pathPoints: [...state.pathPoints, ...action.payload.pathPoints],mapsData: action.payload.maps, pointsOfInterest: action.payload.pointsOfInterest } );
    },
    [SET_DESTINATION_POINT_SUCCESS]: (state : AddAccount , action : Action<destinationPoint>): AddAccount => {
        return assign(state, { pathPoints: addNewNodePathPointMap(state.mapsAllData,action.payload),destinationPoint: action.payload } );
    },
    [SET_ORIGIN_POINT_SUCCESS]: (state : AddAccount , action : Action<destinationPoint>): AddAccount => {
        return assign(state, { pathPoints: addNewNodePathPointMap(state.mapsAllData,action.payload),originPoint: action.payload } );
    },
    [CHANGE_POINT_FIND_FILTER]: (state : AddAccount , action : Action<string>): AddAccount => {
        return assign(state, { pointFindFilter: action.payload } );
    },
}, pointSearchInitialState)


    const getmapsData = (mapsAllData,mapsName) =>{

      for(let key in mapsAllData){
          for(let mapId in mapsAllData[key]){
            if(mapId.indexOf(mapsName) != -1)
              return mapsAllData[key][mapId]
          }
      }
    }


const addNewNodePathPointMap = (mapsAllData:pathPoints,newNode:destinationPoint) => {
    const pathMap = getmapsData(mapsAllData,newNode.mapReference)
    console.log("pathMap")
    for(let keyNode in newNode.adjacentes){
        for(let keyMap in pathMap){
            let adjacentetarget = pathMap[keyMap]
            if(keyNode == adjacentetarget.id){
                adjacentetarget.adjacentes[newNode.id] = newNode.adjacentes[keyNode]
            }
        }
    }

    let final = [...pathMap, ...[newNode]]
    console.log(final)
    return final
}

