"use strict";

import { connect } from 'react-redux'
import  QrCodeInputheader  from './qrCodeInputHeader'
import { View, StyleSheet, Picker, Text } from 'react-native'
import React, { PropTypes } from 'react'
import { changePointFindFilter, setDestinationPoint } from './../actions'
import { pointsOfInterest } from './../../maps/maps'
var { Actions } = require('react-native-router-flux')
var { Container, Header, Title, Button, Left, Body, Icon, Form, Content, Item, Label, Input, ListItem, Right, List } = require('native-base');

const PickerItem = Picker.Item;

interface QrCodeReaderProps {
    pointFindFilter: string,
    changePointFindFilter: Function,
    getDestinationPointDetails: Function,
    pointsOfInterest: Array<pointsOfInterest>,
    setDestinationPoint: Function,
    pathPoints: any
}


const DestinationList = (props) => {

    if(props.pointData.id || props.pointData.description){
        const upperPointId = props.pointData.id.toUpperCase();
        const upperPointDescruiption = props.pointData.description.toUpperCase();
        const upperPointFilter = props.pointFilter.toUpperCase();
        if(upperPointId.indexOf(upperPointFilter) != -1 || 
            upperPointDescruiption.indexOf(upperPointFilter) != -1 || 
            upperPointFilter === "")
                return(
                    <ListItem onPress={()=> (props.setDestinationPoint(props.pointData,props.pathPoints),Actions.ShowMap())} >
                        <Text>{props.pointData.id}</Text>
                        <Text>{props.pointData.description}</Text>
                    </ListItem>
                )
    }
    return(<View/>)
}

class OriginPoint extends React.Component<QrCodeReaderProps,{}> {

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
                                    <Label>Find</Label>
                                    <Input 
                                        value={this.props.pointFindFilter} 
                                        onChange={(e) => this.props.changePointFindFilter(e.nativeEvent.text)}/>
                                </Item>
                            </Form>
                        </Content>
                    </Container>
                <Container>
                    <Content>
                        <List dataArray={this.props.pointsOfInterest} renderRow={(key) =>{
                            return(
                                <DestinationList 
                                    pathPoints={this.props.pathPoints}
                                    setDestinationPoint={this.props.setDestinationPoint} 
                                    pointData={key} 
                                    pointFilter={this.props.pointFindFilter} />
                            )
                        }}/>
                    </Content>
                </Container>
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
    pathPoints: state.pointSearch.pathPoints
  });

const mapDispatchToProps = dispatch => ({

  setDestinationPoint: (pointData:pointsOfInterest,pathPoints) =>
    dispatch(setDestinationPoint(pointData,pathPoints)),
  changePointFindFilter: (issuer: string,) =>
    dispatch(changePointFindFilter(issuer))
});

export default connect(mapStateToProps, mapDispatchToProps)(OriginPoint);