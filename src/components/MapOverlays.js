import React from 'react';
import { Circle, Marker, Polygon } from 'react-native-maps';

import { panelStates } from '../config/constants.json';

export default class MapOverlays extends React.Component {
    onMarkerPress = (client, index) => {
        if (this.props.panelPosition === panelStates.COLLAPSED) {
            this.props.setPanelPosition(panelStates.EXPANDED);
        }
        this.props.setFocusedClient(client, index);
    }

    render() {
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
                            onPress={() => this.onMarkerPress(client, index)}
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
                            onPress={() => this.onMarkerPress(client, index)}
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
        )
    }
}
