var { Scene, Router } = require('react-native-router-flux');
import React from "react";
import App from './App';
export default class Routes extends React.Component {
    render() {
        return (React.createElement(Router, null,
            React.createElement(Scene, { key: "root" },
                React.createElement(Scene, { key: "app", component: App, initial: true }))));
    }
}
// <Scene key="login" component={Login} title="Login"/>
// <Scene key="register" component={Register} title="Register"/>
// <Scene key="home" component={Home}/> 
//# sourceMappingURL=routes.js.map