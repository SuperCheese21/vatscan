import React from 'react';
import { Alert } from 'react-native';
import { List, Surface, TouchableRipple } from 'react-native-paper';

import styles from './styles';

const ClientsListItem = props => (
    // Wrap list item in touchable ripple for highlight effect
    <TouchableRipple
        onPress={() => {
            // Show alert popup with detailed flight info
            // TODO: Create dedicated page for this info
            if (props.item.type === 'PILOT') {
                Alert.alert(
                    props.item.callsign,
                    props.item.name + '\n' +
                    props.item.id + '\n\n' +
                    'DEP/ARR: ' + props.item.depAirport + ' - ' + props.item.arrAirport + '\n' +
                    'Location: ' + props.item.latitude + ', ' + props.item.longitude + '\n' +
                    'Distance Flown: ' + props.item.distFlown + ' nm\n' +
                    'Distance Remaining: ' + props.item.distRemaining + ' nm\n\n' +
                    'Aircraft: ' + props.item.aircraft + '\n' +
                    'Altitude: ' + props.item.altitude + ' ft\n' +
                    'Speed: ' + props.item.groundSpeed + ' kts\n' +
                    'Heading: ' + props.item.heading + '°\n' +
                    'Transponder: ' + props.item.transponder + '\n' +
                    'Route: ' + props.item.route
                );
            }
        }}
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
