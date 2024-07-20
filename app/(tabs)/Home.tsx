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
import ServiceDetail from '@/components/home/ServiceDetail';
import BookingAppointmentComp from '@/components/home/BookAppointment';
import { Modal } from 'react-native';
import ReviewAndPayComp from '@/components/home/ReviewAndPay';

const Home = () => {
  // @ts-ignore
  const authState = useSelector((state) => state.auth as TAuthState);
  const { user, auth } = authState;

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showReviewAndPayModal, setShowReviewAndPayModal] = useState(false);

  const [detailType, setDetailType] = useState('');
  const [servicePrice, setServicePrice] = useState(0);
  const [bookingType, setBookingType] = useState('');
  const [bookingDetails, setBookingDetails] =
    useState<ComposeBookingDetailType | null>(null);

  if (!user) return <Redirect href="/(auth)/Login" />;

  console.log('Preview Booking Details before payment:\n', bookingDetails);

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
        {/*  */}

        {/* Show Detail Modal Here */}
        {showDetailModal && (
          <Modal
            animationType="slide"
            visible={showDetailModal}
            presentationStyle="overFullScreen"
            onRequestClose={() => setShowDetailModal(false)}
          >
            <ServiceDetail
              detailType={detailType}
              setServicePrice={setServicePrice}
              setShowBookingModal={setShowBookingModal}
              setShowDetailModal={setShowDetailModal}
            />
          </Modal>
        )}

        {/* Show Modal for Booking Screen */}
        {showBookingModal && (
          <Modal
            animationType="fade"
            visible={showBookingModal}
            presentationStyle="overFullScreen"
            onRequestClose={() => setShowBookingModal(false)}
          >
            <BookingAppointmentComp
              user={user}
              detailType={detailType}
              servicePrice={servicePrice}
              setShowBookingModal={setShowBookingModal}
              setBookingDetails={setBookingDetails}
              setShowReviewAndPayModal={setShowReviewAndPayModal}
            />
          </Modal>
        )}

        {/* Review and Payment Modal */}
        {showReviewAndPayModal && (
          <Modal
            animationType="fade"
            visible={showReviewAndPayModal}
            presentationStyle="overFullScreen"
            onRequestClose={() => setShowBookingModal(false)}
            transparent
          >
            <ReviewAndPayComp
              user={user}
              bookingDetails={bookingDetails!}
              setShowBookingModal={setShowBookingModal}
              setShowReviewAndPayModal={setShowReviewAndPayModal}
            />
          </Modal>
        )}
        {/* End of Definitions */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollView: {
    position: 'relative',
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark.primaryDark,
  },
});
