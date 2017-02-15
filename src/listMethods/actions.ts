import { Action, createAction } from 'redux-actions';
import { ListMethods } from './listMethods'

export const TESTE = "TESTE";
export const CHANGE_ADD_CODE_FOOTER_STATUS = "CHANGE_ADD_CODE_FOOTER_STATUS";
export const TIME_SECOND_COUNT = "TIME_SECOND_COUNT";
export const TIME_START = "TIME_START";
export const TIME_STOP = "TIME_STOP";


export const timeStart: () => Action<void> = createAction<void>(TIME_START);

export const timeStop: () => Action<void> = createAction<void>(TIME_STOP);

export const secondCount: () => Action<void> = createAction<void>(TIME_SECOND_COUNT);

export const changeAddCodeFooterStatus: (status:boolean) => Action<boolean> = createAction<boolean>(CHANGE_ADD_CODE_FOOTER_STATUS);

export const teste: (wow:boolean) => Action<string> = createAction<boolean>(
    TESTE, (wow) => { console.log(wow); return(wow) }
);


