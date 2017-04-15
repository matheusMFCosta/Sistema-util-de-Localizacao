import React from 'react'
import { Image } from 'react-native'
var { Line, Svg, G, Circle } = require('react-native-svg');
import { pathPoint, pathPoints, mapsData } from './../maps'
import { connect } from 'react-redux'

const DrawLines = (props) => {
  if(props.pathOriginToDestinationCurrentMap){
    const keys = props.pathOriginToDestinationCurrentMap;
    console.log(keys)
    return(
        <G>
        {keys.map((key,index) =>{
            if(index === keys.length -1)
                return(
                    <G key={index} />
                )
                const originCordenates = { x: keys[index].x, y: keys[index].y }

                const destinationCordenates = { x: keys[index+1].x, y: keys[index+1].y } 
                console.log(originCordenates,destinationCordenates)
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
    //pathPoints: pathPoints,
    pathOriginToDestinationCurrentMap: Array<string>
    //currentMapData: mapsData,
    mapMetadata:any,
    currentMapName: string,
    totalMapIndex: number
}

class DrawPath extends React.Component<Appprops,{}> {
    constructor(props, context) {
        super(props, context);
    }

    render(): JSX.Element { 
               return(      
            <Svg 
                height={this.props.mapMetadata.width}
                width={this.props.mapMetadata.width}>
                    <DrawLines
                        currentMapName={this.props.currentMapName}
                        pathOriginToDestinationCurrentMap={this.props.pathOriginToDestinationCurrentMap}
                        //pathPoints={this.props.pathPoints}
                        getPointCordenates={this.props.getPointCordenates} 
                        totalMapIndex={this.props.totalMapIndex}
                    />
            </Svg>
        )
    }
}

export default DrawPath
