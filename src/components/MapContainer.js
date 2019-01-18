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
        focusedClient: {},
        focusedMarkerIndex: -1,
        flightPathData: {}
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
        // Set info panel info to focused client
        this._removeFocusedClient();
        this.setState({
            focusedClient: client,
            focusedMarkerIndex: index,
            flightPathData: {
                depCoords: client.depCoords,
                location: client.location,
                arrCoords: client.arrCoords
            }
        });

        // Expand info panel to correct height based on client type
        if (client.type === 'PILOT') {
            this._setPanelPosition(panelStates.EXPANDED_PILOT);
        } else if (client.type === 'ATC') {
            this._setPanelPosition(panelStates.EXPANDED_ATC);
        }
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
                    focusedClient={this.state.focusedClient}
                />
            </View>
        );
    }
}
