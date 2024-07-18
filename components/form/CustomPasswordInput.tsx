import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

type CustomPasswordInputProp = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  textColor?: string;
  bgColor?: string;
  keyBoardType?: KeyboardTypeOptions;
};

const CustomPasswordInput = ({
  value,
  setValue,
  placeholder,
  textColor,
  bgColor,
  keyBoardType,
}: CustomPasswordInputProp) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      style={[
        styles.inputContainer,
        { backgroundColor: bgColor ? bgColor : Colors.dark.white },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          {
            color: textColor ? textColor : Colors.dark.primaryHighlight,
          },
        ]}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        secureTextEntry={!showPassword}
        placeholderTextColor={Colors.dark.placeholder}
        cursorColor={Colors.dark.placeholder}
        keyboardAppearance="light"
        keyboardType={keyBoardType}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.iconContainer}
      >
        <Ionicons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#b3b3b3"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomPasswordInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingTop: 11,
    paddingLeft: 15,
    borderRadius: 10,
  },
  input: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    width: '90%',
  },
  iconContainer: {},
});
