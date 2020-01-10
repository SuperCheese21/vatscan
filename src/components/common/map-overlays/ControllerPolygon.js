import PropTypes from 'prop-types';
import React from 'react';
import { Polygon } from 'react-native-maps';

import MapOverlay from './MapOverlay';

// TODO: Use composition instead of inheritence
export default class ControllerPolygon extends MapOverlay {
  render() {
    const {
      client: {
        polygonCoords,
        polygonInfo: { zIndex, colors },
      },
      isFocusedClient,
    } = this.props;
    return (
      <Polygon
        coordinates={polygonCoords}
        zIndex={zIndex}
        strokeColor={colors.stroke}
        strokeWidth={isFocusedClient ? 2 : 1}
        fillColor={isFocusedClient ? colors.fillSelected : colors.fill}
        onPress={this.onPress}
        tappable
      />
    );
  }
}

ControllerPolygon.propTypes = {
  client: PropTypes.object.isRequired,
  isFocusedClient: PropTypes.bool,
};

ControllerPolygon.defaultProps = {
  isFocusedClient: true,
};
