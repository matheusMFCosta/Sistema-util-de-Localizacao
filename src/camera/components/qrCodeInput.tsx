"use strict";

import { connect } from 'react-redux'
var { Actions } = require('react-native-router-flux')
import React, { PropTypes } from 'react'
import { setCameraBeOpenStatus, changeQrCode } from './../actions'
var { Container, Content, Form, Item, Label, Input } = require('native-base');

var  Camera  = require("react-native-camera").default;


interface QrCodeReaderProps {
}


class QrCodeInput extends React.Component<QrCodeReaderProps,{}> {

    render() {
            return (
                <Container>
                    <Content>
                        <Form>
                            <Item floatingLabel>
                                <Label>Account Name</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel last>
                                <Label>Key Value</Label>
                                <Input />
                            </Item>
                        </Form>
                    </Content>
                </Container>
            );
    }

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     height: Dimensions.get('window').height,
//     width: Dimensions.get('window').width
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     color: '#000',
//     padding: 10,
//     margin: 40
//   }
// });


const mapStateToProps = (state,ownProps) => ({
    shouldCameraBeOpen: state.camera.shouldCameraBeOpen,
  });

const mapDispatchToProps = dispatch => ({
  setCameraBeOpenStatus: (status:boolean) =>
    dispatch(setCameraBeOpenStatus(status)),
  changeQrCode: (qrCode:string) =>
    dispatch(changeQrCode(qrCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeInput);