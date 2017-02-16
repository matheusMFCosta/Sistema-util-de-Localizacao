import React from 'react'
import {  View, Image, Dimensions } from 'react-native'
var { ImageZoom } = require('react-native-image-pan-zoom');
var { Line, Svg, G, Circle } = require('react-native-svg');
import { pathPoint, pathPoints, destinationPoint } from './../maps'
import { connect } from 'react-redux'
import DrawPath from './drawPath'

interface Appprops {
    getPointCordenates: Function
    pathPoints: pathPoints
    map: any,
    getPathMap: Function
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
                imageWidth={800}
                imageHeight={600}>
                <View>
                    <Image style={{width:800, height:600,position:'absolute'}}
                        source={{uri:'https://miex-food.herokuapp.com/teste/images/graph2'}}/>
                    <View style={{position:'absolute'}}>
                        <DrawPath
                            getPathMap={this.props.getPathMap}
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
