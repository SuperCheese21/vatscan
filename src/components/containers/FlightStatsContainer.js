import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import StatsContainer from './StatsContainer';

import Map from '../common/Map';
import StatsLabel from '../common/StatsLabel';
import StatsRow from '../common/StatsRow';

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
      <StatsRow
        label="Flown"
        text={client.distFlown >= 0 ? `${client.distFlown} nm` : 'N/A'}
      />
      <StatsRow
        label="Remaining"
        text={client.distRemaining >= 0 ? `${client.distRemaining} nm` : 'N/A'}
      />
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
      {client.getMapOverlay()}
    </Map>
  </StatsContainer>
);

FlightStatsContainer.propTypes = {
  client: PropTypes.object.isRequired,
};

export default FlightStatsContainer;
