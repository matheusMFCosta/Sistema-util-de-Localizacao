import React from 'react'
import {  View, StyleSheet } from 'react-native'
import RenderMap from './components/renderMap'
import { pathPoints, destinationPoint, mapsData } from './maps'
import { connect } from 'react-redux'
import { 
    swapNextMapButtonPress,
    swapPreviousMapButtonPress,
    buildPathSteps,
    buildBuildConfigurationsSteps,
    setWholePath } from './actions'
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
  pathSteps: Array<any>,
  buildPointsPath: any,
  buildBuildConfigurationsSteps: Function,
  buildConfigurationsSteps: Array<string>
  mapsAllData: Array<any>,
  setWholePath: Function,
  wholePath:any,
  mapsMetadata:any
}

const closestPolyLinePoint = function(px, py, x0, y0, x1, y1){
    function dotLineLength(x, y, x0, y0, x1, y1, o){
        function lineLength(x, y, x0, y0){
            return Math.sqrt((x -= x0) * x + (y -= y0) * y);
        }
        if(o && !(o = function(x, y, x0, y0, x1, y1){
            if(!(x1 - x0)) return {x: x0, y: y};
            else if(!(y1 - y0)) return {x: x, y: y0};
            var left, tg = -1 / ((y1 - y0) / (x1 - x0));
            return {x: left = (x1 * (x * tg - y + y0) + x0 * (x * - tg + y - y1)) / (tg * (x1 - x0) + y0 - y1), y: tg * left - tg * x + y};
        }(x, y, x0, y0, x1, y1), o.x >= Math.min(x0, x1) && o.x <= Math.max(x0, x1) && o.y >= Math.min(y0, y1) && o.y <= Math.max(y0, y1))){
            var l1 = lineLength(x, y, x0, y0), l2 = lineLength(x, y, x1, y1);
            return l1 > l2 ? l2 : l1;
        }
        else {
            var a = y0 - y1, b = x1 - x0, c = x0 * y1 - y0 * x1;
            return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
        }
    };
    for(var args = [].slice.call(arguments, 0), lines:any = []; args.length > 4; lines[lines.length] = {y1: args.pop(), x1: args.pop(), y0: args.pop(), x0: args.pop()});
    if(!lines.length)
        return {x: px, y: py};
    for(var l, i = lines.length - 1, o = lines[i],
        lower = {i: i, l: dotLineLength(px,    py, o.x0, o.y0, o.x1, o.y1, 1)};
        i--; lower.l > (l = dotLineLength(px, py,
        (o = lines[i]).x0, o.y0, o.x1, o.y1, 1)) && (lower = {i: i, l: l}));
    py < Math.min((o = lines[lower.i]).y0, o.y1) ? py = Math.min(o.y0, o.y1)
        : py > Math.max(o.y0, o.y1) && (py = Math.max(o.y0, o.y1));
    px < Math.min(o.x0, o.x1) ? px = Math.min(o.x0, o.x1)
        : px > Math.max(o.x0, o.x1) && (px = Math.max(o.x0, o.x1));
    Math.abs(o.x0 - o.x1) < Math.abs(o.y0 - o.y1) ?
        px = (py * (o.x0 - o.x1) - o.x0 * o.y1 + o.y0 * o.x1) / (o.y0 - o.y1)
        : py = (px * (o.y0 - o.y1) - o.y0 * o.x1 + o.x0 * o.y1) / (o.x0 - o.x1);
    return {x: px, y: py};
};


class app extends React.Component<Appprops,{}> {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount(){
      this.props.buildBuildConfigurationsSteps(this.props.buildPointsPath,this.props.originPoint.mapReference,this.props.destinationPoint.mapReference)
    }


 addNewNodePathPointMap(newNode:destinationPoint,pathMap:pathPoints){
    for(let keyNode in newNode.adjacentes){
        for(let keyMap in pathMap){
            let adjacentetarget = pathMap[keyMap]
            if(keyNode == adjacentetarget.id){
                adjacentetarget.adjacentes[newNode.id] = newNode.adjacentes[keyNode]
            }
        }
    }

    let final = [...pathMap, ...[newNode]]
    return final
}


