import React from 'react';
import { Circle, Marker, Polygon } from 'react-native-maps';

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
                {this.props.data.map((client, index) => {
                    if (client.type == 'PILOT') {
                        return <Marker
                            key={client.id}
                            image={client.aircraftIcon}
                            rotation={client.heading}
                            anchor={{ x: 0.5, y: 0.5 }}
                            coordinate={client.location}
                            onPress={() => this.props.setFocusedClient(client, index)}
                            tracksViewChanges={false}
                            stopPropagation={true}
                            opacity={this.props.focusedMarkerIndex === index ? 2 : 1.1}
                        />
                    } else if (client.controllerType == 'CTR') {
                        return <Polygon
                            key={client.id}
                            coordinates={client.polygon}
                            strokeWidth={this.props.focusedMarkerIndex === index ? 2 : 1}
                            strokeColor={client.strokeColor}
                            fillColor={
                                this.props.focusedMarkerIndex === index ?
                                    client.fillColorSelected :
                                    client.fillColor
                            }
                            tappable={true}
                            onPress={() => this.props.setFocusedClient(client, index)}
                            zIndex={client.zIndex}
                        />
                    } else if (client.type == 'ATC') {
                        return <Polygon
                            key={client.id}
                            coordinates={this.getPolygonCircle(client.location, client.radius)}
                            strokeWidth={1}
                            strokeColor={client.strokeColor}
                            fillColor={
                                this.props.focusedMarkerIndex === index ?
                                    client.fillColorSelected :
                                    client.fillColor
                            }
                            tappable={true}
                            onPress={() => this.props.setFocusedClient(client, index)}
                            zIndex={client.zIndex}
                        />
                    }
                })}
            </>
        );
    }
}
