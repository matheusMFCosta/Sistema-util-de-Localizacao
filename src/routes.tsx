var {Scene, Router} = require('react-native-router-flux');
import { StyleSheet, Navigator} from 'react-native'
import React, { Component } from "react";

import App from './app/index'
import QrCodeReader from './pointSearch/components/qrCodeReader'
import FooterTab from './app/components/footerTab'
import OriginPoint from './pointSearch/components/originPoint'
import ShowMap from './maps/index'
import DestinationPoint from './pointSearch/components/destinationPoint'
import dev from './dev/index'

export default class Routes extends React.Component <{},{}> {

  render() {
    return( 
      <Router >
        <Scene key="root"  hideNavBar={true}>
              <Scene key="App" component={App}  initial={true} />      
              <Scene key="footer" component={FooterTab}/>      
              <Scene key="QrCodeReader" component={QrCodeReader}/>
              <Scene key="OriginPoint" component={OriginPoint}/>
              <Scene key="ShowMap" component={ShowMap} />
              <Scene key="DestinationPoint" component={DestinationPoint} />
              <Scene key="dev" component={dev}   />
              
        </Scene>
      </Router>
    )
  }
}