    buildCompletePathSameMap(originPoint,destinationpoint){
          const mapsData = this.getmapsData(this.props.destinationPoint.mapReference)
          let originDestinationMap = this.addNewNodePathPointMap(this.props.originPoint,mapsData)
          originDestinationMap = this.addNewNodePathPointMap(this.props.destinationPoint,originDestinationMap)
          const path = this.getHolePathMap(originDestinationMap,originPoint,destinationpoint)
          return [{
              mapReference:[this.props.destinationPoint.mapReference],
              path:path
          }]
    }

    getMapsPossibleTransitions(mapsData,destinationPoint,buildConfigurationsSteps,currentMapIndex) {
        let transitionsPointsArray:any =[ ]
        for(let key in mapsData){
          const objectkey = Object.keys(mapsData[key])[0]
          const currentNodeData = mapsData[key]

          if(currentNodeData.type.indexOf("transition") != -1 && 
              currentNodeData.transitionAccess && 
              Object.keys(currentNodeData.transitionAccess).indexOf(buildConfigurationsSteps[parseInt(currentMapIndex)+1]) != -1){

            transitionsPointsArray.push(currentNodeData)
          }
          if(currentNodeData.mapReference.indexOf(destinationPoint.mapReference) != -1 ){
            transitionsPointsArray = []
            transitionsPointsArray.push(destinationPoint)
          }
        }
        return transitionsPointsArray
    }


    getClosestTransitionPath(transitionsPointsArray,currentMapData,currentOriginPoint){
        let transitionElement; 
        let currentMinPathToTransition = {path:[],cost:9000}
        for(let transitionPointIndex in transitionsPointsArray){
          const path = this.getHolePathMapWithCost(currentMapData,currentOriginPoint,transitionsPointsArray[transitionPointIndex])
          if(currentMinPathToTransition.cost > path.cost)
            currentMinPathToTransition = path;
            transitionElement = transitionsPointsArray[transitionPointIndex]
        }
        return {
            currentMinPathToTransition:currentMinPathToTransition,
            transitionElement:transitionElement
        }
    }
    buildCompletePathDiferentMap(originPoint,destinationpoint,buildConfigurationsSteps){
          let finalPath: any = []
          let currentOriginPoint = this.props.originPoint
          //corre o path geral
          for(let currentMapIndex in buildConfigurationsSteps){
            //pega a informacao do andar em questao 
            const mapsData = this.getmapsData(buildConfigurationsSteps[currentMapIndex])
            let currentMapData = this.addNewNodePathPointMap(currentOriginPoint,mapsData)
            let indexOfClosesttransition = 0
            //por cada no desse mapa verifica se ele eh uma escada
            const transitionsPointsArray = this.getMapsPossibleTransitions(mapsData,destinationpoint,buildConfigurationsSteps,currentMapIndex)
            const closestTransitionPath = this.getClosestTransitionPath(transitionsPointsArray,currentMapData,currentOriginPoint)
            const currentMinPathToTransition = closestTransitionPath.currentMinPathToTransition
            const transitionElement = closestTransitionPath.transitionElement
              //por cada escada de um andar acha qual eh a com menor distancia
            console.log("----")
            console.log(currentMinPathToTransition.path)
            finalPath = finalPath.concat({
              mapReference:buildConfigurationsSteps[currentMapIndex],
              path:currentMinPathToTransition.path,
              
            })
            const nextMapsData = this.getmapsData(buildConfigurationsSteps[parseInt(currentMapIndex)+1])
            if(nextMapsData == null ){
              return finalPath;
            }
              currentOriginPoint = this.getPointData(transitionElement.transitionAccess[buildConfigurationsSteps[parseInt(currentMapIndex)+1]], nextMapsData)
          }

    }


    componentWillReceiveProps(nextProps){
      const originPoint = this.props.originPoint;
      const destinationpoint = this.props.destinationPoint;
      
      console.log(this.props.buildConfigurationsSteps.length, nextProps.buildConfigurationsSteps.length)
      if(this.props.buildConfigurationsSteps.length != nextProps.buildConfigurationsSteps.length){
        let finalPath: any = []
        const buildConfigurationsSteps = nextProps.buildConfigurationsSteps
        if(originPoint.mapReference.indexOf(destinationpoint.mapReference) != -1){
          finalPath = this.buildCompletePathSameMap(originPoint,destinationpoint)
        } else {
          finalPath = this.buildCompletePathDiferentMap(originPoint,destinationpoint,buildConfigurationsSteps)
        }
        this.props.setWholePath(finalPath)
      }
      
    }

    getmapsData(mapsName){

      for(let key in this.props.mapsAllData){
          for(let mapId in this.props.mapsAllData[key]){
            if(mapId.indexOf(mapsName) != -1)
              return this.props.mapsAllData[key][mapId]
          }
      }
      return null
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
        console.log("PPPPPPP")
        return route.path(originPoint.id, destinationPoint.id)
    }
    getHolePathMapWithCost(pathPoints,originPoint,destinationPoint ){
        const route = new Graph()
        for(let key in pathPoints){
        route.addNode(pathPoints[key].id, pathPoints[key].adjacentes)
        }
        console.log("DDDDDDD")
        return route.path(originPoint.id, destinationPoint.id, { cost: true })
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

      getPointData(id,pathPoints){
        const items = pathPoints
        for(let key in items){
          if(items[key].id ==id){
            return items[key]
          } 
        }
        return pathPoints[0]
      }


    render(): JSX.Element {
        if(this.props.buildConfigurationsSteps.length === 0)
          return(<View/>)
        console.log(this.props.buildConfigurationsSteps,this.props.currentMapindex)
        const currentMapData = this.getmapsData(this.props.buildConfigurationsSteps[this.props.currentMapindex] )
        console.log("1",currentMapData)
        const pathOriginToDestinationCurrentMap = this.props.wholePath[this.props.currentMapindex]
        const totalMapIndex = this.props.buildConfigurationsSteps.length -1
        const mapMetadata = this.props.mapsMetadata[this.props.currentMapindex]
        console.log(mapMetadata)
        console.log("2",pathOriginToDestinationCurrentMap)
        console.log("3",totalMapIndex)
        return(
          <View style={styles.footer}>
            <View style={styles.main}>
              <RenderMap 
                mapMetadata={mapMetadata}
                currentMapData={currentMapData}
                pathOriginToDestinationCurrentMap={pathOriginToDestinationCurrentMap}
                getPointCordenates={this.getPointCordenates} 
                pathPoints={currentMapData} 
                map={image} 
                />
              </View>
            <View style={styles.footer}>
              <FooterSwapMaps 
                    currentMapindex={this.props.currentMapindex}
                    totalMapIndex={totalMapIndex}
                    mapMetadata={mapMetadata}
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
   pathSteps: state.maps.pathSteps,
   buildPointsPath: state.pointSearch.buildPointsPath,
   buildConfigurationsSteps: state.maps.buildConfigurationsSteps,
   mapsAllData: state.pointSearch.mapsAllData,
   wholePath: state.maps.wholePath,
   mapsMetadata: state.pointSearch.mapsMetadata
  });

const mapDispatchToProps = dispatch => ({
  swapNextMapButtonPress: () =>
    dispatch(swapNextMapButtonPress()),
  swapPreviousMapButtonPress: () =>
    dispatch(swapPreviousMapButtonPress()),
  buildPathSteps: (steps) =>
    dispatch(buildPathSteps(steps)),
  buildBuildConfigurationsSteps: (buildPointsPath,originPointMapReference,destinationPointMapreference) =>
    dispatch(buildBuildConfigurationsSteps(buildPointsPath,originPointMapReference,destinationPointMapreference)),
  setWholePath: (path) =>
    dispatch(setWholePath(path))

});


export default connect(mapStateToProps, mapDispatchToProps)(app);

