import { StyleSheet } from 'react-native';

import colors from './colors.json';

const styles = StyleSheet.create({
    callsignText: {
        flex: 1,
        color: 'white',
        fontSize: 28,
        marginLeft: 10
    },
    cidText: {
        color: 'white',
        textAlign: 'left',
        marginLeft: 30
    },
    footerContainer: {
        backgroundColor: colors.primaryDark,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50
    },
    fromToIcon: {
        width: 50,
        height: 50,
        transform: [{
            rotate: '90deg'
        }]
    },
    icaoText: {
        color: 'white',
        fontFamily: 'Roboto_Condensed_Regular',
        flex: 1,
        fontSize: 55
    },
    infoContainerBasic: {
        flex: 1,
        backgroundColor: colors.primaryMedium
    },
    infoContainerDetail: {
        flex: 1,
        backgroundColor: colors.primary
    },
    infoLabel: {
        color: 'white',
        fontFamily: 'Roboto_Condensed_Regular',
        fontStyle: 'italic'
    },
    infoRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoText: {
        color: 'white',
        fontSize: 16
    },
    nameText: {
        color: 'white',
        textAlign: 'right'
    },
    sliderContainer: {
        flex: 1.5,
        marginRight: 10
    }
});

export default styles;
