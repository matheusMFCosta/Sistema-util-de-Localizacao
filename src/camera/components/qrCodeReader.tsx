"use strict";
 import React, { PropTypes } from 'react'
import {AppRegistry,
    StyleSheet,
    Text,
    View,
    AlertIOS,createClass,
    Dimensions}  from "react-native"

var   Camera  = require("react-native-camera").default;
 



interface Appprops {
    teste: Function,
}

interface QrCodeReaderState {
    showCamera: boolean,
    cameraType:any
}


export default class QrCodeReader extends React.Component<any,any> {

 onBarCodeRead(barcode) {
     console.log("allalalal",barcode.data)
 }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref="cam"
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={(e) => {this.onBarCodeRead(e),console.log("dasdadsa")}}> 
          <Text style={styles.capture} >[CAPTURE2]</Text>
        </Camera>
      </View>
    );
  }
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


// const mapStateToProps = (state,ownProps) => ({
//   });

// const mapDispatchToProps = dispatch => ({
//   teste: (wow:string) =>
//     dispatch(teste(true))
// });
