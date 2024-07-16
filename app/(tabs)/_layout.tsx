import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Platform } from 'react-native';

export default function TabLayout() {
  // Return Tab Layout
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#474839',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          height: 65,
          width: '93%',
          marginHorizontal: 'auto',
          marginBottom: 10,
          borderWidth: 3,
          borderRadius: 20,
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
          fontSize: 7,
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
            <Ionicons name="home" size={!focused ? size : 35} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Popular"
        options={{
          title: 'Popular',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="shuffle"
              size={!focused ? size : 35}
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
            <Ionicons
              name="bookmark"
              size={!focused ? size : 35}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="person" size={!focused ? size : 35} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
