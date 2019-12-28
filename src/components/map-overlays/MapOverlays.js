import PropTypes from 'prop-types';
import React from 'react';
import { Polyline } from 'react-native-maps';

import AircraftMarker from './AircraftMarker';
import ControllerPolygon from './ControllerPolygon';

import colors from '../../config/colors.json';

export const MapOverlays = ({ clients, focusedClient, setFocusedClient }) => (
  <>
    {clients.map(client => {
      const isFocusedClient = focusedClient.callsign === client.callsign;
      if (client.type === 'PILOT') {
        return (
          <AircraftMarker
            key={client.callsign}
            client={client}
            selected={isFocusedClient}
            setFocusedClient={setFocusedClient}
          />
        );
      }
      if (client.type === 'ATC' && client.polygon) {
        return (
          <ControllerPolygon
            key={client.callsign}
            client={client}
            selected={isFocusedClient}
            setFocusedClient={setFocusedClient}
          />
        );
      }
      return null;
    })}
  </>
);

export const FlightPath = ({ client: { depCoords, location, arrCoords } }) => {
  // Render polylines only if airport coords are present
  if (depCoords && location && arrCoords) {
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

MapOverlays.propTypes = {
  clients: PropTypes.array.isRequired,
  focusedClient: PropTypes.object.isRequired,
  setFocusedClient: PropTypes.func.isRequired,
};

FlightPath.propTypes = {
  client: PropTypes.object.isRequired,
};
