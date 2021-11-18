import { object } from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { List, Surface, TouchableRipple } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

import { navigationShape } from '../propTypeShapes';

const styles = StyleSheet.create({
  listItem: {
    elevation: 5,
    margin: 5,
    borderRadius: 5,
  },
});

const ClientsListItem = ({ client, navigation }) => {
  const { callsign, name, id, type } = client;

  const onPress = () =>
    navigation.navigate('ClientScreen', {
      callsign,
      removeFocusedClient: true,
    });

  return (
    <Surface style={styles.listItem}>
      <TouchableRipple onPress={onPress}>
        <List.Item
          title={callsign}
          description={`${name} (${id})`}
          left={({ color, style }) => (
            <List.Icon
              color={color}
              style={style}
              icon={type === 'ATC' ? 'radio-tower' : 'airplane'}
            />
          )}
        />
      </TouchableRipple>
    </Surface>
  );
};

ClientsListItem.propTypes = {
  client: object.isRequired,
  navigation: navigationShape.isRequired,
};

export default withNavigation(ClientsListItem);
