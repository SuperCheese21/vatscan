import PropTypes from 'prop-types';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Client from '../api/Client';
import colors from '../config/colors.json';
import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';

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

const navigationShape = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
});

const screenPropsShape = PropTypes.shape({
  stackNavigation: navigationShape.isRequired,
  loading: PropTypes.bool.isRequired,
  clients: PropTypes.arrayOf(PropTypes.instanceOf(Client)).isRequired,
  focusedClient: PropTypes.instanceOf(Client).isRequired,
  panelPosition: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
  setFocusedClient: PropTypes.func.isRequired,
  collapsePanel: PropTypes.func.isRequired,
});

TabNavigatorContainer.propTypes = {
  navigation: navigationShape.isRequired,
  screenProps: screenPropsShape.isRequired,
};

export default TabNavigatorContainer;
