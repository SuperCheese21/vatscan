import React, { Component, Fragment } from 'react';
import { Marker, Polyline } from 'react-native-maps';

import { getAircraftIcon } from '../lib/util';
import colors from '../config/colors.json';
import constants from '../config/constants.json';

export class PilotMarkers extends Component {
    render() {
        return (
            <Fragment>
                {this.props.data.map((pilot, index) => (
                    <Marker
                        key={pilot.id}
                        image={getAircraftIcon(pilot.flightplan.aircraft)}
                        rotation={pilot.heading}
                        anchor={{ x: 0.5, y: 0.5 }}
                        coordinate={pilot.location}
                        onPress={() => {
                            this.props.setFocusedClient(pilot, index);
                            this.props.setPanelPosition(constants.panelStates.HALF_EXPANDED);
                        }}
                        opacity={this.props.focusedMarkerIndex === index ? 2 : 1.1}
                    />
                ))}
            </Fragment>
        )
    }
}

export class FlightPath extends Component {
    render() {
        const depCoords = this.props.data.depCoords;
        const location = this.props.data.location;
        const arrCoords = this.props.data.arrCoords;

        // Render polylines only if airport coords are present
        if (depCoords && location && arrCoords) {
            return (
                <Fragment>
                    <Polyline
                        coordinates={[depCoords, location]}
                        strokeWidth={1.5}
                        strokeColor={colors.mapOverlays.lineFlown}
                        geodesic={true}
                        zIndex={5}
                    />
                    <Polyline
                        coordinates={[location, arrCoords]}
                        strokeWidth={1.5}
                        strokeColor={colors.mapOverlays.lineRemaining}
                        geodesic={true}
                        zIndex={5}
                    />
                </Fragment>
            );
        }

        // Render nothing if polylines can't be rendered
        return null;
    }
}
