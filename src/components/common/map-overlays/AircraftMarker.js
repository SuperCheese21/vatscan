import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';

import FlightPath from './FlightPath';
import MapOverlay from './MapOverlay';

export default class AircraftMarker extends MapOverlay {
  render() {
    const { client, isFocusedClient } = this.props;
    return (
      <>
        <Marker
          rotation={client.heading}
          coordinate={client.location}
          opacity={isFocusedClient ? 2 : 1.1}
          onPress={this.onPress}
          anchor={{ x: 0.5, y: 0.5 }}
          stopPropagation
        >
          <Image
            source={client.aircraftIcon}
            style={client.aircraftIconStyle}
          />
        </Marker>
        <FlightPath client={client} visible={isFocusedClient} />
      </>
    );
  }
}

AircraftMarker.propTypes = {
  client: PropTypes.object.isRequired,
  isFocusedClient: PropTypes.bool,
};

AircraftMarker.defaultProps = {
  isFocusedClient: true,
};
