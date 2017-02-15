import React from 'react'
import {  View, Image, Dimensions } from 'react-native'
var { ImageZoom } = require('react-native-image-pan-zoom');
var { Actions } = require('react-native-router-flux')
var { Line, Svg, G, Circle } = require('react-native-svg');
import { teste, changeAddCodeFooterStatus } from './actions'
import { connect } from 'react-redux'
import { Account } from './../main/main'
import { updateAccountsCode } from './../main/actions'
import { timeStart, timeStop } from './actions'
import  Navbar  from './components/navbar'
import AccountCards from './components/accountCards'
import FooterTab from './components/footerTab'
// var fs = require('fs');
// var drawing = require('pngjs-draw');
// var png = drawing(require('pngjs').PNG);
 const Graph = require('node-dijkstra')
      const route = new Graph()
      
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
        console.log(getPointCordetates(key))
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



                const items=[{
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
        
        return(
          <View>

          <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={580}
                       imageHeight={400}>
                    <View>
                    <Image style={{width:580, height:400,position:'absolute'}}
                          source={require('./../../images/base/graph.png')}/>

                      <View style={{position:'absolute'}}>

                        <Svg 
                            height="800"
                            width="800"
                        >
                        {items.map((key,index)=> {
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
