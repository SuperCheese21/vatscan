import React, { Component, Fragment } from 'react';
import { Circle, Polygon } from 'react-native-maps';

import colors from '../config/colors.json';
import constants from '../config/constants.json';

export class CenterMarkers extends Component {
    render() {
        return (
            <Fragment>
                {this.props.data.map(controller => (
                    <Polygon
                        key={controller.id}
                        coordinates={controller.polygon}
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
                {this.props.data.map(controller => (
                    <Circle
                        key={controller.id}
                        center={controller.location}
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
                {this.props.data.map(controller => (
                    <Circle
                        key={controller.id}
                        center={controller.location}
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
                {this.props.data.map(controller => (
                    <Circle
                        key={controller.id}
                        center={controller.location}
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
