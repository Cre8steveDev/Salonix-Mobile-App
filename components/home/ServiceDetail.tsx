import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import blurhash from '@/constants/BlurHash';
import API from '@/constants/API';
import useToast from '../Toasts';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type ServiceDetailCompProp = {
  setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
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

const ServiceDetailComp = ({
  detailType,
  setShowDetailModal,
  setShowBookingModal,
}: ServiceDetailCompProp) => {
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState({ userId: '', rating: 0 });
  const [serviceDetail, setServiceDetail] = useState<ServiceDetail | null>(
    null
  );

  //   Get Service Detail From Back End
  useEffect(() => {
    setLoading(true);
    const getServiceDetail = async () => {
      try {
        const response = await API.get(`api/resources/services/${detailType}`);
        const { data } = response.data;
        setServiceDetail(data);
      } catch (error) {
        console.log(error);
        useToast('Error fetching service detail.', 'red', 'white');
      }
      setLoading(false);
    };
    // Call function
    getServiceDetail();
  }, [detailType]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={90} color={Colors.dark.primaryOrange} />
      </View>
    );
  }
  //   Handle Rating
  const handleRating = () => {
    Alert.alert(
      'Rate Our Service! 😇',
      'We pride ourselves in providing professional services to our honourable clientele. Enter Numbers only (1 - 5).'
      //   (text) => setUserRating((prev) => ({ ...prev, rating: +text }))
    );
  };

  //   Return JSX for the component
  return (
    <SafeAreaView style={styles.firstContainer}>
      <ScrollView style={styles.container}>
        {/* Closing Button */}
        <TouchableOpacity
          style={styles.closeBtnContainer}
          onPress={() => setShowDetailModal(false)}
        >
          <Ionicons
            name="arrow-back"
            size={21}
            color={Colors.dark.white}
            style={styles.closeIcons}
          />
        </TouchableOpacity>

        {/* Image for the service */}
        <Image
          source={{ uri: serviceDetail?.image! }}
          style={{
            width: Dimensions.get('screen').width,
            height: 330,
            backgroundColor: Colors.dark.primaryOrange,
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
            overflow: 'hidden',
          }}
          placeholder={blurhash}
          contentFit="cover"
          transition={800}
          contentPosition={{ top: -20, left: 0 }}
          alt={serviceDetail?.id}
          cachePolicy="memory"
          recyclingKey={serviceDetail?.id}
          accessible={true}
        />

        {/* Heading for details */}
        <View style={styles.sectionContainer}>
          <View style={styles.headingContainer}>
            <View style={styles.headingSubContainer}>
              <Text style={styles.serviceName}>{serviceDetail?.name}</Text>
              <Text style={styles.ratingText}>
                {'⭐'.repeat(serviceDetail?.rating!).padEnd(5, '☆')}
                <Text onPress={handleRating}>{`  Leave a Rating.`}</Text>
              </Text>
            </View>
            {/* Make Price */}
            <Text style={styles.priceText}>{`N${serviceDetail?.price}`}</Text>
          </View>
          {/* Description Container */}
          <Text style={styles.description}>{serviceDetail?.description}</Text>

          {/* Book an Appointment Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowBookingModal(true)}
          >
            <Text style={styles.buttonText}>Book An Appointment</Text>
          </TouchableOpacity>

          {/* Policy Disclaimer */}
          <Text style={styles.refundInfo}>
            Note: You'll be charged 10% fee for cancelling after booking.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceDetailComp;

const styles = StyleSheet.create({
  firstContainer: {
    position: 'absolute',
    left: 0,
    height: '100%',
    backgroundColor: Colors.dark.primaryDark,
  },

  container: {
    width: '100%',
    backgroundColor: Colors.dark.primaryDark,
    position: 'relative',
  },

  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },

  headingSubContainer: {},
  sectionContainer: {
    paddingHorizontal: 20,
  },
  serviceName: {
    fontSize: 30,
    fontFamily: 'PoppinsExtraBold',
    color: Colors.dark.white,
  },

  priceText: {
    color: Colors.dark.white,
    fontFamily: 'PoppinsBold',
    fontSize: 22,
    textAlign: 'center',
    backgroundColor: Colors.dark.primaryHighlight,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },

  description: {
    color: Colors.dark.white,
    marginTop: 20,
    fontSize: 15,
    lineHeight: 24,
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

  refundInfo: {
    color: Colors.dark.placeholder,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
  },

  ratingText: {
    marginTop: -5,
    color: Colors.dark.white,
  },

  loadingContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    backgroundColor: Colors.dark.primaryDark,
  },

  closeBtnContainer: {
    position: 'absolute',
    zIndex: 3,
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: Colors.dark.primaryOrange,
    alignItems: 'center',
    justifyContent: 'center',
    left: 10,
    top: 15,
  },

  closeIcons: {},
});
