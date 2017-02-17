import { handleActions, Action } from 'redux-actions';
import { mapsData } from './maps'
import {
    Maps
} from './maps'

import {
    SET_ORIGIN_POINT
} from './../pointSearch/actions'

import {
    CHANGE_PATH_ORIGIN_TO_DESTINATION_CURRENT_MAP,
    CHANGE_PATH_ORIGIN_TO_DESTINATION_HOLE_MAP,
    SWAP_NEXT_MAP_BUTTON_PRESS,
    SWAP_PREVIOUS_MAP_BUTTON_PRESS
} from './actions'

function assign<T> (state : T, patch : Partial<T>) : T {
  return Object.assign({}, state, patch);
}
const mapsinitialState: mapsData = {"id": "graph2","path": "https://miex-food.herokuapp.com/teste/images/graph2"}

const constMapsInitialState = {
    pathOriginToDestinationCurrentMap: [],
    pathOriginToDestinationHoleMap: [],
    currentMapData: mapsinitialState
}
export const mapsReducer  = handleActions<Maps>({
    [CHANGE_PATH_ORIGIN_TO_DESTINATION_CURRENT_MAP]: (state : Maps , action : Action<Array<string>> ): Maps => {
        return assign(state, { pathOriginToDestinationCurrentMap: action.payload } );
    },
    [CHANGE_PATH_ORIGIN_TO_DESTINATION_HOLE_MAP]: (state : Maps , action : Action<Array<string>> ): Maps => {
        return assign(state, { pathOriginToDestinationHoleMap: action.payload } );
    },
    [SET_ORIGIN_POINT]: (state : Maps , action : Action<Array<string>> ): Maps => {
        return assign(state, { pathOriginToDestinationHoleMap: action.payload } );
    },
    [SWAP_NEXT_MAP_BUTTON_PRESS]: (state : Maps , action : Action<mapsData> ): Maps => {
        return assign(state, { currentMapData: {"id": "graph2","path": "https://miex-food.herokuapp.com/teste/images/graph2"}} );
    },
    [SWAP_PREVIOUS_MAP_BUTTON_PRESS]: (state : Maps , action : Action<mapsData> ): Maps => {
        return assign(state, { currentMapData: {"id": "graph3","path": "https://miex-food.herokuapp.com/teste/images/graph3"}} );
    }    
}, constMapsInitialState)