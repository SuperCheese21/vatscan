import React from 'react';
import { Animated, BackHandler, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import MapContainer from '../containers/MapContainer';
import InfoPanelContainer from '../containers/InfoPanelContainer';
import {
    panelStates,
    panelTransitionDuration
} from '../../config/constants.json';
import styles from '../styles';
import colors from '../../config/colors.json';

export default class MapScreen extends React.PureComponent {
    state = {
        panelPosition: new Animated.Value(panelStates.COLLAPSED),
        panelPositionValue: panelStates.COLLAPSED
    };

    componentDidMount() {
        // Add listener for Android hardware back button to close info panel
        BackHandler.addEventListener('hardwareBackPress', this.collapsePanel);
    }

    componentWillUnmount() {
        // Remove back button listener before component is unmounted
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.collapsePanel
        );
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name={'google-maps'} size={20} color={tintColor} />
        )
    };

    setPanelPosition = position => {
        // Animate info panel position change
        this.setState({ panelPositionValue: position });
        Animated.timing(this.state.panelPosition, {
            toValue: position,
            duration: panelTransitionDuration
        }).start();
    };

    setFocusedClient = client => {
        // Set focused client and expand panel to height based on client type
        this.props.screenProps.setFocusedClient(client);
        if (client.type === 'PILOT') {
            this.setPanelPosition(panelStates.EXPANDED_PILOT);
        } else if (client.type === 'ATC') {
            this.setPanelPosition(panelStates.EXPANDED_ATC);
        }
    };

    collapsePanel = () => {
        // Collapse panel and remove focused client
        this.setPanelPosition(panelStates.COLLAPSED);
        this.props.screenProps.removeFocusedClient();

        return true;
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapContainer
                    clients={this.props.screenProps.clients}
                    focusedClient={this.props.screenProps.focusedClient}
                    setFocusedClient={this.setFocusedClient}
                    collapsePanel={this.collapsePanel}
                />
                <ActivityIndicator
                    color={colors.accent}
                    animating={this.props.screenProps.loading}
                    style={styles.activityIndicator}
                />
                <Text style={styles.clientCountText}>
                    Clients: {this.props.screenProps.clients.length}
                </Text>
                <InfoPanelContainer
                    stackNavigation={this.props.screenProps.stackNavigation}
                    panelPosition={this.state.panelPosition}
                    focusedClient={this.props.screenProps.focusedClient}
                />
            </View>
        );
    }
}
