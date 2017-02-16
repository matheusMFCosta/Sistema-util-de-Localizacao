import React from 'react'
import {  View, Image, Dimensions } from 'react-native'
var { ImageZoom } = require('react-native-image-pan-zoom');
var { Actions } = require('react-native-router-flux')
var { Line, Svg, G, Circle } = require('react-native-svg');
import RenderMap from './components/renderMap'
import { pathPoints, destinationPoint } from './maps'
import { connect } from 'react-redux'
var image = require('./../../images/base/graph2.png')
 const Graph = require('node-dijkstra')


interface Appprops {
  pathPoints: pathPoints,
  destinationPoint: destinationPoint,
  originPoint: destinationPoint,
  getPathMap: Function
}

class app extends React.Component<Appprops,{}> {
    constructor(props, context) {
        super(props, context);
    }


    getPathMap(pathPoints,originPoint,destinationPoint ){
        const route = new Graph()
        for(let key in pathPoints){
        route.addNode(pathPoints[key].id, pathPoints[key].adjacentes)
        }

        return route.path(originPoint.id, destinationPoint.id)
        
        
        // return adjacentesDistancemap;
    }

      getPointCordenates(id,pathPoints){
        const items = pathPoints
        for(let key in items){
          if(items[key].id ==id){
            return{
              x: items[key].x,
              y: items[key].y,
            }
          } 
        }
        return{
              x: 0,
              y: 0,
            }
      }

    render(): JSX.Element {
        return(
          <View>
            <RenderMap 
              getPathMap={() =>this.getPathMap(this.props.pathPoints,this.props.originPoint,this.props.destinationPoint)}
              getPointCordenates={this.getPointCordenates} 
              pathPoints={this.props.pathPoints} 
              map={image} 
              
              />
         </View>
        )
    }
}


const mapStateToProps = (state,ownProps) => ({
   pathPoints: state.pointSearch.pathPoints,
   destinationPoint: state.pointSearch.destinationPoint,
   originPoint: state.pointSearch.originPoint

  });

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(app);

