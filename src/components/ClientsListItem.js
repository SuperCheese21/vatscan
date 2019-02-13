import React from 'react';
import { List, Surface, TouchableRipple } from 'react-native-paper';

import styles from './styles';

const ClientsListItem = props => (
    // Wrap list item in touchable ripple for highlight effect
    <TouchableRipple
        onPress={() => {
            props.setFocusedClient(props.client);
            props.stackNavigation.navigate('ClientScreen');
        }}
    >
        <Surface style={styles.listItem}>
            <List.Item
                title={props.client.callsign}
                description={props.client.name + ' (' + props.client.id + ')'}
                left={itemProps => (
                    <List.Icon
                        {...itemProps}
                        icon={
                            props.client.type === 'ATC' ?
                            'rss-feed' :
                            'airplanemode-active'
                        }
                    />
                )}
            />
        </Surface>
    </TouchableRipple>
);

export default ClientsListItem;
