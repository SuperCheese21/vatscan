import PropTypes from 'prop-types';
import React from 'react';
import { Polyline } from 'react-native-maps';

import colors from '../../../config/colors.json';

const FlightPath = ({
  client: { depCoords, location, arrCoords },
  visible,
}) => {
  // Render polylines only if airport coords are present
  if (visible && depCoords && location && arrCoords) {
    const { lineFlown, lineRemaining } = colors.mapOverlays;
    return (
      <>
        <Polyline
          coordinates={[depCoords, location]}
          strokeColor={lineFlown}
          strokeWidth={2}
          zIndex={5}
          geodesic
        />
        <Polyline
          coordinates={[location, arrCoords]}
          strokeColor={lineRemaining}
          strokeWidth={2}
          zIndex={5}
          geodesic
        />
      </>
    );
  }

  // Render nothing if polylines can't be rendered
  return null;
};

FlightPath.propTypes = {
  client: PropTypes.object.isRequired,
  visible: PropTypes.bool,
};

FlightPath.defaultProps = {
  visible: true,
};

export default FlightPath;
