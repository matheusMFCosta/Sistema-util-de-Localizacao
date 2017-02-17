import { Action, createAction }from 'redux-actions';


export const CHANGE_PATH_ORIGIN_TO_DESTINATION_CURRENT_MAP = "CHANGE_PATH_ORIGIN_TO_DESTINATION_CURRENT_MAP"
export const CHANGE_PATH_ORIGIN_TO_DESTINATION_HOLE_MAP = "CHANGE_PATH_ORIGIN_TO_DESTINATION_HOLE_MAP"
export const SWAP_NEXT_MAP_BUTTON_PRESS = "SWAP_NEXT_MAP_BUTTON_PRESS"
export const SWAP_PREVIOUS_MAP_BUTTON_PRESS = "SWAP_PREVIOUS_MAP_BUTTON_PRESS"

export const changePathOriginToDestinationCurrentMap: (path: Array<string>) => Action<Array<string>> = createAction<Array<string>>(CHANGE_PATH_ORIGIN_TO_DESTINATION_CURRENT_MAP);

export const changePathOriginToDestinationHoleMap: (path: Array<string>) => Action<Array<string>> = createAction<Array<string>>(CHANGE_PATH_ORIGIN_TO_DESTINATION_HOLE_MAP);

export const swapNextMapButtonPress: () => Action<Array<void>> = createAction<void>(SWAP_NEXT_MAP_BUTTON_PRESS);

export const swapPreviousMapButtonPress: () => Action<Array<void>> = createAction<void>(SWAP_PREVIOUS_MAP_BUTTON_PRESS);

