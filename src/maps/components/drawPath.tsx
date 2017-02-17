import React from 'react'
import {  View, Image, Dimensions } from 'react-native'
var { ImageZoom } = require('react-native-image-pan-zoom');
var { Actions } = require('react-native-router-flux')
var { Line, Svg, G, Circle } = require('react-native-svg');
import { pathPoint, pathPoints, destinationPoint } from './../maps'
import { connect } from 'react-redux'

const DrawLines = (props) => {
  console.log(props)
  if(props.pathOriginToDestinationCurrentMap){
    const keys: Array<string> = props.pathOriginToDestinationCurrentMap;
    return(
        <G>
        {keys.map((key,index) =>{
                const originCordenates = props.getPointCordenates(key,props.pathPoints) 
                const destinationCordenates = props.getPointCordenates(keys[index+1],props.pathPoints) 
            if(index < keys.length -1){
                
                return(
                    <G key={index}>
                        <Circle
                        cx={originCordenates.x}
                        cy={originCordenates.y}
                        r="5"
                        fill="pink"/>
                        <Line
                            key={index}
                            x1={originCordenates.x}
                            y1={originCordenates.y}
                            x2={destinationCordenates.x}
                            y2={destinationCordenates.y}
                            stroke="red"
                            strokeWidth="2"/>
                    </G>
                )
            } else {
                return(
                    <G key={index} >
                        <Circle
                            cx={originCordenates.x}
                            cy={originCordenates.y}
                            r="5"
                            fill="pink"/>
                    </G>
                )
            }

        })}
        </G>
    )
  } else {
      return( <G></G>)
  }

}

interface Appprops {
    getPointCordenates: Function
    pathPoints: pathPoints,
    pathOriginToDestinationCurrentMap: Array<string>
}

class drawPath extends React.Component<Appprops,{}> {
    constructor(props, context) {
        super(props, context);
    }

    render(): JSX.Element {  
               return(      
            <Svg 
                height={800}
                width={1000}>
                    <DrawLines
                        pathOriginToDestinationCurrentMap={this.props.pathOriginToDestinationCurrentMap}
                        pathPoints={this.props.pathPoints}
                        getPointCordenates={this.props.getPointCordenates} 
                    />
            </Svg>
        )
    }
}

export default drawPath
