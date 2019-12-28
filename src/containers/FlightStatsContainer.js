import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import StatsContainer from './StatsContainer';

import Map from '../components/Map';
import { FlightPath } from '../components/map-overlays/MapOverlays';
import AircraftMarker from '../components/map-overlays/AircraftMarker';
import StatsLabel from '../components/StatsLabel';
import StatsRow from '../components/StatsRow';

const FlightStatsContainer = ({ client }) => (
  <StatsContainer>
    <StatsLabel text="Flight Info" />

    <View style={{ flexDirection: 'row' }}>
      <StatsRow
        label="Speed"
        text={`${client.groundSpeed} kts`}
        planned={client.tasCruise}
      />
      <StatsRow label="Heading" text={`${client.heading}°`} />
    </View>

    <View style={{ flexDirection: 'row' }}>
      <StatsRow
        label="Altitude"
        text={`${client.altitude} ft`}
        planned={client.plannedAltitude}
      />
      <StatsRow label="Transponder" text={client.transponder} />
    </View>

    <View style={{ flexDirection: 'row' }}>
      <StatsRow label="Flown" text={`${client.distFlown} nm`} />
      <StatsRow label="Remaining" text={`${client.distRemaining} nm`} />
    </View>

    <View style={{ flexDirection: 'row' }}>
      <StatsRow label="ETE" text={client.ete || 'N/A'} />
      <StatsRow label="ETA" text={client.eta ? `${client.eta}z` : 'N/A'} />
    </View>

    <Map
      style={{ flex: 1, marginTop: 5, height: 350 }}
      initialRegion={{
        latitude: client.latitude,
        longitude: client.longitude,
        latitudeDelta: 5,
        longitudeDelta: 5,
      }}
    >
      <AircraftMarker client={client} selected={false} />

      <FlightPath client={client} />
    </Map>
  </StatsContainer>
);

FlightStatsContainer.propTypes = {
  client: PropTypes.object.isRequired,
};

export default FlightStatsContainer;
