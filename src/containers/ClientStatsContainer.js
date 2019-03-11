import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Badge, Surface } from 'react-native-paper';

import colors from '../config/colors.json';

const ClientStatsContainer = ({ client }) => (
    <Surface style={styles.statsContainer}>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 8
            }}
        >
            <Text
                style={{
                    flex: 1,
                    fontFamily: 'Roboto_Condensed_Regular',
                    fontSize: 26
                }}
            >
                {client.name}
            </Text>
            <View>
                <Text style={{ color: '#898989' }}>{client.id}</Text>
                <Badge
                    style={{
                        backgroundColor: colors.accent,
                        color: 'white'
                    }}
                >
                    {client.rating}
                </Badge>
            </View>
        </View>
        <Text style={{ fontSize: 18 }}>
            {client.type === 'PILOT' ? 'Pilot' : 'ATC'}
        </Text>
        <Text>
            Location{' '}
            <Text style={{ fontSize: 16, color: '#898989' }}>
                {client.latitude}, {client.longitude}
            </Text>
        </Text>
        <Text>
            Server{' '}
            <Text style={{ fontSize: 16, color: '#898989' }}>
                {client.server}
            </Text>
        </Text>
        <Text>
            Time Connected{' '}
            <Text style={{ fontSize: 16, color: '#898989' }}>
                {client.elapsedTimeLogon}
            </Text>
        </Text>
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

export default ClientStatsContainer;
