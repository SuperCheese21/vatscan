import React from 'react';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';

import constants from '../config/constants.json';
import fetchPilotData from '../lib/fetch';
import mapStyle from '../config/map-styles/style_blue_essence.json';
import { getAircraftType } from '../lib/util';

const NARROWBODY_ICON = require('../assets/icons/narrowbody.png');
const WIDEBODY_ICON = require('../assets/icons/widebody.png');
const GA_ICON = require('../assets/icons/ga.png');
const SEEKBAR_ICON = require('../assets/icons/seekbar.png');

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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


                {this.state.pilotData.map(pilot => {
                    let icon, type = getAircraftType(pilot.flightplan.aircraft);
                    console.log(pilot.flightplan.aircraft + '\n');

                    if (type === 2) {
                        icon = WIDEBODY_ICON;
                    } else if (type === 1) {
                        icon = NARROWBODY_ICON;
                    } else {
                        icon = GA_ICON;
                    }

                    return (
                        <Marker
                            key={pilot.cid}
                            image={icon}
                            rotation={Number(pilot.heading)}
                            anchor={{ x: 0.5, y: 0.5 }}
                            coordinate={pilot.location}
                            title={pilot.callsign}
                            description={pilot.realname}
                        />
                    )
                })}
            </MapView>
        );
    }
}
