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
        this.infoPanel = React.createRef();
        this.state = {
            loading: true,
            focusedClient: {
                callsign: '',
                id: '',
                name: '',
                departureIcao: '',
                arrivalIcao: '',
                aircraft: '',
                altitude: '',
                heading: '',
                speed: ''
            }
        };
    }

    setFocusedClient = c => {
        this.setState({
            focusedClient: {
                callsign: c.callsign,
                id: c.id,
                name: c.name,
                departureIcao: c.flightplan.depairport,
                arrivalIcao: c.flightplan.destairport,
                aircraft: c.flightplan.aircraft,
                altitude: c.altitude,
                heading: c.heading,
                speed: c.groundspeed
            }
        });
    }

    showPanel = (position) => {
        this.infoPanel.current.transitionTo(position);
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
        const c = this.state.focusedClient;
        return (
            <View style={{flex: 1}}>
                <Header loading={this.state.loading} />
                <Map
                    showLoader={this.showLoader}
                    hideLoader={this.hideLoader}
                    showPanel={this.showPanel}
                    setFocusedClient={this.setFocusedClient}
                />
                <SlidingUpPanel
                    ref={this.infoPanel}
                    visible={true}
                    showBackdrop={false}
                    startCollapsed={true}
                    draggableRange={{ top: 240, bottom: 72 }}
                    height={168}
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
                                    source={require('./src/assets/icons/narrowbody.png')}
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
                <Footer callsign={c.callsign} />
            </View>
        );
    }
}
