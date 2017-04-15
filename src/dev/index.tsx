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
        "id":"A-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "B-GROUND1":4 },
        "mapReference":"ground1",
        "type":"path",
        "x": 55,
        "y": 510
      },
      {
        "id":"B-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "C-GROUND1":6 },
        "mapReference":"ground1",
        "type":"path",
        "x": 55,
        "y": 363
      },
      {
        "id":"C-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "B-GROUND1":6,"D-GROUND1": 2 },
        "mapReference":"ground1",
        "type":"path",
        "x": 378,
        "y": 363
      },
      {
        "id":"D-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "C-GROUND1":2,"E-GROUND1": 1, "L-GROUND1": 2 },
        "mapReference":"ground1",
        "type":"transition",
        "transitionAccess":{"ccet1":{"A-CCET1":3}},
        "x": 378,
        "y": 550
      },
      {
        "id":"E-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "D-GROUND1":1,"F-GROUND1": 2, "I-GROUND1": 2 },
        "mapReference":"ground1",
        "type":"path",
        "x": 378,
        "y": 220
      },
      {
        "id":"F-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "E-GROUND1":2,"G-GROUND1": 2 },
        "mapReference":"ground1",
        "type":"path",
        "x": 475,
        "y": 190
      },
      {
        "id":"G-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "F-GROUND1":2,"H-GROUND1": 3 },
        "mapReference":"ground1",
        "type":"transition",
        "transitionAccess":{"cch1":{"A-CCH1":2}},
        "x": 565,
        "y": 190
      },
      {
        "id":"H-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "G-GROUND1":3,"K-GROUND1": 1, "O-GROUND1":2 },
        "mapReference":"ground1",
        "type":"path",
        "x": 820,
        "y": 190
      },
      {
        "id":"I-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "E-GROUND1":2,"J-GROUND1": 2 },
        "mapReference":"ground1",
        "type":"path",
        "x": 475,
        "y": 220
      },
      {
        "id":"J-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "I-GROUND1":2,"G-GROUND1": 1,"M-GROUND1": 1,"K-GROUND1": 3 },
        "mapReference":"ground1",
        "type":"path",
        "x": 565,
        "y": 220
      },
      {
        "id":"K-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "H-GROUND1": 1,"J-GROUND1":3,"N-GROUND1": 1 },
        "mapReference":"ground1",
        "type":"path",
        "x": 820,
        "y": 220
      },      
      {
        "id":"L-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "D-GROUND1": 2,"M-GROUND1":2},
        "mapReference":"ground1",
        "type":"path",
        "x": 475,
        "y": 260
      },
      {
        "id":"M-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "L-GROUND1": 2,"J-GROUND1":1,"N-GROUND1":3},
        "mapReference":"ground1",
        "type":"path",
        "x": 560,
        "y": 260
      },
      {
        "id":"N-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "M-GROUND1": 3,"K-GROUND1":1},
        "mapReference":"ground1",
        "type":"path",
        "x": 820,
        "y": 260
      },
      {
        "id":"O-GROUND1",
        "buildingReference":"ground",
        "adjacentes":{ "H-GROUND1": 3},
        "mapReference":"ground1",
        "type":"path",
        "x": 820,
        "y": 100
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
                       imageWidth={864}
                       imageHeight={540}>
                    <View>
                    <Image style={{width:864, height:540,position:'absolute'}}
                          source={{uri: 'https://miex-food.herokuapp.com/ground/images/ground1'}}/>

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
