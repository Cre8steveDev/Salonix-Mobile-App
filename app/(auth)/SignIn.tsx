import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import CustomTextInput from '@/components/form/CustomTextInput';
import CustomPasswordInput from '@/components/form/CustomPasswordInput';
import CustomSubmitBtn from '@/components/form/CustomSubmitBtn';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useToast from '@/components/Toasts';
import axios from 'axios';
import API from '@/constants/API';
const SignIn = () => {
  //  Define Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Define formSubmission function to login
  const handleSubmitForm = async () => {
    if (email.length < 8 || !email.includes('@')) {
      useToast('Please provide a valid email.');
      return;
    }
    if (password.length < 8) {
      useToast('Please use a password of atleast 8 characters');
      return;
    }

    setLoading(true);

    try {
      // Make call to backend
      const response = await API.post(
        `api/auth/signin`,
        { email, password },
        { withCredentials: true, headers: { Authorization: 'Basic y5y5y5y5y' } }
      );
      // TODO:
      // Store User and Auth to Local State
    } catch (error: any) {
      if (error?.message === 'Network Error')
        return useToast('Sorry. A Network Error Occured', 'red');

      if (error.response) return useToast('Invalid Login Credentials.', 'red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onboarding/signup.png')}
      style={styles.container}
      imageStyle={styles.imageBg}
      resizeMode="cover"
      blurRadius={0}
      borderRadius={0}
      fadeDuration={300}
    >
      <StatusBar />
      {/* Form Begins Here */}

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        // style={styles.formContainer}
      >
        <Text style={styles.heading}>Login Into Your Account.</Text>
        {/* Email Input for Signin  */}
        <CustomTextInput
          value={email}
          setValue={setEmail}
          placeholder="Enter Your Email Address"
          keyBoardType="email-address"
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
        {/* Switch for Password and forgot password prompt */}
        <View style={styles.otherAction}>
          <View style={styles.remember}>
            <Switch
              value={rememberMe}
              onValueChange={() =>
                setRememberMe((previousState) => !previousState)
              }
              disabled={false}
              trackColor={{ false: '#767577', true: Colors.dark.primaryOrange }}
              thumbColor={rememberMe ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              style={styles.switch}
              testID="switchTestID"
            />
            <Text style={{ color: Colors.dark.white }}>Remember Me</Text>
          </View>

          <Text
            style={{ color: Colors.dark.white }}
            onPress={() =>
              Alert.alert(
                'Feature Incoming',
                'Will implement password reset feature later on.'
              )
            }
          >
            Forgot Password?
          </Text>
        </View>

        {/* Place Submission Button */}
        <CustomSubmitBtn
          text={loading ? 'Processing...' : 'Log In'}
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
        <TouchableOpacity onPress={() => router.push('/(auth)/Register')}>
          <Text style={styles.subtext}>
            {'Already have an account?  '}
            <Text style={styles.textCTA}> Sign Up Now!</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignIn;

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
