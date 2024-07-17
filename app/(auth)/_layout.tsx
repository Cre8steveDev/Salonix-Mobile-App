import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  console.log('Auth route hit');
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" />
      <Stack.Screen name="SignUp" />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
