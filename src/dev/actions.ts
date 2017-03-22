import { Action, createAction }from 'redux-actions';
const Graph = require('node-dijkstra')


export const SWAP_NEXT_MAP_BUTTON_PRESS = "SWAP_NEXT_MAP_BUTTON_PRESS"
export const SWAP_PREVIOUS_MAP_BUTTON_PRESS = "SWAP_PREVIOUS_MAP_BUTTON_PRESS"
export const BUILD_PATH_STEPS = "BUILD_PATH_STEPS"
export const BUILD_BUILD_CONFIGURANTION_STEPS = "BUILD_BUILD_CONFIGURANTION_STEPS"
export const BUILD_BUILD_CONFIGURANTION_STEPS_SUCCESS = "BUILD_BUILD_CONFIGURANTION_STEPS_SUCCESS"

export const buildBuildConfigurationsSteps: (buildPointsPath: any,originPointMapReference: string,destinationPointMapreference: string) => Action<any> = createAction<any>(BUILD_BUILD_CONFIGURANTION_STEPS,
(buildPointsPath,originPointMapReference: string,destinationPointMapreference: string) => {

    if(originPointMapReference.indexOf(destinationPointMapreference) != -1){
        return [destinationPointMapreference]
    }

    const route = new Graph()
    for(let key in buildPointsPath){
        let adjacentkeys = {}
        for(let adjacenteKey in buildPointsPath[key].adjacentes){
            adjacentkeys[adjacenteKey]=1
        }
        route.addNode(key, adjacentkeys)
    }
    const finalroute = route.path(originPointMapReference, destinationPointMapreference)  
    return finalroute
}
);

export const buildBuildConfigurationsStepsSuccess: (steps: Array<string>) => Action<Array<string>> = createAction<Array<string>>(BUILD_PATH_STEPS)

export const buildPathSteps: (path: Array<any>) => Action<Array<any>> = createAction<Array<any>>(BUILD_PATH_STEPS);

export const swapNextMapButtonPress: () => Action<Array<void>> = createAction<void>(SWAP_NEXT_MAP_BUTTON_PRESS);

export const swapPreviousMapButtonPress: () => Action<Array<void>> = createAction<void>(SWAP_PREVIOUS_MAP_BUTTON_PRESS);

