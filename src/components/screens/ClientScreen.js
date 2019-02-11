import React from 'react';
import { BackHandler, Text, View } from 'react-native';

//import airportNames from '../../data/airportNames.json';

export default class ClientScreen extends React.PureComponent {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Test</Text>
            </View>
        );
    }
}
