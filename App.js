import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

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
            flightPathData: {},
            basicData: {},
            detailData: {},
            footerData: {}
        };
    }

    setFocusedClient = c => {
        const distFlown = getGCDistance(c.flightplan.depCoords, c.location);
        const distRemaining = getGCDistance(c.location, c.flightplan.arrCoords);
        this.setState({
            progressBar: true,
            flightPathData: {
                depCoords: c.flightplan.depCoords,
                location: c.location,
                arrCoords: c.flightplan.arrCoords
            },
            basicData: {
                id: c.id,
                name: c.name,
                departureIcao: c.flightplan.depAirport || '????',
                arrivalIcao: c.flightplan.arrAirport || '????'
            },
            detailData: {
                aircraft: ' ' + c.flightplan.aircraft,
                distFlown: ' ' + Math.round(distFlown) + ' nm',
                distRemaining: ' ' + Math.round(distRemaining) + ' nm',
                altitude: ' ' + c.altitude + ' ft',
                heading: ' ' + c.heading + '°',
                speed: ' ' + c.groundSpeed + ' kts'
            },
            footerData: {
                callsign: c.callsign,
                progress: distFlown / (distFlown + distRemaining)
            }
        });
    }

    removeFocusedClient = () => {
        this.setState(this.getInitialState());
    }

    setPanelPosition = position => {
        this.infoPanel.current.setPanelPosition(position);
    }

    showLoader = () => {
        this.setState({
            loading: true
        });
    }

    hideLoader = () => {
        this.setState({
            loading: false
        });
    }

    render() {
        const c = this.state.focusedClient;
        return (
            <View style={{flex: 1}}>
                <Header loading={this.state.loading} />
                <Map
                    flightPathData={this.state.flightPathData}
                    showLoader={this.showLoader}
                    hideLoader={this.hideLoader}
                    setFocusedClient={this.setFocusedClient}
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
