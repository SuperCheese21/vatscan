import React from 'react';
import { MapView } from 'expo';

const MapOverlays = props => (
    <>
        {props.clients.map((client, index) => {
            const focusedClient =
                props.focusedClient.callsign === client.callsign;
            if (client.type === 'PILOT') {
                return (
                    <MapView.Marker
                        key={client.callsign}
                        image={client.aircraftIcon}
                        rotation={client.heading}
                        anchor={{ x: 0.5, y: 0.5 }}
                        coordinate={client.location}
                        onPress={() => props.setFocusedClient(client)}
                        tracksViewChanges={false}
                        stopPropagation
                        opacity={focusedClient ? 2 : 1.1}
                    />
                );
            } else if (client.type === 'ATC' && client.polygon) {
                return (
                    <MapView.Polygon
                        key={client.callsign}
                        coordinates={client.polygon}
                        strokeWidth={focusedClient ? 2 : 1}
                        strokeColor={client.strokeColor}
                        fillColor={
                            focusedClient
                                ? client.fillColorSelected
                                : client.fillColor
                        }
                        tappable
                        onPress={() => props.setFocusedClient(client)}
                        zIndex={client.zIndex}
                    />
                );
            }
        })}
    </>
);

export default MapOverlays;
