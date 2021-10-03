import PropTypes from 'prop-types';
import React from 'react';
import { Polyline } from 'react-native-maps';

const FlightPath = ({
  client: { depCoords, location, arrCoords },
  visible,
}) => {
  // Render polylines only if airport coords are present
  if (visible && depCoords && location && arrCoords) {
    return (
      <>
        <Polyline
          coordinates={[depCoords, location]}
          strokeColor="#00FF00"
          strokeWidth={2}
          lineDashPattern={[0]}
          zIndex={5}
          geodesic
        />
        <Polyline
          coordinates={[location, arrCoords]}
          strokeColor="#FF0000"
          strokeWidth={2}
          lineDashPattern={[0]}
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
