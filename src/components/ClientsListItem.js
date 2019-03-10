import React from 'react';
import { StyleSheet } from 'react-native';
import { List, Surface, TouchableRipple } from 'react-native-paper';

const ClientsListItem = props => (
    // Wrap list item in touchable ripple for highlight effect
    <Surface style={styles.listItem}>
        <TouchableRipple
            onPress={() => {
                props.setFocusedClient(props.client);
                props.stackNavigation.navigate('ClientScreen', {
                    callsign: props.client.callsign,
                    removeFocusedClient: true
                });
            }}
        >
            <List.Item
                title={props.client.callsign}
                description={props.client.name + ' (' + props.client.id + ')'}
                left={itemProps => (
                    <List.Icon
                        {...itemProps}
                        icon={
                            props.client.type === 'ATC'
                                ? 'rss-feed'
                                : 'airplanemode-active'
                        }
                    />
                )}
            />
        </TouchableRipple>
    </Surface>
);

const styles = StyleSheet.create({
    listItem: {
        elevation: 5,
        margin: 5,
        borderRadius: 5
    }
});

export default ClientsListItem;
