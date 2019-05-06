import React from 'react';
import { Share } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Linking } from 'expo';

import colors from '../config/colors.json';

export default class ShareButton extends React.PureComponent {
    onPress = () => {
        const url = Linking.makeUrl('clients/' + this.props.callsign);
        const message = 'Check out ' + this.props.callsign + ' on VATSCAN!\n\n' + url;
        Share.share({
            message,
            url
        });
    };

    render() {
        return <IconButton icon="share" color={colors.accent} onPress={this.onPress} />;
    }
}
