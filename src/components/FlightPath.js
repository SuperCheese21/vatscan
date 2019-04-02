import React from 'react';
import { MapView } from 'expo';

import colors from '../config/colors.json';

const FlightPath = props => {
    const depCoords = props.focusedClient.depCoords;
    const location = props.focusedClient.location;
    const arrCoords = props.focusedClient.arrCoords;

    // Render polylines only if airport coords are present
    if (depCoords && location && arrCoords) {
        return (
            <>
                <MapView.Polyline
                    coordinates={[depCoords, location]}
                    strokeWidth={2}
                    strokeColor={colors.mapOverlays.lineFlown}
                    geodesic
                    zIndex={5}
                />
                <MapView.Polyline
                    coordinates={[location, arrCoords]}
                    strokeWidth={2}
                    strokeColor={colors.mapOverlays.lineRemaining}
                    geodesic
                    zIndex={5}
                />
            </>
        );
    }

    // Render nothing if polylines can't be rendered
    return null;
};

export default FlightPath;
