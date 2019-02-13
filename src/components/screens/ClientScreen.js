import React from 'react';
import { BackHandler, Text, View } from 'react-native';
import { Badge, Surface } from 'react-native-paper';

import HeaderContainer from '../containers/HeaderContainer';
import airportNames from '../../data/airportNames.json';
import colors from '../../config/colors.json';

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
                    centerTitle={true}
                />
                <View style={{
                    flex: 1,
                    padding: 5
                }}>
                    <Surface
                        style={{
                            borderRadius: 10,
                            padding: 10,
                            elevation: 10,
                            margin: 5
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: 8
                        }}>
                            <Text style={{
                                flex: 1,
                                fontFamily: 'Roboto_Condensed_Regular',
                                fontSize: 26
                            }}>
                                {client.name}
                            </Text>
                            <View>
                                <Text style={{ color: '#898989' }}>{client.id}</Text>
                                <Badge style={{
                                    backgroundColor: colors.accent,
                                    color: 'white'
                                }}>
                                    {client.rating}
                                </Badge>
                            </View>
                        </View>
                        <Text style={{ fontSize: 18 }}>
                            {client.type === 'PILOT' ? 'Pilot' : 'ATC'}
                        </Text>
                        <Text>
                            Location  <Text style={{ fontSize: 16, color: '#898989' }}>{client.latitude}, {client.longitude}</Text>
                        </Text>
                        <Text>
                            Server  <Text style={{ fontSize: 16, color: '#898989' }}>{client.server}</Text>
                        </Text>
                        <Text>
                            Time connected  <Text style={{ fontSize: 16, color: '#898989' }}>{client.elapsedTimeLogon}</Text>
                        </Text>
                    </Surface>
                </View>
            </>
        );
    }
}
