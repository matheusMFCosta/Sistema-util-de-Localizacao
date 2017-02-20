import { handleActions, Action } from 'redux-actions';
import { mapsData } from './maps'
import {
    Maps
} from './maps'


import {
    SWAP_NEXT_MAP_BUTTON_PRESS,
    SWAP_PREVIOUS_MAP_BUTTON_PRESS,
    BUILD_PATH_STEPS
} from './actions'

function assign<T> (state : T, patch : Partial<T>) : T {
  return Object.assign({}, state, patch);
}

const constMapsInitialState = {
    pathOriginToDestinationCurrentMap: [],
    pathOriginToDestinationHoleMap: [],
    currentMapindex: 0,
    pathSteps: []
}
export const mapsReducer  = handleActions<Maps>({
    [SWAP_NEXT_MAP_BUTTON_PRESS]: (state : Maps , action : Action<mapsData> ): Maps => {
        return assign(state, { currentMapindex: state.currentMapindex + 1} );
    },
    [SWAP_PREVIOUS_MAP_BUTTON_PRESS]: (state : Maps , action : Action<mapsData> ): Maps => {
        return assign(state, { currentMapindex: state.currentMapindex - 1} );
    },
    [BUILD_PATH_STEPS]: (state : Maps , action : Action<Array<any>> ): Maps => {
        return assign(state, {pathSteps: action.payload} );
    },
}, constMapsInitialState)