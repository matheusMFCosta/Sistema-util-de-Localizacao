import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { mapsData } from './../maps'
var { Container, Content, Footer, FooterTab, Button } = require('native-base');

interface FooterSwapMapsprops {
    swapNextMapButtonPress: Function
    swapPreviousMapButtonPress: Function,
    mapMetadata: any,
    currentMapindex: number,
    totalMapIndex: number
}

export default class footerSwapMaps extends React.Component<FooterSwapMapsprops,{}> {
    constructor(props, context) {
        super(props, context);
    }
    
    render(): JSX.Element {
        console.log("aqui tbm")
         return (
             <View style={styles.overlay}>
                <Container>
                    <Content />
                    <Footer >
                        <FooterTab>
                            <Button onPress={()=> this.props.swapPreviousMapButtonPress()}>
                                <Text style={{color:'#fff'}}> Previous</Text>
                            </Button>
                            <Text style={{color:'#fff'}}>
                                {this.props.mapMetadata.any}
                            </Text>
                            <Text style={{color:'#fff'}}>
                                Step {this.props.currentMapindex +1 } of {this.props.totalMapIndex}
                            </Text>
                            <Button onPress={()=> this.props.swapNextMapButtonPress()} >
                                <Text style={{color:'#fff'}}> Next</Text>
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


