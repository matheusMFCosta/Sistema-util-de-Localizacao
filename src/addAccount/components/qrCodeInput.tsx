"use strict";

import { connect } from 'react-redux'
import  QrCodeInputheader  from './qrCodeInputHeader'
import { View, StyleSheet, Picker, Text } from 'react-native'
import React, { PropTypes } from 'react'
import { changeAccountName, changeAccountCodeInput, changeAccountOwnerInput } from './../actions'
import { addAccount } from './../../main/actions'
var { Actions } = require('react-native-router-flux')
var { Container, Content, Form, Item, Label, Input,Button, Footer, FooterTab } = require('native-base');


const PickerItem = Picker.Item;

interface QrCodeReaderProps {
    accountName: string,
    accountSecret: string,
    accountOwner: string,
    changeAccountName: Function,
    changeAccountCodeInput: Function,
    changeAccountOwnerInput: Function,
    addAccount: Function
}


class QrCodeInput extends React.Component<QrCodeReaderProps,{}> {

    onSaveAccount(addAccount:Function,changeScreen): void {
        addAccount();
        changeScreen();
    }

    render(): JSX.Element {
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
                                            <Input 
                                                value={this.props.accountName} 
                                                onChange={((e) => this.props.changeAccountName(e.nativeEvent.text))}
                                                />
                                        </Item>
                                        <Item floatingLabel>
                                            <Label>Key Value</Label>
                                            <Input 
                                                value={this.props.accountSecret} 
                                                onChange={(e) => this.props.changeAccountCodeInput(e.nativeEvent.text)}/>
                                        </Item>
                                        <Item floatingLabel last>
                                            <Label>Owner Name</Label>
                                            <Input 
                                                value={this.props.accountOwner} 
                                                onChange={(e) => this.props.changeAccountOwnerInput(e.nativeEvent.text)}/>
                                        </Item>
                                    </Form>
                                </Content>
                            </Container>
                        </View>
                    </View>
                    <View style={styles.screen}>
                        <Container>
                            <Content />
                            <Footer >
                                <FooterTab>
                                    <Button 
                                        onPress={() => this.onSaveAccount(
                                            () => this.props.addAccount(
                                                this.props.accountName,
                                                this.props.accountSecret,
                                                this.props.accountOwner,
                                                30,
                                                "SHA-1"

                                            ),
                                            () => Actions.ListMethods()
                                        )}
                                    >
                                        <Text>Save</Text>
                                    </Button>
                                </FooterTab>
                            </Footer>
                        </Container>
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
      width: 350,
      left: 10
  }
});


const mapStateToProps = (state,ownProps) => ({
    accountName: state.addAccount.accountName,
    accountSecret: state.addAccount.accountSecret,
    accountOwner: state.addAccount.accountOwner,
  });

const mapDispatchToProps = dispatch => ({
  addAccount: (name: string,accessCode: string,issuer: string,epoch: number,algorithm: string) =>
    dispatch(addAccount(name,accessCode,issuer,epoch,algorithm)),
  changeAccountName: (AccountName: any) =>
    dispatch(changeAccountName(AccountName)),
  changeAccountCodeInput: (accessCode: string) =>
    dispatch(changeAccountCodeInput(accessCode)), 
  changeAccountOwnerInput: (issuer: string) =>
    dispatch(changeAccountOwnerInput(issuer))
});

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeInput);