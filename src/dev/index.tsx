import React from 'react'
import {  View, Image, Dimensions } from 'react-native'
var { ImageZoom } = require('react-native-image-pan-zoom');
var { Actions } = require('react-native-router-flux')
var { Line, Svg, G, Circle,TSpan, Text } = require('react-native-svg');
import { connect } from 'react-redux'
import { Account } from './../main/main'
import { updateAccountsCode } from './../main/actions'

// var drawing = require('pngjs-draw');
// var png = drawing(require('pngjs').PNG);
 const Graph = require('node-dijkstra')
      const route = new Graph()
      
        const itemsList=[
      {
        "id": "A-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "B-CCET2": 1,
          "F-CCET2": 2,
          "S-CCET2":1
        },
        "mapReference": "ccet2",
        "type":"transition",
        "transitionAccess":["ccet2"],
        "x": 290,
        "y": 380
      },
      {
        "id": "B-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "A-CCET2": 1,
          "C-CCET2": 2
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 170,
        "y": 380
      },
      {
        "id": "C-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "B-CCET2": 2,
          "D-CCET2": 1
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 88,
        "y": 380
      },
      {
        "id": "D-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "C-CCET2": 1,
          "E-CCET2": 1
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 88,
        "y": 282
      },
      {
        "id": "E-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "D-CCET2": 1
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 88,
        "y": 180
      },
      {
        "id": "F-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "A-CCET2": 2,
          "G-CCET2": 2
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 365,
        "y": 380
      },
      {
        "id": "G-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "H-CCET2": 2,
          "P-CCET2": 1
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 470,
        "y": 380
      },
      {
        "id": "H-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "I-CCET2": 2,
          "G-CCET2": 2
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 470,
        "y": 225
      },
      {
        "id": "I-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "J-CCET2": 1,
          "H-CCET2": 2
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 470,
        "y": 107
      },
      {
        "id": "J-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "K-CCET2": 1,
          "I-CCET2": 1
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 470,
        "y": 48
      },
      {
        "id": "K-CCET2",
        "adjacentes": {
          "J-CCET2": 1,
          "L-CCET2": 1
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 570,
        "y": 48
      },
      {
        "id": "L-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "K-CCET2": 1,
          "M-CCET2": 1
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 570,
        "y": 125
      },
      {
        "id": "M-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "L-CCET2": 1,
          "N-CCET2": 2
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 570,
        "y": 200
      },
      {
        "id": "N-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "M-CCET2": 2,
          "O-CCET2": 2
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 570,
        "y": 290
      },
      {
        "id": "O-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "N-CCET2": 2,
          "P-CCET2": 2
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 560,
        "y": 420
      },
      {
        "id": "P-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "G-CCET2": 1,
          "O-CCET2": 2,
          "Q-CCET2": 1
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 480,
        "y": 430
      },
      {
        "id": "Q-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "P-CCET2": 1,
          "R-CCET2": 1
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 480,
        "y": 480
      },
      {
        "id": "R-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "Q-CCET2": 1
        },
        "mapReference": "ccet2",
        "type":"transition",
        "transitionAccess":["ccet2"],
        "x": 547,
        "y": 472
      },
      {
        "id": "S-CCET2",
        "floorReference": 2,
        "adjacentes": {
          "A-CCET2": 1
        },
        "mapReference": "ccet2",
        "type": "path",
        "x": 290,
        "y": 320
      }
    ] 

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
        console.log(getPointCordetates(key))
        const cordenates = getPointCordetates(key)
        return(
              <G>
                <Circle
                  cx={cordenates.x}
                  cy={cordenates.y}
                  r="5"
                  fill="pink"
              ></Circle>
                <Text y={item.item.y} dx="5 5"><TSpan x={item.item.x} >{item.item.id}</TSpan></Text>
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

interface Appprops {

}

class listMethods extends React.Component<any,{}> {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount(): void {

 



      
      route.addNode('A', { B:2, F:2 })
      route.addNode('B', { A:2, F:4, C:5 })
      route.addNode('C', { B:2, G:1 })
      route.addNode('D', { G:1, F:2 })
      route.addNode('E', { F:2 })
      route.addNode('F', { E:2, A:2, B:4, D:2 })
      route.addNode('G', { C:1, D:2 })
      
      console.log(route.path('A', 'C')) // => [ 'A', 'B', 'C', 'D' ] 

      // fs.createReadStream('./../iamges/graph.png')
      // .pipe(new png({ filterType: 4 }))
      // .on('parsed', function() {
      //   // Draws a pixel with transparent green 
      //   this.drawPixel(150,200, this.colors.black())
    
      //   // Draws a line with transparent red 
      //   this.drawLine(0,0,200,200, this.colors.red(50))
    
      //   // Draws a rectangle with transparent black 
      //   this.fillRect(150,150,75,20, this.colors.black(100))
    
      //   // Draws a filled rectangle with transparent white 
      //   this.fillRect(50,50,100,100, this.colors.white(100))
    
      //   // Draws a text with custom color 
      //   this.drawText(20,20, "Hello world !", this.colors.new(255,100,10))
    
      //   // Writes file 
      //   this.pack().pipe(fs.createWriteStream('blue.out.png'));
      // });

      //this.props.timeStart()

    }


    render(): JSX.Element {



        
        return(
          <View>

          <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={683}
                       imageHeight={594}>
                    <View>
                    <Image style={{width:683, height:594,position:'absolute'}}
                          source={{uri: 'https://miex-food.herokuapp.com/ccet/images/ccet2'}}/>

                      <View style={{position:'absolute'}}>

                        <Svg 
                            height="1000"
                            width="1000"
                        >
                        {itemsList.map((key,index)=> {
                          console.log("-",key,index)
                          return(
                              <DrawLines item={key} key={index} />

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

export default connect(mapStateToProps, mapDispatchToProps)(listMethods);
