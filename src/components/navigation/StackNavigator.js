import { createAppContainer, createStackNavigator } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import ClientScreen from '../screens/ClientScreen';
import TabNavigator from './TabNavigator';

const StackNavigator = createAppContainer(
    createStackNavigator({
        TabNavigator: TabNavigator,
        ClientScreen: ClientScreen
    }, {
        transitionConfig: getSlideFromRightTransition
    })
);

export default StackNavigator;
