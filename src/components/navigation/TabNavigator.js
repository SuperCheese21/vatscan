import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';

import colors from '../../config/colors.json';

// Create tab navigator
const TabNavigator = createMaterialBottomTabNavigator({
    Map: MapScreen,
    List: ListScreen
}, {
    barStyle: {
        backgroundColor: colors.primaryDark
    }
});

const TabNavigatorContainer = createAppContainer(TabNavigator);

export default TabNavigatorContainer;
