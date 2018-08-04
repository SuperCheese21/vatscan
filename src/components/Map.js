import React, { Component } from 'react';
import { MapView } from 'expo';

import FlightPath from './FlightPath';
import MapOverlays from './MapOverlays';

import { fetchData, parseClientData } from '../lib/fetch';
import constants from '../config/constants.json';
import mapStyle from '../config/map-styles/style_blue_essence.json';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            clientData: []
        };
    }

    componentDidMount() {
        this.updateData();
        setInterval(() => {
            this.updateData();
        }, constants.UPDATE_INTERVAL);
    }

    updateData() {
        this.props.showLoader();
        fetchData()
            .then(data => {
                this.setState({
                    clientData: parseClientData(data)
                });
                this.props.hideLoader();
            })
            .catch(e => {
                console.error(e);
            });
    }

    render() {
        return (
            <MapView style={{ flex: 1 }}
                initialRegion={{
                    latitude: 38,
                    longitude: -97,
                    latitudeDelta: 60,
                    longitudeDelta: 30
                }}
                customMapStyle={mapStyle}
                moveOnMarkerPress={false}
                toolbarEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                showsIndoors={false}
                onPress={() => {
                    this.props.setPanelPosition(constants.panelStates.COLLAPSED);
                    this.props.removeFocusedClient();
                }}
            >

                <MapOverlays
                    data={this.state.clientData}
                    setFocusedClient={this.props.setFocusedClient}
                    focusedMarkerIndex={this.props.focusedMarkerIndex}
                    getPanelPosition={this.props.getPanelPosition}
                    setPanelPosition={this.props.setPanelPosition}
                />

                <FlightPath data={this.props.flightPathData} />

            </MapView>
        );
    }
}
