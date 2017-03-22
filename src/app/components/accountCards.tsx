import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native'
import { Account } from './../../main/main'   
import { updateAccountsCode } from './../../main/actions'
import  getOTP  from './../../utils/getAccountCode' 
var { CircularProgress } = require('react-native-circular-progress')
var { Container, Content, Card, CardItem, Body, List, ListItem, Left, Right } = require('native-base');

​
interface AccountCardsProps {
    accountList: Array<Account>,
    seconds: number,
    updateAccountsCode: Function
}



export default class AccountCards extends Component<AccountCardsProps,{}> {

    

    getProgressPercent(total): number {
        const currentSecond = 30 - this.getCurrentSecond()
        const percentage = 100*currentSecond/total
        return Math.floor(percentage)
    } 

    getCurrentSecond(): number {
        const currentTime = 30 - (Math.round(new Date().getTime() / 1000.0))%30;
        return currentTime
    }

    componentWillReceiveProps(nextProp): void {
        
        const currentTime = 30 - (Math.round(new Date().getTime() / 1000.0))%30;
        if(currentTime === 1 || (nextProp.accountList.length > this.props.accountList.length)){
            this.props.updateAccountsCode();
        }
    }

    render(): JSX.Element{
        if(this.props.accountList)
            return (
            <Container>
                <Content>
                    <List dataArray={this.props.accountList} renderRow={(key) =>
                        <ListItem>
                            <Body>
                                <View style={styles.body}>
                                    <View style={styles.left10}>
                                        <Text>   
                                            {key.name}
                                        </Text>
                                    </View >
                                    <View style={styles.row}>
                                        <Left>
                                            <View >
                                                <Text style={styles.titleText}>
                                                    {key.accessCode}
                                                </Text>
                                            </View >
                                        </Left>
                                        <View style={styles.circle}>
                                        <Right>
                                            <View>
                                                <CircularProgress
                                                    size={50}
                                                    width={10}
                                                    fill={this.getProgressPercent(30)}
                                                    rotation={0}
                                                    tension={100}
                                                    friction={10}
                                                    tintColor="#00e0ff"
                                                    backgroundColor="#3d5875" >
                                                    {
                                                        (fill) => (
                                                        <Text style={styles.innerText}>
                                                            {this.getCurrentSecond()}
                                                        </Text>
                                                        )
                                                    }
                                            </CircularProgress>
                                            </View>
                                            </Right>
                                        </View >
                                    </View >
                                    <View style={styles.left10}>
                                        <Text>   
                                            {key.issuer}
                                        </Text>
                                    </View >
                                </View>
                            </Body>
                        </ListItem>
                    } />
                </Content>
            </Container>
            );
        return (
            <View style={styles.body}>
                <Container>
                    <Content>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>
                                        No Accounts
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            </View>
        )
    }
}

type flexDirectionTColumype = "column";
const flexDirectionColumn:flexDirectionTColumype = "column";
type flexDirectionRowType = "row";
const flexDirectionRow:flexDirectionRowType = "row";
type boldType = "bold";
const bold:boldType = "bold";

const styles = StyleSheet.create({
  body: {
    flex: 1, 
    flexDirection: flexDirectionColumn
  },
  row:{
    flex: 1, 
    flexDirection: flexDirectionRow
  },
  left10:{
      left: 10,
  },
  right10: {
      right: 10
  },
  circle: {
      right: 30,
      top: 5
  },
  titleText: {
    left: 40,
    fontSize: 35,
    fontWeight: bold,
  },
  innerText:{
      fontSize: 10,
  }

});