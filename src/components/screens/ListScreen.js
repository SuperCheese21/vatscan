import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';

import ClientsListItem from '../common/ClientsListItem';
import Text from '../common/Text';
import { clientsShape, screenPropsShape } from '../propTypeShapes';
import { setSearchQuery, updateClients } from '../../redux/actions';
import {
  getIsLoading,
  getSearchQuery,
  searchFilteredClients,
} from '../../redux/selectors';

class ListScreen extends PureComponent {
  renderItem = ({ item }) => {
    const { screenProps: stackNavigation } = this.props;
    return <ClientsListItem client={item} stackNavigation={stackNavigation} />;
  };

  keyExtractor = item => item.callsign;

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="format-list-bulleted" size={20} color={tintColor} />;
    },
  };

  render() {
    const {
      dispatchSetSearchQuery,
      dispatchUpdateClients,
      filteredClients,
      isLoading,
      searchQuery,
    } = this.props;
    return (
      <View style={styles.listContainer}>
        <Searchbar
          style={{ margin: 5 }}
          placeholder="Name, Callsign, CID, Aircraft"
          onChangeText={dispatchSetSearchQuery}
          value={searchQuery}
        />
        <FlatList
          data={filteredClients}
          keyExtractor={this.keyExtractor}
          refreshing={isLoading}
          onRefresh={dispatchUpdateClients}
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

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

ListScreen.propTypes = {
  dispatchSetSearchQuery: PropTypes.func.isRequired,
  dispatchUpdateClients: PropTypes.func.isRequired,
  filteredClients: clientsShape.isRequired,
  isLoading: PropTypes.bool.isRequired,
  screenProps: screenPropsShape.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  filteredClients: searchFilteredClients(state),
  searchQuery: getSearchQuery(state),
});

const mapDispatchToProps = {
  dispatchSetSearchQuery: setSearchQuery,
  dispatchUpdateClients: updateClients,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
