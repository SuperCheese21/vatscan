import React from 'react';
import { View } from 'react-native';

import StatsContainer from './StatsContainer';
import StatsLabel from '../common/StatsLabel';
import StatsRow from '../common/StatsRow';
import TextBlock from '../common/TextBlock';
import useClientData from '../../api/useClientData';

const FlightPlanContainer = () => {
  const { focusedClient } = useClientData();
  const {
    depAirport,
    depCityName,
    arrAirport,
    arrCityName,
    aircraft,
    plannedDepTime,
    plannedArrTime,
    plannedDuration,
    route,
  } = focusedClient;
  return (
    <StatsContainer>
      <StatsLabel text="Flight Plan" />

      <StatsRow label="From" text={depAirport} planned={depCityName} />
      <StatsRow label="To" text={arrAirport} planned={arrCityName} />
      <StatsRow label="Aircraft" text={aircraft} />

      <View style={{ flexDirection: 'row' }}>
        <StatsRow label="Departure" text={plannedDepTime} />
        <StatsRow label="Arrival" text={plannedArrTime} />
      </View>

      <StatsRow label="Duration" text={plannedDuration} />

      <TextBlock text={route} />
    </StatsContainer>
  );
};

export default FlightPlanContainer;
