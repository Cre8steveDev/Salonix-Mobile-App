import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import { useSelector } from 'react-redux';
import { Redirect } from 'expo-router';
import MiniDashboard from '@/components/home/MiniDashboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServicesGrid from '@/components/home/ServicesGrid';
import PopularHairstyles from '@/components/home/PopularStyles';

const Home = () => {
  // @ts-ignore
  const authState = useSelector((state) => state.auth as TAuthState);
  const { user, auth } = authState;

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const [detailType, setDetailType] = useState('');
  const [bookingType, setBookingType] = useState('');

  if (!user) return <Redirect href="/(auth)/Login" />;

  // If all is well, then render the home page
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        animated
        style="light"
        backgroundColor={Colors.dark.primaryOrange}
      />
      {/* Scroll View holding Home Page content */}
      <ScrollView
        contentContainerStyle={[styles.scrollView]}
        showsVerticalScrollIndicator={false}
      >
        {/* Mini Dashboard  */}
        <MiniDashboard user={user} auth={auth!} />
        {/* Our Services Grid */}
        <ServicesGrid
          setShowDetailModal={setShowDetailModal}
          setDetailType={setDetailType}
        />
        {/* Popular Hairstyles */}
        <PopularHairstyles />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollView: {},
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark.primaryDark,
  },
});
