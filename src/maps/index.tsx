import React from 'react'
import {  View, StyleSheet } from 'react-native'
import RenderMap from './components/renderMap'
import { pathPoints, destinationPoint, mapsData, pathPoint } from './maps'
import { connect } from 'react-redux'
import { 
    swapNextMapButtonPress,
    swapPreviousMapButtonPress,
    buildPathSteps,
    buildBuildConfigurationsSteps,
    setWholePath,
    setMapPathOrder } from './actions'
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
  mapsMetadata:any,
  structureNames: Array<string>,
  setMapPathOrder: Function,
  mapsPathOrder: Array<string>
}

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
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


      // const pathPoints = action.payload.pathPoints
  // var keys:any = [];
  //     for(let k in destinationPoint.adjacentes) keys.push(k);
  // if(keys.length <= 1){
  //   yield put(actions.setDestinationPointSuccess(destinationPoint))
    
  // } else {
  //     const firtPoint = getPointCordenates(keys[0],pathPoints)
  //     const secondPoint = getPointCordenates(keys[1],pathPoints)
  //     const currentPoint = {x:destinationPoint.x , y:destinationPoint.y}
  //     const closestPointsData = closestPoint(
  //         currentPoint.x,currentPoint.y,
  //         firtPoint.x,firtPoint.y,
  //         secondPoint.x,secondPoint.y
  //       )
      
  //     let adjacentes = destinationPoint.adjacentes
  //     adjacentes[destinationPoint.id]=1;
  //     const closestPointDefiner ={  
  //       id: destinationPoint.id+"-Temp",
  //       adjacentes: adjacentes,
  //       description: "parcial",
  //       mapReference:destinationPoint.mapReference,
  //       x: closestPointsData.x,
  //       y: closestPointsData.y
  //   }
  //   let json = {}
  //   json[destinationPoint.id+'-Temp'] = 1
  //   destinationPoint.adjacentes = json



    componentWillMount(){
      //this.props.buildBuildConfigurationsSteps(this.props.buildPointsPath,this.props.originPoint.mapReference,this.props.destinationPoint.mapReference)
      this.calculateHolePath()
    }

    calculateHolePath(){
      let minimizedGraph = [];
      const { originPoint, destinationPoint, mapsAllData} = this.props
      let tempNodes:any = [];
      if(originPoint.mapReference.indexOf(destinationPoint.mapReference) != -1){
          const route = new Graph()
          console.log("111")
          const sameFlorMapOrigin = this.addNewNodePathPointMap2(originPoint,this.getmapsData(originPoint.mapReference))
          const sameFlorMapOriginAndDestination = this.addNewNodePathPointMap2(destinationPoint, sameFlorMapOrigin["pathPoints"])
          tempNodes.push(sameFlorMapOrigin["tempNode"]) 
          tempNodes.push(sameFlorMapOriginAndDestination["tempNode"]) 
          //this.addNewNodePathPointMap2(originPoint,this.getmapsData(originPoint.mapReference)))
          console.log("-----2----", tempNodes)
          for(let key in sameFlorMapOriginAndDestination["pathPoints"]){
            const currentNode = sameFlorMapOriginAndDestination["pathPoints"][key]
            route.addNode(currentNode.id, currentNode.adjacentes)
            }
            console.log(route)
            minimizedGraph = route.path(originPoint.id, destinationPoint.id)
            console.log("---4",minimizedGraph)
      } else {
        if(originPoint.buildingReference.indexOf(destinationPoint.buildingReference) != -1){
            console.log("222")
            const buildGraphObject = this.buildBuildingGraph(mapsAllData,destinationPoint.buildingReference,[originPoint,destinationPoint])
            const route:any = buildGraphObject.route
            tempNodes = buildGraphObject.tempNode
            console.log(buildGraphObject)
            console.log(route,tempNodes)
            minimizedGraph = route.path(originPoint.id, destinationPoint.id)
            console.log(minimizedGraph)
        } else {
          /* -------------------------------- aqui * ------------------------------*/
          minimizedGraph = [];
          for(let key in this.props.structureNames){
            
            const currentStructureName = this.props.structureNames[key]
            if(currentStructureName.indexOf(originPoint.buildingReference) != -1){
              const buildGraphObject = this.buildBuildingGraph(mapsAllData,currentStructureName,[originPoint])
              const route = buildGraphObject.route
              if(buildGraphObject.tempNode)tempNodes = tempNodes.concat(buildGraphObject.tempNode)
              console.log("BUILDOBJECT1",buildGraphObject)
              for(let mapindex in mapsAllData){
              
              const mapJsonName = Object.keys(mapsAllData[mapindex])[0]
              let currentMapPathPoints = mapsAllData[mapindex][mapJsonName]           


              if(mapJsonName.indexOf(currentStructureName) != -1){

                //para todos os pontos do mapa atual

                for(let nodeIndex in currentMapPathPoints){
                  const currentTransitionAccess = currentMapPathPoints[nodeIndex].transitionAccess
                  // se tiver um transitionAccess para algum outro andar ou para fora do predio deve se levar em consideracao
                  // para o casa da contrucao do mesmo predio queremos inserir na arvore somente unioes para o mesmo predio
                  if(currentTransitionAccess){
                    const transitionAccessKeys = Object.keys(currentTransitionAccess)
                    //para todas as possiveis transitionAccess
                    for(let index in transitionAccessKeys){
                      const transitionAccessKey = transitionAccessKeys[index]
                      //verifica se o transitionAccess eh para o mesmo predio se sim faz um enlace entre os nos dos andares
                      if(this.getMapMetaData(transitionAccessKey).buildingReference.indexOf(currentStructureName) == -1 ){    
                        const path = route.path(originPoint.id, currentMapPathPoints[nodeIndex].id)           
                        if(path != null)
                          minimizedGraph = minimizedGraph.concat(path)
                      }

                    }
                  }

                }
              } 
              
            } 
            continue; 
            //route = this.buildBuildingGraph(mapsAllData,currentStructureName,[originPoint])
            } 

            if(currentStructureName.indexOf(destinationPoint.buildingReference) != -1){
              const buildGraphObject = this.buildBuildingGraph(mapsAllData,currentStructureName,[destinationPoint])
              const route = buildGraphObject.route
              if(buildGraphObject.tempNode) tempNodes =  tempNodes.concat(buildGraphObject.tempNode)
              console.log("BUILDOBJECT2",buildGraphObject)
              for(let mapindex in mapsAllData){
              
              const mapJsonName = Object.keys(mapsAllData[mapindex])[0]
              let currentMapPathPoints = mapsAllData[mapindex][mapJsonName]           


              if(mapJsonName.indexOf(currentStructureName) != -1){

                //para todos os pontos do mapa atual

                for(let nodeIndex in currentMapPathPoints){
                  const currentTransitionAccess = currentMapPathPoints[nodeIndex].transitionAccess
                  // se tiver um transitionAccess para algum outro andar ou para fora do predio deve se levar em consideracao
                  // para o casa da contrucao do mesmo predio queremos inserir na arvore somente unioes para o mesmo predio
                  if(currentTransitionAccess){
                    const transitionAccessKeys = Object.keys(currentTransitionAccess)
                    //para todas as possiveis transitionAccess
                    for(let index in transitionAccessKeys){
                      const transitionAccessKey = transitionAccessKeys[index]
                      //verifica se o transitionAccess eh para o mesmo predio se sim faz um enlace entre os nos dos andares
                      if(this.getMapMetaData(transitionAccessKey).buildingReference.indexOf(currentStructureName) == -1 ){    
                        const path = route.path(currentMapPathPoints[nodeIndex].id, destinationPoint.id)           
                        if(path != null)
                          minimizedGraph = minimizedGraph.concat(path)
                      }

                    }
                  }

                }
              } 
              
            } 
            continue; 
            //route = this.buildBuildingGraph(mapsAllData,currentStructureName,[originPoint])
            } 

              const buildGraphObject = this.buildBuildingGraph(mapsAllData,currentStructureName,[])
              const route = buildGraphObject.route
              console.log("BUILDOBJECT3",buildGraphObject)
              for(let mapindex in mapsAllData){
              
              const mapJsonName = Object.keys(mapsAllData[mapindex])[0]
              let currentMapPathPoints = mapsAllData[mapindex][mapJsonName]           


              if(mapJsonName.indexOf(currentStructureName) != -1){

                //para todos os pontos do mapa atual

                for(let nodeIndex in currentMapPathPoints){
                  const currentNodeOrigin = currentMapPathPoints[nodeIndex]
                  const currentTransitionAccess = currentMapPathPoints[nodeIndex].transitionAccess
                  // se tiver um transitionAccess para algum outro andar ou para fora do predio deve se levar em consideracao
                  // para o casa da contrucao do mesmo predio queremos inserir na arvore somente unioes para o mesmo predio
                  if(currentTransitionAccess){
                    const transitionAccessKeys = Object.keys(currentTransitionAccess)
                    //para todas as possiveis transitionAccess
                    for(let index in transitionAccessKeys){
                      const transitionAccessKeyOrigin = transitionAccessKeys[index]
                      //verifica se o transitionAccess eh para o mesmo predio se sim faz um enlace entre os nos dos andares
                      if(this.getMapMetaData(transitionAccessKeyOrigin).buildingReference.indexOf(currentStructureName) == -1 ){
                        /*--------------------*/
                        for(let nodeIndex in currentMapPathPoints){
                          const currentTransitionAccess = currentMapPathPoints[nodeIndex].transitionAccess
                          // se tiver um transitionAccess para algum outro andar ou para fora do predio deve se levar em consideracao
                          // para o casa da contrucao do mesmo predio queremos inserir na arvore somente unioes para o mesmo predio
                          if(currentTransitionAccess){
                            const currentNodeDestination = currentMapPathPoints[nodeIndex]
                            const transitionAccessKeys = Object.keys(currentTransitionAccess)
                            //para todas as possiveis transitionAccess
                            for(let index in transitionAccessKeys){
                              const transitionAccessKeyOrigin = transitionAccessKeys[index]
                              //verifica se o transitionAccess eh para o mesmo predio se nao faz um enlace entre os nos dos andares
                              if(this.getMapMetaData(transitionAccessKeyOrigin).buildingReference.indexOf(currentStructureName) == -1 ){
                                const path = route.path(currentNodeOrigin.id, currentNodeDestination.id)           
                                if(path != null)
                                  minimizedGraph = minimizedGraph.concat(path)
                              }

                            }
                          }
                         }
                        // console.log(route)
                        // console.log(currentMapPathPoints[nodeIndex].id)
                        // console.log("!!!!!",route.path(originPoint.id, currentMapPathPoints[nodeIndex].id))     
                        // const path = route.path(originPoint.id, currentMapPathPoints[nodeIndex].id)           
                        // minimizedGraph.concat(path)
                      }

                    }
                  }

                }
              } 
            }  
     
            
            //const route = this.buildBuildingGraph(mapsAllData,currentStructureName,[])
            
          }


        }
      }
          const nameArray = arrayUnique(minimizedGraph)
          console.log(nameArray)
          const pathArray = this.getWholePath(nameArray,tempNodes)
          console.log("TEMNODES",tempNodes)
          console.log(pathArray)

          const objectArray = this.convertNodeNameArrayToObjectArray(pathArray.finalPath,tempNodes)
          console.log(objectArray)
          const objectDictionary = this.convertArrayObjectToDictionary(objectArray)
          console.log(objectDictionary)
          this.props.setWholePath(objectDictionary)
          console.log("setWholePath")

          this.props.setMapPathOrder(pathArray.mapOrtder)
          console.log("setMapPathOrder")
    }

    convertArrayObjectToDictionary(objectArray){
      let currentMapName = ""
      let finalDictionary = {}

      for(let key in objectArray){
        const currentObject = objectArray[key]
        if(currentMapName.indexOf(currentObject.mapReference) == -1){
          finalDictionary[currentObject.mapReference] = [currentObject]
          currentMapName = currentObject.mapReference
        } else {
          finalDictionary[currentObject.mapReference] = finalDictionary[currentObject.mapReference].concat(currentObject)
        }
      }
      return finalDictionary
    }


    getWholePath(NameArray,tempNodes){
      console.log("TEMPOOO",tempNodes)
      let objectArray = []
      let allNodesArray: any = []
      let AllNodeDictonary = {}
      const route = new Graph()
      AllNodeDictonary[this.props.originPoint.id] = this.props.originPoint
      for(let key in this.props.mapsAllData){
            const mapsAllData = this.props.mapsAllData[key]
            const currentNodeArray = mapsAllData[Object.keys(mapsAllData)[0]]
            allNodesArray = allNodesArray.concat(currentNodeArray)
            for(let currentNode in allNodesArray){
              AllNodeDictonary[allNodesArray[currentNode].id] = allNodesArray[currentNode]
            }
      }
      
      AllNodeDictonary[this.props.destinationPoint.id] = this.props.destinationPoint
      for(let key in tempNodes){
        const currentNode = tempNodes[key]
        console.log(currentNode)
        console.log(tempNodes,key)
        if(currentNode.id.indexOf("-Temp")){
          const referenceName = currentNode.id.split('-');
          AllNodeDictonary[currentNode.id] = currentNode
        }
      }
      console.log("Dictionary",AllNodeDictonary)
      for(let key in AllNodeDictonary){
          let adjacentes = AllNodeDictonary[key].adjacentes
          const currentTransitionAccess = AllNodeDictonary[key].transitionAccess;
          
          if(currentTransitionAccess){
            const transitionAccessKeys = Object.keys(currentTransitionAccess)
            //para todas as possiveis transitionAccess
            for(let index in transitionAccessKeys){
              const transitionAccessKey = transitionAccessKeys[index]
              //verifica se o transitionAccess eh para o mesmo predio se sim faz um enlace entre os nos dos andares
                const transitionAdjacenteKeys = Object.keys(currentTransitionAccess[transitionAccessKey])
                for(let transitionAdjacenteIndex in currentTransitionAccess[transitionAccessKey]){
                  const transitionAdjacente = currentTransitionAccess[transitionAccessKey][transitionAdjacenteIndex]
                  adjacentes[transitionAdjacenteIndex] = transitionAdjacente
                }
            }
          }


          route.addNode(AllNodeDictonary[key].id, adjacentes)
      }
      
      const finalPath = route.path(this.props.originPoint.id, this.props.destinationPoint.id)
      let currentMap = ""
      const mapOrtder: any =[]
      for(let key in finalPath){
        const currentNodeName = finalPath[key]
        if(currentMap.indexOf(AllNodeDictonary[currentNodeName].mapReference) == -1){
          currentMap = AllNodeDictonary[currentNodeName].mapReference;
          mapOrtder.push(currentMap)
        }
      }  
      return {
      finalPath: finalPath,
      mapOrtder: mapOrtder
      }

    }

    convertNodeNameArrayToObjectArray(NameArray,tempNodes){
      let objectArray = []
      let allNodesArray: any = []
      let AllNodeDictonary = {}
      AllNodeDictonary[this.props.originPoint.id] = this.props.originPoint
      for(let key in this.props.mapsAllData){
            const mapsAllData = this.props.mapsAllData[key]
            const currentNodeArray = mapsAllData[Object.keys(mapsAllData)[0]]
            allNodesArray = allNodesArray.concat(currentNodeArray)
            for(let currentNode in allNodesArray){
              AllNodeDictonary[allNodesArray[currentNode].id] = allNodesArray[currentNode]
            }
      }
      for(let key in tempNodes){
        const currentNode = tempNodes[key]
        console.log(currentNode)
        console.log(tempNodes,key)
        if(currentNode.id.indexOf("-Temp")){
          const referenceName = currentNode.id.split('-');
          AllNodeDictonary[currentNode.id] = currentNode
        }
      }
      AllNodeDictonary[this.props.destinationPoint.id] = this.props.destinationPoint
      for(let key in NameArray){
          const currentNodeName = NameArray[key]
          objectArray = objectArray.concat(AllNodeDictonary[currentNodeName])
      }
      return objectArray

    }

    getMapMetaData(mapsName){
      for(let key in this.props.mapsMetadata){
            const currnteMapsMetadata = this.props.mapsMetadata[key]
            if(currnteMapsMetadata.name.indexOf(mapsName) != -1)
              return currnteMapsMetadata
      }
      return null
    }

    buildBuildingGraph(mapsAllData,buildingName,insertPoints){
      console.log(insertPoints)
      const route = new Graph()
      let tempNode:any = [];
      for(let mapindex in mapsAllData){
      
      const mapJsonName = Object.keys(mapsAllData[mapindex])[0]
      let currentMapPathPoints = mapsAllData[mapindex][mapJsonName]           

      //insere os pontos de destino e origem se estiverem no current map 
      for(let insertpointIndex in insertPoints){
          console.log(mapJsonName.indexOf(insertPoints[insertpointIndex].mapReference) != -1)
          console.log(mapJsonName,insertPoints[insertpointIndex].mapReference)
          if(mapJsonName.indexOf(insertPoints[insertpointIndex].mapReference) != -1){
            console.log(insertPoints[insertpointIndex],currentMapPathPoints)
            const addNodeObject = this.addNewNodePathPointMap2(insertPoints[insertpointIndex],currentMapPathPoints)
            currentMapPathPoints = addNodeObject["pathPoints"];
            if(addNodeObject["tempNode"]) tempNode.push(addNodeObject["tempNode"])
            console.log(currentMapPathPoints,tempNode)
            console.log(addNodeObject)
          }
      }

      if(mapJsonName.indexOf(buildingName) != -1){
        let adjacentes;
        //para todos os pontos do mapa atual
        for(let nodeIndex in currentMapPathPoints){
          adjacentes = currentMapPathPoints[nodeIndex].adjacentes;
          const currentTransitionAccess = currentMapPathPoints[nodeIndex].transitionAccess
          // se tiver um transitionAccess para algum outro andar ou para fora do predio deve se levar em consideracao
          // para o casa da contrucao do mesmo predio queremos inserir na arvore somente unioes para o mesmo predio
          if(currentTransitionAccess){
            const transitionAccessKeys = Object.keys(currentTransitionAccess)
            //para todas as possiveis transitionAccess
            for(let index in transitionAccessKeys){
              const transitionAccessKey = transitionAccessKeys[index]
              //verifica se o transitionAccess eh para o mesmo predio se sim faz um enlace entre os nos dos andares
              if(this.getMapMetaData(transitionAccessKey).buildingReference.indexOf(buildingName) != -1 ){
                const transitionAdjacenteKeys = Object.keys(currentTransitionAccess[transitionAccessKey])
                for(let transitionAdjacenteIndex in currentTransitionAccess[transitionAccessKey]){
                  const transitionAdjacente = currentTransitionAccess[transitionAccessKey][transitionAdjacenteIndex]
                  adjacentes[transitionAdjacenteIndex] = transitionAdjacente
                }
                
              }

            }
          }
          console.log(currentMapPathPoints[nodeIndex].id, adjacentes)
          route.addNode(currentMapPathPoints[nodeIndex].id, adjacentes)
        }
        
          }
        }
        console.log(route,tempNode)
        return {route: route, tempNode:tempNode}
    }
    //  getHolePathMap(pathPoints,originPoint,destinationPoint ): Array<string>{
    //     const route = new Graph()
    //     for(let key in pathPoints){
    //     route.addNode(pathPoints[key].id, pathPoints[key].adjacentes)
    //     }
    //     console.log("PPPPPPP")
    //     return route.path(originPoint.id, destinationPoint.id)
    // }
  



      // const pathPoints = action.payload.pathPoints
  // var keys:any = [];
  //     for(let k in destinationPoint.adjacentes) keys.push(k);
  // if(keys.length <= 1){
  //   yield put(actions.setDestinationPointSuccess(destinationPoint))
    
  // } else {
  //     const firtPoint = getPointCordenates(keys[0],pathPoints)
  //     const secondPoint = getPointCordenates(keys[1],pathPoints)
  //     const currentPoint = {x:destinationPoint.x , y:destinationPoint.y}
  //     const closestPointsData = closestPoint(
  //         currentPoint.x,currentPoint.y,
  //         firtPoint.x,firtPoint.y,
  //         secondPoint.x,secondPoint.y
  //       )
      
  //     let adjacentes = destinationPoint.adjacentes
  //     adjacentes[destinationPoint.id]=1;
  //     const closestPointDefiner ={  
  //       id: destinationPoint.id+"-Temp",
  //       adjacentes: adjacentes,
  //       description: "parcial",
  //       mapReference:destinationPoint.mapReference,
  //       x: closestPointsData.x,
  //       y: closestPointsData.y
  //   }
  //   let json = {}
  //   json[destinationPoint.id+'-Temp'] = 1
  //   destinationPoint.adjacentes = json




 addNewNodePathPointMap2(newNode:destinationPoint,pathMap:pathPoints){
   var keys:any = [];
   let newNodes: any = [];
    for(let k in newNode.adjacentes) keys.push(k);
      if(keys.length <= 1){
        return { pathPoints: this.addNewNodePathPointMap(newNode,pathMap), tempNode:  null }
      } else {
          const firtPoint = this.getPointCordenates(keys[0],pathMap)
          const secondPoint = this.getPointCordenates(keys[1],pathMap)
          const currentPoint = {x:newNode.x , y:newNode.y}
          const closestPointsData = closestPolyLinePoint(
              currentPoint.x,currentPoint.y,
              firtPoint.x,firtPoint.y,
              secondPoint.x,secondPoint.y
            )    
          let adjacentes = newNode.adjacentes
          adjacentes[newNode.id]=1;
          const closestPointDefiner ={  
            id: newNode.id+"-Temp",
            adjacentes: adjacentes,
            description: "parcial",
            mapReference:newNode.mapReference,
            buildingReference: newNode.buildingReference,
            type:"temp",
            x: closestPointsData.x,
            y: closestPointsData.y
        }
        let json = {}
        json[newNode.id+'-Temp'] = 0.5
        newNode.adjacentes = json
        newNodes = [newNode,closestPointDefiner]
        const currentPathMap = this.addNewNodePathPointMap(closestPointDefiner,pathMap)
        console.log("TEEEMp",closestPointDefiner)
        return { pathPoints:this.addNewNodePathPointMap(newNode,currentPathMap) , tempNode: closestPointDefiner}
      }

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
        return route.path(originPoint.id, destinationPoint.id)
    }
    getHolePathMapWithCost(pathPoints,originPoint,destinationPoint ){
        const route = new Graph()
        for(let key in pathPoints){
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
        if(this.props.mapsPathOrder.length === 0)
          return(<View/>)
        const mapsPathOrder = this.props.mapsPathOrder
        const mapNameIndex = this.props.currentMapindex
        const mapName = mapsPathOrder[mapNameIndex]
        const totalMapIndex = mapsPathOrder.length
        const mapMetadata = this.getMapMetaData(mapName)
        // const currentMapData = this.getmapsData(mapsPathOrder[mapNameIndex] )
        const pathOriginToDestinationCurrentMap = this.props.wholePath[mapName]
        
        
        // console.log("-----222222---",mapsPathOrder)
        // console.log(mapName)
        // console.log(this.props.wholePath)
        // console.log(mapMetadata)
        // console.log(currentMapData)
        // console.log(pathOriginToDestinationCurrentMap)
        // console.log(totalMapIndex)
        // console.log(mapMetadata)
        return(
          <View style={styles.footer}>
            <View style={styles.main}>
              <RenderMap 
                destinationPoint={this.props.destinationPoint}
                mapMetadata={mapMetadata}
                pathOriginToDestinationCurrentMap={pathOriginToDestinationCurrentMap}
                getPointCordenates={this.getPointCordenates} 
                currentMapName={mapName}
                totalMapIndex={totalMapIndex}
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
   mapsMetadata: state.pointSearch.mapsMetadata,
   structureNames: state.pointSearch.structureNames,
   mapsPathOrder: state.maps.mapsPathOrder
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
    dispatch(setWholePath(path)),
  setMapPathOrder: (pathOrder) => 
    dispatch(setMapPathOrder(pathOrder))

});


export default connect(mapStateToProps, mapDispatchToProps)(app);

