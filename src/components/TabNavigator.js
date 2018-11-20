import React from 'react';
import { Button, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import ListContainer from './ListContainer';
import MapContainer from './MapContainer';

import colors from '../config/colors.json';

const TabNavigator = createMaterialBottomTabNavigator({
    Map: MapContainer,
    List: ListContainer
}, {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Map') {
                iconName = 'google-maps';
            } else if (routeName === 'List') {
                iconName = 'format-list-bulleted';
            }
            return <Icon name={iconName} size={20} color={tintColor} />;
        }
    }),
    barStyle: {
        backgroundColor: colors.primaryDark
    }
});

export default TabNavigator;
