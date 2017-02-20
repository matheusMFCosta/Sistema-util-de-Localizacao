import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { mapsData } from './../maps'
var { Actions } = require('react-native-router-flux')
var { Container, Content, Footer, FooterTab, Button } = require('native-base');

interface FooterSwapMapsprops {
    swapNextMapButtonPress: Function
    swapPreviousMapButtonPress: Function,
    currentMapData: mapsData
}

export default class footerSwapMaps extends React.Component<FooterSwapMapsprops,{}> {
    constructor(props, context) {
        super(props, context);
    }
    
    render(): JSX.Element {
         return (
             <View style={styles.overlay}>
                <Container>
                    <Content />
                    <Footer >
                        <FooterTab>
                            <Button onPress={()=> this.props.swapPreviousMapButtonPress()}>
                                <Text>Previous</Text>
                            </Button>
                            <Text>
                                {this.props.currentMapData.id}
                            </Text>
                            <Button onPress={()=> this.props.swapNextMapButtonPress()} >
                                <Text>Next</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
             </View>
         )
    }
}
type flexDirectionType = "column";
const flexDirection:flexDirectionType = "column";

const styles = StyleSheet.create({
  overlay:{
    flex:1,
    flexDirection: flexDirection,
    bottom: 0,
    left: 0,
    right: 0,
  }
}); 


