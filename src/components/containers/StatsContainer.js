import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

const StatsContainer = ({ children }) => (
  <Surface style={styles.statsContainer}>{children}</Surface>
);

StatsContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

const styles = StyleSheet.create({
  statsContainer: {
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    margin: 5,
  },
});

export default StatsContainer;
