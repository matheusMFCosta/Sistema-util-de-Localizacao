var {Scene, Router} = require('react-native-router-flux');
import { StyleSheet, Navigator} from 'react-native'
import React, { Component } from "react";
import ListMethods from './listMethods/index'


export default class Routes extends React.Component <{},{}> {

  render() {
    return( 
      <Router >
        <Scene key="root"  hideNavBar={true}>
              <Scene key="ListMethods" component={ListMethods} initial={true} />
        </Scene>
      </Router>
    )
  }
}
