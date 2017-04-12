import { pathPoints, destinationPoint, mapsData, pointsOfInterest, mapsImage } from './../maps/maps'

export interface AddAccount {
    pointFindFilter: string,
    shouldCameraBeOpen: boolean,
    pathPoints: pathPoints,
    mapsData: mapsData,
    mapsImage: mapsImage, 
    pointsOfInterest: Array<pointsOfInterest>,
    destinationPoint: destinationPoint,
    originPoint: destinationPoint,
    pathOriginToDestinationCurrentMap: Array<string>,
    buildPointsPath:any,
    mapsAllData:Array<any>,
    mapsMetadata: Array<any>
}

