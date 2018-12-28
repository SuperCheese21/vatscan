import React from 'react';
import { Animated } from 'react-native';

import BasicData from './BasicData';
import DetailData from './DetailData';

const InfoPanel = props => (
    <Animated.View
        style={{
            width: '100%',
            height: 160,
            position: 'absolute',
            bottom: props.panelPosition
        }}
    >
        <BasicData data={props.basicData} />
        <DetailData data={props.detailData} />
    </Animated.View>
);

export default InfoPanel;
