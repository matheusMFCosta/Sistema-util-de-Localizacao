var {Scene, Router} = require('react-native-router-flux');
import { StyleSheet, Navigator} from 'react-native'
import React, { Component } from "react";

import ListMethods from './listMethods/index'
import qrCodeReader from './camera/components/qrCodeReader'


export default class Routes extends React.Component <{},{}> {

  render() {
    return( 
      <Router >
        <Scene key="root"  hideNavBar={true}>
              <Scene key="ListMethods" component={ListMethods}  initial={true} />
              <Scene key="qrCodeReader" component={qrCodeReader}/>
        </Scene>
      </Router>
    )
  }
}
