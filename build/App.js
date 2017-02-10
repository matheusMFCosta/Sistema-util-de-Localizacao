import React from 'react';
import { View, Text } from 'react-native';
import { teste } from './actions';
import { connect } from 'react-redux';
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.props.teste();
    }
    render() {
        return (React.createElement(View, { style: { margin: 128 } },
            React.createElement(Text, null, "333dasdas")));
    }
}
const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = dispatch => ({
    teste: () => dispatch(teste())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=App.js.map