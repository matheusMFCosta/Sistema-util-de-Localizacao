import { call, put, fork } from 'redux-saga/effects'
import { watchRemovePolicyStatement, runTimer } from './../listMethods/sagas'


export const rootSaga = function* root() {
  yield [
    fork(watchRemovePolicyStatement),
    fork(runTimer)
  ]
}
