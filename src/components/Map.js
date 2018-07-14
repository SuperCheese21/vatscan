import React from 'react';
import { MapView } from 'expo';

import mapStyle from '../config/map-styles/style_blue_essence.json';

export default class Map extends React.Component {
    render() {
        return (
            <MapView style = {{ flex: 1 }}
                initialRegion = {{
                    latitude: 38,
                    longitude: -97,
                    latitudeDelta: 60,
                    longitudeDelta: 30,
                }}
                customMapStyle = {mapStyle}
            />
        );
    }
}
