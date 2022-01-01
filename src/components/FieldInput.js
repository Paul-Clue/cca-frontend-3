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
  TextInput
} from 'react-native';

 const FieldInput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput
      value={value}
      onChangeText={setValue}
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      />
    </View>
  )
};

const styles = StyleSheet.create({
container: {
  backgroundColor: 'white',
  width: '80%',
  borderColor: '#e8e8e8',
  borderRadius: 5,
  borderWidth: 1,
  paddingHorizontal: 10,
  marginVertical: 10,
  padding: 15,
},
input: {

}
});

export default  FieldInput;