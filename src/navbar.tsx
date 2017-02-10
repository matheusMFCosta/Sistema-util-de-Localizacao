import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { teste } from './actions'
import { connect } from 'react-redux'
var { Container, Header, Title, Button, Left, Right, Body, Icon } = require('native-base');

interface Appprops {
    teste: Function
}
const navBar:any = {
    init: {
        
    }
}


class Navbar extends React.Component<any,{}> {
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
                            <Title>Header</Title>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Icon name='menu' />
                            </Button>
                        </Right>
                    </Header>
                </Container>
            </View>
        );
    }
}



const mapStateToProps = (state,ownProps) => ({
  });

const mapDispatchToProps = dispatch => ({
  teste: () =>
    dispatch(teste())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
