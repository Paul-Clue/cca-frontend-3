import React, { useEffect, useState } from "react";
import FieldInput from '../components/FieldInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from "@react-navigation/native";
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


 const ProfileScreen = () => {
  const navigation = useNavigation();

  const GoToEditProfile = () => {
    console.log('Button Push worked');
    navigation.navigate('EditProfile');
  }

  return (
    <ScrollView style={{marginTop: '30%'}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text> This is the Profile Modal </Text>
        <CustomButton
          text='Edit Profile'
          onPress={GoToEditProfile}
        />
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
container: {
  
},

});

export default ProfileScreen;