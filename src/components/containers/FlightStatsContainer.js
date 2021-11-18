import React from 'react';
import { View } from 'react-native';

import StatsContainer from './StatsContainer';
import Map from '../common/Map';
import StatsLabel from '../common/StatsLabel';
import StatsRow from '../common/StatsRow';
import useClientData from '../../api/useClientData';

const FlightStatsContainer = () => {
  const { focusedClient } = useClientData();
  const {
    latitude,
    longitude,
    groundSpeed,
    tasCruise,
    heading,
    altitude,
    plannedAltitude,
    transponder,
    distFlown,
    distRemaining,
    ete,
    eta,
    getMapOverlay,
  } = focusedClient;
  return (
    <StatsContainer>
      <StatsLabel text="Flight Info" />

      <View style={{ flexDirection: 'row' }}>
        <StatsRow
          label="Speed"
          text={`${groundSpeed} kts`}
          planned={tasCruise}
        />
        <StatsRow label="Heading" text={`${heading}°`} />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <StatsRow
          label="Altitude"
          text={`${altitude} ft`}
          planned={plannedAltitude}
        />
        <StatsRow label="Transponder" text={transponder} />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <StatsRow
          label="Flown"
          text={distFlown >= 0 ? `${distFlown} nm` : 'N/A'}
        />
        <StatsRow
          label="Remaining"
          text={distRemaining >= 0 ? `${distRemaining} nm` : 'N/A'}
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <StatsRow label="ETE" text={ete || 'N/A'} />
        <StatsRow label="ETA" text={eta ? `${eta}z` : 'N/A'} />
      </View>

      <Map
        style={{ flex: 1, marginTop: 5, height: 350 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {getMapOverlay()}
      </Map>
    </StatsContainer>
  );
};

export default FlightStatsContainer;
