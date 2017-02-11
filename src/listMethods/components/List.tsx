import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { teste } from './../actions'
import { connect } from 'react-redux'
interface Appprops {
    teste: Function
}

class List extends React.Component<any,{}> {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount(){
      this.props.teste()
    }
    render() {
         return (
            <View>
                <Text>11111</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(List);
