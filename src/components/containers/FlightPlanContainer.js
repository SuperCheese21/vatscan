import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { connect } from 'react-redux';

import StatsLabel from '../common/StatsLabel';
import StatsRow from '../common/StatsRow';
import TextBlock from '../common/TextBlock';
import { getFocusedClient } from '../../redux/selectors';

const FlightPlanContainer = ({
  focusedClient: {
    aircraft,
    arrAirport,
    arrCityName,
    depAirport,
    depCityName,
    plannedArrTime,
    plannedDepTime,
    plannedDuration,
    route,
  },
}) => (
  <Surface style={styles.statsContainer}>
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
  </Surface>
);

FlightPlanContainer.propTypes = {
  focusedClient: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  statsContainer: {
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    margin: 5,
  },
});

const mapStateToProps = state => ({
  focusedClient: getFocusedClient(state),
});

export default connect(mapStateToProps)(FlightPlanContainer);
