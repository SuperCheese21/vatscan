import React from 'react';
import { MapView } from 'expo';

import Map from '../components/Map';
import StatsContainer from './StatsContainer';
import StatsLabel from '../components/StatsLabel';
import StatsRow from '../components/StatsRow';
import TextBlock from '../components/TextBlock';

const ControllerStatsContainer = ({ client }) => (
    <StatsContainer>
        <StatsLabel text="Controller Info" />

        <StatsRow label="Type" text={client.typeString} />
        <StatsRow label="Frequency" text={client.frequency} />

        <TextBlock text={client.atisMessage} />

        <Map
            style={{ width: '100%', marginTop: 5, height: 350 }}
            initialRegion={{
                latitude: client.latitude,
                longitude: client.longitude,
                latitudeDelta: 5,
                longitudeDelta: 5
            }}
        >
            <MapView.Polygon
                coordinates={client.polygon}
                strokeWidth={1}
                strokeColor={client.strokeColor}
                fillColor={client.fillColor}
            />
        </Map>
    </StatsContainer>
);

export default ControllerStatsContainer;
