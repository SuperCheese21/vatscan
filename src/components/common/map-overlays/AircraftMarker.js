import { bool, func, object } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';

import FlightPath from './FlightPath';

const AircraftMarker = ({ client, isFocusedClient, onPress }) => (
  <>
    <Marker
      rotation={client.heading}
      coordinate={client.location}
      opacity={isFocusedClient ? 2 : 1.1}
      onPress={onPress}
      anchor={{ x: 0.5, y: 0.5 }}
      tracksViewChanges={false}
      stopPropagation
    >
      <Image source={client.aircraftIcon} style={client.aircraftIconStyle} />
    </Marker>
    <FlightPath client={client} visible={isFocusedClient} />
  </>
);

AircraftMarker.propTypes = {
  client: object.isRequired,
  isFocusedClient: bool,
  onPress: func,
};

AircraftMarker.defaultProps = {
  isFocusedClient: true,
  onPress: () => {},
};

export default AircraftMarker;
