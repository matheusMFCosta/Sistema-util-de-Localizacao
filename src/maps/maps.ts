export interface pathPoint{
    id: string,
    adjacentes: any,
    x: number,
    y: number
}

export interface destinationPoint{
    id: string,
    adjacentes: any
    description: string,
    x: number,
    y: number
}

// export interface pathPoints{
//     items: Array<pathPoint>
// }

export type pathPoints = Array<pathPoint>