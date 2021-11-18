import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TabNavigator from './TabNavigator';

import ClientScreen from '../screens/ClientScreen';
import FiltersScreen from '../screens/FiltersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { accent, primary } from '../../config/colors.json';

const StackNavigator = createAppContainer(
  createStackNavigator(
    {
      TabNavigator: {
        screen: TabNavigator,
        path: '',
      },
      ClientScreen: {
        screen: ClientScreen,
        path: 'client/:callsign',
      },
      FiltersScreen: {
        screen: FiltersScreen,
        path: 'filters',
      },
      SettingsScreen: {
        screen: SettingsScreen,
        path: 'settings',
      },
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: primary,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Roboto_Regular',
          fontWeight: 'normal',
          fontSize: 20,
        },
        headerTintColor: accent,
      },
    },
  ),
);

export default StackNavigator;
