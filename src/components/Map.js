import React from 'react';
import { MapView } from 'expo';

import FlightPath from './FlightPath';
import MapOverlays from './MapOverlays';

import constants from '../config/constants.json';
import mapStyle from '../config/map-styles/style_blue_essence.json';

const Map = props => (
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
            props.setPanelPosition(constants.panelStates.COLLAPSED);
            props.removeFocusedClient();
        }}
    >

        <MapOverlays
            data={props.clientData}
            setFocusedClient={props.setFocusedClient}
            focusedMarkerIndex={props.focusedMarkerIndex}
            getPanelPosition={props.getPanelPosition}
            setPanelPosition={props.setPanelPosition}
        />

        <FlightPath data={props.flightPathData} />

    </MapView>
);

export default Map;
