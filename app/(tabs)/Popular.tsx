import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import API from '@/constants/API';
import useToast from '@/components/Toasts';

import SkeletonLoader from '@/components/SkeletonLoader';
import StyleCard from '@/components/StyleCard';
import { Ionicons } from '@expo/vector-icons';
import CustomTextInput from '@/components/form/CustomTextInput';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

type HairStyleType = {
  image: string;
  name: string;
};

type HeaderCompProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  handleSearchForStyles: () => void;
};

const PopularHairStylesTab = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [hairStyles, setHairStyles] = useState<HairStyleType[]>([]);

  // Implement function for searching for more styles
  const handleSearchForStyles = async () => {
    Alert.alert(
      'Feature Coming Soon.',
      'This feature might be implemented one day hehe.'
    );
    setSearchText('');
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
    <SafeAreaView style={styles.firstContainer}>
      <StatusBar
        style="auto"
        animated
        backgroundColor={Colors.dark.primaryHighlight}
      />
      {/* Heading Container for texts */}
      <PageHeaderComp
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearchForStyles={() => handleSearchForStyles()}
      />

      {/* Skeleton Loaders */}
      {loading && (
        <View style={styles.skeletonContainer}>
          <SkeletonLoader
            width={Dimensions.get('screen').width - 50}
            height={Dimensions.get('screen').height / 2}
            bgColor={Colors.dark.primaryHighlight}
          />
          <SkeletonLoader
            width={Dimensions.get('screen').width - 50}
            height={Dimensions.get('screen').height / 2}
            bgColor={Colors.dark.placeholder}
            easing={[0.5, 0.1, 0.45, 1]}
          />
        </View>
      )}

      {/* List of the Styles */}
      {!loading && (
        <View style={{ paddingBottom: 130 }}>
          <FlatList
            data={hairStyles}
            renderItem={({ item }) => (
              <View key={item.image}>
                <Text style={styles.imageText}>{item.name}</Text>
                <StyleCard
                  image={item.image}
                  name={item.name}
                  width={Dimensions.get('screen').width - 50}
                  height={Dimensions.get('screen').height / 2}
                />
              </View>
            )}
            keyExtractor={(item) => item.image}
            initialNumToRender={5}
            inverted={false}
            numColumns={1}
            ListEmptyComponent={<EmptyList />}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            initialScrollIndex={0}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PopularHairStylesTab;

const PageHeaderComp = ({
  searchText,
  setSearchText,
  handleSearchForStyles,
}: HeaderCompProps) => {
  return (
    <View style={styles.headingContainer}>
      <Text style={styles.heading}>Poular Hair Styles</Text>

      {/* Search for Popular Styles */}
      <View style={styles.searchInputContainer}>
        <CustomTextInput
          value={searchText}
          setValue={setSearchText}
          placeholder="Search Feature coming soon..."
          keyBoardType="default"
          bgColor={Colors.dark.white}
          textColor={Colors.dark.primaryDark}
          returnType="done"
          extraStyles={{ width: '100%' }}
          containerStyle={{ width: '83%' }}
        />
        <TouchableOpacity
          style={styles.searchIconContainer}
          onPress={handleSearchForStyles}
        >
          <Ionicons name="search" size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Empty List Component
export const EmptyList = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyHeading}>Ooops! 🫠</Text>
      <Text style={styles.emptySubtitle}>No Styles to show at the moment.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  firstContainer: {
    backgroundColor: Colors.dark.primaryDark,
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    gap: 15,
  },

  searchInputContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  searchIconContainer: {
    backgroundColor: Colors.dark.primaryOrange,
    width: '15%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonContainer: {
    width: Dimensions.get('screen').width - 50,
    height: Dimensions.get('screen').height / 2,
    marginBottom: 30,
    marginTop: 20,
    gap: 15,
  },

  imageContainer: {
    position: 'relative',
  },
  imageText: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 8,
    width: '100%',
    fontFamily: 'PoppinsExtraBold',
    color: 'white',
    fontSize: 30,
    zIndex: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  headingContainer: {
    backgroundColor: Colors.dark.primaryHighlight,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  heading: {
    color: 'white',
    width: '80%',
    fontSize: 24,
    fontFamily: 'PoppinsBold',
  },
  headingLink: {
    color: Colors.dark.primaryOrange,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  emptyHeading: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'PoppinsExtraBold',
    textAlign: 'center',
  },
  emptySubtitle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
  },
});
