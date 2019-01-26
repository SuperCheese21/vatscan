import React from 'react';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import colors from '../../config/colors.json';
import styles from '../styles';

const DetailDataContainer = props => (
    <View style={styles.infoContainerDetail}>
        <View style={styles.infoRow}>
            <View style={styles.infoRow}>
                <Icon name='flight' size={20} color={colors.accent} />
                <Text style={[styles.text, styles.infoText]}>
                    {' ' + (props.data.aircraft || 'N/A')}
                </Text>
            </View>
            <View style={styles.infoRow}>
                <Icon name='send' size={20} color={colors.accent} />
                <Text style={[styles.text, styles.infoText]}>
                    {' ' + props.data.groundSpeed + ' kts'}
                </Text>
            </View>
        </View>
        <View style={styles.infoRow}>
            <View style={styles.infoRow}>
                <Icon name='unfold-more' size={20} color={colors.accent} />
                <Text style={[styles.text, styles.infoText]}>
                    {' ' + props.data.altitude + ' ft'}
                </Text>
            </View>
            <View style={styles.infoRow}>
                <Icon name='navigation' size={20} color={colors.accent} />
                <Text style={[styles.text, styles.infoText]}>
                    {' ' + props.data.heading + '°'}
                </Text>
            </View>
        </View>
    </View>
);

export default DetailDataContainer;
