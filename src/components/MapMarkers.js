import React, { Component, Fragment } from 'react';
import { Circle, Marker, Polygon, Polyline } from 'react-native-maps';

import { getAircraftIcon } from '../lib/util';
import colors from '../config/colors.json';
import constants from '../config/constants.json';

export class PilotMarkers extends Component {
    render() {
        return (
            <Fragment>
                {this.props.data.map(p => (
                    <Marker
                        key={p.id}
                        image={getAircraftIcon(p.flightplan.aircraft)}
                        rotation={p.heading}
                        anchor={{ x: 0.5, y: 0.5 }}
                        coordinate={p.location}
                        onPress={() => {
                            this.props.setFocusedClient(p);
                            this.props.setPanelPosition(constants.panelStates.HALF_EXPANDED);
                        }}
                        zIndex={10}
                    />
                ))}
            </Fragment>
        )
    }
}

export class CenterMarkers extends Component {
    render() {
        return (
            <Fragment>
                {this.props.data.map(c => (
                    <Polygon
                        key={c.id}
                        coordinates={c.polygon}
                        strokeWidth={2}
                        fillColor={colors.mapOverlays.artccFill}
                        strokeColor={colors.mapOverlays.artccStroke}
                        tappable={true}
                        zIndex={0}
                    />
                ))}
            </Fragment>
        )
    }
}

export class ApproachMarkers extends Component {
    render() {
        return (
            <Fragment>
                {this.props.data.map(c => (
                    <Circle
                        key={c.id}
                        center={c.location}
                        radius={constants.atcRegions.APPROACH}
                        strokeWidth={1}
                        fillColor={colors.mapOverlays.approachFill}
                        strokeColor={colors.mapOverlays.approachStroke}
                        tappable={true}
                        zIndex={1}
                    />
                ))}
            </Fragment>
        )
    }
}

export class TowerMarkers extends Component {
    render() {
        return (
            <Fragment>
                {this.props.data.map(c => (
                    <Circle
                        key={c.id}
                        center={c.location}
                        radius={constants.atcRegions.TOWER}
                        strokeWidth={1}
                        fillColor={colors.mapOverlays.towerFill}
                        strokeColor={colors.mapOverlays.towerStroke}
                        tappable={true}
                        zIndex={2}
                    />
                ))}
            </Fragment>
        )
    }
}

export class GroundMarkers extends Component {
    render() {
        return (
            <Fragment>
                {this.props.data.map(c => (
                    <Circle
                        key={c.id}
                        center={c.location}
                        radius={constants.atcRegions.GROUND}
                        strokeWidth={1}
                        fillColor={colors.mapOverlays.groundFill}
                        strokeColor={colors.mapOverlays.groundStroke}
                        tappable={true}
                        zIndex={3}
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
        const destCoords = this.props.data.destCoords;

        // Render polylines only if airport coords are present
        if (depCoords && destCoords) {
            return (
                <Fragment>
                    <Polyline
                        coordinates={[depCoords, location]}
                        strokeWidth={1.5}
                        strokeColor={'#00ff00'}
                        geodesic={true}
                        zIndex={5}
                    />
                    <Polyline
                        coordinates={[location, destCoords]}
                        strokeWidth={1.5}
                        strokeColor={'#ff0000'}
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
