import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import Header from './src/components/Header';
import Map from './src/components/Map';
import InfoPanel from './src/components/InfoPanel';
import Footer from './src/components/Footer';

import airportData from './src/data/airports.json';

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
        this.setState({
            progressBar: true,
            flightPathData: {
                depCoords: airportData[c.flightplan.depairport],
                location: c.location,
                destCoords: airportData[c.flightplan.destairport]
            },
            basicData: {
                id: c.id,
                name: c.name,
                departureIcao: c.flightplan.depairport || '????',
                arrivalIcao: c.flightplan.destairport || '????'
            },
            detailData: {
                aircraft: ' ' + c.flightplan.aircraft,
                altitude: ' ' + c.altitude + ' ft',
                heading: ' ' + c.heading + '°',
                speed: ' ' + c.groundspeed + ' kts'
            },
            footerData: {
                callsign: c.callsign,
                progress: 0.5
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
