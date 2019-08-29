import React from 'react';
import { MapView } from 'expo';

import colors from '../config/colors.json';

export default props => (
  <>
    {props.clients.map((client, index) => {
      const focusedClient = props.focusedClient.callsign === client.callsign;
      if (client.type === 'PILOT') {
        return (
          <Marker
            key={client.callsign}
            client={client}
            selected={focusedClient}
            setFocusedClient={props.setFocusedClient}
          />
        );
      } else if (client.type === 'ATC' && client.polygon) {
        return (
          <Polygon
            key={client.callsign}
            client={client}
            selected={focusedClient}
            setFocusedClient={props.setFocusedClient}
          />
        );
      }
    })}
  </>
);

class MapOverlay extends React.PureComponent {
  onPress = () => {
    if (this.props.setFocusedClient) {
      this.props.setFocusedClient(this.props.client);
    }
  };
}

export class Marker extends MapOverlay {
  render() {
    return (
      <MapView.Marker
        image={this.props.client.aircraftIcon}
        rotation={this.props.client.heading}
        coordinate={this.props.client.location}
        opacity={this.props.selected ? 2 : 1.1}
        onPress={this.onPress}
        anchor={{ x: 0.5, y: 0.5 }}
        tracksViewChanges={false}
        stopPropagation
      />
    );
  }
}

export class Polygon extends MapOverlay {
  render() {
    return (
      <MapView.Polygon
        coordinates={this.props.client.polygon}
        zIndex={this.props.client.zIndex}
        strokeColor={this.props.client.strokeColor}
        strokeWidth={this.props.selected ? 2 : 1}
        fillColor={
          this.props.selected
            ? this.props.client.fillColorSelected
            : this.props.client.fillColor
        }
        onPress={this.onPress}
        tappable
      />
    );
  }
}

export const FlightPath = ({ client }) => {
  // Render polylines only if airport coords are present
  if (client.depCoords && client.location && client.arrCoords) {
    return (
      <>
        <MapView.Polyline
          coordinates={[client.depCoords, client.location]}
          strokeColor={colors.mapOverlays.lineFlown}
          strokeWidth={2}
          zIndex={5}
          geodesic
        />
        <MapView.Polyline
          coordinates={[client.location, client.arrCoords]}
          strokeColor={colors.mapOverlays.lineRemaining}
          strokeWidth={2}
          zIndex={5}
          geodesic
        />
      </>
    );
  }

  // Render nothing if polylines can't be rendered
  return null;
};
