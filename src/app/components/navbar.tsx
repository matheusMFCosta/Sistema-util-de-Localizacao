import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
var { Container, Header, Title, Button, Left, Right, Body, Icon } = require('native-base');

interface Appprops {
    changeAddCodeFooterStatus: Function
}

class Navbar extends React.Component<any,{}> {
    constructor(props, context) {
        super(props, context);
    }

    render(): JSX.Element {
         return (
            <View style={{ height: 63}}>
                <Container >
                    <Header>
                        <Left>
                            <View/>
                        </Left>
                        <Body>
                            <Title>Accounts</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={()=>this.props.changeAddCodeFooterStatus()} >
                                <Icon name='ios-add' />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
