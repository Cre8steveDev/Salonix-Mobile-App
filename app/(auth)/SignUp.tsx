import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import CustomTextInput from '@/components/form/CustomTextInput';
import CustomPasswordInput from '@/components/form/CustomPasswordInput';
import CustomSubmitBtn from '@/components/form/CustomSubmitBtn';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useToast from '@/components/Toasts';

// import Axios Instance created with base url
import API from '@/constants/API';

// Define Component
const SignUp = () => {
  // UX - show background on status bar for when scroll
  // view goes up
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Cleanup function for when the component unmounts
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  //  Define Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  // Router for navigating to necessary routes
  const router = useRouter();

  // Define formSubmission function to login
  const handleSubmitForm = async () => {
    // Basic Form Validation of user Data.
    if (fullName.trim().length < 4) {
      return useToast('Hehe. Enter a correct, and believable Name. 😂');
    }
    if (email.trim().length < 8 || !email.includes('@')) {
      useToast('Please provide a valid email.');
      return;
    }
    if (password.trim().length < 8) {
      useToast('Please use a password of atleast 8 characters');
      return;
    }

    if (phoneNumber.trim().length !== 11) {
      return useToast('Phone Number should be 11 characters. e.g 08123457890');
    }

    if (
      gender.trim().toUpperCase() !== 'MALE' &&
      gender.trim().toUpperCase() !== 'FEMALE'
    ) {
      return useToast('Kindly type in Male or Female. Thank you. 😇');
    }
    // If Data validation is correct.
    setLoading(true);

    const formData = {
      email,
      password,
      fullName,
      phoneNumber,
      gender: gender.toUpperCase(),
    };

    try {
      // Make call to backend
      const response = await API.post(`api/auth/signup`, formData);

      if (response.status !== 201) throw new Error();

      // on a Successful call route user to login page.
      router.dismissAll();
      router.push('/(auth)/SignIn');

      // Error handling below
    } catch (error: any) {
      // Reset Loading
      setLoading(false);
      console.log('Error message: ', error);
      if (error?.message === 'Network Error')
        return useToast('Sorry. A Network Error Occured', 'red');

      if (error.response)
        return useToast(
          'An error occured during registration. Check your details and try again.',
          'red'
        );

      useToast('Sorry. An Unknown Error occured. 🥲');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onboarding/signin.png')}
      style={styles.container}
      imageStyle={styles.imageBg}
      resizeMode="cover"
      blurRadius={0}
      borderRadius={0}
      fadeDuration={300}
    >
      <StatusBar
        animated
        backgroundColor={isKeyboardVisible ? Colors.dark.primaryHighlight : ''}
      />
      {/* Form Begins Here */}

      <ScrollView
        contentContainerStyle={[
          styles.scrollView,
          isKeyboardVisible && { paddingTop: 80 },
        ]}
        showsVerticalScrollIndicator={false}
        // style={styles.formContainer}
      >
        <Text style={styles.heading}>Create an Account. 😃</Text>
        {/* Full Name */}
        <CustomTextInput
          value={fullName}
          setValue={setFullName}
          placeholder="Full Name"
          keyBoardType="name-phone-pad"
          bgColor={Colors.dark.primaryHighlight}
          textColor={Colors.dark.white}
          // returnType="next"
        />

        {/* Email Input for SignUp  */}
        <CustomTextInput
          value={email}
          setValue={setEmail}
          placeholder="Enter Your Email Address"
          keyBoardType="email-address"
          bgColor={Colors.dark.primaryHighlight}
          textColor={Colors.dark.white}
          // returnType="next"
        />

        {/* Phone Number */}
        <CustomTextInput
          value={phoneNumber}
          setValue={setPhoneNumber}
          placeholder="Phone Number"
          keyBoardType="phone-pad"
          bgColor={Colors.dark.primaryHighlight}
          textColor={Colors.dark.white}
          // returnType="next"
        />

        {/* Gender */}
        <CustomTextInput
          value={gender}
          setValue={setGender}
          placeholder="Gender (Male or Female)"
          keyBoardType="default"
          bgColor={Colors.dark.primaryHighlight}
          textColor={Colors.dark.white}
          // returnType="next"
        />

        {/* Password  */}
        <CustomPasswordInput
          value={password}
          placeholder="Enter Your Password"
          setValue={setPassword}
          bgColor={Colors.dark.primaryHighlight}
          textColor={Colors.dark.white}
        />

        {/* Place Submission Button */}
        <CustomSubmitBtn
          text={loading ? 'Processing...' : 'Register Now 😉'}
          textColor={Colors.dark.white}
          bgColor={Colors.dark.primaryOrange}
          onPress={async () => await handleSubmitForm()}
          disabled={loading}
        />
        {/* Separator */}
        <View style={styles.separator}></View>

        {/* Google Sign In Button */}
        <CustomSubmitBtn
          text={loading ? 'Processing' : 'Sign In With Google'}
          textColor={'white'}
          bgColor={Colors.dark.primaryHighlight}
          // onPress={() => handleGoogleAuth()}
          onPress={() => Alert.alert('Feature Coming soon...')}
          children={
            <Ionicons
              name="logo-google"
              color={loading ? '#bfbfbf' : Colors.dark.white}
              size={20}
            />
          }
          disabled={loading}
        />

        {/* Already Logged In Text Copy */}
        <TouchableOpacity onPress={() => router.push('/(auth)/SignIn')}>
          <Text style={styles.subtext}>
            {'Already have an account 😃?  '}
            <Text style={styles.textCTA}> Sign In Now!</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 20,
  },
  imageBg: {},
  heading: {
    fontSize: 24,
    fontFamily: 'PoppinsBold',
    color: Colors.dark.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    paddingHorizontal: 25,
    width: '100%',
    gap: 15,
  },
  input: {
    backgroundColor: Colors.dark.primaryHighlight,
    padding: 8,
    paddingHorizontal: 12,
    fontSize: 18,
    borderRadius: 6,
    color: Colors.dark.white,
  },
  inputText: {},
  switch: {},
  remember: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  otherAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtext: {
    color: Colors.dark.white,
    textAlign: 'center',
    marginTop: 10,
  },
  textCTA: {
    color: Colors.dark.primaryOrange,
    marginLeft: 10,
    fontFamily: 'PoppinsBold',
  },
  separator: {
    marginTop: 8,
    height: 1,
    backgroundColor: Colors.dark.placeholder,
  },
});
