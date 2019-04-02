import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { MapView } from 'expo';

import FlightPath from '../components/FlightPath';
import Map from '../components/Map';
import StatsLabel from '../components/StatsLabel';
import StatsRow from '../components/StatsRow';

const FlightStatsContainer = ({ client }) => (
    <Surface style={styles.statsContainer}>
        <StatsLabel text="Flight Info" />

        <View style={{ flexDirection: 'row' }}>
            <StatsRow
                label="Speed"
                text={client.groundSpeed + ' kts'}
                planned={client.tasCruise}
            />
            <StatsRow label="Heading" text={client.heading + '°'} />
        </View>

        <View style={{ flexDirection: 'row' }}>
            <StatsRow
                label="Altitude"
                text={client.altitude + ' ft'}
                planned={client.plannedAltitude}
            />
            <StatsRow label="Transponder" text={client.transponder} />
        </View>

        <View style={{ flexDirection: 'row' }}>
            <StatsRow label="Flown" text={client.distFlown + ' nm'} />
            <StatsRow label="Remaining" text={client.distRemaining + ' nm'} />
        </View>

        <View style={{ flexDirection: 'row' }}>
            <StatsRow label="ETE" text={client.ete || 'N/A'} />
            <StatsRow
                label="ETA"
                text={client.eta ? client.eta + 'z' : 'N/A'}
            />
        </View>

        <Map
            style={{ flex: 1, marginTop: 5 }}
            initialRegion={{
                latitude: client.latitude,
                longitude: client.longitude,
                latitudeDelta: 5,
                longitudeDelta: 5
            }}
        >
            <MapView.Marker
                image={client.aircraftIcon}
                rotation={client.heading}
                anchor={{ x: 0.5, y: 0.5 }}
                coordinate={client.location}
                tracksViewChanges={false}
                stopPropagation
                opacity={1.1}
            />

            <FlightPath focusedClient={client} />
        </Map>
    </Surface>
);

const styles = StyleSheet.create({
    statsContainer: {
        borderRadius: 10,
        padding: 10,
        elevation: 10,
        margin: 5,
        height: 450
    }
});

export default FlightStatsContainer;
