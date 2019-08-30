import React, { PureComponent } from 'react';
import { Marker, Polygon, Polyline } from 'react-native-maps';

import colors from '../config/colors.json';

export default props => (
  <>
    {props.clients.map((client, index) => {
      const focusedClient = props.focusedClient.callsign === client.callsign;
      if (client.type === 'PILOT') {
        return (
          <AircraftMarker
            key={client.callsign}
            client={client}
            selected={focusedClient}
            setFocusedClient={props.setFocusedClient}
          />
        );
      } else if (client.type === 'ATC' && client.polygon) {
        return (
          <ControllerPolygon
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

class MapOverlay extends PureComponent {
  onPress = () => {
    const { client, setFocusedClient } = this.props;
    setFocusedClient && setFocusedClient(client);
  };
}

export class AircraftMarker extends MapOverlay {
  render() {
    const {
      client: { aircraftIcon, heading, location },
      selected
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

export class ControllerPolygon extends MapOverlay {
  render() {
    const {
      client: { fillColor, fillColorSelected, polygon, strokeColor, zIndex },
      selected
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

export const FlightPath = ({ client: { depCoords, location, arrCoords } }) => {
  // Render polylines only if airport coords are present
  if (depCoords && location && arrCoords) {
    const { lineFlown, lineRemaining } = colors.mapOverlays;
    return (
      <>
        <Polyline
          coordinates={[depCoords, location]}
          strokeColor={lineFlown}
          strokeWidth={2}
          zIndex={5}
          geodesic
        />
        <Polyline
          coordinates={[location, arrCoords]}
          strokeColor={lineRemaining}
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
