import PropTypes from 'prop-types';
import React from 'react';

import AircraftMarker from './AircraftMarker';
import ControllerPolygon from './ControllerPolygon';

const MapOverlays = ({ clients, focusedClient, setFocusedClient }) => (
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

MapOverlays.propTypes = {
  clients: PropTypes.array.isRequired,
  focusedClient: PropTypes.object.isRequired,
  setFocusedClient: PropTypes.func.isRequired,
};

export default MapOverlays;
