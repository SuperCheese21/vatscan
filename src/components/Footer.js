import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Slider from 'react-native-slider';

import styles from '../config/styles';
import colors from '../config/colors.json';

export default class Footer extends Component {
    render() {
        return (
            <View style={styles.footerContainer}>
                <Text style={styles.callsignText}>{this.props.callsign}</Text>
                <View style={styles.sliderContainer}>
                    <Slider
                        style={{ flex: 1 }}
                        disabled={true}
                        value={0.5}
                        minimumTrackTintColor={colors.accent}
                        maximumTrackTintColor={colors.sliderMaximum}
                        thumbStyle={{ opacity: 0 }}
                    />
                </View>
            </View>
        );
    }
}
