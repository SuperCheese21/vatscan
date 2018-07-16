import React, { Component } from 'react';
import { View, Text } from 'react-native';

import colors from '../config/colors.json';

export default class Header extends Component {
    render() {
        return (
            <View style={{
                backgroundColor: colors.primary,
                height: 56
            }}>
                <Text style={{
                    color: '#ffffff',
                    fontSize: 20,
                    fontWeight: '400',
                    fontFamily: 'Roboto',
                    flex: 1,
                    margin: 13,
                    textAlignVertical: 'center'
                }}>
                    VATSCAN
                </Text>
            </View>
        );
    }
}
