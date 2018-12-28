import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { List, Searchbar } from 'react-native-paper';

export default class ListContainer extends React.Component {
    state = {
        query: ''
    };

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Icon name={'format-list-bulleted'} size={20} color={tintColor} />;
        }
    };

    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Searchbar
                    placeholder="Name, Callsign, CID"
                    onChangeText={query => {
                        this.setState({ query });
                    }}
                    value={this.state.query}
                />
                <FlatList
                    data={this.props.screenProps.clientData.filter(client => {
                        const query = this.state.query;
                        if (
                            client.name.includes(query) ||
                            client.callsign.includes(query) ||
                            client.id.includes(query)
                        ) {
                            return true;
                        }
                        return false;
                    })}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) =>
                        <List.Item
                            title={item.callsign}
                            description={item.name}
                            left={props =>
                                <List.Icon
                                    {...props}
                                    icon={item.frequency ? 'rss-feed' : 'airplanemode-active'}
                                />
                            }
                        />
                    }
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
