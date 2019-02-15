import { StyleSheet } from 'react-native';

import colors from '../config/colors.json';

const styles = StyleSheet.create({
    callsignText: {
        textAlign: 'right',
        marginRight: 30,
        fontSize: 13
    },
    clientCountText: {
        position: 'absolute',
        fontFamily: 'Roboto_Regular',
        right: 5,
        top: 2
    },
    controllerCallsignText: {
        textAlign: 'center',
        marginLeft: 10,
        color: 'white',
        fontFamily: 'Roboto_Condensed_Regular',
        fontSize: 45
    },
    controllerInfoView: {
        flexDirection: 'row',
        height: 25
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
        flex: 8
    },
    infoContainerController: {
        width: '100%',
        height: 85,
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
    infoPanelContainer: {
        width: '100%',
        height: 154,
        position: 'absolute',
        backgroundColor: colors.primary
    },
    infoRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoText: {
        fontSize: 14
    },
    listContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    listItem: {
        elevation: 5,
        margin: 5,
        borderRadius: 5
    },
    nameText: {
        textAlign: 'left',
        fontSize: 13
    },
    pilotInfoView: {
        flexDirection: 'row',
        height: 20
    },
    statsContainer: {
        borderRadius: 10,
        padding: 10,
        elevation: 10,
        margin: 5
    },
    text: {
        fontFamily: 'Roboto_Regular',
        color: 'white'
    },
    textBlock: {
        backgroundColor: '#f2f2f2',
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    }
});

export default styles;
