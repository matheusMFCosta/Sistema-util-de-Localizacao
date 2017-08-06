import React, { PropTypes } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
var { Container, Header, Title, Button, Left, Right, Body, Icon } = require("native-base");

interface Appprops {}

class Navbar extends React.Component<any, {}> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name="arrow-back" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Header</Title>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Icon name="menu" />
                            </Button>
                        </Right>
                    </Header>
                </Container>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
