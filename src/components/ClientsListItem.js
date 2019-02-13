import React from 'react';
import { List, Surface, TouchableRipple } from 'react-native-paper';

import styles from './styles';

const ClientsListItem = props => (
    // Wrap list item in touchable ripple for highlight effect
    <Surface style={styles.listItem}>
        <TouchableRipple
            onPress={() => {
                props.setFocusedClient(props.client);
                props.stackNavigation.navigate('ClientScreen');
            }}
        >
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
        </TouchableRipple>
    </Surface>
);

export default ClientsListItem;
