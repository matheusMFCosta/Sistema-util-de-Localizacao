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
  mapsAllData: Array<any>
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


 addNewNodePathPointMap(newNode:destinationPoint,pathMap:pathPoints){
    console.log("pathMap")
    for(let keyNode in newNode.adjacentes){
        for(let keyMap in pathMap){
            let adjacentetarget = pathMap[keyMap]
            if(keyNode == adjacentetarget.id){
                adjacentetarget.adjacentes[newNode.id] = newNode.adjacentes[keyNode]
            }
        }
    }

    let final = [...pathMap, ...[newNode]]
    console.log(final)
    return final
}





    componentWillReceiveProps(nextProps){
      const originPoint = this.props.originPoint;
      const destinationpoint = this.props.destinationPoint;
      //se foi calculado as rotas absolutas ( andares )
      if(this.props.buildConfigurationsSteps != nextProps.buildConfigurationsSteps){
        const buildConfigurationsSteps = nextProps.buildConfigurationsSteps
        console.log(originPoint.mapReference.indexOf(destinationpoint.mapReference) != -1)
        //se o mapa do destino e igual a origem calcula o caminho
        if(originPoint.mapReference.indexOf(destinationpoint.mapReference) != -1){

          const mapsData = this.getmapsData(this.props.destinationPoint.mapReference)
          let originDestinationMap = this.addNewNodePathPointMap(this.props.originPoint,mapsData)
          originDestinationMap = this.addNewNodePathPointMap(this.props.destinationPoint,originDestinationMap)
          const path = this.getHolePathMap(originDestinationMap,originPoint,destinationpoint)
          //se nao for igual percorre cada mapa dentro do path absoluto e calcula a rota relativa desse andar
          // depois de calculado deve ser dar appendo a rota ateh ter uma rota final 
        } else {
            let currentOriginPoint = this.props.originPoint
          //corre o path geral
          for(let  currentMapIndex in buildConfigurationsSteps){
            //pega a informacao do andar em questao 
            const mapsData = this.getmapsData(buildConfigurationsSteps[currentMapIndex])
            let currentMapData = this.addNewNodePathPointMap(currentOriginPoint,mapsData)
            //por cada no desse mapa verifica se ele eh uma escada
            for(let key in mapsData){
              const objectkey = Object.keys(mapsData[key])[0]
              const currentNodeData = mapsData[key]
              let transitionsPointsArray: any = []
              //se for igual appenda na lista de 
              if(currentNodeData.type.indexOf("transition") != -1 && currentNodeData.transitionAccess.indexOf(buildConfigurationsSteps[parseInt(currentMapIndex)+1]) != -1){
                transitionsPointsArray.push(currentNodeData)
                let currentMinPathToTransition = {path:[],cost:9000}
                for(let transitionPointIndex in transitionsPointsArray){

                  const path = this.getHolePathMapWithCost(currentMapData,currentOriginPoint,transitionsPointsArray[transitionPointIndex])
                  console.log(path)
                  if(currentMinPathToTransition.cost > path.cost)
                    currentMinPathToTransition = path;
                  
                }
                console.log(currentMinPathToTransition)
              }
            }
            
          }
        }
      }
    }

    getmapsData(mapsName){

      for(let key in this.props.mapsAllData){
          for(let mapId in this.props.mapsAllData[key]){
            if(mapId.indexOf(mapsName) != -1)
              return this.props.mapsAllData[key][mapId]
          }
      }
    }

    // calculatePath(mapsData,originPoint:destinationPoint,destinationPoint:destinationPoint){
    //   if(originPoint.mapReference.indexOf(destinationPoint.mapReference) != -1){
    //     //calculaRota
    //   }
    //   else

    // }

    
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
        console.log(pathPoints[key].id, pathPoints[key].adjacentes)
        route.addNode(pathPoints[key].id, pathPoints[key].adjacentes)
        }
        return route.path(originPoint.id, destinationPoint.id)
    }
    getHolePathMapWithCost(pathPoints,originPoint,destinationPoint ){
        const route = new Graph()
        for(let key in pathPoints){
        console.log(pathPoints[key].id, pathPoints[key].adjacentes)
        route.addNode(pathPoints[key].id, pathPoints[key].adjacentes)
        }
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
   buildConfigurationsSteps: state.maps.buildConfigurationsSteps,
   mapsAllData: state.pointSearch.mapsAllData
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

