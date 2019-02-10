import React from 'react';
import { View } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';

import HeaderContainer from '../containers/HeaderContainer';
import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';
import RefreshIcon from '../RefreshIcon';
import colors from '../../config/colors.json';

export default class TabNavigatorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigation.setParams({
            loading: this.props.screenProps.loading,
            refresh: this.props.screenProps.refresh
        });
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'VATSCAN',
        headerRight: (
            <RefreshIcon
                loading={navigation.getParam('loading')}
                refresh={navigation.getParam('refresh')}
            />
        )
    });

    render() {
        return (
            <TabNavigator
                screenProps={{
                    stackNavigation: this.props.navigation,
                    clientData: this.props.screenProps.clientData
                }}
            />
        );
    }
}

// Create tab navigator
const TabNavigator = createAppContainer(
    createMaterialTopTabNavigator({
        Map: MapScreen,
        List: ListScreen
    }, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showIcon: true,
            upperCaseLabel: false,
            indicatorStyle: {
                backgroundColor: colors.accent
            },
            labelStyle: {
                margin: 0
            },
            style: {
                backgroundColor: colors.primaryDark
            }
        }
    })
);
