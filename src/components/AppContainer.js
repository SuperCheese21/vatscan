import AppLoading from 'expo-app-loading';
import { Font } from 'expo-font';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import StackNavigator from './navigation/StackNavigator';
import { AppContext, useAppContext } from '../context';

const AppContainer = () => {
  const { fontsLoaded, updateFontsLoaded } = useAppContext();

  /* eslint-disable global-require */
  const loadFonts = () =>
    Font.loadAsync({
      Roboto_Regular: require('../../assets/fonts/Roboto/Roboto-Regular.ttf'),
      Roboto_Condensed_Regular: require('../../assets/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'),
      Roboto_Mono: require('../../assets/fonts/Roboto_Mono/RobotoMono-Regular.ttf'),
    });
  /* eslint-enable global-require */

  return (
    <>
      {fontsLoaded ? (
        <StackNavigator uriPrefix={Linking.makeUrl('/')} />
      ) : (
        <AppLoading
          startAsync={loadFonts}
          onFinish={() => updateFontsLoaded(true)}
          onError={console.warn}
        />
      )}
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" />
    </>
  );
};

AppContainer.contextType = AppContext;

export default AppContainer;
