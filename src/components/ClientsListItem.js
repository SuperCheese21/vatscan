import React from 'react';
import { List, Surface, TouchableRipple } from 'react-native-paper';

import styles from './styles';

const ClientsListItem = props => (
    // Wrap list item in touchable ripple for highlight effect
    <TouchableRipple
        onPress={() => props.stackNavigation.navigate('ClientScreen')}
    >
        <Surface style={styles.listItem}>
            <List.Item
                title={props.item.callsign}
                description={props.item.name + ' (' + props.item.id + ')'}
                left={itemProps => (
                    <List.Icon
                        {...itemProps}
                        icon={
                            props.item.type === 'ATC' ?
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
