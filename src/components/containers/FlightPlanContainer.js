import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';

import TextBlock from '../TextBlock';

const FlightPlanContainer = ({ client }) => (
    <Surface style={styles.statsContainer}>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Flight Plan</Text>
        <Text numberOfLines={1}>
            From{' '}
            <Text style={{ fontSize: 16, color: '#898989' }}>
                {client.depAirport}
            </Text>
            <Text style={{ fontSize: 12 }}> / {client.depAirportName}</Text>
        </Text>
        <Text numberOfLines={1}>
            To{' '}
            <Text style={{ fontSize: 16, color: '#898989' }}>
                {client.arrAirport}
            </Text>
            <Text style={{ fontSize: 12 }}> / {client.arrAirportName}</Text>
        </Text>
        <Text style={{ flex: 1 }}>
            Aircraft{' '}
            <Text style={{ fontSize: 16, color: '#898989' }}>
                {client.aircraft}
            </Text>
        </Text>

        <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1 }}>
                Departure{' '}
                <Text style={{ fontSize: 16, color: '#898989' }}>
                    {client.plannedDepTime}z
                </Text>
            </Text>
            <Text style={{ flex: 1 }}>
                Arrival{' '}
                <Text style={{ fontSize: 16, color: '#898989' }}>
                    {client.plannedArrTime}z
                </Text>
            </Text>
        </View>

        <Text style={{ flex: 1 }}>
            Duration{' '}
            <Text style={{ fontSize: 16, color: '#898989' }}>
                {client.hrsEnRoute} hrs {client.minEnRoute} min
            </Text>
        </Text>

        <TextBlock text={client.route} />
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

export default FlightPlanContainer;
