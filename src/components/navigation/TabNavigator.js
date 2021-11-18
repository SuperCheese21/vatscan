import React from 'react';
import { Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';
import { accent, primaryDark } from '../../config/colors.json';

const TabNavigator = createAppContainer(
  createMaterialTopTabNavigator(
    {
      Map: {
        screen: MapScreen,
        path: 'map',
      },
      List: {
        screen: ListScreen,
        path: 'list',
      },
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

TabNavigator.navigationOptions = ({ navigation: stackNavigation }) => ({
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

export default TabNavigator;
