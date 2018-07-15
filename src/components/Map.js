import React from 'react';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';

import constants from '../config/constants';
import fetchPilotData from '../lib/fetch';
import mapStyle from '../config/map-styles/style_blue_essence.json';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            pilotData: []
        };
    }

    componentDidMount() {
        this.state = {
            updateInterval: setInterval(() => {
                this.updateData();
            }, constants.UPDATE_INTERVAL)
        }
    }

    updateData() {
        fetchPilotData()
            .then(data => {
                console.log(data);
                this.setState({
                    pilotData: data
                });
            })
            .catch(e => {
                console.error(e);
            });
    }

    render() {
        return (
            <MapView style = {{ flex: 1 }}
                initialRegion = {{
                    latitude: 38,
                    longitude: -97,
                    latitudeDelta: 60,
                    longitudeDelta: 30
                }}
                customMapStyle = {mapStyle}>

                {this.state.pilotData.map(pilot => (
                    <Marker
                        coordinate={pilot.location}
                        title={pilot.callsign}
                        description={pilot.realname}
                    />
                ))}
            </MapView>
        );
    }
}
