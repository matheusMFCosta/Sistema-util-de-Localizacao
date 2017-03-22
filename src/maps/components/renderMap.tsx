import React from 'react'
import { View, Image, Dimensions } from 'react-native'
var { ImageZoom } = require('react-native-image-pan-zoom');
import { pathPoint, pathPoints, mapsData } from './../maps'
import DrawPath from './drawPath'

interface Appprops {
    getPointCordenates: Function
    pathPoints: pathPoints
    map: any,
    pathOriginToDestinationCurrentMap: Array<string>,
    currentMapData: mapsData
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
                imageWidth={this.props.currentMapData.width}
                imageHeight={this.props.currentMapData.height}>
                <View>
                    <Image style={{width:this.props.currentMapData.width, height:this.props.currentMapData.height,position:'absolute'}}
                        source={{uri: this.props.currentMapData.path}}/>
                    <View style={{position:'absolute'}}>
                        <DrawPath
                            currentMapData={this.props.currentMapData}
                            pathOriginToDestinationCurrentMap={this.props.pathOriginToDestinationCurrentMap}
                            getPointCordenates={this.props.getPointCordenates} 
                            pathPoints={this.props.pathPoints}/>
                    </View >
                </View>
            </ImageZoom>

      </View>
        )
    }
}

export default RenderMap;
