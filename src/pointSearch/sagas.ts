import { takeEvery, takeLatest } from 'redux-saga'
import closestPoint from './../utils/closestPolyLinePoint'
import { actionChannel, call, take, put, race } from 'redux-saga/effects'
import { pathPoints, destinationPoint } from './../maps/maps'
// import fetch from 'isomorphic-fetch';

import * as actions from './actions'
 const Graph = require('node-dijkstra')



function getMapInformation() {
  return fetch('https://miex-food.herokuapp.com/ccet/json')
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

function* getMapPathPoints(action): IterableIterator<any> {
        
      const { response , error}  = yield call(getMapInformation);
      console.log(action.payload)
      
      yield put(actions.setMapsDataFromServer(response));

      var keys:any = [];
      for(let k in action.payload.adjacentes) keys.push(k);
      if(keys.length <= 1){ 
          yield put(actions.setOriginPointSuccess(action.payload))
      } else {
        const firtPoint = getPointCordenates(keys[0],response.pathPoints)
        const secondPoint = getPointCordenates(keys[1],response.pathPoints)
        const currentPoint = {x:action.payload.x , y:action.payload.y}

        const closestPointsData = closestPoint(
            currentPoint.x,currentPoint.y,
            firtPoint.x,firtPoint.y,
            secondPoint.x,secondPoint.y
          )
        let adjacentes = action.payload.adjacentes
        adjacentes[action.payload.id]=1;

        const closestPointDefiner ={  
          id: action.payload.id+"-Temp",
          adjacentes: adjacentes,
          description: "parcial",
          mapReference:action.payload.mapReference,
          x: closestPointsData.x,
          y: closestPointsData.y
      }

      let json = {}
      json[action.payload.id+'-Temp'] = 1
      action.payload.adjacentes = json

      yield put(actions.setOriginPointSuccess(closestPointDefiner))
      yield put(actions.setOriginPointSuccess(action.payload))
      }
}   



function* getOriginPointDetails(action): IterableIterator<any> {

    
    
    const destinationPoint: destinationPoint ={  
        id: "dest",
        adjacentes: {K:1},
        description: "nada origin",
        mapReference:"graph3",
        x: 50,
        y: 220
    }

    delete destinationPoint.description;
    yield put(actions.setDestinationPointSuccess(destinationPoint))
}


function* getDestinationPointDetails(action): IterableIterator<any> {


  let destinationPoint = action.payload.destinationPoint;
  const pathPoints = action.payload.pathPoints
  var keys:any = [];
      for(let k in destinationPoint.adjacentes) keys.push(k);
      console.log("KEYS",keys.length)
  if(keys.length <= 1){
    yield put(actions.setDestinationPointSuccess(destinationPoint))
    
  } else {
      console.log(action.payload)
      const firtPoint = getPointCordenates(keys[0],pathPoints)
      const secondPoint = getPointCordenates(keys[1],pathPoints)
      const currentPoint = {x:destinationPoint.x , y:destinationPoint.y}
      console.log(firtPoint,secondPoint,currentPoint)
      const closestPointsData = closestPoint(
          currentPoint.x,currentPoint.y,
          firtPoint.x,firtPoint.y,
          secondPoint.x,secondPoint.y
        )
      
      let adjacentes = destinationPoint.adjacentes
      console.log(adjacentes)
      adjacentes[destinationPoint.id]=1;
      console.log(adjacentes,"adjacentes")
      const closestPointDefiner ={  
        id: destinationPoint.id+"-Temp",
        adjacentes: adjacentes,
        description: "parcial",
        mapReference:destinationPoint.mapReference,
        x: closestPointsData.x,
        y: closestPointsData.y
    }
    console.log(closestPointDefiner,"closestPointDefiner")
    let json = {}
    json[destinationPoint.id+'-Temp'] = 1
    destinationPoint.adjacentes = json


    
    yield put(actions.setDestinationPointSuccess(closestPointDefiner))
    yield put(actions.setDestinationPointSuccess(destinationPoint))
  }
}

export function* watchPointSearchQrCode(action): IterableIterator<any> {
  yield* takeLatest( actions.POINT_SEARCH_QR_CODE, getMapPathPoints);
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
