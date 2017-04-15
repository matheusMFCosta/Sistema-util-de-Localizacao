import { handleActions, Action } from 'redux-actions';
import { mapsData } from './maps'
import {
    Maps
} from './maps'


import {
    SWAP_NEXT_MAP_BUTTON_PRESS,
    SWAP_PREVIOUS_MAP_BUTTON_PRESS,
    BUILD_PATH_STEPS,
    SET_WHOLE_PATH,
    SET_MAP_PATH_ORDER
} from './actions'

function assign<T> (state : T, patch : Partial<T>) : T {
  return Object.assign({}, state, patch);
}

const constMapsInitialState = {
    buildConfigurationsSteps: [],
    pathOriginToDestinationCurrentMap: [],
    pathOriginToDestinationHoleMap: [],
    currentMapindex: 0,
    pathSteps: [],
    wholePath: [],
    mapsPathOrder: []
    
}
export const mapsReducer  = handleActions<Maps>({
    [SET_WHOLE_PATH]: (state : Maps , action : Action<any> ): Maps => {
        return assign(state, {wholePath: action.payload} );
    },
    [SET_MAP_PATH_ORDER]: (state : Maps , action : Action<any> ): Maps => {
        return assign(state, {mapsPathOrder: action.payload} );
    },
    BUILD_BUILD_CONFIGURANTION_STEPS: (state : Maps , action : Action<Array<string>> ): Maps => {
        return assign(state, {buildConfigurationsSteps: action.payload} );
    },
    [SWAP_NEXT_MAP_BUTTON_PRESS]: (state : Maps , action : Action<mapsData> ): Maps => {
    if((state.currentMapindex + 1) )
        return assign(state, { currentMapindex: state.currentMapindex + 1} );
    return state
    },
    [SWAP_PREVIOUS_MAP_BUTTON_PRESS]: (state : Maps , action : Action<mapsData> ): Maps => {
    if((state.currentMapindex - 1) >= 0)
        return assign(state, { currentMapindex: state.currentMapindex - 1} );
    return state
    },
    [BUILD_PATH_STEPS]: (state : Maps , action : Action<Array<any>> ): Maps => {
        return assign(state, {pathSteps: action.payload} );
    },
}, constMapsInitialState)