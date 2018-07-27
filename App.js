import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import Header from './src/components/Header';
import Map from './src/components/Map';
import InfoPanel from './src/components/InfoPanel';
import Footer from './src/components/Footer';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.infoPanel = React.createRef();
        this.state = {
            loading: true,
            focusedClient: {
                callsign: '',
                id: '',
                name: '',
                departureIcao: '',
                arrivalIcao: '',
                aircraft: '',
                altitude: '',
                heading: '',
                speed: ''
            }
        };
    }

    setFocusedClient = c => {
        this.setState({
            focusedClient: {
                callsign: c.callsign,
                id: c.id,
                name: c.name,
                departureIcao: c.flightplan.depairport,
                arrivalIcao: c.flightplan.destairport,
                aircraft: c.flightplan.aircraft,
                altitude: c.altitude,
                heading: c.heading,
                speed: c.groundspeed
            }
        });
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
                    showLoader={this.showLoader}
                    hideLoader={this.hideLoader}
                    setFocusedClient={this.setFocusedClient}
                    setPanelPosition={this.setPanelPosition}
                />
                <InfoPanel
                    ref={this.infoPanel}
                    data={this.state.focusedClient}
                />
                <Footer callsign={c.callsign} />
            </View>
        );
    }
}
