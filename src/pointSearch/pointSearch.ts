import { pathPoints, destinationPoint } from './../maps/maps'

export interface AddAccount {
    accountName: string,
    accountOwner: string,
    accountSecret: string,
    shouldCameraBeOpen: boolean,
    pathPoints: pathPoints,
    destinationPoint: destinationPoint,
    originPoint: destinationPoint
}

