import React, { Component } from 'react';
import { View } from 'react-native';
import { AppLoading, Font } from 'expo';

import constants from './src/config/constants.json';
import { fetchData, parseClientData } from './src/lib/util/fetch';
import Header from './src/components/Header';
import TabNavigator from './src/components/TabNavigator';

export default class App extends Component {
    state = {
        fontLoaded: false,
        clientData: [],
        loading: false
    };

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto_Regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),
            'Roboto_Condensed_Regular': require('./src/assets/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf')
        });
        this.setState({
            fontLoaded: true
        }, () => {
            this.updateData();
            setInterval(() => {
                this.updateData();
            }, constants.UPDATE_INTERVAL);
        });
    }

    updateData() {
        this.setState({ loading: true });
        fetchData()
            .then(data => {
                this.setState({
                    clientData: parseClientData(data),
                    loading: false
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        if (!this.state.fontLoaded) {
            return ( <AppLoading /> );
        }
        return (
            <View style={{ flex: 1 }}>
                <Header loading={this.state.loading} />
                <TabNavigator
                    screenProps={{
                        clientData: this.state.clientData
                    }}
                />
            </View>
        );
    }
}
