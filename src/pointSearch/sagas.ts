import { takeEvery, takeLatest } from 'redux-saga'
import { actionChannel, call, take, put, race } from 'redux-saga/effects'
import * as actions from './actions'
 const Graph = require('node-dijkstra')

function* getMapPathPoints(action): IterableIterator<any> {
        
       const itemsList= [{
          id:"A",
          adjacentes:{ B:2, F:2 },
          x: 40,
          y: 35
        },
        {
          id:"B",
          adjacentes:{ A:2, F:4, C:5 },
          x: 95,
          y: 80
        },
        {
          id:"C",
          adjacentes:{ B:2, G:1 },
          x: 450,
          y: 22
        },
        {
          id:"D",
          adjacentes:{ G:1, F:2 },
          x: 380,
          y: 322
        },
        {
          id:"E",
          adjacentes:{ F:2 },
          x: 45 ,
          y: 255
        },
        {
          id:"F",
          adjacentes:{ E:2, A:2, B:4, D:2 },
          x: 167,
          y: 134
        },
        {
          id:"G",
          adjacentes:{ C:1, D:2 },
          x: 455,
          y: 57
        }]

        yield put(actions.setMapPathPoints(itemsList));
}   

export function* watchPointSearchQrCode(action): IterableIterator<any> {
  yield* takeLatest( actions.POINT_SEARCH_QR_CODE, getMapPathPoints);
}