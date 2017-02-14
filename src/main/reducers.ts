import { handleActions, Action } from 'redux-actions';
import { Main, Account } from './main'

import {
  ADD_ACCOUNT
} from './actions'

const mainInitialState: Main ={
    accountList: [{name: "vtex",
code: "234565",
owner: "vtex.com"}]
} 

function assign<T> (state : T, patch : Partial<T>) : T {
  return Object.assign({}, state, patch);
}
    
    
export const mainReducer  = handleActions<Main>({
    [ADD_ACCOUNT]: (state : Main , action : Action<Account>): Main => {
        return assign(state, { accountList: appendArray(state.accountList,action.payload)} );
    },
}, mainInitialState)


const appendArray = (array: Array<Account>,newValue: Account) => {
    array.push(newValue)
    return array
}
