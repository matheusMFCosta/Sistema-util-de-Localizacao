var {Scene, Router} = require('react-native-router-flux');
import { StyleSheet, Navigator} from 'react-native'
import React, { Component } from "react";
import App from './App'
import App1 from './App.1'
import NavBer from './navbar'

export default class Routes extends React.Component <{},{}> {

  render() {
    return( 
      <Router >
        <Scene key="root"  hideNavBar={true}>
              <Scene key="app" component={App}  />
              <Scene key="app1" component={App1} initial={true} />
        </Scene>
      </Router>
    )
  }
}

        // <Scene key="login" component={Login} title="Login"/>
        // <Scene key="register" component={Register} title="Register"/>
        // <Scene key="home" component={Home}/>

    

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red', // changing navbar color
  },
  navTitle: {
    color: 'white', // changing navbar title color
  },
  routerScene: {
    paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight, // some navbar padding to avoid content overlap
  },
})