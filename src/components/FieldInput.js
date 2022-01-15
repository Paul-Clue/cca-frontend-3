import React, { useEffect, useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Icon } from 'react-native-elements';
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

 const FieldInput = ({value, setValue, placeholder, secureTextEntry, Error = '', icon = ''}) => {
  return (
    <View style={[styles.container, Error ? {borderColor: 'red', borderWidth: 2, backgroundColor: '#faebd7'} : {},]}>
      <Icon style={styles.icon} name={icon} size={20} color="lightgray"/>
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
  flexDirection: 'row',
},
icon: {
  marginRight: '10%',
},
input: {

}
});

export default  FieldInput;