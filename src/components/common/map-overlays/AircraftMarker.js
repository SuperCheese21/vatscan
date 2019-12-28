import PropTypes from 'prop-types';
import React from 'react';
import { Marker } from 'react-native-maps';

import MapOverlay from './MapOverlay';

export default class AircraftMarker extends MapOverlay {
  render() {
    const {
      client: { aircraftIcon, heading, location },
      selected,
    } = this.props;
    return (
      <Marker
        image={aircraftIcon}
        rotation={heading}
        coordinate={location}
        opacity={selected ? 2 : 1.1}
        onPress={this.onPress}
        anchor={{ x: 0.5, y: 0.5 }}
        tracksViewChanges={false}
        stopPropagation
      />
    );
  }
}

AircraftMarker.propTypes = {
  client: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};

AircraftMarker.defaultProps = {
  selected: false,
};
