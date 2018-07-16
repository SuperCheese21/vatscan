import React, { Component } from 'react';
import { View } from 'react-native';

import Header from './src/components/Header';
import Map from './src/components/Map';
import Footer from './src/components/Footer';

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
                <Footer />
            </View>
        );
    }
}
