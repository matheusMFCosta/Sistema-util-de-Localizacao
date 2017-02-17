import React from 'react'
import {  View, Image, Dimensions, StyleSheet } from 'react-native'
var { ImageZoom } = require('react-native-image-pan-zoom');
var { Actions } = require('react-native-router-flux')
var { Line, Svg, G, Circle } = require('react-native-svg');
import RenderMap from './components/renderMap'
import { pathPoints, destinationPoint, mapsData } from './maps'
import { connect } from 'react-redux'
import { 
    changePathOriginToDestinationCurrentMap, 
    changePathOriginToDestinationHoleMap, 
    swapNextMapButtonPress,
    swapPreviousMapButtonPress } from './actions'
import  FooterSwapMaps from './components/footerSwapMaps'
var image = require('./../../images/base/graph2.png')
 const Graph = require('node-dijkstra')


interface Appprops {
  pathPoints: pathPoints,
  destinationPoint: destinationPoint,
  originPoint: destinationPoint,
  getPathMap: Function,
  changePathOriginToDestinationCurrentMap: Function
  changePathOriginToDestinationHoleMap: Function
  pathOriginToDestinationCurrentMap: Array<string>
  swapNextMapButtonPress: Function
  swapPreviousMapButtonPress: Function,
  currentMapData: mapsData
}

class app extends React.Component<Appprops,{}> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
       }

      getCurrentPathMap(holePath,currentMap,pathPoints): Array<string>{
        const route = new Graph()
        let path:any =[]
        for(let key in holePath){
            console.log("key:",holePath[key])
            console.log(this.getPointMapReference(holePath[key],pathPoints))
            if(this.getPointMapReference(holePath[key],pathPoints) == currentMap.id){
              path.push(holePath[key])
            }
        }

        return path

        // return adjacentesDistancemap;
    }
    componentWillReceiveProps(nextProps){
      if(this.props.currentMapData != nextProps.currentMapData){
         const holePath = this.getHolePathMap(this.props.pathPoints,this.props.originPoint,this.props.destinationPoint)
      console.log(holePath)
      this.props.changePathOriginToDestinationHoleMap(holePath)
      this.props.changePathOriginToDestinationCurrentMap(this.getCurrentPathMap(holePath,this.props.currentMapData,this.props.pathPoints)) 
  
      }

    }

    getHolePathMap(pathPoints,originPoint,destinationPoint ): Array<string>{
        const route = new Graph()
        for(let key in pathPoints){
        route.addNode(pathPoints[key].id, pathPoints[key].adjacentes)
        }

        return route.path(originPoint.id, destinationPoint.id)
        
        
        // return adjacentesDistancemap;
    }

      getPointMapReference(id,pathPoints){
        const items = pathPoints
        for(let key in items){
          console.log(items[key].id,id)
          if(items[key].id == id){
            return items[key].mapReference
          } 
        }
        return("none")
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
          <View style={styles.footer}>
            <View style={styles.footer}>
              <RenderMap 
                currentMapData={this.props.currentMapData}
                pathOriginToDestinationCurrentMap={this.props.pathOriginToDestinationCurrentMap}
                getPointCordenates={this.getPointCordenates} 
                pathPoints={this.props.pathPoints} 
                map={image} 
                />
              </View>
            <View style={styles.footer}>
              <FooterSwapMaps 
                    swapNextMapButtonPress={this.props.swapNextMapButtonPress}
                    swapPreviousMapButtonPress={this.props.swapPreviousMapButtonPress}
              />
            </View>
         </View>
        )
    }
}

type flexDirectionTColumype = "column";
const flexDirectionColumn:flexDirectionTColumype = "column";

const styles = StyleSheet.create({
  footer: {
    flex: 1, 
    flexDirection: flexDirectionColumn
  }
})


const mapStateToProps = (state,ownProps) => ({
   pathPoints: state.pointSearch.pathPoints,
   destinationPoint: state.pointSearch.destinationPoint,
   originPoint: state.pointSearch.originPoint,
   pathOriginToDestinationCurrentMap: state.maps.pathOriginToDestinationCurrentMap,
   currentMapData: state.maps.currentMapData
  });

const mapDispatchToProps = dispatch => ({
  changePathOriginToDestinationCurrentMap: (path: Array<string>) =>
    dispatch(changePathOriginToDestinationCurrentMap(path)),
  changePathOriginToDestinationHoleMap: (path: Array<string>) =>
    dispatch(changePathOriginToDestinationHoleMap(path)),
  swapNextMapButtonPress: () =>
    dispatch(swapNextMapButtonPress()),
  swapPreviousMapButtonPress: () =>
    dispatch(swapPreviousMapButtonPress())
  

});


export default connect(mapStateToProps, mapDispatchToProps)(app);

