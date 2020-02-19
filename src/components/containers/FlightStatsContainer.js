import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import StatsContainer from './StatsContainer';

import Map from '../common/Map';
import StatsLabel from '../common/StatsLabel';
import StatsRow from '../common/StatsRow';
import { getFocusedClient } from '../../redux/selectors';

const FlightStatsContainer = ({
  focusedClient: {
    altitude,
    distFlown,
    distRemaining,
    eta,
    ete,
    getMapOverlay,
    groundSpeed,
    heading,
    latitude,
    longitude,
    plannedAltitude,
    tasCruise,
    transponder,
  },
}) => (
  <StatsContainer>
    <StatsLabel text="Flight Info" />

    <View style={{ flexDirection: 'row' }}>
      <StatsRow label="Speed" text={`${groundSpeed} kts`} planned={tasCruise} />
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
      <StatsRow label="Flown" text={`${distFlown} nm`} />
      <StatsRow label="Remaining" text={`${distRemaining} nm`} />
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

FlightStatsContainer.propTypes = {
  focusedClient: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  focusedClient: getFocusedClient(state),
});

export default connect(mapStateToProps)(FlightStatsContainer);
