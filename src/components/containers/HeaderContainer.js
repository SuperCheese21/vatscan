import React from 'react';
import { Text, View } from 'react-native';

import RefreshIcon from '../RefreshIcon';
import styles from '../styles';

const HeaderContainer = props => (
    <View style={styles.header}>
        <Text style={[styles.text, styles.headerText]}>
            {props.text}
        </Text>

        <RefreshIcon
            loading={props.loading}
            refresh={props.refresh}
        />
    </View>
);

export default HeaderContainer;
