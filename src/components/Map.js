import React from 'react';
import { MapView } from 'expo';

import { initialMapRegion } from '../config/constants.json';
import mapStyle from '../config/map-styles/style_blue_essence.json';

const Map = props => (
  <MapView
    style={props.style}
    provider="google"
    initialRegion={props.initialRegion || initialMapRegion}
    customMapStyle={mapStyle}
    zoomTapEnabled={false}
    moveOnMarkerPress={false}
    toolbarEnabled={false}
    pitchEnabled={false}
    rotateEnabled={false}
    showsIndoors={false}
    onPress={props.onPress}
  >
    {props.children}
  </MapView>
);

export default Map;
