import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
var { Container, Header, Title, Button, Left, Right, Body, Icon } = require('native-base');

interface Appprops {
}

export default class qrCodeinputHeader extends React.Component<any,{}> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
         return (
            <View style={{ height: 63}}>
                <Container >
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name='arrow-back' />
                            </Button>
                            
                        </Left>
                        <Body>
                            <Title>Insert Data</Title>
                        </Body>
                    </Header>
                </Container>
            </View>
        );
    }
}


