import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import CustomSubmitBtn from '../form/CustomSubmitBtn';
import API from '@/constants/API';
import useToast from '../Toasts';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logOut } from '@/providers/redux/authSlice';

// Mini Dashboard Component Prop
type MiniDashboardProp = {
  user: LoggedInUser;
  auth: AuthToken;
};

const MiniDashboard = ({ user, auth }: MiniDashboardProp) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentBalance, setCurrentBalance] = useState('------');
  const [refreshBalance, setRefreshBalance] = useState(1);
  const [loadingBalance, setLoadingBalance] = useState(false);

  // Get Wallet Reference
  const walletID = useMemo(() => {
    return user.walletId.split('').slice(10).join('');
  }, []);

  if (!user) return null;
  // Handle Redirect to Fund Wallet Screen
  const handleRedirect = () => {
    router.push('/(tabs)/FundWallet');
  };

  // Get Wallet Balance
  useEffect(() => {
    setLoadingBalance(true);
    API.get('api/auth/get-wallet', {
      headers: { Authorization: `Basic ${auth.id}` },
    })
      .then((response) => {
        // If status returns 401 Unauthorized log user out.
        if (response.status === 401) {
          useToast('Session has expired. Sign in again.', 'orange', 'white');
          dispatch(logOut());
          router.push('/(auth)/Login');
        }

        const { wallet } = response.data;
        setCurrentBalance(
          `N${(wallet.currentBalance as number).toLocaleString()}`
        );
        setLoadingBalance(false);
      })
      .catch((error) => {
        // console.log(error);
        setLoadingBalance(false);
        dispatch(logOut());
        useToast('Unable to load current balance.', 'red', 'white');
      });
  }, [refreshBalance]);

  // Return JSX
  return (
    <View style={styles.firstContainer}>
      <View style={styles.container}>
        <Text style={styles.topText}>{`Welcome, ${
          user.fullName.split(' ')[0]
        }`}</Text>

        {/* Container for amount and refresh */}
        <View style={styles.balanceContainer}>
          {loadingBalance && <Text style={styles.loadingText}>Loading...</Text>}

          {!loadingBalance && (
            <>
              <Text style={styles.heading}>{`${currentBalance}`}</Text>

              <TouchableOpacity>
                <Ionicons
                  name="refresh-circle"
                  size={34}
                  color={'white'}
                  onPress={() => setRefreshBalance((prev) => prev + 1)}
                  style={{ paddingBottom: 10 }}
                />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Substitle for wallet id */}
        <Text style={styles.subText}>
          WalletID:
          <Text style={styles.subTextBold}>{`  ${walletID}`}</Text>
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
  },
  balanceContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  loadingText: {
    height: 60,
    fontSize: 20,
    color: 'white',
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
