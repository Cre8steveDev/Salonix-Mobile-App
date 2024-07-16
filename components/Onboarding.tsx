import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import Colors from '@/constants/Colors';
import ScreenOne from './onboarding/ScreenOne';
import ScreenTwo from './onboarding/ScreenTwo';
import ScreenThree from './onboarding/ScreenThree';

const Onboarding = () => {
  const [screen, setScreen] = useState(1);
  return (
    <View style={styles.container}>
      {screen === 1 && <ScreenOne setScreen={setScreen} />}
      {screen === 2 && <ScreenTwo setScreen={setScreen} />}
      {screen === 3 && <ScreenThree setScreen={setScreen} />}
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
