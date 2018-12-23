import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import ListContainer from './ListContainer';
import MapContainer from './MapContainer';

import colors from '../config/colors.json';

const TabNavigator = createMaterialBottomTabNavigator({
    Map: MapContainer,
    List: ListContainer
}, {
    barStyle: {
        backgroundColor: colors.primaryDark
    }
});

const TabNavigatorContainer = createAppContainer(TabNavigator);

export default TabNavigatorContainer;
