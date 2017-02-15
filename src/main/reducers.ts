import { handleActions, Action } from 'redux-actions';
import { Main, Account } from './main'
import  getOTP  from './../utils/getAccountCode' 
import {
  ADD_ACCOUNT,
  UPDATE_ACCOUNTS_CODE

} from './actions'

const mainInitialState: Main ={
    accountList: [{
    name: "vtex",
    accessCode: "234565",
    issuer: "vtex.com",
    epoch: 30,
    algorithm: "SHA-1"}]
} 

function assign<T> (state : T, patch : Partial<T>) : T {
  return Object.assign({}, state, patch);
}
    
    
export const mainReducer  = handleActions<Main>({
    [ADD_ACCOUNT]: (state : Main , action : Action<Account>): Main => {
        return assign(state, { accountList: [...state.accountList, ...[action.payload]]} );
    },
    [UPDATE_ACCOUNTS_CODE]: (state : Main , action : Action<{accessCode:string,index:number}>): Main => {
        return assign(state, { accountList: updateAccountsCode(state.accountList) });
    },
}, mainInitialState)


const updateAccountsCode = (accountList: Array<Account>, ): Array<Account> =>{
    for(let key in accountList){
        accountList[key].accessCode = getOTP("JBSWY3DPEHPK3PXZ")
    }
    return accountList
}
