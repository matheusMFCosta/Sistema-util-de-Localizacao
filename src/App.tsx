import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { teste } from './actions'
import { connect } from 'react-redux'

interface Appprops {
    teste: Function
}

class App extends React.Component<any,{}> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
      this.props.teste()
    }
    render() {
         return (
          <View style={{margin: 128}}>
            <Text>333dasdas</Text>
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
