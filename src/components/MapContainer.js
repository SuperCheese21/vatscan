import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import Map from './Map';
import InfoPanel from './InfoPanel';
import Footer from './Footer';

export default class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.infoPanel = React.createRef();
    }

    getInitialState = () => {
        return {
            focusedMarkerIndex: -1,
            flightPathData: {},
            basicData: {},
            detailData: {},
            footerData: {}
        };
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
                    id: client.id,
                    name: client.name,
                    depAirport: client.depAirport || '????',
                    arrAirport: client.arrAirport || '????'
                },
                detailData: {
                    aircraft: ' ' + client.aircraft,
                    distFlown: client.distFlown >= 0 ? (' ' + client.distFlown + ' nm') : ' N/A',
                    distRemaining: client.distRemaining >= 0 ? (' ' + client.distRemaining + ' nm') : ' N/A',
                    altitude: ' ' + client.altitude + ' ft',
                    heading: ' ' + client.heading + '°',
                    groundSpeed: ' ' + client.groundSpeed + ' kts'
                },
                footerData: {
                    callsign: client.callsign,
                    progress: client.progress
                }
            });
        } else {
            this.setState({
                focusedMarkerIndex: index,
                basicData: {
                    id: client.id,
                    name: client.name
                },
                footerData: {
                    callsign: client.callsign
                }
            });
        }
    }

    removeFocusedClient = () => {
        this.setState(this.getInitialState());
    }

    getPanelPosition = () => {
        return this.infoPanel.current.getPanelPosition();
    }

    setPanelPosition = position => {
        console.log('setPanelPosition(' + position + ')');
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
