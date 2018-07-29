import React, { Component } from 'react';
import { View } from 'react-native';

import Header from './src/components/Header';
import Map from './src/components/Map';
import InfoPanel from './src/components/InfoPanel';
import Footer from './src/components/Footer';

import { getGCDistance } from './src/lib/util';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.infoPanel = React.createRef();
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            loading: true,
            progressBar: false,
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
            const distFlown = getGCDistance(client.depCoords, client.location);
            const distRemaining = getGCDistance(client.location, client.arrCoords);
            this.setState({
                progressBar: true,
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
                    distFlown: ' ' + Math.round(distFlown) + ' nm',
                    distRemaining: ' ' + Math.round(distRemaining) + ' nm',
                    altitude: ' ' + client.altitude + ' ft',
                    heading: ' ' + client.heading + '°',
                    groundSpeed: ' ' + client.groundSpeed + ' kts'
                },
                footerData: {
                    callsign: client.callsign,
                    progress: distFlown / (distFlown + distRemaining)
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

    setPanelPosition = position => {
        this.infoPanel.current.setPanelPosition(position);
    }

    showLoader = () => {
        this.setState({ loading: true });
    }

    hideLoader = () => {
        this.setState({ loading: false });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header loading={this.state.loading} />
                <Map
                    flightPathData={this.state.flightPathData}
                    showLoader={this.showLoader}
                    hideLoader={this.hideLoader}
                    setFocusedClient={this.setFocusedClient}
                    focusedMarkerIndex={this.state.focusedMarkerIndex}
                    removeFocusedClient={this.removeFocusedClient}
                    setPanelPosition={this.setPanelPosition}
                />
                <InfoPanel
                    ref={this.infoPanel}
                    basicData={this.state.basicData}
                    detailData={this.state.detailData}
                    removeFocusedClient={this.removeFocusedClient}
                />
                <Footer data={this.state.footerData} progressBar={this.state.progressBar} />
            </View>
        );
    }
}
