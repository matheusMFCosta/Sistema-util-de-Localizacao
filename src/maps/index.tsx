import React from 'react'
import {  View, StyleSheet } from 'react-native'
import RenderMap from './components/renderMap'
import { pathPoints, destinationPoint, mapsData } from './maps'
import { connect } from 'react-redux'
import { 
    swapNextMapButtonPress,
    swapPreviousMapButtonPress,
    buildPathSteps } from './actions'
import  FooterSwapMaps from './components/footerSwapMaps'
var image = require('./../../images/base/graph2.png')
const Graph = require('node-dijkstra')


interface Appprops {
  pathPoints: pathPoints,
  destinationPoint: destinationPoint,
  originPoint: destinationPoint,
  swapNextMapButtonPress: Function
  swapPreviousMapButtonPress: Function,
  buildPathSteps: Function,
  currentMapindex: number,
  mapsData: mapsData,
  pathSteps: Array<any>
}

class app extends React.Component<Appprops,{}> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        const holePath = this.getHolePathMap(this.props.pathPoints,this.props.originPoint,this.props.destinationPoint)
        this.buildPathSteps(holePath,this.props.pathPoints)
    }
    buildPathSteps(holePath,pathPoints){
        let path:any =[]
        let object:any = {keys:[]}
        let currentMap = ""
        for(let key in holePath){
            if(this.getPointMapReference(holePath[key],pathPoints) == currentMap && object.mapReference){
              object.keys.push(holePath[key])
            }
            if(!object.mapReference){
              object = {mapReference: this.getPointMapReference(holePath[key],pathPoints), keys:[holePath[key]]}
              currentMap = this.getPointMapReference(holePath[key],pathPoints)
            }
            if(this.getPointMapReference(holePath[key],pathPoints) != currentMap){
              currentMap = this.getPointMapReference(holePath[key],pathPoints)
              path.push(object)
              object = {mapReference: this.getPointMapReference(holePath[key],pathPoints), keys:[holePath[key]]}
            }
        }
        path.push(object)
        this.props.buildPathSteps(path)
    }

    getHolePathMap(pathPoints,originPoint,destinationPoint ): Array<string>{
        const route = new Graph()
        for(let key in pathPoints){
        route.addNode(pathPoints[key].id, pathPoints[key].adjacentes)
        }
        return route.path(originPoint.id, destinationPoint.id)
    }

      getPointMapReference(id,pathPoints){
        const items = pathPoints
        for(let key in items){
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
        const currentMapData = this.props.mapsData[this.props.currentMapindex]
        const pathOriginToDestinationCurrentMap = this.props.pathSteps[this.props.currentMapindex]
        return(
          <View style={styles.footer}>
            <View style={styles.main}>
              <RenderMap 
                currentMapData={currentMapData}
                pathOriginToDestinationCurrentMap={pathOriginToDestinationCurrentMap}
                getPointCordenates={this.getPointCordenates} 
                pathPoints={this.props.pathPoints} 
                map={image} 
                />
              </View>
            <View style={styles.footer}>
              <FooterSwapMaps 
                    currentMapData={currentMapData}
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
  },
  main: {
    flex: 5, 
    flexDirection: flexDirectionColumn
  }
})


const mapStateToProps = (state,ownProps) => ({
   pathPoints: state.pointSearch.pathPoints,
   destinationPoint: state.pointSearch.destinationPoint,
   originPoint: state.pointSearch.originPoint,
   currentMapindex: state.maps.currentMapindex,
   mapsData: state.pointSearch.mapsData,
   pathSteps: state.maps.pathSteps
  });

const mapDispatchToProps = dispatch => ({
  swapNextMapButtonPress: () =>
    dispatch(swapNextMapButtonPress()),
  swapPreviousMapButtonPress: () =>
    dispatch(swapPreviousMapButtonPress()),
  buildPathSteps: (steps) =>
    dispatch(buildPathSteps(steps))
  

});


export default connect(mapStateToProps, mapDispatchToProps)(app);

