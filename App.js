import React, { Component } from 'react';
import { View } from 'react-native';

import Header from './src/components/Header';
import Map from './src/components/Map';
import Footer from './src/components/Footer';

export default class App extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Header />
                <Map />
                <Footer />
            </View>
        );
    }
}
