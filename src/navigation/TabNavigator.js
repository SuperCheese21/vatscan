import React from 'react';
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from 'react-navigation';

import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';
import colors from '../config/colors.json';

const TabNavigatorContainer = props => (
  <TabNavigator
    screenProps={{
      stackNavigation: props.navigation,
      loading: props.screenProps.loading,
      clients: props.screenProps.clients,
      focusedClient: props.screenProps.focusedClient,
      panelPosition: props.screenProps.panelPosition,
      refresh: props.screenProps.refresh,
      setFocusedClient: props.screenProps.setFocusedClient,
      collapsePanel: props.screenProps.collapsePanel
    }}
  />
);

// Create tab navigator
const TabNavigator = createAppContainer(
  createMaterialTopTabNavigator(
    {
      Map: MapScreen,
      List: ListScreen
    },
    {
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
    }
  )
);

export default TabNavigatorContainer;
