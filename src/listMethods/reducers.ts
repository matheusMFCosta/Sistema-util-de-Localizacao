import { handleActions, Action } from 'redux-actions';
import { Teste } from './listMethods'

import {
  TESTE
} from './actions'

const testeInitialState: Teste ={
    teste: false
} 


function assign<T> (state : T, patch : Partial<T>) : T {
  return Object.assign({}, state, patch);
}
    
    
export const listMethods  = handleActions<Teste>({
    [TESTE]: (state : Teste , action : Action): Teste => {
        return assign(state, { teste: !state.teste} );
    },

}, testeInitialState)