import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import API from '@/constants/API';
import useToast from '../Toasts';

import SkeletonLoader from '../SkeletonLoader';
import { Image } from 'expo-image';
import blurhash from '@/constants/BlurHash';
import StyleCard from '../StyleCard';

type HairStyleType = {
  image: string;
  name: string;
};

const PopularHairstyles = () => {
  const [loading, setLoading] = useState(true);
  const [hairStyles, setHairStyles] = useState<HairStyleType[]>([]);
  const router = useRouter();

  // Handle Redirect to Fund Wallet Screen
  const handleRedirect = () => {
    router.push('/(tabs)/Popular');
  };

  // Fetch All Popular Styles
  useEffect(() => {
    setLoading(true);
    const fetchPopularStyles = async () => {
      try {
        const response = await API.get('api/resources/popular');
        setHairStyles(response.data.data.slice(0, 3));
      } catch (error) {
        useToast('Error Loading Styles. E go work later.');
        setHairStyles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularStyles();
  }, []);

  // Return JSX
  return (
    <View style={styles.firstContainer}>
      {/* Heading Container for texts */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Poular Hair Styles</Text>
        <TouchableOpacity onPress={handleRedirect}>
          <Text style={styles.headingLink}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Skeleton Loaders */}
      {loading && (
        <View style={styles.skeletonContainer}>
          <SkeletonLoader
            width={180}
            height={250}
            bgColor={Colors.dark.primaryHighlight}
          />
          <SkeletonLoader
            width={180}
            height={250}
            bgColor={Colors.dark.placeholder}
            easing={[0.5, 0.1, 0.45, 1]}
          />
        </View>
      )}

      {/* List of the Styles */}
      {!loading && (
        <View>
          <FlatList
            data={hairStyles}
            renderItem={({ item }) => (
              <StyleCard
                key={item.image}
                image={item.image}
                name={item.name}
                width={180}
                height={250}
              />
            )}
            keyExtractor={(item) => item.image}
            initialNumToRender={5}
            inverted={false}
            numColumns={1}
            ListEmptyComponent={<EmptyList />}
            //   onEndReached={handleLoadMore}
            contentContainerStyle={styles.contentContainer}
            horizontal={true}
            initialScrollIndex={0}
          />
        </View>
      )}
    </View>
  );
};

export default PopularHairstyles;

// Empty List Component
export const EmptyList = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyHeading}>Ooops! 🫠</Text>
      <Text style={styles.emptySubtitle}>No Styles to show at the moment.</Text>
    </View>
  );
};

// CSS Styles
const styles = StyleSheet.create({
  firstContainer: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 15,
  },
  contentContainer: {
    paddingLeft: 20,
    marginBottom: 20,
    gap: 15,
  },
  skeletonContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    marginBottom: 30,
    gap: 15,
    overflow: 'scroll',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  stylesContainer: {},
  stylesImage: {},
  heading: {
    color: 'white',
    width: '80%',
    fontSize: 24,
    fontFamily: 'PoppinsBold',
  },
  headingLink: {
    color: Colors.dark.primaryOrange,
  },
  emptyContainer: {},
  emptyHeading: {},
  emptySubtitle: {},
});
