import React from 'react';
import { StyleSheet, View } from 'react-native';

import StatsContainer from './StatsContainer';
import StatsLabel from '../common/StatsLabel';
import StatsRow from '../common/StatsRow';
import Text from '../common/Text';
import { useClientData } from '../../api/useClientData';

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

export const ClientStatsContainer = () => {
  const { focusedClient } = useClientData();
  const {
    elapsedTimeLogon,
    id,
    location,
    name,
    server,
    sourceName,
    type,
  } = focusedClient;
  return (
    <StatsContainer>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <View>
          <Text style={{ color: '#898989' }}>{id}</Text>
        </View>
      </View>
      <StatsLabel text={type} />
      <StatsRow label="Network" text={sourceName} />
      {location && (
        <StatsRow
          label="Location"
          text={`${location.latitude}, ${location.longitude}`}
        />
      )}
      {server && <StatsRow label="Server" text={server} />}
      <StatsRow label="Time Connected" text={elapsedTimeLogon} />
    </StatsContainer>
  );
};

export default ClientStatsContainer;
