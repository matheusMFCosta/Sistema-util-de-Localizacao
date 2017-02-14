import React from 'react'
import {  View } from 'react-native'
var { Actions } = require('react-native-router-flux')
import { teste, changeAddCodeFooterStatus } from './actions'
import { connect } from 'react-redux'
import { Account } from './../main/main'
import  Navbar  from './components/navbar'
import AccountCards from './components/accountCards'
import FooterTab from './components/footerTab'

interface Appprops {
    teste: Function,
    showAddCodeFooter: string
    accountList: Array<Account>
    changeAddCodeFooterStatus: Function,

}

class listMethods extends React.Component<any,{}> {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount(){
      this.props.teste()
    }

    render() {
         return (
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View >
                <Navbar changeAddCodeFooterStatus={()=> this.props.changeAddCodeFooterStatus(true)} />
            </View>
            <View style={{flex: 1, flexDirection: 'column'}}>
                <AccountCards accountList={this.props.accountList} />
            </View >
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
    showAddCodeFooter: state.listMethods.showAddCodeFooter,
    accountList: state.main.accountList
  });

const mapDispatchToProps = dispatch => ({
  teste: () =>
    dispatch(teste(true)),
  changeAddCodeFooterStatus: (status:boolean) =>
    dispatch(changeAddCodeFooterStatus(status)),

});

export default connect(mapStateToProps, mapDispatchToProps)(listMethods);
