import React from 'react'
var { Line, Svg, G, Circle,Image } = require('react-native-svg');
import { pathPoint, pathPoints, mapsData } from './../maps'
import { connect } from 'react-redux'

// y -y0 = m(x - x0)



const DrawLines = (props) => {
  if(props.pathOriginToDestinationCurrentMap){
    const keys = props.pathOriginToDestinationCurrentMap;
    //console.log(https://img.clipartfest.com/768c28dd8912291c887acec2727baab4_-google-pin-icon-google-maps-icon-clipart_2481-2073.svg)
    return(
        <G>
        {keys.map((key,index) =>{
            if(index === keys.length -1){
                console.log(index,keys)
                const pinImage = (props.destinationPoint.id.indexOf(keys[index].id) == -1)?
                    require('../../utils/images/next_pin.png') :
                    require('../../utils/images/sul_pin.png');
                return(
                    <G key={index} >
                        <Image
                            x={keys[index].x -15}
                            y={keys[index].y -20  }
                            width="30"
                            height="40"
                            preserveAspectRatio="xMidYMid slice"
                            opacity="1"
                            href={pinImage}
                            clipPath="url(#clip)"
                        />
                    </G>
                )
            }
                const originCordenates = { x: keys[index].x, y: keys[index].y }

                const destinationCordenates = { x: keys[index+1].x, y: keys[index+1].y } 
                console.log(originCordenates,destinationCordenates)
            if(index === 0)
                return(
                    <G key={index} >

                        <Line
                            key={index}
                            x1={originCordenates.x}
                            y1={originCordenates.y}
                            x2={destinationCordenates.x}
                            y2={destinationCordenates.y}
                            stroke="red"
                            strokeWidth="2"/>
                        <Image
                            x={keys[index].x -7 }
                            y={keys[index].y -10 }
                            width="19"
                            height="20"
                            opacity="1"
                            href={require('../../utils/images/dot.png')}
                            clipPath="url(#clip)"
                        />
                    </G>
                )
            if(index < keys.length -1){

                const angulacao = (destinationCordenates.y - originCordenates.y) / (destinationCordenates.x - originCordenates.x)
                
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
    totalMapIndex: number,
    destinationPoint: any
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
                        destinationPoint={this.props.destinationPoint}
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
