import React from 'react'
import {  View, Image, Dimensions } from 'react-native'
var { ImageZoom } = require('react-native-image-pan-zoom');
var { Actions } = require('react-native-router-flux')
var { Line, Svg, G, Circle } = require('react-native-svg');
import DrawMap from './components/drawMap'
import { pathPoints } from './maps'
import { connect } from 'react-redux'
var image = require('./../../images/base/graph.png')
 const Graph = require('node-dijkstra')


interface Appprops {
  pathPoints: pathPoints
}

class app extends React.Component<Appprops,{}> {
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
    }

      getPointCordenates(id,pathPoints){
        console.log(pathPoints)
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
        return(
          <View>
            <DrawMap getPointCordenates={this.getPointCordenates} pathPoints={this.props.pathPoints} map={image} />
         </View>
        )
    }
}


const mapStateToProps = (state,ownProps) => ({
   pathPoints: state.pointSearch.pathPoints
  });

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(app);
