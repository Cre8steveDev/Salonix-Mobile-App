import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import Animated, { useSharedValue } from 'react-native-reanimated';
import AnimatedImgBackground from '../AnimatedImgBackground';
import TextButton from '../TextButton';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

type ScreenType = {
  setScreen: React.Dispatch<React.SetStateAction<number>>;
};

// Onboarding Screen Two
const ScreenTwo = ({ setScreen }: ScreenType) => {
  const router = useRouter();
  // Return JsX
  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
        animated
        backgroundColor={Colors.dark.primaryOrange}
      />
      <View style={styles.textContainer}>
        <Text style={styles.heading}>BEAUTY</Text>
        <Text style={styles.heading}>IS YOU!</Text>
        <TextButton
          text="Get Styled by Salonix"
          textColor={Colors.dark.white}
          bgColor={Colors.dark.primaryHighlight}
          width={150}
          padding={5}
          styles={{ marginTop: -5, marginHorizontal: 'auto' }}
        />
      </View>

      {/* Text Overlay 001 */}
      <View style={styles.textOverlay01}>
        <Text style={styles.overlayText}>BEAUTY</Text>
        <Text style={styles.overlayText}>IS YOU!</Text>
      </View>

      {/* Text Overlay 002 */}
      <View style={styles.textOverlay02}>
        <Text style={styles.overlayText}>BEAUTY</Text>
        <Text style={styles.overlayText}>IS YOU!</Text>
      </View>

      {/* Image of Model */}
      <Image
        source={require('../../assets/images/onboarding/screen-img-02.png')}
        style={styles.image}
      />

      {/* Navigation Text */}
      <View style={styles.navigation}>
        <Text style={styles.navText} onPress={() => setScreen(3)}>
          {'Continue >'}
        </Text>
        <Text
          style={styles.navText}
          onPress={() => router.push('/(auth)/SignIn')}
        >
          {'Skip >>'}
        </Text>
      </View>
    </View>
  );
};

export default ScreenTwo;

// Define styles for component
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.primaryOrange,
    paddingTop: 100,
    position: 'relative',
    flex: 1,
  },
  textContainer: {},
  heading: {
    fontSize: 70,
    fontFamily: 'PoppinsExtraBold',
    color: Colors.dark.white,
    lineHeight: 77,
    textAlign: 'center',
    marginTop: -10,
  },
  navigation: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 50,
    position: 'absolute',
    left: 30,
    bottom: 40,
  },
  navText: {
    color: Colors.dark.white,
  },
  image: {
    position: 'absolute',
    marginHorizontal: 'auto',
    bottom: -110,
    width: '120%',
    transform: [{ translateX: -40 }],
  },
  textOverlay01: {
    marginTop: 40,
    zIndex: 3,
  },
  textOverlay02: {
    marginTop: 40,
  },
  overlayText: {
    fontSize: 85,
    fontFamily: 'PoppinsExtraBold',
    color: Colors.dark.white,
    lineHeight: 85,
    textAlign: 'center',
    marginTop: -10,
    opacity: 0.12,
  },
});
