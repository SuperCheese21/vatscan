import React from 'react';
import { Animated, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import Map from './Map';
import InfoPanel from './InfoPanel';
import { panelStates, panelTransitionDuration } from '../config/constants.json';

export default class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.defaultState;
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

    setFocusedClient = (client, index) => {
        this.removeFocusedClient();
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
    }

    removeFocusedClient = () => {
        this.setState(this.defaultState);
    }

    setPanelPosition = position => {
        this.setState({ panelPositionValue: position });
        Animated.timing(
            this.state.panelPosition,
            {
                toValue: position,
                duration: panelTransitionDuration
            }
        ).start();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Map
                    clientData={this.props.screenProps.clientData}
                    flightPathData={this.state.flightPathData}
                    focusedMarkerIndex={this.state.focusedMarkerIndex}
                    setFocusedClient={this.setFocusedClient}
                    removeFocusedClient={this.removeFocusedClient}
                    panelPosition={this.state.panelPositionValue}
                    setPanelPosition={this.setPanelPosition}
                />
                <InfoPanel
                    panelPosition={this.state.panelPosition}
                    basicData={this.state.basicData}
                    detailData={this.state.detailData}
                />
            </View>
        );
    }
}
