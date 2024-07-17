import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

// Define Types
type CustomSubmitBtnProp = {
  children?: React.ReactNode;
  text: string;
  textColor?: string;
  bgColor?: string;
  onPress: () => void;
  disabled?: boolean;
};

const CustomSubmitBtn = ({
  children,
  text,
  textColor,
  bgColor,
  onPress,
  disabled = false,
}: CustomSubmitBtnProp) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        disabled ? { backgroundColor: 'gray' } : { backgroundColor: bgColor },
        styles.container,
      ]}
      disabled={disabled}
    >
      <View style={styles.childContainer}>
        {children}
        <Text
          style={{
            color: disabled ? '#bfbfbf' : textColor,
            fontSize: 18,
            fontFamily: 'PoppinsBold',
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomSubmitBtn;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
  },
  childContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});
