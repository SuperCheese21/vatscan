import React from 'react';
import { BackHandler, Text, View } from 'react-native';

import HeaderContainer from '../containers/HeaderContainer';
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
            <>
                <HeaderContainer
                    loading={this.props.screenProps.loading}
                    refresh={this.props.screenProps.refresh}
                    text={this.props.screenProps.focusedClient.callsign}
                />
                <View style={{ flex: 1 }}>
                    <Text>{this.props.screenProps.focusedClient.callsign}</Text>
                </View>
            </>
        );
    }
}
