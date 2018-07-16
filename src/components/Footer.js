import React, { Component } from 'react';
import { View } from 'react-native';

import colors from '../config/colors.json';

export default class Footer extends Component {
    render() {
        return (
            <View style={{
                backgroundColor: colors.primaryDark,
                height: 50
            }}>
            </View>
        );
    }
}
