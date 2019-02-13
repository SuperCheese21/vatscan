import React from 'react';
import { BackHandler, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';

import HeaderContainer from '../containers/HeaderContainer';
import airportNames from '../../data/airportNames.json';

export default class ClientScreen extends React.PureComponent {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        if (this.props.navigation.getParam('removeFocusedClient')) {
            this.props.screenProps.removeFocusedClient();
        }
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    render() {
        const { focusedClient: client } = this.props.screenProps;
        return (
            <>
                <HeaderContainer
                    loading={this.props.screenProps.loading}
                    refresh={this.props.screenProps.refresh}
                    text={client.callsign}
                />
                <View style={{
                    flex: 1,
                    padding: 5
                }}>
                    <Surface
                        style={{
                            borderRadius: 10,
                            padding: 10,
                            height: 200,
                            elevation: 10,
                            margin: 5
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                flex: 1,
                                fontSize: 24
                            }}>
                                {client.name}
                            </Text>
                            <Text style={{
                                justifyContent: 'center'
                            }}>
                                {client.id}
                            </Text>
                        </View>
                    </Surface>
                    <Surface
                        style={{
                            borderRadius: 10,
                            padding: 10,
                            height: 200,
                            elevation: 10,
                            margin: 5
                        }}
                    >
                    </Surface>
                </View>
            </>
        );
    }
}
