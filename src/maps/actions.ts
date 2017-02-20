import { Action, createAction }from 'redux-actions';

export const SWAP_NEXT_MAP_BUTTON_PRESS = "SWAP_NEXT_MAP_BUTTON_PRESS"
export const SWAP_PREVIOUS_MAP_BUTTON_PRESS = "SWAP_PREVIOUS_MAP_BUTTON_PRESS"
export const BUILD_PATH_STEPS = "BUILD_PATH_STEPS"

export const buildPathSteps: (path: Array<any>) => Action<Array<any>> = createAction<Array<any>>(BUILD_PATH_STEPS);

export const swapNextMapButtonPress: () => Action<Array<void>> = createAction<void>(SWAP_NEXT_MAP_BUTTON_PRESS);

export const swapPreviousMapButtonPress: () => Action<Array<void>> = createAction<void>(SWAP_PREVIOUS_MAP_BUTTON_PRESS);

