import PropTypes from 'prop-types';
import React from 'react';
import { ViewPropTypes } from 'react-native';
import MapView from 'react-native-maps';

import { childrenShape } from '../propTypeShapes';
import { initialMapRegion } from '../../config/constants.json';
import mapStyle from '../../config/map-styles/style_blue_essence.json';

const Map = ({ children, initialRegion, onPress, style }) => (
  <MapView
    style={style}
    provider="google"
    initialRegion={initialRegion || initialMapRegion}
    customMapStyle={mapStyle}
    zoomTapEnabled={false}
    moveOnMarkerPress={false}
    toolbarEnabled={false}
    pitchEnabled={false}
    rotateEnabled={false}
    showsIndoors={false}
    onPress={onPress}
  >
    {children}
  </MapView>
);

const initialRegionShape = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  latitudeDelta: PropTypes.number.isRequired,
  longitudeDelta: PropTypes.number.isRequired,
});

Map.propTypes = {
  children: childrenShape,
  initialRegion: initialRegionShape,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
};

Map.defaultProps = {
  children: null,
  initialRegion: null,
  onPress: () => {},
  style: {},
};

export default Map;
