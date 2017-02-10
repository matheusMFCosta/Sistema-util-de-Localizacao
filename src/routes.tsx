var {Scene, Router} = require('react-native-router-flux');
import React, { Component } from "react";
import App from './App'

export default class Routes extends React.Component <{},{}> {
  render() {
    return( 
      <Router>
        <Scene key="root" >
            <Scene key="app" component={App} initial={true}/>
        </Scene>
      </Router>
    )
  }
}

        // <Scene key="login" component={Login} title="Login"/>
        // <Scene key="register" component={Register} title="Register"/>
        // <Scene key="home" component={Home}/>