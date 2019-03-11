import React from 'react';
import MapView from 'react-native-maps';

import FlightPath from '../components/FlightPath';
import MapOverlays from '../components/MapOverlays';

import { initialMapRegion } from '../config/constants.json';
import mapStyle from '../config/map-styles/style_blue_essence.json';

const MapContainer = props => (
    <MapView
        style={{ flex: 1 }}
        provider={'google'}
        initialRegion={initialMapRegion}
        customMapStyle={mapStyle}
        moveOnMarkerPress={false}
        toolbarEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        showsIndoors={false}
        onPress={props.collapsePanel}
    >
        <MapOverlays
            clients={props.clients}
            focusedClient={props.focusedClient}
            setFocusedClient={props.setFocusedClient}
        />

        <FlightPath focusedClient={props.focusedClient} />
    </MapView>
);

export default MapContainer;
