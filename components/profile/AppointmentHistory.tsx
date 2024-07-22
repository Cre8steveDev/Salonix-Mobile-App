import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyList } from '../home/PopularStyles';
import API from '@/constants/API';
import { StatusBar } from 'expo-status-bar';

type AppointmentHistoryProp = {
  user: LoggedInUser;
  auth: AuthToken;
  setShowAppointmentHistoryModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const AppointmentHistoryComp = ({
  user,
  auth,
  setShowAppointmentHistoryModal,
}: AppointmentHistoryProp) => {
  const [loading, setLoading] = useState(false);
  const [allAppointments, setAllAppointments] = useState<
    BookedAppointmentCardData[] | null
  >(null);

  // Retrieve all Appointments of the user
  // from protected route
  useEffect(() => {
    setLoading(true);
    const fetchAllAppointments = async () => {
      try {
        const response = await API.get('api/appointments/all-appointments', {
          headers: { Authorization: `Basic ${auth.id}` },
        });
        const appointmentsData = response?.data
          ?.appointments as BookedAppointmentCardData[];

        console.log(response.data);
        //   Update state with the data
        const sorted = appointmentsData?.sort((a, b) =>
          a.date > b.date ? 1 : -1
        );
        setAllAppointments(sorted);
        setLoading(false);
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Error Retrieving Booked Appointments.',
          "We're unable to load your appointments at the time, please try again later."
        );
      }
    };

    // Call the function
    fetchAllAppointments();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingIndicator}>
        <ActivityIndicator size={60} color={Colors.dark.primaryOrange} />
        <Text style={styles.loadingIndicatorText}>Loading Appointments...</Text>
      </View>
    );
  }

  // Return JSX of All appointments
  return (
    <SafeAreaView>
      <StatusBar style="dark" backgroundColor={Colors.dark.primaryHighlight} />
      <View style={styles.mainContainer}>
        {/* Header for the view */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Appointment History</Text>
        </View>
        {/* Flatlist container for appointment cards */}
        <View style={{ height: '80%', marginVertical: 10, padding: 6 }}>
          <FlatList
            data={allAppointments}
            renderItem={({ item, index }) => (
              <AppointmentCard
                key={item._id}
                chosenService={item.chosenService}
                price={item.price}
                date={item.date}
                startTime={item.startTime}
                endTime={item.endTime}
                _id={item._id}
              />
            )}
            keyExtractor={(item) => item._id}
            initialNumToRender={5}
            inverted={false}
            numColumns={1}
            ListEmptyComponent={<EmptyList />}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            initialScrollIndex={0}
          />
        </View>

        {/* Close Button */}
        <TouchableOpacity onPress={() => setShowAppointmentHistoryModal(false)}>
          <Text style={styles.closeText}>Close Modal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AppointmentHistoryComp;

// Individual Appointment Card Render
const AppointmentCard = ({
  chosenService,
  price,
  date,
  startTime,
  endTime,
  _id,
}: BookedAppointmentCardData) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardDataContainer}>
        <Text style={styles.cardService}>{chosenService}</Text>
        <Text style={styles.cardData}>{`${startTime} to ${endTime}`}</Text>
        <Text style={styles.cardData}>{date}</Text>
        <Text style={styles.refNumber}>{`Ref: ${_id}`}</Text>
      </View>

      {/* Price of Service  */}
      <View style={styles.cardPriceContainer}>
        <Text style={styles.cardPriceText}>{`N${price}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  mainContainer: {
    padding: 20,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  contentContainer: {
    gap: 10,
  },
  headingContainer: {
    backgroundColor: Colors.dark.primaryOrange,
    padding: 20,
    borderRadius: 10,
  },
  headingText: {
    textAlign: 'center',
    fontFamily: 'PoppinsExtraBold',
    fontSize: 28,
    color: 'white',
  },

  loadingIndicatorText: {
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    fontSize: 24,
    color: Colors.dark.placeholder,
    marginTop: 10,
  },
  closeText: {
    color: 'white',
    textAlign: 'center',
  },

  cardContainer: {
    backgroundColor: Colors.dark.primaryHighlight,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDataContainer: {},
  cardService: {
    fontSize: 24,
    fontFamily: 'PoppinsExtraBold',
    color: 'white',
    marginBottom: -6,
  },
  cardData: {
    fontSize: 15,
    color: 'white',
  },

  cardPriceContainer: {
    backgroundColor: Colors.dark.primaryOrange,
    padding: 10,
    borderRadius: 5,
  },
  cardPriceText: {
    fontSize: 16,
    color: 'white',
  },
  refNumber: {
    fontSize: 10,
    color: 'white',
  },
});
