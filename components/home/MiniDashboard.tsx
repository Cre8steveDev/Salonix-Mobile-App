import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import CustomSubmitBtn from '../form/CustomSubmitBtn';

// Mini Dashboard Component Prop
type MiniDashboardProp = {
  user: LoggedInUser;
};

const MiniDashboard = ({ user }: MiniDashboardProp) => {
  const router = useRouter();
  // Handle Redirect to Fund Wallet Screen
  const handleRedirect = () => {
    router.push('/(tabs)/FundWallet');
  };

  return (
    <View style={styles.firstContainer}>
      <View style={styles.container}>
        <Text style={styles.topText}>{`Welcome, ${
          user.fullName.split(' ')[0]
        }`}</Text>
        <Text style={styles.heading}>N25,000</Text>
        <Text style={styles.subText}>
          WalletID:
          <Text style={styles.subTextBold}>{'  123456788'}</Text>
        </Text>
      </View>

      {/* Wallet for Funding  */}
      <TouchableOpacity style={styles.button} onPress={handleRedirect}>
        <Text style={styles.buttonText}>FUND WALLET</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MiniDashboard;

const styles = StyleSheet.create({
  firstContainer: {
    position: 'relative',
    height: 205,
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.dark.primaryOrange,
    height: 180,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: '100%',
    // gap: 5,
  },
  topText: {
    fontSize: 18,
    fontFamily: 'PoppinsBold',
  },
  heading: {
    fontSize: 60,
    fontFamily: 'PoppinsExtraBold',
    lineHeight: 70,
    color: Colors.dark.white,
  },
  subText: {
    fontSize: 15,
    fontFamily: 'PoppinsRegular',
    color: Colors.dark.white,
    marginTop: -8,
  },
  subTextBold: {
    fontFamily: 'PoppinsBold',
  },
  button: {
    backgroundColor: Colors.dark.primaryHighlight,
    padding: 7,
    width: 150,
    borderRadius: 6,
    position: 'absolute',
    bottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    color: Colors.dark.white,
  },
});
