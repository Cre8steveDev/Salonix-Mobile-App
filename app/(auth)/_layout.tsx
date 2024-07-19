import React from 'react';
import { Redirect, Stack, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

const AuthLayout = () => {
  // @ts-ignore
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  // Might want to check, if the user's token expiry has
  // not passed and auth.user is not null before going to Home

  // Another approach for redirecting when user is already logged in
  if (auth.user) {
    return <Redirect href="/(tabs)/Home" />;
  }

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
