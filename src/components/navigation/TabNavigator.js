import React, { PureComponent } from 'react';
import { IconButton } from 'react-native-paper';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { navigationShape, screenPropsShape } from '../propTypeShapes';
import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';
import { accent, primaryDark } from '../../config/colors.json';

class TabNavigatorContainer extends PureComponent {
  static navigationOptions = ({ navigation: stackNavigation }) => ({
    headerLeft: () => (
      <IconButton
        icon="settings"
        color={accent}
        onPress={() => stackNavigation.navigate('SettingsScreen')}
      />
    ),
    headerRight: () => (
      <IconButton
        icon="filter"
        color={accent}
        onPress={() => stackNavigation.navigate('FiltersScreen')}
      />
    ),
    title: 'VATSCAN',
  });

  render() {
    const { screenProps, navigation } = this.props;
    return (
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
  }
}

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
          backgroundColor: accent,
        },
        labelStyle: {
          margin: 0,
        },
        style: {
          backgroundColor: primaryDark,
        },
      },
    },
  ),
);

TabNavigatorContainer.propTypes = {
  navigation: navigationShape.isRequired,
  screenProps: screenPropsShape.isRequired,
};

export default TabNavigatorContainer;
