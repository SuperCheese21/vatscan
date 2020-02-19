import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge } from 'react-native-paper';
import { connect } from 'react-redux';

import StatsContainer from './StatsContainer';

import StatsLabel from '../common/StatsLabel';
import StatsRow from '../common/StatsRow';
import Text from '../common/Text';
import { accent as accentColor } from '../../config/colors.json';
import { getFocusedClient } from '../../redux/selectors';

const ClientStatsContainer = ({
  focusedClient: {
    elapsedTimeLogon,
    id,
    latitude,
    longitude,
    name,
    rating,
    server,
    type,
  },
}) => (
  <StatsContainer>
    <View style={styles.nameContainer}>
      <Text style={styles.nameText}>{name}</Text>
      <View>
        <Text style={{ color: '#898989' }}>{id}</Text>
        <Badge
          style={{
            backgroundColor: accentColor,
            color: 'white',
          }}
        >
          {rating}
        </Badge>
      </View>
    </View>
    <StatsLabel text={type} />
    <StatsRow label="Location" text={`${latitude}, ${longitude}`} />
    <StatsRow label="Server" text={server} />
    <StatsRow label="Time Connected" text={elapsedTimeLogon} />
  </StatsContainer>
);

ClientStatsContainer.propTypes = {
  focusedClient: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  nameText: {
    flex: 1,
    fontFamily: 'Roboto_Condensed_Regular',
    fontSize: 26,
  },
});

const mapStateToProps = state => ({
  focusedClient: getFocusedClient(state),
});

export default connect(mapStateToProps)(ClientStatsContainer);
