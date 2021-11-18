import React from 'react';

import StatsContainer from './StatsContainer';
import Map from '../common/Map';
import StatsLabel from '../common/StatsLabel';
import StatsRow from '../common/StatsRow';
import TextBlock from '../common/TextBlock';
import useClientData from '../../api/useClientData';

const ControllerStatsContainer = () => {
  const { focusedClient } = useClientData();
  const {
    latitude,
    longitude,
    fullName,
    frequency,
    atisMessage,
    getMapOverlay,
  } = focusedClient;
  return (
    <StatsContainer>
      <StatsLabel text="Controller Info" />

      <StatsRow label="Type" text={fullName} />
      <StatsRow label="Frequency" text={frequency} />

      <TextBlock text={atisMessage} />

      <Map
        style={{ width: '100%', marginTop: 5, height: 350 }}
        initialRegion={{
          latitude: latitude || 0,
          longitude: longitude || 0,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {getMapOverlay()}
      </Map>
    </StatsContainer>
  );
};

export default ControllerStatsContainer;
