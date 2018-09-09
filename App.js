import React, { Component } from 'react';
import { View } from 'react-native';
import { AppLoading, Font } from 'expo';

import Header from './src/components/Header';
import TabNavigator from './src/components/TabNavigator';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto_Regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),
            'Roboto_Condensed_Regular': require('./src/assets/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf')
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        if (!this.state.fontLoaded) {
            return ( <AppLoading /> );
        }
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <TabNavigator />
            </View>
        );
    }
}
