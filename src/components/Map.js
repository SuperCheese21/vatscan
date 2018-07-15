import React from 'react';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';

import mapStyle from '../config/map-styles/style_blue_essence.json';
import fetchPilotData from '../lib/fetch';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            pilotData: []
        };
    }

    componentDidMount() {
        return fetch('https://map.vatsim.net/api/pilotGeoJSON')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoading: false,
                    pilotData: json.features,
                });
            })
            .catch(err =>{
                console.error(err);
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
                        coordinate={{
                            latitude: pilot.geometry.coordinates[1],
                            longitude: pilot.geometry.coordinates[0]
                        }}
                        title={pilot.properties.callsign + ''}
                        description={pilot.properties.name}
                    />
                ))}
            </MapView>
        );
    }
}
