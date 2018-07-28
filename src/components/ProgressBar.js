import React, { Component } from 'react';
import Slider from 'react-native-slider';

import colors from '../config/colors.json';

export default class ProgressBar extends Component {
    render() {
        if (this.props.visible) {
            return (    
                <Slider
                    style={{ flex: 1 }}
                    disabled={true}
                    value={this.props.progress}
                    minimumTrackTintColor={colors.accent}
                    maximumTrackTintColor={colors.sliderMaximum}
                    thumbStyle={{ opacity: 0 }}
                />
            );
        }
        return null;
    }
}
