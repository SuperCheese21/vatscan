import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import Text from '../components/Text';
import colors from '../config/colors.json';

const DetailDataContainer = props => (
    <View style={styles.infoContainerDetail}>
        <View style={styles.infoRow}>
            <View style={styles.infoRow}>
                <Icon name="flight" size={20} color={colors.accent} />
                <Text style={styles.infoText}>{' ' + (props.data.aircraft || 'N/A')}</Text>
            </View>
            <View style={styles.infoRow}>
                <Icon name="send" size={20} color={colors.accent} />
                <Text style={styles.infoText}>{' ' + props.data.groundSpeed + ' kts'}</Text>
            </View>
        </View>
        <View style={styles.infoRow}>
            <View style={styles.infoRow}>
                <Icon name="unfold-more" size={20} color={colors.accent} />
                <Text style={styles.infoText}>{' ' + props.data.altitude + ' ft'}</Text>
            </View>
            <View style={styles.infoRow}>
                <Icon name="navigation" size={20} color={colors.accent} />
                <Text style={styles.infoText}>{' ' + props.data.heading + '°'}</Text>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    infoContainerDetail: {
        flex: 5,
        backgroundColor: colors.primaryMedium
    },
    infoRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoText: {
        color: 'white',
        fontSize: 14
    }
});

export default DetailDataContainer;
