var {Scene, Router} = require('react-native-router-flux');
import { StyleSheet, Navigator} from 'react-native'
import React, { Component } from "react";

import ListMethods from './listMethods/index'
import QrCodeReader from './addAccount/components/qrCodeReader'
import FooterTab from './listMethods/components/footerTab'
import QrcodeInput from './addAccount/components/qrCodeInput'

export default class Routes extends React.Component <{},{}> {

  render() {
    return( 
      <Router >
        <Scene key="root"  hideNavBar={true}>
              <Scene key="ListMethods" component={ListMethods}  initial={true} />      
              <Scene key="footer" component={FooterTab}/>      
              <Scene key="QrCodeReader" component={QrCodeReader}/>
              <Scene key="QrCodeInput" component={QrcodeInput}/>
        </Scene>
      </Router>
    )
  }
}
