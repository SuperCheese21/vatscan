import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge } from 'react-native-paper';

import StatsContainer from './StatsContainer';

import StatsLabel from '../common/StatsLabel';
import StatsRow from '../common/StatsRow';
import Text from '../common/Text';
import { accent as accentColor } from '../../config/colors.json';

const ClientStatsContainer = ({ client }) => (
  <StatsContainer>
    <View style={styles.nameContainer}>
      <Text style={styles.nameText}>{client.name}</Text>
      <View>
        <Text style={{ color: '#898989' }}>{client.id}</Text>
        <Badge
          style={{
            backgroundColor: accentColor,
            color: 'white',
          }}
        >
          {client.rating}
        </Badge>
      </View>
    </View>
    <StatsLabel text={client.type === 'PILOT' ? 'Pilot' : 'ATC'} />
    <StatsRow
      label="Location"
      text={`${client.latitude}, ${client.longitude}`}
    />
    <StatsRow label="Server" text={client.server} />
    <StatsRow label="Time Connected" text={client.elapsedTimeLogon} />
  </StatsContainer>
);

ClientStatsContainer.propTypes = {
  client: PropTypes.object.isRequired,
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

export default ClientStatsContainer;
