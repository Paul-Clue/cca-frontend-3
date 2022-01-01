import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Button,
  TextInput,
  Pressable
} from 'react-native';

 const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor}) => {
  return (
    <Pressable
    style={[
      styles.container, styles[`container_${type}`],
      bgColor ? {backgroundColor: bgColor} : {}
      ]}
      onPress={onPress}
      >
      <Text
        style={[
          styles.text, styles[`text_${type}`],
          fgColor ? {color: fgColor} : {}
          ]}
      >
            {text}
      </Text>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },

  container_TERTIARY: {

  },

  text: {
  fontWeight: 'bold',
  color: 'white',
  },
  
  text_TERTIARY: {
    color: '#3B71F3'
  },

  text_SECONDARY: {
    color: '#3B71F3'
  },
  });

export default CustomButton;