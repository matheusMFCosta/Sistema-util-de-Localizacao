import { createAction, Action } from 'redux-actions';
import { Teste } from './listMethods'

export const TESTE = "TESTE"


export const teste = createAction<Teste>(TESTE);


