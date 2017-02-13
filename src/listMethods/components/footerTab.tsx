import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
var { Actions } = require('react-native-router-flux')
var { Container, Content, Footer, FooterTab, Button } = require('native-base');

interface Appprops {
    openCamera: Function
    showAddCodeFooter: boolean
    changeAddCodeFooterStatus: Function
}

export default class footerTab extends React.Component<Appprops,{}> {
    constructor(props, context) {
        super(props, context);
    }

    onReadCode(QrCodeReader:Function,changeAddCodeFooterStatus:Function){
        changeAddCodeFooterStatus();
        QrCodeReader();
    }

    onInputQrcode(QrCodeInput:Function,changeAddCodeFooterStatus:Function){
        changeAddCodeFooterStatus();
        QrCodeInput();
    }

    render() {
        if(this.props.showAddCodeFooter)
         return (
             <View style={styles.overlay}>
                <Container>
                    <Content />
                    <Footer >
                        <FooterTab>
                            <Button onPress={()=> this.onReadCode(Actions.QrCodeReader,this.props.changeAddCodeFooterStatus)}>
                                <Text>Read Code</Text>
                            </Button>
                            <Button onPress={()=> this.onReadCode(Actions.QrCodeInput,this.props.changeAddCodeFooterStatus)} >
                                <Text>Insert Code</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
             </View>
        );
        return(<View/>);
    }
}

type flexDirectionType = "column";
const flexDirection:flexDirectionType = "column";

const styles = StyleSheet.create({
  overlay:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
}); 


