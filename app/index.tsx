import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const Index = () => {
  // @ts-ignore
  const app = useSelector((state) => state.app as TAppState);
  // @ts-ignore
  const auth = useSelector((state) => state.auth as TAuthState);

  console.log('========================');
  console.log(app);
  console.log(auth);
  console.log('========================');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={Colors.light.primaryDark} />
      <Text>Hello World!!!!!</Text>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
});
