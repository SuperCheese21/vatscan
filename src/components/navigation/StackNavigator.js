import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TabNavigatorContainer from './TabNavigator';

import ClientScreen from '../screens/ClientScreen';
import colors from '../../config/colors.json';

const StackNavigator = createAppContainer(
  createStackNavigator(
    {
      TabNavigator: TabNavigatorContainer,
      ClientScreen: {
        screen: ClientScreen,
        path: 'client/:callsign',
      },
    },
    {
      defaultNavigationOptions: {
        title: 'VATSCAN',
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Roboto_Regular',
          fontWeight: 'normal',
          fontSize: 20,
        },
        headerTintColor: colors.accent,
      },
    },
  ),
);

export default StackNavigator;
