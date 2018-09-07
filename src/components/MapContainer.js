import React, { Component } from 'react';
import { View } from 'react-native';

import Header from './Header';
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
            loading: false,
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
            console.log('depCoords: ' + client.depCoords);
            console.log('location: ' + client.location);
            console.log('arrCoords: ' + client.arrCoords);
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

    showLoader = () => {
        this.setState({ loading: true });
    }

    hideLoader = () => {
        this.setState({ loading: false });
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
                <Header loading={this.state.loading} />
                <Map
                    flightPathData={this.state.flightPathData}
                    showLoader={this.showLoader}
                    hideLoader={this.hideLoader}
                    setFocusedClient={this.setFocusedClient}
                    focusedMarkerIndex={this.state.focusedMarkerIndex}
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
                <Footer data={this.state.footerData} />
            </View>
        );
    }
}
