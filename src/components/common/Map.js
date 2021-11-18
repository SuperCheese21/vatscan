import { func } from 'prop-types';
import React from 'react';
import { ViewPropTypes } from 'react-native';
import MapView from 'react-native-maps';

import { childrenShape, mapRegionShape } from '../propTypeShapes';
import { INITIAL_MAP_REGION } from '../../config/constants';
import mapStyle from '../../config/map-styles/style_blue_essence.json';

const Map = ({ children, initialRegion, onPress, style }) => (
  <MapView
    style={style}
    provider="google"
    initialRegion={initialRegion || INITIAL_MAP_REGION}
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

Map.propTypes = {
  children: childrenShape,
  initialRegion: mapRegionShape,
  onPress: func,
  style: ViewPropTypes.style,
};

Map.defaultProps = {
  children: null,
  initialRegion: null,
  onPress: () => {},
  style: {},
};

export default Map;
