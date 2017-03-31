import React from 'react'
import {  View, Image, Dimensions } from 'react-native'
var { ImageZoom } = require('react-native-image-pan-zoom');
var { Actions } = require('react-native-router-flux')
var { Line, Svg, G, Circle } = require('react-native-svg');
import { pathPoint, pathPoints, destinationPoint } from './../maps'
import { connect } from 'react-redux'



// const getPathMap = () =>{
//     return{}
// }
        const itemsList=[{
          id:"A",
          adjacentes:{ B:2, F:2 },
          x: 40,
          y: 35
        },
        {
          id:"B",
          adjacentes:{ A:2, F:4, C:5 },
          x: 95,
          y: 80
        },
        {
          id:"C",
          adjacentes:{ B:2, G:1 },
          x: 450,
          y: 22
        },
        {
          id:"D",
          adjacentes:{ G:1, F:2 },
          x: 380,
          y: 322
        },
        {
          id:"E",
          adjacentes:{ F:2 },
          x: 45 ,
          y: 255
        },
        {
          id:"F",
          adjacentes:{ E:2, A:2, B:4, D:2 },
          x: 167,
          y: 134
        },
        {
          id:"G",
          adjacentes:{ C:1, D:2 },
          x: 455,
          y: 57
        }]



const getPointCordetates = (id) => {
  for(let key in itemsList){
    console.log(itemsList[key])
    if(itemsList[key].id ==id){
      return{
        x: itemsList[key].x,
        y: itemsList[key].y,
      }
    } 
  }
  return{
        x: 0,
        y: 0,
      }
}

const DrawLines = (item) => {
  let keys: Array<string> = [];console.log(item.item)
  for(let key in item.item.adjacentes){
    
     keys.push(key)
  }
  console.log(keys)
  return(
    <G>
      {keys.map((key,index) =>{
        const cordenates = getPointCordetates(key)
        return(
              <G>
                <Circle
                  cx={cordenates.x}
                  cy={cordenates.y}
                  r="5"
                  fill="pink"
              />
                  <Line
              key={index}
              x1={item.item.x}
              y1={item.item.y}
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

export default DrawLines