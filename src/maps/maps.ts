export interface pathPoint{
    id: string,
    adjacentes: any,
    mapReference:string,
    buildingReference: string,
    type?: string,
    transitionAccess?: any,
    x: number,
    y: number
}

export interface destinationPoint{
    id: string,
    adjacentes: any,
    description: string,
    mapReference: string,
    buildingReference: string,
    x: number,
    y: number
}

export interface mapsData{
    id: string,
    path: string,
    height: number,
    width: number
}
// export interface pathPoints{
//     items: Array<pathPoint>
// }

export interface pointsOfInterest{
    id: string,
    adjacentes: any
    description: string,
    mapReference: string,
    buildingReference: string,
    x: number,
    y: number
}

export interface Maps{
    currentMapindex: number,
    pathSteps: Array<any>,
    buildConfigurationsSteps: Array<string>,
    pathOriginToDestinationCurrentMap: Array<any>,
    pathOriginToDestinationHoleMap: Array<any>,
    wholePath: any
}

export type mapsImage = Array<any>

export type pathPoints = Array<pathPoint>