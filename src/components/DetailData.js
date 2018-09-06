import React from 'react';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import colors from '../config/colors.json';
import styles from './styles';

const DetailData = props => (
    <View style={styles.infoContainerDetail}>
        <View style={styles.infoRow}>
            <View style={styles.infoRow}>
                <Icon name='flight' size={24} color={colors.accent} />
                <Text style={[styles.text, styles.infoText]}>{props.data.aircraft}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={[styles.text, styles.infoLabel]}>Flown</Text>
                <Text style={[styles.text, styles.infoText]}>{props.data.distFlown}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={[styles.text, styles.infoLabel]}>Remaining</Text>
                <Text style={[styles.text, styles.infoText]}>{props.data.distRemaining}</Text>
            </View>
        </View>
        <View style={styles.infoRow}>
            <View style={styles.infoRow}>
                <Icon name='unfold-more' size={24} color={colors.accent} />
                <Text style={[styles.text, styles.infoText]}>{props.data.altitude}</Text>
            </View>
            <View style={styles.infoRow}>
                <Icon name='navigation' size={24} color={colors.accent} />
                <Text style={[styles.text, styles.infoText]}>{props.data.heading}</Text>
            </View>
            <View style={styles.infoRow}>
                <Icon name='send' size={24} color={colors.accent} />
                <Text style={[styles.text, styles.infoText]}>{props.data.groundSpeed}</Text>
            </View>
        </View>
    </View>
);

export default DetailData;
