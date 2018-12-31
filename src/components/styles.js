import { StyleSheet } from 'react-native';

import colors from '../config/colors.json';

const styles = StyleSheet.create({
    callsignText: {
        textAlign: 'right',
        marginRight: 30,
        fontSize: 13
    },
    clientInfoView: {
        flexDirection: 'row',
        height: 20
    },
    fromToIcon: {
        width: 45,
        height: 45,
        transform: [{
            rotate: '90deg'
        }]
    },
    header: {
        backgroundColor: colors.primary,
        height: 56,
        paddingLeft: 13,
        paddingRight: 5,
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 20,
        flex: 1,
        textAlignVertical: 'center'
    },
    icaoText: {
        flex: 1,
        fontFamily: 'Roboto_Condensed_Regular',
        fontSize: 50
    },
    infoContainerBasic: {
        flex: 8,
        backgroundColor: colors.primary
    },
    infoContainerDetail: {
        flex: 5,
        backgroundColor: colors.primaryMedium
    },
    infoLabelText: {
        fontFamily: 'Roboto_Condensed_Regular',
        fontStyle: 'italic',
        fontSize: 12
    },
    infoRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoText: {
        fontSize: 14
    },
    nameText: {
        textAlign: 'left',
        fontSize: 13
    },
    text: {
        fontFamily: 'Roboto_Regular',
        color: 'white'
    }
});

export default styles;
