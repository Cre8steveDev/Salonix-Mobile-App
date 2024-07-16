import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import ScreenOne from './onboarding/ScreenOne';
import ScreenTwo from './onboarding/ScreenTwo';

const Onboarding = () => {
  const [screen, setScreen] = useState(1);
  return (
    <View style={styles.container}>
      {screen === 1 && <ScreenOne setScreen={setScreen} />}
      {screen === 2 && <ScreenTwo setScreen={setScreen} />}
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.primaryHighlight,
  },
});
