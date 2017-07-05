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
            "id":"A-CCET5",
            "buildingReference":"ccet",
            "adjacentes":{ "B-CCET5":2, "K-CCET5":1 },
            "mapReference":"ccet5",
            "type":"path",
            "x": 310,
            "y": 420
        },
        {
            "id":"B-CCET5",
            "buildingReference":"ccet",
            "adjacentes":{ "A-CCET5":2,"C-CCET5":1,"D-CCET5":2 },
            "mapReference":"ccet5",
            "type":"path",
            "x": 180,
            "y": 420
        },
        {
            "id":"C-CCET5",
            "buildingReference":"ccet",
            "adjacentes":{ "B-CCET5":1 },
            "mapReference":"ccet5",
            "type":"path",
            "x": 180,
            "y": 450
        },
        {
            "id":"D-CCET5",
            "buildingReference":"ccet",
            "adjacentes":{ "B-CCET5":1,"E-CCET5":5 },
            "mapReference":"ccet5",
            "type":"path",
            "x": 130,
            "y": 420
        },
        {
            "id":"E-CCET5",
            "buildingReference":"ccet",
            "adjacentes":{ "D-CCET5":5},
            "mapReference":"ccet5",
            "type":"path",
            "x": 130,
            "y": 160
        },
        {
            "id":"F-CCET5",
            "buildingReference":"ccet",
            "adjacentes":{ "A-CCET5":3,"G-CCET5":6,"J-CCET5":2},
            "mapReference":"ccet5",
            "type":"path",
            "x": 520,
            "y": 420
        },
        {
            "id":"G-CCET5",
            "buildingReference":"ccet",
            "adjacentes":{ "F-CCET5":6,"H-CCET5":2},
            "mapReference":"ccet5",
            "type":"path",
            "x": 520,
            "y": 60
        },
        {
            "id":"H-CCET5",
            "buildingReference":"ccet",
            "adjacentes":{ "G-CCET5":2,"I-CCET5":7},
            "mapReference":"ccet5",
            "type":"path",
            "x": 620,
            "y": 60
        },
        {
            "id":"I-CCET5",
            "buildingReference":"ccet",
            "adjacentes":{ "H-CCET5":7,"J-CCET5":2},
            "mapReference":"ccet5",
            "type":"path",
            "x": 620,
            "y": 480
        },
        {
            "id":"J-CCET5",
            "buildingReference":"ccet",
            "adjacentes":{ "F-CCET5":1,"I-CCET5":2},
            "mapReference":"ccet5",
            "type":"path",
            "x": 520,
            "y": 480
        },
        {
            "id":"K-CCET5",
            "buildingReference":"ccet",
            "adjacentes":{ "A-CCET5":1},
            "mapReference":"ccet5",
            "type":"transition",
            "transitionAccess":{"ccet4":{"M-CCET4":3}},
            "x": 310,
            "y": 345
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
                       cropHeight={Dimensions.get('window').height-30}
                       imageWidth={724}
                       imageHeight={501}>
                    <View>
                    <Image style={{width:724, height:501,position:'absolute'}}
                          source={{uri: 'https://miex-food.herokuapp.com/ccet/images/ccet5'}}/>

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
