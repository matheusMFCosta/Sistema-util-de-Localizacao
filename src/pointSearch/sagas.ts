import { takeEvery, takeLatest } from 'redux-saga'
import closestPoint from './../utils/closestPolyLinePoint'
import { actionChannel, call, take, put, race } from 'redux-saga/effects'
import { pathPoints, destinationPoint } from './../maps/maps'
// import fetch from 'isomorphic-fetch';

import * as actions from './actions'
 const Graph = require('node-dijkstra')



// function getMapInformation() {
//   return fetch('https://miex-food.herokuapp.com/ccet/json')
//       .then(response => {
//        if(response.ok){
//          return response.json()
//        } else {
//          return Promise.reject(response);
//        }
//     })
//     .then(
//       response => ({response}),
//       error => ({error: {message:'Something bad happened'}})
//     )
// } 

const  getPointCordenates = (id,pathPoints) => {
        const items = pathPoints
        for(let key in items){
          if(items[key].id ==id){
            return{
              x: items[key].x,
              y: items[key].y,
            }
          } 
        }
        return{
              x: 0,
              y: 0,
            }
      }

// function* getMapPathPoints(action): IterableIterator<any> {
        
//       const { response , error}  = yield call(getMapInformation);
      
//       yield put(actions.setMapsDataFromServer(response));

//       var keys:any = [];
//       for(let k in action.payload.adjacentes) keys.push(k);
//       if(keys.length <= 1){ 
//           yield put(actions.setOriginPointSuccess(action.payload))
//       } else {
//         const firtPoint = getPointCordenates(keys[0],response.pathPoints)
//         const secondPoint = getPointCordenates(keys[1],response.pathPoints)
//         const currentPoint = {x:action.payload.x , y:action.payload.y}

//         const closestPointsData = closestPoint(
//             currentPoint.x,currentPoint.y,
//             firtPoint.x,firtPoint.y,
//             secondPoint.x,secondPoint.y
//           )
//         let adjacentes = action.payload.adjacentes
//         adjacentes[action.payload.id]=1;

//         const closestPointDefiner ={  
//           id: action.payload.id+"-Temp",
//           adjacentes: adjacentes,
//           description: "parcial",
//           mapReference:action.payload.mapReference,
//           x: closestPointsData.x,
//           y: closestPointsData.y
//       }

//       let json = {}
//       json[action.payload.id+'-Temp'] = 1
//       action.payload.adjacentes = json

//       yield put(actions.setOriginPointSuccess(closestPointDefiner))
//       yield put(actions.setOriginPointSuccess(action.payload))
//       }
// }   






function* getMapConfiguration(action): IterableIterator<any> {
        
      // const { response , error}  = yield call(getMapConfigurationData);
      // yield put(actions.setMapConfigurantionFromserver(response));
      console.log("GlobalReference",action.payload.globalReference)
      yield getAllmapsData(action.payload.globalReference)
      yield put(actions.setOriginPointSuccess(action.payload))
}  

function* getOriginPointDetails(action): IterableIterator<any> {
    const destinationPoint: destinationPoint ={  
        id: "dest",
        adjacentes: {K:1},
        description: "nada origin",
        mapReference:"ccet1",
        x: 50,
        y: 220
    }

    delete destinationPoint.description;
    yield put(actions.setDestinationPointSuccess(destinationPoint))

}


function* getDestinationPointDetails(action): IterableIterator<any> {


  let destinationPoint = action.payload.destinationPoint;



  // const pathPoints = action.payload.pathPoints
  // var keys:any = [];
  //     for(let k in destinationPoint.adjacentes) keys.push(k);
  // if(keys.length <= 1){
  //   yield put(actions.setDestinationPointSuccess(destinationPoint))
    
  // } else {
  //     const firtPoint = getPointCordenates(keys[0],pathPoints)
  //     const secondPoint = getPointCordenates(keys[1],pathPoints)
  //     const currentPoint = {x:destinationPoint.x , y:destinationPoint.y}
  //     const closestPointsData = closestPoint(
  //         currentPoint.x,currentPoint.y,
  //         firtPoint.x,firtPoint.y,
  //         secondPoint.x,secondPoint.y
  //       )
      
  //     let adjacentes = destinationPoint.adjacentes
  //     adjacentes[destinationPoint.id]=1;
  //     const closestPointDefiner ={  
  //       id: destinationPoint.id+"-Temp",
  //       adjacentes: adjacentes,
  //       description: "parcial",
  //       mapReference:destinationPoint.mapReference,
  //       x: closestPointsData.x,
  //       y: closestPointsData.y
  //   }
  //   let json = {}
  //   json[destinationPoint.id+'-Temp'] = 1
  //   destinationPoint.adjacentes = json


    
  //   yield put(actions.setDestinationPointSuccess(closestPointDefiner))
    yield put(actions.setDestinationPointSuccess(destinationPoint))
  
}


function getMapConfigurationData(globalReference) {
  return fetch('https://miex-food.herokuapp.com/'+globalReference+'/configuration')
      .then(response => {
       if(response.ok){
         return response.json()
       } else {
         return Promise.reject(response);
       }
    })
    .then(
      response => ({response}),
      error => ({error: {message:'Something bad happened'}})
    )
} 


function getMapsData(globalReference,mapsName){
  console.log('https://miex-food.herokuapp.com/'+globalReference+'/'+mapsName)
    return fetch('https://miex-food.herokuapp.com/'+globalReference+'/'+mapsName)
      .then(response => {
       if(response.ok){
         console.log("2")
         return response.json()
       } else {
         return Promise.reject(response);
       }
    })
    .then(
      response => ({response}),
      error => ({error: {message:'Something bad happened'}})
    )

}

function* getAllmapsData(globalReference): IterableIterator<any> {
  console.log(globalReference)
  const { response , error}  = yield call(getMapConfigurationData,globalReference);
  console.log("Res",response,"Error",error)
  yield put(actions.setMapConfigurantionFromserver(response));

  const maps = response.maps
  for(let key in maps){
    console.log("Keey",maps[key].id)
    const { response , error}  = yield call(getMapsData,globalReference,maps[key].id);
    
    yield put(actions.getAllmapsDataSuccess(response,maps[key].id,maps[key].path,maps[key].height,maps[key].width))
  }

}



export function* watchPointSearchQrCode(action): IterableIterator<any> {
  yield* takeLatest( actions.POINT_SEARCH_QR_CODE, getMapConfiguration);
}

export function* watchSetDestinationPoint(action): IterableIterator<any> {
  yield* takeLatest( actions.SET_DESTINATION_POINT, getDestinationPointDetails);
}

export function* watchSetOriginPoint(action): IterableIterator<any> {
  yield* takeLatest( actions.SET_ORIGIN_POINT, getOriginPointDetails);
}

export function* watchSetMapsDataFromServer(action): IterableIterator<any> {
  yield* takeLatest( actions.SET_MAPS_DATA_FROM_SERVER, watchSetMapsDataFromServer);
}
