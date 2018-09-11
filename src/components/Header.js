import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import colors from '../config/colors.json';
import styles from './styles';

const Header = props => (
    <View style={styles.header}>
        <Text style={[styles.text, styles.headerText]}>
            VATSCAN
        </Text>

        <ActivityIndicator
            animating={props.loading}
            size="large"
            color={colors.accent}
        />
    </View>
);

export default Header;
