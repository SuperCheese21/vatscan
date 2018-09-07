import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { AppLoading, Font } from 'expo';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import MapContainer from './src/components/MapContainer';

import colors from './src/config/colors.json';

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
        return ( <Navigator /> );
    }
}

class List extends Component {
    static navigationOptions = {
        title: 'List',
        tabBarIcon: <Icon name='format-list-bulleted' color='white' size={20} />
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>List</Text>
            </View>
        )
    }
}

const Navigator = createMaterialBottomTabNavigator({
    Map: MapContainer,
    List: List
}, {
    barStyle: {
        backgroundColor: colors.primaryDark
    }
});
