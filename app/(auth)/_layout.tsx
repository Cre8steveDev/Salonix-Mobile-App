import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useSelector } from 'react-redux';

const AuthLayout = () => {
  console.log('Auth route hit');

  // @ts-ignore
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  if (auth.user) return <Redirect href="/(tabs)/Home" />;

  // Only allow user access auth screen
  // if not authenticated
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" />
      <Stack.Screen name="SignUp" />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
