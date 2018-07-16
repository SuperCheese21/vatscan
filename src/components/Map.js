import React from 'react';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';

import constants from '../config/constants.json';
import fetchPilotData from '../lib/fetch';
import mapStyle from '../config/map-styles/style_blue_essence.json';
import { getIcon } from '../lib/util';


export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pilotData: []
        };
    }

    componentDidMount() {
        this.updateData();
        this.state = {
            updateInterval: setInterval(() => {
                this.updateData();
            }, constants.UPDATE_INTERVAL)
        }
    }

    updateData() {
        this.props.showLoader();
        fetchPilotData()
            .then(data => {
                this.setState({ pilotData: data });
                this.props.hideLoader();
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
                        key={pilot.cid}
                        image={getIcon(pilot.flightplan.aircraft)}
                        rotation={pilot.heading}
                        anchor={{ x: 0.5, y: 0.5 }}
                        coordinate={pilot.location}
                        title={pilot.callsign}
                        description={pilot.realname}
                    />
                ))}
            </MapView>
        );
    }
}
