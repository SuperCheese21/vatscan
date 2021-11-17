import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import ClientsListItem from '../common/ClientsListItem';
import { TabBarIcon } from '../common/TabBarIcon';
import Text from '../common/Text';
import { useClientData } from '../../api/useClientData';
import { useAppContext } from '../../context';

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export const ListScreen = () => {
  const [query, setQuery] = useState('');

  const { setFocusedClient } = useAppContext();

  const { clientData, isLoading } = useClientData();

  const lowerCaseQuery = query.toLowerCase();

  const filteredClientData = clientData.filter(
    client =>
      client.name.toLowerCase().includes(lowerCaseQuery) ||
      client.callsign.toLowerCase().includes(lowerCaseQuery) ||
      client.id.includes(lowerCaseQuery) ||
      (client.aircraft &&
        client.aircraft.toLowerCase().includes(lowerCaseQuery)),
  );

  return (
    <View style={styles.listContainer}>
      <Searchbar
        style={{ margin: 5 }}
        placeholder="Name, Callsign, CID, Aircraft"
        onChangeText={value => setQuery(value)}
        value={query}
      />
      <FlatList
        data={filteredClientData}
        keyExtractor={({ callsign }) => callsign}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <ClientsListItem client={item} setFocusedClient={setFocusedClient} />
        )}
        ListEmptyComponent={
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center' }}>No results found</Text>
          </View>
        }
      />
    </View>
  );
};

ListScreen.navigationOptions = {
  tabBarIcon: TabBarIcon,
};

export default ListScreen;
