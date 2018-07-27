import React, { Component } from 'react';
import { View } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

import BasicData from './BasicData';
import DetailData from './DetailData';

import colors from '../config/colors.json';
import constants from '../config/constants.json';
import styles from '../config/styles';

export default class InfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPanelState: constants.panelStates.COLLAPSED
        };
        this.infoPanel = React.createRef();
    }

    setPanelPosition = position => {
        this.infoPanel.current.transitionTo({
            toValue: position,
            duration: 100
        });
        this.setState({
            currentPanelState: position
        });
    }

    adjustPosition = position => {
        const prevState = this.state.currentPanelState;
        const { COLLAPSED, EXPANDED, HALF_EXPANDED } = constants.panelStates;

        if (prevState === EXPANDED) {
            if (position > HALF_EXPANDED) {
                this.setPanelPosition(HALF_EXPANDED);
            } else {
                this.setPanelPosition(COLLAPSED);
            }
        } else if (prevState === HALF_EXPANDED) {
            if (position > HALF_EXPANDED) {
                this.setPanelPosition(EXPANDED);
            } else {
                this.setPanelPosition(COLLAPSED);
            }
        }
    }

    render() {
        const top = constants.panelStates.EXPANDED;
        const bottom = constants.panelStates.COLLAPSED;
        return(
            <SlidingUpPanel
                ref={this.infoPanel}
                visible={true}
                showBackdrop={false}
                startCollapsed={true}
                allowMomentum={false}
                draggableRange={{
                    top: top,
                    bottom: bottom
                }}
                onDragEnd={position => {
                    console.log('onDragEnd()');
                    this.adjustPosition(position);
                }}
                onRequestClose={() => {
                    console.log('onRequestClose()');
                }}
                height={top - bottom}
            >

                <View style={{ flex: 1 }}>
                    <BasicData data={this.props.basicData} />
                    <DetailData data={this.props.detailData} />
                </View>

            </SlidingUpPanel>
        )
    }
}
