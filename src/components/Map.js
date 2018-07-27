import React, { Component } from 'react';
import { MapView } from 'expo';

import constants from '../config/constants.json';
import mapStyle from '../config/map-styles/style_blue_essence.json';

import { fetchData, parsePilotData, parseATCData } from '../lib/fetch';
import {
    PilotMarkers,
    CenterMarkers,
    ApproachMarkers,
    TowerMarkers,
    GroundMarkers
} from './MapMarkers';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pilotData: [],
            atcData: {
                ground: [],
                tower: [],
                approach: [],
                center: []
            }
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
                    pilotData: parsePilotData(data[0]),
                    atcData: parseATCData(data[0], data[1])
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
            >

                <CenterMarkers data={this.state.atcData.center} />

                <ApproachMarkers data={this.state.atcData.approach} />

                <TowerMarkers data={this.state.atcData.tower} />

                <GroundMarkers data={this.state.atcData.ground} />

                <PilotMarkers
                    data={this.state.pilotData}
                    setFocusedClient={this.props.setFocusedClient}
                    setPanelPosition={this.props.setPanelPosition}
                />

            </MapView>
        );
    }
}
