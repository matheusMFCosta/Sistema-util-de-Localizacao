import React from 'react'
import {  View, Image, Dimensions } from 'react-native'
var { ImageZoom } = require('react-native-image-pan-zoom');
var { Actions } = require('react-native-router-flux')
var { Line, Svg } = require('react-native-svg');
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
interface Appprops {
    teste: Function,
    showAddCodeFooter: string,
    seconds: number,
    accountList: Array<Account>,
    changeAddCodeFooterStatus: Function,
    timeStart: Function,
    changeAccountCode: Function

}

class listMethods extends React.Component<any,{}> {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount(): void {

 
      const route = new Graph()
      
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

    componentWillUnmount(): void {
      this.props.timeStop()
    }

    render(): JSX.Element {
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
                            height="580"
                            width="400"
                        >
                            <Line
                                x1="2"
                                y1="0"
                                x2="580"
                                y2="0"
                                stroke="red"
                                strokeWidth="2"
                            />
                            <Line
                                x1="0"
                                y1="0"
                                x2="580"
                                y2="400"
                                stroke="red"
                                strokeWidth="2"
                            />
                        </Svg>
                      </View >

                    </View>
              </ImageZoom>

      </View>
        )
        //  return (
        //   <View style={{flex: 1, flexDirection: 'column'}}>
        //     <View >
        //         <Navbar changeAddCodeFooterStatus={()=> this.props.changeAddCodeFooterStatus(true)} />
        //     </View>
        //     <View style={{flex: 1, flexDirection: 'column'}}>
        //         <AccountCards 
        //           updateAccountsCode={this.props.updateAccountsCode}
        //           accountList={this.props.accountList} 
        //           seconds={this.props.seconds} />
        //     </View >
        //     <View style={{flex: 1, flexDirection: 'column'}}>
        //         <FooterTab 
        //             openCamera={Actions.QrCodeReader} 
        //             showAddCodeFooter={this.props.showAddCodeFooter}
        //             changeAddCodeFooterStatus={() => this.props.changeAddCodeFooterStatus(false)} />
        //     </View>
        //  </View>
        // );
    }
}



const mapStateToProps = (state,ownProps) => ({
    showAddCodeFooter: state.listMethods.showAddCodeFooter,
    seconds: state.listMethods.seconds,
    accountList: state.main.accountList
  });

const mapDispatchToProps = dispatch => ({
  teste: () =>
    dispatch(teste(true)),
  changeAddCodeFooterStatus: (status:boolean) =>
    dispatch(changeAddCodeFooterStatus(status)),
  timeStart: () =>
    dispatch(timeStart()),
  timeStop: () =>
    dispatch(timeStop()),
  updateAccountsCode: () =>
    dispatch(updateAccountsCode())

});

export default connect(mapStateToProps, mapDispatchToProps)(listMethods);
