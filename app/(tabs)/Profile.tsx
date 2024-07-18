import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/providers/redux/authSlice';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { Redirect, useRouter } from 'expo-router';

const Profile = () => {
  // Handle Signout Dispatch
  //@ts-ignore
  const authState = useSelector((state) => state.auth as TAuthState);
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = authState;
  const handleLogOut = () => {
    dispatch(logOut());
  };

  if (!user) {
    router.replace('/(auth)/SignIn');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" backgroundColor={Colors.dark.primaryHighlight} />
      <Text>Profile</Text>
      {/*  Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogOut}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.dark.primaryHighlight,
    flex: 1,
    alignItems: 'center',
  },
  logoutBtn: {
    backgroundColor: Colors.dark.primaryOrange,
    padding: 4,
    width: 80,
    borderRadius: 5,
  },
  logoutText: {
    textAlign: 'center',
    color: Colors.dark.white,
    fontSize: 16,
  },
});
