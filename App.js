import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

import Header from './src/components/Header';
import Map from './src/components/Map';
import Footer from './src/components/Footer';

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
                        <View style={{
                            flex: 1,
                            backgroundColor: colors.primary
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontFamily: 'sans-serif-condensed',
                                    flex: 1,
                                    fontSize: 55,
                                    marginRight: 6,
                                    textAlign: 'right'
                                }}>
                                    KPDX
                                </Text>
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        transform: [{
                                            rotate: '90deg'
                                        }]
                                    }}
                                    source={require('./src/assets/icons/narrowbody.png')}
                                />
                                <Text style={{
                                    color: 'white',
                                    fontFamily: 'sans-serif-condensed',
                                    flex: 1,
                                    fontSize: 55,
                                    marginLeft: 6
                                }}>
                                    KSFO
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', height: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        color: 'white',
                                        textAlign: 'right'
                                    }}>
                                        Ethan Shields KPDX
                                    </Text>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        color: 'white',
                                        textAlign: 'left',
                                        marginLeft: 30
                                    }}>
                                        1277596
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            flex: 1,
                            backgroundColor: colors.primaryMedium
                        }}>
                            <View style={{ flex: 1 }}>

                            </View>
                            <View style={{ flex: 1 }}>

                            </View>
                            <View style={{ flex: 1 }}>
                                
                            </View>
                        </View>
                    </View>
                </SlidingUpPanel>
                <Footer />
            </View>
        );
    }
}
