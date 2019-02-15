import React from 'react';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';

import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';
import colors from '../../config/colors.json';

const TabNavigatorContainer = props => (
    <TabNavigator
        screenProps={{
            stackNavigation: props.navigation,
            loading: props.screenProps.loading,
            refresh: props.screenProps.refresh,
            clients: props.screenProps.clients,
            focusedClient: props.screenProps.focusedClient,
            setFocusedClient: props.screenProps.setFocusedClient,
            removeFocusedClient: props.screenProps.removeFocusedClient
        }}
    />
);

// Create tab navigator
const TabNavigator = createAppContainer(
    createMaterialTopTabNavigator({
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
    })
);

export default TabNavigatorContainer;
