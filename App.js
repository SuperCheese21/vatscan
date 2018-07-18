import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Icon from '@expo/vector-icons/MaterialIcons';

import Header from './src/components/Header';
import Map from './src/components/Map';
import Footer from './src/components/Footer';

import styles from './src/config/styles';
import colors from './src/config/colors.json';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    showLoader = () => {
        this.setState({
            loading: true
        });
    }

    hideLoader = () => {
        this.setState({
            loading: false
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header loading={this.state.loading} />
                <Map showLoader={this.showLoader} hideLoader={this.hideLoader} />
                <SlidingUpPanel
                    visible={true}
                    showBackdrop={false}
                    draggableRange={{ top: 240, bottom: 72 }}
                    height={168}
                >
                    <View style={{flex: 1}}>
                        <View style={styles.infoContainerBasic}>
                            <View style={styles.infoRow}>
                                <Text style={[
                                    styles.icaoText,
                                    { marginRight: 6, textAlign: 'right' }
                                ]}>
                                    KPDX
                                </Text>
                                <Image
                                    style={styles.fromToIcon}
                                    source={require('./src/assets/icons/narrowbody.png')}
                                />
                                <Text style={[
                                    styles.icaoText,
                                    { marginLeft: 6 }
                                ]}>
                                    KSFO
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', height: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.nameText}>
                                        Ethan Shields KPDX
                                    </Text>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={styles.cidText}>
                                        1277596
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.infoContainerDetail}>
                            <View style={styles.infoRow}>
                                <View style={styles.infoRow}>
                                    <Icon name='flight' size={24} color={colors.accent} />
                                    <Text style={styles.infoText}> M/B738/L</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Flown</Text>
                                    <Text style={styles.infoText}> 286 nm</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Remaining</Text>
                                    <Text style={styles.infoText}> 265 nm</Text>
                                </View>
                            </View>
                            <View style={styles.infoRow}>
                                <View style={styles.infoRow}>
                                    <Icon name='unfold-more' size={24} color={colors.accent} />
                                    <Text style={styles.infoText}> 34000 ft</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Icon name='navigation' size={24} color={colors.accent} />
                                    <Text style={styles.infoText}> 176°</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Icon name='send' size={24} color={colors.accent} />
                                    <Text style={styles.infoText}> 453 kts</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </SlidingUpPanel>
                <Footer />
            </View>
        );
    }
}
