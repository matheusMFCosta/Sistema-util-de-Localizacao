import React, { PropTypes } from "react";
import { StyleSheet, View, Text } from "react-native";
//import { teste } from './actions'
import { connect } from "react-redux";
import Navbar from "./components/navbar";
import List from "./components/List";
interface Appprops {
    teste: Function;
}

class listMethods extends React.Component<any, {}> {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {}
    render() {
        return (
            <View>
                <Text> HELOO</Text>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(listMethods);
