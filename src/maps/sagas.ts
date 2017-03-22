import { takeEvery, takeLatest } from 'redux-saga'
import { put } from 'redux-saga/effects'
import * as actions from './actions'



function* buildBuildConfigurationsSteps(action): IterableIterator<any> {
        
    //yield put(actions.setDestinationPointSuccess(destinationPoint))buildBuildConfigurationsStepsSuccess
}  




export function* watchBuildBuildConfigurationsSteps(action): IterableIterator<any> {
  yield* takeLatest( actions.BUILD_BUILD_CONFIGURANTION_STEPS, buildBuildConfigurationsSteps);
}
