import { bool, func, object } from 'prop-types';
import React from 'react';
import { Polygon } from 'react-native-maps';

const ControllerPolygon = ({ client, isFocusedClient, onPress }) => {
  const {
    polygonCoords,
    polygonInfo: { zIndex, colors },
  } = client;
  return polygonCoords.length ? (
    <Polygon
      coordinates={polygonCoords}
      zIndex={zIndex}
      strokeColor={colors.stroke}
      strokeWidth={isFocusedClient ? 2 : 1}
      fillColor={isFocusedClient ? colors.fillSelected : colors.fill}
      onPress={onPress}
      tappable
    />
  ) : null;
};

ControllerPolygon.propTypes = {
  client: object.isRequired,
  isFocusedClient: bool,
  onPress: func,
};

ControllerPolygon.defaultProps = {
  isFocusedClient: true,
  onPress: () => {},
};

export default ControllerPolygon;
