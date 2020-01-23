import React, { PureComponent } from 'react';
import { IconButton } from 'react-native-paper';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { navigationShape } from '../propTypeShapes';
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
    const { navigation } = this.props;
    return <TabNavigator screenProps={{ stackNavigation: navigation }} />;
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
};

export default TabNavigatorContainer;
