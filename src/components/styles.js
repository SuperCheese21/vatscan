import { StyleSheet } from 'react-native';

import colors from '../config/colors.json';
import { defaultPanelPosition } from '../config/constants.json';

const styles = StyleSheet.create({
    activityIndicator: {
        position: 'absolute',
        right: 3,
        top: 3
    },
    callsignText: {
        textAlign: 'right',
        marginRight: 30,
        fontSize: 13
    },
    clientCountText: {
        fontFamily: 'Roboto_Regular',
        position: 'absolute',
        left: 5,
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
    headerText: {
        color: 'white',
        fontFamily: 'Roboto_Regular',
        fontWeight: 'normal',
        fontSize: 20
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
        bottom: defaultPanelPosition,
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
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    }
});

export default styles;
