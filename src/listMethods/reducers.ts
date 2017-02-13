import { handleActions, Action } from 'redux-actions';
import { ListMethods } from './listMethods'

import {
  TESTE,
  CHANGE_ADD_CODE_FOOTER_STATUS
} from './actions'

const testeInitialState: ListMethods ={
    teste: false,
    showAddCodeFooter: false
} 


function assign<T> (state : T, patch : Partial<T>) : T {
  return Object.assign({}, state, patch);
}
    
    
export const listMethodsReducer  = handleActions<ListMethods>({
    [TESTE]: (state : ListMethods , action : Action<boolean>): ListMethods => {
        return assign(state, { teste: !state.teste} );
    },
    [CHANGE_ADD_CODE_FOOTER_STATUS]: (state : ListMethods , action : Action<boolean>): ListMethods => {
        return assign(state, { showAddCodeFooter: action.payload });
    },

}, testeInitialState)