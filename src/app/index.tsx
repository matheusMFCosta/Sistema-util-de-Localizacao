import React from 'react'
import {  View, Image, Text } from 'react-native'
var { Actions } = require('react-native-router-flux')
import { changeAddCodeFooterStatus } from './actions'
import { connect } from 'react-redux'
import { Account } from './../main/main'
import { updateAccountsCode } from './../main/actions'
import { timeStart, timeStop } from './actions'
import  Navbar  from './components/navbar'
import AccountCards from './components/accountCards'
import FooterTab from './components/footerTab'

interface Appprops {
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

            <View style={{ top:100 , alignItems:"center"}}>
              <Image
                  style={{width: 380, height: 170, top: 50}}
                  source={require('./../utils/images/SUL.png')}
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
