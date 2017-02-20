export interface pathPoint{
    id: string,
    adjacentes: any,
    mapReference:string,
    x: number,
    y: number
}

export interface destinationPoint{
    id: string,
    adjacentes: any,
    description: string,
    mapReference: string,
    x: number,
    y: number
}

export interface mapsData{
    id: string,
    path: string
}
// export interface pathPoints{
//     items: Array<pathPoint>
// }

export interface pointsOfInterest{
    id: string,
    adjacentes: any
    description: string,
    mapReference: string,
    x: number,
    y: number
}

export interface Maps{
    currentMapindex: number,
    pathSteps: Array<any>
}

export type mapsImage = Array<any>

export type pathPoints = Array<pathPoint>