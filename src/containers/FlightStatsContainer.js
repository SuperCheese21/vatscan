import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

import FlightPath from '../components/FlightPath';
import mapStyle from '../config/map-styles/style_blue_essence.json';

const FlightStatsContainer = ({ client }) => (
    <Surface style={[styles.statsContainer, { height: 450 }]}>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Flight Info</Text>

        <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1 }}>
                Speed{' '}
                <Text style={{ fontSize: 16, color: '#898989' }}>
                    {client.groundSpeed} kts
                </Text>
                <Text style={{ fontSize: 12 }}> / {client.tasCruise}</Text>
            </Text>
            <Text style={{ flex: 1 }}>
                Heading{' '}
                <Text style={{ fontSize: 16, color: '#898989' }}>
                    {client.heading}°
                </Text>
            </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1 }}>
                Altitude{' '}
                <Text style={{ fontSize: 16, color: '#898989' }}>
                    {client.altitude} ft
                </Text>
                <Text style={{ fontSize: 12 }}>
                    {' '}
                    / {client.plannedAltitude}
                </Text>
            </Text>
            <Text style={{ flex: 1 }}>
                Transponder{' '}
                <Text style={{ fontSize: 16, color: '#898989' }}>
                    {client.transponder}
                </Text>
            </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1 }}>
                Flown{' '}
                <Text style={{ fontSize: 16, color: '#898989' }}>
                    {client.distFlown} nm
                </Text>
            </Text>
            <Text style={{ flex: 1 }}>
                Remaining{' '}
                <Text style={{ fontSize: 16, color: '#898989' }}>
                    {client.distRemaining} nm
                </Text>
            </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1 }}>
                ETE{' '}
                <Text style={{ fontSize: 16, color: '#898989' }}>
                    {client.ete || 'N/A'}
                </Text>
            </Text>
            <Text style={{ flex: 1 }}>
                ETA{' '}
                <Text style={{ fontSize: 16, color: '#898989' }}>
                    {client.eta ? client.eta + 'z' : 'N/A'}
                </Text>
            </Text>
        </View>

        <MapView
            style={{ flex: 1, marginTop: 5 }}
            provider={'google'}
            initialRegion={{
                latitude: client.latitude,
                longitude: client.longitude,
                latitudeDelta: 5,
                longitudeDelta: 5
            }}
            customMapStyle={mapStyle}
            moveOnMarkerPress={false}
            toolbarEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
            showsIndoors={false}
        >
            <Marker
                image={client.aircraftIcon}
                rotation={client.heading}
                anchor={{ x: 0.5, y: 0.5 }}
                coordinate={client.location}
                tracksViewChanges={false}
                stopPropagation
                opacity={1.1}
            />

            <FlightPath focusedClient={client} />
        </MapView>
    </Surface>
);

const styles = StyleSheet.create({
    statsContainer: {
        borderRadius: 10,
        padding: 10,
        elevation: 10,
        margin: 5
    }
});

export default FlightStatsContainer;
