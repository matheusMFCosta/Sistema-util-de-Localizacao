import React, { Component } from 'react';
import { View, StyleSheet,Text} from 'react-native'
import { Account } from './../../main/main'   
var { Container, Content, Card, CardItem, Body, List, ListItem, Left, Right } = require('native-base');
​
interface AccountCardsProps {
    accountList: Array<Account>
}

export default class AccountCards extends Component<AccountCardsProps,{}> {
    render() {
        console.log(this.props.accountList)
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
                                                    {key.code}
                                                </Text>
                                            </View >
                                        </Left>
                                        <View style={styles.right10}>
                                        <Right>
                                            <View>
                                                <Text>
                                                    {key.code}
                                                </Text>
                                            </View>
                                            </Right>
                                        </View >
                                    </View >
                                    <View style={styles.left10}>
                                        <Text>   
                                            {key.owner}
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
  titleText: {
    left: 40,
    fontSize: 25,
    fontWeight: bold,
  },

});