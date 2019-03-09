import { createAppContainer, createStackNavigator } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import ClientScreen from '../screens/ClientScreen';
import TabNavigatorContainer from './TabNavigator';
import colors from '../../config/colors.json';
import styles from '../styles';

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
                headerTitleStyle: styles.headerText,
                headerTintColor: colors.accent
            },
            headerLayoutPreset: 'center'
        }
    )
);

export default StackNavigator;
