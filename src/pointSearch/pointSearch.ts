import { pathPoints, destinationPoint, mapsData, pointsOfInterest, mapsImage } from './../maps/maps'

export interface AddAccount {
    accountName: string,
    accountOwner: string,
    accountSecret: string,
    shouldCameraBeOpen: boolean,
    pathPoints: pathPoints,
    mapsData: mapsData,
    mapsImage: mapsImage, 
    pointsOfInterest: pointsOfInterest,
    destinationPoint: destinationPoint,
    originPoint: destinationPoint,
    pathOriginToDestinationCurrentMap: Array<string>
}

