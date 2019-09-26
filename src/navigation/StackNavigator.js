import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import ClientScreen from '../screens/ClientScreen';
import TabNavigatorContainer from './TabNavigator';
import colors from '../config/colors.json';

const StackNavigator = createAppContainer(
  createStackNavigator(
    {
      TabNavigator: TabNavigatorContainer,
      ClientScreen: {
        screen: ClientScreen,
        path: 'client/:callsign'
      }
    },
    {
      transitionConfig: getSlideFromRightTransition,
      defaultNavigationOptions: {
        title: 'VATSCAN',
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Roboto_Regular',
          fontWeight: 'normal',
          fontSize: 20
        },
        headerTintColor: colors.accent
      },
      headerLayoutPreset: 'center'
    }
  )
);

export default StackNavigator;
