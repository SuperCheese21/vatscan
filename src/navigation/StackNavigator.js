import { createAppContainer } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import { createStackNavigator } from 'react-navigation-stack';

import TabNavigatorContainer from './TabNavigator';

import colors from '../config/colors.json';
import ClientScreen from '../screens/ClientScreen';

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
      transitionConfig: getSlideFromRightTransition,
      defaultNavigationOptions: {
        title: 'VATSCAN',
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Roboto_Regular',
          fontWeight: 'normal',
          fontSize: 20,
        },
        headerTintColor: colors.accent,
      },
      headerLayoutPreset: 'center',
    },
  ),
);

export default StackNavigator;
