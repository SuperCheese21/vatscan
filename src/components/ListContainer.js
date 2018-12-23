import React from 'react';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default class ListContainer extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Icon name={'format-list-bulleted'} size={20} color={tintColor} />;
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>List</Text>
            </View>
        );
    }
}
