"use strict";

import { connect } from 'react-redux'
import  QrCodeInputheader  from './qrCodeInputHeader'
import { View, StyleSheet, Picker, Text } from 'react-native'
import React, { PropTypes } from 'react'
import { changePointFindFilter, setOriginPoint, pointSearchQrCode } from './../actions'
import { pointsOfInterest } from './../../maps/maps'
var { Actions } = require('react-native-router-flux')
var { Container, Header, Title, Button, Left, Body, Icon, Form, Content, Item, Label, Input, ListItem, Right, List } = require('native-base');

const PickerItem = Picker.Item;

interface QrCodeReaderProps {
    pointFindFilter: string,
    changePointFindFilter: Function,
    pointsOfInterest: Array<pointsOfInterest>,
    setOriginPoint: Function,
    pointSearchQrCode: Function,
    pathPoints: any
}


const DestinationList = (props) => {

    if(props.pointData.id && props.pointData.description){
        const upperPointId = props.pointData.id.toUpperCase();
        const upperPointDescruiption = props.pointData.description.toUpperCase();
        const upperPointFilter = props.pointFilter.toUpperCase();
        if(upperPointId.indexOf(upperPointFilter) != -1 || 
            upperPointDescruiption.indexOf(upperPointFilter) != -1 || 
            upperPointFilter === "")
                return(
                    <ListItem onPress={()=> (props.setOriginPoint(props.pointData),Actions.DestinationPoint())} >
                        <Text>{props.pointData.id}</Text>
                        <Text>{props.pointData.description}</Text>
                    </ListItem>
                )
    }
    return(<View/>)
}






class ChooseOrigin extends React.Component<QrCodeReaderProps,{}> {

    capture(): void {   
            this.props.pointSearchQrCode({  
            id: "Da",
            adjacentes: {"E-CCET1":1,"D-CCET1":1},
            description: "nada ainda",
            mapReference:"ccet1",
            globalReference:"ccet",
            buildingReference:"ccet",
            x: 309,
            y: 177
        })
        Actions.OriginPoint()
    }
    render(): JSX.Element {
            let currentBuilding = "--"
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
                                        <Title>Location</Title>
                                    </Body>
                                </Header>
                            </Container>
                        </View>
                    </View>
                    <List>
                        <ListItem onPress={() => this.capture()}>
                            <Text>UNIRIO - 458</Text>
                        </ListItem>
                    </List>
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
    pointFindFilter: state.pointSearch.pointFindFilter,
    pointsOfInterest: state.pointSearch.pointsOfInterest,
    pathPoints: state.pointSearch.pathPoints,
  });

const mapDispatchToProps = dispatch => ({
  setOriginPoint: (pointData:pointsOfInterest) =>
    dispatch(setOriginPoint(pointData)),
  changePointFindFilter: (issuer: string) =>
    dispatch(changePointFindFilter(issuer)),
  pointSearchQrCode: (qrCode:string) =>
    dispatch(pointSearchQrCode(qrCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseOrigin);