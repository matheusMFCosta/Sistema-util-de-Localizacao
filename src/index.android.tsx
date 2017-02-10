import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import App from './App'


interface Props {

}

interface State {

}

export default class Android extends Component<Props, State> {
    render() {
        return (
            <View >
                <App/>
            </View>
        );
    }
}

