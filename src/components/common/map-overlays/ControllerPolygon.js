import PropTypes from 'prop-types';
import React from 'react';
import { Polygon } from 'react-native-maps';

import MapOverlay from './MapOverlay';

export default class ControllerPolygon extends MapOverlay {
  render() {
    const { client, isFocusedClient } = this.props;
    return (
      <Polygon
        coordinates={client.polygon}
        zIndex={client.zIndex}
        strokeColor={client.strokeColor}
        strokeWidth={isFocusedClient ? 2 : 1}
        fillColor={
          isFocusedClient ? client.fillColorSelected : client.fillColor
        }
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
