"use strict";

import { connect } from 'react-redux'
import  QrCodeInputheader  from './qrCodeInputHeader'
import { View, StyleSheet } from 'react-native'
import React, { PropTypes } from 'react'
import { changeQrCode } from './../actions'
var { Actions } = require('react-native-router-flux')
var { Container, Content, Form, Item, Label, Input } = require('native-base');



interface QrCodeReaderProps {
}


class QrCodeInput extends React.Component<QrCodeReaderProps,{}> {

    render() {
            return (
                <View style={styles.screen}>
                    <View  >
                        <QrCodeInputheader/>
                    </View>
                     <View style={styles.container} >
                        <View style={styles.container2} >
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
                        </View>
                     </View>
                </View>
            );
    }

}

type flexDirectionTColumype = "column";
const flexDirectionColumn:flexDirectionTColumype = "column";
type flexDirectionRowType = "row";
const flexDirectionRow:flexDirectionRowType = "row";

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    flexDirection: flexDirectionColumn
  },
  container: {
    flex: 1, 
    flexDirection: flexDirectionRow
  },
  container2:{
      width: 350
  }
});


const mapStateToProps = (state,ownProps) => ({
    shouldCameraBeOpen: state.camera.shouldCameraBeOpen,
  });

const mapDispatchToProps = dispatch => ({
//   setCameraBeOpenStatus: (status:boolean) =>
//     dispatch(setCameraBeOpenStatus(status)),
  changeQrCode: (qrCode:string) =>
    dispatch(changeQrCode(qrCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeInput);