import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Redirect, useRouter } from 'expo-router';
import Onboarding from '@/components/Onboarding';

const Index = () => {
  // @ts-ignore
  const auth = useSelector((state) => state.auth as TAuthState);
  // @ts-ignore
  const app = useSelector((state) => state.app as TAppState);
  const mode = app.preferredTheme;

  // router instance
  const router = useRouter();

  if (auth.user) {
    return <Redirect href={'/(tabs)/Home'} />;
  }

  if (!auth.firstTimer) {
    router.dismissAll();
    return <Redirect href="/(auth)/SignIn" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        style="light"
        backgroundColor={Colors[mode].primaryHighlight}
      />
      <Onboarding />
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
