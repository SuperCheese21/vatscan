import React from 'react';
import { Circle, Marker, Polygon } from 'react-native-maps';

const MapOverlays = props => (
    // Return fragment with client data mapped to map components
    <>
        {props.data.map((client, index) => {
            if (client.type == 'PILOT') {
                return <Marker
                    key={client.id}
                    image={client.aircraftIcon}
                    rotation={client.heading}
                    anchor={{ x: 0.5, y: 0.5 }}
                    coordinate={client.location}
                    onPress={() => props.setFocusedClient(client, index)}
                    opacity={props.focusedMarkerIndex === index ? 2 : 1.1}
                />
            } else if (client.controllerType == 'CTR') {
                return <Polygon
                    key={client.id}
                    coordinates={client.polygon}
                    strokeWidth={props.focusedMarkerIndex === index ? 2 : 1}
                    strokeColor={client.strokeColor}
                    fillColor={
                        props.focusedMarkerIndex === index ?
                            client.fillColorSelected :
                            client.fillColor
                    }
                    tappable={true}
                    onPress={() => props.setFocusedClient(client, index)}
                    zIndex={client.zIndex}
                />
            } else if (client.type == 'ATC') {
                return <Circle
                    key={client.id}
                    center={client.location}
                    radius={client.radius}
                    strokeWidth={1}
                    strokeColor={client.strokeColor}
                    fillColor={client.fillColor}
                    zIndex={client.zIndex}
                />
            }
        })}
    </>
);

export default MapOverlays;
