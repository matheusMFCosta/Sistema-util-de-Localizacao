"use strict";

import { connect } from 'react-redux'
import  QrCodeInputheader  from './qrCodeInputHeader'
import { View, StyleSheet, Picker, Text } from 'react-native'
import React, { PropTypes } from 'react'
import { changeAccountOwnerInput, getDestinationPointDetails } from './../actions'
var { Actions } = require('react-native-router-flux')
var { Container, Header, Title, Button, Left, Body, Icon, Form, Content, Item, Label, Input } = require('native-base');

const PickerItem = Picker.Item;

interface QrCodeReaderProps {
    accountOwner: string,
    changeAccountOwnerInput: Function,
    getDestinationPointDetails: Function
}


class QrCodeInput extends React.Component<QrCodeReaderProps,{}> {

    onSaveAccount(changeScreen): void {
        this.props.getDestinationPointDetails("Dest");
        changeScreen();
    }

    render(): JSX.Element {
            return (
                <View style={styles.screen}>
                    <View>
                            <View style={{ height: 63}}>
                                <Container >
                                    <Header>
                                        <Left>
                                            <Button transparent onPress={() => Actions.pop()}>
                                                <Icon name='arrow-back' />
                                            </Button>
                                            
                                        </Left>
                                        <Body>
                                            <Title>Insert Data</Title>
                                        </Body>
                                    </Header>
                                </Container>
                            </View>
                    </View>
                    <Container>
                        <Content>
                            <Form>
                                <Item floatingLabel last>
                                    <Label>Owner Name</Label>
                                    <Input 
                                        value={this.props.accountOwner} 
                                        onChange={(e) => this.props.changeAccountOwnerInput(e.nativeEvent.text)}/>
                                </Item>
                            </Form>
                        </Content>
                    </Container>

                                    <Button 
                                        onPress={() => this.onSaveAccount(
                                            () => Actions.ShowMap()
                                        )}
                                    >
                                        <Text>Save</Text>
                                    </Button>


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
      width: 350,
      left: 10
  }
});


const mapStateToProps = (state,ownProps) => ({
    accountOwner: state.pointSearch.accountOwner,
  });

const mapDispatchToProps = dispatch => ({
  getDestinationPointDetails: (pointId:string) =>
    dispatch(getDestinationPointDetails(pointId)),
  changeAccountOwnerInput: (issuer: string) =>
    dispatch(changeAccountOwnerInput(issuer))
});

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeInput);