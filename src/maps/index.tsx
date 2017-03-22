import React from 'react'
import {  View, StyleSheet } from 'react-native'
import RenderMap from './components/renderMap'
import { pathPoints, destinationPoint, mapsData } from './maps'
import { connect } from 'react-redux'
import { 
    swapNextMapButtonPress,
    swapPreviousMapButtonPress,
    buildPathSteps,
    buildBuildConfigurationsSteps } from './actions'
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



const buildFloorPath = () =>{

}





class app extends React.Component<Appprops,{}> {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount(){
      this.props.buildBuildConfigurationsSteps(this.props.buildPointsPath,this.props.originPoint.mapReference,this.props.destinationPoint.mapReference)

    }
    componentDidMount(){
      console.log("steps",this.props.buildConfigurationsSteps)
      //this.props.buildPathbyStep()
        // const holePath = this.getHolePathMap(this.props.pathPoints,this.props.originPoint,this.props.destinationPoint)
        // console.log(holePath)
        // this.buildPathSteps(holePath,this.props.pathPoints)
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
      return(<View/>)
        // const currentMapData = this.props.mapsData[this.props.currentMapindex]
        // const pathOriginToDestinationCurrentMap = this.props.pathSteps[this.props.currentMapindex]
        // const totalMapIndex = this.props.pathSteps.length
        // return(
        //   <View style={styles.footer}>
        //     <View style={styles.main}>
        //       <RenderMap 
        //         currentMapData={currentMapData}
        //         pathOriginToDestinationCurrentMap={pathOriginToDestinationCurrentMap}
        //         getPointCordenates={this.getPointCordenates} 
        //         pathPoints={this.props.pathPoints} 
        //         map={image} 
        //         />
        //       </View>
        //     <View style={styles.footer}>
        //       <FooterSwapMaps 
        //             currentMapindex={this.props.currentMapindex}
        //             totalMapIndex={totalMapIndex}
        //             currentMapData={currentMapData}
        //             swapNextMapButtonPress={this.props.swapNextMapButtonPress}
        //             swapPreviousMapButtonPress={this.props.swapPreviousMapButtonPress}
        //       />
        //     </View>
        //  </View>
        // )
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
   buildConfigurationsSteps: state.maps.buildConfigurationsSteps
   
  });

const mapDispatchToProps = dispatch => ({
  swapNextMapButtonPress: () =>
    dispatch(swapNextMapButtonPress()),
  swapPreviousMapButtonPress: () =>
    dispatch(swapPreviousMapButtonPress()),
  buildPathSteps: (steps) =>
    dispatch(buildPathSteps(steps)),
  buildBuildConfigurationsSteps: (buildPointsPath,originPointMapReference,destinationPointMapreference) =>
    dispatch(buildBuildConfigurationsSteps(buildPointsPath,originPointMapReference,destinationPointMapreference))

});


export default connect(mapStateToProps, mapDispatchToProps)(app);

