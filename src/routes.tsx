var {Scene, Router} = require('react-native-router-flux');
import { StyleSheet, Navigator} from 'react-native'
import React, { Component } from "react";

import App from './app/index'
import QrCodeReader from './pointSearch/components/qrCodeReader'
import FooterTab from './app/components/footerTab'
import QrcodeInput from './pointSearch/components/qrCodeInput'
import ShowMap from './maps/index'

export default class Routes extends React.Component <{},{}> {

  render() {
    return( 
      <Router >
        <Scene key="root"  hideNavBar={true}>
              <Scene key="App" component={App}   initial={true} />      
              <Scene key="footer" component={FooterTab}/>      
              <Scene key="QrCodeReader" component={QrCodeReader}/>
              <Scene key="QrCodeInput" component={QrcodeInput}/>
              <Scene key="ShowMap" component={ShowMap} />
        </Scene>
      </Router>
    )
  }
}
