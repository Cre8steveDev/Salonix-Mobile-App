import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import React, { useEffect, useMemo, useState } from 'react';
import Colors from '@/constants/Colors';
import blurhash from '@/constants/BlurHash';
import API from '@/constants/API';
import useToast from '../Toasts';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CustomCalendar from '../CustomCalendar';

type BookAppointmentCompProp = {
  setShowDetailModal?: React.Dispatch<React.SetStateAction<boolean>>;
  detailType: string;
  setShowBookingModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type ServiceDetail = {
  id: string;
  image: string;
  description: string;
  rating: number;
  price: number;
  name: string;
};

const serviceKeyValue: { [key: string]: string } = {
  proHairCutz: 'Pro Hair Cutz',
  lockedDreads: 'Locked Dreads',
  hairTreatment: 'Hair Treatment',
  braidsAndWeaves: 'Breads & Weaves',
};

const BookingAppointmentComp = ({
  detailType,
  setShowDetailModal,
  setShowBookingModal,
}: BookAppointmentCompProp) => {
  const currentDateString = new Date().toISOString().split('T')[0];
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDateString);
  const [chosenService, setChosenService] = useState(
    serviceKeyValue[detailType]
  );

  //   Get Service Detail From Back End
  // useEffect(() => {
  //   setLoading(true);
  //   const getServiceDetail = async () => {
  //     try {
  //       const response = await API.get(`api/resources/services/${detailType}`);
  //       const { data } = response.data;
  //     } catch (error) {
  //       console.log(error);
  //       useToast('Error fetching service detail.', 'red', 'white');
  //     }
  //     setLoading(false);
  //   };
  //   // Call function
  //   getServiceDetail();
  // }, [detailType]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={90} color={Colors.dark.primaryOrange} />
      </View>
    );
  }

  //   Return JSX for the component
  return (
    <SafeAreaView style={styles.firstContainer}>
      <View style={styles.container}>
        {/* Closing Button */}
        <TouchableOpacity
          style={styles.closeBtnContainer}
          onPress={() => setShowBookingModal(false)}
        >
          <Ionicons
            name="close"
            size={21}
            color={Colors.dark.white}
            style={styles.closeIcons}
          />
        </TouchableOpacity>

        {/* Heading for details */}
        <View style={styles.sectionContainer}>
          <Text style={styles.appointmentLabel}>Appointment:</Text>
          <Text style={styles.appointmentText}>{chosenService}</Text>
        </View>

        <Text style={{ color: 'white', textAlign: 'center' }}>
          Pick Appointment Date
        </Text>

        {/* Calendar for Date Picker */}
        <View style={styles.calendarContainer}>
          <CustomCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </View>

        {/* Available Time Slots Container */}
        <View style={styles.availableTimeContainer}>
          <Text style={styles.availableTimeLabel}>Available Time Slots:</Text>
        </View>

        {/* Confirm Appointment and Pay Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Confirm and Pay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookingAppointmentComp;

const styles = StyleSheet.create({
  firstContainer: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.dark.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    width: '100%',
    // backgroundColor: Colors.dark.primaryDark,
    position: 'relative',
    padding: 25,
  },
  sectionContainer: {},

  appointmentLabel: {
    textAlign: 'center',
    color: Colors.dark.white,
    fontSize: 16,
    letterSpacing: 4,
  },
  appointmentText: {
    textAlign: 'center',
    color: Colors.dark.white,
    fontSize: 34,
    fontFamily: 'PoppinsExtraBold',
  },

  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },

  calendarContainer: {
    paddingHorizontal: 10,
    backgroundColor: Colors.dark.primaryHighlight,
    overflow: 'hidden',
    marginVertical: 10,
    borderRadius: 10,
  },

  availableTimeContainer: {},
  availableTimeLabel: {
    color: 'white',
    textAlign: 'center',
  },

  button: {
    width: '100%',
    backgroundColor: Colors.dark.primaryOrange,
    marginTop: 30,
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
    height: 35,
    width: 35,
    borderRadius: 50,
    backgroundColor: Colors.dark.primaryOrange,
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    top: -5,
  },

  closeIcons: {},
});
