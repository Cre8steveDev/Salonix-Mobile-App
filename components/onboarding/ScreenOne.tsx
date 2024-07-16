import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import Animated, { useSharedValue } from 'react-native-reanimated';
import AnimatedImgBackground from '../AnimatedImgBackground';
import TextButton from '../TextButton';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

type ScreenType = {
  setScreen: React.Dispatch<React.SetStateAction<number>>;
};

// Onboarding Screen
const ScreenOne = ({ setScreen }: ScreenType) => {
  const router = useRouter();
  // Return JsX
  return (
    <AnimatedImgBackground
      source={require('../../assets/images/onboarding/screen-img-01.png')}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      imageStyle={{
        opacity: 1,
        transform: [{ translateX: 30 }, { translateY: 0 }],
      }}
      resizeMode="cover"
      blurRadius={0}
      borderRadius={0}
      fadeDuration={300}
    >
      <View style={styles.textContainer}>
        <Text style={styles.heading}>YOU GOT</Text>
        <Text style={styles.heading}>SWAG?</Text>
        <TextButton
          text="Get Styled by Salonix"
          textColor={Colors.dark.white}
          bgColor={Colors.dark.primaryOrange}
          width={150}
          padding={5}
          styles={{ marginTop: -5 }}
        />

        {/* Navigation Text */}
        <View style={styles.navigation}>
          <Text style={styles.navText} onPress={() => setScreen(2)}>
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
    </AnimatedImgBackground>
  );
};

export default ScreenOne;

// Define styles for component
const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    left: 0,
    bottom: 50,
    paddingLeft: 20,
  },
  heading: {
    fontSize: 70,
    fontFamily: 'PoppinsExtraBold',
    lineHeight: 77,
    marginTop: -10,
  },
  navigation: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 50,
  },
  navText: {
    color: Colors.dark.white,
  },
});
