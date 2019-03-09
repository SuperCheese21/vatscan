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
            return (
                <Icon
                    name={'format-list-bulleted'}
                    size={20}
                    color={tintColor}
                />
            );
        }
    };

    getFilteredClients() {
        const query = this.state.query.toLowerCase();
        return this.props.screenProps.clients.filter(
            client =>
                client.name.toLowerCase().includes(query) ||
                client.callsign.toLowerCase().includes(query) ||
                client.id.includes(query) ||
                (client.aircraft &&
                    client.aircraft.toLowerCase().includes(query))
        );
    }

    _keyExtractor = (item, index) => item.callsign;

    render() {
        return (
            <View style={styles.listContainer}>
                <Searchbar
                    style={{ margin: 5 }}
                    placeholder="Name, Callsign, CID, Aircraft"
                    onChangeText={query => this.setState({ query })}
                    value={this.state.query}
                />
                <FlatList
                    data={this.getFilteredClients()}
                    keyExtractor={this._keyExtractor}
                    refreshing={this.props.screenProps.loading}
                    onRefresh={this.props.screenProps.refresh}
                    renderItem={({ item }) => (
                        <ClientsListItem
                            client={item}
                            setFocusedClient={
                                this.props.screenProps.setFocusedClient
                            }
                            stackNavigation={
                                this.props.screenProps.stackNavigation
                            }
                        />
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
