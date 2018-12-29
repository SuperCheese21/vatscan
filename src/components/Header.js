import React from 'react';
import { Text, View } from 'react-native';

import RefreshIcon from './RefreshIcon';
import styles from './styles';

const Header = props => (
    <View style={styles.header}>
        <Text style={[styles.text, styles.headerText]}>
            VATSCAN
        </Text>

        <RefreshIcon
            loading={props.loading}
            refresh={props.refresh}
        />
    </View>
);

export default Header;
