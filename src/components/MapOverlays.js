import React from 'react';
import { MapView } from 'expo';

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

export const Marker = props => (
    <MapView.Marker
        image={props.client.aircraftIcon}
        rotation={props.client.heading}
        coordinate={props.client.location}
        onPress={props.onPress}
        opacity={props.selected ? 2 : 1.1}
        anchor={{ x: 0.5, y: 0.5 }}
        tracksViewChanges={false}
        stopPropagation
    />
);
