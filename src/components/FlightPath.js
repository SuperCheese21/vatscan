import React from 'react';
import { Polyline } from 'react-native-maps';

import colors from '../config/colors.json';

const FlightPath = props => {
    const depCoords = props.data.depCoords;
    const location = props.data.location;
    const arrCoords = props.data.arrCoords;

    // Render polylines only if airport coords are present
    if (depCoords && location && arrCoords) {
        return (
            <>
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
            </>
        );
    }

    // Render nothing if polylines can't be rendered
    return null;
}

export default FlightPath;
