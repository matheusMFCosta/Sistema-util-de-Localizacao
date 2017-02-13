"use strict";

import { connect } from 'react-redux'
var { Actions } = require('react-native-router-flux')
import React, { PropTypes } from 'react'
import { setCameraBeOpenStatus, changeQrCode } from './../actions'
import {AppRegistry,
    StyleSheet,
    Text,
    View,
    AlertIOS,createClass,
    Dimensions}  from "react-native"

var  Camera  = require("react-native-camera").default;


interface QrCodeReaderProps {
    shouldCameraBeOpen: boolean,
    setCameraBeOpenStatus: Function,
    changeQrCode: Function
}


class QrCodeReader extends React.Component<QrCodeReaderProps,{}> {

    componentWillMount(){
        this.props.setCameraBeOpenStatus(true);
    }

    onBarCodeRead(barcode:string) {
        this.props.setCameraBeOpenStatus(false);
        this.props.changeQrCode(barcode);
    }

    capture(){
        this.props.setCameraBeOpenStatus(false);
        this.props.changeQrCode("testeBarCode");
        Actions.ListMethods();
    }

    render() {
        if(this.props.shouldCameraBeOpen){
            return (
                <View style={styles.container}>
                    <Camera
                        ref="cam"
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}
                        onBarCodeRead={(barcode) => this.onBarCodeRead(barcode.data)}> 
                        <Text style={styles.capture} onPress={()=>this.capture()}>[CAPTURE]</Text>
                    </Camera>
                </View>
            );
        } 
        return (<View></View>)}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});


const mapStateToProps = (state,ownProps) => ({
    shouldCameraBeOpen: state.camera.shouldCameraBeOpen,
  });

const mapDispatchToProps = dispatch => ({
  setCameraBeOpenStatus: (status:boolean) =>
    dispatch(setCameraBeOpenStatus(status)),
  changeQrCode: (qrCode:string) =>
    dispatch(changeQrCode(qrCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeReader);