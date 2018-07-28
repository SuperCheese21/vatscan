import React, { Component } from 'react';
import { Text, View } from 'react-native';

import ProgressBar from './ProgressBar';

import styles from '../config/styles';

export default class Footer extends Component {
    render() {
        return (
            <View style={styles.footerContainer}>
                <Text style={styles.callsignText}>{this.props.data.callsign}</Text>
                <View style={[styles.sliderContainer]}>
                    <ProgressBar
                        progress={this.props.data.progress}
                        visible={this.props.progressBar}
                    />
                </View>
            </View>
        );
    }
}
