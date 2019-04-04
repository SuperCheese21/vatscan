import React from 'react';
import { MapView } from 'expo';

import colors from '../config/colors.json';

export default props => (
    <>
        {props.clients.map((client, index) => {
            const focusedClient =
                props.focusedClient.callsign === client.callsign;
            if (client.type === 'PILOT') {
                return (
                    <Marker
                        key={client.callsign}
                        client={client}
                        selected={focusedClient}
                        onPress={() => props.setFocusedClient(client)}
                    />
                );
            } else if (client.type === 'ATC' && client.polygon) {
                return (
                    <Polygon
                        key={client.callsign}
                        client={client}
                        selected={focusedClient}
                        onPress={() => props.setFocusedClient(client)}
                    />
                );
            }
        })}
    </>
);

export const Marker = props => (
    <MapView.Marker
        image={props.client.aircraftIcon}
        rotation={props.client.heading}
        coordinate={props.client.location}
        opacity={props.selected ? 2 : 1.1}
        onPress={props.onPress}
        anchor={{ x: 0.5, y: 0.5 }}
        tracksViewChanges={false}
        stopPropagation
    />
);

export const Polygon = props => (
    <MapView.Polygon
        coordinates={props.client.polygon}
        zIndex={props.client.zIndex}
        strokeColor={props.client.strokeColor}
        strokeWidth={props.selected ? 2 : 1}
        fillColor={
            props.selected
                ? props.client.fillColorSelected
                : props.client.fillColor
        }
        onPress={props.onPress}
        tappable
    />
);

export const FlightPath = ({ client }) => {
    // Render polylines only if airport coords are present
    if (client.depCoords && client.location && client.arrCoords) {
        return (
            <>
                <MapView.Polyline
                    coordinates={[client.depCoords, client.location]}
                    strokeColor={colors.mapOverlays.lineFlown}
                    strokeWidth={2}
                    zIndex={5}
                    geodesic
                />
                <MapView.Polyline
                    coordinates={[client.location, client.arrCoords]}
                    strokeColor={colors.mapOverlays.lineRemaining}
                    strokeWidth={2}
                    zIndex={5}
                    geodesic
                />
            </>
        );
    }

    // Render nothing if polylines can't be rendered
    return null;
};
