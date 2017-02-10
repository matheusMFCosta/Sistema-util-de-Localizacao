import { call, put, fork } from 'redux-saga/effects'
import { takeEvery, takeLatest } from 'redux-saga'

function* removePolicyStatement(action){
    console.log("WOOOOOW2");
}

function* watchRemovePolicyStatement(action){
  yield* takeLatest("TESTE", removePolicyStatement);
}

export const rootSaga = function* root() {
  yield [
    fork(watchRemovePolicyStatement)
  ]
}
