import React, { useEffect, useState } from "react";
import FieldInput from '../components/FieldInput';
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
  Button
} from 'react-native';


 const ProfileModal = () => {
   const [name, setName] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [address, setAddress] = useState('');
  return (
    <ScrollView style={{marginTop: '30%'}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text> This is the Profile Modal </Text>
        <FieldInput placeholder='Edit Name' value={name} setValue={setName} icon='person'/>
        <FieldInput placeholder='Edit Phone Number' value={phoneNumber} setValue={setPhoneNumber} icon='phone'/>
        <FieldInput
        placeholder='Edit Address'
        value={address}
        setValue={setAddress}
        icon='house'
        />
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
container: {
  
},

});

export default ProfileModal;