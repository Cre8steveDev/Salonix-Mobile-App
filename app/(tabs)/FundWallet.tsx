import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import CustomTextInput from '@/components/form/CustomTextInput';
import { useSelector } from 'react-redux';
import { Redirect } from 'expo-router';
import useToast from '@/components/Toasts';
import PaystackComponent from '../../components/PaystackComponent';
import API from '@/constants/API';

// Define Fund Wallet Component
const FundWallet = () => {
  // Define Component State
  const [loading, setLoading] = useState(false);
  const [triggerPay, setTriggerPay] = useState(false);
  const [fundingAmount, setFundingAmount] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [dummy, setDummy] = useState('');
  // @ts-ignore
  const authState = useSelector((state) => state.auth as TAuthState);
  const { user, auth } = authState;

  // UseEffect to retrieve Paystack API Key from Backend
  useEffect(() => {
    setLoading(true);
  }, []);

  // If Component is loading, return Loading Indicator

  // Handle form validation and trigger payment for Paystack
  const currentTime = new Date().getTime();
  if (!user || !auth || auth.tokenExpiry < currentTime) {
    return <Redirect href={'/(auth)/SignIn'} />;
  }

  // handle Payment trigger and mini validation
  const handlePayment = async () => {
    try {
      const userAmount = fundingAmount.replace(',', '');
      const amount = parseInt(userAmount);

      if (!amount || amount < 0) throw new Error('Invalid Amount');

      //  Retrieve API Key for Paystack - /get-api-key
      try {
        const response = await API.get('api/auth/get-api-key', {
          headers: { Authorization: `Basic ${auth.id}` },
        });

        // Log out the apikey to check;
        setApiKey(response.data.apiKey);
        setTriggerPay(true);
        // Close Modal if unable to get api Key
      } catch (error) {
        useToast(
          'Error initializing Payment. Try again later.',
          'red',
          'white'
        );
        return;
      }
      // Catch Error from invalid entry
    } catch (error) {
      useToast('Please provide a valid amount.', 'red', 'white');
      return;
    }
  };

  // Return JSX
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={Colors.dark.primaryOrange} />

      {/* Header Component */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Fund Your Wallet</Text>
      </View>

      {/* Prefilled Input Fields and Field for Amount */}
      <View style={styles.inputContainer}>
        {/* Billing Name */}
        <CustomTextInput
          value={user?.fullName!}
          setValue={setDummy}
          placeholder=""
          keyBoardType="default"
          bgColor={Colors.dark.placeholder}
          textColor={Colors.dark.white}
          returnType="done"
          extraStyles={{ width: '100%' }}
          containerStyle={{ width: '83%' }}
          editable={false}
        />

        {/* Billing Email */}
        <CustomTextInput
          value={user?.email!}
          setValue={setDummy}
          placeholder=""
          keyBoardType="default"
          bgColor={Colors.dark.placeholder}
          textColor={Colors.dark.white}
          returnType="done"
          extraStyles={{ width: '100%' }}
          containerStyle={{ width: '83%' }}
          editable={false}
        />

        {/* Billing Mobile */}
        <CustomTextInput
          value={String(user?.phoneNumber)}
          setValue={setDummy}
          placeholder=""
          keyBoardType="default"
          bgColor={Colors.dark.placeholder}
          textColor={Colors.dark.white}
          returnType="done"
          extraStyles={{ width: '100%' }}
          containerStyle={{ width: '83%' }}
          editable={false}
        />

        {/* Billing Amount */}
        <CustomTextInput
          value={fundingAmount}
          setValue={setFundingAmount}
          placeholder="Enter Amount to fund your wallet."
          keyBoardType="number-pad"
          bgColor={Colors.dark.white}
          textColor={Colors.dark.primaryDark}
          returnType="done"
          extraStyles={{ width: '100%' }}
          containerStyle={{ width: '83%' }}
          editable={true}
        />

        {/* Submit Button */}
        <TouchableOpacity onPress={handlePayment} style={styles.payButton}>
          <Text style={styles.payText}>Pay Now</Text>
        </TouchableOpacity>

        {/* Paystack payment Component */}
        {triggerPay && (
          <View style={{ flex: 1 }}>
            <PaystackComponent
              apiKey={apiKey}
              authId={auth.id}
              email={user.email}
              amount={fundingAmount}
              funderName={user.fullName}
              setTriggerPay={setTriggerPay}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FundWallet;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.dark.primaryHighlight,
  },

  headingContainer: {
    backgroundColor: Colors.dark.primaryOrange,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    color: 'white',
    width: '80%',
    fontSize: 24,
    fontFamily: 'PoppinsBold',
    textAlign: 'center',
  },

  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 25,
  },
  payButton: {
    backgroundColor: Colors.dark.primaryOrange,
    width: '85%',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  payText: {
    fontFamily: 'PoppinsExtraBold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});
