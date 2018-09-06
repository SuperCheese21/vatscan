import React from 'react';
import { Text, View } from 'react-native';

import ProgressBar from './ProgressBar';

import styles from '../config/styles';

const Footer = props => (
    <View style={styles.footerContainer}>
        <Text style={styles.callsignText}>{props.data.callsign}</Text>
        <View style={[styles.sliderContainer]}>
            <ProgressBar
                progress={props.data.progress}
                visible={props.data.progress ? true : false}
            />
        </View>
    </View>
);

export default Footer;
