import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type TextButtonProp = {
  text: string;
  textColor: string;
  bgColor: string;
  height?: number;
  width?: number;
  padding?: number;
  onpress?: () => void;
  styles?: any;
};
const TextButton = ({
  text,
  textColor,
  bgColor,
  onpress,
  width,
  height,
  padding,
  styles,
}: TextButtonProp) => {
  return (
    <Text
      style={{
        ...styles,
        color: textColor,
        backgroundColor: bgColor,
        height: height || 'auto',
        width: width || 'auto',
        padding,
        textAlign: 'center',
        borderRadius: 6,
      }}
      onPress={onpress}
    >
      {text}
    </Text>
  );
};

export default TextButton;
