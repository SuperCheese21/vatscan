import React, { Component } from 'react';
import { Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { navigationShape, screenPropsShape } from '../propTypeShapes';
import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';
import { accent, primaryDark } from '../../config/colors.json';

class TabNavigatorContainer extends Component {
  static navigationOptions = ({ navigation: stackNavigation }) => ({
    headerLeft: () => (
      <IconButton
        icon="cog"
        color={accent}
        onPress={() => Alert.alert('Coming Soon!')}
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
    const { navigation, screenProps } = this.props;
    return (
      <TabNavigator
        screenProps={{
          stackNavigation: navigation,
          isLoading: screenProps.isLoading,
          filteredClients: screenProps.filteredClients,
          focusedClient: screenProps.focusedClient,
          panelPosition: screenProps.panelPosition,
          updateData: screenProps.updateData,
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
