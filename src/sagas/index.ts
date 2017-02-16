import { call, put, fork } from 'redux-saga/effects'
import { watchRemovePolicyStatement, runTimer } from './../app/sagas'
import { watchPointSearchQrCode, watchGetDestinationPointDetails, watchGetOriginPointDetails, watchSetMapsDataFromServer } from './../pointSearch/sagas'

export const rootSaga = function* root() {
  yield [
    fork(watchRemovePolicyStatement),
    fork(runTimer),
    fork(watchPointSearchQrCode),
    fork(watchGetDestinationPointDetails),
    fork(watchGetOriginPointDetails),
    fork(watchSetMapsDataFromServer)
  ]
}
