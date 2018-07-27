import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Slider from 'react-native-slider';

import styles from '../config/styles';
import colors from '../config/colors.json';

export default class Footer extends Component {
    render() {
        const data = this.props.data;
        return (
            <View style={styles.footerContainer}>
                <Text style={styles.callsignText}>{data.callsign}</Text>
                <View style={[
                    styles.sliderContainer,
                    !this.props.progressBar && styles.hidden
                ]}>
                    <Slider
                        style={{ flex: 1 }}
                        disabled={true}
                        value={data.progress}
                        minimumTrackTintColor={colors.accent}
                        maximumTrackTintColor={colors.sliderMaximum}
                        thumbStyle={{ opacity: 0 }}
                    />
                </View>
            </View>
        );
    }
}
