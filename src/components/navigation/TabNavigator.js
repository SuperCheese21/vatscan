import React from 'react';
import { View } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';

import HeaderContainer from '../containers/HeaderContainer';
import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';
import RefreshIcon from '../RefreshIcon';
import colors from '../../config/colors.json';

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

const TabNavigatorContainer = props => (
    <>
        <HeaderContainer
            loading={props.screenProps.loading}
            refresh={props.screenProps.refresh}
        />
        <TabNavigator
            screenProps={{
                stackNavigation: props.navigation,
                clientData: props.screenProps.clientData
            }}
        />
    </>
);

export default TabNavigatorContainer;
