import { Redirect, Tabs } from 'expo-router';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';

export default function TabLayout() {
  //  Return to Login Page if user is not authenticated
  //@ts-ignore
  const auth = useSelector((state) => state.auth);

  if (!auth.user) {
    // return <Redirect href="/(auth)/Signin" />;
  }

  // Return Tab Layout
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.primaryOrange,
        tabBarInactiveTintColor: Colors.dark.white,
        tabBarStyle: {
          height: 65,
          width: '100%',
          paddingHorizontal: 20,
          marginHorizontal: 'auto',
          backgroundColor: Colors.dark.primaryDark,
          // marginBottom: 10,
          // borderWidth: 3,
          // borderRadius: 20,
          //   borderColor: Colors.primaryYellow,
          //   borderTopColor: Colors.primaryYellow,
          //   backgroundColor: Colors.secondaryBlack,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
            android: {
              elevation: 5,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontFamily: 'PoppinsRegular',
          marginBottom: 12,
          marginTop: -8,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" size={!focused ? size : 30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Popular"
        options={{
          title: 'Popular',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name="newspaper-o"
              size={!focused ? size : 30}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="FundWallet"
        options={{
          title: 'Fund Wallet',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo name="wallet" size={!focused ? size : 30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="person" size={!focused ? size : 30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
