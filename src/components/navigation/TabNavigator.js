import React from 'react';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';

import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';

import colors from '../../config/colors.json';

// Create tab navigator
const TabNavigator = createMaterialTopTabNavigator({
    Map: MapScreen,
    List: ListScreen
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        showIcon: true,
        upperCaseLabel: false,
        indicatorStyle: {
            backgroundColor: colors.accent
        },
        labelStyle: {
            margin: 0
        },
        style: {
            backgroundColor: colors.primaryDark
        }
    }
});

const TabNavigatorContainer = createAppContainer(TabNavigator);

export default TabNavigatorContainer;
