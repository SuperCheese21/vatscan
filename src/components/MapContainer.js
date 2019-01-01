import React from 'react';
import { Animated, BackHandler, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import Map from './Map';
import InfoPanel from './InfoPanel';
import { panelStates, panelTransitionDuration } from '../config/constants.json';
import styles from './styles';

export default class MapContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        // Set default state
        this.state = this.defaultState;
    }

    componentDidMount() {
        // Add listener for Android hardware back button to close info panel
        BackHandler.addEventListener('hardwareBackPress', this.collapsePanel);
    }

    componentWillUnmount() {
        // Remove back button listener before component is unmounted
        BackHandler.removeEventListener('hardwareBackPress', this.collapsePanel);
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Icon name={'google-maps'} size={20} color={tintColor} />;
        }
    }

    defaultState = {
        panelPosition: new Animated.Value(panelStates.COLLAPSED),
        panelPositionValue: panelStates.COLLAPSED,
        focusedMarkerIndex: -1,
        flightPathData: {},
        basicData: {},
        detailData: {}
    }

    _setPanelPosition = position => {
        // Animate info panel position change
        this.setState({ panelPositionValue: position });
        Animated.timing(
            this.state.panelPosition,
            {
                toValue: position,
                duration: panelTransitionDuration
            }
        ).start();
    }

    _removeFocusedClient = () => {
        // Resetting state removes focused client info from info panel
        this.setState(this.defaultState);
    }

    setFocusedClient = (client, index) => {
        // Set info panel info to focused client, expand info panel
        this._removeFocusedClient();
        this.setState({
            focusedMarkerIndex: index,
            flightPathData: {
                depCoords: client.depCoords,
                location: client.location,
                arrCoords: client.arrCoords
            },
            basicData: {
                callsign: client.callsign,
                name: client.name,
                depAirport: client.depAirport || '????',
                arrAirport: client.arrAirport || '????',
                progress: client.progress
            },
            detailData: {
                aircraft: ' ' + client.aircraft,
                distFlown: client.distFlown >= 0 ? (' ' + client.distFlown + ' nm') : ' N/A',
                distRemaining: client.distRemaining >= 0 ? (' ' + client.distRemaining + ' nm') : ' N/A',
                altitude: ' ' + client.altitude + ' ft',
                heading: ' ' + client.heading + '°',
                groundSpeed: ' ' + client.groundSpeed + ' kts'
            }
        });
        this._setPanelPosition(panelStates.EXPANDED);
    }

    collapsePanel = () => {
        // Collapse panel and remove focused client
        this._setPanelPosition(panelStates.COLLAPSED);
        this._removeFocusedClient();
        return true;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Map
                    clientData={this.props.screenProps.clientData}
                    flightPathData={this.state.flightPathData}
                    focusedMarkerIndex={this.state.focusedMarkerIndex}
                    setFocusedClient={this.setFocusedClient}
                    collapsePanel={this.collapsePanel}
                />
                <Text style={styles.clientCountText}>
                    Clients: {this.props.screenProps.clientData.length}
                </Text>
                <InfoPanel
                    panelPosition={this.state.panelPosition}
                    basicData={this.state.basicData}
                    detailData={this.state.detailData}
                />
            </View>
        );
    }
}
