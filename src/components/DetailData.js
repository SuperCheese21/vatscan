import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import colors from '../config/colors.json';
import styles from '../config/styles';

export default class DetailData extends Component {
    render() {
        const data = this.props.data;
        return (
            <View style={styles.infoContainerDetail}>
                <View style={styles.infoRow}>
                    <View style={styles.infoRow}>
                        <Icon name='flight' size={24} color={colors.accent} />
                        <Text style={styles.infoText}>{data.aircraft}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Flown</Text>
                        <Text style={styles.infoText}>{data.distFlown}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Remaining</Text>
                        <Text style={styles.infoText}>{data.distRemaining}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.infoRow}>
                        <Icon name='unfold-more' size={24} color={colors.accent} />
                        <Text style={styles.infoText}>{data.altitude}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Icon name='navigation' size={24} color={colors.accent} />
                        <Text style={styles.infoText}>{data.heading}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Icon name='send' size={24} color={colors.accent} />
                        <Text style={styles.infoText}>{data.groundSpeed}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
