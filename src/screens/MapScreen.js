import React from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import InfoPanelContainer from '../containers/InfoPanelContainer';
import Map from '../components/Map';
import MapOverlays, { FlightPath } from '../components/MapOverlays';
import Text from '../components/Text';
import { accent as accentColor } from '../config/colors.json';

export default class MapScreen extends React.PureComponent {
    componentDidMount() {
        // Add listener for Android hardware back button to close info panel
        BackHandler.addEventListener('hardwareBackPress', this.props.screenProps.collapsePanel);
    }

    componentWillUnmount() {
        // Remove back button listener before component is unmounted
        console.log('unmounted');
        BackHandler.removeEventListener('hardwareBackPress', this.props.screenProps.collapsePanel);
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => <Icon name={'google-maps'} size={20} color={tintColor} />
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Map style={{ flex: 1 }} onPress={this.props.screenProps.collapsePanel}>
                    <MapOverlays
                        clients={this.props.screenProps.clients}
                        focusedClient={this.props.screenProps.focusedClient}
                        setFocusedClient={this.props.screenProps.setFocusedClient}
                    />
                    <FlightPath client={this.props.screenProps.focusedClient} />
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
                    panelPosition={this.props.screenProps.panelPosition}
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
