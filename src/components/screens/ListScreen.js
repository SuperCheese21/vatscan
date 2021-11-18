import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import ClientsListItem from '../common/ClientsListItem';
import { TabBarIcon } from '../common/TabBarIcon';
import Text from '../common/Text';
import useClientData from '../../api/useClientData';
import { useAppContext } from '../../context';

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const ListScreen = () => {
  const { searchQuery, updateSearchQuery } = useAppContext();
  const { clientData, isLoading } = useClientData();

  return (
    <View style={styles.listContainer}>
      <Searchbar
        style={{ margin: 5 }}
        placeholder="Name, Callsign, CID, Aircraft"
        onChangeText={value => updateSearchQuery(value)}
        value={searchQuery}
      />
      <FlatList
        data={clientData}
        keyExtractor={({ callsign }) => callsign}
        refreshing={isLoading}
        renderItem={({ item }) => <ClientsListItem client={item} />}
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
