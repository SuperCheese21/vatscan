import React, { Component } from 'react';
import {
    ActivityIndicator,
    Text,
    View
} from 'react-native';

import colors from '../config/colors.json';

export default class Header extends Component {
    render() {
        return (
            <View style={{
                backgroundColor: colors.primary,
                height: 56,
                paddingLeft: 13,
                paddingRight: 5,
                flexDirection: 'row'
            }}>
                <Text style={{
                    color: '#ffffff',
                    fontSize: 20,
                    flex: 1,
                    textAlignVertical: 'center'
                }}>
                    VATSCAN
                </Text>

                <ActivityIndicator
                    animating={this.props.loading}
                    size="large"
                    color={colors.accent}
                />
            </View>
        );
    }
}
