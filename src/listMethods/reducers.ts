import { handleActions, Action } from 'redux-actions';

import {
  TESTE
} from './actions'


export function listMethods(state = {
    wow: false,
}, action) {
    switch (action.type) {
        case "TESTE":
            {
            console.log("wow")
            return {
            wow: true,
            }
        }

        default:
            return state;
    }
}


