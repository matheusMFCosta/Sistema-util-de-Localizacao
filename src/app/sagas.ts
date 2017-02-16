import { takeEvery, takeLatest } from 'redux-saga'
import { actionChannel, call, take, put, race } from 'redux-saga/effects'
import * as actions from './actions'


const wait = ms => (
  new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
)

export function* runTimer(): IterableIterator<any> { 
  const channel = yield actionChannel(actions.TIME_START)
  while(yield take(channel)) {
    while(true) {
      const winner = yield race({
        stopped: take(actions.TIME_STOP),
        tick: call(wait, 1000)
      })
      if (!winner.stopped) {
        yield put(actions.secondCount())
      } else {
        break
      }
    }
  }
}

function* removePolicyStatement(action): IterableIterator<any> {
    
}



export function* watchRemovePolicyStatement(action): IterableIterator<any> {
  yield* takeLatest("TESTE", removePolicyStatement);
}



