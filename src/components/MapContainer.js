import React from 'react';
import { View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import Map from './Map';
import InfoPanel from './InfoPanel';

export default class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.defaultState;
        this.infoPanel = React.createRef();
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Icon name={'google-maps'} size={20} color={tintColor} />;
        }
    }

    defaultState = {
        focusedMarkerIndex: -1,
        flightPathData: {},
        basicData: {},
        detailData: {}
    }

    setFocusedClient = (client, index) => {
        this.removeFocusedClient();
        if (client.type === 'PILOT') {
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
                    arrAirport: client.arrAirport || '????'
                },
                detailData: {
                    aircraft: ' ' + client.aircraft,
                    distFlown: client.distFlown >= 0 ? (' ' + client.distFlown + ' nm') : ' N/A',
                    distRemaining: client.distRemaining >= 0 ? (' ' + client.distRemaining + ' nm') : ' N/A',
                    progress: client.progress,
                    altitude: ' ' + client.altitude + ' ft',
                    heading: ' ' + client.heading + '°',
                    groundSpeed: ' ' + client.groundSpeed + ' kts'
                }
            });
        } else {
            this.setState({
                focusedMarkerIndex: index,
                basicData: {
                    callsign: client.callsign,
                    id: client.id,
                    name: client.name
                }
            });
        }
    }

    removeFocusedClient = () => {
        this.setState(this.defaultState);
    }

    getPanelPosition = () => {
        return this.infoPanel.current.getPanelPosition();
    }

    setPanelPosition = position => {
        this.infoPanel.current.setPanelPosition(position);
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
                    getPanelPosition={this.getPanelPosition}
                    setPanelPosition={this.setPanelPosition}
                />
                <InfoPanel
                    ref={this.infoPanel}
                    basicData={this.state.basicData}
                    detailData={this.state.detailData}
                    removeFocusedClient={this.removeFocusedClient}
                />
            </View>
        );
    }
}
