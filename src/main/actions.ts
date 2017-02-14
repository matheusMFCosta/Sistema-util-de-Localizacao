import { Action, createAction } from 'redux-actions';
import { Account } from './main' 
export const ADD_ACCOUNT = "ADD_ACCOUNT"

//export const addAccount: (name: string,code: string,owner: string) => Action<Account> = createAction<Account>(ADD_ACCOUNT)

export const addAccount: (name: string,code: string,owner: string) => Action<Account> = createAction<Account>(
    ADD_ACCOUNT, (name: string,code: string,owner: string) => { 
        return(
            {
                name : name,
                code: code,
                owner: owner}
            ) 
    }
);
