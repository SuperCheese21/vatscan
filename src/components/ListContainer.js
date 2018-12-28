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
                    data={this.props.screenProps.clientData}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) =>
                        <List.Item
                            title={item.callsign}
                            description={item.name}
                            left={props =>
                                <List.Icon
                                    {...props}
                                    icon={item.frequency ? "rss-feed" : "airplanemode-active"}
                                />
                            }
                        />
                    }
                />
            </View>
        );
    }
}
