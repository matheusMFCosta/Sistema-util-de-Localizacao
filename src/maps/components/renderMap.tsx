import React from 'react'
import { View, Image, Dimensions } from 'react-native'
var { ImageZoom } = require('react-native-image-pan-zoom');
import { pathPoint, pathPoints, mapsData } from './../maps'
import DrawPath from './drawPath'

interface Appprops {
    getPointCordenates: Function
    //pathPoints: pathPoints
    map: any,
    pathOriginToDestinationCurrentMap: Array<string>,
    //currentMapData: mapsData,
    mapMetadata: any,
    currentMapName: string,
    totalMapIndex: number,
    destinationPoint: any
}

 class RenderMap extends React.Component<Appprops,{}> {
    constructor(props, context) {
        super(props, context);
    }

    render(): JSX.Element {  
        return(
          <View>
            <ImageZoom cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height}
                imageWidth={this.props.mapMetadata.width}
                imageHeight={this.props.mapMetadata.height}>
                <View>
                    <Image style={{width:this.props.mapMetadata.width, height:this.props.mapMetadata.height,position:'absolute'}}
                        source={{uri: this.props.mapMetadata.path}}/>
                    <View style={{position:'absolute'}}>
                        <DrawPath
                            destinationPoint={this.props.destinationPoint}
                            currentMapName={this.props.currentMapName}
                            mapMetadata={this.props.mapMetadata}
                            pathOriginToDestinationCurrentMap={this.props.pathOriginToDestinationCurrentMap}
                            getPointCordenates={this.props.getPointCordenates} 
                            totalMapIndex={this.props.totalMapIndex}
                            />
                    </View >
                </View>
            </ImageZoom>

      </View>
        )
    }
}

export default RenderMap;
