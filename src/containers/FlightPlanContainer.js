import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';

import Pilot from '../api/Pilot';
import StatsLabel from '../components/StatsLabel';
import StatsRow from '../components/StatsRow';
import TextBlock from '../components/TextBlock';

const styles = StyleSheet.create({
  statsContainer: {
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    margin: 5,
  },
});

const FlightPlanContainer = ({ client }) => (
  <Surface style={styles.statsContainer}>
    <StatsLabel text="Flight Plan" />

    <StatsRow
      label="From"
      text={client.depAirport}
      planned={client.depCityName}
    />
    <StatsRow
      label="To"
      text={client.arrAirport}
      planned={client.arrCityName}
    />
    <StatsRow label="Aircraft" text={client.aircraft} />

    <View style={{ flexDirection: 'row' }}>
      <StatsRow label="Departure" text={client.plannedDepTime} />
      <StatsRow label="Arrival" text={client.plannedArrTime} />
    </View>

    <StatsRow label="Duration" text={client.plannedDuration} />

    <TextBlock text={client.route} />
  </Surface>
);

FlightPlanContainer.propTypes = {
  client: PropTypes.instanceOf(Pilot).isRequired,
};

export default FlightPlanContainer;
