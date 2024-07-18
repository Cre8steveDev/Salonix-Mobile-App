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
        setHairStyles(response.data.data);
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
              <StyleCard key={item.image} image={item.image} name={item.name} />
            )}
            keyExtractor={(item) => item.image}
            initialNumToRender={5}
            inverted={false}
            numColumns={1}
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

// Style Card Component

const StyleCard = ({ image, name }: { name: string; image: string }) => {
  return (
    <Image
      source={{ uri: image }}
      style={{ width: 180, height: 250, backgroundColor: 'lightgrey' }}
      placeholder={blurhash}
      contentFit="cover"
      transition={800}
      contentPosition={{ top: 0, left: 0 }}
      alt={name}
      cachePolicy="memory"
      recyclingKey="image"
      accessible={true}
      onError={(error) => console.error('Image loading error:', error)}
    />
  );
};

const styles = StyleSheet.create({
  firstContainer: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 15,
  },
  contentContainer: {
    // width: '100%',
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
});
