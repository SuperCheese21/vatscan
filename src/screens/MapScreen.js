import React from 'react';
import { Animated, BackHandler, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import FlightPath from '../components/FlightPath';
import InfoPanelContainer from '../containers/InfoPanelContainer';
import Map from '../components/Map';
import MapOverlays from '../components/MapOverlays';
import { accent as accentColor } from '../config/colors.json';
import { panelStates, panelTransitionDuration } from '../config/constants.json';

export default class MapScreen extends React.PureComponent {
    state = {
        panelPosition: new Animated.Value(panelStates.COLLAPSED)
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

    setFocusedClient = client => {
        // Set focused client and expand panel to height based on client type
        this.props.screenProps.setFocusedClient(client);
        if (client.type === 'PILOT') {
            this._setPanelPosition(panelStates.EXPANDED_PILOT);
        } else if (client.type === 'ATC') {
            this._setPanelPosition(panelStates.EXPANDED_ATC);
        }
    };

    collapsePanel = () => {
        // Collapse panel and remove focused client
        this._setPanelPosition(panelStates.COLLAPSED);
        this.props.screenProps.removeFocusedClient();

        return true;
    };

    _setPanelPosition = position => {
        // Animate info panel position change
        Animated.timing(this.state.panelPosition, {
            toValue: position,
            duration: panelTransitionDuration,
            useNativeDriver: true
        }).start();
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Map style={{ flex: 1 }} onPress={this.collapsePanel}>
                    <MapOverlays
                        clients={this.props.screenProps.clients}
                        focusedClient={this.props.screenProps.focusedClient}
                        setFocusedClient={this.setFocusedClient}
                    />
                    <FlightPath
                        focusedClient={this.props.screenProps.focusedClient}
                    />
                </Map>
                <ActivityIndicator
                    color={accentColor}
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

const styles = StyleSheet.create({
    activityIndicator: {
        position: 'absolute',
        right: 3,
        top: 3
    },
    clientCountText: {
        fontFamily: 'Roboto_Regular',
        position: 'absolute',
        left: 5,
        top: 2
    }
});
