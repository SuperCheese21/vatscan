import React from 'react';
import { Animated, View } from 'react-native';

import BasicData from './BasicData';
import DetailData from './DetailData';

import { panelStates } from '../config/constants.json';

export default class InfoPanel extends React.Component {
    state = {
        panelPosition: new Animated.Value(panelStates.COLLAPSED),
        panelPositionValue: panelStates.COLLAPSED
    }

    getPanelPosition = () => {
        return this.state.panelPositionValue;
    }

    setPanelPosition = position => {
        this.setState({ panelPositionValue: position });
        Animated.timing(
            this.state.panelPosition,
            {
                toValue: position,
                duration: 500
            }
        ).start();
    }

    render() {
        return (
            <Animated.View
                style={{
                    width: '100%',
                    height: 140,
                    position: 'absolute',
                    bottom: this.state.panelPosition
                }}
            >
                <BasicData data={this.props.basicData} />
                <DetailData data={this.props.detailData} />
            </Animated.View>
        );
    }
}
