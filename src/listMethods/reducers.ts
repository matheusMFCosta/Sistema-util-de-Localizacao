// import { handleActions, Action } from 'redux-actions';
import { Teste } from "./listMethods";

// import {
//   TESTE
// } from './actions'

const testeInitialState: Teste = {
    teste: false
};

function assign<T>(state: T, patch: Partial<T>): T {
    return Object.assign({}, state, patch);
}

export function todoApp(state = {}, action) {
    switch (action.type) {
        case "TOGGLE_TODO":
            return state;
        default:
            return state;
    }
}
