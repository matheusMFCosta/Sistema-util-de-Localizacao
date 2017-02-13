import {Action, createAction }from 'redux-actions';
import { ListMethods } from './listMethods'

export const TESTE = "TESTE"
export const CHANGE_ADD_CODE_FOOTER_STATUS = "CHANGE_ADD_CODE_FOOTER_STATUS";

//export const teste: () => Action = createAction<null>(TESTE)

export const changeAddCodeFooterStatus: (status:boolean) => Action<boolean> = createAction<boolean>(CHANGE_ADD_CODE_FOOTER_STATUS)

export const teste: (wow:boolean) => Action<string> = createAction<boolean>(
    TESTE, (wow) => { console.log(wow); return(wow) }
);


