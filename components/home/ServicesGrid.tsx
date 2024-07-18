import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

// Constant Array of objects
import Services from '@/constants/Services';
import Colors from '@/constants/Colors';

type ServicesGridProp = {
  setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailType: React.Dispatch<React.SetStateAction<string>>;
};

// Definition of the Component
const ServicesGrid = ({
  setShowDetailModal,
  setDetailType,
}: ServicesGridProp) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our Services</Text>

      {/* List of Services Mapped */}
      <View style={styles.listContainer}>
        {Services.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            label={service.label}
            image={service.image}
            setDetailType={setDetailType}
            setShowDetailModal={setShowDetailModal}
          />
        ))}
      </View>
    </View>
  );
};

export default ServicesGrid;

type ServiceCardProp = (typeof Services)[0] & ServicesGridProp;

const ServiceCard = ({
  id,
  label,
  image,
  setShowDetailModal,
  setDetailType,
}: ServiceCardProp) => {
  // Define Function handler for when card is tapped
  const handleServiceTap = () => {
    setDetailType(id);
    setShowDetailModal(true);
  };

  //   Return JSX
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleServiceTap}>
      <Image source={image} style={styles.image} />
      <Text style={styles.cardTag}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    marginTop: 10,
  },
  heading: {
    fontSize: 26,
    fontFamily: 'PoppinsExtraBold',
    color: Colors.dark.white,
  },
  listContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  cardContainer: {
    position: 'relative',
    width: '45%',
    borderRadius: 15,
    backgroundColor: Colors.dark.primaryOrange,
    objectFit: 'cover',
    overflow: 'hidden',
  },
  cardTag: {
    padding: 5,
    paddingLeft: 8,
    position: 'absolute',
    bottom: 0,
    width: '90%',
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    borderTopRightRadius: 15,
    backgroundColor: Colors.dark.primaryHighlight,
    color: Colors.dark.white,
  },
  image: {},
});
