import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';
import colors from '../config/colors.json';

const TabNavigatorContainer = ({ navigation, screenProps }) => (
  <TabNavigator
    screenProps={{
      stackNavigation: navigation,
      loading: screenProps.loading,
      clients: screenProps.clients,
      focusedClient: screenProps.focusedClient,
      panelPosition: screenProps.panelPosition,
      refresh: screenProps.refresh,
      setFocusedClient: screenProps.setFocusedClient,
      collapsePanel: screenProps.collapsePanel,
    }}
  />
);

// Create tab navigator
const TabNavigator = createAppContainer(
  createMaterialTopTabNavigator(
    {
      Map: MapScreen,
      List: ListScreen,
    },
    {
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      tabBarOptions: {
        showIcon: true,
        upperCaseLabel: false,
        indicatorStyle: {
          backgroundColor: colors.accent,
        },
        labelStyle: {
          margin: 0,
        },
        style: {
          backgroundColor: colors.primaryDark,
        },
      },
    },
  ),
);

export default TabNavigatorContainer;
