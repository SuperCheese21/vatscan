import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import SlidingUpPanel from 'rn-sliding-up-panel';

import colors from '../config/colors.json';
import constants from '../config/constants.json';
import styles from '../config/styles';

export default class InfoPanel extends Component {
    constructor(props) {
        super(props);
        this.infoPanel = React.createRef();
    }

    setPanelPosition = position => {
        this.infoPanel.current.transitionTo({
            toValue: position,
            duration: 100
        });
    }

    // adjustPosition = position => {
    //     const prevState = this.state.currentPanelState;
    //     const states = constants.panelStates;
    //
    //     if (prevState === states.EXPANDED) {
    //         const threshold = (states.HALF_EXPANDED - states.COLLAPSED) / 2;
    //         if (position > threshold) {
    //             this.movePanel(states.HALF_EXPANDED);
    //         } else {
    //             this.movePanel(states.COLLAPSED);
    //         }
    //     } else if (prevState === states.HALF_EXPANDED) {
    //         if (position > states.HALF_EXPANDED) {
    //             this.movePanel(states.EXPANDED);
    //         } else {
    //             this.movePanel(states.COLLAPSED);
    //         }
    //     }
    // }

    render() {
        const c = this.props.data;
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
                    //this.adjustPosition(position);
                }}
                onRequestClose={() => {
                    console.log('onRequestClose()');
                }}
                height={top - bottom}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.infoContainerBasic}>
                        <View style={styles.infoRow}>
                            <Text style={[
                                styles.icaoText,
                                { marginRight: 6, textAlign: 'right' }
                            ]}>
                                {c.departureIcao}
                            </Text>
                            <Image
                                style={styles.fromToIcon}
                                source={require('../assets/icons/narrowbody.png')}
                            />
                            <Text style={[
                                styles.icaoText,
                                { marginLeft: 6 }
                            ]}>
                                {c.arrivalIcao}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', height: 20 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.nameText}>{c.name}</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.cidText}>{c.id}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.infoContainerDetail}>
                        <View style={styles.infoRow}>
                            <View style={styles.infoRow}>
                                <Icon name='flight' size={24} color={colors.accent} />
                                <Text style={styles.infoText}>{' ' + c.aircraft}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Flown</Text>
                                <Text style={styles.infoText}></Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Remaining</Text>
                                <Text style={styles.infoText}></Text>
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoRow}>
                                <Icon name='unfold-more' size={24} color={colors.accent} />
                                <Text style={styles.infoText}>{' ' + c.altitude + ' ft'}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Icon name='navigation' size={24} color={colors.accent} />
                                <Text style={styles.infoText}>{' ' + c.heading + '°'}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Icon name='send' size={24} color={colors.accent} />
                                <Text style={styles.infoText}>{' ' + c.speed + ' kts'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </SlidingUpPanel>
        )
    }
}
