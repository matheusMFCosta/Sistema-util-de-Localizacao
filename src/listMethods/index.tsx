import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
var { Actions } = require('react-native-router-flux')
import { teste, changeAddCodeFooterStatus } from './actions'
import { connect } from 'react-redux'
import  Navbar  from './components/navbar'
import List from './components/List'
import FooterTab from './components/footerTab'

interface Appprops {
    teste: Function,
    changeAddCodeFooterStatus: Function,
    showAddCodeFooter: string
}

class listMethods extends React.Component<any,{}> {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount(){
        console.log("dsadasdas")
      this.props.teste()
    }

    render() {
         return (
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View >
                <Navbar changeAddCodeFooterStatus={()=> this.props.changeAddCodeFooterStatus(true)} />
            </View>
            <View>
                <List/>
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
    showAddCodeFooter: state.listMethods.showAddCodeFooter
  });

const mapDispatchToProps = dispatch => ({
  teste: () =>
    dispatch(teste(true)),
  changeAddCodeFooterStatus: (status:boolean) =>
    dispatch(changeAddCodeFooterStatus(status)),

});

export default connect(mapStateToProps, mapDispatchToProps)(listMethods);
