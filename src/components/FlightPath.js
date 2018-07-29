import React, { Component, Fragment } from 'react';
import { Polyline } from 'react-native-maps';

import colors from '../config/colors.json';

export default class FlightPath extends Component {
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
                        strokeWidth={2}
                        strokeColor={colors.mapOverlays.lineFlown}
                        geodesic={true}
                        zIndex={5}
                    />
                    <Polyline
                        coordinates={[location, arrCoords]}
                        strokeWidth={2}
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
