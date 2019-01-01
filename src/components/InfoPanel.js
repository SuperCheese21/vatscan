import React from 'react';
import { Animated } from 'react-native';

import BasicData from './BasicData';
import DetailData from './DetailData';
import styles from './styles';

const InfoPanel = props => (
    <Animated.View
        style={[
            styles.infoPanelContainer,
            { bottom: props.panelPosition }
        ]}
    >
        <BasicData data={props.basicData} />
        <DetailData data={props.detailData} />
    </Animated.View>
);

export default InfoPanel;
