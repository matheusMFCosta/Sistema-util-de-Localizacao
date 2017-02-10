import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { teste } from './actions'
import { connect } from 'react-redux'
import  Navbar  from './navbar'
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
    //     return(
    //               <View style={{flex: 1, flexDirection: 'column'}}>
    //     <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} ><Text>ddd</Text>
    //     </View>
    //     <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} ><Text>ddd</Text>
    //     </View>
    //     <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} ><Text>ddd</Text>
    //     </View>
    //   </View>
    //     )
         return (
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View >
                <Navbar/>
            </View>
            <View>
                <Text>11111</Text>
            </View>
    
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
