import React from 'react';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';

import HeaderContainer from '../containers/HeaderContainer';
import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';
import colors from '../../config/colors.json';

const TabNavigatorContainer = props => (
    <>
        <HeaderContainer
            loading={props.screenProps.loading}
            refresh={props.screenProps.refresh}
            text={'VATSCAN'}
            centerTitle={false}
        />
        <TabNavigator
            screenProps={{
                stackNavigation: props.navigation,
                clients: props.screenProps.clients,
                focusedClient: props.screenProps.focusedClient,
                setFocusedClient: props.screenProps.setFocusedClient,
                removeFocusedClient: props.screenProps.removeFocusedClient
            }}
        />
    </>
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
