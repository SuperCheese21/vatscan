import React from 'react';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import colors from '../config/colors.json';
import styles from './styles';

const DetailData = props => (
    <View style={styles.infoContainerDetail}>
        <View style={styles.infoRow}>
            <View style={styles.infoRow}>
                <Icon name='flight' size={20} color={colors.accent} />
                <Text style={[styles.text, styles.infoText]}>
                    {' ' + props.data.aircraft}
                </Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={[styles.text, styles.infoLabelText]}>Flown</Text>
                <Text style={[styles.text, styles.infoText]}>
                    {props.data.distFlown >= 0 ? (' ' + props.data.distFlown + ' nm') : ' N/A'}
                </Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={[styles.text, styles.infoLabelText]}>Remaining</Text>
                <Text style={[styles.text, styles.infoText]}>
                    {props.data.distRemaining >= 0 ? (' ' + props.data.distRemaining + ' nm') : ' N/A'}
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
            <View style={styles.infoRow}>
                <Icon name='send' size={20} color={colors.accent} />
                <Text style={[styles.text, styles.infoText]}>
                    {' ' + props.data.groundSpeed + ' kts'}
                </Text>
            </View>
        </View>
    </View>
);

export default DetailData;
