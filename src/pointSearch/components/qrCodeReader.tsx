"use strict";

import { connect } from 'react-redux'
var { Actions } = require('react-native-router-flux')
import React, { PropTypes } from 'react'
import { setCameraBeOpenStatus } from './../actions'
import { pointSearchQrCode, getOriginPointDetails } from './../actions'
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
    pointSearchQrCode: Function,
    getOriginPointDetails: Function
}


class QrCodeReader extends React.Component<QrCodeReaderProps,{}> {

    componentWillMount(): void{
        this.props.setCameraBeOpenStatus(true);
    }

    onBarCodeRead(barcode:string): void {
        this.props.setCameraBeOpenStatus(false);

        this.props.pointSearchQrCode(barcode);
        Actions.DestinationPoint();
    }

    capture(): void {
                this.props.pointSearchQrCode("otpauth://totp/vtex.com?secret=JBSWY3DPEHPK3PXZ&issuer=Vtex")    
        this.props.setCameraBeOpenStatus(false);
        this.props.getOriginPointDetails("orig")

        Actions.DestinationPoint();
    }

    render(): JSX.Element {
        if(this.props.shouldCameraBeOpen){
            return (
                <View style={styles.container}>
                    <Camera
                        ref="cam"
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}
                        onBarCodeRead={(barcode) => this.onBarCodeRead(barcode.data)}> 
                        <Text style={styles.capture} onPress={()=>this.capture()}>[Close]</Text>
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
    shouldCameraBeOpen: state.pointSearch.shouldCameraBeOpen,
  });

const mapDispatchToProps = dispatch => ({
  setCameraBeOpenStatus: (status:boolean) =>
    dispatch(setCameraBeOpenStatus(status)),
  pointSearchQrCode: (qrCode:string) =>
    dispatch(pointSearchQrCode(qrCode)),
  getOriginPointDetails: (id:string) =>
    dispatch(getOriginPointDetails(id))
    
});

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeReader);