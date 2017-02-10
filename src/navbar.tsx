import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { teste } from './actions'
import { connect } from 'react-redux'
var { Container, Header, Title, Button, Left, Right, Body, Icon } = require('native-base');

interface Appprops {
    teste: Function
}
const navBar:any = {
    init: {
        
    }
}


class navbar extends React.Component<any,{}> {
    constructor(props, context) {
        super(props, context);
    }


    render() {
         return (
            <Container style={{position: 'absolute', top: 0, left: 0, right: 0}}>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
            </Container>
        );
    }
}



// const navbar = () => {
//     return(
//         <Container style={{position: 'absolute', top: 0, left: 0, right: 0}}>
//                 <Header>
//                     <Left>
//                         <Button transparent>
//                             <Icon name='arrow-back' />
//                         </Button>
//                     </Left>
//                     <Body>
//                         <Title>Header</Title>
//                     </Body>
//                     <Right>
//                         <Button transparent>
//                             <Icon name='menu' />
//                         </Button>
//                     </Right>
//                 </Header>
//             </Container>
//     )
// }



const mapStateToProps = (state,ownProps) => ({
  });

const mapDispatchToProps = dispatch => ({
  teste: () =>
    dispatch(teste())
});

export default connect(mapStateToProps, mapDispatchToProps)(navbar);
