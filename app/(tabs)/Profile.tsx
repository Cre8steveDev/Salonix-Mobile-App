import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/providers/redux/authSlice';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { Redirect, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import AppointmentHistoryComp from '@/components/profile/AppointmentHistory';

const Profile = () => {
  // Handle Signout Dispatch
  //@ts-ignore
  const authState = useSelector((state) => state.auth as TAuthState);
  const [isLoading, setIsLoading] = useState(false);
  const [showAppointmentHistoryModal, setShowAppointmentHistoryModal] =
    useState(false);

  // Dispatch and Router instance
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, auth } = authState;

  const handleLogOut = async () => {
    setIsLoading(true);
    dispatch(logOut());
    router.replace('/(auth)/SignIn');
  };

  if (isLoading || !user) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={Colors.dark.primaryOrange} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          marginVertical: 'auto',
        }}
      >
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user.profilePhoto }}
            style={{
              width: 100,
              height: 100,
              backgroundColor: Colors.dark.primaryOrange,
              borderRadius: 20,
              overflow: 'hidden',
              marginBottom: 8,
            }}
            placeholder={require('@/assets/images/home/loading_image.gif')}
            placeholderContentFit="cover"
            contentFit="cover"
            transition={800}
            contentPosition={{ top: 0, left: 0 }}
            alt={user.fullName}
            cachePolicy="memory"
            recyclingKey={user.email}
            accessible={true}
          />

          {/* User Details */}
          <Text style={styles.profileHeadingText}>{user.fullName}</Text>
          <Text style={styles.profileSubtitleText}>{user.email}</Text>
        </View>

        {/* Profile ACtions  */}
        <View style={styles.allActionsContainer}>
          {/* Transaction History */}
          <ProfileActionComp
            icon={
              <AntDesign name="linechart" size={24} color={Colors.dark.white} />
            }
            textLabel="Appointment History"
            textColor={Colors.dark.white}
            bgColor={Colors.dark.primaryHighlight}
            triggerModal={setShowAppointmentHistoryModal}
          />

          {/* Update Profile Information */}
          <ProfileActionComp
            icon={<AntDesign name="user" size={24} color={Colors.dark.white} />}
            textLabel="Update Profile Info"
            textColor={Colors.dark.white}
            bgColor={Colors.dark.primaryHighlight}
            triggerModal={setShowAppointmentHistoryModal}
          />

          {/* Request Home Service */}
          <ProfileActionComp
            icon={<AntDesign name="home" size={24} color={Colors.dark.white} />}
            textLabel="Request Home Service"
            textColor={Colors.dark.white}
            bgColor={Colors.dark.primaryHighlight}
            triggerModal={setShowAppointmentHistoryModal}
          />

          {/* Dash Me Small 2k */}
          <ProfileActionComp
            icon={
              <MaterialCommunityIcons
                name="cash-plus"
                size={24}
                color={Colors.dark.white}
              />
            }
            textLabel="Dash Me Small 2k"
            textColor={Colors.dark.white}
            bgColor={Colors.dark.primaryHighlight}
            triggerModal={setShowAppointmentHistoryModal}
          />

          {/* Customer Care Service */}
          <ProfileActionComp
            icon={
              <AntDesign
                name="customerservice"
                size={24}
                color={Colors.dark.white}
              />
            }
            textLabel="Customer Care Service"
            textColor={Colors.dark.white}
            bgColor={Colors.dark.primaryHighlight}
            triggerModal={setShowAppointmentHistoryModal}
          />
        </View>
        {/* Implement Modals for The various Profile Actions */}
        {showAppointmentHistoryModal && (
          <Modal
            animationType="slide"
            transparent
            visible={showAppointmentHistoryModal}
            presentationStyle="overFullScreen"
            onRequestClose={() => setShowAppointmentHistoryModal(false)}
          >
            <AppointmentHistoryComp
              user={user}
              auth={auth!}
              setShowAppointmentHistoryModal={setShowAppointmentHistoryModal}
            />
          </Modal>
        )}

        {/*  Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogOut}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

type ProfileActionProp = {
  icon: ReactNode;
  textLabel: string;
  textColor: string;
  bgColor: string;
  triggerModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// Profile Action Component
const ProfileActionComp = ({
  icon,
  textLabel,
  textColor,
  bgColor,
  triggerModal,
}: ProfileActionProp) => {
  return (
    <TouchableOpacity
      onPress={() => triggerModal(true)}
      style={[{ backgroundColor: bgColor }, styles.actionContainer]}
    >
      <View style={styles.iconAndLabelContainer}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={[styles.actionText, { color: textColor }]}>
          {textLabel}
        </Text>
      </View>

      {/* Arrow Icon */}
      <View style={styles.arrowContainer}>
        <Ionicons name="arrow-forward" color={Colors.dark.white} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.dark.primaryDark,
    flex: 1,
  },
  profileHeader: {
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  profilePic: {},
  profileHeadingText: {
    textAlign: 'center',
    fontFamily: 'PoppinsExtraBold',
    fontSize: 28,
    color: 'white',
  },
  profileSubtitleText: {
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: -5,
  },

  allActionsContainer: {
    gap: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },

  actionContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 12,
  },

  iconAndLabelContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  iconContainer: {},
  actionText: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
  },
  arrowContainer: {},
  logoutBtn: {
    backgroundColor: Colors.dark.primaryOrange,
    padding: 7,
    width: 100,
    borderRadius: 5,
    marginHorizontal: 'auto',
  },
  logoutText: {
    textAlign: 'center',
    color: Colors.dark.white,
    fontSize: 16,
  },
});
