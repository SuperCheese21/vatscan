import AppLoading from 'expo-app-loading';
import { Font } from 'expo-font';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import StackNavigator from './navigation/StackNavigator';
import { fetchData, transformData } from '../api/fetchUtils';
import { DATA_SOURCES } from '../config/constants';
import { AppContext } from '../context';

class AppContainer extends Component {
  // Initialize component state and fetch manager
  state = {
    dataSources: Object.fromEntries(
      Object.keys(DATA_SOURCES).map(sourceName => [
        sourceName,
        {
          timerId: null,
          clients: [],
          loading: false,
        },
      ]),
    ),
  };

  componentDidMount() {
    this.fetchAllData();
  }

  componentWillUnmount() {
    this.clearAllFetchTimers();
  }

  loadFonts = async () => {
    /* eslint-disable global-require */
    await Font.loadAsync({
      Roboto_Regular: require('../../assets/fonts/Roboto/Roboto-Regular.ttf'),
      Roboto_Condensed_Regular: require('../../assets/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'),
      Roboto_Mono: require('../../assets/fonts/Roboto_Mono/RobotoMono-Regular.ttf'),
    });
    /* eslint-enable global-require */
  };

  clearAllFetchTimers = () => {
    const { dataSources } = this.state;
    Object.values(dataSources).forEach(({ timerId }) => {
      if (timerId) clearTimeout(timerId);
    });
  };

  updateDataSource = ({ sourceName, update }) =>
    this.setState(({ dataSources }) => ({
      dataSources: {
        ...dataSources,
        [sourceName]: {
          ...dataSources[sourceName],
          ...update,
        },
      },
    }));

  fetchData = async ({ sourceName, updateInterval }) => {
    this.updateDataSource({
      sourceName,
      update: {
        timerId: setTimeout(
          () => this.fetchData({ sourceName, updateInterval }),
          updateInterval,
        ),
        loading: true,
      },
    });
    const { sources } = DATA_SOURCES[sourceName];
    const promises = sources.map(({ url }) => fetchData(url));
    const results = await Promise.all(promises);
    const data = Object.fromEntries(
      results.map((res, index) => [sources[index].name, res]),
    );
    this.updateDataSource({
      sourceName,
      update: {
        clients: transformData({ sourceName, data }),
        loading: false,
      },
    });
  };

  fetchAllData = () => {
    this.clearAllFetchTimers();
    Promise.all(
      Object.entries(DATA_SOURCES).map(([sourceName, { updateInterval }]) =>
        this.fetchData({ sourceName, updateInterval }),
      ),
    );
  };

  render() {
    const { fontsLoaded, updateFontsLoaded } = this.context;
    const { dataSources } = this.state;

    const allClients = Object.values(dataSources)
      .map(({ clients }) => clients)
      .flat();
    const filteredClients = allClients;

    const isLoading = Object.values(dataSources).some(({ loading }) => loading);

    return (
      <>
        {fontsLoaded ? (
          <StackNavigator
            uriPrefix={Linking.makeUrl('/')}
            screenProps={{
              isLoading,
              filteredClients,
              updateData: this.fetchAllData,
            }}
          />
        ) : (
          <AppLoading
            startAsync={this.loadFonts}
            onFinish={() => updateFontsLoaded(true)}
            onError={console.warn}
          />
        )}
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="light" />
      </>
    );
  }
}

AppContainer.contextType = AppContext;

export default AppContainer;
