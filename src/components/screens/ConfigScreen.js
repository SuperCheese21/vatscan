import React, { useEffect } from 'react';
import {
  BackHandler,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import { childrenShape, navigationShape } from '../propTypeShapes';
import useClientData from '../../api/useClientData';

const ConfigScreen = ({ children, navigation }) => {
  const { isLoading } = useClientData();

  useEffect(() => {
    const handleBackPress = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <KeyboardAvoidingView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => {}} />
        }
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

ConfigScreen.propTypes = {
  children: childrenShape,
  navigation: navigationShape.isRequired,
};

ConfigScreen.defaultProps = {
  children: null,
};

export default withNavigation(ConfigScreen);
