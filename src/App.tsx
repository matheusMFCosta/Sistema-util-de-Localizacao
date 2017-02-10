import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { teste } from './actions'
import { connect } from 'react-redux'
import navBar from './navbar'

interface Appprops {
    teste: Function
}

class App extends React.Component<any,{}> {
    constructor(props, context) {
        super(props, context);
    }
    // static renderNavigationBar(props){
    //     return navBar()
    // }
    componentDidMount(){
      this.props.teste()
    }
    render() {
        console.log("dd")
         return (
          <View style={{position: 'absolute', top: 63, left: 0, right: 0,backgroundColor:'red'}}>
            <Text>55555</Text>
         </View>
        );
    }
}

const mapStateToProps = (state,ownProps) => ({
  });

const mapDispatchToProps = dispatch => ({
  teste: () =>
    dispatch(teste())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
