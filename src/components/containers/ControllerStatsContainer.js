import PropTypes from 'prop-types';
import React from 'react';

import StatsContainer from './StatsContainer';

import Map from '../common/Map';
import StatsLabel from '../common/StatsLabel';
import StatsRow from '../common/StatsRow';
import TextBlock from '../common/TextBlock';

const ControllerStatsContainer = ({ client }) => (
  <StatsContainer>
    <StatsLabel text="Controller Info" />

    <StatsRow label="Type" text={client.typeString} />
    <StatsRow label="Frequency" text={client.frequency} />

    <TextBlock text={client.atisMessage} />

    <Map
      style={{ width: '100%', marginTop: 5, height: 350 }}
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

ControllerStatsContainer.propTypes = {
  client: PropTypes.object.isRequired,
};

export default ControllerStatsContainer;
