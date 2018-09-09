import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import MapContainer from './MapContainer';

import colors from '../config/colors.json';

const TabNavigator = createMaterialBottomTabNavigator({
    Map: MapContainer,
    List: () => (
        <View style={{ flex: 1 }}>
            <Text>List</Text>
        </View>
    )
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
