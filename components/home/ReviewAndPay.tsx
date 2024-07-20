import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import API from '@/constants/API';
import useToast from '../Toasts';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { logOut } from '@/providers/redux/authSlice';
import { useRouter } from 'expo-router';

type ReviewAndPayCompProp = {
  auth: AuthToken;
  user: LoggedInUser;
  bookingDetails: ComposeBookingDetailType;
  setShowBookingModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReviewAndPayModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshBalanceAFterSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Review and Payment Component
 * @description - This component is where the user can see
 * the details of the booking that has been made and then
 * make payment from wallet.
 */

const ReviewAndPayComp = ({
  auth,
  user,
  bookingDetails,
  setShowBookingModal,
  setShowReviewAndPayModal,
  setRefreshBalanceAFterSuccess,
}: ReviewAndPayCompProp) => {
  // const [loading, setLoading] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [balanceError, setBalanceError] = useState(false);
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  // Function for handling payment process and triggering
  // the necessary modal to show successful modal.

  const handleProcessPayment = async () => {
    setLoadingPayment(true);
    setBalanceError(false);

    try {
      // Get User's Current Balance as stored on DB.
      // Better than relying on the frontend value.
      const response = await API.get('api/auth/get-wallet', {
        headers: { Authorization: `Basic ${auth.id}` },
      });
      // If status returns 401 Unauthorized log user out.
      if (response.status === 401 || !response.data.wallet) {
        // useToast('Error occured validating current balance.', 'red', 'white');
        setBalanceError(true);
        dispatch(logOut());
        return router.push('/(auth)/SignIn');
      }

      const { wallet } = response.data;
      // Update state with current balance

      // Verify the current balance is greater than price
      if (wallet.currentBalance > bookingDetails.price) {
        // Send appointment details to the back end
        const bookResponse = await API.post(
          'api/appointments/book',
          bookingDetails,
          {
            headers: { Authorization: `Basic ${auth.id}` },
          }
        );
        // Refresh Balance after successful fixing
        setRefreshBalanceAFterSuccess((prev) => !prev);
        setLoadingPayment(false);
        setRefreshBalanceAFterSuccess(true);
        setPaymentSuccess(true);

        // Prompt user about insufficient funds
      } else {
        Alert.alert(
          'Insufficient Balance. 🙃',
          'Sorry, you cannot book the current service as your balance lesser than the cost. Kindly fund your wallet.'
        );
        // Redirect to the fund wallet page.
        return router.push('/(tabs)/FundWallet');
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        'An Unknown Error occured.',
        'Sorry, an error occured while completing your booking. Try again later.'
      );
      setLoadingPayment(false);
    }
  };

  //   Return JSX for the component
  return (
    <Pressable style={styles.overlay}>
      <StatusBar animated backgroundColor={Colors.dark.primaryHighlight} />
      <View style={styles.firstContainer}>
        {/* Activity Indicator for when processing payment */}
        {loadingPayment && (
          <View style={styles.processingPaymentContainer}>
            <ActivityIndicator size={60} color={Colors.dark.primaryOrange} />
            <Text style={styles.processingPaymentText}>Processing...</Text>
          </View>
        )}

        {/* When not loading payment processing, show the review */}
        {!loadingPayment && (
          <ScrollView contentContainerStyle={styles.container}>
            {/* Closing Button */}
            <TouchableOpacity
              style={styles.closeBtnContainer}
              onPress={() => setShowReviewAndPayModal(false)}
            >
              <Ionicons name="close" size={21} color={Colors.dark.white} />
            </TouchableOpacity>

            {/* Show Booking Details */}
            <Text style={styles.headingText}>Booking Summary</Text>
            <View style={styles.reviewContainer}>
              <DetailSection
                label="Chosen Service: "
                info={bookingDetails.chosenService}
              />
              <DetailSection
                label="Price: "
                info={'N' + bookingDetails.price.toLocaleString()}
              />
              <DetailSection label="Chosen Date: " info={bookingDetails.date} />
              <DetailSection
                label="Time Slot: "
                info={
                  bookingDetails.startTime + ' to ' + bookingDetails.endTime
                }
              />
              <DetailSection label="Email: " info={bookingDetails.email} />
              <DetailSection label="Name: " info={bookingDetails.fullName} />
            </View>

            {/* Confirm Appointment and Pay Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleProcessPayment}
            >
              <Text style={styles.buttonText}>Complete Booking</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </Pressable>
  );
};

export default ReviewAndPayComp;

// Booking Detail Section
const DetailSection = ({ label, info }: { label: string; info: string }) => {
  return (
    <View style={styles.detailContainer}>
      <View>
        <Text style={styles.detailLabel}>{label}</Text>
      </View>
      <View>
        <Text style={styles.detailInfo}>{info}</Text>
      </View>
    </View>
  );
};

// Define Stylesheet for the components
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    height: '100%',
    width: '100%',
  },

  firstContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.dark.primaryHighlight,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  container: {
    width: '100%',
    position: 'relative',
    paddingHorizontal: 25,
    paddingTop: 30,
  },

  processingPaymentContainer: {
    height: 400,
    justifyContent: 'center',
  },
  processingPaymentText: {
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    fontSize: 24,
    color: Colors.dark.placeholder,
    marginTop: 10,
  },

  headingText: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'PoppinsExtraBold',
    marginBottom: 10,
    color: Colors.dark.white,
  },

  reviewContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.white,
    width: '100%',
    marginHorizontal: 'auto',
    borderRadius: 10,
  },

  detailContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    padding: 5,
    paddingHorizontal: 10,
    marginBottom: 7,
    borderRadius: 6,
  },

  detailLabel: {},
  detailInfo: {
    fontFamily: 'PoppinsBold',
    fontSize: 12,
  },

  button: {
    width: '100%',
    backgroundColor: Colors.dark.primaryOrange,
    marginTop: 30,
    marginBottom: 50,
    padding: 10,
    margin: 'auto',
    borderRadius: 6,
  },

  buttonText: {
    fontSize: 20,
    fontFamily: 'PoppinsExtraBold',
    textAlign: 'center',
    color: Colors.dark.white,
  },

  loadingContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    backgroundColor: Colors.dark.primaryHighlight,
  },

  closeBtnContainer: {
    position: 'absolute',
    zIndex: 3,
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: Colors.dark.primaryOrange,
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    top: 25,
  },
});
