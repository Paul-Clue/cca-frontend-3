import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

import Login2 from '../Screens/Login2';
import SignUpScreen from "../Screens/SignUpScreen";
import ConfirmEmailScreen from "../Screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../Screens/ForgotPasswordScreen";
import NewPasswordScreen from "../Screens/NewPasswordScreen";
import HomeScreen from "../Screens/HomeScreen";

const Stack = createNativeStackNavigator();


 const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Login2'} component={Login2} />
        <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} />
        <Stack.Screen name={'ConfirmEmailScreen'} component={ConfirmEmailScreen} />
        <Stack.Screen name={'ForgotPasswordScreen'} component={ForgotPasswordScreen} />
        <Stack.Screen name={'NewPasswordScreen'} component={NewPasswordScreen} />
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
container: {
  
},

});

export default Navigation;