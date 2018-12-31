import React from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { List, Searchbar, Surface, TouchableRipple } from 'react-native-paper';

export default class ListContainer extends React.PureComponent {
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
            <View style={{
                flex: 1,
                padding: 5
            }}>
                <Searchbar
                    placeholder="Name, Callsign, CID, Aircraft"
                    onChangeText={query => {
                        // Update state on input change (for live results)
                        this.setState({ query });
                    }}
                    value={this.state.query}
                />
                <FlatList
                    data={
                        // Use Array.filter to filter clients from data array
                        this.props.screenProps.clientData.filter(client => {
                            // Check if name, callsign, id, or aircraft contain query string
                            const query = this.state.query;
                            if (
                                client.name.includes(query) ||
                                client.callsign.includes(query) ||
                                client.id.includes(query) ||
                                client.aircraft && client.aircraft.includes(query)
                            ) {
                                return true;
                            }
                            return false;
                        }
                    )}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => (
                        // Wrap list item in touchable ripple for highlight effect
                        <TouchableRipple
                            onPress={() => {
                                // Show alert popup with detailed flight info
                                // TODO: Create dedicated page for this info
                                if (item.type === 'PILOT') {
                                    Alert.alert(
                                        item.callsign,
                                        item.name + '\n' +
                                        item.id + '\n\n' +
                                        'DEP/ARR: ' + item.depAirport + ' - ' + item.arrAirport + '\n' +
                                        'Location: ' + item.latitude + ', ' + item.longitude + '\n' +
                                        'Distance Flown: ' + item.distFlown + ' nm\n' +
                                        'Distance Remaining: ' + item.distRemaining + ' nm\n\n' +
                                        'Aircraft: ' + item.aircraft + '\n' +
                                        'Altitude: ' + item.altitude + ' ft\n' +
                                        'Speed: ' + item.groundSpeed + ' kts\n' +
                                        'Heading: ' + item.heading + '°\n' +
                                        'Transponder: ' + item.transponder + '\n' +
                                        'Route: ' + item.route
                                    );
                                }
                            }}
                        >
                            <Surface style={{
                                elevation: 5,
                                marginTop: 5
                            }}>
                                <List.Item
                                    title={item.callsign}
                                    description={item.name + ' (' + item.id + ')'}
                                    left={props => (
                                        <List.Icon
                                            {...props}
                                            icon={
                                                item.type === 'ATC' ?
                                                'rss-feed' :
                                                'airplanemode-active'
                                            }
                                        />
                                    )}
                                />
                            </Surface>
                        </TouchableRipple>
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
