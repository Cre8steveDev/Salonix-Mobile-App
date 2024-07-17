import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SignUp = () => {
  return (
    <ScrollView>
      <Text>SignIn</Text>

      {/* Form view begins */}
      <View>
        <Text>Login Into Your Account.</Text>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
});
