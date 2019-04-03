import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

const StatsContainer = props => (
    <Surface style={styles.statsContainer}>{props.children}</Surface>
);

const styles = StyleSheet.create({
    statsContainer: {
        borderRadius: 10,
        padding: 10,
        elevation: 10,
        margin: 5
    }
});

export default StatsContainer;
