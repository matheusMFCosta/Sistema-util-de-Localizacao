import { Action, createAction }from 'redux-actions';

export const SET_CAMERA_BE_OPEN_STATUS = "SET_CAMERA_BE_OPEN_STATUS";
export const CHANGE_ACCONT_NAME_INPUT = "CHANGE_ACCONT_NAME_INPUT";
export const CHANGE_ACCOUNT_CODE_INPUNT = "CHANGE_ACCOUNT_CODE_INPUNT";
export const CHANGE_ACCOUNT_OWNER_INPUT = "CHANGE_ACCOUNT_OWNER_INPUT"
//export const teste: () => Action = createAction<null>(TESTE)

export const setCameraBeOpenStatus: (status:boolean) => 
    Action<boolean> = createAction<boolean>(SET_CAMERA_BE_OPEN_STATUS);

export const changeAccountName: (accountName:string) => 
    Action<string> = createAction<string>(CHANGE_ACCONT_NAME_INPUT);

export const changeAccountCodeInput: (accessCode:string) => 
    Action<string> = createAction<string>(CHANGE_ACCOUNT_CODE_INPUNT);

export const changeAccountOwnerInput: (issuer:string) => 
    Action<string> = createAction<string>(CHANGE_ACCOUNT_OWNER_INPUT);
    
// export const setCameraBeOpenStatus: (status:boolean) => Action = createAction<boolean>(
//     SET_CAMERA_BE_OPEN_STATUS, (wow) => { console.log(wow); return(wow) }
// );


