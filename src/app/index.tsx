import React from 'react'
import {  View, Image, Text } from 'react-native'
var { Actions } = require('react-native-router-flux')
import { teste, changeAddCodeFooterStatus } from './actions'
import { connect } from 'react-redux'
import { Account } from './../main/main'
import { updateAccountsCode } from './../main/actions'
import { timeStart, timeStop } from './actions'
import  Navbar  from './components/navbar'
import AccountCards from './components/accountCards'
import FooterTab from './components/footerTab'

interface Appprops {
    teste: Function,
    showAddCodeFooter: string,
    seconds: number,
    accountList: Array<Account>,
    changeAddCodeFooterStatus: Function,
    timeStart: Function,
    changeAccountCode: Function
 
}

class app extends React.Component<any,{}> {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount(): void {
      
    }

    componentWillUnmount(): void {
      this.props.timeStop()
    }

    render(): JSX.Element {
         return (
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View >
                <Navbar changeAddCodeFooterStatus={()=> this.props.changeAddCodeFooterStatus(true)} />
            </View>
            <View style={{ top:100 , alignItems:"center"}}>
              <Text style={{fontSize: 20, color:'blue'}} > Sistema Util De Localização </Text>
              <Image
                  style={{width: 250, height: 250, top: 50}}
                  source={require('./../utils/images/bussola.png')}
                />
            </View>
            <View style={{flex: 1, flexDirection: 'column'}}>
                <FooterTab 
                    openCamera={Actions.QrCodeReader} 
                    showAddCodeFooter={this.props.showAddCodeFooter}
                    changeAddCodeFooterStatus={() => this.props.changeAddCodeFooterStatus(false)} />
            </View>
         </View>
        );
    }
}



const mapStateToProps = (state,ownProps) => ({
    showAddCodeFooter: state.app.showAddCodeFooter,
    seconds: state.app.seconds,
    accountList: state.main.accountList
  });

const mapDispatchToProps = dispatch => ({
  teste: () =>
    dispatch(teste(true)),
  changeAddCodeFooterStatus: (status:boolean) =>
    dispatch(changeAddCodeFooterStatus(status)),
  timeStart: () =>
    dispatch(timeStart()),
  timeStop: () =>
    dispatch(timeStop()),
  updateAccountsCode: () =>
    dispatch(updateAccountsCode())

});

export default connect(mapStateToProps, mapDispatchToProps)(app);
