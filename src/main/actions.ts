import { Action, createAction } from 'redux-actions';
import { Account } from './main' 
export const ADD_ACCOUNT = "ADD_ACCOUNT"
export const UPDATE_ACCOUNTS_CODE = "UPDATE_ACCOUNTS_CODE";

export const updateAccountsCode: () => Action<void> = createAction<void>(UPDATE_ACCOUNTS_CODE);

export const pointSearch: (name: string, accessCode: string, issuer: string, epoch: number, algorithm: string) => Action<Account> = 
    createAction<Account>(
        ADD_ACCOUNT, (name: string,accessCode: string,issuer: string,epoch: number,algorithm: string) => { 
            return(
                {
                    name : name,
                    accessCode: "",
                    issuer: issuer,       
                    epoch: epoch,
                    algorithm: algorithm
                }
            ) 
        }
);


export const pointSearchQrCode: (qstr: string) => Action<Account> = 
    createAction<Account>(
        ADD_ACCOUNT, (qstr: string) => { 
            const AccountName = qstr.split("otpauth://totp/")[1].split("?")[0]
            var query: any = {};
            var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
            for (var i = 0; i < a.length; i++) {
                var b = a[i].split('=');
                query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
            }

            return(
                {
                    name : AccountName,
                    accessCode: "",
                    issuer: query.issuer,       
                    epoch: query.epoch || "30",
                    algorithm: query.algorithm || "SHA-1"
                }
            ) 
        }
);
