import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import StatsContainer from './StatsContainer';

import Map from '../common/Map';
import StatsLabel from '../common/StatsLabel';
import StatsRow from '../common/StatsRow';
import TextBlock from '../common/TextBlock';
import { getFocusedClient } from '../../redux/selectors';

const ControllerStatsContainer = ({
  focusedClient: {
    atisMessage,
    frequency,
    fullName,
    getMapOverlay,
    latitude,
    longitude,
  },
}) => (
  <StatsContainer>
    <StatsLabel text="Controller Info" />

    <StatsRow label="Type" text={fullName} />
    <StatsRow label="Frequency" text={frequency} />

    <TextBlock text={atisMessage} />

    <Map
      style={styles.map}
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

ControllerStatsContainer.propTypes = {
  focusedClient: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    marginTop: 5,
    height: 350,
  },
});

const mapStateToProps = state => ({
  focusedClient: getFocusedClient(state),
});

export default connect(mapStateToProps)(ControllerStatsContainer);
