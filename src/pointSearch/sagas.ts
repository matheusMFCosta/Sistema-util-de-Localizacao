import { takeEvery, takeLatest } from 'redux-saga'

import { actionChannel, call, take, put, race } from 'redux-saga/effects'
import { pathPoints, destinationPoint } from './../maps/maps'
import fetch from 'isomorphic-fetch';
import * as actions from './actions'
 const Graph = require('node-dijkstra')



function getMapInformation() {
  return fetch(`https://miex-food.herokuapp.com/teste/json`, {
      method: 'GET',
    })
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


function* getMapPathPoints(action): IterableIterator<any> {
        
      const { response , error}  = yield call(getMapInformation);

      yield put(actions.setMapsDataFromServer(response));
}   


function getMapImage() {
  return fetch(`https://miex-food.herokuapp.com/teste/images/graph2`, {
      method: 'GET',
    })
      .then(response => {
       if(response.ok){
         return response.blob()
       } else {
         return Promise.reject(response);
       }
    })
    .then(
      response => ({response}),
      error => ({error: {message:'Something bad happened'}})
    )
} 



function* setMapsImageFromServer(action): IterableIterator<any> {
        
      const { response , error}  = yield call(getMapImage);
      console.log(response , error)
      //yield put(actions.setMapsDataFromServer(response));
}   


function* getDestinationPointDetails(action): IterableIterator<any> {
    
    const destinationPoint: destinationPoint ={  
        id: "dest",
        adjacentes: {A:1, H:1},
        description: "nada origin",
        mapReference:"graph2",
        x: 50,
        y: 220
    }
    delete destinationPoint.description;
    yield put(actions.setDestinationPoint(destinationPoint))
}



function* getOriginPointDetails(action): IterableIterator<any> {
    
    const destinationPoint: destinationPoint ={  
        id: "orig",
        adjacentes: {E:1, I:1},
        description: "nada ainda",
        mapReference:"graph2",
        x: 250,
        y: 430
    }
    delete destinationPoint.description;
    yield put(actions.setOriginPoint(destinationPoint))
}

export function* watchPointSearchQrCode(action): IterableIterator<any> {
  yield* takeLatest( actions.POINT_SEARCH_QR_CODE, getMapPathPoints);
}

export function* watchGetDestinationPointDetails(action): IterableIterator<any> {
  yield* takeLatest( actions.GET_DESTINATION_POINT_DETAILS, getDestinationPointDetails);
}

export function* watchGetOriginPointDetails(action): IterableIterator<any> {
  yield* takeLatest( actions.GET_ORIGIN_POINT_DETAILS, getOriginPointDetails);
}

export function* watchSetMapsDataFromServer(action): IterableIterator<any> {
  yield* takeLatest( actions.SET_MAPS_DATA_FROM_SERVER, setMapsImageFromServer);
}
