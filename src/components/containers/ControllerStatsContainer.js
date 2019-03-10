import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Surface } from 'react-native-paper';
import MapView, { Polygon } from 'react-native-maps';

import TextBlock from '../TextBlock';
import mapStyle from '../../config/map-styles/style_blue_essence.json';

const ControllerStatsContainer = ({ client }) => (
    <Surface style={[styles.statsContainer]}>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Controller Info</Text>
        <Text>
            Type{' '}
            <Text style={{ fontSize: 16, color: '#898989' }}>
                {client.typeString}
            </Text>
        </Text>
        <Text>
            Frequency{' '}
            <Text style={{ fontSize: 16, color: '#898989' }}>
                {client.frequency}
            </Text>
        </Text>

        <TextBlock text={client.atisMessage} />

        <MapView
            style={{ width: '100%', height: 300, marginTop: 5 }}
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
            <Polygon
                coordinates={client.polygon}
                strokeWidth={1}
                strokeColor={client.strokeColor}
                fillColor={client.fillColor}
            />
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

export default ControllerStatsContainer;
