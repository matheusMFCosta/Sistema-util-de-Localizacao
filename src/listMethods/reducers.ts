import { handleActions, Action } from 'redux-actions';
import { Teste } from './listMethods'

import {
  TESTE
} from './actions'

const testeInitialState: Teste ={
    teste: false
} 


export const roleReducer  = handleActions<Teste>({
    [TESTE]: (state : Teste , action : Action<any>): Teste => {
        return Object.assign({}, state,{ teste:  action.payload} );
    },

}, testeInitialState)