import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import API from '@/constants/API';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';

// Import modules for sharing pdf file/receipt
import ViewShot from 'react-native-view-shot';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

// Define Types for the Component
type PaymentSuccessModalCompProp = {
  bookingDetails: ComposeBookingDetailType;
  setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBookingModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReviewAndPayModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPaymentSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Review and Payment Component
 * @description - This component is where the user can see
 * the details of the booking that has been made and then
 * make payment from wallet.
 */

const PaymentSuccessModalComp = ({
  bookingDetails,
  setShowDetailModal,
  setShowBookingModal,
  setShowReviewAndPayModal,
  setPaymentSuccessModal,
}: PaymentSuccessModalCompProp) => {
  // Loading state and Viewshot Ref
  const [loading, setLoading] = useState(false);
  const [savingReceipt, setSavingReceipt] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  // Implement saving the Successful Booking Receipt
  // Download QR Code of the booked appointment.
  const downloadQRPage = async () => {
    if (!viewShotRef.current || !viewShotRef.current.capture) {
      Alert.alert(
        'Unable to Initialize file',
        'Please take a screenshot with your phone.'
      );
      return;
    }
    setSavingReceipt(true);
    // If view Ref is valid then attempt to save.
    try {
      const uri = await viewShotRef.current.capture();
      const base64Image = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Booking Details</title>
          <style>
             body {
                margin: 0;
                padding: 0;
                width: 100%;
                object-fit: contain;
              }
              img {
              margin: auto auto;
              width: 100%;
              }
          </style>
        </head>
        <body>
          <img src="data:image/png;base64,${base64Image}" />
        </body>
      </html>
    `;

      // Convert the captured shot into a file
      const { uri: pdfUri } = await Print.printToFileAsync({
        html: htmlContent,
        width: 350,
        height: 680,
      });

      // Share the file
      await Sharing.shareAsync(pdfUri, {
        UTI: '.pdf',
        mimeType: 'application/pdf',
      });
    } catch (error) {
      Alert.alert(
        'Error Generating PDF.',
        'You can please take a screenshot with your phone.'
      );
    }
    setSavingReceipt(false);
  };

  // Close all modals onClose Buton Click
  const closeAllModals = () => {
    setPaymentSuccessModal(false);
    setShowReviewAndPayModal(false);
    setShowBookingModal(false);
    setShowDetailModal(false);
  };

  // Return a Loading indicator screen for loading state
  if (loading) {
    return (
      <View style={styles.loadingIndicator}>
        <ActivityIndicator size={60} color={Colors.dark.primaryOrange} />
        <Text style={styles.loadingIndicatorText}>Loading Receipt...</Text>
      </View>
    );
  }

  //   Return JSX for the component
  return (
    <Pressable style={styles.overlay}>
      <StatusBar animated backgroundColor={Colors.dark.primaryHighlight} />
      <View style={styles.firstContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Closing Button */}
          <TouchableOpacity
            style={styles.closeBtnContainer}
            onPress={closeAllModals}
          >
            <Ionicons name="close" size={21} color={Colors.dark.white} />
          </TouchableOpacity>

          {/* Show Booking Details with QR Code*/}
          <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
            <View style={styles.reviewContainer}>
              {/* Tick Icon */}
              <View style={styles.checkMarkContainer}>
                <Ionicons
                  name="checkmark"
                  color={'white'}
                  size={60}
                  style={styles.checkMarkText}
                />
              </View>

              {/* Booking Label */}
              <Text style={styles.headingLabel}>Successful Booking for</Text>
              <Text style={styles.headingText}>
                {bookingDetails.chosenService}
              </Text>

              {/* Detail of Booking  */}
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

              {/* Show QR Code here  */}
              <Image
                source={{
                  uri: `https://api.qrserver.com/v1/create-qr-code/?data=${
                    bookingDetails.chosenService +
                    '-' +
                    bookingDetails.date +
                    '-' +
                    bookingDetails.startTime +
                    '-' +
                    bookingDetails.email
                  }&amp;size=200x200`,
                }}
                style={{
                  width: 150,
                  height: 150,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.dark.white,
                  borderRadius: 10,
                  marginTop: 5,
                }}
                placeholder={require('@/assets/images/home/loading_image.gif')}
                placeholderContentFit="cover"
                contentFit="cover"
                transition={800}
                contentPosition={{ top: 0, left: 0 }}
                alt={'Booking Details QR Code.'}
                cachePolicy="memory"
                recyclingKey={bookingDetails.email}
                accessible={true}
              />

              {/* Title */}
              <Text style={styles.salonixText}>Salonix by @Cre8steveDev</Text>
            </View>
          </ViewShot>

          {/* Confirm Appointment and Pay Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={downloadQRPage}
            disabled={savingReceipt}
          >
            <Text style={styles.buttonText}>
              {savingReceipt ? 'Saving...' : 'Download Receipt'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Pressable>
  );
};

export default PaymentSuccessModalComp;

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
    height: '100%',
    backgroundColor: Colors.dark.primaryHighlight,
  },

  container: {
    width: '100%',
    position: 'relative',
    paddingHorizontal: 25,
    paddingTop: 30,
  },

  loadingIndicator: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },

  loadingIndicatorText: {
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    fontSize: 24,
    color: Colors.dark.placeholder,
    marginTop: 10,
  },

  checkMarkContainer: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: Colors.dark.primaryOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkMarkText: {},

  headingLabel: {
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    fontSize: 14,
    marginTop: 10,
  },

  headingText: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'PoppinsExtraBold',
    marginBottom: 10,
    color: Colors.dark.primaryHighlight,
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

  salonixText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
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
    fontSize: 16,
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
