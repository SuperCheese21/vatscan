import { createAppContainer, createStackNavigator } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import ClientScreen from '../screens/ClientScreen';
import TabNavigatorContainer from './TabNavigator';

const StackNavigator = createAppContainer(
    createStackNavigator({
        TabNavigator: TabNavigatorContainer,
        ClientScreen: ClientScreen
    }, {
        transitionConfig: getSlideFromRightTransition,
        headerMode: 'none'
    })
);

export default StackNavigator;
