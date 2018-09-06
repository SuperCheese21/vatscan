import React from 'react';
import Slider from 'react-native-slider';

import colors from '../config/colors.json';

const ProgressBar = props => {
    if (props.visible) {
        return (
            <Slider
                style={{ flex: 1 }}
                disabled={true}
                value={props.progress}
                minimumTrackTintColor={colors.accent}
                maximumTrackTintColor={colors.sliderMaximum}
                thumbStyle={{ opacity: 0 }}
            />
        );
    }
    return null;
}

export default ProgressBar;
