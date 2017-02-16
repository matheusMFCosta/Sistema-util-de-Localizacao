import React from 'react'
import {  View, Image, Dimensions } from 'react-native'
var { ImageZoom } = require('react-native-image-pan-zoom');
var { Actions } = require('react-native-router-flux')
var { Line, Svg, G, Circle } = require('react-native-svg');
import { pathPoint, pathPoints, destinationPoint } from './../maps'
import { connect } from 'react-redux'

            


const DrawLines = (props) => {
  const keys: Array<string> = props.getPathMap(props.pathPoints,props.originPoint,props.destinationPoint)
  console.log(keys)
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
                <G>
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

}

interface Appprops {
    getPointCordenates: Function
    pathPoints: pathPoints
    destinationPoint: destinationPoint,
    originPoint: destinationPoint,
    getPathMap: Function
}

class app extends React.Component<Appprops,{}> {
    constructor(props, context) {
        super(props, context);
    }

    render(): JSX.Element {  
               return(      
            <Svg 
                height={800}
                width={1000}>


                        <DrawLines
                            getPathMap={this.props.getPathMap}
                            destinationPoint={this.props.destinationPoint}
                            originPoint={this.props.originPoint} 
                            pathPoints={this.props.pathPoints}
                            getPointCordenates={this.props.getPointCordenates} 

                        />
                    


            </Svg>
        )
    }
}



const mapStateToProps = (state,ownProps) => ({
  });

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(app);
