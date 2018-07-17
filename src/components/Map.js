import React from 'react';
import { MapView } from 'expo';
import { Circle, Marker, Polygon } from 'react-native-maps';

import constants from '../config/constants.json';
import colors from '../config/colors.json';
import mapStyle from '../config/map-styles/style_blue_essence.json';
import { fetchData, parsePilotData, parseATCData } from '../lib/fetch';
import { getIcon } from '../lib/util';


export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pilotData: [],
            atcData: {
                tower: [],
                approach: [],
                center: []
            }
        };
    }

    componentDidMount() {
        this.updateData();
        this.state = {
            updateInterval: setInterval(() => {
                this.updateData();
            }, constants.UPDATE_INTERVAL)
        }
    }

    updateData() {
        this.props.showLoader();
        fetchData()
            .then(data => {
                this.setState({
                    pilotData: parsePilotData(data[0]),
                    atcData: parseATCData(data[0], data[1])
                });
                this.props.hideLoader();
            })
            .catch(e => {
                console.error(e);
            });
    }

    render() {
        return (
            <MapView style = {{ flex: 1 }}
                initialRegion = {{
                    latitude: 38,
                    longitude: -97,
                    latitudeDelta: 60,
                    longitudeDelta: 30
                }}
                customMapStyle = {mapStyle}>

                {this.state.atcData.center.map(controller => (
                    <Polygon
                        key={controller.id}
                        coordinates={controller.polygon}
                        fillColor={colors.polygonFill}
                        strokeColor={colors.polygonStroke}
                        strokeWidth={2}
                        tappable={true}
                    />
                ))}

                {this.state.atcData.approach.map(c => (
                    <Circle
                        key={c.cid}
                        center={c.location}
                        radius={50000}
                        strokeWidth={1}
                        strokeColor={'rgba(255, 0, 0, 0.8)'}
                        fillColor={'rgba(255, 0, 0, 0.5)'}
                    />
                ))}

                {this.state.atcData.tower.map(c => (
                    <Circle
                        key={c.cid}
                        center={c.location}
                        radius={20000}
                        strokeWidth={1}
                        strokeColor={'rgba(255, 165, 0, 0.8)'}
                        fillColor={'rgba(255, 165, 0, 0.5)'}
                    />
                ))}

                {this.state.pilotData.map(p => (
                    <Marker
                        key={p.cid}
                        image={getIcon(p.flightplan.aircraft)}
                        rotation={p.heading}
                        anchor={{ x: 0.5, y: 0.5 }}
                        coordinate={p.location}
                        title={p.callsign}
                        description={p.realname}
                    />
                ))}
            </MapView>
        );
    }
}
