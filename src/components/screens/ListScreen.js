import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Searchbar } from 'react-native-paper';

import ClientsListItem from '../ClientsListItem';
import styles from '../styles';

export default class ListScreen extends React.PureComponent {
    state = {
        query: ''
    };

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Icon name={'format-list-bulleted'} size={20} color={tintColor} />;
        }
    };

    getFilteredClients() {
        const query = this.state.query.toLowerCase();
        return this.props.screenProps.clientData.filter(client => {
            // Check if name, callsign, id, or aircraft contain query string
            return (
                client.name.toLowerCase().includes(query) ||
                client.callsign.toLowerCase().includes(query) ||
                client.id.includes(query) ||
                client.aircraft && client.aircraft.toLowerCase().includes(query)
            );
        });
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <View style={styles.listContainer}>
                <Searchbar
                    placeholder="Name, Callsign, CID, Aircraft"
                    onChangeText={query => {
                        // Update state on input change (for live results)
                        this.setState({ query });
                    }}
                    value={this.state.query}
                />
                <FlatList
                    data={this.getFilteredClients()}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => (
                        <ClientsListItem item={item} />
                    )}
                    ListEmptyComponent={
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center' }}>
                                No results found
                            </Text>
                        </View>
                    }
                />
            </View>
        );
    }
}
