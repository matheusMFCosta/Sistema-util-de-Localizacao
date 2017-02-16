import React from 'react'
import {  View, Image, Dimensions } from 'react-native'
var { ImageZoom } = require('react-native-image-pan-zoom');
var { Actions } = require('react-native-router-flux')
var { Line, Svg, G, Circle } = require('react-native-svg');
import { pathPoint, pathPoints } from './../maps'
import { connect } from 'react-redux'




const DrawLines = (props) => {
  let keys: Array<string> = [];
  for(let key in props.paths.adjacentes){
     keys.push(key)
  }
  return(
    <G>
      {keys.map((key,index) =>{

        const cordenates = props.getPointCordenates(key,props.pathPoints)
        return(
              <G key={index}>
                <Circle
                  cx={cordenates.x}
                  cy={cordenates.y}
                  r="5"
                  fill="pink"
              />
                  <Line
              key={index}
              x1={props.paths.x}
              y1={props.paths.y}
              x2={cordenates.x}
              y2={cordenates.y}
              stroke="red"
              strokeWidth="2"
                
          />
          </G>
        )
      })}
    </G>
  )

}

interface Appprops {
    getPointCordenates: Function
    pathPoints: pathPoints
    map: any
}

class app extends React.Component<Appprops,{}> {
    constructor(props, context) {
        super(props, context);
    }

    render(): JSX.Element {  

        return(
          <View>
            <ImageZoom cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height}
                imageWidth={580}
                imageHeight={400}>
                <View>
                    <Image style={{width:580, height:400,position:'absolute'}}
                        source={this.props.map}/>
                    <View style={{position:'absolute'}}>
                        <Svg 
                            height="800"
                            width="800"
                        >
                        {this.props.pathPoints.map((key,index)=> {
                        return(
                            <DrawLines 
                            pathPoints={this.props.pathPoints}
                            getPointCordenates={this.props.getPointCordenates} 
                            paths={key} 
                            key={index} />
                        )
                        })}
                        
                        </Svg>
                    </View >

                </View>
            </ImageZoom>

      </View>
        )
    }
}



const mapStateToProps = (state,ownProps) => ({
  });

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(app);
