import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import colors from '../config/colors.json';

const RefreshIcon = props => {
    if (props.loading) {
        return (
            <ActivityIndicator
                animating={true}
                size="large"
                color={colors.accent}
            />
        );
    }
    return (
        <View style={{ justifyContent: 'center' }}>
            <IconButton
                icon="refresh"
                color={colors.accent}
                size={32}
                onPress={props.refresh}
            />
        </View>
    );
}

export default RefreshIcon;
