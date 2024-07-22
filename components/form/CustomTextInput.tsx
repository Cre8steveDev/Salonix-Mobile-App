import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';

type CustomTextInputProp = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  textColor?: string;
  bgColor?: string;
  keyBoardType?: KeyboardTypeOptions;
  returnType?: ReturnKeyTypeOptions;
  extraStyles?: any;
  containerStyle?: any;
};

const CustomTextInput = ({
  value,
  setValue,
  placeholder,
  textColor,
  bgColor,
  keyBoardType = 'default',
  returnType = 'next',
  extraStyles,
  containerStyle,
}: CustomTextInputProp) => {
  return (
    <View style={containerStyle && containerStyle}>
      <TextInput
        style={[
          extraStyles && extraStyles,
          styles.input,
          {
            color: textColor ? textColor : Colors.dark.primaryHighlight,
            backgroundColor: bgColor ? bgColor : Colors.dark.white,
          },
        ]}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={Colors.dark.placeholder}
        cursorColor={Colors.dark.placeholder}
        keyboardAppearance="light"
        keyboardType={keyBoardType}
        autoComplete="off"
        returnKeyType={returnType}
        // textContentType="none" // iOS-specific
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    padding: 8,
    paddingLeft: 15,
    paddingTop: 11,
    borderRadius: 10,
  },
});
