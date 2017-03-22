import { call, put, fork } from 'redux-saga/effects'
import { watchRemovePolicyStatement, runTimer } from './../app/sagas'
import { watchPointSearchQrCode, watchSetDestinationPoint, watchSetOriginPoint, watchSetMapsDataFromServer } from './../pointSearch/sagas'

export const rootSaga = function* root() {
  yield [
    fork(watchRemovePolicyStatement),
    fork(runTimer),
    fork(watchPointSearchQrCode),
    fork(watchSetDestinationPoint),
    fork(watchSetOriginPoint),
    fork(watchSetMapsDataFromServer)
  ]
}
