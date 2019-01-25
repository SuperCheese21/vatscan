import React from 'react';
import { MapView } from 'expo';

import FlightPath from '../FlightPath';
import MapOverlays from '../MapOverlays';

import { initialMapRegion } from '../../config/constants.json';
import mapStyle from '../../config/map-styles/style_blue_essence.json';

const MapContainer = props => (
    <MapView style={{ flex: 1 }}
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
            data={props.clientData}
            setFocusedClient={props.setFocusedClient}
            focusedMarkerIndex={props.focusedMarkerIndex}
        />

        <FlightPath data={props.flightPathData} />

    </MapView>
);

export default MapContainer;
