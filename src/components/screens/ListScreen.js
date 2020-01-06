import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import ClientsListItem from '../common/ClientsListItem';
import Text from '../common/Text';
import { screenPropsShape } from '../propTypeShapes';

export default class ListScreen extends PureComponent {
  state = {
    query: '',
  };

  getFilteredClients() {
    const { screenProps } = this.props;
    const { query: oldQuery } = this.state;
    const query = oldQuery.toLowerCase();
    return screenProps.filteredClients.filter(
      client =>
        client.name.toLowerCase().includes(query) ||
        client.callsign.toLowerCase().includes(query) ||
        client.id.includes(query) ||
        (client.aircraft && client.aircraft.toLowerCase().includes(query)),
    );
  }

  onChangeText = query => {
    this.setState({ query });
  };

  renderItem = ({ item }) => {
    const { screenProps } = this.props;
    return (
      <ClientsListItem
        client={item}
        setFocusedClient={screenProps.setFocusedClient}
        stackNavigation={screenProps.stackNavigation}
      />
    );
  };

  keyExtractor = item => item.callsign;

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="format-list-bulleted" size={20} color={tintColor} />;
    },
  };

  render() {
    const {
      screenProps: { isLoading, updateData },
    } = this.props;
    const { query } = this.state;
    return (
      <View style={styles.listContainer}>
        <Searchbar
          style={{ margin: 5 }}
          placeholder="Name, Callsign, CID, Aircraft"
          onChangeText={this.onChangeText}
          value={query}
        />
        <FlatList
          data={this.getFilteredClients()}
          keyExtractor={this.keyExtractor}
          refreshing={isLoading}
          onRefresh={updateData}
          renderItem={this.renderItem}
          ListEmptyComponent={
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'center' }}>No results found</Text>
            </View>
          }
        />
      </View>
    );
  }
}

ListScreen.propTypes = {
  screenProps: screenPropsShape.isRequired,
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
