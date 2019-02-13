import React from 'react';
import { Marker, Polygon } from 'react-native-maps';

import constants from '../config/constants.json';
import { getProjectedCoords } from '../lib/util/calc';

export default class MapOverlays extends React.PureComponent {
    getPolygonCircle(location, radius) {
        const numSides = constants.NUM_SIDES_CIRCLE;
        let coords = [];
        for (let i = 0; i < numSides; i++) {
            const bearing = 360 / numSides * i;
            coords.push(getProjectedCoords(location, radius, bearing));
        }
        return coords;
    }

    render() {
        // Return fragment with client data mapped to map components
        return (
            <>
                {this.props.clients.map((client, index) => {
                    const focusedClient = this.props.focusedClient.callsign == client.callsign;
                    if (client.type == 'PILOT') {
                        return <Marker
                            key={client.id}
                            image={client.aircraftIcon}
                            rotation={client.heading}
                            anchor={{ x: 0.5, y: 0.5 }}
                            coordinate={client.location}
                            onPress={() => this.props.setFocusedClient(client)}
                            tracksViewChanges={false}
                            stopPropagation={true}
                            opacity={focusedClient ? 2 : 1.1}
                        />
                    } else if (client.type == 'ATC') {
                        return <Polygon
                            key={client.id}
                            coordinates={client.polygon || this.getPolygonCircle(client.location, client.radius)}
                            strokeWidth={focusedClient ? 2 : 1}
                            strokeColor={client.strokeColor}
                            fillColor={
                                focusedClient ?
                                    client.fillColorSelected :
                                    client.fillColor
                            }
                            tappable={true}
                            onPress={() => this.props.setFocusedClient(client)}
                            zIndex={client.zIndex}
                        />
                    }
                })}
            </>
        );
    }
}
