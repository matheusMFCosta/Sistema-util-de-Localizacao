import { takeEvery, takeLatest } from 'redux-saga'
import { actionChannel, call, take, put, race } from 'redux-saga/effects'
import { pathPoints, destinationPoint } from './../maps/maps'
import * as actions from './actions'
 const Graph = require('node-dijkstra')

function* getMapPathPoints(action): IterableIterator<any> {
        
       const itemsList : pathPoints = [{
          id:"A",
          adjacentes:{ B:2, H:3 },
          x: 50,
          y: 110
        },
        {
          id:"B",
          adjacentes:{ A:2, I:3, C:3 },
          x: 250,
          y: 110
        },
        {
          id:"C",
          adjacentes:{ B:3, J:3 },
          x: 525,
          y: 110
        },
        {
          id:"D",
          adjacentes:{ J:2, E:3, G:2 },
          x: 525,
          y: 540
        },
        {
          id:"E",
          adjacentes:{ F:2, I:2 , D:3 },
          x: 250 ,
          y: 549
        },
        {
          id:"F",
          adjacentes:{ H:2, E:2},
          x: 50,
          y: 540
        },
        {
          id:"G",
          adjacentes:{ D:2 },
          x: 731,
          y: 540
        },
        {
          id:"H",
          adjacentes:{ A:3, I:2, F:2 },
          x: 50,
          y: 325
        },
        {
          id:"I",
          adjacentes:{ H:2, B:3, J:3, E:2 },
          x: 250,
          y: 325
        },
        {
          id:"J",
          adjacentes:{ C:3, I:3, D:2 },
          x: 525,
          y: 325
        }
        ]

        yield put(actions.setMapPathPoints(itemsList));
}   

function* getDestinationPointDetails(action): IterableIterator<any> {
    
    const destinationPoint: destinationPoint ={  
        id: "dest",
        adjacentes: {A:1, H:1},
        description: "nada origin",
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


