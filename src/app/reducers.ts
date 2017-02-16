import { handleActions, Action } from 'redux-actions';
import { App } from './app'

import {
  TESTE,
  CHANGE_ADD_CODE_FOOTER_STATUS,
  TIME_SECOND_COUNT,
} from './actions'

const testeInitialState: App ={
    teste: false,
    showAddCodeFooter: false,
    seconds: 0
} 


function assign<T> (state : T, patch : Partial<T>) : T {
  return Object.assign({}, state, patch);
}
    
    
export const appReducer  = handleActions<App>({
    [TESTE]: (state : App , action : Action<boolean>): App => {
        return assign(state, { teste: !state.teste} );
    },
    [CHANGE_ADD_CODE_FOOTER_STATUS]: (state : App , action : Action<boolean>): App => {
        return assign(state, { showAddCodeFooter: action.payload });
    },
    [TIME_SECOND_COUNT]: (state : App , action : Action<number>): App => {
        return assign(state, { seconds: state.seconds +1 });
    },

}, testeInitialState)