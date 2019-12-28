import PropTypes from 'prop-types';
import React from 'react';

import StatsContainer from './StatsContainer';

import Controller from '../api/Controller';
import Map from '../components/Map';
import ControllerPolygon from '../components/map-overlays/ControllerPolygon';
import StatsLabel from '../components/StatsLabel';
import StatsRow from '../components/StatsRow';
import TextBlock from '../components/TextBlock';

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
      <ControllerPolygon client={client} selected={false} />
    </Map>
  </StatsContainer>
);

ControllerStatsContainer.propTypes = {
  client: PropTypes.instanceOf(Controller).isRequired,
};

export default ControllerStatsContainer;
