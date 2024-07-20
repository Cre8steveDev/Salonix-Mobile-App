import {
  Alert,
  FlatList,
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
import CustomCalendar from '../CustomCalendar';
import SlotCardComp from '../booking/SlotCard';

type BookAppointmentCompProp = {
  user: LoggedInUser;
  detailType: string;
  setShowBookingModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReviewAndPayModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBookingDetails: React.Dispatch<
    React.SetStateAction<ComposeBookingDetailType | null>
  >;
  servicePrice: number;
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
  user,
  detailType,
  setShowBookingModal,
  setBookingDetails,
  servicePrice,
  setShowReviewAndPayModal,
}: BookAppointmentCompProp) => {
  const currentDateString = new Date().toISOString().split('T')[0];
  // const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDateString);
  const [chosenService, setChosenService] = useState(
    serviceKeyValue[detailType]
  );
  const [allDaySlots, setAllDaySlots] = useState<slotDataProp[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<slotDataProp | null>(
    null
  );

  //   Get All Slots from the backend
  useEffect(() => {
    setLoadingSlots(true);
    const getAllAppointmentSlots = async () => {
      try {
        const response = await API.get(`api/appointments/day/${selectedDate}`);

        const { data } = response;
        if (!data.slots) throw new Error('Error fetching available slots.');

        setAllDaySlots(data.slots.dayAppointments);

        // Catch any error that may occur
      } catch (error) {
        console.log(error);
        useToast('Error fetching service detail.', 'red', 'white');
        setAllDaySlots([]);
      }

      setLoadingSlots(false);
    };

    // Call function
    getAllAppointmentSlots();
  }, [selectedDate]);

  // Handle Confirmation and Payment
  const collateBookingDetails = () => {
    const bookingDetails: ComposeBookingDetailType = {
      email: user.email,
      gender: user.gender,
      fullName: user.fullName,
      chosenService: serviceKeyValue[detailType],
      price: servicePrice,
      date: selectedDate,
      startTime: selectedTimeSlot?.startTime!,
      endTime: selectedTimeSlot?.endTime!,
    };

    // set the Booking Details state
    setBookingDetails(bookingDetails);
    setShowReviewAndPayModal(true);
  };

  //   Return JSX for the component
  return (
    <SafeAreaView style={styles.firstContainer}>
      <ScrollView style={styles.container}>
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
            parentLoadingState={loadingSlots}
          />
        </View>

        {/* Available Time Slots Container */}
        <View style={styles.availableTimeContainer}>
          <Text style={styles.availableTimeLabel}>Daily Time Slots:</Text>
          {(loadingSlots || allDaySlots === null) && (
            <View style={{ marginTop: 10 }}>
              <ActivityIndicator size={50} color={Colors.dark.primaryOrange} />
              <Text
                style={{ textAlign: 'center', fontSize: 12, color: 'white' }}
              >
                Loading selected day's slots...
              </Text>
            </View>
          )}

          {/* Only Show the available slots if the array is not empty */}
          {allDaySlots.length > 1 && !loadingSlots && (
            <View>
              <FlatList
                data={allDaySlots}
                renderItem={({ item }) => (
                  <SlotCardComp
                    slot={item}
                    selectedTimeSlot={selectedTimeSlot!}
                    setSelectedTimeSlot={setSelectedTimeSlot}
                  />
                )}
                keyExtractor={(item) => item.id + ''}
                showsHorizontalScrollIndicator={false}
                initialNumToRender={10}
                inverted={false}
                contentContainerStyle={styles.slotsContainer}
                horizontal={true}
                initialScrollIndex={0}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 9,
                  color: 'white',
                  marginTop: 6,
                }}
              >
                *Unavailable Slots are in gray while chosen slot is in orange.
              </Text>
            </View>
          )}
        </View>

        {/* Confirm Appointment and Pay Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => collateBookingDetails()}
        >
          <Text style={styles.buttonText}>Review Booking</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },

  container: {
    width: '100%',
    position: 'relative',
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  sectionContainer: {},

  appointmentLabel: {
    textAlign: 'center',
    color: Colors.dark.white,
    fontSize: 16,
    letterSpacing: 4,
    marginTop: 20,
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
    right: 0,
    top: 0,
  },
  slotsContainer: {
    gap: 10,
  },
  closeIcons: {},
});
