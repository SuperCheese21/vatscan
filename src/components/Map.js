import React from 'react';
import MapView from 'react-native-maps';

import { initialMapRegion } from '../config/constants.json';
import mapStyle from '../config/map-styles/style_blue_essence.json';

const Map = ({ style, initialRegion, onPress, children }) => (
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

export default Map;
