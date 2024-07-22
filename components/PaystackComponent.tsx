import React, { useState } from 'react';
import { Paystack } from 'react-native-paystack-webview';
import { Alert, View } from 'react-native';
import Colors from '@/constants/Colors';
import API from '@/constants/API';
import useToast from './Toasts';
import { useRouter } from 'expo-router';

type PaystackComponent = {
  apiKey: string;
  amount: string;
  email: string;
  funderName: string;
  setTriggerPay: React.Dispatch<React.SetStateAction<boolean>>;
  authId: string;
};

type TransactionReference = {
  redirectUrl: string;
};

function PaystackComponent({
  apiKey,
  amount,
  email,
  funderName,
  setTriggerPay,
  authId,
}: PaystackComponent) {
  // Instantiate router to navigate after successful deposit
  const router = useRouter();

  //   Define Function to save successful transaction to userDocument
  const handleSaveTransactionToUserDB = async (reference: string) => {
    // Make request to backend to update User's Wallet
    try {
      const response = await API.post(
        'api/auth/update-wallet',
        {
          reference: reference,
          amount: Number(amount),
        },
        {
          headers: { Authorization: `Basic ${authId}` },
        }
      );
      router.replace('/(tabs)/Home');
    } catch (error) {
      useToast('Sorry. Error updating wallet. Contact cre8stevedev@gmail.com');
      Alert.alert('Take a Screenshot of your reference', reference);
    }
  };

  //   Return JSX Component
  return (
    <View style={{ flex: 1 }}>
      <Paystack
        paystackKey={apiKey}
        amount={amount}
        billingEmail={email}
        billingName={funderName}
        activityIndicatorColor={Colors.dark.primaryOrange}
        onCancel={(e) => {
          useToast('Payment Cancelled.', 'red', 'white');
          setTriggerPay(false);
        }}
        onSuccess={async (res) => {
          // @ts-ignore
          await handleSaveTransactionToUserDB(res.transactionRef?.redirecturl);
          setTriggerPay(false);
        }}
        autoStart={true}
      />
    </View>
  );
}

export default PaystackComponent;
