import { takeEvery, takeLatest } from 'redux-saga'

function* removePolicyStatement(action){
    console.log("WOOOOOW2");
}

export function* watchRemovePolicyStatement(action){
  yield* takeLatest("TESTE", removePolicyStatement);
}
