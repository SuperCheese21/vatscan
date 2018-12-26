import React from 'react';
import { Animated, View } from 'react-native';

import BasicData from './BasicData';
import DetailData from './DetailData';

import constants from '../config/constants.json';

export default class InfoPanel extends React.Component {
    state = {
        panelPosition: constants.panelStates.COLLAPSED
    }

    getPanelPosition = () => {
        return this.state.panelPosition;
    }

    // setPanelPosition = position => {
    //     console.log('Setting panel position to ' + position);
    //     this.setState({
    //         panelPosition: position
    //     });
    //     this.infoPanel.current.transitionTo({
    //         toValue: position,
    //         duration: 250
    //     });
    // }

    // adjustPanelPosition = position => {
    //     const prevState = this.state.panelPosition;
    //     const { COLLAPSED, EXPANDED, HALF_EXPANDED } = constants.panelStates;
    //
    //     if (prevState === EXPANDED) {
    //         if (position > HALF_EXPANDED) {
    //             this.setPanelPosition(HALF_EXPANDED);
    //         } else {
    //             this.setPanelPosition(COLLAPSED);
    //         }
    //     } else if (prevState === HALF_EXPANDED) {
    //         if (position > HALF_EXPANDED) {
    //             this.setPanelPosition(EXPANDED);
    //         } else {
    //             this.setPanelPosition(COLLAPSED);
    //         }
    //     }
    // }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <BasicData data={this.props.basicData} />
                <DetailData data={this.props.detailData} />
            </View>
        );
    }
}
