import React, { Component } from 'react';
import { View } from 'react-native';
import { AppLoading, Font } from 'expo';

import Header from './src/components/Header';
import Map from './src/components/Map';
import InfoPanel from './src/components/InfoPanel';
import Footer from './src/components/Footer';

import { getGCDistance } from './src/lib/util';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.infoPanel = React.createRef();
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto_Regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),
            'Roboto_Condensed_Regular': require('./src/assets/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf')
        });
        this.setState({ fontLoaded: true });
    }

    getInitialState = () => {
        return {
            loading: false,
            fontLoaded: false,
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
                    distFlown: distFlown >= 0 ? (' ' + distFlown + ' nm') : ' N/A',
                    distRemaining: distRemaining >= 0 ? (' ' + distRemaining + ' nm') : ' N/A',
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
        if (!this.state.fontLoaded) {
            return ( <AppLoading /> );
        }

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
                    getPanelPosition={this.getPanelPosition}
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
