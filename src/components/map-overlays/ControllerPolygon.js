import React from 'react';
import { Polygon } from 'react-native-maps';
import MapOverlay from './MapOverlay';

export default class ControllerPolygon extends MapOverlay {
  render() {
    const {
      client: { fillColor, fillColorSelected, polygon, strokeColor, zIndex },
      selected,
    } = this.props;
    return (
      <Polygon
        coordinates={polygon}
        zIndex={zIndex}
        strokeColor={strokeColor}
        strokeWidth={selected ? 2 : 1}
        fillColor={selected ? fillColorSelected : fillColor}
        onPress={this.onPress}
        tappable
      />
    );
  }
}
